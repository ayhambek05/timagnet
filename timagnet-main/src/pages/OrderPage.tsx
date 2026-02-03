import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ImageUploadCard } from "@/components/order/ImageUploadCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RotateCcw, Trash2, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import SEO from "@/components/SEO";

const OrderPage = () => {
  const { t } = useTranslation();
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [quantity, setQuantity] = useState(PRODUCTS[0].options[0].value);
  const [images, setImages] = useState<(string | null)[]>(Array(parseInt(PRODUCTS[0].options[0].value)).fill(null));
  const { toast } = useToast();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const selectedOption = selectedProduct.options.find((opt) => opt.value === quantity) || selectedProduct.options[0];
  const imageCount = parseInt(quantity);
  
  const uploadedCount = images.filter(Boolean).length;
  // Valid if all images are uploaded. 
  // Allow partial upload? Usually for magnets users want to customize all.
  // The original code checked uploadedCount === imageCount && email && phone.
  // Now we just check uploadedCount === imageCount.
  const isComplete = uploadedCount === imageCount;

  const getProductName = (product: typeof PRODUCTS[0]) => {
    const shape = product.id.startsWith('50x50') || product.id.startsWith('63x63') 
      ? t('order.square') 
      : t('order.rectangle');
    return `${shape} ${product.dimensions}`;
  };

  const getOptionLabel = (option: typeof PRODUCTS[0]['options'][0]) => {
    return `${option.value} ${t('order.magnets')}`;
  };

  const handleProductChange = (productId: string) => {
    const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
    setSelectedProduct(product);
    // Reset quantity to first option of new product
    const firstOption = product.options[0];
    setQuantity(firstOption.value);
    
    // Reset images array with new size
    const newCount = parseInt(firstOption.value);
    setImages(prev => {
      // Create new array of correct size
      const newImages = Array(newCount).fill(null);
      // Copy existing images up to new size
      for(let i = 0; i < Math.min(prev.length, newCount); i++) {
        newImages[i] = prev[i];
      }
      return newImages;
    });
  };

  const handleQuantityChange = (value: string) => {
    setQuantity(value);
    const newCount = parseInt(value);
    setImages((prev) => {
      if (newCount > prev.length) {
        return [...prev, ...Array(newCount - prev.length).fill(null)];
      }
      return prev.slice(0, newCount);
    });
  };

  const handleImageChange = (index: number, image: string | null) => {
    setImages((prev) => {
      const newImages = [...prev];
      newImages[index] = image;
      return newImages;
    });
  };

  const handleFillAll = () => {
    const firstImage = images[0];
    if (firstImage) {
      setImages((prev) => prev.map((img) => img || firstImage));
    }
  };

  const handleClearAll = () => {
    setImages(Array(imageCount).fill(null));
  };
  
  const handleAddToCart = () => {
    if (!isComplete) return;

    const item = {
        id: crypto.randomUUID(),
        productId: selectedProduct.id,
        productName: getProductName(selectedProduct),
        dimensions: selectedProduct.dimensions,
        quantity: quantity,
        price: selectedOption.price,
        images: images,
        aspectRatio: selectedProduct.aspectRatio
    };

    addToCart(item);
    
    toast({
        title: t('order.added_to_cart'),
        description: t('order.added_to_cart_desc'),
    });

    navigate('/cart');
  };

  const getVisualDimensions = (id: string) => {
    switch(id) {
      case '50x50': return { width: '40px', height: '40px' };
      case '63x63': return { width: '50px', height: '50px' };
      case '53x80': return { width: '42px', height: '64px' };
      case '65x90': return { width: '52px', height: '72px' };
      default: return { width: '40px', height: '40px' };
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title={t('seo.order_title')}
        description={t('seo.order_desc')}
        url="https://timagnet.com/order"
      />
      <Header />
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{t('order.title')}</h1>
            <Badge variant="secondary" className="mb-4">{t('order.subtitle')}</Badge>
            <p className="text-muted-foreground">
              {t('order.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 mb-8">
            {/* Product Selection */}
            <div className="bg-background border rounded-xl p-6">
              <div className="mb-4">
                <h2 className="font-semibold mb-1">{t('order.format_title')}</h2>
                <p className="text-sm text-muted-foreground">
                  {t('order.format_desc')}
                </p>
              </div>
              
              <div className="space-y-4">
                <RadioGroup 
                  value={selectedProduct.id} 
                  onValueChange={handleProductChange}
                  className="grid grid-cols-1 gap-3"
                >
                  {PRODUCTS.map((product) => (
                    <label
                      key={product.id}
                      className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedProduct.id === product.id ? "border-primary bg-primary/5" : "hover:border-muted-foreground/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value={product.id} id={product.id} />
                        <div 
                          className="border-2 border-primary/20 bg-background rounded-sm shadow-sm flex-shrink-0"
                          style={getVisualDimensions(product.id)}
                        />
                        <span className="font-medium">{getProductName(product)}</span>
                      </div>
                    </label>
                  ))}
                </RadioGroup>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="bg-background border rounded-xl p-6">
              <div className="mb-4">
                <h2 className="font-semibold mb-1">{t('order.quantity_title')}</h2>
                <p className="text-sm text-muted-foreground">
                  {t('order.quantity_desc')}
                </p>
              </div>
              
              <div className="w-full">
                <Select value={quantity} onValueChange={handleQuantityChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedProduct.options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <span className="flex justify-between w-full gap-8">
                          <span>{getOptionLabel(option)}</span>
                          <span className="font-medium">
                            {option.price.toFixed(2)} €
                          </span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="mt-6 p-4 bg-muted/50 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-1">{t('order.price_total')}</p>
                  <p className="text-3xl font-bold text-primary">
                    {selectedOption?.price.toFixed(2)} €
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bulk Actions */}
          <div className="flex flex-col items-center gap-2 mb-6">
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="rounded-full bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 hover:text-blue-700"
                onClick={handleFillAll}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                {t('order.fill_all')}
              </Button>
              <Button
                variant="outline"
                className="rounded-full bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:text-red-700"
                onClick={handleClearAll}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {t('order.clear_all')}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              {t('order.bulk_desc')}
            </p>
          </div>

          {/* Image Upload Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {Array.from({ length: imageCount }).map((_, index) => (
              <ImageUploadCard
                key={index}
                index={index}
                image={images[index]}
                onImageChange={(img) => handleImageChange(index, img)}
                aspectRatio={selectedProduct.aspectRatio}
                description={t('order.format_label', { dimensions: selectedProduct.dimensions })}
              />
            ))}
          </div>

          {/* Add to Cart Button */}
          <div className="flex flex-col items-center gap-4 py-8 border-t">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">
                {t('order.images_uploaded', { count: uploadedCount, total: imageCount })}
              </p>
              <p className="text-2xl font-bold">
                {t('order.total')} : {selectedOption?.price.toFixed(2)} €
              </p>
            </div>
            <Button 
              size="lg" 
              className="px-12 w-full md:w-auto" 
              disabled={!isComplete}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {t('order.add_to_cart') || "Add to Cart"}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderPage;
