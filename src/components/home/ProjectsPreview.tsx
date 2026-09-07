import React, { useState } from 'react';
import { ArrowRight, FolderKanban, ChevronLeft, ChevronRight } from 'lucide-react';
import { SHOWCASE_PROJECTS } from '../../data';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface ProjectsPreviewProps {
  onOpenContact?: () => void;
  onNavigateToProjects?: () => void;
}

export const ProjectsPreview: React.FC<ProjectsPreviewProps> = ({ onOpenContact, onNavigateToProjects }) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.08 });
  const [activeMobileIndex, setActiveMobileIndex] = useState<number>(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const getCardDirectionClass = (index: number) => {
    switch (index % 4) {
      case 0:
        return 'reveal-card-up';
      case 1:
        return 'reveal-card-left';
      case 2:
        return 'reveal-card-right';
      case 3:
        return 'reveal-card-up';
      default:
        return 'reveal-card-up';
    }
  };

  const handleViewMore = () => {
    if (onNavigateToProjects) {
      onNavigateToProjects();
    } else if (onOpenContact) {
      onOpenContact();
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrevMobile = () => {
    if (activeMobileIndex > 0) {
      setActiveMobileIndex((prev) => prev - 1);
    }
  };

  const handleNextMobile = () => {
    if (activeMobileIndex < SHOWCASE_PROJECTS.length - 1) {
      setActiveMobileIndex((prev) => prev + 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndX(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const distance = touchStartX - touchEndX;
    if (distance > 45 && activeMobileIndex < SHOWCASE_PROJECTS.length - 1) {
      setActiveMobileIndex((prev) => prev + 1);
    } else if (distance < -45 && activeMobileIndex > 0) {
      setActiveMobileIndex((prev) => prev - 1);
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const handleContactClick = () => {
    window.history.pushState({}, '', '/contact');
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <section 
      id="portfolio" 
      ref={ref}
      className="py-10 sm:py-14 bg-white text-stone-900 border-t border-stone-200 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading & Subtitle */}
        <div className={`text-center max-w-3xl mx-auto space-y-2 mb-6 sm:mb-8 reveal-fade-up ${isVisible ? 'revealed' : ''}`}>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-[11px] font-semibold text-amber-900">
            <FolderKanban className="w-3 h-3 text-amber-700" />
            <span>FEATURED WORK & CASE STUDIES</span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-stone-950 leading-snug">
            Our Latest Projects & Digital Masterpieces
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 font-normal leading-snug max-w-2xl mx-auto">
            Discover our portfolio of high-impact digital solutions, custom software platforms, and creative campaigns crafted for ambitious brands worldwide.
          </p>
        </div>

        {/* MOBILE ONLY: Real horizontal card slider with centered left/right arrows */}
        <div className={`block sm:hidden reveal-fade-up ${isVisible ? 'revealed' : ''}`} style={{ transitionDelay: '100ms' }}>
          <div className="relative px-5">
            {/* Previous Arrow Button (Left) - Slightly smaller and minimal */}
            <button
              type="button"
              onClick={handlePrevMobile}
              disabled={activeMobileIndex === 0}
              aria-label="Previous Project"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white border border-stone-300 text-stone-800 shadow-sm flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all"
            >
              <ChevronLeft className="w-4 h-4 text-stone-800" />
            </button>

            {/* Carousel Viewport (Overflow Hidden) */}
            <div
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="overflow-hidden rounded-xl"
            >
              {/* Horizontal Sliding Track: Each project card physically moves together */}
              <div 
                className="flex transition-transform duration-400 ease-in-out"
                style={{ transform: `translateX(-${activeMobileIndex * 100}%)` }}
              >
                {SHOWCASE_PROJECTS.map((project) => (
                  <div key={project.id} className="w-full flex-shrink-0">
                    <div 
                      onClick={(e) => e.stopPropagation()}
                      className="relative rounded-xl bg-stone-50 border border-stone-200 overflow-hidden shadow-xs flex flex-col justify-between h-full cursor-default select-none"
                    >
                      <div>
                        {/* Thumbnail Container */}
                        <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                          <img
                            src={project.image}
                            alt={project.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent opacity-60" />
                        </div>

                        {/* Card Content - Matching mobile structure */}
                        <div className="p-4">
                          <h3 className="text-sm font-bold text-stone-950 mb-1.5 leading-snug">
                            {project.title}
                          </h3>

                          <p className="text-xs text-stone-600 leading-relaxed font-normal">
                            {project.description}
                          </p>
                        </div>
                      </div>

                      {/* Bottom Card Action Buttons */}
                      <div className="px-4 pb-4 pt-2.5 flex items-center gap-2 border-t border-stone-200/60 mt-2">
                        {/* View Demo Button */}
                        <a
                          href={project.projectUrl || project.link || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-amber-500 hover:bg-amber-600 active:bg-amber-600 text-stone-950 font-bold text-xs shadow-xs transition-colors"
                        >
                          <span>View Demo</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>

                        {/* Contact Us Button */}
                        <a
                          href="/contact"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleContactClick();
                          }}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-stone-200/90 hover:bg-stone-300 active:bg-stone-300 text-stone-800 font-bold text-xs transition-colors"
                        >
                          <span>Contact Us</span>
                          <ArrowRight className="w-3.5 h-3.5 text-stone-600" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Arrow Button (Right) - Slightly smaller and minimal */}
            <button
              type="button"
              onClick={handleNextMobile}
              disabled={activeMobileIndex === SHOWCASE_PROJECTS.length - 1}
              aria-label="Next Project"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white border border-stone-300 text-stone-800 shadow-sm flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all"
            >
              <ChevronRight className="w-4 h-4 text-stone-800" />
            </button>
          </div>

          {/* Slide Indicator Dots */}
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {SHOWCASE_PROJECTS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveMobileIndex(idx)}
                aria-label={`Go to project slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeMobileIndex ? 'w-5 bg-amber-500' : 'w-1.5 bg-stone-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* DESKTOP & TABLET: Projects Grid - Following exact mobile card design */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {SHOWCASE_PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              className={`relative rounded-xl bg-stone-50 border border-stone-200 overflow-hidden shadow-xs hover:border-amber-400 hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col justify-between h-full cursor-default select-none ${getCardDirectionClass(idx)} ${isVisible ? 'revealed' : ''}`}
              style={{ transitionDelay: `${60 + (idx % 8) * 60}ms` }}
            >
              <div>
                {/* Thumbnail Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent opacity-60" />
                </div>

                {/* Card Content */}
                <div className="p-4">
                  <h3 className="text-sm font-bold text-stone-950 mb-1.5 leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed font-normal">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Bottom Card Action Buttons */}
              <div className="px-4 pb-4 pt-2.5 flex items-center gap-2 border-t border-stone-200/60 mt-2">
                {/* View Demo Button */}
                <a
                  href={project.projectUrl || project.link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-amber-500 hover:bg-amber-600 active:bg-amber-600 text-stone-950 font-bold text-xs shadow-xs transition-colors"
                >
                  <span>View Demo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                {/* Contact Us Button */}
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleContactClick();
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-stone-200/90 hover:bg-stone-300 active:bg-stone-300 text-stone-800 font-bold text-xs transition-colors"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-600" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className={`mt-8 sm:mt-10 flex justify-center reveal-fade-up ${isVisible ? 'revealed' : ''}`} style={{ transitionDelay: '200ms' }}>
          <button
            onClick={handleViewMore}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs sm:text-sm uppercase tracking-wider shadow-sm hover:shadow-md transition-all flex items-center gap-2 group cursor-pointer"
          >
            <span>View More Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

      </div>

    </section>
  );
};
