import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { useTranslation } from "react-i18next";

// Import images
import ref1 from "@/assets/references/Ti'Magnet (1).png";
import ref2 from "@/assets/references/Ti'Magnet (2).png";
import ref3 from "@/assets/references/Ti'Magnet (3).png";
import ref4 from "@/assets/references/Ti'Magnet (4).png";
import ref5 from "@/assets/references/Ti'Magnet (5).png";
import ref6 from "@/assets/references/Ti'Magnet (6).png";
import ref7 from "@/assets/references/Ti'Magnet (7).png";
import ref8 from "@/assets/references/Ti'Magnet (8).png";
import ref9 from "@/assets/references/Ti'Magnet (9).png";

const creations = [
  ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9
];

const CreationsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col bg-[#F0FDF9]">
      <SEO 
        title={t('creations.seo_title')}
        description={t('creations.seo_desc')}
        url="https://timagnet.com/creations"
      />
      <Header />
      <main className="flex-1 py-12">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('creations.title')}</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('creations.description')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {creations.map((img, index) => (
              <div 
                key={index} 
                className="group relative aspect-square overflow-hidden rounded-xl bg-muted"
              >
                <img
                  src={img}
                  alt={`Ti'Magnet Creation ${index + 1}`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreationsPage;
