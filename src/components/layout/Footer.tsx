import React from 'react';
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  Clock, 
  ArrowRight,
  Linkedin, 
  Instagram, 
  Facebook
} from 'lucide-react';

interface FooterProps {
  onOpenContact?: () => void;
  onNavigate?: (path: string, hash?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact, onNavigate }) => {
  const handleLinkClick = (id: string) => {
    if (id === 'about') {
      if (onNavigate) {
        onNavigate('/about');
      } else {
        window.history.pushState({}, '', '/about');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
      return;
    }

    if (id === 'projects') {
      if (onNavigate) {
        onNavigate('/projects');
      } else {
        window.history.pushState({}, '', '/projects');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
      return;
    }

    if (id === 'process') {
      if (onNavigate) {
        onNavigate('/process');
      } else {
        window.history.pushState({}, '', '/process');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
      return;
    }

    if (id === 'services') {
      if (onNavigate) {
        onNavigate('/services');
      } else {
        window.history.pushState({}, '', '/services');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
      return;
    }

    if (id === 'contact') {
      if (onNavigate) {
        onNavigate('/contact');
      } else {
        window.history.pushState({}, '', '/contact');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
      return;
    }

    const targetId = id === 'hero' ? 'hero' : id;
    if (onNavigate) {
      onNavigate('/', targetId);
    } else {
      if (window.location.pathname !== '/') {
        window.history.pushState({}, '', `/#${targetId}`);
        window.dispatchEvent(new PopStateEvent('popstate'));
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const handleServiceClick = (slug?: string) => {
    const targetPath = slug ? `/services/${slug}` : '/services';
    if (onNavigate) {
      onNavigate(targetPath);
    } else {
      window.history.pushState({}, '', targetPath);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const companyLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Projects', id: 'projects' },
    { label: 'Process', id: 'process' },
    { label: 'Contact', id: 'contact' },
  ];

  const serviceLinks = [
    { label: 'Web Development', slug: 'web-development' },
    { label: 'UI/UX Design', slug: 'ui-ux' },
    { label: 'E-Commerce', slug: 'ecommerce' },
    { label: 'WordPress', slug: 'wordpress' },
    { label: 'Shopify', slug: 'shopify' },
    { label: 'App Development', slug: 'app-development' },
    { label: 'SEO', slug: 'seo' },
    { label: 'Digital Marketing', slug: 'digital-marketing' },
    { label: 'Graphics Design', slug: 'graphics-design' },
    { label: 'Video Editing', slug: 'video-editing' },
    { label: 'AI Automation', slug: 'ai-automation' },
  ];

  return (
    <footer id="main-footer" className="bg-white text-stone-700 border-t border-stone-200 relative overflow-hidden">
      
      {/* Top subtle golden ambient divider accent */}
      <div className="h-1 w-full bg-gradient-to-r from-amber-500/20 via-amber-500 to-amber-500/20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        
        {/* 4-Column Grid (Desktop: 4 cols, Tablet: 2 cols, Mobile: 1 col) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-12 border-b border-stone-200">
          
          {/* Column 1 — Brand */}
          <div className="space-y-4">
            {/* Logo */}
            <a 
              href="#hero" 
              onClick={(e) => { e.preventDefault(); handleLinkClick('hero'); }}
              className="inline-flex items-center group focus:outline-none"
              aria-label="AKorix Digital"
            >
              <img 
                src="/logo.png" 
                alt="AKorix Digital Solutions Logo"
                width="180"
                height="44"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="h-10 sm:h-11 w-auto max-w-[180px] sm:max-w-[210px] object-contain shrink-0 transition-transform duration-200 group-hover:scale-[1.02]"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.endsWith('/logo.svg')) {
                    target.src = '/logo.svg';
                  }
                }}
              />
            </a>

            {/* Short Professional Description */}
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
              We build modern digital experiences that help businesses grow, connect, and compete online.
            </p>

            {/* Social Media Icons with subtle hover animation */}
            <div className="pt-1">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-2.5">
                Follow Us
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="https://www.facebook.com/share/1D2aL18vHY/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-700 hover:text-amber-700 hover:border-amber-400 hover:bg-amber-50 hover:-translate-y-0.5 transition-all shadow-xs"
                >
                  <Facebook className="w-4 h-4" />
                </a>

                <a
                  href="https://www.instagram.com/akorixdigitalsolutions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-700 hover:text-amber-700 hover:border-amber-400 hover:bg-amber-50 hover:-translate-y-0.5 transition-all shadow-xs"
                >
                  <Instagram className="w-4 h-4" />
                </a>

                <a
                  href="https://www.linkedin.com/company/akorix-digital-solutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-8 h-8 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-700 hover:text-amber-700 hover:border-amber-400 hover:bg-amber-50 hover:-translate-y-0.5 transition-all shadow-xs"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                <a
                  href="https://wa.me/03461764101"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-8 h-8 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-700 hover:text-emerald-600 hover:border-emerald-400 hover:bg-emerald-50 hover:-translate-y-0.5 transition-all shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2 — Company */}
          <div className="space-y-3 sm:pl-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Company
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-600 font-medium">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.id === 'about' ? '/about' : link.id === 'projects' ? '/projects' : link.id === 'process' ? '/process' : link.id === 'contact' ? '/contact' : `#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.id);
                    }}
                    className="hover:text-amber-700 transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="text-stone-400 group-hover:text-amber-600 transition-colors">›</span>
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-600 font-medium">
              {serviceLinks.map((service) => (
                <li key={service.slug}>
                  <a
                    href={`/services/${service.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleServiceClick(service.slug);
                    }}
                    className="hover:text-amber-700 transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="text-stone-400 group-hover:text-amber-600 transition-colors">›</span>
                    <span>{service.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div className="space-y-3.5">
            <div className="bg-stone-50 rounded-2xl p-4.5 border border-stone-200/90 shadow-xs space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center justify-between">
                <span>Contact Us</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </h4>

              <div className="space-y-2.5 text-xs sm:text-sm text-stone-700 font-normal">
                
                {/* Email */}
                <a 
                  href="mailto:khalilahmad.developer.@gmail.com" 
                  className="flex items-start gap-2.5 group hover:text-amber-700 transition-colors"
                >
                  <Mail className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span className="break-all font-medium">khalilahmad.developer.@gmail.com</span>
                </a>

                {/* Phone */}
                <a 
                  href="tel:03461764101" 
                  className="flex items-start gap-2.5 group hover:text-amber-700 transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span className="font-medium">03461764101</span>
                </a>

                {/* WhatsApp */}
                <a 
                  href="https://wa.me/03461764101" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 group hover:text-emerald-700 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-medium">WhatsApp: 03461764101</span>
                </a>

                {/* Working Hours */}
                <div className="flex items-start gap-2.5 text-stone-600 pt-1 border-t border-stone-200">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-[11.5px] leading-relaxed">
                    <div>Mon - Fri: 9:00 AM - 6:00 PM EST</div>
                    <div className="text-emerald-700 font-semibold text-[10.5px] flex items-center gap-1 mt-0.5">
                      <span>Available for new projects</span>
                    </div>
                  </div>
                </div>

                {/* Consultation Quick Link */}
                {onOpenContact && (
                  <div className="pt-2">
                    <button
                      onClick={onOpenContact}
                      className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold uppercase tracking-wider shadow-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Request Consultation</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

              </div>
            </div>
          </div>

        </div>

        {/* Bottom Footer Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-normal">
          <div>
            © 2026 AKorix Digital. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a 
              href="#hero" 
              onClick={(e) => { e.preventDefault(); handleLinkClick('hero'); }}
              className="hover:text-amber-700 transition-colors"
            >
              Privacy Policy
            </a>
            <span className="text-stone-300">•</span>
            <a 
              href="#hero" 
              onClick={(e) => { e.preventDefault(); handleLinkClick('hero'); }}
              className="hover:text-amber-700 transition-colors"
            >
              Terms & Conditions
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
