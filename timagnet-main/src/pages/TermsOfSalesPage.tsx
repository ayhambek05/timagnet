import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useTranslation } from "react-i18next";

const TermsOfSalesPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-2">{t('legal.sales.title')}</h1>
        <p className="text-muted-foreground mb-6">{t('legal.sales.date')}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.sales.section1.title')}</h2>
          <div className="bg-muted/30 p-4 rounded-lg text-muted-foreground">
            <p>{t('legal.sales.section1.email')} <a href="mailto:contact@timagnet.com" className="text-primary hover:underline">contact@timagnet.com</a></p>
            <p>{t('legal.sales.section1.siret')}</p>
            <p>{t('legal.sales.section1.tva')}</p>
            <p className="mt-2"><strong>{t('legal.sales.section1.host')}</strong></p>
             {(t('legal.sales.section1.host_details', { returnObjects: true }) as string[]).map((line, i) => (
                <p key={i}>{line}</p>
              ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.sales.section2.title')}</h2>
          <p className="mb-2 text-muted-foreground">
            {t('legal.sales.section2.p1')}
          </p>
          <p className="text-muted-foreground">
            {t('legal.sales.section2.p2')}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.sales.section3.title')}</h2>
          
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">{t('legal.sales.section3.subsection1.title')}</h3>
            <p className="mb-2 text-muted-foreground">{t('legal.sales.section3.subsection1.intro')}</p>
            <ul className="list-disc pl-6 mb-2 space-y-1 text-muted-foreground">
               {(t('legal.sales.section3.subsection1.list', { returnObjects: true }) as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="text-muted-foreground">
              {t('legal.sales.section3.subsection1.p1')}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-2">{t('legal.sales.section3.subsection2.title')}</h3>
            <p className="mb-2 text-muted-foreground">{t('legal.sales.section3.subsection2.intro')}</p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
               {(t('legal.sales.section3.subsection2.list', { returnObjects: true }) as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.sales.section4.title')}</h2>
          
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">{t('legal.sales.section4.subsection1.title')}</h3>
            <p className="mb-2 text-muted-foreground">{t('legal.sales.section4.subsection1.intro')}</p>
            <ul className="list-disc pl-6 mb-2 space-y-1 text-muted-foreground">
               {(t('legal.sales.section4.subsection1.list', { returnObjects: true }) as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="text-muted-foreground">
              {t('legal.sales.section4.subsection1.p1')}
            </p>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">{t('legal.sales.section4.subsection2.title')}</h3>
            <p className="mb-2 text-muted-foreground">
              {t('legal.sales.section4.subsection2.p1')}
            </p>
            <p className="mb-2 text-muted-foreground">
              {t('legal.sales.section4.subsection2.p2')}
            </p>
            <ul className="list-disc pl-6 mb-2 space-y-1 text-muted-foreground">
               {(t('legal.sales.section4.subsection2.list', { returnObjects: true }) as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-2">{t('legal.sales.section4.subsection3.title')}</h3>
            <p className="text-muted-foreground">
              {t('legal.sales.section4.subsection3.content')}
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.sales.section5.title')}</h2>
          
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">{t('legal.sales.section5.subsection1.title')}</h3>
            <p className="mb-2 text-muted-foreground">
              {t('legal.sales.section5.subsection1.p1')}
            </p>
            <p className="mb-2 text-muted-foreground">{t('legal.sales.section5.subsection1.p2')}</p>
            <ul className="list-disc pl-6 mb-2 space-y-1 text-muted-foreground">
               {(t('legal.sales.section5.subsection1.list', { returnObjects: true }) as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="text-muted-foreground">
              {t('legal.sales.section5.subsection1.p3')}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-2">{t('legal.sales.section5.subsection2.title')}</h3>
            <p className="text-muted-foreground">
              {t('legal.sales.section5.subsection2.content')}
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.sales.section6.title')}</h2>
          
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">{t('legal.sales.section6.subsection1.title')}</h3>
            <p className="mb-2 text-muted-foreground">{t('legal.sales.section6.subsection1.intro')}</p>
            <ul className="list-disc pl-6 mb-2 space-y-1 text-muted-foreground">
               {(t('legal.sales.section6.subsection1.list', { returnObjects: true }) as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="text-muted-foreground">
              {t('legal.sales.section6.subsection1.p1')}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-2">{t('legal.sales.section6.subsection2.title')}</h3>
            <p className="text-muted-foreground">
              {t('legal.sales.section6.subsection2.content')}
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.sales.section7.title')}</h2>
          
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">{t('legal.sales.section7.subsection1.title')}</h3>
            <p className="mb-2 text-muted-foreground">{t('legal.sales.section7.subsection1.intro')}</p>
            <ul className="list-disc pl-6 mb-2 space-y-1 text-muted-foreground">
               {(t('legal.sales.section7.subsection1.list', { returnObjects: true }) as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="mb-2 text-muted-foreground">
              {t('legal.sales.section7.subsection1.p1')}
            </p>
            <p className="text-muted-foreground">
              {t('legal.sales.section7.subsection1.p2')}
            </p>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">{t('legal.sales.section7.subsection2.title')}</h3>
            <p className="mb-2 text-muted-foreground font-medium">{t('legal.sales.section7.subsection2.intro')}</p>
            <ul className="list-disc pl-6 mb-2 space-y-1 text-muted-foreground">
               {(t('legal.sales.section7.subsection2.list', { returnObjects: true }) as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="text-muted-foreground">
              {t('legal.sales.section7.subsection2.p1')}
            </p>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">{t('legal.sales.section7.subsection3.title')}</h3>
            <p className="mb-4 text-muted-foreground">
              {t('legal.sales.section7.subsection3.p1')}
            </p>
            <p className="mb-2 text-muted-foreground">
              {t('legal.sales.section7.subsection3.p2')}
            </p>
            <p className="mb-2 text-muted-foreground">
              {t('legal.sales.section7.subsection3.p3')}
            </p>
            <p className="mb-2 text-muted-foreground">
              {t('legal.sales.section7.subsection3.p4')}
            </p>
            <p className="text-muted-foreground">
              {t('legal.sales.section7.subsection3.p5')}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-2">{t('legal.sales.section7.subsection4.title')}</h3>
            <p className="mb-2 text-muted-foreground">
              {t('legal.sales.section7.subsection4.intro')}
            </p>
            <ul className="list-disc pl-6 mb-2 space-y-1 text-muted-foreground">
               {(t('legal.sales.section7.subsection4.list', { returnObjects: true }) as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.sales.section8.title')}</h2>
          <p className="mb-2 text-muted-foreground">
            {t('legal.sales.section8.p1')}
          </p>
          <p className="mb-2 text-muted-foreground">
            {t('legal.sales.section8.p2')}
          </p>
          <p className="text-muted-foreground">
            {t('legal.sales.section8.p3')}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.sales.section9.title')}</h2>
          
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">{t('legal.sales.section9.subsection1.title')}</h3>
            <p className="mb-2 text-muted-foreground">
              {t('legal.sales.section9.subsection1.intro')}
            </p>
            <ul className="list-disc pl-6 mb-2 space-y-1 text-muted-foreground">
               {(t('legal.sales.section9.subsection1.list1', { returnObjects: true }) as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="mb-2 text-muted-foreground">{t('legal.sales.section9.subsection1.p1')}</p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
               {(t('legal.sales.section9.subsection1.list2', { returnObjects: true }) as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-2">{t('legal.sales.section9.subsection2.title')}</h3>
            <p className="mb-2 text-muted-foreground">{t('legal.sales.section9.subsection2.intro')}</p>
            <ul className="list-disc pl-6 mb-2 space-y-1 text-muted-foreground">
               {(t('legal.sales.section9.subsection2.list', { returnObjects: true }) as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="text-muted-foreground">
              {t('legal.sales.section9.subsection2.p1')}
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.sales.section10.title')}</h2>
          
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">{t('legal.sales.section10.subsection1.title')}</h3>
            <p className="text-muted-foreground">
              {t('legal.sales.section10.subsection1.content')} <a href="mailto:contact@timagnet.com" className="text-primary hover:underline">contact@timagnet.com</a>.
            </p>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">{t('legal.sales.section10.subsection2.title')}</h3>
            <p className="mb-2 text-muted-foreground">{t('legal.sales.section10.subsection2.intro')}</p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
               {(t('legal.sales.section10.subsection2.list', { returnObjects: true }) as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">{t('legal.sales.section10.subsection3.title')}</h3>
            <p className="mb-2 text-muted-foreground">{t('legal.sales.section10.subsection3.intro')}</p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
               {(t('legal.sales.section10.subsection3.list', { returnObjects: true }) as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">{t('legal.sales.section10.subsection4.title')}</h3>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
               {(t('legal.sales.section10.subsection4.list', { returnObjects: true }) as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">{t('legal.sales.section10.subsection5.title')}</h3>
            <p className="mb-2 text-muted-foreground">
              {t('legal.sales.section10.subsection5.intro')}
            </p>
            <ul className="list-disc pl-6 mb-2 space-y-1 text-muted-foreground">
               {(t('legal.sales.section10.subsection5.list', { returnObjects: true }) as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="mb-2 text-muted-foreground">
              {t('legal.sales.section10.subsection5.contact')} <a href="mailto:contact@timagnet.com" className="text-primary hover:underline">contact@timagnet.com</a>
            </p>
            <p className="text-muted-foreground">{t('legal.sales.section10.subsection5.p1')}</p>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">{t('legal.sales.section10.subsection6.title')}</h3>
            <p className="text-muted-foreground">
              {t('legal.sales.section10.subsection6.content')}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-2">{t('legal.sales.section10.subsection7.title')}</h3>
            <p className="mb-2 text-muted-foreground">
              {t('legal.sales.section10.subsection7.intro')}
            </p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
               {(t('legal.sales.section10.subsection7.list', { returnObjects: true }) as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.sales.section11.title')}</h2>
          <p className="text-muted-foreground">
            {t('legal.sales.section11.content')}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.sales.section12.title')}</h2>
          <p className="text-muted-foreground">
            {t('legal.sales.section12.content')}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.sales.section13.title')}</h2>
          <p className="text-muted-foreground">
            {t('legal.sales.section13.content')}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.sales.section14.title')}</h2>
          <p className="text-muted-foreground">
            {t('legal.sales.section14.content')}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.sales.section15.title')}</h2>
          <p className="mb-2 text-muted-foreground">
            {t('legal.sales.section15.p1')}
          </p>
          <p className="mb-2 text-muted-foreground">
            {t('legal.sales.section15.p2')} <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://ec.europa.eu/consumers/odr/</a>
          </p>
          <p className="text-muted-foreground">
            {t('legal.sales.section15.p3')}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.sales.section16.title')}</h2>
          <p className="mb-2 text-muted-foreground">{t('legal.sales.section16.intro')}</p>
          <p className="mb-2 text-muted-foreground">
            {t('legal.sales.section16.email')} <a href="mailto:contact@timagnet.com" className="text-primary hover:underline">contact@timagnet.com</a>
          </p>
          <p className="text-muted-foreground">
            {t('legal.sales.section16.note')}
          </p>
        </section>

        <p className="text-center font-medium mt-12 mb-8">
          {t('legal.sales.footer_note')}
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfSalesPage;
