import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";

const CookiePolicyPage = () => {
  const { t } = useTranslation();

  const renderList = (key: string) => {
    const items = t(key, { returnObjects: true });
    if (!Array.isArray(items)) return null;
    return items.map((item: string, i: number) => (
      <li key={i}>{item}</li>
    ));
  };

  const renderTableHeaders = (key: string) => {
    const items = t(key, { returnObjects: true });
    if (!Array.isArray(items)) return null;
    return items.map((header: string, i: number) => (
      <th key={i} className="border border-border p-2 text-left">{header}</th>
    ));
  };

  const renderTableRows = (key: string) => {
    const items = t(key, { returnObjects: true });
    if (!Array.isArray(items)) return null;
    return items.map((row: string[], i: number) => (
      <tr key={i}>
        {row.map((cell, j) => (
          <td key={j} className="border border-border p-2">{cell}</td>
        ))}
      </tr>
    ));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title={t('seo.cookie_title')}
        description={t('seo.cookie_desc')}
        url="https://timagnet.com/cookie-policy"
      />
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">{t('legal.cookies.title')}</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.cookies.section1.title')}</h2>
          <p className="mb-4 text-muted-foreground">
            {t('legal.cookies.section1.content')}
          </p>
          <p className="mb-2 font-medium">{t('legal.cookies.section1.list_intro')}</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            {renderList('legal.cookies.section1.list')}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.cookies.section2.title')}</h2>
          <p className="mb-4 text-muted-foreground">{t('legal.cookies.section2.intro')}</p>
          
          <div className="mb-6">
            <h3 className="text-xl font-medium mb-2">{t('legal.cookies.section2.subsection1.title')}</h3>
            <p className="mb-2 text-muted-foreground">
              {t('legal.cookies.section2.subsection1.content')}
            </p>
            <p className="mb-1 font-medium text-sm">{t('legal.cookies.section2.subsection1.list_intro')}</p>
            <ul className="list-disc pl-6 text-muted-foreground">
              {renderList('legal.cookies.section2.subsection1.list')}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-medium mb-2">{t('legal.cookies.section2.subsection2.title')}</h3>
            <p className="mb-2 text-muted-foreground">
              {t('legal.cookies.section2.subsection2.content')}
            </p>
            <p className="text-muted-foreground italic">
              {t('legal.cookies.section2.subsection2.note')}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-medium mb-2">{t('legal.cookies.section2.subsection3.title')}</h3>
            <p className="mb-2 text-muted-foreground">
              {t('legal.cookies.section2.subsection3.content')}
            </p>
            <p className="text-muted-foreground italic">
              {t('legal.cookies.section2.subsection3.note')}
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.cookies.section3.title')}</h2>
          <p className="mb-4 text-muted-foreground">
            {t('legal.cookies.section3.p1')}
          </p>
          <p className="mb-4 text-muted-foreground">
            {t('legal.cookies.section3.p2')}
          </p>
          <p className="text-muted-foreground">
            {t('legal.cookies.section3.p3')}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.cookies.section4.title')}</h2>
          <p className="mb-2 text-muted-foreground">{t('legal.cookies.section4.intro')}</p>
          <ul className="list-disc pl-6 mb-4 text-muted-foreground">
            {renderList('legal.cookies.section4.list')}
          </ul>
          <p className="mb-4 text-muted-foreground">
            {t('legal.cookies.section4.p1')}
          </p>
          <p className="text-muted-foreground">
            {t('legal.cookies.section4.p2')}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.cookies.section5.title')}</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  {renderTableHeaders('legal.cookies.section5.table.headers')}
                </tr>
              </thead>
              <tbody>
                {renderTableRows('legal.cookies.section5.table.rows')}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.cookies.section6.title')}</h2>
          <p className="text-muted-foreground">
            {t('legal.cookies.section6.content')}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.cookies.section7.title')}</h2>
          <p className="mb-2 text-muted-foreground">{t('legal.cookies.section7.intro')}</p>
          <ul className="list-disc pl-6 mb-4 text-muted-foreground">
            {renderList('legal.cookies.section7.list')}
          </ul>
          <p className="text-muted-foreground">
            {t('legal.cookies.section7.contact')} <a href="mailto:contact@timagnet.com" className="text-primary hover:underline">contact@timagnet.com</a>
          </p>
          <p className="mt-2 text-sm text-muted-foreground italic">
            {t('legal.cookies.section7.note')}
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicyPage;
