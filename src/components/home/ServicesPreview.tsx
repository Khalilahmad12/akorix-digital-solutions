import React from 'react';
import { 
  Code2, 
  Globe, 
  Smartphone, 
  Palette, 
  PenTool, 
  Video, 
  Megaphone, 
  Search, 
  ShoppingCart, 
  Bot, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Layers
} from 'lucide-react';
import { SERVICES_DATA } from '../../data';
import { Service } from '../../types';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface ServicesPreviewProps {
  onNavigate?: (path: string, hash?: string) => void;
  onOpenContact?: (initialMsg?: string) => void;
}

export const ServicesPreview: React.FC<ServicesPreviewProps> = ({ 
  onNavigate,
  onOpenContact
}) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.08 });

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-6 h-6 text-amber-600" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-amber-600" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-amber-600" />;
      case 'Palette':
        return <Palette className="w-6 h-6 text-amber-600" />;
      case 'PenTool':
        return <PenTool className="w-6 h-6 text-amber-600" />;
      case 'Video':
        return <Video className="w-6 h-6 text-amber-600" />;
      case 'Megaphone':
        return <Megaphone className="w-6 h-6 text-amber-600" />;
      case 'Search':
        return <Search className="w-6 h-6 text-amber-600" />;
      case 'ShoppingCart':
        return <ShoppingCart className="w-6 h-6 text-amber-600" />;
      case 'Bot':
        return <Bot className="w-6 h-6 text-amber-600" />;
      default:
        return <Sparkles className="w-6 h-6 text-amber-600" />;
    }
  };

  const getCardDirectionClass = (index: number) => {
    switch (index % 3) {
      case 0:
        return 'reveal-card-up';
      case 1:
        return 'reveal-card-left';
      case 2:
        return 'reveal-card-right';
      default:
        return 'reveal-card-up';
    }
  };

  const handleViewDetails = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    const targetPath = `/services/${slug}`;
    if (onNavigate) {
      onNavigate(targetPath);
    } else {
      window.history.pushState({}, '', targetPath);
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const handleContactClick = (service: Service) => {
    const defaultMsg = `Hi AKorix Team, I am interested in your ${service.title} services. Please reach out with more details.`;
    if (onOpenContact) {
      onOpenContact(defaultMsg);
    } else {
      window.history.pushState({}, '', '/contact');
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  return (
    <section 
      id="services" 
      ref={ref}
      className="py-10 sm:py-14 bg-stone-50 text-stone-900 border-t border-stone-200 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading & Subtitle */}
        <div className={`text-center max-w-3xl mx-auto space-y-2 mb-6 sm:mb-8 reveal-fade-up ${isVisible ? 'revealed' : ''}`}>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-[11px] font-semibold text-amber-900">
            <Layers className="w-3 h-3 text-amber-700" />
            <span>END-TO-END DIGITAL SOLUTIONS</span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-stone-950 leading-snug">
            Everything You Need to Grow Your Digital Presence
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 font-normal leading-snug max-w-2xl mx-auto">
            From strategy and design to development, marketing, and optimization — we provide complete digital solutions built around your business goals.
          </p>
        </div>

        {/* 10 Services Cards Grid - Desktop Staggered Sequence */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {SERVICES_DATA.map((service, idx) => (
            <div
              key={service.id}
              className={`group relative rounded-xl bg-white border border-stone-200 p-4 sm:p-5 hover:border-amber-400 hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col justify-between shadow-xs hover:shadow-md [perspective:1000px] ${getCardDirectionClass(idx)} ${isVisible ? 'revealed' : ''}`}
              style={{ transitionDelay: `${60 + (idx % 6) * 60}ms` }}
            >
              {/* High Demand / Popular Badge */}
              {service.popular && (
                <div className="absolute top-3.5 right-3.5 px-2 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-[9px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-amber-600" /> Popular
                </div>
              )}

              <div>
                {/* Modern Icon Container with 3D Flip Rotation on Hover */}
                <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200/80 flex items-center justify-center mb-3 shadow-2xs group-hover:[transform:rotateY(180deg)] transition-transform duration-500 ease-out shrink-0 [transform-style:preserve-3d]">
                  {getServiceIcon(service.icon)}
                </div>

                {/* Service Title */}
                <h3 className="text-base sm:text-lg font-bold text-stone-950 mb-1 group-hover:text-amber-800 transition-colors leading-snug">
                  {service.title}
                </h3>

                {/* Short Description (1-2 lines) */}
                <p className="text-xs text-stone-600 leading-snug mb-3 font-normal">
                  {service.shortDesc}
                </p>

                {/* Exactly 3 Key Features with Checkmarks */}
                <ul className="space-y-1.5 mb-4 pt-2 border-t border-stone-100">
                  {service.features.slice(0, 3).map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-xs font-medium text-stone-700 leading-snug">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer Actions - Flex Row Layout */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                {/* View Details Link */}
                <a
                  href={`/services/${service.slug}`}
                  onClick={(e) => handleViewDetails(e, service.slug)}
                  className="text-xs font-semibold text-stone-500 hover:text-amber-800 transition-colors flex items-center gap-1 group/details cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3 group-hover/details:translate-x-0.5 transition-transform" />
                </a>

                {/* Prominent Contact Us CTA Button */}
                <button
                  onClick={() => handleContactClick(service)}
                  className="py-1.5 px-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-xs transition-all flex items-center gap-1 group/btn cursor-pointer shrink-0"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

    </section>
  );
};
