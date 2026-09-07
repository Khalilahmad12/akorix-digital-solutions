import { ProcessStep } from '../types';

export const PROCESS_STEPS_DATA: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    shortTitle: 'Discovery',
    description: 'Understand your business, goals, audience, and project requirements.',
    iconName: 'Search',
    detail: 'In-depth requirement gathering and market analysis to align scope.'
  },
  {
    number: '02',
    title: 'Plan',
    shortTitle: 'Strategy',
    description: 'Define the strategy, features, technology, timeline, and project direction.',
    iconName: 'Compass',
    detail: 'Architecture blueprints, sprint milestones, and deliverables roadmap.'
  },
  {
    number: '03',
    title: 'Design',
    shortTitle: 'UI/UX',
    description: 'Create a modern, user-focused interface and experience around your brand.',
    iconName: 'Palette',
    detail: 'Interactive wireframes, high-fidelity prototypes, and component design tokens.'
  },
  {
    number: '04',
    title: 'Develop',
    shortTitle: 'Engineering',
    description: 'Turn the approved design into a fast, functional, and scalable digital solution.',
    iconName: 'Code2',
    detail: 'Clean, production-ready code with responsive layouts and database connections.'
  },
  {
    number: '05',
    title: 'Launch',
    shortTitle: 'Deployment',
    description: 'Test everything, optimize the final product, and prepare it for launch.',
    iconName: 'Rocket',
    detail: 'Rigorous QA testing, SEO audit, security checks, and production rollout.'
  },
  {
    number: '06',
    title: 'Support',
    shortTitle: 'Evolution',
    description: 'Provide ongoing assistance, improvements, maintenance, and future updates.',
    iconName: 'Headphones',
    detail: 'Proactive monitoring, regular upgrades, analytics reviews, and scaling.'
  }
];
