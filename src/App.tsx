import React, { useState, useEffect, useCallback } from 'react';
import { Navbar, Footer, FloatingWhatsApp } from './components/layout';
import {
  Hero,
  TrustSection,
  ProblemSolution,
  ServicesPreview,
  ProjectsPreview,
  WhyChooseUs,
  Process,
  Testimonials,
  ContactSection,
} from './components/home';
import { AboutPage } from './components/about';
import { ProjectsPage } from './components/projects';
import { ProcessPage } from './components/process';
import { ContactPage } from './components/contact';
import { ServicesPage, SingleServicePage } from './components/services';
import { SEOHead } from './components/seo';
import { getServiceBySlug } from './data/services';

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      if (pathname === '/about') return '/about';
      if (pathname === '/projects') return '/projects';
      if (pathname === '/process') return '/process';
      if (pathname === '/contact') return '/contact';
      if (pathname === '/services') return '/services';
      if (pathname.startsWith('/services/')) return pathname;
      return '/';
    }
    return '/';
  });
  const [activeSection, setActiveSection] = useState('hero');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactInitialMsg, setContactInitialMsg] = useState('');

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const pathname = window.location.pathname;
      let path = '/';
      if (pathname === '/about') path = '/about';
      else if (pathname === '/projects') path = '/projects';
      else if (pathname === '/process') path = '/process';
      else if (pathname === '/contact') path = '/contact';
      else if (pathname === '/services') path = '/services';
      else if (pathname.startsWith('/services/')) path = pathname;

      setCurrentPath(path);

      if (window.location.hash) {
        const id = window.location.hash.replace('#', '');
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Navigation function for switching routes and/or scrolling to sections
  const handleNavigate = useCallback((path: string, hash?: string) => {
    let normalizedPath = '/';
    if (path === '/about') normalizedPath = '/about';
    else if (path === '/projects') normalizedPath = '/projects';
    else if (path === '/process') normalizedPath = '/process';
    else if (path === '/contact') normalizedPath = '/contact';
    else if (path === '/services') normalizedPath = '/services';
    else if (path.startsWith('/services/')) normalizedPath = path;

    const targetUrl = normalizedPath + (hash ? `#${hash}` : '');

    if (window.location.pathname !== normalizedPath || (hash && window.location.hash !== `#${hash}`)) {
      window.history.pushState({}, '', targetUrl);
    }
    
    setCurrentPath(normalizedPath);

    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  // Scroll spy to update navbar active tab when on Home page
  useEffect(() => {
    if (currentPath !== '/') return;

    const sectionIds = [
      'hero',
      'challenges',
      'services',
      'portfolio',
      'why-choose-us',
      'process',
      'testimonials',
      'contact',
    ];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPath]);

  const handleOpenContactPage = (msg?: string) => {
    setContactInitialMsg(msg || '');
    handleNavigate('/contact');
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-amber-400 selection:text-stone-950">
      
      {/* Global Dynamic SEO Head & Structured Data Manager */}
      <SEOHead currentPath={currentPath} />

      {/* Navigation Header */}
      <Navbar
        activeSection={activeSection}
        currentPath={currentPath}
        onNavigate={handleNavigate}
        onOpenContact={() => handleOpenContactPage('')}
      />

      {/* Main Content Router */}
      {currentPath === '/about' ? (
        <main>
          <AboutPage
            onOpenContact={(msg?: string) => handleOpenContactPage(msg)}
            onNavigateToContact={() => handleOpenContactPage()}
          />
        </main>
      ) : currentPath === '/projects' ? (
        <main>
          <ProjectsPage
            onOpenContact={(msg?: string) => handleOpenContactPage(msg)}
            onNavigateToContact={() => handleOpenContactPage()}
          />
        </main>
      ) : currentPath === '/process' ? (
        <main>
          <ProcessPage
            onOpenContact={(msg?: string) => handleOpenContactPage(msg)}
            onNavigateToContact={() => handleOpenContactPage()}
          />
        </main>
      ) : currentPath === '/services' ? (
        <main>
          <ServicesPage onNavigate={handleNavigate} />
        </main>
      ) : currentPath.startsWith('/services/') ? (
        <main>
          {(() => {
            const slug = currentPath.replace('/services/', '').replace(/\/$/, '');
            const service = getServiceBySlug(slug);
            if (service) {
              return (
                <SingleServicePage
                  service={service}
                  onNavigate={handleNavigate}
                  onOpenContact={(msg?: string) => handleOpenContactPage(msg)}
                />
              );
            }
            return <ServicesPage onNavigate={handleNavigate} />;
          })()}
        </main>
      ) : currentPath === '/contact' ? (
        <main>
          <ContactPage initialMessage={contactInitialMsg} />
        </main>
      ) : (
        <main>
          <Hero
            onOpenProjects={() => {
              const el = document.getElementById('portfolio');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onOpenContact={() => handleOpenContactPage('')}
          />

          <TrustSection />

          <ProblemSolution />

          <ServicesPreview
            onNavigate={handleNavigate}
            onOpenContact={(initialMsg) => handleOpenContactPage(initialMsg)}
          />

          <ProjectsPreview 
            onOpenContact={() => {
              handleOpenContactPage('Hi AKorix team, I would like to see more portfolio projects or discuss a new project.');
            }}
            onNavigateToProjects={() => {
              handleNavigate('/projects');
            }}
          />

          <WhyChooseUs 
            onOpenContact={() => {
              handleOpenContactPage('Hi AKorix team, I would like to start a project with your team.');
            }}
          />

          <Process
            onOpenContact={() => {
              handleOpenContactPage('Hi AKorix team, I would like to start a new project and learn about the timeline.');
            }}
          />

          <Testimonials 
            onOpenContact={() => {
              handleOpenContactPage('Hi AKorix team, I would like to discuss a new digital project.');
            }}
          />

          <ContactSection
            initialMessage={contactInitialMsg}
          />
        </main>
      )}

      {/* Footer */}
      <Footer 
        onNavigate={handleNavigate}
        onOpenContact={() => handleOpenContactPage('')}
      />

      {/* Global Floating WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Floating Action / Booking Modal */}
      {isContactModalOpen && (
        <ContactSection
          isOpenAsModal={true}
          initialMessage={contactInitialMsg}
          onCloseModal={() => setIsContactModalOpen(false)}
        />
      )}

    </div>
  );
}

