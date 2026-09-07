import React from 'react';
import { ShieldCheck, HeartHandshake, TrendingUp, Anchor, Check } from 'lucide-react';

interface PrincipleItem {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const PRINCIPLES_DATA: PrincipleItem[] = [
  {
    number: '01',
    title: 'Quality First',
    description: 'Thoughtful design, clean development, and reliable digital solutions.',
    icon: ShieldCheck,
  },
  {
    number: '02',
    title: 'Client Focused',
    description: 'We understand the goal first and build around the real needs of the business.',
    icon: HeartHandshake,
  },
  {
    number: '03',
    title: 'Keep Improving',
    description: 'We continuously learn, adapt, and find better ways to solve digital challenges.',
    icon: TrendingUp,
  },
  {
    number: '04',
    title: 'Build for the Long Term',
    description: 'We create solutions designed to remain useful, scalable, and adaptable.',
    icon: Anchor,
  },
];

export const ValuesSection: React.FC = () => {
  return (
    <section 
      id="values"
      className="relative py-12 sm:py-16 lg:py-18 overflow-hidden bg-cover bg-center bg-fixed text-white"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80')`
      }}
    >
      {/* Same Hero / WhyChooseUs Overlay Color & Treatment */}
      <div className="absolute inset-0 bg-stone-950/70 backdrop-blur-[2px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-white backdrop-blur-xs">
            <Check className="w-3.5 h-3.5 text-amber-400" />
            <span className="tracking-wider uppercase text-[11px]">WHAT WE BELIEVE</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
            The Principles Behind Our Work.
          </h2>
        </div>

        {/* Four Principles - Transparent Glass Cards matching WhyChooseUs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {PRINCIPLES_DATA.map((item) => {
            const IconComponent = item.icon;

            return (
              <div
                key={item.number}
                className="group relative rounded-xl bg-white/5 border border-white/20 p-5 sm:p-6 backdrop-blur-xs hover:bg-white/10 hover:border-white/50 hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col justify-between"
              >
                <div>
                  {/* Number & Icon Container */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-mono font-bold text-white/90">
                      {item.number}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center group-hover:scale-105 group-hover:bg-white/15 transition-all duration-300">
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Card Title */}
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug">
                    {item.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-xs sm:text-sm text-white/80 font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Subtle Visual Accent */}
                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-medium text-white/60 group-hover:text-white transition-colors">
                  <span>Core Standard</span>
                  <span className="text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-all">→</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
