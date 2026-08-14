import React, { useRef, useEffect, useState } from 'react';
import { useScrollReveal, useSectionHeading } from '../hooks/useGsapReveal';

// ── Data ───────────────────────────────────────────────────────────────────────
// status: 'done' | 'in-progress' | 'queued'
const ITEMS = [
  { text: 'aws / iam',   status: 'done'        },
  { text: 'aws / s3',    status: 'done'        },
  { text: 'react',       status: 'done'        },
  { text: 'node.js',     status: 'done'        },
  { text: 'dsa (java)',  status: 'in-progress' },
  { text: 'spring boot', status: 'in-progress' },
  { text: 'typescript',  status: 'queued'      },
  { text: 'next.js',     status: 'queued'      },
];

// Indices of items that should receive the strikethrough animation
const DONE_INDICES = ITEMS.reduce((acc, item, i) => {
  if (item.status === 'done') acc.push(i);
  return acc;
}, []);

// Computed once at module load — stable for the page lifetime.
// Used to skip all motion-based setup and initialize to the final "done" state.
const PREFERS_REDUCED =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── Progress Card ──────────────────────────────────────────────────────────────
const ProgressCard = React.forwardRef(({ struckItems }, ref) => (
  <div
    ref={ref}
    className="bg-[#15180F] p-8 sm:p-10"
    style={{ transform: 'rotate(1deg)' }}
  >
    {/* Card title */}
    <p
      className="text-[11px] text-[#DE9F2E] tracking-[0.18em] uppercase mb-7"
      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
    >
      $ progress --status
    </p>

    {/* Item list */}
    <div className="divide-y divide-[#CBD3B8]/10">
      {ITEMS.map((item, i) => {
        const isStruck = struckItems.has(i);

        const textColor =
          item.status === 'done'
            ? isStruck
              ? 'rgba(203,211,184,0.42)'  // dimmed once struck
              : '#CBD3B8'
            : item.status === 'queued'
            ? 'rgba(203,211,184,0.38)'    // pre-dimmed for queued
            : '#CBD3B8';                  // full opacity for in-progress

        return (
          <div
            key={i}
            className="flex items-center justify-between gap-6 py-[11px]"
          >
            {/* Text + horizontal strikethrough overlay */}
            <div className="relative flex-1 min-w-0">
              <span
                className="text-[12.5px] tracking-[0.08em]"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  color: textColor,
                  transition: 'color 300ms ease',
                }}
              >
                {item.text}
              </span>

              {/* Strike overlay — width animates 0% → 100% on trigger.
                  Spans the full flex-1 area so all done lines are equal width,
                  which reads as intentional editorial alignment. */}
              {item.status === 'done' && (
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    height: '1px',
                    width: isStruck ? '100%' : '0%',
                    backgroundColor: 'rgba(203,211,184,0.4)',
                    transform: 'translateY(-50%)',
                    // Transition always set so it fires reliably when width changes.
                    // PREFERS_REDUCED → 'none' so the final state appears instantly.
                    transition: PREFERS_REDUCED ? 'none' : 'width 400ms ease',
                    pointerEvents: 'none',
                  }}
                />
              )}
            </div>

            {/* Status marker — right-aligned */}
            <span
              className="flex-shrink-0 text-[11px] tracking-[0.06em]"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              {item.status === 'done' && (
                <span style={{ color: 'rgba(203,211,184,0.30)' }}>done</span>
              )}
              {item.status === 'in-progress' && (
                <span style={{ color: '#DE9F2E' }}>···</span>
              )}
              {item.status === 'queued' && (
                <span style={{ color: 'rgba(203,211,184,0.25)' }}>queued</span>
              )}
            </span>
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

  // For reduced motion: initialize to final state — card visible, all done items struck.
  // For normal: start empty/hidden; IntersectionObserver drives the reveal.
  const [struckItems, setStruckItems] = useState(
    () => (PREFERS_REDUCED ? new Set(DONE_INDICES) : new Set())
  );
  const [cardVisible, setCardVisible] = useState(PREFERS_REDUCED);

  useEffect(() => {
    // Reduced motion already handled by state initializers above
    if (PREFERS_REDUCED || !cardRef.current) return;

    const card = cardRef.current;
    const timeouts = [];

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        // Step 1: fade card in
        setCardVisible(true);

        // Step 2: stagger strikethrough animations across done items
        DONE_INDICES.forEach((itemIdx, order) => {
          const t = setTimeout(() => {
            setStruckItems((prev) => new Set([...prev, itemIdx]));
          }, order * 150 + 350); // 350ms buffer after card fade begins
          timeouts.push(t);
        });

        observer.disconnect(); // trigger once only
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

        {/* Two-column grid: ~60/40 split on desktop, single column on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 lg:gap-20 items-start">

          {/* ── LEFT COLUMN ──────────────────────────────────────────────── */}
          <div>
            {/* Eyebrow + heading — useSectionHeading adds scroll-triggered fade-up */}
            <div ref={headingRef} className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                {/* Thin olive vertical rule — ties to hero's off-grid vocabulary */}
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

            {/* Body paragraphs — useScrollReveal staggers .reveal-target children */}
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

              {/* Mustard left-border accent on the emphasized paragraph */}
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

          {/* ── RIGHT COLUMN: Progress card ──────────────────────────────── */}
          {/* Wrapper handles the opacity fade; inner div carries the rotation */}
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
