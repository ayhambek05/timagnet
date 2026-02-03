
import { PRODUCTS } from '@/data/products';
import { CartItem } from '@/context/CartContext';

export const calculateWeight = (items: CartItem[]) => {
  let totalWeight = 0;
  items.forEach(item => {
    const product = PRODUCTS.find(p => p.id === item.productId);
    if (product) {
      const option = product.options.find(o => o.value === item.quantity);
      if (option && option.weight) {
        totalWeight += option.weight;
      } else {
        // Fallback weight if not defined: 10g per magnet * quantity
        totalWeight += 10 * parseInt(item.quantity);
      }
    }
  });
  return totalWeight;
};

export const calculateDeliveryFee = (items: CartItem[], method: string) => {
  const totalWeight = calculateWeight(items);
  
  if (items.length === 0) return 0;

  // Weight is in grams
  if (method === 'mondial_relay') {
    if (totalWeight <= 500) return 4.99;
    if (totalWeight <= 1000) return 5.99;
    if (totalWeight <= 2000) return 7.99;
    if (totalWeight <= 3000) return 9.99;
    // Above 3kg
    return 9.99 + Math.ceil((totalWeight - 3000) / 1000) * 2.00;
  } else {
    // Home Delivery (Colissimo / Tracked)
    if (totalWeight <= 250) return 8.99;
    if (totalWeight <= 500) return 9.99;
    if (totalWeight <= 750) return 10.99;
    if (totalWeight <= 1000) return 11.99;
    if (totalWeight <= 2000) return 13.99;
    // Above 2kg
    return 13.99 + Math.ceil((totalWeight - 2000) / 1000) * 2.50;
  }
};
