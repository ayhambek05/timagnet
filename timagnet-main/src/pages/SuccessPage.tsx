import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import SEO from "@/components/SEO";
import { useTranslation } from "react-i18next";

const SuccessPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col bg-[#F0FDF9]">
      <SEO 
        title={t('seo.success_title')}
        description={t('seo.success_desc')}
      />
      <Header />
      <main className="flex-1 container py-12 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-500">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-4 text-green-800">{t('success.payment_success')}</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-md">
          {t('success.success_message')}
        </p>
        <div className="flex gap-4">
          <Button asChild variant="outline">
            <Link to="/">{t('success.back_home')}</Link>
          </Button>
          <Button asChild>
            <Link to="/order">
              <ShoppingBag className="mr-2 h-4 w-4" />
              {t('success.order_again')}
            </Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SuccessPage;
