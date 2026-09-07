import React from 'react';
import { ArrowRight, FolderKanban, MessageSquare } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface HeroProps {
  onOpenProjects: () => void;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onOpenProjects, 
  onOpenContact 
}) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.05 });

  return (
    <section 
      id="hero" 
      className="relative min-h-[85vh] sm:min-h-[80vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-cover bg-center bg-fixed text-white"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80')`
      }}
    >
      {/* Color Overlay */}
      <div className="absolute inset-0 bg-stone-950/70 backdrop-blur-[2px]" />

      <div 
        ref={ref}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-5"
      >
        
        {/* Tagline */}
        <div 
          className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-xs font-semibold text-amber-300 reveal-fade-down ${isVisible ? 'revealed' : ''}`}
          style={{ transitionDelay: '50ms' }}
        >
          <span>AKORIX DIGITAL SOLUTIONS</span>
        </div>

        {/* Headline */}
        <h1 
          className={`text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight reveal-fade-up ${isVisible ? 'revealed' : ''}`}
          style={{ transitionDelay: '120ms' }}
        >
          High-Impact Digital Solutions & Scalable Web Platforms
        </h1>

        {/* Subtitle */}
        <p 
          className={`text-sm sm:text-base text-stone-200 max-w-2xl mx-auto font-normal leading-relaxed reveal-fade-up ${isVisible ? 'revealed' : ''}`}
          style={{ transitionDelay: '200ms' }}
        >
          We bridge enterprise software engineering with a vetted network of senior specialists. Delivering custom web applications, mobile platforms, and modern systems with speed and precision.
        </p>

        {/* Action Buttons */}
        <div 
          className={`flex flex-wrap items-center justify-center gap-3 pt-2 reveal-fade-up ${isVisible ? 'revealed' : ''}`}
          style={{ transitionDelay: '280ms' }}
        >
          <button
            onClick={onOpenProjects}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <FolderKanban className="w-4 h-4" />
            <span>Explore Our Projects</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenContact}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 backdrop-blur-md cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-amber-300" />
            <span>Start Your Project</span>
          </button>
        </div>

      </div>
    </section>
  );
};

