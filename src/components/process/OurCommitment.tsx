import React from 'react';
import { ShieldCheck, Zap, Users, TrendingUp } from 'lucide-react';

interface CommitmentCard {
  title: string;
  description: string;
  icon: React.ElementType;
}

const COMMITMENTS: CommitmentCard[] = [
  {
    title: 'Reliable & Performant',
    description: 'Engineered with clean code, modern standards, and fast load speeds to ensure dependable 24/7 stability.',
    icon: Zap,
  },
  {
    title: 'Intuitive & Easy to Use',
    description: 'Designed around real user behaviors with simple interfaces, frictionless workflows, and clear navigation.',
    icon: Users,
  },
  {
    title: 'Scalable for Growth',
    description: 'Built with modular architecture that adapts effortlessly as your business requirements and audience expand.',
    icon: TrendingUp,
  },
];

export const OurCommitment: React.FC = () => {
  return (
    <section 
      id="our-commitment"
      className="py-10 sm:py-14 bg-white text-stone-900 border-b border-stone-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-xs font-semibold text-amber-950">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
            <span className="tracking-wider uppercase text-[11px]">OUR COMMITMENT</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950 leading-tight">
            Built With Quality. Designed for the Long Term.
          </h2>

          <p className="text-sm sm:text-base text-stone-600 font-normal leading-relaxed max-w-xl mx-auto">
            We focus on creating digital solutions that are reliable, performant, easy to use, and ready to evolve with your business.
          </p>
        </div>

        {/* 3 Commitment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {COMMITMENTS.map((item) => {
            const IconComponent = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl bg-stone-50 hover:bg-white border border-stone-200 hover:border-amber-400/80 p-5 sm:p-6 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-start"
              >
                <div className="w-9 h-9 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-amber-700 mb-3.5 shadow-xs">
                  <IconComponent className="w-4 h-4" />
                </div>

                <h3 className="text-base font-bold text-stone-950 mb-1.5">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

