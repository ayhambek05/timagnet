import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import logo from "@/assets/logo/Ti'Magnet.png";
import { ShoppingCart, Menu } from "lucide-react";
import { useCart } from "@/context/CartContext";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

export function Header() {
  const location = useLocation();
  const { t } = useTranslation();
  const { items } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const isOrderPage = location.pathname === "/order";
  const isHomePage = location.pathname === "/";

  const NavItems = ({ mobile = false }) => (
    <>
      <Link 
        to="/creations" 
        className={`text-sm text-muted-foreground hover:text-foreground transition-colors ${mobile ? 'text-lg py-2' : ''}`}
        onClick={() => mobile && setIsOpen(false)}
      >
        {t('nav.creations')}
      </Link>

      <Link 
        to="/contact" 
        className={`text-sm text-muted-foreground hover:text-foreground transition-colors ${mobile ? 'text-lg py-2' : ''}`}
        onClick={() => mobile && setIsOpen(false)}
      >
        {t('nav.contact')}
      </Link>
      
      {!mobile && (
        <Button variant="ghost" size="icon" asChild className="relative">
          <Link to="/cart">
            <ShoppingCart className="h-5 w-5" />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>
        </Button>
      )}

      {!isOrderPage && (
        <Button asChild size={mobile ? "lg" : "sm"} className={mobile ? "w-full mt-4" : ""}>
          <Link to="/order" onClick={() => mobile && setIsOpen(false)}>{t('nav.order')}</Link>
        </Button>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src={logo} 
            alt="Ti'Magnet Logo" 
            className={`w-auto transition-all duration-300 ${isHomePage ? 'h-14' : 'h-10'}`} 
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <NavItems />
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-4 md:hidden">
          <Button variant="ghost" size="icon" asChild className="relative mr-2">
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>
          </Button>
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 mt-8">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Menu</span>
                  <LanguageSwitcher />
                </div>
                <nav className="flex flex-col gap-4">
                  <NavItems mobile />
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
