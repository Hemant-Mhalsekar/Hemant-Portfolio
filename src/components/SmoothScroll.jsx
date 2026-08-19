import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LenisContext from '../context/LenisContext';

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = ({ children }) => {
  const [lenisInstance, setLenisInstance] = useState(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple-like easing curve
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false, // Fallback to native smooth touch scrolling for mobile
      touchMultiplier: 2,
      infinite: false,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Sync GSAP's requestAnimationFrame with Lenis
    const onRaf = (time) => { lenis.raf(time * 1000); };
    gsap.ticker.add(onRaf);

    // Prevent GSAP lag smoothing to avoid jumps during high load
    gsap.ticker.lagSmoothing(0);

    // Provide a way to scroll to top explicitly on mount or route changes if needed
    lenis.scrollTo(0, { immediate: true });

    // Save instance to context
    setLenisInstance(lenis);

    // Cleanup on unmount — remove the exact same function reference
    return () => {
      gsap.ticker.remove(onRaf);
      lenis.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisInstance}>
      {children}
    </LenisContext.Provider>
  );
};

export default SmoothScroll;
