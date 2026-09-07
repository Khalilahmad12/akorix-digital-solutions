import React from 'react';
import { 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  Users, 
  Layers 
} from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export const TrustSection: React.FC = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  const specialties = [
    'Web Development',
    'UI/UX',
    'E-Commerce',
    'SEO',
    'Digital Marketing'
  ];

  const proofStrengths = [
    { label: 'Quality-Focused', icon: <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> },
    { label: 'Modern Solutions', icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" /> },
    { label: 'Fast Delivery', icon: <Zap className="w-3.5 h-3.5 text-amber-400" /> },
    { label: 'Client-Focused', icon: <Users className="w-3.5 h-3.5 text-amber-400" /> }
  ];

  return (
    <section className="bg-stone-900 border-y border-stone-800 text-stone-300 relative z-20 overflow-hidden shadow-inner">
      <div 
        ref={ref}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4"
      >
        
        {/* Desktop Single-Row Layout (Divided into Specialties & Proof Strengths) */}
        <div className={`flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-4 lg:gap-8 reveal-fade-up ${isVisible ? 'revealed' : ''}`}>
          
          {/* Left: Service Specialties */}
          <div className="flex items-center flex-wrap justify-center lg:justify-start gap-x-2.5 sm:gap-x-3 gap-y-1.5 text-xs sm:text-[13px]">
            <div className="inline-flex items-center gap-1.5 text-amber-400 font-semibold text-[11px] uppercase tracking-wider pr-1">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Specialties:</span>
            </div>

            {specialties.map((item, idx) => (
              <React.Fragment key={item}>
                <span className="font-medium text-stone-200 hover:text-white transition-colors">
                  {item}
                </span>
                {idx < specialties.length - 1 && (
                  <span className="text-amber-500/60 font-bold select-none text-[10px]">•</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Divider on Desktop */}
          <div className="hidden lg:block h-5 w-px bg-stone-800 shrink-0" />

          {/* Right: Genuine Proof Strengths */}
          <div className="flex items-center flex-wrap justify-center lg:justify-end gap-x-3 sm:gap-x-4 gap-y-1.5 text-xs sm:text-[13px]">
            {proofStrengths.map((item, idx) => (
              <div 
                key={item.label} 
                className="inline-flex items-center gap-1.5 font-medium text-stone-300 hover:text-amber-200 transition-colors"
              >
                {item.icon}
                <span className="text-stone-200">{item.label}</span>
                {idx < proofStrengths.length - 1 && (
                  <span className="text-stone-700 font-bold select-none text-[10px] ml-1.5 sm:ml-2">•</span>
                )}
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

