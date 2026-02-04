import React, { createContext, useContext, useState, useEffect } from 'react';
import { get, set } from 'idb-keyval';

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  dimensions: string;
  quantity: string;
  price: number;
  images: (string | null)[];
  aspectRatio: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const val = await get('cart');
        if (val) {
          setItems(val);
        } else {
          // Fallback/Migration from localStorage
          const saved = localStorage.getItem('cart');
          if (saved) {
            try {
              const parsed = JSON.parse(saved);
              if (Array.isArray(parsed)) {
                setItems(parsed);
                // Migrate to IDB
                await set('cart', parsed);
                localStorage.removeItem('cart');
              }
            } catch (e) {
              console.error("Failed to parse localStorage cart", e);
            }
          }
        }
      } catch (err) {
        console.error("Failed to load cart", err);
      } finally {
        setIsInitialized(true);
      }
    };
    
    loadCart();
  }, []);

  useEffect(() => {
    if (isInitialized) {
      set('cart', items).catch(err => console.error("Failed to save cart", err));
    }
  }, [items, isInitialized]);

  const addToCart = (item: CartItem) => {
    setItems(prev => [...prev, item]);
  };

  const removeFromCart = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
    set('cart', []).catch(console.error); // Ensure cleared in IDB immediately
  };

  const cartTotal = items.reduce((total, item) => total + item.price, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
