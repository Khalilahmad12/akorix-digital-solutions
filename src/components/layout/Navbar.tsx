import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight, 
  ArrowRight,
  Code2,
  Palette,
  ShoppingCart,
  Globe,
  ShoppingBag,
  Smartphone,
  Search,
  Megaphone,
  PenTool,
  Video,
  Bot
} from 'lucide-react';

interface NavbarProps {
  onOpenContact: () => void;
  activeSection?: string;
  currentPath?: string;
  onNavigate?: (path: string, hash?: string) => void;
}

interface ServiceDropdownItem {
  name: string;
  slug: string;
  desc: string;
  icon: React.ElementType;
  tag?: string;
}

const SERVICES_LIST: ServiceDropdownItem[] = [
  {
    name: 'Web Development',
    slug: 'web-development',
    desc: 'High-velocity custom React & full-stack web applications',
    icon: Code2,
  },
  {
    name: 'UI/UX Design',
    slug: 'ui-ux',
    desc: 'Conversion-focused interface design & design systems',
    icon: Palette,
  },
  {
    name: 'E-Commerce Development',
    slug: 'ecommerce',
    desc: 'Scalable stores, multi-currency checkout & payment gateways',
    icon: ShoppingCart,
  },
  {
    name: 'WordPress',
    slug: 'wordpress',
    desc: 'Custom headless & theme WordPress development',
    icon: Globe,
  },
  {
    name: 'Shopify',
    slug: 'shopify',
    desc: 'High-converting custom Shopify storefronts & apps',
    icon: ShoppingBag,
  },
  {
    name: 'App Development',
    slug: 'app-development',
    desc: 'Native iOS/Android & cross-platform React Native apps',
    icon: Smartphone,
  },
  {
    name: 'SEO',
    slug: 'seo',
    desc: 'Technical SEO audits, search authority & core web vitals',
    icon: Search,
  },
  {
    name: 'Digital Marketing',
    slug: 'digital-marketing',
    desc: 'Paid performance campaigns, social growth & analytics',
    icon: Megaphone,
  },
  {
    name: 'Graphics Design',
    slug: 'graphics-design',
    desc: 'Brand identity systems, vector assets & marketing collateral',
    icon: PenTool,
  },
  {
    name: 'Video Editing',
    slug: 'video-editing',
    desc: 'Commercial motion graphics, product trailers & video ads',
    icon: Video,
  },
  {
    name: 'AI Automation / AI Agents',
    slug: 'ai-automation',
    desc: 'Smart workflow pipelines, chatbots & AI agent integrations',
    icon: Bot,
    tag: 'NEW',
  },
];

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenContact, 
  activeSection = 'hero',
  currentPath = '/',
  onNavigate 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);

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

    const sectionId = id === 'hero' ? 'hero' : id;
    if (onNavigate) {
      onNavigate('/', sectionId);
    } else {
      if (window.location.pathname !== '/') {
        window.history.pushState({}, '', `/#${sectionId}`);
        window.dispatchEvent(new PopStateEvent('popstate'));
      } else {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleServiceItemClick = (slug?: string) => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    const targetPath = slug ? `/services/${slug}` : '/services';
    if (onNavigate) {
      onNavigate(targetPath);
    } else {
      window.history.pushState({}, '', targetPath);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const handleMouseEnterDropdown = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setServicesDropdownOpen(true);
  };

  const handleMouseLeaveDropdown = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 150);
  };

  const handleCTAClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate('/contact');
    } else {
      window.history.pushState({}, '', '/contact');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'shadow-md border-b border-stone-200/90' 
          : 'shadow-xs border-b border-stone-200/80'
      }`}
    >
      {/* Main Navbar Container: 100% Full Viewport Width, White Background, Flexbox */}
      <div className="w-full bg-white relative h-16">
        
        {/* Background Split Layer: isolated overflow-hidden to preserve angled polygon without clipping dropdowns */}
        <div className="absolute inset-0 flex overflow-hidden pointer-events-none">
          {/* Left Div: Width 50%, Pure White */}
          <div className="w-1/2 h-full bg-white" />

          {/* Right Div: Width 50%, Yellow with Corner Design */}
          <div 
            className="w-1/2 h-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500"
            style={{
              clipPath: 'polygon(8% 0, 100% 0, 100% 100%, 0% 100%)'
            }}
          />
        </div>

        {/* Desktop & Mobile Navbar Content Container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between z-20">
          
          {/* Logo */}
          <a 
            href="#hero" 
            onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }}
            className="flex items-center group shrink-0 focus:outline-none py-1"
            aria-label="AKorix Digital - Home"
          >
            <img 
              src="/logo.png" 
              alt="AKorix Digital Solutions Logo"
              width="180"
              height="44"
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
              className="h-9 sm:h-10 md:h-11 w-auto max-w-[140px] sm:max-w-[170px] md:max-w-[200px] object-contain shrink-0 transition-transform duration-200 group-hover:scale-[1.02]"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.endsWith('/logo.svg')) {
                  target.src = '/logo.svg';
                }
              }}
            />
          </a>

          {/* Desktop Navigation: Logo | Home | About | Services ▾ | Projects | Process | Contact | CTA */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            
            {/* Home */}
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                currentPath === '/' && activeSection === 'hero'
                  ? 'text-amber-800 font-bold bg-amber-50'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-stone-50'
              }`}
            >
              Home
            </a>

            {/* About */}
            <a
              href="/about"
              onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                currentPath === '/about' || (currentPath === '/' && (activeSection === 'why-choose-us' || activeSection === 'challenges'))
                  ? 'text-amber-800 font-bold bg-amber-50'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-stone-50'
              }`}
            >
              About
            </a>

            {/* Services with Dropdown */}
            <div 
              className="relative"
              onMouseEnter={handleMouseEnterDropdown}
              onMouseLeave={handleMouseLeaveDropdown}
            >
              <button
                type="button"
                onClick={() => {
                  setServicesDropdownOpen(!servicesDropdownOpen);
                  handleNavClick('services');
                }}
                aria-expanded={servicesDropdownOpen}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  currentPath === '/services' || currentPath.startsWith('/services/') || (currentPath === '/' && (activeSection === 'services' || servicesDropdownOpen))
                    ? 'text-amber-800 font-bold bg-amber-50'
                    : 'text-stone-700 hover:text-stone-950 hover:bg-stone-50'
                }`}
              >
                <span>Services</span>
                <ChevronDown 
                  className={`w-3.5 h-3.5 text-stone-500 transition-transform duration-200 ${
                    servicesDropdownOpen ? 'rotate-180 text-amber-700' : ''
                  }`} 
                />
              </button>

              {/* Desktop Services Dropdown Menu */}
              {servicesDropdownOpen && (
                <div 
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-[560px] bg-white rounded-2xl border border-stone-200/90 shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150"
                  role="menu"
                >
                  <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-stone-100 px-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                      Our Specialized Services ({SERVICES_LIST.length})
                    </span>
                    <a
                      href="/services"
                      onClick={(e) => { e.preventDefault(); handleServiceItemClick(); }}
                      className="text-[11px] font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
                    >
                      <span>Explore all</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5">
                    {SERVICES_LIST.map((service) => {
                      const IconComponent = service.icon;
                      return (
                        <a
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleServiceItemClick(service.slug);
                          }}
                          className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-amber-50/80 transition-colors group cursor-pointer text-left"
                          role="menuitem"
                        >
                          <div className="w-7 h-7 rounded-lg bg-stone-100 border border-stone-200/80 flex items-center justify-center text-stone-700 group-hover:bg-amber-500 group-hover:text-stone-950 group-hover:border-amber-400 transition-all shrink-0 mt-0.5">
                            <IconComponent className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-stone-900 group-hover:text-amber-900 truncate">
                                {service.name}
                              </span>
                              {service.tag && (
                                <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-amber-200 text-amber-950 border border-amber-300">
                                  {service.tag}
                                </span>
                              )}
                            </div>
                            <p className="text-[10.5px] text-stone-500 line-clamp-1 group-hover:text-stone-600">
                              {service.desc}
                            </p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Projects */}
            <a
              href="/projects"
              onClick={(e) => { e.preventDefault(); handleNavClick('projects'); }}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                currentPath === '/projects' || (currentPath === '/' && activeSection === 'portfolio')
                  ? 'text-amber-800 font-bold bg-amber-50'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-stone-50'
              }`}
            >
              Projects
            </a>

            {/* Process */}
            <a
              href="/process"
              onClick={(e) => { e.preventDefault(); handleNavClick('process'); }}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                currentPath === '/process' || (currentPath === '/' && activeSection === 'process')
                  ? 'text-amber-800 font-bold bg-amber-50'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-stone-50'
              }`}
            >
              Process
            </a>

            {/* Contact */}
            <a
              href="https://wa.me/03461764101"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                currentPath === '/contact' || (currentPath === '/' && activeSection === 'contact')
                  ? 'text-amber-800 font-bold bg-amber-50'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-stone-50'
              }`}
            >
              Contact
            </a>

          </nav>


          {/* Right CTA Button */}
          <div className="hidden lg:flex items-center">
            <a
              href="/contact"
              onClick={handleCTAClick}
              className="px-4 py-2 rounded-xl bg-stone-950 hover:bg-stone-900 text-amber-300 hover:text-amber-200 text-xs font-bold uppercase tracking-wider shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 group cursor-pointer border border-stone-800"
            >
              <span>Get a Free Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-amber-400" />
            </a>
          </div>

          {/* Mobile Menu Hamburger Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-stone-900 text-amber-400 hover:bg-stone-800 transition-colors focus:outline-none shadow-xs border border-stone-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-6 space-y-3 shadow-2xl max-h-[calc(100vh-4rem)] overflow-y-auto animate-in slide-in-from-top-2 duration-200 relative z-20">
          <div className="grid grid-cols-1 gap-1">
            
            {/* Home */}
            <button
              onClick={() => handleNavClick('hero')}
              className={`flex items-center justify-between w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                currentPath === '/' && activeSection === 'hero' ? 'bg-amber-50 text-amber-900 font-bold' : 'text-stone-800 hover:bg-stone-50'
              }`}
            >
              <span>Home</span>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </button>

            {/* About */}
            <button
              onClick={() => handleNavClick('about')}
              className={`flex items-center justify-between w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                currentPath === '/about' || (currentPath === '/' && (activeSection === 'why-choose-us' || activeSection === 'challenges')) ? 'bg-amber-50 text-amber-900 font-bold' : 'text-stone-800 hover:bg-stone-50'
              }`}
            >
              <span>About</span>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </button>

            {/* Services Accordion */}
            <div className="rounded-xl border border-stone-200/80 overflow-hidden my-1 bg-stone-50/50">
              <button
                onClick={() => setMobileServicesExpanded(!mobileServicesExpanded)}
                className="flex items-center justify-between w-full text-left px-3.5 py-2.5 text-sm font-semibold text-stone-900 hover:bg-stone-100 transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  <span>Services</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-200 text-amber-950">
                    {SERVICES_LIST.length}
                  </span>
                </span>
                <ChevronDown 
                  className={`w-4 h-4 text-stone-500 transition-transform duration-200 ${
                    mobileServicesExpanded ? 'rotate-180 text-amber-700' : ''
                  }`} 
                />
              </button>

              {mobileServicesExpanded && (
                <div className="px-2 pb-2 space-y-1 bg-white border-t border-stone-200/60 pt-1.5">
                  <button
                    onClick={() => handleServiceItemClick()}
                    className="flex items-center justify-between w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 transition-colors"
                  >
                    <span>View All Services</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {SERVICES_LIST.map((service) => {
                    const IconComponent = service.icon;
                    return (
                      <button
                        key={service.slug}
                        onClick={() => handleServiceItemClick(service.slug)}
                        className="flex items-center gap-2.5 w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-stone-700 hover:bg-amber-50 hover:text-amber-900 transition-colors"
                      >
                        <IconComponent className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="truncate">{service.name}</span>
                        {service.tag && (
                          <span className="ml-auto text-[9px] font-bold px-1 rounded bg-amber-200 text-amber-900">
                            {service.tag}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Projects */}
            <button
              onClick={() => handleNavClick('projects')}
              className={`flex items-center justify-between w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                currentPath === '/projects' || (currentPath === '/' && activeSection === 'portfolio') ? 'bg-amber-50 text-amber-900 font-bold' : 'text-stone-800 hover:bg-stone-50'
              }`}
            >
              <span>Projects</span>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </button>

            {/* Process */}
            <button
              onClick={() => handleNavClick('process')}
              className={`flex items-center justify-between w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                currentPath === '/process' || (currentPath === '/' && activeSection === 'process') ? 'bg-amber-50 text-amber-900 font-bold' : 'text-stone-800 hover:bg-stone-50'
              }`}
            >
              <span>Process</span>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </button>

            {/* Contact */}
            <a
              href="https://wa.me/03461764101"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors text-stone-800 hover:bg-stone-50"
            >
              <span>Contact</span>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </a>

          </div>

          {/* Mobile CTA */}
          <div className="pt-3 border-t border-stone-200">
            <button
              onClick={handleCTAClick}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-md transition-all cursor-pointer"
            >
              <span>Get a Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
