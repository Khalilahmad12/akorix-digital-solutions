import React, { useEffect, useRef } from 'react';
import { Target, Cpu, Sparkles, Headphones, ShieldCheck } from 'lucide-react';
import { WHY_CHOOSE_US_DATA } from '../../data';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface WhyChooseUsProps {
  onOpenContact?: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = () => {
  const { ref: revealRef, isVisible } = useScrollReveal({ threshold: 0.1 });
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;

    // Check for prefers-reduced-motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      bg.style.transform = 'translate3d(0, 0, 0)';
      return;
    }

    // Cached measurements to prevent forced synchronous reflow during scroll
    let sectionTop = 0;
    let sectionHeight = 0;
    let viewportHeight = window.innerHeight;
    let latestScrollY = window.scrollY;
    let ticking = false;

    const measure = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      sectionTop = rect.top + window.scrollY;
      sectionHeight = rect.height;
      viewportHeight = window.innerHeight;
    };

    const updateParallax = () => {
      ticking = false;
      if (!bgRef.current) return;

      const rectTop = sectionTop - latestScrollY;

      // Only perform transform calculations if section is near/inside visible viewport
      if (rectTop + sectionHeight < -150 || rectTop > viewportHeight + 150) {
        return;
      }

      const centerOffset = (rectTop + sectionHeight * 0.5) - (viewportHeight * 0.5);
      const isMobile = window.innerWidth < 768;

      // Desktop: 0.5x speed (half of normal page scroll). Mobile: lightweight 0.25x for battery & smoothness
      const speedFactor = isMobile ? 0.25 : 0.5;

      const maxTravel = sectionHeight * (isMobile ? 0.22 : 0.32);
      const targetOffset = Math.max(-maxTravel, Math.min(maxTravel, -centerOffset * speedFactor));

      bgRef.current.style.transform = `translate3d(0, ${targetOffset.toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      latestScrollY = window.scrollY;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateParallax);
      }
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    // Initial setup and passive listeners
    measure();
    updateParallax();

    // Re-measure after initial layout settles to guarantee precision
    const timer1 = setTimeout(() => {
      measure();
      updateParallax();
    }, 150);

    const timer2 = setTimeout(() => {
      measure();
      updateParallax();
    }, 600);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches && bgRef.current) {
        bgRef.current.style.transform = 'translate3d(0, 0, 0)';
      } else {
        measure();
        updateParallax();
      }
    };

    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Target':
        return <Target className="w-5 h-5 text-white" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-white" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-white" />;
      case 'Headphones':
        return <Headphones className="w-5 h-5 text-white" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-white" />;
    }
  };

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

  return (
    <section 
      id="why-choose-us"
      ref={(node) => {
        sectionRef.current = node;
        if (revealRef) {
          (revealRef as React.MutableRefObject<HTMLElement | null>).current = node;
        }
      }}
      className="relative py-12 sm:py-16 lg:py-20 overflow-hidden text-white"
    >
      {/* Parallax Background Image Layer */}
      <div
        ref={bgRef}
        aria-hidden="true"
        className="absolute inset-x-0 w-full pointer-events-none z-0 will-change-transform"
        style={{
          top: '-35%',
          height: '170%',
          backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      />

      {/* Exact Same Hero Overlay Color & Treatment */}
      <div className="absolute inset-0 bg-stone-950/70 backdrop-blur-[2px] z-[1] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto space-y-2.5 mb-10 sm:mb-12 reveal-fade-up ${isVisible ? 'revealed' : ''}`}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-white backdrop-blur-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span className="tracking-wider uppercase text-[11px]">WHY CHOOSE US</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
            Why Choose Us?
          </h2>

          <p className="text-sm sm:text-base text-stone-200 font-normal leading-relaxed max-w-2xl mx-auto">
            We don't just build digital products. We build solutions around your goals, your customers, and your long-term growth.
          </p>
        </div>

        {/* Four Reasons - Transparent Glass Cards with White Borders & White Text - Staggered Reveal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {WHY_CHOOSE_US_DATA.map((reason, idx) => (
            <div
              key={reason.number}
              className={`group relative rounded-xl bg-white/5 border border-white/20 p-5 sm:p-6 backdrop-blur-xs hover:bg-white/10 hover:border-white/50 hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col justify-between ${getCardDirectionClass(idx)} ${isVisible ? 'revealed' : ''}`}
              style={{ transitionDelay: `${80 + idx * 80}ms` }}
            >
              <div>
                {/* Number & Icon Container */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-mono font-bold text-white/90">
                    {reason.number}
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center group-hover:scale-105 group-hover:bg-white/15 transition-all duration-300">
                    {getIcon(reason.iconName)}
                  </div>
                </div>

                {/* Card Title */}
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug">
                  {reason.title}
                </h3>

                {/* Card Description */}
                <p className="text-xs sm:text-sm text-white/80 font-normal leading-relaxed">
                  {reason.description}
                </p>
              </div>

              {/* Bottom Subtle Visual Accent */}
              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-medium text-white/60 group-hover:text-white transition-colors">
                <span>Committed to Excellence</span>
                <span className="text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-all">→</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

