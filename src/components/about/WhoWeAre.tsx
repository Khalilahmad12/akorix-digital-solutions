import React from 'react';
import { Compass } from 'lucide-react';

export const WhoWeAre: React.FC = () => {
  return (
    <section 
      id="who-we-are"
      className="py-10 sm:py-14 lg:py-16 bg-white text-stone-900 border-b border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Side: Content */}
          <div className="lg:col-span-6 space-y-3.5">
            {/* Small Eyebrow */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-xs font-semibold text-amber-950">
              <Compass className="w-3.5 h-3.5 text-amber-700" />
              <span className="tracking-wider uppercase text-[11px]">WHO WE ARE</span>
            </div>

            {/* Heading - Normal Professional Font Weight */}
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950 leading-tight">
              A Team Built Around Ideas, Technology & Growth.
            </h2>

            {/* Concise, Compact Paragraph */}
            <p className="text-sm sm:text-base text-stone-600 font-normal leading-relaxed">
              AKorix Digital is a multidisciplinary digital agency bringing together engineers, interface designers, marketers, and digital specialists. We collaborate closely to build modern, reliable, and scalable web platforms, mobile solutions, and intelligent digital systems focused on real business value.
            </p>
          </div>

          {/* Right Side: Professional Team/Technology Image */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-md border border-stone-200 aspect-16/10 sm:aspect-16/9 bg-stone-100">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                alt="AKorix Digital Solutions engineering and product design team collaborating"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
