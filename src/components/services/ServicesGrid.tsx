import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { SERVICES_DATA } from '../../data/services';
import { ServiceIcon } from './ServiceIcon';

interface ServicesGridProps {
  onNavigate?: (path: string, hash?: string) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onNavigate }) => {
  const handleServiceClick = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    const targetPath = `/services/${slug}`;
    if (onNavigate) {
      onNavigate(targetPath);
    } else {
      window.history.pushState({}, '', targetPath);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <section id="all-services-grid" className="py-12 sm:py-16 bg-stone-50 text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Responsive Grid: 1 col on mobile, 2 col on tablet, 3 col on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {SERVICES_DATA.map((service) => {
            const targetUrl = `/services/${service.slug}`;
            return (
              <div
                key={service.id}
                className="group relative rounded-2xl bg-white border border-stone-200 p-5 sm:p-6 hover:border-amber-400 hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col justify-between shadow-2xs hover:shadow-md"
              >
                <div>
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-700 flex items-center justify-center mb-4 shadow-2xs group-hover:bg-amber-500 group-hover:text-stone-950 group-hover:border-amber-400 transition-colors">
                    <ServiceIcon name={service.icon} className="w-6 h-6" />
                  </div>

                  {/* Service Name */}
                  <h2 className="text-lg sm:text-xl font-bold text-stone-950 mb-2 group-hover:text-amber-800 transition-colors leading-snug">
                    {service.name}
                  </h2>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4 font-normal">
                    {service.shortDescription || service.shortDesc}
                  </p>

                  {/* Key Benefit or Capability */}
                  <div className="pt-3 border-t border-stone-100 mb-5">
                    <div className="flex items-start gap-2 text-xs font-medium text-stone-800 leading-relaxed bg-amber-50/60 p-2.5 rounded-xl border border-amber-100/80">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{service.keyBenefit}</span>
                    </div>
                  </div>
                </div>

                {/* View Service -> Link Button */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-end">
                  <a
                    href={targetUrl}
                    onClick={(e) => handleServiceClick(e, service.slug)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 hover:bg-amber-500 text-stone-800 hover:text-stone-950 font-semibold text-xs transition-all cursor-pointer group/link"
                  >
                    <span>View Service</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
