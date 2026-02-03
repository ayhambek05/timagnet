import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import OrderPage from "./pages/OrderPage";
import ContactPage from "./pages/ContactPage";
import CookiePolicyPage from "./pages/CookiePolicyPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfSalesPage from "./pages/TermsOfSalesPage";
import TermsOfUsePage from "./pages/TermsOfUsePage";
import NotFound from "./pages/NotFound";
import CookieConsent from "./components/CookieConsent";
import { BackToTop } from "./components/layout/BackToTop";

import { CartProvider } from "./context/CartContext";
import CartPage from "./pages/CartPage";
import CreationsPage from "./pages/CreationsPage";
import SuccessPage from "./pages/SuccessPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/creations" element={<CreationsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          <Route path="/cookie-policy" element={<CookiePolicyPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-sales" element={<TermsOfSalesPage />} />
          <Route path="/terms-of-use" element={<TermsOfUsePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieConsent />
          <BackToTop />
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
