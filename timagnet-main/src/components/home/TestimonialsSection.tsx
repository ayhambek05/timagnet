import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";

export function TestimonialsSection() {
  const { t } = useTranslation();
  const testimonials = t('testimonials.list', { returnObjects: true }) as any[];

  return (
    <section className="py-16 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 bg-[#F0FDF9]">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">{t('testimonials.title')}</h2>
          <p className="text-muted-foreground">
            {t('testimonials.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {Array.isArray(testimonials) && testimonials.map((testimonial) => (
            <div 
              key={testimonial.name}
              className="bg-background rounded-xl border p-6 space-y-4"
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-muted text-muted-foreground font-medium">
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>
                <h4 className="font-semibold">{testimonial.name}</h4>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
