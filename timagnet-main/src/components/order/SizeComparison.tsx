import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Ruler } from "lucide-react";

export const SizeComparison = () => {
  const { t } = useTranslation();

  // Scale factor: 1mm = 3px for good visibility on desktop
  const scale = 3;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Ruler className="w-4 h-4" />
          {t('order.compare_sizes')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-6 text-center">{t('order.size_comparison_title')}</h2>
          
          <div className="flex flex-col gap-12 items-center justify-center">
            {/* Square Comparison */}
            <div className="flex flex-col items-center gap-4">
              <h3 className="font-semibold text-muted-foreground">{t('order.square_comparison')}</h3>
              <div className="flex items-end gap-8 items-baseline">
                <div className="flex flex-col items-center gap-2">
                  <div 
                    className="bg-primary/20 border-2 border-primary rounded flex items-center justify-center relative transition-all hover:bg-primary/30"
                    style={{ width: 50 * scale, height: 50 * scale }}
                  >
                    <span className="font-bold text-primary">50x50</span>
                  </div>
                  <span className="text-sm text-muted-foreground">50 x 50 mm</span>
                </div>
                
                <div className="text-muted-foreground font-medium">vs</div>

                <div className="flex flex-col items-center gap-2">
                  <div 
                    className="bg-primary/20 border-2 border-primary rounded flex items-center justify-center relative transition-all hover:bg-primary/30"
                    style={{ width: 63 * scale, height: 63 * scale }}
                  >
                    <span className="font-bold text-primary">63x63</span>
                  </div>
                  <span className="text-sm text-muted-foreground">63 x 63 mm</span>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-border" />

            {/* Rectangle Formats */}
            <div className="flex flex-col items-center gap-4">
              <h3 className="font-semibold text-muted-foreground">{t('order.rectangle_comparison')}</h3>
              <div className="flex flex-wrap justify-center gap-8 items-end">
                <div className="flex flex-col items-center gap-2">
                  <div 
                    className="bg-primary/10 border-2 border-primary/50 rounded flex items-center justify-center transition-all hover:bg-primary/20"
                    style={{ width: 53 * scale, height: 80 * scale }}
                  >
                    <span className="font-medium text-primary/80">53x80</span>
                  </div>
                  <span className="text-sm text-muted-foreground">53 x 80 mm</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div 
                    className="bg-primary/10 border-2 border-primary/50 rounded flex items-center justify-center transition-all hover:bg-primary/20"
                    style={{ width: 65 * scale, height: 90 * scale }}
                  >
                    <span className="font-medium text-primary/80">65x90</span>
                  </div>
                  <span className="text-sm text-muted-foreground">65 x 90 mm</span>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-center text-xs text-muted-foreground mt-8">
            * {t('order.scale_indication')}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
