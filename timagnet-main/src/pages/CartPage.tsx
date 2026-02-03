import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Truck, Trash2, Loader2, ArrowLeft, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DEPARTMENTS } from "@/data/french-locations";
import { calculateDeliveryFee } from "@/utils/pricing";
import SEO from "@/components/SEO";
import { useCart } from "@/context/CartContext";
import { Link, useNavigate } from "react-router-dom";

const PROMO_CODES: Record<string, number> = {
  'MAGNET5': 0.05,
  'MAGNET10': 0.10,
  'MAGNET15': 0.15,
  'ADMIN99': 0.99
};

const CartPage = () => {
  const { t } = useTranslation();
  const { items, removeFromCart, cartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [deliveryOption, setDeliveryOption] = useState("mondial_relay");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    province: "",
    postalCode: "",
  });
  const [availableCities, setAvailableCities] = useState<any[]>([]);
  const [isCityLoading, setIsCityLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRelayPoint, setSelectedRelayPoint] = useState<any>(null);

  // Promo Code State
  const [promoCodeInput, setPromoCodeInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  // Initialize Mondial Relay Widget
  useEffect(() => {
    if (deliveryOption === "mondial_relay") {
      const initWidget = () => {
        const $ = (window as any).$;
        if ($ && $.fn.MR_ParcelShopPicker) {
          $("#Zone_Widget").empty(); // Clear previous instance
          $("#Zone_Widget").MR_ParcelShopPicker({
            Target: "#Zone_Widget",
            Brand: "CC23RVS0", // Updated with user provided Brand Code
            Country: "FR",
            PostCode: address.postalCode || "75001",
            ColLivMod: "24R",
            NbResults: "7",
            Responsive: true,
            ShowResultsOnMap: true,
            OnParcelShopSelected: (data: any) => {
              console.log("Selected Relay Point:", data);
              setSelectedRelayPoint(data);
            }
          });
        }
      };

      // Small delay to ensure DOM is ready
      setTimeout(initWidget, 500);
    } else {
      setSelectedRelayPoint(null);
    }
  }, [deliveryOption, address.postalCode]);

  // Calculate delivery fees
  const deliveryFee = calculateDeliveryFee(items, deliveryOption);

  const totalWithDelivery = Math.max(0, cartTotal - discountAmount + deliveryFee);

  const handleApplyPromo = () => {
    const code = promoCodeInput.trim().toUpperCase();
    if (!code) return;

    if (PROMO_CODES[code]) {
      const discount = cartTotal * PROMO_CODES[code];
      setDiscountAmount(discount);
      setAppliedPromo(code);
      toast({
        title: t('cart.toast.promo_applied'),
        description: t('cart.toast.promo_desc', { percent: PROMO_CODES[code] * 100 }),
      });
    } else {
      toast({
        variant: "destructive",
        title: t('cart.toast.invalid_code'),
        description: t('cart.toast.invalid_code_desc'),
      });
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setDiscountAmount(0);
    setPromoCodeInput("");
  };

  const isComplete = items.length > 0 && email && phone && address.name && (deliveryOption === "mondial_relay" ? selectedRelayPoint : (address.street && address.city && address.postalCode && address.province));
  
  const handleOrderSubmit = async () => {
    if (items.length === 0) return;
    
    setIsSubmitting(true);
    
    try {
      const payload = {
        items: items.map(item => ({
          productId: item.productId,
          productName: item.productName,
          dimensions: item.dimensions,
          quantity: item.quantity,
          price: item.price,
          imagesData: item.images
        })),
        totalPrice: totalWithDelivery,
        deliveryFee: deliveryFee,
        deliveryOption: deliveryOption,
        customerEmail: email,
        customerName: address.name,
        customerPhone: phone,
        customerAddress: deliveryOption === "mondial_relay" && selectedRelayPoint ? {
            ...address,
            relayPointId: selectedRelayPoint.ID,
            relayPointName: selectedRelayPoint.Nom,
            relayPointAddress: `${selectedRelayPoint.Adresse1}, ${selectedRelayPoint.CP} ${selectedRelayPoint.Ville}`
        } : address,
        relayPointInfo: selectedRelayPoint,
        promoCode: appliedPromo,
        discountAmount: discountAmount
      };

      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit order');
      }
      
      toast({
        title: t('order.success_title'),
        description: t('cart.redirect_payment'),
      });
      
      clearCart();
      
      if (result.paymentUrl) {
          window.location.href = result.paymentUrl;
      } else {
          // Fallback if no URL
          navigate('/');
      }
      
    } catch (error) {
      console.error('Order submission error:', error);
      toast({
        variant: "destructive",
        title: t('cart.toast.error'),
        description: error instanceof Error ? error.message : t('cart.toast.error_desc'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchCities = async () => {
        if (address.postalCode && address.postalCode.length === 5) {
            setIsCityLoading(true);
            try {
                const response = await fetch(`https://geo.api.gouv.fr/communes?codePostal=${address.postalCode}&fields=nom,code`);
                const data = await response.json();
                setAvailableCities(data);
                
                if (data.length === 1 && !address.city) {
                    setAddress(prev => ({ ...prev, city: data[0].nom }));
                }
            } catch (error) {
                console.error("Error fetching cities:", error);
                setAvailableCities([]);
            } finally {
                setIsCityLoading(false);
            }
        } else {
            setAvailableCities([]);
        }
    };

    const timer = setTimeout(fetchCities, 300);
    return () => clearTimeout(timer);
  }, [address.postalCode]);

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F0FDF9]">
        <Header />
        <main className="flex-1 container py-12 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
            <ShoppingCart className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">{t('cart.empty_title')}</h1>
          <p className="text-muted-foreground mb-8">{t('cart.empty_desc')}</p>
          <Button asChild size="lg">
            <Link to="/order">{t('cart.create_magnets')}</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F0FDF9]">
      <SEO 
        title={t('seo.cart_title')}
        description={t('seo.cart_desc')}
      />
      <Header />
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" asChild className="-ml-4">
              <Link to="/order">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('cart.continue_shopping')}
              </Link>
            </Button>
            <h1 className="text-3xl font-bold ml-auto">{t('cart.my_cart')}</h1>
          </div>

          <div className="flex flex-col gap-8">
            {/* Cart Items */}
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-background border rounded-xl p-4 flex gap-4">
                  <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    {item.images[0] ? (
                      <img src={item.images[0]} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                        {t('cart.no_image')}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{item.productName}</h3>
                        <p className="text-sm text-muted-foreground">{item.quantity} {t('order.magnets')}</p>
                      </div>
                      <p className="font-semibold">{item.price.toFixed(2)} €</p>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <p className="text-xs text-muted-foreground">
                        {t('cart.images_imported', { count: item.images.filter(Boolean).length })}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        {t('cart.delete')}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary & Checkout */}
            <div className="space-y-6">
              <div className="bg-background border rounded-xl p-6">
                <h2 className="font-semibold mb-4">{t('cart.summary')}</h2>
                <div className="flex justify-between items-center mb-2">
                  <span>{t('cart.subtotal')}</span>
                  <span>{cartTotal.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between items-center mb-4 text-sm text-muted-foreground">
                  <span>{t('cart.delivery_fees')} ({deliveryOption === 'mondial_relay' ? t('order.mondial_relay') : t('cart.delivery_home')})</span>
                  <span>{deliveryFee.toFixed(2)} €</span>
                </div>

                {appliedPromo ? (
                  <div className="flex justify-between items-center mb-4 text-sm text-green-600">
                    <div className="flex items-center gap-2">
                      <span>{t('cart.promo_code')} ({appliedPromo})</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-auto p-0 text-red-500 hover:text-red-700 hover:bg-transparent"
                        onClick={handleRemovePromo}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                    <span>-{discountAmount.toFixed(2)} €</span>
                  </div>
                ) : (
                  <div className="flex gap-2 mb-4">
                    <Input 
                      placeholder={t('cart.promo_code')} 
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value)}
                      className="h-9"
                    />
                    <Button variant="outline" size="sm" onClick={handleApplyPromo}>
                      {t('cart.apply')}
                    </Button>
                  </div>
                )}

                <div className="flex justify-between items-center pt-4 border-t text-lg font-bold">
                  <span>{t('cart.total')}</span>
                  <span>{totalWithDelivery.toFixed(2)} €</span>
                </div>
              </div>

              {/* Contact & Delivery Form */}
              <div className="bg-background border rounded-xl p-6 space-y-6">
                <h2 className="font-semibold">{t('cart.delivery_details')}</h2>
                
                {/* Contact Info */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs">{t('order.name')} *</Label>
                    <Input
                      id="name"
                      value={address.name}
                      onChange={(e) => setAddress({ ...address, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs">{t('order.email')} *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs">{t('order.phone')} *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Delivery Option */}
                <RadioGroup value={deliveryOption} onValueChange={setDeliveryOption}>
                  <div className="space-y-3">
                    
                    {/* Mondial Relay Option */}
                    <div className={`border rounded-lg transition-colors ${deliveryOption === "mondial_relay" ? "border-primary bg-primary/5" : ""}`}>
                      <label className="flex items-start gap-3 p-3 cursor-pointer">
                        <RadioGroupItem value="mondial_relay" id="mondial_relay" className="mt-1" />
                        <div>
                          <div className="flex items-center gap-2 font-medium text-sm">
                            <MapPin className="w-3 h-3" />
                            {t('order.mondial_relay')}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{t('order.mondial_relay_desc')}</p>
                        </div>
                      </label>
                      
                      {deliveryOption === "mondial_relay" && (
                        <div className="px-3 pb-3 animate-in fade-in zoom-in-95 duration-300">
                           <div className="text-xs text-muted-foreground mb-2">{t('cart.select_relay')}</div>
                           <div id="Zone_Widget" className="w-full h-[500px] bg-white rounded border overflow-hidden"></div>
                           
                           {selectedRelayPoint ? (
                               <div className="mt-2 text-xs text-green-700 bg-green-50 p-2 rounded border border-green-200 flex items-start gap-2">
                                   <MapPin className="w-4 h-4 mt-0.5" />
                                   <div>
                                       <strong>{t('cart.selected_point')}</strong><br/>
                                       {selectedRelayPoint.Nom}<br/>
                                       {selectedRelayPoint.Adresse1}<br/>
                                       {selectedRelayPoint.CP} {selectedRelayPoint.Ville}
                                   </div>
                               </div>
                           ) : (
                               <p className="text-xs text-red-500 mt-2 font-medium">
                                   * {t('cart.select_relay_error')}
                               </p>
                           )}
                        </div>
                      )}
                    </div>

                    <label className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer ${deliveryOption === "shipping" ? "border-primary bg-primary/5" : ""}`}>
                      <RadioGroupItem value="shipping" id="shipping" className="mt-1" />
                      <div>
                        <div className="flex items-center gap-2 font-medium text-sm">
                          <Truck className="w-3 h-3" />
                          {t('order.shipping')}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{t('order.shipping_desc')}</p>
                      </div>
                    </label>
                  </div>
                </RadioGroup>

                {/* Shipping Address */}
                {deliveryOption === "shipping" && (
                <div className="space-y-3 animate-in slide-in-from-top-2">
                  <div className="space-y-2">
                    <Label htmlFor="street" className="text-xs">{t('order.street')} *</Label>
                    <Input
                      id="street"
                      value={address.street}
                      onChange={(e) => setAddress({ ...address, street: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="postalCode" className="text-xs">{t('order.postal_code')} *</Label>
                      <Input
                        id="postalCode"
                        value={address.postalCode}
                        maxLength={5}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          setAddress({ ...address, postalCode: val });
                        }}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-xs">{t('order.city')} *</Label>
                      <Select 
                        value={address.city} 
                        onValueChange={(value) => setAddress({ ...address, city: value })}
                        required
                      >
                        <SelectTrigger id="city">
                          <SelectValue placeholder={isCityLoading ? "..." : (address.city || "Ville")} />
                        </SelectTrigger>
                        <SelectContent>
                          {availableCities.map((city) => (
                            <SelectItem key={city.code} value={city.nom}>
                              {city.nom}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="province" className="text-xs">{t('order.province')} *</Label>
                     <Select
                       value={address.province}
                       onValueChange={(value) => setAddress({ ...address, province: value })}
                       required
                     >
                         <SelectTrigger id="province">
                             <SelectValue placeholder={t('order.department_placeholder')} />
                         </SelectTrigger>
                         <SelectContent className="max-h-[300px]">
                            {DEPARTMENTS.filter(d => !d.isOverseas).map((dept) => (
                                <SelectItem key={dept.code} value={`${dept.name} (${dept.code})`}>
                                    {dept.code} - {dept.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                     </Select>
                     <p className="text-[10px] text-muted-foreground mt-1">
                        {t('order.shipping_info')}
                     </p>
                  </div>
                </div>
                )}

                <Button 
                  className="w-full" 
                  size="lg"
                  disabled={!isComplete || isSubmitting}
                  onClick={handleOrderSubmit}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('cart.wait')}
                    </>
                  ) : (
                    t('cart.order_pay')
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
