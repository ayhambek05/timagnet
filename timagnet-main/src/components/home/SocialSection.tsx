import { Button } from "@/components/ui/button";
import { Instagram, Facebook } from "lucide-react";
import { useTranslation } from "react-i18next";

export function SocialSection() {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-muted/30 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">{t('social.title')}</h2>
          <p className="text-muted-foreground">
            {t('social.description')}
          </p>
          
          <div className="flex justify-center gap-4 pt-4 flex-wrap">
            <Button variant="outline" asChild className="gap-2">
              <a 
                href="https://www.instagram.com/timagnet.aimant" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Instagram className="w-4 h-4" />
                Suivre sur Instagram
              </a>
            </Button>
            <Button variant="outline" asChild className="gap-2">
              <a 
                href="https://www.facebook.com/timagnet.aimant" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Facebook className="w-4 h-4" />
                Suivre sur Facebook
              </a>
            </Button>
            <Button variant="outline" asChild className="gap-2">
              <a 
                href="https://www.tiktok.com/@weeeseen" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
                </svg>
                Suivre sur TikTok
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
