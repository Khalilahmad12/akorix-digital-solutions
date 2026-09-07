import React from 'react';
import { 
  AlertCircle, 
  Smartphone, 
  SearchX, 
  FilterX, 
  MonitorX
} from 'lucide-react';
import { CHALLENGES_DATA } from '../../data';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export const ProblemSolution: React.FC = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'MonitorX':
        return <MonitorX className="w-5 h-5 text-stone-700" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-stone-700" />;
      case 'SearchX':
        return <SearchX className="w-5 h-5 text-stone-700" />;
      case 'FilterX':
        return <FilterX className="w-5 h-5 text-stone-700" />;
      default:
        return <AlertCircle className="w-5 h-5 text-stone-700" />;
    }
  };

  const getCardDirectionClass = (index: number) => {
    switch (index % 4) {
      case 0:
        return 'reveal-card-up';
      case 1:
        return 'reveal-card-left';
      case 2:
        return 'reveal-card-right';
      case 3:
        return 'reveal-card-up';
      default:
        return 'reveal-card-up';
    }
  };

  return (
    <section 
      id="challenges" 
      ref={ref}
      className="py-10 sm:py-14 bg-stone-50 text-stone-900 border-b border-stone-200 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: Eyebrow + Main Heading + Supporting Line */}
        <div className={`text-center max-w-3xl mx-auto space-y-2 mb-8 sm:mb-10 reveal-fade-up ${isVisible ? 'revealed' : ''}`}>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-[11px] font-semibold text-amber-900">
            <AlertCircle className="w-3 h-3 text-amber-700" />
            <span>THE CHALLENGES WE SOLVE</span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-stone-950 leading-snug">
            Your Business Deserves More Than Just a Website.
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 font-normal leading-snug max-w-2xl mx-auto">
            We understand the challenges holding your business back — and turn them into practical digital solutions.
          </p>
        </div>

        {/* 4 Problem Cards Grid - Desktop Staggered Sequence with subtle directional variance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {CHALLENGES_DATA.map((problem, idx) => (
            <div
              key={problem.number}
              className={`group relative rounded-xl bg-white border border-stone-200/90 p-4 sm:p-5 hover:border-amber-400 hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col justify-between shadow-xs hover:shadow-md ${getCardDirectionClass(idx)} ${isVisible ? 'revealed' : ''}`}
              style={{ transitionDelay: `${80 + idx * 80}ms` }}
            >
              <div>
                {/* Card Top: Number & Tag */}
                <div className="flex items-center justify-between mb-3.5">
                  <span className="text-xs font-mono font-bold text-amber-600">
                    {problem.number}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 border border-stone-200">
                    {problem.tag}
                  </span>
                </div>

                {/* Minimal Icon */}
                <div className="w-10 h-10 rounded-lg bg-stone-100/90 border border-stone-200 flex items-center justify-center mb-3 group-hover:bg-amber-50 group-hover:border-amber-300 group-hover:text-amber-700 transition-colors shrink-0">
                  {getIcon(problem.iconName)}
                </div>

                {/* Title */}
                <h3 className="text-sm sm:text-base font-bold text-stone-950 mb-1.5 group-hover:text-amber-800 transition-colors leading-snug">
                  {problem.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-stone-600 leading-relaxed font-normal">
                  {problem.description}
                </p>
              </div>

              {/* Card Footer Indicator */}
              <div className="pt-3 mt-3 border-t border-stone-100 flex items-center gap-1.5 text-[11px] font-medium text-stone-400 group-hover:text-amber-700 transition-colors">
                <span>Recognize this hurdle?</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

