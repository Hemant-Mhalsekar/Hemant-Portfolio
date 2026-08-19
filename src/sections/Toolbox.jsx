import React, { useRef, useEffect, useState } from 'react';

const PREFERS_REDUCED =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const ALL_TOOLS = [
  'React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'Java', 'Tailwind CSS',
  'Git', 'Spring Boot', 'AWS', 'DSA', 'System Design', 'TypeScript', 'Next.js',
  'Python', 'SQL', 'MySQL', 'JWT', 'Socket.io', 'REST APIs'
];

const COMFORTABLE = [
  'React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'Java', 'Tailwind CSS', 'Git'
];

const IMPROVING = [
  'Spring Boot', 'AWS', 'DSA', 'System Design', 'TypeScript', 'Next.js'
];

// Pseudo-random consistent rotation between -2 and 2 degrees
const getRotation = (index) => {
  return (Math.sin(index * 13.5) * 2).toFixed(1);
};

const Toolbox = () => {
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
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const fadeUp = (delay, duration = 550, ty = 20) => ({
    opacity:    isVisible ? 1 : 0,
    transform:  isVisible ? 'translateY(0)' : `translateY(${ty}px)`,
    transition: PREFERS_REDUCED
      ? 'none'
      : `opacity ${duration}ms ease ${delay}ms, transform ${duration}ms ease ${delay}ms`,
  });

  return (
    <section
      id="toolbox"
      ref={sectionRef}
      className="bg-[#39471F]"
    >
      <div className="container-max px-6 sm:px-10 lg:px-16 py-16 sm:py-20 lg:py-24">
        
        {/* ── Top Block: Eyebrow + Heading ────────────────────────────────────────── */}
        <div className="mb-10 sm:mb-12">
          {/* Eyebrow */}
          <div
            className="flex items-center gap-3 mb-5"
            style={fadeUp(0, 500, 16)}
          >
            <span aria-hidden="true" className="flex-shrink-0 w-px h-[18px] bg-[#DE9F2E]/45" />
            <p
              className="text-[11px] text-[#DE9F2E] tracking-[0.22em] uppercase"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              // toolbox
            </p>
          </div>

          {/* Heading */}
          <h2
            className="font-black leading-[1.0] tracking-tight text-[#F1ECDD]"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize:   'clamp(2rem, 3.5vw, 2.5rem)',
              ...fadeUp(100, 550, 20),
            }}
          >
            My Toolbox
          </h2>
        </div>

        {/* ── Full Tag Cloud ──────────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-3 sm:gap-4 mb-16 sm:mb-20">
          {ALL_TOOLS.map((tool, i) => {
            const rot = getRotation(i);
            const delay = 150 + i * 40; // Base delay + stagger

            return (
              <div
                key={`cloud-${tool}`}
                style={{
                  opacity:    isVisible ? 1 : 0,
                  transform:  isVisible ? `scale(1) rotate(${rot}deg)` : `scale(0.9) rotate(${rot}deg)`,
                  transition: PREFERS_REDUCED
                    ? 'none'
                    : `opacity 300ms ease ${delay}ms, transform 300ms ease ${delay}ms`,
                }}
              >
                <span
                  className="inline-block px-3 py-1.5 border border-[#F1ECDD]/40 text-[#F1ECDD] rounded-[4px] whitespace-nowrap hover:scale-[1.03] hover:border-[#DE9F2E] hover:border-opacity-100 transition-all duration-150 motion-reduce:transition-none cursor-default"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize:   '13px',
                    lineHeight: 1,
                  }}
                >
                  {tool}
                </span>
              </div>
            );
          })}
        </div>

        {/* ── Callout Blocks ──────────────────────────────────────────────────────── */}
        {/* They fade in after the tag cloud stagger finishes (~ 150 + 20*40 = 950ms) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14">
          
          {/* Block 1: Most comfortable with */}
          <div style={fadeUp(1000, 500, 16)}>
            <p
              className="text-[#DE9F2E] tracking-[0.18em] uppercase mb-5"
              style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px' }}
            >
              COMFORT ZONE
            </p>
            <div className="flex flex-wrap gap-2.5">
              {COMFORTABLE.map(tool => (
                <span
                  key={`comfort-${tool}`}
                  className="px-3 py-1.5 bg-[#DE9F2E] text-[#39471F] rounded-[4px] font-semibold whitespace-nowrap hover:scale-[1.03] hover:brightness-105 transition-all duration-150 motion-reduce:transition-none cursor-default"
                  style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', lineHeight: 1 }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Block 2: Currently improving */}
          <div style={fadeUp(1100, 500, 16)}>
            <p
              className="text-[#F1ECDD] tracking-[0.18em] uppercase mb-5"
              style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px' }}
            >
              STRETCHING A BIT
            </p>
            <div className="flex flex-wrap gap-2.5">
              {IMPROVING.map(tool => (
                <span
                  key={`improve-${tool}`}
                  className="px-3 py-1.5 border border-dashed border-[#DE9F2E]/60 text-[#DE9F2E] rounded-[4px] whitespace-nowrap hover:scale-[1.03] hover:border-[#DE9F2E] hover:border-opacity-100 hover:border-solid transition-all duration-150 motion-reduce:transition-none cursor-default"
                  style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', lineHeight: 1 }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Toolbox;
