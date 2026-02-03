import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useTranslation } from "react-i18next";
import Autoplay from "embla-carousel-autoplay";

export function ReferencesSection() {
  const { t } = useTranslation();

  // Dynamically import all images from the references folder
  const imagesGlob = import.meta.glob('@/assets/references/*.png', { eager: true });
  const references = Object.values(imagesGlob).map((mod: any) => mod.default);

  if (references.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-muted/30">
        <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 tracking-tight">
                {t('references.title')}
            </h2>
            <Carousel
                opts={{
                    loop: true,
                    align: "start",
                }}
                plugins={[
                    Autoplay({
                        delay: 3000,
                    }),
                ]}
                className="w-full max-w-5xl mx-auto"
            >
                <CarouselContent className="-ml-4">
                    {references.map((ref, index) => (
                        <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                            <div className="overflow-hidden rounded-xl border bg-background shadow-sm aspect-[4/3] group cursor-pointer">
                                <img
                                    src={ref}
                                    alt={`Reference ${index + 1}`}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex -left-12" />
                <CarouselNext className="hidden md:flex -right-12" />
            </Carousel>
        </div>
    </section>
  );
}
