import React from 'react';
import { Sparkles } from 'lucide-react';
import { Service } from '../../types';
import { ServiceIcon } from './ServiceIcon';

interface WhyServiceMattersProps {
  service: Service;
}

export const WhyServiceMatters: React.FC<WhyServiceMattersProps> = ({ service }) => {
  const benefits = service.benefits && service.benefits.length > 0
    ? service.benefits
    : [
        {
          title: 'Direct Business Growth',
          description: 'Designed specifically to increase inquiries, conversions, and customer value.',
          icon: 'TrendingUp',
        },
        {
          title: 'High-Performance Standards',
          description: 'Tested and optimized for seamless speed, reliability, and usability across devices.',
          icon: 'Zap',
        },
        {
          title: 'Scalable Architecture',
          description: 'Built to adapt effortlessly as your business and operational demands expand.',
          icon: 'ShieldCheck',
        },
      ];

  return (
    <section id="why-service-matters" className="py-12 sm:py-16 bg-stone-50 text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-[11px] font-semibold text-amber-900">
            <Sparkles className="w-3 h-3 text-amber-700" />
            <span className="tracking-wider uppercase">BUSINESS ADVANTAGE</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950">
            Why This Service Matters
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed">
            How our strategic approach to {service.name.toLowerCase()} translates into measurable value for your organization.
          </p>
        </div>

        {/* 3-4 Benefits Grid (Responsive: 1 col mobile, 2 col tablet, 4 col desktop or 2x2) */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${benefits.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-4 sm:gap-6`}>
          {benefits.map((item, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-stone-200 hover:border-amber-400 transition-all duration-300 shadow-2xs hover:shadow-sm flex flex-col justify-between group"
            >
              <div>
                <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200/80 text-amber-700 flex items-center justify-center mb-3 group-hover:bg-amber-500 group-hover:text-stone-950 group-hover:border-amber-400 transition-colors">
                  <ServiceIcon name={item.icon || 'Sparkles'} className="w-4 h-4" />
                </div>

                <h3 className="text-sm sm:text-base font-bold text-stone-950 mb-1.5 group-hover:text-amber-900 transition-colors">
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
