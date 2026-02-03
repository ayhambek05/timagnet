import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PrivacyPolicyPage = () => {
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
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-2">{t('legal.privacy.title')}</h1>
        <p className="text-muted-foreground mb-6">{t('legal.privacy.date')}</p>
        
        <p className="mb-8 text-muted-foreground">
          {t('legal.privacy.intro')}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.section1.title')}</h2>
          <p className="mb-2 text-muted-foreground">{t('legal.privacy.section1.content')}</p>
          <div className="bg-muted/30 p-4 rounded-lg text-muted-foreground">
            <ul className="list-none space-y-1">
              {renderList('legal.privacy.section1.details')}
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.section2.title')}</h2>
          <p className="mb-4 text-muted-foreground">{t('legal.privacy.section2.intro')}</p>
          
          <div className="mb-6">
            <h3 className="text-xl font-medium mb-2">{t('legal.privacy.section2.subsection1.title')}</h3>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              {renderList('legal.privacy.section2.subsection1.list')}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-medium mb-2">{t('legal.privacy.section2.subsection2.title')}</h3>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              {renderList('legal.privacy.section2.subsection2.list')}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-medium mb-2">{t('legal.privacy.section2.subsection3.title')}</h3>
            <p className="mb-2 text-muted-foreground">
              {t('legal.privacy.section2.subsection3.p1')}
            </p>
            <p className="text-muted-foreground">
              {t('legal.privacy.section2.subsection3.p2')}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-medium mb-2">{t('legal.privacy.section2.subsection4.title')}</h3>
            <p className="mb-2 text-muted-foreground">
              {t('legal.privacy.section2.subsection4.p1')}
            </p>
            <p className="text-muted-foreground">
              {t('legal.privacy.section2.subsection4.p2')}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-medium mb-2">{t('legal.privacy.section2.subsection5.title')}</h3>
            <p className="mb-2 text-muted-foreground">
              {t('legal.privacy.section2.subsection5.p1')}
            </p>
            <ul className="list-disc pl-6 mb-2 space-y-1 text-muted-foreground">
              {renderList('legal.privacy.section2.subsection5.list')}
            </ul>
            <p className="text-muted-foreground">
              {t('legal.privacy.section2.subsection5.p2')}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-medium mb-2">{t('legal.privacy.section2.subsection6.title')}</h3>
            <p className="mb-2 text-muted-foreground">
              {t('legal.privacy.section2.subsection6.p1')}
            </p>
            <p className="text-muted-foreground">
              {t('legal.privacy.section2.subsection6.p2')}
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.section3.title')}</h2>
          <p className="mb-4 text-muted-foreground">{t('legal.privacy.section3.intro')}</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  {renderTableHeaders('legal.privacy.section3.table.headers')}
                </tr>
              </thead>
              <tbody>
                {renderTableRows('legal.privacy.section3.table.rows')}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.section4.title')}</h2>
          <p className="text-muted-foreground">
             {t('legal.privacy.section4.content')} <Link to="/cookie-policy" className="text-primary hover:underline">{t('nav.cookie_policy')}</Link>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.section5.title')}</h2>
          <p className="mb-2 text-muted-foreground">{t('legal.privacy.section5.intro')}</p>
          <ul className="list-disc pl-6 mb-2 space-y-1 text-muted-foreground">
            {renderList('legal.privacy.section5.list')}
          </ul>
          <p className="text-muted-foreground">
            {t('legal.privacy.section5.content')}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.section6.title')}</h2>
          <p className="text-muted-foreground">
            {t('legal.privacy.section6.content')}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.section7.title')}</h2>
          <p className="mb-2 text-muted-foreground">{t('legal.privacy.section7.intro')}</p>
          <ul className="list-disc pl-6 mb-4 space-y-1 text-muted-foreground">
            {renderList('legal.privacy.section7.list')}
          </ul>
          <p className="mb-2 text-muted-foreground">
            {t('legal.privacy.section7.p1')}
          </p>
          <p className="mb-2 text-muted-foreground">
            {t('legal.privacy.section7.p2')}
          </p>
          <p className="text-muted-foreground">
            {t('legal.privacy.section7.p3')}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.section8.title')}</h2>
          <p className="text-muted-foreground">
            {t('legal.privacy.section8.content')}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.section9.title')}</h2>
          <p className="mb-2 text-muted-foreground">{t('legal.privacy.section9.intro')}</p>
          <ul className="list-disc pl-6 mb-4 space-y-1 text-muted-foreground">
            {renderList('legal.privacy.section9.list')}
          </ul>
          <p className="text-muted-foreground">
            {t('legal.privacy.section9.contact')} <a href="mailto:contact@timagnet.com" className="text-primary hover:underline">contact@timagnet.com</a>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.section10.title')}</h2>
          <p className="text-muted-foreground">
            {t('legal.privacy.section10.content')}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.section11.title')}</h2>
          <p className="text-muted-foreground">
            {t('legal.privacy.section11.content')}
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
