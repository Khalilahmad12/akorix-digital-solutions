import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Service } from '../../types';

interface ServiceHeroProps {
  service: Service;
  onStartProject?: () => void;
}

export const ServiceHero: React.FC<ServiceHeroProps> = ({ service, onStartProject }) => {
  const handleStartProject = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onStartProject) {
      onStartProject();
    } else {
      window.history.pushState({}, '', '/contact');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <section 
      id="service-hero" 
      className="relative min-h-[45vh] sm:min-h-[50vh] flex items-center justify-center pt-24 pb-14 overflow-hidden bg-cover bg-center bg-fixed text-white"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80')`
      }}
    >
      {/* Exact Same Hero Overlay Color & Treatment */}
      <div className="absolute inset-0 bg-stone-950/70 backdrop-blur-[2px]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-3.5">
        {/* Eyebrow: OUR SERVICE */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>OUR SERVICE</span>
        </div>

        {/* Dynamic Service Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
          {service.name || service.title}
        </h1>

        {/* Short, professional description */}
        <p className="text-sm sm:text-base text-stone-300 font-normal leading-relaxed max-w-2xl mx-auto">
          {service.heroDescription || service.shortDesc}
        </p>

        {/* One primary button: Start a Project -> */}
        <div className="pt-2">
          <a
            href="/contact"
            onClick={handleStartProject}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
