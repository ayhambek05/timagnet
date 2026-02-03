import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords, 
  image = '/og-image.png', 
  url = 'https://timagnet.com' 
}) => {
  const siteTitle = "Ti'Magnet - Magnets Photo Personnalisés & Aimants Frigo France";
  const defaultDescription = "Créez des magnets photo personnalisés uniques en France. Transformez vos souvenirs en aimants pour frigo de haute qualité. Livraison rapide et satisfaction garantie.";
  const defaultKeywords = "magnets photo, aimants personnalisés, magnets frigo, impression photo magnet, cadeau personnalisé, décoration photo, Ti'Magnet, France";

  const metaTitle = title ? `${title} | Ti'Magnet` : siteTitle;
  const metaDescription = description || defaultDescription;
  const metaKeywords = keywords || defaultKeywords;

  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="fr_FR" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={metaTitle} />
      <meta property="twitter:description" content={metaDescription} />
      <meta property="twitter:image" content={image} />

      {/* Canonical */}
      <link rel="canonical" href={url} />
      
      {/* Structured Data for Local Business/Service */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Ti'Magnet",
          "url": "https://timagnet.com",
          "logo": "https://timagnet.com/assets/Ti'Magnet.png",
          "description": "Service d'impression de magnets photo personnalisés en France.",
          "areaServed": {
            "@type": "Country",
            "name": "France"
          },
          "offers": {
            "@type": "Offer",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock"
          },
          "image": image,
          "sameAs": [
            "https://www.facebook.com/timagnet",
            "https://www.instagram.com/timagnet"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
