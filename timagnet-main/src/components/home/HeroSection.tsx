import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-magnets.png";
import item2 from "@/assets/items/item-2.png";
import item3 from "@/assets/items/item-3.png";

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-24 overflow-hidden bg-[#F0FDF9]">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {t('hero.title_part1')}<br />
              <span className="text-muted-foreground">{t('hero.title_part2')}</span><br />
              {t('hero.title_part3')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              {t('hero.description')}
            </p>
            <Button asChild size="lg" className="px-8">
              <Link to="/order">{t('hero.cta')}</Link>
            </Button>
          </div>
          
          <div className="relative">
            <img 
              src={heroImage} 
              alt={t('hero.alt_image')}
              className="rounded-2xl w-full relative z-10"
            />
            {/* Decorative items */}
            <div className="absolute -bottom-8 -left-8 z-20 animate-in fade-in zoom-in duration-700 delay-500">
              <img 
                src={item2} 
                className="w-20 h-20 md:w-28 md:h-28 -rotate-6 animate-float" 
                style={{ animationDelay: '1s' }}
                alt="" 
              />
            </div>
            <div className="absolute top-1/2 -right-12 z-20 animate-in fade-in zoom-in duration-700 delay-700">
              <img 
                src={item3} 
                className="w-16 h-16 md:w-24 md:h-24 rotate-12 opacity-90 animate-float" 
                style={{ animationDelay: '2s' }}
                alt="" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
