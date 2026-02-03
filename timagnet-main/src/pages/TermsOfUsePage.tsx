import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { useTranslation } from "react-i18next";

const TermsOfUsePage = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title={t('seo.terms_use_title')}
        description={t('seo.terms_use_desc')}
        url="https://timagnet.com/terms-of-use"
      />
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-2">Conditions Générales d’Utilisation (CGU)</h1>
        <p className="text-muted-foreground mb-6">En vigueur au : 1er janvier 2026</p>

        <p className="mb-8 text-muted-foreground">
          Les présentes Conditions Générales d’Utilisation (ci-après les « CGU ») régissent l’accès et l’utilisation du site internet Ti’Magnet, accessible à l’adresse www.timagnet.com (ci-après le « Site »).<br />
          Toute navigation sur le Site implique l’acceptation pleine et entière des présentes CGU par l’utilisateur.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Éditeur du site</h2>
          <p className="mb-2 text-muted-foreground">Le Site est édité par :</p>
          <div className="bg-muted/30 p-4 rounded-lg text-muted-foreground">
            <p>Courriel : <a href="mailto:contact@timagnet.com" className="text-primary hover:underline">contact@timagnet.com</a></p>
            <p>Numéro SIRET : 994 873 198 00018</p>
            <p className="mt-4"><strong>Hébergement du Site :</strong></p>
            <p>Hostinger International Ltd. – 61 Lordou Vironos Street, 6023 Larnaca, Cyprus</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Objet du site</h2>
          <p className="mb-2 text-muted-foreground">Le Site a pour objet :</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>la présentation et la vente en ligne de magnets personnalisés et/ou décoratifs ;</li>
            <li>la mise à disposition d’un service de personnalisation impliquant la transmission de visuels par l’utilisateur ;</li>
            <li>la gestion des commandes, paiements et livraisons ;</li>
            <li>la diffusion d’informations relatives à l’activité de Ti’Magnet.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Accès au site</h2>
          <p className="mb-2 text-muted-foreground">
            Le Site est accessible gratuitement à tout utilisateur disposant d’un accès à internet.
          </p>
          <p className="mb-2 text-muted-foreground">
            Tous les coûts liés à l’accès au Site (matériel, logiciels, connexion internet) sont à la charge exclusive de l’utilisateur.
          </p>
          <p className="text-muted-foreground">
            Ti’Magnet se réserve le droit de suspendre, limiter ou interrompre l’accès au Site, temporairement ou définitivement, notamment pour des raisons techniques, de maintenance, de sécurité ou légales, sans que cela n’ouvre droit à une quelconque indemnisation.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Création d’un compte utilisateur</h2>
          <p className="mb-2 text-muted-foreground">
            Certaines fonctionnalités peuvent nécessiter la création d’un compte utilisateur.
          </p>
          <p className="mb-2 text-muted-foreground">L’utilisateur s’engage à :</p>
          <ul className="list-disc pl-6 mb-2 space-y-1 text-muted-foreground">
            <li>fournir des informations exactes, complètes et à jour ;</li>
            <li>préserver la confidentialité de ses identifiants ;</li>
            <li>être titulaire des droits nécessaires sur l’ensemble des visuels transmis ;</li>
            <li>informer immédiatement Ti’Magnet de toute utilisation non autorisée de son compte.</li>
          </ul>
          <p className="mb-2 text-muted-foreground">
            L’utilisateur est seul responsable de l’utilisation de son compte.
          </p>
          <p className="text-muted-foreground">
            Ti’Magnet ne saurait être tenu responsable en cas d’utilisation frauduleuse résultant d’une négligence de l’utilisateur.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Contenus transmis par l’utilisateur (photographies et visuels)</h2>
          <p className="mb-4 text-muted-foreground">
            Dans le cadre de la personnalisation des magnets, l’utilisateur peut être amené à transmettre des photographies ou fichiers numériques.
          </p>
          
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">5.1 Déclaration et garanties de l’utilisateur</h3>
            <p className="mb-2 text-muted-foreground">L’utilisateur garantit expressément :</p>
            <ul className="list-disc pl-6 mb-2 space-y-1 text-muted-foreground">
              <li>être titulaire de l’ensemble des droits de propriété intellectuelle et droits à l’image attachés aux fichiers transmis, ou disposer des autorisations nécessaires des personnes concernées ;</li>
              <li>que les contenus transmis ne portent atteinte à aucun droit de tiers ;</li>
              <li>que les contenus sont conformes aux lois et règlements en vigueur.</li>
            </ul>
            <p className="text-muted-foreground">
              Ti’Magnet n’est soumis à aucune obligation de vérification concernant l’origine, la licéité ou les droits attachés aux fichiers transmis.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-2">5.2 Contenus interdits</h3>
            <p className="mb-2 text-muted-foreground">Il est strictement interdit de transmettre tout contenu :</p>
            <ul className="list-disc pl-6 mb-2 space-y-1 text-muted-foreground">
              <li>à caractère illégal, pornographique, pédopornographique, violent, haineux, discriminatoire ou diffamatoire ;</li>
              <li>contraire à l’ordre public ou aux bonnes mœurs ;</li>
              <li>portant atteinte à la dignité humaine ;</li>
              <li>violant des droits d’auteur, droits à l’image, marques ou tout autre droit de tiers.</li>
            </ul>
            <p className="text-muted-foreground">
              Ti’Magnet se réserve le droit de refuser, suspendre ou annuler toute commande contenant un contenu manifestement illicite ou inapproprié, sans indemnisation.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Utilisation des contenus et suppression des fichiers</h2>
          <p className="mb-2 text-muted-foreground">
            Les fichiers transmis par l’utilisateur sont utilisés exclusivement pour la réalisation de la commande d’impression demandée.
          </p>
          <p className="mb-2 text-muted-foreground">
            Sauf accord exprès et écrit de l’utilisateur, les visuels transmis ne sont jamais utilisés à des fins publicitaires, commerciales ou promotionnelles.
          </p>
          <p className="mb-2 text-muted-foreground">
            Les fichiers sont conservés pour une durée strictement limitée, puis supprimés conformément à la politique de confidentialité.
          </p>
          <p className="text-muted-foreground">
            À l’issue de cette suppression, aucune récupération n’est possible et toute nouvelle commande nécessitera la retransmission des visuels par l’utilisateur.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Propriété intellectuelle du site</h2>
          <p className="mb-2 text-muted-foreground">
            L’ensemble des éléments du Site (textes, graphismes, logos, marques, photographies, mises en page, structure, etc.) est protégé par le droit de la propriété intellectuelle.
          </p>
          <p className="text-muted-foreground">
            Toute reproduction, représentation, modification ou exploitation, totale ou partielle, sans autorisation écrite préalable de Ti’Magnet, est strictement interdite.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Responsabilité</h2>
          <p className="mb-2 text-muted-foreground">
            Ti’Magnet met en œuvre tous les moyens raisonnables pour assurer le bon fonctionnement du Site.
          </p>
          <p className="mb-2 text-muted-foreground">
            Toutefois, Ti’Magnet ne saurait être tenu responsable :
          </p>
          <ul className="list-disc pl-6 mb-2 space-y-1 text-muted-foreground">
            <li>d’erreurs ou omissions dans les informations diffusées ;</li>
            <li>d’interruptions ou dysfonctionnements temporaires du Site ;</li>
            <li>de dommages indirects résultant de l’utilisation du Site ;</li>
            <li>des conséquences liées aux contenus transmis par les utilisateurs.</li>
          </ul>
          <p className="text-muted-foreground">
            Les visuels présentés sur le Site sont non contractuels.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Garantie et indemnisation</h2>
          <p className="mb-2 text-muted-foreground">
            L’utilisateur s’engage à garantir et indemniser Ti’Magnet contre toute réclamation, action, condamnation, dommage ou frais (y compris frais d’avocat) résultant :
          </p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>d’une violation des présentes CGU ;</li>
            <li>du contenu des fichiers transmis ;</li>
            <li>d’une atteinte aux droits de tiers.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Données personnelles</h2>
          <p className="mb-2 text-muted-foreground">
            La collecte et le traitement des données personnelles des utilisateurs sont effectués conformément à la réglementation en vigueur.
          </p>
          <p className="text-muted-foreground">
            Les modalités sont détaillées dans la <Link to="/privacy-policy" className="text-primary hover:underline">Politique de confidentialité</Link>, accessible sur le Site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">11. Cookies</h2>
          <p className="mb-2 text-muted-foreground">
            Le Site utilise des cookies et autres traceurs.
          </p>
          <p className="text-muted-foreground">
            Les modalités d’utilisation et de gestion des cookies sont détaillées dans la <Link to="/cookie-policy" className="text-primary hover:underline">Politique de cookies</Link>, accessible sur le Site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">12. Liens hypertextes</h2>
          <p className="mb-2 text-muted-foreground">
            Le Site peut contenir des liens vers des sites tiers.
          </p>
          <p className="text-muted-foreground">
            Ti’Magnet n’exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou à leurs pratiques.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">13. Modification des CGU</h2>
          <p className="mb-2 text-muted-foreground">
            Ti’Magnet se réserve le droit de modifier les présentes CGU à tout moment.
          </p>
          <p className="text-muted-foreground">
            Les nouvelles versions entrent en vigueur dès leur mise en ligne. Les CGU applicables sont celles en vigueur à la date de navigation sur le Site. Il appartient à l’utilisateur de consulter régulièrement les CGU.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">14. Droit applicable et juridiction compétente</h2>
          <p className="mb-2 text-muted-foreground">
            Les présentes CGU sont régies par le droit français.
          </p>
          <p className="text-muted-foreground">
            En cas de litige, et à défaut de résolution amiable, les tribunaux français seront seuls compétents.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfUsePage;
