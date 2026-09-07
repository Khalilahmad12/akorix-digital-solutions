import React, { useState } from 'react';
import { Quote, MessageSquare, ArrowRight, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../../data';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface TestimonialsProps {
  onOpenContact?: () => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ 
  onOpenContact 
}) => {
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

  const handlePrevMobile = () => {
    if (activeMobileIndex > 0) {
      setActiveMobileIndex((prev) => prev - 1);
    }
  };

  const handleNextMobile = () => {
    if (activeMobileIndex < TESTIMONIALS_DATA.length - 1) {
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
    if (distance > 45 && activeMobileIndex < TESTIMONIALS_DATA.length - 1) {
      setActiveMobileIndex((prev) => prev + 1);
    } else if (distance < -45 && activeMobileIndex > 0) {
      setActiveMobileIndex((prev) => prev - 1);
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <section 
      id="testimonials" 
      ref={ref}
      className="py-14 sm:py-20 bg-stone-50 text-stone-900 border-t border-stone-200 relative overflow-hidden"
    >
      {/* Subtle decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto space-y-2.5 mb-10 sm:mb-12 reveal-fade-up ${isVisible ? 'revealed' : ''}`}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-xs font-semibold text-amber-900">
            <MessageSquare className="w-3.5 h-3.5 text-amber-700" />
            <span className="tracking-wider uppercase text-[11px]">CLIENT FEEDBACK</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-stone-950 leading-tight">
            What Our Clients Say
          </h2>

          <p className="text-sm sm:text-base text-stone-600 font-normal leading-relaxed max-w-2xl mx-auto">
            We believe great work speaks for itself. This space showcases genuine experiences from the businesses we work with.
          </p>
        </div>

        {/* MOBILE ONLY: Real Full-Card Horizontal Carousel with Centered Left/Right Navigation Arrows */}
        <div className={`block sm:hidden mb-10 reveal-fade-up ${isVisible ? 'revealed' : ''}`} style={{ transitionDelay: '100ms' }}>
          <div className="relative px-5">
            {/* Previous Arrow Button (Left) - Slightly smaller and minimal */}
            <button
              type="button"
              onClick={handlePrevMobile}
              disabled={activeMobileIndex === 0}
              aria-label="Previous Testimonial"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white border border-stone-300 text-stone-800 shadow-sm flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all"
            >
              <ChevronLeft className="w-4 h-4 text-stone-800" />
            </button>

            {/* Carousel Viewport (Overflow Hidden) */}
            <div
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="overflow-hidden rounded-2xl"
            >
              {/* Horizontal Sliding Track: Each testimonial card physically moves together */}
              <div
                className="flex transition-transform duration-400 ease-in-out"
                style={{ transform: `translateX(-${activeMobileIndex * 100}%)` }}
              >
                {TESTIMONIALS_DATA.map((item) => (
                  <div key={item.id} className="w-full flex-shrink-0">
                    <div className="rounded-2xl bg-white border border-stone-200/90 p-5.5 shadow-2xs flex flex-col justify-between h-full">
                      <div>
                        {/* Card Top: Stars Rating & Quote Icon */}
                        <div className="flex items-center justify-between mb-3.5">
                          <div className="flex items-center gap-1 text-amber-500">
                            {Array.from({ length: item.rating }).map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            ))}
                          </div>

                          <div className="w-7 h-7 rounded-lg bg-stone-100/80 border border-stone-200 flex items-center justify-center text-stone-400">
                            <Quote className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        {/* Project / Service Tag */}
                        <div className="mb-3">
                          <span className="inline-block text-[10px] font-semibold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md border border-stone-200">
                            {item.serviceProvided}
                          </span>
                        </div>

                        {/* Testimonial Feedback Message */}
                        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal italic mb-6">
                          "{item.feedback}"
                        </p>
                      </div>

                      {/* Client Profile Section */}
                      <div className="pt-4 border-t border-stone-100 flex items-center gap-3">
                        <img 
                          src={item.clientPhoto} 
                          alt={item.clientName} 
                          className="w-10 h-10 rounded-full object-cover border border-stone-200 shrink-0" 
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-stone-950 truncate leading-snug">
                            {item.clientName}
                          </h4>
                          <p className="text-[11px] text-stone-500 truncate">
                            {item.clientRole}
                          </p>
                        </div>
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
              disabled={activeMobileIndex === TESTIMONIALS_DATA.length - 1}
              aria-label="Next Testimonial"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white border border-stone-300 text-stone-800 shadow-sm flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all"
            >
              <ChevronRight className="w-4 h-4 text-stone-800" />
            </button>
          </div>

          {/* Slide Indicator Dots */}
          <div className="flex items-center justify-center gap-1.5 mt-4">
            {TESTIMONIALS_DATA.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveMobileIndex(idx)}
                aria-label={`Go to testimonial slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeMobileIndex ? 'w-5 bg-amber-500' : 'w-1.5 bg-stone-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* DESKTOP & TABLET: 4 Client Testimonial Cards Grid (Staggered Reveal) */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {TESTIMONIALS_DATA.map((item, idx) => (
            <div
              key={item.id}
              className={`group relative rounded-2xl bg-white border border-stone-200/90 p-5 sm:p-6 hover:border-amber-400 hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col justify-between shadow-2xs hover:shadow-md ${getCardDirectionClass(idx)} ${isVisible ? 'revealed' : ''}`}
              style={{ transitionDelay: `${80 + idx * 80}ms` }}
            >
              <div>
                {/* Card Top: Stars Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <div className="w-7 h-7 rounded-lg bg-stone-100/80 border border-stone-200 flex items-center justify-center text-stone-400 group-hover:text-amber-600 group-hover:bg-amber-50 group-hover:scale-105 transition-all duration-300">
                    <Quote className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Project / Service Tag */}
                <div className="mb-3">
                  <span className="inline-block text-[10px] font-semibold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md border border-stone-200">
                    {item.serviceProvided}
                  </span>
                </div>

                {/* Testimonial Feedback Message */}
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal italic mb-6">
                  "{item.feedback}"
                </p>
              </div>

              {/* Client Profile Section */}
              <div className="pt-4 border-t border-stone-100 flex items-center gap-3">
                <img 
                  src={item.clientPhoto} 
                  alt={item.clientName} 
                  className="w-10 h-10 rounded-full object-cover border border-stone-200 group-hover:border-amber-400 transition-colors shrink-0" 
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-stone-950 truncate leading-snug">
                    {item.clientName}
                  </h4>
                  <p className="text-[11px] text-stone-500 truncate">
                    {item.clientRole}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Centered Bottom CTA */}
        <div className={`flex flex-col items-center justify-center space-y-3 pt-2 reveal-fade-up ${isVisible ? 'revealed' : ''}`} style={{ transitionDelay: '200ms' }}>
          <button
            onClick={onOpenContact}
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm uppercase tracking-wider shadow-sm hover:shadow-md transition-all flex items-center gap-2 group cursor-pointer"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-xs text-stone-500 font-medium">
            Let’s create something worth talking about.
          </p>
        </div>

      </div>
    </section>
  );
};

