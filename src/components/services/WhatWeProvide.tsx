import React from 'react';
import { Layers } from 'lucide-react';
import { Service } from '../../types';
import { ServiceIcon } from './ServiceIcon';

interface WhatWeProvideProps {
  service: Service;
}

export const WhatWeProvide: React.FC<WhatWeProvideProps> = ({ service }) => {
  const capabilities = service.capabilities && service.capabilities.length > 0
    ? service.capabilities
    : service.features.map((feat) => ({
        title: feat,
        description: 'Comprehensive deliverable built to high professional standards.',
        icon: 'CheckCircle2',
      }));

  return (
    <section id="what-we-provide" className="py-12 sm:py-16 bg-white text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-[11px] font-semibold text-amber-900">
            <Layers className="w-3 h-3 text-amber-700" />
            <span className="tracking-wider uppercase">CORE CAPABILITIES</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950">
            What We Provide
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed">
            Delivering dedicated engineering, rigorous craftsmanship, and transparent execution for your digital goals.
          </p>
        </div>

        {/* 3-6 Capabilities Grid (Responsive: 1 col mobile, 2 col tablet, 3 col desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {capabilities.map((item, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-stone-50 border border-stone-200 hover:border-amber-400 hover:bg-white transition-all duration-300 shadow-2xs hover:shadow-sm group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-100/70 border border-amber-200 text-amber-800 flex items-center justify-center mb-3.5 group-hover:bg-amber-500 group-hover:text-stone-950 group-hover:border-amber-400 transition-colors">
                  <ServiceIcon name={item.icon || 'CheckCircle2'} className="w-5 h-5" />
                </div>

                <h3 className="text-base sm:text-lg font-bold text-stone-950 mb-1.5 group-hover:text-amber-900 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
