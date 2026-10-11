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
export const OFFICIAL_PRODUCTION_URL = 'https://akorixdigitalsolutions.com';

export function resolveBaseUrl(customBaseUrl?: string): string {
  if (customBaseUrl && customBaseUrl.trim() !== '') {
    return customBaseUrl.trim().replace(/\/$/, '');
  }

  // Always use the official canonical production URL for canonical, metadata, and schema tags
  return OFFICIAL_PRODUCTION_URL;
}

export const SITE_URL = OFFICIAL_PRODUCTION_URL;
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

// Primary keyword dictionary
const CORE_BRAND_KEYWORDS = [
  'AKorix Digital Solutions',
  'Digital Solutions Agency',
  'Web Development Agency',
  'Custom Website Development',
  'UI/UX Design',
  'E-Commerce Development',
  'WordPress Development',
  'Shopify Development',
  'Mobile App Development',
  'SEO Services',
  'Digital Marketing Services',
  'AI Automation',
  'AI Agents',
].join(', ');

// Tailored service metadata mapping
const SERVICE_SEO_MAP: Record<string, {
  title: string;
  description: string;
  keywords: string;
}> = {
  'web-development': {
    title: `Web Development Services | ${BRAND_NAME}`,
    description: 'Custom full-stack web development services built with React, Next.js, and modern tech. High speed, robust security, and SEO optimization for your business.',
    keywords: `Professional Web Development Services, Custom Website Development, Full-Stack Web Development, Responsive Website Development, React Web Development, Next.js Development, Web Development Agency, ${CORE_BRAND_KEYWORDS}`,
  },
  'ui-ux': {
    title: `UI/UX Design Services | ${BRAND_NAME}`,
    description: 'Human-centered UI/UX design services, interactive prototypes, and scalable Figma design systems crafted to elevate user retention and maximize conversions.',
    keywords: `UI/UX Design Services, Website UI/UX Design, User Interface Design, User Experience Design, Figma Design Systems, Interactive Prototyping, Usability Testing, ${CORE_BRAND_KEYWORDS}`,
  },
  'ecommerce': {
    title: `E-Commerce Website Development | ${BRAND_NAME}`,
    description: 'Scalable e-commerce website development with secure checkout, payment gateways, and high-converting storefronts engineered to maximize your online sales.',
    keywords: `E-Commerce Website Development, Online Store Development, Custom E-Commerce Solutions, Payment Gateway Integration, WooCommerce Development, High Converting Storefronts, ${CORE_BRAND_KEYWORDS}`,
  },
  'wordpress': {
    title: `WordPress Website Development | ${BRAND_NAME}`,
    description: 'Custom WordPress website development, responsive theme designs, and secure CMS solutions tailored for speed, search visibility, and seamless editing.',
    keywords: `WordPress Website Development, Custom WordPress Development, WordPress Website Design, WordPress Speed Optimization, Custom WordPress Theme, Secure CMS, ${CORE_BRAND_KEYWORDS}`,
  },
  'shopify': {
    title: `Shopify Development Services | ${BRAND_NAME}`,
    description: 'Professional Shopify development services, custom theme builds, and app integrations engineered for lightning-fast speeds and high e-commerce conversion.',
    keywords: `Shopify Development Services, Shopify Store Development, Custom Shopify Theme, Shopify App Integration, Shopify E-Commerce Agency, High Speed Shopify, ${CORE_BRAND_KEYWORDS}`,
  },
  'app-development': {
    title: `Mobile App Development Services | ${BRAND_NAME}`,
    description: 'Custom iOS and Android mobile app development with React Native and modern backends. High-performance, intuitive user interfaces built for scale.',
    keywords: `Mobile App Development Services, iOS App Development, Android App Development, Cross-Platform App Development, React Native Apps, Scalable Mobile Backends, ${CORE_BRAND_KEYWORDS}`,
  },
  'seo': {
    title: `Search Engine Optimization Services | AKorix Digital`,
    description: 'Results-driven technical SEO services, keyword research, on-page optimization, and audit strategies designed to grow organic search rankings and traffic.',
    keywords: `Search Engine Optimization Services, Technical SEO Services, On-Page SEO Optimization, Keyword Research, Search Ranking Strategy, Organic Traffic Growth, SEO Audit, ${CORE_BRAND_KEYWORDS}`,
  },
  'digital-marketing': {
    title: `Digital Marketing Services | ${BRAND_NAME}`,
    description: 'Strategic digital marketing services including paid ads, social media marketing, content strategies, and analytics to generate qualified leads and sales.',
    keywords: `Digital Marketing Services, Social Media Marketing, PPC Campaign Management, Performance Marketing, Lead Generation Services, Brand Growth Strategy, ${CORE_BRAND_KEYWORDS}`,
  },
  'graphics-design': {
    title: `Graphic Design Services | ${BRAND_NAME}`,
    description: 'Creative graphic design services, visual brand identity systems, marketing collateral, and digital assets tailored to make your business stand out.',
    keywords: `Graphic Design Services, Visual Brand Identity, Logo Design, Marketing Collateral Design, Digital Graphics, Vector Assets, Brand Style Guides, ${CORE_BRAND_KEYWORDS}`,
  },
  'video-editing': {
    title: `Video Editing Services | ${BRAND_NAME}`,
    description: 'Professional video editing services, commercial motion graphics, and social media video ads engineered to engage audiences and boost brand awareness.',
    keywords: `Video Editing Services, Commercial Motion Graphics, Social Media Video Ads, Promotional Video Production, YouTube Video Editing, Video Post Production, ${CORE_BRAND_KEYWORDS}`,
  },
  'ai-automation': {
    title: `AI Automation & AI Agents | ${BRAND_NAME}`,
    description: 'Intelligent AI automation services and custom AI agent development designed to streamline workflows, reduce manual overhead, and accelerate business growth.',
    keywords: `AI Automation Services, AI Agent Development, Intelligent Workflow Automation, Business AI Solutions, Chatbot Development, LLM Integration, Automated Workflows, ${CORE_BRAND_KEYWORDS}`,
  },
};

export function getPageSEO(pathname: string, customBaseUrl?: string): PageSEO {
  const baseUrl = resolveBaseUrl(customBaseUrl);
  const cleanPath = pathname.split('?')[0].split('#')[0];
  const ogImage = `${baseUrl}/og-image.png`;

  // 1. Individual Service Pages (/services/:slug)
  if (cleanPath.startsWith('/services/') && cleanPath.length > '/services/'.length) {
    const slug = cleanPath.replace('/services/', '').replace(/\/$/, '');
    const service = getServiceBySlug(slug);

    if (service) {
      const canonical = `${baseUrl}/services/${service.slug}`;
      const tailored = SERVICE_SEO_MAP[service.slug] || {
        title: `${service.name} Services | ${BRAND_NAME}`,
        description: `${BRAND_NAME} delivers expert ${service.name.toLowerCase()} solutions, combining high performance, custom engineering, and measurable business growth.`,
        keywords: `${service.name}, ${service.name} AKorix Digital Solutions, custom ${service.name.toLowerCase()}, ${CORE_BRAND_KEYWORDS}`,
      };

      return {
        title: tailored.title,
        description: tailored.description,
        keywords: tailored.keywords,
        canonical,
        ogTitle: tailored.title,
        ogDescription: tailored.description,
        ogImage,
        ogImageUrl: ogImage,
        ogImageSecureUrl: ogImage,
        ogImageWidth: '1200',
        ogImageHeight: '630',
        ogImageType: 'image/png',
        ogImageAlt: `${tailored.title} - ${BRAND_NAME}`,
        ogUrl: canonical,
        ogType: 'website',
        ogSiteName: BRAND_NAME,
        twitterCard: 'summary_large_image',
        twitterTitle: tailored.title,
        twitterDescription: tailored.description,
        twitterImage: ogImage,
        twitterImageAlt: `${tailored.title} - ${BRAND_NAME}`,
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
      const title = `About AKorix Digital Solutions | Digital Solutions Agency`;
      const description = `Learn about AKorix Digital Solutions, a modern digital agency specializing in custom web engineering, UI/UX design, e-commerce, and scalable business tech.`;
      const keywords = `About AKorix Digital Solutions, Digital Solutions Agency Team, Web Development Agency, Software Engineering Company, Digital Product Specialists, Full-Stack Developers, ${CORE_BRAND_KEYWORDS}`;

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
      const title = `Professional Digital Services | ${BRAND_NAME}`;
      const description = `Explore expert digital services from AKorix Digital Solutions: custom web development, UI/UX design, WordPress, Shopify, mobile apps, SEO, and AI automation.`;
      const keywords = `Digital Services, Web Development Services, E-Commerce Development, Shopify Services, WordPress Development, SEO Services, UI/UX Design, AI Automation, ${CORE_BRAND_KEYWORDS}`;

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
      const title = `Projects & Case Studies | ${BRAND_NAME}`;
      const description = `Explore our portfolio of web applications, e-commerce stores, and digital solutions delivered for growing businesses worldwide. View our latest case studies.`;
      const keywords = `AKorix Projects, Digital Portfolio, Web Development Case Studies, E-Commerce Portfolio, Client Success Stories, Full-Stack Portfolio, ${CORE_BRAND_KEYWORDS}`;

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
      const title = `Our Development Process | ${BRAND_NAME}`;
      const description = `Discover the agile delivery process at AKorix Digital Solutions: transparent discovery, UX design, robust engineering, QA testing, and seamless deployment.`;
      const keywords = `Development Process, Agile Web Development Workflow, Software Engineering Methodology, Quality Assurance, Transparent Project Delivery, ${CORE_BRAND_KEYWORDS}`;

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
      const title = `Contact Us & Get a Quote | ${BRAND_NAME}`;
      const description = `Get in touch with AKorix Digital Solutions for a free consultation or custom project estimate. Let's discuss your web, design, or digital marketing goals.`;
      const keywords = `Contact AKorix Digital Solutions, Hire Web Developers, Free Project Consultation, Custom Website Quote, Digital Agency Contact, Start a Project, ${CORE_BRAND_KEYWORDS}`;

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
      const title = `${BRAND_NAME} | Digital Solutions & Web Agency`;
      const description = `AKorix Digital Solutions builds high-performance web applications, UI/UX designs, e-commerce stores, SEO strategies, and AI automations. Get a free quote today.`;
      const keywords = CORE_BRAND_KEYWORDS;

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
