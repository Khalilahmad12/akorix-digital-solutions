export type ServiceCategory = 
  | 'all'
  | 'web'
  | 'mobile'
  | 'design'
  | 'marketing'
  | 'ai'
  | 'cloud';

export interface ServiceCapability {
  title: string;
  description: string;
  icon?: string;
}

export interface ServiceBenefit {
  title: string;
  description: string;
  icon?: string;
}

export interface Service {
  id: string;
  name: string;
  title: string;
  slug: string;
  category: ServiceCategory;
  shortDesc: string;
  shortDescription?: string;
  keyBenefit: string;
  heroDescription: string;
  fullDesc: string;
  icon: string;
  startingPrice?: number;
  estimatedDays?: number;
  popular?: boolean;
  tag?: string;
  features: string[];
  capabilities: ServiceCapability[];
  benefits: ServiceBenefit[];
  technologies: string[];
  deliverables?: string[];
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  tagline: string;
  client: string;
  industry: string;
  year: string;
  category: ServiceCategory;
  heroImage: string;
  overview: string;
  challenge: string;
  solution: string;
  metrics: {
    label: string;
    value: string;
  }[];
  techStack: string[];
  demoUrl?: string;
  clientQuote?: {
    quote: string;
    author: string;
    role: string;
    avatar: string;
  };
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  link?: string;
  tagColor?: string;
  services?: string[];
  technologies?: string[];
  projectUrl?: string;
  isFeatured?: boolean;
}

export interface FreelancerTalent {
  id: string;
  name: string;
  role: string;
  category: ServiceCategory;
  avatar: string;
  rating: number;
  reviewCount: number;
  completedProjects: number;
  hourlyRate: number;
  location: string;
  availability: 'Available Now' | 'Next Week' | 'In 2 Weeks';
  skills: string[];
  bio: string;
  featuredWork: string;
}

export interface ClientTestimonial {
  id: string;
  clientName: string;
  clientRole: string;
  companyName?: string;
  clientPhoto: string;
  projectName: string;
  serviceProvided: string;
  feedback: string;
  rating: number;
}

export interface ProcessStep {
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  iconName: string;
  detail: string;
}

export interface ChallengeItem {
  number: string;
  title: string;
  description: string;
  tag: string;
  iconName: string;
}

export interface WhyChooseUsReason {
  number: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}
