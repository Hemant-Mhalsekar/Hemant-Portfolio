import React, { useRef, useEffect, useState } from 'react';

const PREFERS_REDUCED =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const BeyondCode = () => {
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
      { threshold: 0.2 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const fadeUp = (delay = 0, duration = 500, ty = 16) => ({
    opacity:    isVisible ? 1 : 0,
    transform:  isVisible ? 'translateY(0)' : `translateY(${ty}px)`,
    transition: PREFERS_REDUCED
      ? 'none'
      : `opacity ${duration}ms ease ${delay}ms, transform ${duration}ms ease ${delay}ms`,
  });

  return (
    <section
      id="beyond-code"
      ref={sectionRef}
      className="bg-[#F1ECDD] border-t border-[#3A3D2F]/10"
    >
      <div className="container-max px-6 sm:px-10 lg:px-16 py-16 sm:py-20 lg:py-24">
        
        {/* ── Eyebrow ───────────────────────────────────────────────────────────── */}
        <div
          className="flex items-center gap-3 mb-5"
          style={fadeUp(0, 500, 16)}
        >
          <span aria-hidden="true" className="flex-shrink-0 w-px h-[18px] bg-[#39471F]/55" />
          <p
            className="text-[11px] text-[#39471F] tracking-[0.22em] uppercase"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            // beyond code
          </p>
        </div>

        {/* ── Heading ───────────────────────────────────────────────────────────── */}
        <h2
          className="font-black text-[#15180F] leading-[1.05] tracking-tight mb-8"
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: 'clamp(2rem, 3.5vw, 2.5rem)',
            ...fadeUp(100, 500, 16),
          }}
        >
          Beyond code
        </h2>

        {/* ── Paragraph ─────────────────────────────────────────────────────────── */}
        <p
          className="text-[17px] sm:text-[18px] text-[#3A3D2F] leading-[1.75]"
          style={{
            fontFamily: "'Work Sans', sans-serif",
            maxWidth: '62ch',
            ...fadeUp(200, 500, 16),
          }}
        >
          I read a lot of self-help books, or I mean to. There's a pile of them next 
          to my desk that keeps growing faster than I finish them. When I'm not 
          half-reading something, I'm usually deep in a PC game, sometimes at a gaming 
          cafe with a friend when I want the actual arcade version of it, not just my 
          desk. I've got a genuinely large anime collection at this point, and if 
          there's a Marvel movie out, I'm at the theater with friends opening week, 
          no question. Most of my time outside code is just that, hanging out with 
          people, not doing anything that needs a caption.
        </p>

      </div>
    </section>
  );
};

export default BeyondCode;
