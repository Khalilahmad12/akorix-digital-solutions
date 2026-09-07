import React, { useEffect } from 'react';
import { Service } from '../../types';
import { ServiceHero } from './ServiceHero';
import { WhatWeProvide } from './WhatWeProvide';
import { WhyServiceMatters } from './WhyServiceMatters';
import { ServiceCTA } from './ServiceCTA';

interface SingleServicePageProps {
  service: Service;
  onNavigate?: (path: string, hash?: string) => void;
  onOpenContact?: (initialMsg?: string) => void;
}

export const SingleServicePage: React.FC<SingleServicePageProps> = ({ 
  service,
  onNavigate,
  onOpenContact
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [service]);

  const handleStartProject = () => {
    const defaultMsg = `Hi AKorix Team, I want to start a project with your ${service.name} service. Please reach out to discuss next steps.`;
    if (onOpenContact) {
      onOpenContact(defaultMsg);
    }
    if (onNavigate) {
      onNavigate('/contact');
    } else {
      window.history.pushState({}, '', '/contact');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const handleContactUs = () => {
    const defaultMsg = `Hi AKorix Team, I have an inquiry regarding ${service.name}.`;
    if (onOpenContact) {
      onOpenContact(defaultMsg);
    }
    if (onNavigate) {
      onNavigate('/contact');
    } else {
      window.history.pushState({}, '', '/contact');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col justify-between">
      <main>
        {/* Section 01 — Service Hero */}
        <ServiceHero 
          service={service} 
          onStartProject={handleStartProject} 
        />

        {/* Section 02 — What We Provide */}
        <WhatWeProvide 
          service={service} 
        />

        {/* Section 03 — Why This Service Matters */}
        <WhyServiceMatters 
          service={service} 
        />

        {/* Section 04 — Final CTA */}
        <ServiceCTA 
          service={service} 
          onStartProject={handleStartProject}
          onContactUs={handleContactUs}
        />
      </main>
    </div>
  );
};
