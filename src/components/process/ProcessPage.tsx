import React, { useEffect } from 'react';
import { ProcessHero } from './ProcessHero';
import { HowWeWork } from './HowWeWork';
import { WhatYouCanExpect } from './WhatYouCanExpect';
import { OurCommitment } from './OurCommitment';
import { ProcessCTA } from './ProcessCTA';

interface ProcessPageProps {
  onOpenContact: (initialMessage?: string) => void;
  onNavigateToContact?: () => void;
}

export const ProcessPage: React.FC<ProcessPageProps> = ({
  onOpenContact,
  onNavigateToContact,
}) => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleStartProject = () => {
    if (onNavigateToContact) {
      onNavigateToContact();
    } else {
      onOpenContact('Hi AKorix team, I would like to start a project and discuss the process.');
    }
  };

  const handleContactUs = () => {
    if (onNavigateToContact) {
      onNavigateToContact();
    } else {
      onOpenContact('Hi AKorix team, I have a question about your development process.');
    }
  };

  return (
    <article className="min-h-screen bg-white text-stone-900 selection:bg-amber-400 selection:text-stone-950">
      {/* 01 — Process Hero */}
      <ProcessHero />

      {/* 02 — How We Work (6 Steps) */}
      <HowWeWork />

      {/* 03 — What You Can Expect */}
      <WhatYouCanExpect />

      {/* 04 — Our Commitment */}
      <OurCommitment />

      {/* 05 — Ready to Start? (Final CTA) */}
      <ProcessCTA
        onStartProject={handleStartProject}
        onContactUs={handleContactUs}
      />
    </article>
  );
};
