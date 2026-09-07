import React from 'react';
import { ArrowRight, MessageSquare, Sparkles } from 'lucide-react';

interface ProcessCTAProps {
  onStartProject: () => void;
  onContactUs: () => void;
}

export const ProcessCTA: React.FC<ProcessCTAProps> = ({ onStartProject, onContactUs }) => {
  return (
    <section 
      id="process-cta"
      className="py-12 sm:py-16 bg-white text-stone-900"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3.5">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-xs font-semibold text-amber-950">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span className="tracking-wider uppercase text-[11px]">COLLABORATION</span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-stone-950 leading-tight">
          Ready to Start Your Project?
        </h2>

        {/* Supporting Paragraph */}
        <p className="text-sm sm:text-base text-stone-600 font-normal leading-relaxed max-w-xl mx-auto">
          Tell us what you’re building, and let’s take the first step together.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onStartProject}
            className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-semibold text-xs sm:text-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onContactUs}
            className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200 font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-stone-600" />
            <span>Contact Us</span>
          </button>
        </div>

      </div>
    </section>
  );
};
