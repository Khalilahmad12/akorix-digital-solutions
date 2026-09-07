import React, { useEffect } from 'react';
import { getPageSEO, SITE_URL, BRAND_NAME } from './seoData';

interface SEOHeadProps {
  currentPath: string;
}

function setMetaTag(name: string, content: string, isProperty: boolean = false) {
  const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    if (isProperty) {
      el.setAttribute('property', name);
    } else {
      el.setAttribute('name', name);
    }
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonicalTag(url: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', url);
}

export const SEOHead: React.FC<SEOHeadProps> = ({ currentPath }) => {
  useEffect(() => {
    const seo = getPageSEO(currentPath);

    // 1. Title
    document.title = seo.title;

    // 2. Standard Meta Tags
    setMetaTag('description', seo.description);
    setMetaTag('keywords', seo.keywords);
    setMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMetaTag('author', BRAND_NAME);

    // 3. Canonical URL
    setCanonicalTag(seo.canonical);

    // 4. Open Graph Meta Tags
    setMetaTag('og:site_name', BRAND_NAME, true);
    setMetaTag('og:locale', 'en_US', true);
    setMetaTag('og:type', seo.ogType, true);
    setMetaTag('og:title', seo.ogTitle, true);
    setMetaTag('og:description', seo.ogDescription, true);
    setMetaTag('og:url', seo.canonical, true);
    setMetaTag('og:image', seo.ogImage, true);
    setMetaTag('og:image:secure_url', seo.ogImage, true);
    setMetaTag('og:image:width', '1200', true);
    setMetaTag('og:image:height', '630', true);
    setMetaTag('og:image:alt', `${seo.title} - ${BRAND_NAME}`, true);

    // 5. Twitter / X Meta Tags
    setMetaTag('twitter:card', seo.twitterCard);
    setMetaTag('twitter:title', seo.ogTitle);
    setMetaTag('twitter:description', seo.ogDescription);
    setMetaTag('twitter:image', seo.ogImage);
    setMetaTag('twitter:image:alt', `${seo.title} - ${BRAND_NAME}`);

    // 6. JSON-LD Structured Data
    const graphData: any[] = [
      // Organization Schema
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: BRAND_NAME,
        alternateName: 'AKorix Digital',
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+92-346-1764101',
            contactType: 'customer service',
            email: 'khalilahmad.developer.@gmail.com',
            availableLanguage: ['English', 'Urdu'],
          },
        ],
        sameAs: [
          'https://www.linkedin.com/company/akorix-digital-solutions',
          'https://www.facebook.com/share/1D2aL18vHY/',
          'https://www.instagram.com/akorixdigitalsolutions/',
        ],
      },
      // WebSite Schema
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: BRAND_NAME,
        description: 'Digital Product & Web Engineering Agency',
        publisher: {
          '@id': `${SITE_URL}/#organization`,
        },
      },
      // WebPage Schema
      {
        '@type': 'WebPage',
        '@id': `${seo.canonical}#webpage`,
        url: seo.canonical,
        name: seo.title,
        description: seo.description,
        isPartOf: {
          '@id': `${SITE_URL}/#website`,
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: seo.breadcrumbs.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
          })),
        },
      },
    ];

    // If on a specific service page, append Service Schema
    if (seo.schemaType === 'Service' && seo.serviceData) {
      graphData.push({
        '@type': 'Service',
        '@id': `${seo.canonical}#service`,
        name: seo.serviceData.name,
        serviceType: seo.serviceData.serviceType,
        description: seo.serviceData.description,
        provider: {
          '@id': `${SITE_URL}/#organization`,
        },
        areaServed: 'Worldwide',
        termsOfService: `${SITE_URL}/contact`,
      });
    }

    const structuredDataPayload = {
      '@context': 'https://schema.org',
      '@graph': graphData,
    };

    let scriptEl = document.getElementById('seo-structured-data') as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = 'seo-structured-data';
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(structuredDataPayload);

  }, [currentPath]);

  return null;
};
