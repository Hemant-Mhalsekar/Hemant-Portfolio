import React, { useRef, useEffect, useState } from 'react';
import { useScrollReveal, useSectionHeading } from '../hooks/useGsapReveal';

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

// Computed once at module load — drives all reduced-motion branching
const PREFERS_REDUCED =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── Progress Card ──────────────────────────────────────────────────────────────
// Olive background, Bricolage Grotesque items, mustard strike on done entries.
// Deliberately different from the Hero terminal: no CLI chrome, display font,
// olive palette instead of ink — same off-grid rotation language, different voice.
const ProgressCard = React.forwardRef(({ struckItems }, ref) => (
  <div
    ref={ref}
    className="bg-[#39471F] px-9 py-10 sm:px-11 sm:py-11"
    style={{ transform: 'rotate(-1deg)' }}
  >
    {/* Label — mono, small, mustard, no "$" prompt */}
    <p
      className="text-[11px] text-[#DE9F2E] tracking-[0.22em] uppercase mb-8"
      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
    >
      things I'm picking up
    </p>

    {/* Item list */}
    <div className="flex flex-col gap-[18px]">
      {ITEMS.map((item, i) => {
        const isStruck = struckItems.has(i);

        const textOpacity =
          item.status === 'done' && isStruck ? 0.55 :
          item.status === 'queued'            ? 0.40 :
          1;

        return (
          <div key={i} className="flex items-center gap-3">

            {/* Fixed-width marker column — dot only for in-progress,
                keeps text left-edges aligned across all three states */}
            <span className="flex-shrink-0 w-3 flex items-center justify-center">
              {item.status === 'in-progress' && (
                <span className="block w-[6px] h-[6px] rounded-full bg-[#DE9F2E]" />
              )}
            </span>

            {/* Text + mustard strikethrough overlay */}
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
                  transition: 'opacity 350ms ease',
                  lineHeight: 1.2,
                }}
              >
                {item.text}
              </span>

              {/* Mustard line — draws left-to-right via width 0% → 100% */}
              {item.status === 'done' && (
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    height: '1.5px',
                    width: isStruck ? '100%' : '0%',
                    backgroundColor: '#DE9F2E',
                    transform: 'translateY(-50%)',
                    // Transition kept always-on so it fires reliably when
                    // width changes. PREFERS_REDUCED → 'none' → instant.
                    transition: PREFERS_REDUCED ? 'none' : 'width 450ms ease',
                    pointerEvents: 'none',
                  }}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  </div>
));

ProgressCard.displayName = 'ProgressCard';

// ── Currently Section ──────────────────────────────────────────────────────────
const Currently = () => {
  const headingRef = useSectionHeading();
  const contentRef = useScrollReveal(0.15);
  const cardRef    = useRef(null);

  const [struckItems, setStruckItems] = useState(
    () => (PREFERS_REDUCED ? new Set(DONE_INDICES) : new Set())
  );
  const [cardVisible, setCardVisible] = useState(PREFERS_REDUCED);

  useEffect(() => {
    if (PREFERS_REDUCED || !cardRef.current) return;

    const card = cardRef.current;
    const timeouts = [];

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setCardVisible(true);

        DONE_INDICES.forEach((itemIdx, order) => {
          const t = setTimeout(() => {
            setStruckItems((prev) => new Set([...prev, itemIdx]));
          }, order * 150 + 350);
          timeouts.push(t);
        });

        observer.disconnect();
      },
      { threshold: 0.2 }
    );

    observer.observe(card);

    return () => {
      observer.disconnect();
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <section
      id="currently"
      className="bg-[#F1ECDD] border-t border-[#3A3D2F]/10"
    >
      <div className="container-max px-6 sm:px-10 lg:px-16 py-16 sm:py-20 lg:py-24">

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 lg:gap-20 items-start">

          {/* ── LEFT COLUMN ──────────────────────────────────────────────── */}
          <div>
            <div ref={headingRef} className="mb-10">
              <div className="flex items-center gap-3 mb-5">
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

              <h2
                className="font-black text-[#15180F] leading-[1.05] tracking-tight"
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontSize: 'clamp(2rem, 3.5vw, 2.5rem)',
                }}
              >
                What I'm up to
              </h2>
            </div>

            <div ref={contentRef} className="flex flex-col gap-8">
              <p
                className="reveal-target text-[17px] sm:text-[18px] text-[#3A3D2F] leading-[1.72]"
                style={{ fontFamily: "'Work Sans', sans-serif", maxWidth: '60ch' }}
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

              <p
                className="reveal-target text-[17px] sm:text-[18px] text-[#3A3D2F] leading-[1.72]"
                style={{
                  fontFamily: "'Work Sans', sans-serif",
                  maxWidth: '60ch',
                  borderLeft: '3px solid #DE9F2E',
                  paddingLeft: '16px',
                }}
              >
                Right now I'm looking for a full-time software development role where I
                can keep building things end to end.
              </p>
            </div>
          </div>

          {/* ── RIGHT COLUMN: olive card ──────────────────────────────────── */}
          <div
            style={{
              opacity: cardVisible ? 1 : 0,
              transition: PREFERS_REDUCED ? 'none' : 'opacity 500ms ease',
            }}
          >
            <ProgressCard ref={cardRef} struckItems={struckItems} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Currently;
