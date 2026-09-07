import React, { useState } from 'react';
import { 
  Search, 
  Compass, 
  Palette, 
  Code2, 
  Rocket, 
  Headphones, 
  Sparkles 
} from 'lucide-react';
import { PROCESS_STEPS_DATA } from '../../data';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface ProcessProps {
  onOpenContact?: () => void;
}

export const Process: React.FC<ProcessProps> = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [activeStep, setActiveStep] = useState<number>(0);

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Search':
        return <Search className="w-5 h-5" />;
      case 'Compass':
        return <Compass className="w-5 h-5" />;
      case 'Palette':
        return <Palette className="w-5 h-5" />;
      case 'Code2':
        return <Code2 className="w-5 h-5" />;
      case 'Rocket':
        return <Rocket className="w-5 h-5" />;
      case 'Headphones':
        return <Headphones className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section 
      id="process" 
      ref={ref}
      className="py-12 sm:py-16 bg-white text-stone-900 border-t border-stone-200 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto space-y-2.5 mb-10 sm:mb-14 reveal-fade-up ${isVisible ? 'revealed' : ''}`}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-xs font-semibold text-amber-900">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span className="tracking-wider uppercase text-[11px]">OUR STEP-BY-STEP PROCESS</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-stone-950 leading-tight">
            How We Turn Ideas Into Digital Solutions
          </h2>

          <p className="text-sm sm:text-base text-stone-600 font-normal leading-relaxed max-w-2xl mx-auto">
            A clear, structured process that keeps your project moving from the first conversation to successful launch and beyond.
          </p>
        </div>

        {/* Desktop 6-Step Horizontal Timeline */}
        <div className="hidden md:block mb-8">
          <div className="relative">
            
            {/* Connecting Horizontal Line */}
            <div className="absolute top-7 left-8 right-8 h-0.5 bg-stone-200 z-0">
              <div 
                className="h-full bg-amber-500 transition-all duration-500 ease-out"
                style={{ width: `${(activeStep / (PROCESS_STEPS_DATA.length - 1)) * 100}%` }}
              />
            </div>

            {/* 6 Steps Grid - Staggered Reveal */}
            <div className="grid grid-cols-6 gap-3 relative z-10">
              {PROCESS_STEPS_DATA.map((step, idx) => {
                const isActive = idx === activeStep;
                const isPassed = idx <= activeStep;

                return (
                  <div
                    key={step.number}
                    onMouseEnter={() => setActiveStep(idx)}
                    className={`flex flex-col items-center text-center group cursor-pointer reveal-card-up ${isVisible ? 'revealed' : ''}`}
                    style={{ transitionDelay: `${60 + idx * 70}ms` }}
                  >
                    {/* Numbered Marker Circle */}
                    <div 
                      className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 border-2 ${
                        isActive
                          ? 'bg-amber-500 text-stone-950 border-amber-600 shadow-md scale-105 -translate-y-1'
                          : isPassed
                          ? 'bg-amber-100 text-amber-900 border-amber-400'
                          : 'bg-white text-stone-600 border-stone-200 group-hover:border-amber-300 group-hover:bg-stone-50'
                      }`}
                    >
                      <span className="text-xs font-mono font-bold">{step.number}</span>
                      <div className="scale-75">
                        {getStepIcon(step.iconName)}
                      </div>
                    </div>

                    {/* Step Title & Short Description */}
                    <div className="mt-3.5 px-1">
                      <h3 className={`text-sm font-bold transition-colors leading-snug ${
                        isActive ? 'text-amber-800' : 'text-stone-950 group-hover:text-amber-700'
                      }`}>
                        {step.title}
                      </h3>
                      <p className="text-xs text-stone-500 font-normal leading-relaxed mt-1.5 line-clamp-3">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="md:hidden space-y-4">
          <div className="relative pl-6 border-l-2 border-amber-400/80 ml-4 space-y-6">
            {PROCESS_STEPS_DATA.map((step, idx) => (
              <div 
                key={step.number}
                className={`relative group bg-stone-50 p-4 rounded-xl border border-stone-200/90 shadow-2xs reveal-fade-up ${isVisible ? 'revealed' : ''}`}
                style={{ transitionDelay: `${40 + idx * 50}ms` }}
              >
                {/* Vertical Timeline Dot */}
                <div className="absolute -left-[35px] top-4 w-7 h-7 rounded-lg bg-amber-500 text-stone-950 border-2 border-white flex items-center justify-center font-mono font-bold text-xs shadow-xs">
                  {step.number}
                </div>

                <div className="flex items-center gap-2 mb-1.5">
                  <div className="p-1 rounded-md bg-amber-100 text-amber-900">
                    {getStepIcon(step.iconName)}
                  </div>
                  <h3 className="text-base font-bold text-stone-950">
                    {step.title}
                  </h3>
                </div>

                <p className="text-xs text-stone-600 font-normal leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

