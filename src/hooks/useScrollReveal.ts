import { useEffect, useRef, useState } from 'react';

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delayMs?: number;
}

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
    delayMs = 120
  } = options;

  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if IntersectionObserver is available in current environment
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    // Adapt rootMargin for mobile screens to ensure elements must enter the viewport properly
    const isMobile = window.innerWidth < 640;
    const computedRootMargin = isMobile ? '0px 0px -30px 0px' : rootMargin;
    const computedThreshold = isMobile ? 0.12 : threshold;

    let timer: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Wait for intentional small delay after element enters viewport
            timer = setTimeout(() => {
              setIsVisible(true);
            }, delayMs);

            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            if (timer) clearTimeout(timer);
            setIsVisible(false);
          }
        });
      },
      {
        threshold: computedThreshold,
        rootMargin: computedRootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (timer) clearTimeout(timer);
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, delayMs]);

  return { ref, isVisible };
}
