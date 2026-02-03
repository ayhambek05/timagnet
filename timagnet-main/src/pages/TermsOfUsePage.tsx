import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";

const TermsOfUsePage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-2">{t('legal.use.title')}</h1>
        <p className="text-muted-foreground mb-6">{t('legal.use.date')}</p>

        <p className="mb-8 text-muted-foreground">
          {t('legal.use.intro')}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.use.section1.title')}</h2>
          <p className="mb-2 text-muted-foreground">{t('legal.use.section1.intro')}</p>
          <div className="bg-muted/30 p-4 rounded-lg text-muted-foreground">
            <p>{t('legal.use.section1.email')} <a href="mailto:contact@timagnet.com" className="text-primary hover:underline">contact@timagnet.com</a></p>
            <p>{t('legal.use.section1.siret')}</p>
            <p className="mt-2"><strong>{t('legal.use.section1.host')}</strong></p>
             {(t('legal.use.section1.host_details', { returnObjects: true }) as string[]).map((line, i) => (
                <p key={i}>{line}</p>
              ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.use.section2.title')}</h2>
          <p className="mb-2 text-muted-foreground">{t('legal.use.section2.intro')}</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
             {(t('legal.use.section2.list', { returnObjects: true }) as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.use.section3.title')}</h2>
          <p className="mb-2 text-muted-foreground">
            {t('legal.use.section3.p1')}
          </p>
          <p className="mb-2 text-muted-foreground">
            {t('legal.use.section3.p2')}
          </p>
          <p className="text-muted-foreground">
            {t('legal.use.section3.p3')}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.use.section4.title')}</h2>
          <p className="mb-2 text-muted-foreground">
            {t('legal.use.section4.p1')}
          </p>
          <p className="mb-2 text-muted-foreground">{t('legal.use.section4.p2')}</p>
          <ul className="list-disc pl-6 mb-2 space-y-1 text-muted-foreground">
             {(t('legal.use.section4.list', { returnObjects: true }) as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
          </ul>
          <p className="mb-2 text-muted-foreground">
            {t('legal.use.section4.p3')}
          </p>
          <p className="text-muted-foreground">
            {t('legal.use.section4.p4')}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.use.section5.title')}</h2>
          <p className="mb-4 text-muted-foreground">
            {t('legal.use.section5.intro')}
          </p>
          
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">{t('legal.use.section5.subsection1.title')}</h3>
            <p className="mb-2 text-muted-foreground">{t('legal.use.section5.subsection1.intro')}</p>
            <ul className="list-disc pl-6 mb-2 space-y-1 text-muted-foreground">
               {(t('legal.use.section5.subsection1.list', { returnObjects: true }) as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="text-muted-foreground">
              {t('legal.use.section5.subsection1.p1')}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-2">{t('legal.use.section5.subsection2.title')}</h3>
            <p className="mb-2 text-muted-foreground">{t('legal.use.section5.subsection2.intro')}</p>
            <ul className="list-disc pl-6 mb-2 space-y-1 text-muted-foreground">
               {(t('legal.use.section5.subsection2.list', { returnObjects: true }) as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="text-muted-foreground">
              {t('legal.use.section5.subsection2.p1')}
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.use.section6.title')}</h2>
          <p className="mb-2 text-muted-foreground">
            {t('legal.use.section6.p1')}
          </p>
          <p className="mb-2 text-muted-foreground">
            {t('legal.use.section6.p2')}
          </p>
          <p className="mb-2 text-muted-foreground">
            {t('legal.use.section6.p3')}
          </p>
          <p className="text-muted-foreground">
            {t('legal.use.section6.p4')}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.use.section7.title')}</h2>
          <p className="mb-2 text-muted-foreground">
            {t('legal.use.section7.p1')}
          </p>
          <p className="text-muted-foreground">
            {t('legal.use.section7.p2')}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.use.section8.title')}</h2>
          <p className="mb-2 text-muted-foreground">
            {t('legal.use.section8.p1')}
          </p>
          <p className="mb-2 text-muted-foreground">{t('legal.use.section8.p2')}</p>
          <ul className="list-disc pl-6 mb-2 space-y-1 text-muted-foreground">
             {(t('legal.use.section8.list', { returnObjects: true }) as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
          </ul>
          <p className="text-muted-foreground">
            {t('legal.use.section8.p3')}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.use.section9.title')}</h2>
          <p className="mb-2 text-muted-foreground">
            {t('legal.use.section9.intro')}
          </p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
             {(t('legal.use.section9.list', { returnObjects: true }) as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.use.section10.title')}</h2>
          <p className="mb-2 text-muted-foreground">
            {t('legal.use.section10.p1')}
          </p>
          <p className="text-muted-foreground">
            <Trans 
              i18nKey="legal.use.section10.p2"
              components={[<Link to="/privacy-policy" className="text-primary hover:underline" key="0" />]}
            />
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.use.section11.title')}</h2>
          <p className="mb-2 text-muted-foreground">
            {t('legal.use.section11.p1')}
          </p>
          <p className="text-muted-foreground">
            <Trans 
              i18nKey="legal.use.section11.p2"
              components={[<Link to="/cookie-policy" className="text-primary hover:underline" key="0" />]}
            />
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.use.section12.title')}</h2>
          <p className="mb-2 text-muted-foreground">
            {t('legal.use.section12.p1')}
          </p>
          <p className="text-muted-foreground">
            {t('legal.use.section12.p2')}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.use.section13.title')}</h2>
          <p className="mb-2 text-muted-foreground">
            {t('legal.use.section13.p1')}
          </p>
          <p className="text-muted-foreground">
            {t('legal.use.section13.p2')}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.use.section14.title')}</h2>
          <p className="mb-2 text-muted-foreground">
            {t('legal.use.section14.p1')}
          </p>
          <p className="text-muted-foreground">
            {t('legal.use.section14.p2')}
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfUsePage;
