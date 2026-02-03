import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { ReferencesSection } from "@/components/home/ReferencesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { SocialSection } from "@/components/home/SocialSection";
import SEO from "@/components/SEO";

import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title={t('seo.home_title')}
        description={t('seo.home_desc')}
      />
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ReferencesSection />
        <TestimonialsSection />
        <SocialSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
