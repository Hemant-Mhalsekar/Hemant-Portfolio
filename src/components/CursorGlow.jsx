import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CursorGlow = () => {
  const glowRef = useRef(null);

  useEffect(() => {
    // Disable on small screens, touch devices, or when reduced motion is preferred
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const isSmallScreen = window.innerWidth < 768;

    if (prefersReduced || isTouch || isSmallScreen) return;

    const el = glowRef.current;
    if (!el) return;

    // Center the element mechanically so its origin is precisely on the cursor coordinate
    gsap.set(el, { xPercent: -50, yPercent: -50 });

    // Use pure quickTo mapping for native layout thrashing immunity
    const xTo = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'power3.out' });

    const moveGlow = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', moveGlow, { passive: true });
    
    // Initial jump to mouse position without tweening visible if we tracked mouseenter, 
    // but globally it'll just float to the mouse dynamically.
    
    return () => {
      window.removeEventListener('mousemove', moveGlow);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none z-40 mix-blend-screen hidden md:block opacity-60"
      style={{ willChange: 'transform' }}
    />
  );
};

export default CursorGlow;
