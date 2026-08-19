import React from 'react';
import { useScrollReveal, PREFERS_REDUCED } from '../hooks/useScrollReveal';


const STATS = [
  {
    value: "VALORANT",
    label: "main game",
    valStyle: { fontSize: "clamp(1.3rem, 1.8vw, 1.875rem)", fontWeight: 700, color: "#F1ECDD", letterSpacing: "-0.02em" }
  },
  {
    value: "12",
    label: "unread books",
    valStyle: { fontSize: "clamp(2.125rem, 2.5vw, 2.375rem)", fontWeight: 800, color: "#DE9F2E" }
  },
  {
    value: "ONE PIECE + BLEACH",
    label: "currently watching",
    valStyle: { fontSize: "clamp(1.25rem, 1.5vw, 1.375rem)", fontWeight: 700, color: "#F1ECDD" }
  },
  {
    value: "ALICE IN BORDERLAND",
    label: "currently bingeing",
    valStyle: { fontSize: "clamp(1.125rem, 1.3vw, 1.25rem)", fontWeight: 700, color: "#F1ECDD" }
  }
];

const BeyondCode = () => {
  const { sectionRef, isVisible, fadeUp } = useScrollReveal(0.2);

  return (
    <section
      id="beyond-code"
      ref={sectionRef}
      className="bg-[#F1ECDD] border-t border-[#3A3D2F]/10 overflow-hidden"
    >
      <div className="container-max px-6 sm:px-10 lg:px-16 py-16 sm:py-20 lg:py-24">
        
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 lg:gap-20 items-center">
          
          {/* ── Left Column: Text ─────────────────────────────────────────────────── */}
          <div>
            
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

          {/* ── Right Column: Card ────────────────────────────────────────────────── */}
          <div
            className="bg-[#15180F] px-8 py-10 sm:px-11 sm:py-11 w-full"
            style={{
              transform: isVisible 
                ? (typeof window !== 'undefined' && window.innerWidth >= 1024 ? 'rotate(-2deg) translateX(0)' : 'none') 
                : 'translateX(20px)',
              opacity: isVisible ? 1 : 0,
              borderRadius: '16px',
              transition: PREFERS_REDUCED ? 'none' : 'opacity 500ms ease 300ms, transform 500ms ease 300ms',
            }}
          >
            <p
              className="text-[11px] text-[#DE9F2E] tracking-[0.22em] uppercase mb-8"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              right now
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
              {STATS.map((stat, i) => {
                const delay = 800 + (i * 100); // Card lands at ~800ms, then stagger
                
                return (
                  <div 
                    key={i} 
                    className="flex flex-col gap-1.5"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'scale(1)' : 'scale(0.95)',
                      transition: PREFERS_REDUCED 
                        ? 'none' 
                        : `opacity 400ms ease ${delay}ms, transform 400ms ease ${delay}ms`
                    }}
                  >
                    <span 
                      className="leading-tight"
                      style={{ 
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        ...stat.valStyle
                      }}
                    >
                      {stat.value}
                    </span>
                    <span 
                      className="text-[#CBD3B8] tracking-wide uppercase"
                      style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px" }}
                    >
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BeyondCode;
