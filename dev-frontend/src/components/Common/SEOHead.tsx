import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSiteSettings } from '../../contexts/SiteSettingsContext';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonicalUrl?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  // AEO: Structured data for AI engines
  jsonLd?: object | object[];
  noindex?: boolean;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  ogImage,
  ogType = 'website',
  canonicalUrl,
  author,
  publishedTime,
  modifiedTime,
  jsonLd,
  noindex = false
}) => {
  const { settings } = useSiteSettings();

  // Use site settings as fallbacks
  const siteName = settings.site_name || 'PurpleHere';
  const finalDescription = description || settings.seo_description || 'Subscription-based cloud POS system for restaurants, brands, and food courts.';
  const finalOgImage = ogImage || settings.og_image_url || '';
  const finalKeywords = keywords || settings.seo_keywords || '';

  const fullTitle = title ? `${title} | ${siteName}` : (settings.seo_title || siteName);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  // Prepare JSON-LD structured data
  const renderJsonLd = () => {
    if (!jsonLd) return null;

    const dataArray = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
    return dataArray.map((data, index) => (
      <script
        key={index}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    ));
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={finalDescription} />
      {finalKeywords && <meta name="keywords" content={finalKeywords} />}
      {author && <meta name="author" content={author} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl || currentUrl} />
      {finalOgImage && <meta property="og:image" content={finalOgImage} />}
      <meta property="og:site_name" content={siteName} />

      {/* Article specific OG tags */}
      {ogType === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {ogType === 'article' && author && (
        <meta property="article:author" content={author} />
      )}

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={finalDescription} />
      {finalOgImage && <meta name="twitter:image" content={finalOgImage} />}

      {/* JSON-LD Structured Data */}
      {renderJsonLd()}
    </Helmet>
  );
};

// Helper function to generate Organization schema (now accepts settings)
export const generateOrganizationSchema = (settings?: {
  site_name?: string;
  brand_logo_url?: string | null;
  contact_email?: string | null;
}) => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://purplehere.com';
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: settings?.site_name || 'PurpleHere',
    url: baseUrl,
    logo: settings?.brand_logo_url || `${baseUrl}/logo.png`,
    description: 'Subscription-based cloud POS system for restaurants, brands, and food courts',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: settings?.contact_email || 'contact@purplehere.com'
    }
  };
};

// Helper function to generate Article schema
export const generateArticleSchema = (article: {
  title: string;
  description: string;
  url: string;
  image?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}) => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://purplehere.com';
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: article.url,
    image: article.image,
    author: {
      '@type': 'Organization',
      name: article.author || 'PurpleHere'
    },
    publisher: {
      '@type': 'Organization',
      name: 'PurpleHere',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`
      }
    },
    datePublished: article.publishedTime,
    dateModified: article.modifiedTime || article.publishedTime
  };
};

// Helper function to generate FAQ schema (AEO optimized)
export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
});

// Helper function to generate Product/SoftwareApplication schema
export const generateSoftwareSchema = (siteName?: string) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: `${siteName || 'PurpleHere'} POS`,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web Browser',
  description: 'Cloud-based Point of Sale system for restaurants with real-time order management, inventory tracking, and multi-location support.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: '7-day free trial available'
  },
  featureList: [
    'Real-time order management',
    'Inventory tracking',
    'Multi-location support',
    'Kitchen display system',
    'Customer display',
    'Reports & Analytics',
    'Staff management',
    'Recipe management'
  ]
});

// Helper function to generate BreadcrumbList schema
export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }))
});

export default SEOHead;
