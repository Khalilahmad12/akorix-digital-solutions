import React, { useEffect } from 'react';
import { ContactHero } from './ContactHero';
import { ContactSection } from '../home/ContactSection';

interface ContactPageProps {
  initialMessage?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({ initialMessage = '' }) => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <article className="min-h-screen bg-stone-50 text-stone-900 selection:bg-amber-400 selection:text-stone-950">
      {/* 01 — Contact Hero */}
      <ContactHero />

      {/* 02 — Contact CTA (Reuses the existing Home page CTA design & content) */}
      <ContactSection initialMessage={initialMessage} />
    </article>
  );
};
