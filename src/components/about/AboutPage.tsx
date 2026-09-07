import React, { useEffect } from 'react';
import { AboutHero } from './AboutHero';
import { WhoWeAre } from './WhoWeAre';
import { TeamSection } from './TeamSection';
import { ValuesSection } from './ValuesSection';
import { AboutCTA } from './AboutCTA';

interface AboutPageProps {
  onOpenContact: (initialMessage?: string) => void;
  onNavigateToContact?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenContact, onNavigateToContact }) => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleStartProject = () => {
    if (onNavigateToContact) {
      onNavigateToContact();
    } else {
      onOpenContact('Hi AKorix team, I would like to start a project with your team.');
    }
  };

  const handleContactUs = () => {
    if (onNavigateToContact) {
      onNavigateToContact();
    } else {
      onOpenContact('Hi AKorix team, I have an inquiry and would like to get in touch.');
    }
  };

  return (
    <article className="min-h-screen bg-white text-stone-900 selection:bg-amber-400 selection:text-stone-950">
      
      {/* 01 — About Hero */}
      <AboutHero />

      {/* 02 — Who We Are */}
      <WhoWeAre />

      {/* 03 — Meet Our Team */}
      <TeamSection 
        onOpenContact={onOpenContact}
      />

      {/* 04 — What We Believe */}
      <ValuesSection />

      {/* 05 — Let's Build Something Great CTA */}
      <AboutCTA
        onStartProject={handleStartProject}
        onContactUs={handleContactUs}
      />

    </article>
  );
};
