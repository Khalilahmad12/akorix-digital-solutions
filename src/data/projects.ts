import { ProjectItem, ProjectCaseStudy } from '../types';
import projectIMG from '../assets/images/project-1.jpeg'
import projectIMGtwo from '../assets/images/project-2.png'
import projectIMGthree from '../assets/images/project-3.png'
import projectIMGfoure from '../assets/images/project-4.jpeg'



export const SHOWCASE_PROJECTS: ProjectItem[] = [
  {
    id: 'project-1',
    title: 'RestFast Fast Food Website',
    category: 'Web Development',
    description: 'Modern fast-food ordering website featuring a responsive menu, smooth navigation, and a seamless online food ordering experience.',
    image: projectIMG,
    services: ['Custom Web App', 'API Architecture', 'Performance Optimization'],
    technologies: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'PostgreSQL'],
    projectUrl: 'https://restfast-react.vercel.app',
    isFeatured: true,
  },

  {
    id: 'project-2',
    title: 'Ayesha Personal Portfolio Website',
    category: 'Web Development',
    description: 'Modern personal portfolio website with elegant design, responsive layouts, smooth navigation, and a professional showcase experience.',
    image: projectIMGtwo,
    services: ['E-Commerce Development', 'Payment Gateways', 'Conversion Design'],
    technologies: ['Shopify Plus', 'Next.js', 'Stripe', 'Tailwind CSS'],
    projectUrl: 'https://ayesha-portfoilo.vercel.app/',
    isFeatured: true,
  },

  {
    id: 'project-3',
    title: 'Zeenog Global Solution Website',
    category: 'Apps',
    description: 'Professional business website featuring modern design, responsive layouts, clear service presentation, and smooth user navigation.',
    image: projectIMGthree,
    services: ['Mobile App Development', 'Telehealth API', 'Security & HIPAA'],
    technologies: ['React Native', 'TypeScript', 'WebRTC', 'AWS'],
    projectUrl: 'https://zeenogloblesolution.com/',
  },

  {
    id: 'project-4',
    title: 'Bingle Mobile App',
    category: 'UI/UX',
    description: 'Modern mobile app website featuring responsive design, clear app details, intuitive navigation, and engaging user experience.',
    image: projectIMGfoure,
    services: ['UI/UX Design', 'Design Systems', 'Interactive Prototyping'],
    technologies: ['Figma', 'Storybook', 'Tailwind CSS', 'Design Tokens'],
    projectUrl: 'https://bingle-moblie.vercel.app/',
  },

  {
    id: 'project-5',
    title: 'Apex Editorial & Media Hub',
    category: 'WordPress',
    description: 'Custom Gutenberg publishing portal with lightning-fast caching and multi-author editorial workflows.',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1000&q=80',
    services: ['WordPress Development', 'Custom Themes', 'Speed Optimization'],
    technologies: ['WordPress', 'PHP', 'Gutenberg Blocks', 'Redis Cache'],
    projectUrl: 'https://example.com/apex-media',
  },
  {
    id: 'project-6',
    title: 'Quantix FinTech Trading App',
    category: 'Apps',
    description: 'Ultra-low latency mobile trading interface with interactive charts, live order books, and price alerts.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1000&q=80',
    services: ['iOS & Android App', 'WebSocket Integration', 'Fintech Architecture'],
    technologies: ['Flutter', 'Dart', 'WebSockets', 'ChartEngine'],
    projectUrl: 'https://example.com/quantix-app',
  },
  {
    id: 'project-7',
    title: 'Aethel AI Automation Suite',
    category: 'Digital Solutions',
    description: 'Intelligent process automation pipeline automating customer support routing and CRM data workflows.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1000&q=80',
    services: ['AI Integration', 'Workflow Automation', 'Cloud Microservices'],
    technologies: ['Python', 'Gemini AI', 'FastAPI', 'Docker'],
    projectUrl: 'https://example.com/aethel-automation',
  },
  {
    id: 'project-8',
    title: 'Artisan Home Direct E-Commerce',
    category: 'E-Commerce',
    description: 'Custom furniture retail platform with 3D room previewer, inventory syncing, and fast checkout.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80',
    services: ['E-Commerce Web', '3D Product Customizer', 'ERP Integration'],
    technologies: ['WooCommerce', 'Three.js', 'PHP', 'Stripe'],
    projectUrl: 'https://example.com/artisan-home',
  },
  {
    id: 'project-9',
    title: 'Strata Enterprise Web Portal',
    category: 'Web Development',
    description: 'B2B client portal with role-based permissions, automated billing, and document management.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80',
    services: ['Web App Development', 'Security & RBAC', 'Database Architecture'],
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    projectUrl: 'https://example.com/strata-portal',
  },
  {
    id: 'project-10',
    title: 'Pulse Creative Branding & UI',
    category: 'UI/UX',
    description: 'Complete digital brand revamp, wireframing, user journey mapping, and responsive web component library.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
    services: ['UX Research', 'UI Design', 'Brand Strategy'],
    technologies: ['Figma', 'Design Systems', 'Micro-interactions'],
    projectUrl: 'https://example.com/pulse-branding',
  },
  {
    id: 'project-11',
    title: 'Horizon Travel Booking Hub',
    category: 'WordPress',
    description: 'Fast, multilingual WordPress booking directory with live calendar availability and payment handling.',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1000&q=80',
    services: ['Custom WordPress', 'Booking Engine', 'SEO & Speed'],
    technologies: ['WordPress', 'WPML', 'Custom REST API', 'MySQL'],
    projectUrl: 'https://example.com/horizon-travel',
  },
  {
    id: 'project-12',
    title: 'OmniSync Cloud Workflow Hub',
    category: 'Digital Solutions',
    description: 'Integrated analytics and digital marketing automation system syncing multi-channel ad performance in real time.',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1000&q=80',
    services: ['Digital Solutions', 'Data Pipelines', 'API Connectors'],
    technologies: ['Node.js', 'Express', 'Google Cloud', 'React'],
    projectUrl: 'https://example.com/omnisync-hub',
  },
];

export const CASE_STUDIES: ProjectCaseStudy[] = [
  {
    id: 'aura-cloud',
    title: 'Aura Cloud Enterprise SaaS',
    tagline: 'Next-Gen Cloud Resource Management Platform',
    client: 'Aura Systems Inc.',
    industry: 'Fintech / DevOps',
    year: '2025',
    category: 'web',
    heroImage: 'https://picsum.photos/seed/auracloud/1200/675',
    overview: 'Aura Cloud needed an overhaul of their complex cloud asset tracking interface, serving over 15,000 DevOps engineers across Europe and North America.',
    challenge: 'Legacy portal had high latency, cluttered navigation, and a 42% drop-off rate during multi-cloud setup workflows.',
    solution: 'AKorix re-architected the application using Next.js 15, React Server Components, and a sleek custom dark mode UI system with live WebSocket telemetry graphs.',
    metrics: [
      { label: 'Page Load Speed', value: '0.35s' },
      { label: 'Conversion Increase', value: '+340%' },
      { label: 'User Retention', value: '94.8%' },
    ],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Node.js', 'PostgreSQL'],
    demoUrl: 'https://example.com/auracloud',
    clientQuote: {
      quote: "AKorix delivered our flagship product revamp 2 weeks ahead of schedule. The design precision and snappy frontend response transformed our customer feedback.",
      author: "Marcus Vance",
      role: "VP of Product, Aura Systems",
      avatar: "https://picsum.photos/seed/marcus/200/200",
    }
  },
  {
    id: 'lumina-health',
    title: 'Lumina Telehealth Mobile App',
    tagline: 'HIPAA-Compliant Patient Telecare Portal',
    client: 'Lumina Health Network',
    industry: 'Healthcare Tech',
    year: '2025',
    category: 'mobile',
    heroImage: 'https://picsum.photos/seed/lumina/1200/675',
    overview: 'A seamless mobile experience connecting patients with specialists in under 60 seconds, featuring secure HD video consultations and e-prescriptions.',
    challenge: 'Existing web app lacked mobile push notifications, instant camera access, and offline appointment scheduling.',
    solution: 'Engineered a cross-platform React Native app with WebRTC video calling, encrypted local state, and biometric check-in.',
    metrics: [
      { label: 'App Store Rating', value: '4.9 ★' },
      { label: 'Active Monthly Patients', value: '180,000+' },
      { label: 'Consultation Latency', value: '<120ms' },
    ],
    techStack: ['React Native', 'WebRTC', 'Node.js', 'GraphQL', 'AWS KMS'],
    demoUrl: 'https://example.com/lumina',
    clientQuote: {
      quote: "AKorix's mobile team engineered an app our patients love. The security standards met HIPAA seamlessly while maintaining a 5-star consumer feel.",
      author: "Dr. Elena Rostova",
      role: "Chief Medical Officer, Lumina",
      avatar: "https://picsum.photos/seed/elena/200/200",
    }
  }
];
