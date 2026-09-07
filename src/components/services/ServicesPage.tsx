import React, { useEffect } from 'react';
import { ServicesHero } from './ServicesHero';
import { ServicesGrid } from './ServicesGrid';

interface ServicesPageProps {
  onNavigate?: (path: string, hash?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col justify-between">
      <main>
        {/* Main Services Hero */}
        <ServicesHero />

        {/* 11 Services Responsive Grid */}
        <ServicesGrid onNavigate={onNavigate} />
      </main>
    </div>
  );
};
