import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "@/assets/logo/Ti'Magnet.png";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t bg-muted/30 py-12">
      <div className="container">
        <div className="flex flex-col items-center gap-6 text-center">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Ti'Magnet Logo" className="h-24 w-auto" />
          </Link>
          
          <p className="text-sm text-muted-foreground max-w-md">
            {t('footer.description')}
          </p>
          
          <nav className="flex gap-6 text-sm text-muted-foreground flex-wrap justify-center">
            <Link to="/" className="hover:text-foreground transition-colors">{t('nav.home')}</Link>
            <Link to="/order" className="hover:text-foreground transition-colors">{t('nav.order')}</Link>
            <Link to="/contact" className="hover:text-foreground transition-colors">{t('nav.contact')}</Link>
            <Link to="/privacy-policy" className="hover:text-foreground transition-colors">{t('nav.privacy')}</Link>
            <Link to="/terms-of-sales" className="hover:text-foreground transition-colors">{t('nav.terms_sales')}</Link>
            <Link to="/terms-of-use" className="hover:text-foreground transition-colors">{t('nav.terms_use')}</Link>
            <Link to="/cookie-policy" className="hover:text-foreground transition-colors">{t('nav.cookie_policy')}</Link>
          </nav>
          
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Ti'Magnet. {t('footer.rights_reserved')} <br />
            {t('footer.created_by')} <a href="https://www.mena-core.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">MENA Core</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
