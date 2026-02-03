import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { useTranslation } from "react-i18next";

const TermsOfSalesPage = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title={t('seo.terms_sales_title')}
        description={t('seo.terms_sales_desc')}
        url="https://timagnet.com/terms-of-sales"
      />
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-2">Conditions Générales De Vente – Ti’Magnet</h1>
        <p className="text-muted-foreground mb-6">En vigueur au : 1er janvier 2026</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Article 1 - Informations Légales</h2>
          <div className="bg-muted/30 p-4 rounded-lg text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Ti'Magnet</p>
            <p>Courriel : <a href="mailto:contact@timagnet.com" className="text-primary hover:underline">contact@timagnet.com</a></p>
            <p>Numéro SIRET : 994 873 198 00018</p>
            <p>TVA : TVA non applicable, article 293 B du Code Général des Impôts</p>
            <p className="mt-4"><strong>Hébergement du Site :</strong></p>
            <p>Hostinger International Ltd. – 61 Lordou Vironos Street, 6023 Larnaca, Cyprus</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Article 2 - Objet</h2>
          <p className="mb-2 text-muted-foreground">
            Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre Ti’Magnet et toute personne (ci-après « le Client ») souhaitant effectuer un achat via le site internet timagnet.com ou par tout autre moyen de commande proposé.
          </p>
          <p className="text-muted-foreground">
            Ti’Magnet propose la création et la vente de magnets personnalisés à partir de photos fournies par le Client.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Article 3 - Processus De Commande</h2>
          
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">3.1 Passation de commande</h3>
            <p className="mb-2 text-muted-foreground">Le Client passe commande en :</p>
            <ul className="list-disc pl-6 mb-2 space-y-1 text-muted-foreground">
              <li>Sélectionnant le format et la quantité de magnets souhaités</li>
              <li>Téléchargeant la ou les photos à imprimer</li>
              <li>Validant son panier et les informations de livraison</li>
              <li>Procédant au paiement</li>
            </ul>
            <p className="text-muted-foreground">La commande est définitivement validée après réception du paiement intégral.</p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-2">3.2 Confirmation de commande</h3>
            <p className="mb-2 text-muted-foreground">Un email de confirmation est envoyé au Client récapitulant :</p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Le numéro de commande</li>
              <li>Les produits commandés</li>
              <li>Le montant total TTC</li>
              <li>L'adresse de livraison</li>
              <li>Le délai de fabrication et d'expédition estimé</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Article 4 - Photos Et Droits D'utilisation</h2>
          
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">4.1 Responsabilité du Client</h3>
            <p className="mb-2 text-muted-foreground">Le Client garantit :</p>
            <ul className="list-disc pl-6 mb-2 space-y-1 text-muted-foreground">
              <li>Être propriétaire des droits d'auteur et des droits à l'image sur toutes les photos transmises</li>
              <li>Disposer de l'autorisation expresse de toute personne reconnaissable sur les photos</li>
              <li>Que les photos ne contiennent aucun contenu illégal, diffamatoire, pornographique ou contraire aux bonnes mœurs</li>
            </ul>
            <p className="text-muted-foreground">Ti’Magnet se réserve le droit de refuser toute commande dont le contenu serait inapproprié ou illégal.</p>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">4.2 Utilisation des photos par Ti’Magnet</h3>
            <p className="mb-2 text-muted-foreground">Les photos transmises par le Client sont utilisées exclusivement dans le cadre de la fabrication des magnets commandés.</p>
            <p className="mb-2 text-muted-foreground">Conformément au RGPD et à notre engagement pour la protection de votre vie privée :</p>
            <ul className="list-disc pl-6 mb-2 space-y-1 text-muted-foreground">
              <li>Les photos sont téléchargées de manière sécurisée</li>
              <li>Elles sont utilisées uniquement pour l'impression de votre commande</li>
              <li>Les photos sont supprimées définitivement de nos serveurs dans un délai maximum de 30 jours après la livraison de la commande</li>
              <li>Aucune photo n'est conservée, partagée, revendue ou utilisée à des fins commerciales ou publicitaires sans votre accord écrit préalable</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-2">4.3 Demande d'autorisation pour usage promotionnel</h3>
            <p className="text-muted-foreground">
              Ti’Magnet peut demander au Client l'autorisation d'utiliser des photos de magnets réalisés à des fins promotionnelles (réseaux sociaux, site internet). Cette autorisation est facultative et ne conditionne en aucun cas l'acceptation de la commande.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Article 5 - Prix</h2>
          
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">5.1 Tarifs</h3>
            <p className="mb-2 text-muted-foreground">Les prix sont indiqués en euros (€), toutes taxes comprises (TTC).</p>
            <p className="mb-2 text-muted-foreground">TVA non applicable selon l'article 293 B du Code Général des Impôts.</p>
            <p className="mb-2 text-muted-foreground">Les prix incluent :</p>
            <ul className="list-disc pl-6 mb-2 space-y-1 text-muted-foreground">
              <li>La fabrication du magnet</li>
              <li>L'emballage de protection</li>
            </ul>
            <p className="text-muted-foreground">Les frais de livraison sont indiqués séparément et ajoutés au total de la commande.</p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-2">5.2 Modification des prix</h3>
            <p className="text-muted-foreground">
              Ti’Magnet se réserve le droit de modifier ses tarifs à tout moment. Les commandes sont facturées sur la base des tarifs en vigueur au moment de la validation de la commande.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Article 6 - Paiement</h2>
          
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">6.1 Modalités de paiement</h3>
            <p className="mb-2 text-muted-foreground">Le paiement s'effectue :</p>
            <ul className="list-disc pl-6 mb-2 space-y-1 text-muted-foreground">
              <li>Par carte bancaire (paiement sécurisé)</li>
            </ul>
            <p className="text-muted-foreground">Le paiement est exigible immédiatement à la commande.</p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-2">6.2 Sécurisation des paiements</h3>
            <p className="text-muted-foreground">
              Les paiements en ligne sont sécurisés. Ti’Magnet n’a accès à et ne conserve aucune donnée bancaire.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Article 7 - Livraison</h2>
          
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">7.1 Délais</h3>
            <p className="mb-2 text-muted-foreground">Les délais de fabrication et d'expédition sont les suivants :</p>
            <ul className="list-disc pl-6 mb-2 space-y-1 text-muted-foreground">
              <li>Fabrication : 1 à 3 jours ouvrés après validation de la commande et réception du paiement</li>
              <li>Livraison : 2 à 4 jours ouvrés (France métropolitaine)</li>
              <li>Délai total estimé : 3 à 7 jours ouvrés</li>
            </ul>
            <p className="mb-2 text-muted-foreground">Ces délais sont donnés à titre indicatif et peuvent varier en période de forte activité (fêtes, vacances).</p>
            <p className="text-muted-foreground">En cas de commande exceptionnelle (plus de 100 pièces), un délai supplémentaire peut être demandé.</p>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">7.2 Modes de livraison</h3>
            <p className="mb-2 text-muted-foreground">France métropolitaine :</p>
            <ul className="list-disc pl-6 mb-2 space-y-1 text-muted-foreground">
              <li>Lettre Suivie</li>
              <li>Colissimo pour de gros envois</li>
            </ul>
            <p className="text-muted-foreground">Corse, DOM-TOM et international : Nous consulter pour les tarifs et délais.</p>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">7.3 Suivi de commande</h3>
            <p className="mb-2 text-muted-foreground">Un numéro de suivi est communiqué au Client par email dès l'expédition de la commande.</p>
            <p className="mb-2 text-muted-foreground">Les délais de livraison indiqués correspondent à des délais moyens communiqués par les transporteurs et sont fournis à titre indicatif.</p>
            <p className="mb-2 text-muted-foreground">Ti’Magnet s’engage à expédier les commandes dans les délais annoncés après fabrication.</p>
            <p className="mb-2 text-muted-foreground">À compter de la remise du colis au transporteur, les délais d’acheminement relèvent de la seule responsabilité de ce dernier.</p>
            <p className="mb-2 text-muted-foreground">Ti’Magnet ne saurait être tenu responsable des retards imputables au transporteur, notamment en cas de grève, surcharge d’activité, conditions météorologiques exceptionnelles ou tout autre événement indépendant de sa volonté.</p>
            <p className="text-muted-foreground">En cas de retard anormal ou de perte du colis, Ti’Magnet assistera le Client dans les démarches auprès du transporteur afin de trouver une solution appropriée.</p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-2">7.4 Réception de la commande</h3>
            <p className="mb-2 text-muted-foreground">Le Client s'engage à vérifier l'état du colis en présence du livreur. En cas de colis endommagé, le Client doit :</p>
            <ul className="list-disc pl-6 mb-2 space-y-1 text-muted-foreground">
              <li>Refuser le colis ou émettre des réserves écrites sur le bon de livraison</li>
              <li>Nous contacter dans les 48h en joignant des photos du colis endommagé (encore non ouvert)</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Article 8 - Droit De Rétractation</h2>
          <p className="mb-2 text-muted-foreground">Conformément à l'article L221-28 du code de la consommation, le droit de rétractation ne s'applique pas aux produits personnalisés confectionnés selon les spécifications du Client.</p>
          <p className="mb-2 text-muted-foreground">Les magnets étant des produits personnalisés réalisés sur mesure, ils ne peuvent faire l'objet d'un droit de rétractation.</p>
          <p className="text-muted-foreground">Exception : En cas d'erreur de notre part (erreur d'impression, défaut de fabrication), un échange ou remboursement sera proposé (voir Article 9).</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Article 9 - Garanties Et Réclamations</h2>
          
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">9.1 Garantie de conformité</h3>
            <p className="mb-2 text-muted-foreground">Ti’Magnet s'engage à livrer des produits conformes à la commande passée par le Client.</p>
            <p className="mb-2 text-muted-foreground">En cas de non-conformité (erreur d'impression, défaut de fabrication), le Client doit :</p>
            <ul className="list-disc pl-6 mb-2 space-y-1 text-muted-foreground">
              <li>Nous contacter par email sous 7 jours suivant la réception</li>
              <li>Fournir des photos du produit défectueux</li>
              <li>Nous retourner le produit si nécessaire</li>
            </ul>
            <p className="mb-2 text-muted-foreground">Ti’Magnet procédera alors, au choix du Client :</p>
            <ul className="list-disc pl-6 mb-2 space-y-1 text-muted-foreground">
              <li>Au remplacement du produit défectueux (sans frais)</li>
              <li>Au remboursement des magnets défectueux</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-2">9.2 Limites de responsabilité</h3>
            <p className="mb-2 text-muted-foreground">Ti’Magnet ne pourra être tenu responsable :</p>
            <ul className="list-disc pl-6 mb-2 space-y-1 text-muted-foreground">
              <li>De la qualité d'impression si la photo fournie est de mauvaise résolution</li>
              <li>Des différences de rendu des couleurs dues aux écrans (calibrage différent)</li>
              <li>Des erreurs de commande dues à une mauvaise saisie des informations par le Client</li>
            </ul>
            <p className="text-muted-foreground">Recommandations : Nous recommandons des photos d'au moins 1500x1500 pixels pour une qualité optimale.</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Article 10 - Protection Des Données Personnelles (RGPD)</h2>
          
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">10.1 Responsable du traitement</h3>
            <p className="text-muted-foreground">Le responsable du traitement des données personnelles est Ti'Magnet.</p>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">10.2 Données collectées</h3>
            <p className="mb-2 text-muted-foreground">Ti’Magnet collecte les données personnelles suivantes :</p>
            <ul className="list-disc pl-6 mb-2 space-y-1 text-muted-foreground">
              <li>Nom, prénom</li>
              <li>Adresse email</li>
              <li>Adresse de livraison</li>
              <li>Numéro de téléphone (facultatif)</li>
              <li>Photos transmises pour la fabrication des magnets</li>
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">10.3 Finalité du traitement</h3>
            <p className="mb-2 text-muted-foreground">Les données sont collectées pour :</p>
            <ul className="list-disc pl-6 mb-2 space-y-1 text-muted-foreground">
              <li>La gestion et le traitement des commandes</li>
              <li>La fabrication des produits personnalisés</li>
              <li>La livraison</li>
              <li>La communication relative aux commandes</li>
              <li>Le respect des obligations légales et comptables</li>
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">10.4 Durée de conservation</h3>
            <ul className="list-disc pl-6 mb-2 space-y-1 text-muted-foreground">
              <li>Données de commande : conservées 10 ans (obligations comptables)</li>
              <li>Photos transmises : supprimées définitivement sous 30 jours après livraison</li>
              <li>Données de contact : conservées jusqu'à demande de suppression ou 3 ans après la dernière commande</li>
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">10.5 Droits des clients (RGPD)</h3>
            <p className="mb-2 text-muted-foreground">Conformément au Règlement Général sur la Protection des Données, le Client dispose des droits suivants :</p>
            <ul className="list-disc pl-6 mb-2 space-y-1 text-muted-foreground">
              <li>Droit d'accès : obtenir la confirmation que des données sont traitées et y accéder</li>
              <li>Droit de rectification : corriger des données inexactes</li>
              <li>Droit à l'effacement : obtenir la suppression de ses données (sous réserve des obligations légales)</li>
              <li>Droit à la limitation du traitement : limiter l'utilisation de ses données</li>
              <li>Droit d'opposition : s'opposer au traitement de ses données</li>
              <li>Droit à la portabilité : recevoir ses données dans un format structuré</li>
            </ul>
            <p className="mb-2 text-muted-foreground">Pour exercer ces droits, le Client peut nous contacter par email à : <a href="mailto:contact@timagnet.com" className="text-primary hover:underline">contact@timagnet.com</a></p>
            <p className="text-muted-foreground">Nous nous engageons à répondre dans un délai d'un mois.</p>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">10.6 Sécurité des données</h3>
            <p className="text-muted-foreground">
              Ti’Magnet met en œuvre toutes les mesures techniques et organisationnelles appropriées pour protéger les données personnelles contre la destruction, la perte, l'altération, la divulgation ou l'accès non autorisé.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-2">10.7 Transmission à des tiers</h3>
            <p className="mb-2 text-muted-foreground">Les données personnelles ne sont jamais vendues, louées ou transmises à des tiers, sauf :</p>
            <ul className="list-disc pl-6 mb-2 space-y-1 text-muted-foreground">
              <li>Aux prestataires techniques nécessaires au traitement des commandes (plateforme de paiement, service de livraison)</li>
              <li>Sur réquisition judiciaire</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Article 11 - Cookies</h2>
          <p className="mb-2 text-muted-foreground">
            Le site peut utiliser des cookies pour améliorer l'expérience utilisateur et réaliser des statistiques de visite.
          </p>
          <p className="text-muted-foreground">
            Le Client peut s'opposer à l'enregistrement de cookies en configurant son navigateur.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Article 12 - Propriété Intellectuelle</h2>
          <p className="text-muted-foreground">
            Le contenu du site (textes, images, logos, graphismes) est la propriété exclusive de Ti’Magnet. Toute reproduction, même partielle, est interdite sans autorisation préalable.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Article 13 - Force Majeure</h2>
          <p className="text-muted-foreground">
            Ti’Magnet ne pourra être tenu responsable de l'inexécution de ses obligations en cas de force majeure telle que définie par la jurisprudence française (catastrophe naturelle, grève des transports, pandémie, etc.).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Article 14 - Modification Des CGV</h2>
          <p className="text-muted-foreground">
            Ti’Magnet se réserve le droit de modifier les présentes CGV à tout moment. Les CGV applicables sont celles en vigueur au moment de la passation de la commande.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Article 15 - Droit Applicable Et Litiges</h2>
          <p className="mb-2 text-muted-foreground">Les présentes CGV sont soumises au droit français.</p>
          <p className="mb-2 text-muted-foreground">En cas de litige, le Client peut recourir à une médiation conventionnelle ou à tout autre mode alternatif de règlement des différends.</p>
          <p className="mb-2 text-muted-foreground">
            Plateforme de résolution des litiges en ligne : <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://ec.europa.eu/consumers/odr/</a>
          </p>
          <p className="text-muted-foreground">À défaut de résolution amiable, les tribunaux français seront seuls compétents.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Article 16 - Contact</h2>
          <p className="mb-2 text-muted-foreground">Pour toute question relative aux présentes CGV ou à une commande :</p>
          <p className="mb-2 text-muted-foreground">Email : <a href="mailto:contact@timagnet.com" className="text-primary hover:underline">contact@timagnet.com</a></p>
          <p className="text-muted-foreground">Lorsque nécessaire, merci de préciser votre numéro de commande.</p>
        </section>

        <p className="text-center font-medium mt-12 mb-8">
          En validant votre commande, vous reconnaissez avoir pris connaissance des présentes Conditions Générales de Vente et les accepter sans réserve.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfSalesPage;
