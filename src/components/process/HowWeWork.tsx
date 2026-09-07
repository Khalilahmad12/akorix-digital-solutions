import React from 'react';
import { 
  Workflow, 
  Search, 
  Compass, 
  Palette, 
  Code2, 
  Rocket, 
  Headphones,
  ArrowRight,
  ChevronDown
} from 'lucide-react';

interface StepItem {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const STEPS: StepItem[] = [
  {
    number: '01',
    title: 'Discover',
    description: 'We understand your business, goals, audience, requirements, and project vision.',
    icon: Search,
  },
  {
    number: '02',
    title: 'Plan',
    description: 'We define the project scope, structure, priorities, and development roadmap.',
    icon: Compass,
  },
  {
    number: '03',
    title: 'Design',
    description: 'We create a clear and user-focused visual experience before development begins.',
    icon: Palette,
  },
  {
    number: '04',
    title: 'Develop',
    description: 'We turn the approved concept into a responsive, functional, and reliable digital solution.',
    icon: Code2,
  },
  {
    number: '05',
    title: 'Launch',
    description: 'We test, optimize, finalize, and prepare the project for a smooth launch.',
    icon: Rocket,
  },
  {
    number: '06',
    title: 'Support',
    description: 'We remain available for improvements, updates, maintenance, and future growth.',
    icon: Headphones,
  },
];

export const HowWeWork: React.FC = () => {
  return (
    <section 
      id="how-we-work"
      className="py-10 sm:py-14 lg:py-16 bg-white text-stone-900 border-b border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-xs font-semibold text-amber-950">
            <Workflow className="w-3.5 h-3.5 text-amber-700" />
            <span className="tracking-wider uppercase text-[11px]">HOW WE WORK</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-stone-950 leading-tight">
            From First Conversation to Final Launch.
          </h2>

          <p className="text-sm sm:text-base text-stone-600 font-normal leading-relaxed max-w-2xl mx-auto">
            Every project follows a clear process designed to keep communication simple, development focused, and progress visible.
          </p>
        </div>

        {/* Desktop & Tablet Connected Grid (3 cols on lg, 2 cols on sm/md) */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 relative">
          {STEPS.map((step, idx) => {
            const IconComponent = step.icon;
            const isLast = idx === STEPS.length - 1;

            return (
              <div
                key={step.number}
                className="group relative rounded-2xl bg-stone-50 hover:bg-white border border-stone-200 hover:border-amber-400/80 p-5 sm:p-6 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Step Number & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-amber-500 text-stone-950 text-xs font-mono font-bold shadow-xs">
                        {step.number}
                      </span>
                      <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                        Step
                      </span>
                    </div>

                    <div className="w-9 h-9 rounded-xl bg-white group-hover:bg-amber-50 border border-stone-200 group-hover:border-amber-300 flex items-center justify-center text-stone-700 group-hover:text-amber-700 transition-colors shadow-xs">
                      <IconComponent className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-stone-950 group-hover:text-amber-900 transition-colors mb-2">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Bottom Progression Indicator */}
                <div className="pt-4 mt-4 border-t border-stone-200/60 flex items-center justify-between text-[11px] font-semibold text-stone-400 group-hover:text-stone-700 transition-colors">
                  <span>Phase {step.number}</span>
                  {!isLast ? (
                    <span className="flex items-center gap-1 text-amber-700 font-bold group-hover:translate-x-0.5 transition-transform">
                      Next Step
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  ) : (
                    <span className="text-amber-700 font-bold">
                      Complete Lifecycle
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Connected Vertical Timeline (1 col) */}
        <div className="sm:hidden relative pl-6 space-y-6">
          {/* Vertical Continuous Progress Line */}
          <div className="absolute left-2.5 top-3 bottom-3 w-0.5 bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600" />

          {STEPS.map((step, idx) => {
            const IconComponent = step.icon;
            const isLast = idx === STEPS.length - 1;

            return (
              <div key={step.number} className="relative group">
                {/* Node Dot on Timeline */}
                <div className="absolute -left-6 top-1.5 w-5 h-5 rounded-full bg-amber-500 border-2 border-white shadow-xs flex items-center justify-center z-10">
                  <div className="w-1.5 h-1.5 rounded-full bg-stone-950" />
                </div>

                {/* Card Container */}
                <div className="rounded-xl bg-stone-50 border border-stone-200 p-4 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-amber-500 text-stone-950 text-[11px] font-mono font-bold">
                        {step.number}
                      </span>
                      <h3 className="text-base font-bold text-stone-950">
                        {step.title}
                      </h3>
                    </div>

                    <div className="w-7 h-7 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-stone-700">
                      <IconComponent className="w-3.5 h-3.5 text-amber-700" />
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 font-normal leading-relaxed">
                    {step.description}
                  </p>

                  {!isLast && (
                    <div className="pt-2 flex items-center gap-1 text-[10.5px] font-semibold text-amber-800">
                      <ChevronDown className="w-3 h-3 text-amber-600" />
                      <span>Proceeds to {STEPS[idx + 1].title}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
