import React from 'react';
import { Sparkles } from 'lucide-react';

export const ContactHero: React.FC = () => {
  return (
    <section 
      id="contact-hero" 
      className="relative min-h-[45vh] sm:min-h-[50vh] flex items-center justify-center pt-24 pb-14 overflow-hidden bg-cover bg-center bg-fixed text-white"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80')`
      }}
    >
      {/* Exact Same Hero Overlay Color & Treatment */}
      <div className="absolute inset-0 bg-stone-950/70 backdrop-blur-[2px]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-2">
        {/* Eyebrow: GET IN TOUCH */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>GET IN TOUCH</span>
        </div>

        {/* Main heading: Contact Us */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
          Contact Us
        </h1>
      </div>
    </section>
  );
};
