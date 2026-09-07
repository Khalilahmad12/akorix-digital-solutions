import { SERVICES_DATA, getServiceBySlug } from '../../data/services';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface PageSEO {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogImageUrl: string;
  ogImageSecureUrl: string;
  ogImageWidth: string;
  ogImageHeight: string;
  ogImageType: string;
  ogImageAlt: string;
  ogUrl: string;
  ogType: string;
  ogSiteName: string;
  twitterCard: 'summary_large_image' | 'summary';
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  twitterImageAlt: string;
  breadcrumbs: BreadcrumbItem[];
  schemaType?: string;
  serviceData?: {
    name: string;
    description: string;
    serviceType: string;
    price?: number;
    deliverables?: string[];
  };
}

export const BRAND_NAME = 'AKorix Digital Solutions';
export const FALLBACK_PRODUCTION_URL = 'https://ais-dev-mzkr66cz6y3y3g4j5pzpkd-91515516273.asia-southeast1.run.app';

export function resolveBaseUrl(customBaseUrl?: string): string {
  if (customBaseUrl && customBaseUrl.trim() !== '') {
    return customBaseUrl.trim().replace(/\/$/, '');
  }

  // 1. In browser runtime: use actual window location origin
  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    const origin = window.location.origin;
    if (!origin.includes('localhost') && !origin.includes('127.0.0.1')) {
      return origin.replace(/\/$/, '');
    }
  }

  // 2. In server runtime: check environment variables injected by platform
  if (typeof process !== 'undefined' && process.env) {
    const envUrl = process.env.APP_URL || process.env.SITE_URL || process.env.PUBLIC_URL;
    if (envUrl && envUrl.trim() !== '') {
      return envUrl.trim().replace(/\/$/, '');
    }
  }

  // 3. Vite client build environment
  try {
    // @ts-ignore
    const viteUrl = import.meta.env?.VITE_APP_URL || import.meta.env?.VITE_SITE_URL;
    if (viteUrl && viteUrl.trim() !== '') {
      return viteUrl.trim().replace(/\/$/, '');
    }
  } catch (_e) {
    // Ignore if not in Vite client context
  }

  return FALLBACK_PRODUCTION_URL;
}

export const SITE_URL = resolveBaseUrl();
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

// Primary naturally integrated brand keywords
const PRIMARY_KEYWORDS = [
  'AKorix Digital Solutions',
  'AKorix Digital Solutions agency',
  'AKorix web development',
  'AKorix digital solutions',
  'digital solutions agency',
  'web development agency',
  'website development',
  'custom web development',
  'UI/UX design',
  'e-commerce development',
  'WordPress development',
  'Shopify development',
  'mobile app development',
  'SEO services',
  'digital marketing services',
  'AI automation',
  'AI agents',
].join(', ');

export function getPageSEO(pathname: string, customBaseUrl?: string): PageSEO {
  const baseUrl = resolveBaseUrl(customBaseUrl);
  const cleanPath = pathname.split('?')[0].split('#')[0];
  const ogImage = `${baseUrl}/og-image.png`;

  // 1. Individual Service Pages (/services/:slug)
  if (cleanPath.startsWith('/services/') && cleanPath.length > '/services/'.length) {
    const slug = cleanPath.replace('/services/', '');
    const service = getServiceBySlug(slug);

    if (service) {
      const canonical = `${baseUrl}/services/${service.slug}`;
      const title = `${service.name} | ${BRAND_NAME}`;
      const description = `${BRAND_NAME} delivers expert ${service.name.toLowerCase()} solutions, combining high performance, custom engineering, and measurable business growth.`;
      const keywords = `${service.name}, ${service.name} AKorix Digital Solutions, custom ${service.name.toLowerCase()}, ${service.category} development, digital solutions agency, AKorix web development, ${PRIMARY_KEYWORDS}`;

      return {
        title,
        description,
        keywords,
        canonical,
        ogTitle: title,
        ogDescription: description,
        ogImage,
        ogImageUrl: ogImage,
        ogImageSecureUrl: ogImage,
        ogImageWidth: '1200',
        ogImageHeight: '630',
        ogImageType: 'image/png',
        ogImageAlt: `${title} - ${BRAND_NAME}`,
        ogUrl: canonical,
        ogType: 'website',
        ogSiteName: BRAND_NAME,
        twitterCard: 'summary_large_image',
        twitterTitle: title,
        twitterDescription: description,
        twitterImage: ogImage,
        twitterImageAlt: `${title} - ${BRAND_NAME}`,
        breadcrumbs: [
          { name: 'Home', url: `${baseUrl}/` },
          { name: 'Services', url: `${baseUrl}/services` },
          { name: service.name, url: canonical },
        ],
        schemaType: 'Service',
        serviceData: {
          name: service.name,
          description: service.fullDesc || service.shortDesc,
          serviceType: service.name,
          price: service.startingPrice,
          deliverables: service.features,
        },
      };
    }
  }

  // 2. Main Page Routes
  switch (cleanPath) {
    case '/about': {
      const canonical = `${baseUrl}/about`;
      const title = `About ${BRAND_NAME} | Digital Solutions Agency`;
      const description = `Learn about AKorix Digital Solutions, a digital solutions agency focused on high-performance web engineering, design systems, and business technology.`;
      const keywords = `About AKorix Digital Solutions, AKorix Digital Solutions agency, digital solutions agency, web development agency team, software engineering agency, UI/UX design agency, ${PRIMARY_KEYWORDS}`;

      return {
        title,
        description,
        keywords,
        canonical,
        ogTitle: title,
        ogDescription: description,
        ogImage,
        ogImageUrl: ogImage,
        ogImageSecureUrl: ogImage,
        ogImageWidth: '1200',
        ogImageHeight: '630',
        ogImageType: 'image/png',
        ogImageAlt: `${title} - ${BRAND_NAME}`,
        ogUrl: canonical,
        ogType: 'website',
        ogSiteName: BRAND_NAME,
        twitterCard: 'summary_large_image',
        twitterTitle: title,
        twitterDescription: description,
        twitterImage: ogImage,
        twitterImageAlt: `${title} - ${BRAND_NAME}`,
        breadcrumbs: [
          { name: 'Home', url: `${baseUrl}/` },
          { name: 'About', url: canonical },
        ],
      };
    }

    case '/services': {
      const canonical = `${baseUrl}/services`;
      const title = `Services | ${BRAND_NAME}`;
      const description = `Explore core services from AKorix Digital Solutions, including custom web development, mobile applications, UI/UX design, e-commerce, and AI automation.`;
      const keywords = `services AKorix Digital Solutions, custom web development, UI/UX design, mobile app development, e-commerce development, WordPress development, Shopify development, SEO services, AI automation, ${PRIMARY_KEYWORDS}`;

      return {
        title,
        description,
        keywords,
        canonical,
        ogTitle: title,
        ogDescription: description,
        ogImage,
        ogImageUrl: ogImage,
        ogImageSecureUrl: ogImage,
        ogImageWidth: '1200',
        ogImageHeight: '630',
        ogImageType: 'image/png',
        ogImageAlt: `${title} - ${BRAND_NAME}`,
        ogUrl: canonical,
        ogType: 'website',
        ogSiteName: BRAND_NAME,
        twitterCard: 'summary_large_image',
        twitterTitle: title,
        twitterDescription: description,
        twitterImage: ogImage,
        twitterImageAlt: `${title} - ${BRAND_NAME}`,
        breadcrumbs: [
          { name: 'Home', url: `${baseUrl}/` },
          { name: 'Services', url: canonical },
        ],
      };
    }

    case '/projects': {
      const canonical = `${baseUrl}/projects`;
      const title = `Projects | ${BRAND_NAME}`;
      const description = `Discover recent work and client case studies delivered by AKorix Digital Solutions across modern web, mobile, and digital product platforms.`;
      const keywords = `projects AKorix Digital Solutions, case studies AKorix digital solutions, web development portfolio, custom web development case studies, e-commerce development portfolio, ${PRIMARY_KEYWORDS}`;

      return {
        title,
        description,
        keywords,
        canonical,
        ogTitle: title,
        ogDescription: description,
        ogImage,
        ogImageUrl: ogImage,
        ogImageSecureUrl: ogImage,
        ogImageWidth: '1200',
        ogImageHeight: '630',
        ogImageType: 'image/png',
        ogImageAlt: `${title} - ${BRAND_NAME}`,
        ogUrl: canonical,
        ogType: 'website',
        ogSiteName: BRAND_NAME,
        twitterCard: 'summary_large_image',
        twitterTitle: title,
        twitterDescription: description,
        twitterImage: ogImage,
        twitterImageAlt: `${title} - ${BRAND_NAME}`,
        breadcrumbs: [
          { name: 'Home', url: `${baseUrl}/` },
          { name: 'Projects', url: canonical },
        ],
      };
    }

    case '/process': {
      const canonical = `${baseUrl}/process`;
      const title = `Our Process | ${BRAND_NAME}`;
      const description = `Learn how AKorix Digital Solutions plans, designs, tests, and deploys high-quality digital solutions with a transparent agile delivery process.`;
      const keywords = `process AKorix Digital Solutions, agile web development process, digital solutions delivery workflow, software engineering methodology, ${PRIMARY_KEYWORDS}`;

      return {
        title,
        description,
        keywords,
        canonical,
        ogTitle: title,
        ogDescription: description,
        ogImage,
        ogImageUrl: ogImage,
        ogImageSecureUrl: ogImage,
        ogImageWidth: '1200',
        ogImageHeight: '630',
        ogImageType: 'image/png',
        ogImageAlt: `${title} - ${BRAND_NAME}`,
        ogUrl: canonical,
        ogType: 'website',
        ogSiteName: BRAND_NAME,
        twitterCard: 'summary_large_image',
        twitterTitle: title,
        twitterDescription: description,
        twitterImage: ogImage,
        twitterImageAlt: `${title} - ${BRAND_NAME}`,
        breadcrumbs: [
          { name: 'Home', url: `${baseUrl}/` },
          { name: 'Process', url: canonical },
        ],
      };
    }

    case '/contact': {
      const canonical = `${baseUrl}/contact`;
      const title = `Contact ${BRAND_NAME} | Let's Build Something Great`;
      const description = `Connect with AKorix Digital Solutions to discuss your project, request a proposal, or schedule a consultation with our digital solutions team.`;
      const keywords = `contact AKorix Digital Solutions, hire AKorix web development, digital solutions agency consultation, custom web development quote, start a project, ${PRIMARY_KEYWORDS}`;

      return {
        title,
        description,
        keywords,
        canonical,
        ogTitle: title,
        ogDescription: description,
        ogImage,
        ogImageUrl: ogImage,
        ogImageSecureUrl: ogImage,
        ogImageWidth: '1200',
        ogImageHeight: '630',
        ogImageType: 'image/png',
        ogImageAlt: `${title} - ${BRAND_NAME}`,
        ogUrl: canonical,
        ogType: 'website',
        ogSiteName: BRAND_NAME,
        twitterCard: 'summary_large_image',
        twitterTitle: title,
        twitterDescription: description,
        twitterImage: ogImage,
        twitterImageAlt: `${title} - ${BRAND_NAME}`,
        breadcrumbs: [
          { name: 'Home', url: `${baseUrl}/` },
          { name: 'Contact', url: canonical },
        ],
      };
    }

    // Default: Home Page ('/' or any unmatched path)
    case '/':
    default: {
      const canonical = `${baseUrl}/`;
      const title = `${BRAND_NAME} | Modern Digital Solutions & Web Development`;
      const description = `AKorix Digital Solutions provides modern web development, UI/UX, e-commerce, app development, SEO, digital marketing, and AI automation solutions.`;
      const keywords = PRIMARY_KEYWORDS;

      return {
        title,
        description,
        keywords,
        canonical,
        ogTitle: title,
        ogDescription: description,
        ogImage,
        ogImageUrl: ogImage,
        ogImageSecureUrl: ogImage,
        ogImageWidth: '1200',
        ogImageHeight: '630',
        ogImageType: 'image/png',
        ogImageAlt: `${title} - ${BRAND_NAME}`,
        ogUrl: canonical,
        ogType: 'website',
        ogSiteName: BRAND_NAME,
        twitterCard: 'summary_large_image',
        twitterTitle: title,
        twitterDescription: description,
        twitterImage: ogImage,
        twitterImageAlt: `${title} - ${BRAND_NAME}`,
        breadcrumbs: [{ name: 'Home', url: `${baseUrl}/` }],
      };
    }
  }
}
