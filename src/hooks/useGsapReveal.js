import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Universal Scroll Reveal Hook
 * Animates children elements sequentially when the container enters the viewport.
 * 
 * Behavior:
 * - opacity: 0 -> 1
 * - y: 30px -> 0
 * - duration: 0.6s
 * - ease: power3.out
 * - stagger: 0.1s - 0.15s
 */
export function useScrollReveal(stagger = 0.15) {
  const containerRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !containerRef.current) return;

    // We only want to animate direct children or specific reveal targets to prevent layout thrashing
    const elements = containerRef.current.querySelectorAll('.reveal-target');
    const targets = elements.length ? elements : containerRef.current.children;

    if (!targets || targets.length === 0) return;

    // Set initial state
    gsap.set(targets, { opacity: 0, y: 30 });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 85%',
        once: true, // Only trigger once per section
        onEnter: () => {
          gsap.to(targets, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: stagger,
            ease: 'power3.out',
            overwrite: 'auto',
            onComplete: () => {
              // Clear GSAP's inline transform so CSS hover classes (e.g. hover:-translate-y-*)
              // can take effect freely once the entrance animation has finished.
              gsap.set(targets, { clearProps: 'transform,y' });
            },
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [stagger]);

  return containerRef;
}

/**
 * Section heading reveal (fast fade + slight slide up)
 */
export function useSectionHeading() {
  const ref = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !ref.current) return;

    gsap.set(ref.current, { opacity: 0, y: 20 });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.to(ref.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * 3D Tilt Hook (GSAP quickTo)
 * Applies a perspective tilt tracking cursor position on card elements.
 * Returns { wrapperRef, tiltRef } — wrapper gets the perspective and mouse listeners,
 * tiltRef gets the rotateX/Y/y GSAP transforms (replacing CSS hover lift).
 */
export function use3DTilt(maxTilt = 4, liftY = -8) {
  const wrapperRef = useRef(null);
  const tiltRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (prefersReduced || isTouch) return;

    const wrapper = wrapperRef.current;
    const card = tiltRef.current;
    if (!wrapper || !card) return;

    // Set up perspective on the wrapper
    gsap.set(wrapper, { perspective: 900 });
    gsap.set(card, { transformStyle: 'preserve-3d' });

    // quickTo for buttery smooth tracking
    const xTo = gsap.quickTo(card, 'rotateY', { duration: 0.4, ease: 'power3' });
    const yTo = gsap.quickTo(card, 'rotateX', { duration: 0.4, ease: 'power3' });
    const liftTo = gsap.quickTo(card, 'y', { duration: 0.25, ease: 'power3.out' });

    const onEnter = () => liftTo(liftY);

    const onMove = (e) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const px = e.clientX - left;
      const py = e.clientY - top;
      // Normalize to -1..+1, then scale by maxTilt
      const rotateY = ((px / width) - 0.5) * 2 * maxTilt;
      const rotateX = -((py / height) - 0.5) * 2 * maxTilt;
      xTo(rotateY);
      yTo(rotateX);
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
      liftTo(0);
    };

    wrapper.addEventListener('mouseenter', onEnter);
    wrapper.addEventListener('mousemove', onMove);
    wrapper.addEventListener('mouseleave', onLeave);

    return () => {
      wrapper.removeEventListener('mouseenter', onEnter);
      wrapper.removeEventListener('mousemove', onMove);
      wrapper.removeEventListener('mouseleave', onLeave);
      // Reset transforms on cleanup
      gsap.set(card, { clearProps: 'rotateX,rotateY,y' });
    };
  }, [maxTilt, liftY]);

  return { wrapperRef, tiltRef };
}

/**
 * Magnetic Hover Hook (GSAP quickTo)
 * Creates a subtle follow-cursor effect for buttons
 */
export function useMagneticHover(strength = 10) {
  const ref = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Disable on touch devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    
    if (prefersReduced || isTouch || !ref.current) return;

    const el = ref.current;
    
    // quickTo is highly performant for mousefollow tracking
    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3' });

    const mouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      xTo((x / width) * strength);
      yTo((y / height) * strength);
    };

    const mouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('mousemove', mouseMove);
    el.addEventListener('mouseleave', mouseLeave);

    return () => {
      el.removeEventListener('mousemove', mouseMove);
      el.removeEventListener('mouseleave', mouseLeave);
    };
  }, [strength]);

  return ref;
}
