import React, { useRef, useEffect, useState } from 'react';
import { useScrollReveal, PREFERS_REDUCED } from '../hooks/useScrollReveal';

// ── Data ───────────────────────────────────────────────────────────────────────
const ITEMS = [
  { text: 'AWS / IAM',   status: 'done'        },
  { text: 'AWS / S3',    status: 'done'        },
  { text: 'React',       status: 'done'        },
  { text: 'Node.js',     status: 'done'        },
  { text: 'DSA (Java)',  status: 'in-progress' },
  { text: 'Spring Boot', status: 'in-progress' },
  { text: 'TypeScript',  status: 'queued'      },
  { text: 'Next.js',     status: 'queued'      },
];

const DONE_INDICES = ITEMS.reduce((acc, item, i) => {
  if (item.status === 'done') acc.push(i);
  return acc;
}, []);


// Animation timing constants (ms)
const CARD_DELAY    = 300; // card entrance delay relative to section trigger
const CARD_DURATION = 500; // card transition duration
const CHECK_BUFFER  = 200; // gap between card finishing and checks starting
const CHECK_START   = CARD_DELAY + CARD_DURATION + CHECK_BUFFER; // 1000ms

// ── Progress Card ──────────────────────────────────────────────────────────────
// Simplified from forwardRef — section observer now drives all timing.
const ProgressCard = ({ checkedItems }) => (
  <div
    className="bg-[#39471F] px-9 py-10 sm:px-11 sm:py-11"
    style={{ transform: 'rotate(-1deg)', borderRadius: '18px' }}
  >
    <p
      className="text-[11px] text-[#DE9F2E] tracking-[0.22em] uppercase mb-8"
      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
    >
      things I'm picking up
    </p>

    <div className="flex flex-col gap-[18px]">
      {ITEMS.map((item, i) => {
        const isChecked = checkedItems.has(i);
        const textOpacity = item.status === 'queued' ? 0.7 : 1;

        return (
          <div key={i} className="flex items-center gap-4">
            {/* Marker column */}
            <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
              {item.status === 'done' && (
                <span
                  className="flex items-center justify-center w-full h-full rounded-[3px] bg-[#DE9F2E]"
                  style={{ 
                    transform: isChecked || PREFERS_REDUCED ? 'scale(1)' : 'scale(0)',
                    transition: PREFERS_REDUCED ? 'none' : 'transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                >
                  <svg viewBox="0 0 14 14" fill="none" className="w-2.5 h-2.5">
                    <path d="M3 7.5L5.5 10L11 4" stroke="#15180F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
              {item.status === 'in-progress' && (
                <span className="w-full h-full rounded-[3px] border-[1.5px] border-dashed border-[#DE9F2E]" />
              )}
              {item.status === 'queued' && (
                <span className="w-full h-full rounded-[3px] border-[1.5px] border-solid border-[#CBD3B8] opacity-50" />
              )}
            </span>

            <div className="relative flex-1 min-w-0">
              <span
                className="block"
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                  fontWeight: 700,
                  color: '#CBD3B8',
                  opacity: textOpacity,
                  fontStyle: item.status === 'in-progress' ? 'italic' : 'normal',
                  lineHeight: 1.2,
                }}
              >
                {item.text}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

// ── Currently Section ──────────────────────────────────────────────────────────
const Currently = () => {
  // Section entrance — shared hook handles observer + PREFERS_REDUCED
  const { sectionRef, isVisible: sectionVisible } = useScrollReveal(0.1);

  // PREFERS_REDUCED → start with all done items checked
  const [checkedItems, setCheckedItems] = useState(
    () => PREFERS_REDUCED ? new Set(DONE_INDICES) : new Set()
  );

  // ── Checklist stagger observer ──────────────────────────────────────────────
  useEffect(() => {
    if (PREFERS_REDUCED || !sectionRef.current) return;

    const timeouts = [];

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        // After card finishes entering, start staggered checks
        DONE_INDICES.forEach((itemIdx, order) => {
          const t = setTimeout(() => {
            setCheckedItems((prev) => new Set([...prev, itemIdx]));
          }, CHECK_START + order * 150);
          timeouts.push(t);
        });

        observer.disconnect(); // fire once only
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
      timeouts.forEach(clearTimeout);
    };
  }, []);

  // ── CSS transition style factories ────────────────────────────────────────
  // Close over `sectionVisible` so each call reflects current state.

  // Fade + translateY — for eyebrow, heading, body paragraph
  const fadeUp = (delayMs, durationMs = 550, ty = 20) => ({
    opacity:    sectionVisible ? 1 : 0,
    transform:  sectionVisible ? 'translateY(0)' : `translateY(${ty}px)`,
    transition: PREFERS_REDUCED
      ? 'none'
      : `opacity ${durationMs}ms ease ${delayMs}ms, transform ${durationMs}ms ease ${delayMs}ms`,
  });

  // Fade + translateX from right — for the card column
  const fadeRight = (delayMs = 300, durationMs = 500) => ({
    opacity:    sectionVisible ? 1 : 0,
    transform:  sectionVisible ? 'translateX(0)' : 'translateX(24px)',
    transition: PREFERS_REDUCED
      ? 'none'
      : `opacity ${durationMs}ms ease ${delayMs}ms, transform ${durationMs}ms ease ${delayMs}ms`,
  });

  return (
    <section
      id="currently"
      ref={sectionRef}
      className="bg-[#F1ECDD] border-t border-[#3A3D2F]/10"
    >
      <div className="container-max px-6 sm:px-10 lg:px-16 py-16 sm:py-20 lg:py-24">

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 lg:gap-20 items-start">

          {/* ── LEFT COLUMN ──────────────────────────────────────────────── */}
          <div>

            {/* 1 ▸ Eyebrow — fade + up 16px, 0ms delay */}
            <div
              className="flex items-center gap-3 mb-5"
              style={fadeUp(0, 500, 16)}
            >
              <span
                aria-hidden="true"
                className="flex-shrink-0 w-px h-[18px] bg-[#39471F]/55"
              />
              <p
                className="text-[11px] text-[#39471F] tracking-[0.22em] uppercase"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                // currently
              </p>
            </div>

            {/* 2 ▸ Heading — fade + up 20px, 110ms delay */}
            <h2
              className="font-black text-[#15180F] leading-[1.05] tracking-tight"
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: 'clamp(2rem, 3.5vw, 2.5rem)',
                marginBottom: '2.5rem',
                ...fadeUp(110, 550, 20),
              }}
            >
              What I'm up to
            </h2>

            <div className="flex flex-col gap-8">

              {/* 3 ▸ Body paragraph — fade + up 20px, 220ms delay */}
              <p
                className="text-[17px] sm:text-[18px] text-[#3A3D2F] leading-[1.72]"
                style={{
                  fontFamily: "'Work Sans', sans-serif",
                  maxWidth: '60ch',
                  ...fadeUp(220, 550, 20),
                }}
              >
                Right now I'm deep in AWS — IAM, S3, EC2 — because a project I'm
                building needed it, and I'd rather actually understand it than just know
                the buzzwords. Alongside that I'm going deeper into React, Node and
                JavaScript, less "make it work," more "understand why it works." I've
                also been grinding DSA in Java, and somewhere in there I ended up liking
                Java more than I expected to, enough that I've got a few Spring Boot
                project ideas I want to build. Next up is TypeScript and Next.js. The
                list never really ends, and I've made peace with that.
              </p>

              {/* 4 ▸ Quote block — fade in at 340ms; border grows at 440ms
                  The wrapper fades in, revealing the border span which simultaneously
                  grows from scaleY(0) → scaleY(1) via a slightly later delay. */}
              <div
                className="relative"
                style={{
                  paddingLeft: '19px', // 3px border + 16px gap
                  maxWidth: '60ch',
                  opacity:    sectionVisible ? 1 : 0,
                  transition: PREFERS_REDUCED ? 'none' : 'opacity 500ms ease 340ms',
                }}
              >
                {/* Border line — grows downward via scaleY */}
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '3px',
                    backgroundColor: '#DE9F2E',
                    transformOrigin: 'top center',
                    transform:  sectionVisible ? 'scaleY(1)' : 'scaleY(0)',
                    transition: PREFERS_REDUCED ? 'none' : 'transform 500ms ease 440ms',
                  }}
                />
                <p
                  className="text-[17px] sm:text-[18px] text-[#3A3D2F] leading-[1.72]"
                  style={{ fontFamily: "'Work Sans', sans-serif" }}
                >
                  Right now I'm looking for a full-time software development role where I
                  can keep building things end to end.
                </p>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN ─────────────────────────────────────────────── */}
          {/* 5 ▸ Card — fade + slide 24px from right, 300ms delay */}
          <div style={fadeRight(300, 500)}>
            <ProgressCard checkedItems={checkedItems} />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Currently;
