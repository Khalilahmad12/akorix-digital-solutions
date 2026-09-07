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
  ogType: string;
  twitterCard: 'summary_large_image' | 'summary';
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

export const SITE_URL = 'https://akorix-digital.com';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
export const BRAND_NAME = 'AKorix Digital Solutions';

export function getPageSEO(pathname: string): PageSEO {
  const cleanPath = pathname.split('?')[0].split('#')[0];

  // 1. Individual Service Pages (/services/:slug)
  if (cleanPath.startsWith('/services/') && cleanPath.length > '/services/'.length) {
    const slug = cleanPath.replace('/services/', '');
    const service = getServiceBySlug(slug);

    if (service) {
      const canonical = `${SITE_URL}/services/${service.slug}`;
      return {
        title: `${service.name} Services | ${BRAND_NAME}`,
        description: `${service.heroDescription || service.shortDesc} Delivered by ${BRAND_NAME} with high performance, clean architecture, and rapid turnaround.`,
        keywords: `${service.name.toLowerCase()} services, custom ${service.name.toLowerCase()}, ${service.category} development, ${BRAND_NAME.toLowerCase()}, digital solutions`,
        canonical,
        ogTitle: `${service.name} Services | ${BRAND_NAME}`,
        ogDescription: `${service.shortDesc} Scalable engineering & high-impact digital solutions.`,
        ogImage: DEFAULT_OG_IMAGE,
        ogType: 'website',
        twitterCard: 'summary_large_image',
        breadcrumbs: [
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Services', url: `${SITE_URL}/services` },
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
    case '/about':
      return {
        title: `About Us | ${BRAND_NAME} - Our Team & Expertise`,
        description: `Learn about AKorix Digital Solutions, a modern digital product & web engineering agency driven by technical craftsmanship, user-centric design, and scalable business results.`,
        keywords: `about AKorix Digital Solutions, digital agency team, web engineering experts, custom digital solutions company, full-stack developers, UI UX agency, software consultancy`,
        canonical: `${SITE_URL}/about`,
        ogTitle: `About Us | ${BRAND_NAME} - Digital Product & Web Agency`,
        ogDescription: `Learn about our multidisciplinary team, engineering values, and our mission to build digital solutions that accelerate business growth.`,
        ogImage: DEFAULT_OG_IMAGE,
        ogType: 'website',
        twitterCard: 'summary_large_image',
        breadcrumbs: [
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'About Us', url: `${SITE_URL}/about` },
        ],
      };

    case '/services':
      return {
        title: `Digital Services & Engineering | ${BRAND_NAME}`,
        description: `Comprehensive digital services from AKorix Digital Solutions: Web Development, UI/UX Design, E-Commerce, WordPress, Shopify, Mobile Apps, SEO, Digital Marketing, and AI Automation.`,
        keywords: `digital services, web development agency, mobile app development, UI UX design, e-commerce development, WordPress development, Shopify agency, SEO services, digital marketing, AI automation`,
        canonical: `${SITE_URL}/services`,
        ogTitle: `Digital Services & Engineering | ${BRAND_NAME}`,
        ogDescription: `Explore our end-to-end digital capabilities: Custom Web Apps, Mobile Development, UI/UX Systems, E-Commerce, and AI Automation.`,
        ogImage: DEFAULT_OG_IMAGE,
        ogType: 'website',
        twitterCard: 'summary_large_image',
        breadcrumbs: [
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Services', url: `${SITE_URL}/services` },
        ],
      };

    case '/projects':
      return {
        title: `Projects & Case Studies | ${BRAND_NAME}`,
        description: `Explore our portfolio of delivered web applications, responsive websites, e-commerce stores, and digital products built by AKorix Digital Solutions for global clients.`,
        keywords: `web development portfolio, digital agency projects, custom web apps case studies, e-commerce websites portfolio, UI UX showcase, AKorix Digital Solutions work`,
        canonical: `${SITE_URL}/projects`,
        ogTitle: `Projects & Case Studies | ${BRAND_NAME}`,
        ogDescription: `Explore our work across web development, mobile apps, UI/UX design, and digital solutions with measurable business impact.`,
        ogImage: DEFAULT_OG_IMAGE,
        ogType: 'website',
        twitterCard: 'summary_large_image',
        breadcrumbs: [
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Projects', url: `${SITE_URL}/projects` },
        ],
      };

    case '/process':
      return {
        title: `Our Process & Methodology | ${BRAND_NAME}`,
        description: `How AKorix Digital Solutions builds and launches digital products. Discover our transparent 6-step agile process from Discovery & Architecture to Launch and Ongoing Support.`,
        keywords: `web development process, digital agency workflow, agile development methodology, software delivery process, web launch roadmap, AKorix process`,
        canonical: `${SITE_URL}/process`,
        ogTitle: `Our Process & Methodology | ${BRAND_NAME}`,
        ogDescription: `Transparent, efficient, and agile 6-step delivery framework for launching scalable digital products.`,
        ogImage: DEFAULT_OG_IMAGE,
        ogType: 'website',
        twitterCard: 'summary_large_image',
        breadcrumbs: [
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Process', url: `${SITE_URL}/process` },
        ],
      };

    case '/contact':
      return {
        title: `Contact Us | ${BRAND_NAME} - Project Consultation`,
        description: `Get in touch with AKorix Digital Solutions. Request a free consultation, discuss your custom web development or app project, or chat directly via WhatsApp (03461764101).`,
        keywords: `contact AKorix Digital Solutions, web development consultation, hire web developers, digital agency inquiry, WhatsApp consultation, start a digital project`,
        canonical: `${SITE_URL}/contact`,
        ogTitle: `Contact Us | ${BRAND_NAME} - Project Consultation`,
        ogDescription: `Start your digital project with AKorix Digital Solutions. Inquire online or message us directly on WhatsApp for an immediate consultation.`,
        ogImage: DEFAULT_OG_IMAGE,
        ogType: 'website',
        twitterCard: 'summary_large_image',
        breadcrumbs: [
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Contact Us', url: `${SITE_URL}/contact` },
        ],
      };

    // Default: Home Page ('/' or any unmatched path)
    case '/':
    default:
      return {
        title: `${BRAND_NAME} | Web Development & Digital Solutions Agency`,
        description: `AKorix Digital Solutions is a premier digital agency building high-performance web applications, mobile apps, UI/UX designs, e-commerce stores, and AI automation solutions for growing businesses worldwide.`,
        keywords: `digital solutions, digital solutions agency, web development agency, website development, custom web development, web design and development, UI UX design, e-commerce development, WordPress development, Shopify development, mobile app development, SEO services, digital marketing services, graphics design, video editing, AI automation, AI agents, full-stack development`,
        canonical: `${SITE_URL}/`,
        ogTitle: `${BRAND_NAME} | Web Development & Digital Solutions Agency`,
        ogDescription: `High-impact digital products and web engineering. We build fast, scalable web apps, mobile solutions, intuitive UI/UX, e-commerce stores, and AI automation.`,
        ogImage: DEFAULT_OG_IMAGE,
        ogType: 'website',
        twitterCard: 'summary_large_image',
        breadcrumbs: [{ name: 'Home', url: `${SITE_URL}/` }],
      };
  }
}
