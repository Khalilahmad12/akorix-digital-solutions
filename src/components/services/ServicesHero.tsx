import React from 'react';
import { Sparkles } from 'lucide-react';

export const ServicesHero: React.FC = () => {
  return (
    <section 
      id="services-hero" 
      className="relative min-h-[45vh] sm:min-h-[50vh] flex items-center justify-center pt-24 pb-14 overflow-hidden bg-cover bg-center bg-fixed text-white"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80')`
      }}
    >
      {/* Exact Same Hero Overlay Color & Treatment */}
      <div className="absolute inset-0 bg-stone-950/70 backdrop-blur-[2px]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-2">
        {/* Eyebrow: OUR SERVICES */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>OUR SERVICES</span>
        </div>

        {/* Main heading: All Services */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
          Services
        </h1>

        <p className="text-sm sm:text-base text-stone-300 font-normal leading-relaxed max-w-2xl mx-auto pt-1">
          From custom engineering and UI/UX design to digital marketing and AI automation — explore our complete digital capabilities.
        </p>
      </div>
    </section>
  );
};
