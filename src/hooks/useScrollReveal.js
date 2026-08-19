import { useRef, useEffect, useState } from 'react';

/** True if the user prefers reduced motion (evaluated once at module load, SSR-safe). */
export const PREFERS_REDUCED =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Observe a section ref and set a visibility flag when it enters the viewport.
 * Also returns a `fadeUp` style factory pre-bound to that visibility flag.
 *
 * @param {number} threshold  IntersectionObserver threshold (default 0.2)
 * @returns {{ sectionRef, isVisible, fadeUp }}
 */
export function useScrollReveal(threshold = 0.2) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(PREFERS_REDUCED);

  useEffect(() => {
    if (PREFERS_REDUCED || !sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { threshold }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Returns an inline style object for a fade-up entrance animation.
   * @param {number} delay      transition-delay in ms
   * @param {number} duration   transition-duration in ms (default 550)
   * @param {number} ty         translateY start offset in px (default 20)
   */
  const fadeUp = (delay = 0, duration = 550, ty = 20) => ({
    opacity:    isVisible ? 1 : 0,
    transform:  isVisible ? 'translateY(0)' : `translateY(${ty}px)`,
    transition: PREFERS_REDUCED
      ? 'none'
      : `opacity ${duration}ms ease ${delay}ms, transform ${duration}ms ease ${delay}ms`,
  });

  return { sectionRef, isVisible, fadeUp };
}
