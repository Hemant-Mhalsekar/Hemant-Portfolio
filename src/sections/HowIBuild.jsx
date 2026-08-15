import React, { useRef, useEffect, useState } from 'react';

const PREFERS_REDUCED =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── Static data ────────────────────────────────────────────────────────────────
const QUESTIONS = [
  {
    question: "Is this actually solving something, or just another version of what already exists?",
    answer:
      "I look at what's out there first. If ten tools already do this exactly the same way, I want to know why mine should exist.",
  },
  {
    question: "Where's this going to fall apart?",
    answer:
      "I try to find the drawbacks early, not after I've built the whole thing. Usually that means poking at the idea with AI tools to stress-test it, not to write it for me, but to catch the gaps I'd otherwise only find halfway through building.",
  },
  {
    question: "What's actually worth learning here, versus what I'm tempted to bolt on because it's new?",
    answer:
      "I pick up something new on nearly every project. But if it doesn't genuinely fit what I'm building, I leave it out. Using a new tool because it's trending isn't the same as using it because it's right.",
  },
];

const STAGES = [
  { name: 'Idea',     desc: "Start with a problem worth solving, not just an idea worth building." },
  { name: 'Research', desc: "Look at what already exists before assuming mine needs to." },
  { name: 'Refine',   desc: "Stress-test the idea, mostly with AI tools, to catch gaps early, not to have it built for me." },
  { name: 'Build',    desc: "Write the thing. Usually the fastest part once the first three are done properly." },
  { name: 'Break',    desc: "Push it until something fails, usually in a way I didn't expect." },
  { name: 'Fix',      desc: "Fix what actually broke, not what just looked fragile." },
  { name: 'Ship',     desc: "Put it out, then watch how it holds up for real." },
];

// Scoped keyframe name — won't collide with other sections
const PULSE_CSS = `
  @keyframes hib-pulse {
    0%   { transform: scale(1);    }
    35%  { transform: scale(1.45); }
    100% { transform: scale(1);    }
  }
`;

// ── HowIBuild ──────────────────────────────────────────────────────────────────
const HowIBuild = () => {
  const sectionRef    = useRef(null);
  const timelineRef   = useRef(null);
  const changeTimeout = useRef(null); // for fade-between click transitions

  // Section entrance
  const [sectionVisible, setSectionVisible] = useState(PREFERS_REDUCED);

  // Timeline draw + node fill states
  const [lineDrawn,    setLineDrawn]    = useState(PREFERS_REDUCED);        // triggers CSS width/height transition
  const [filledNodes,  setFilledNodes]  = useState(
    PREFERS_REDUCED ? new Set(STAGES.map((_, i) => i)) : new Set()
  );
  const [pulsingNodes, setPulsingNodes] = useState(new Set()); // cleared 220ms after fill

  // Click-to-reveal
  const [activeNode, setActiveNode] = useState(null);
  const [isChanging, setIsChanging] = useState(false); // controls fade-between descriptions

  // ── Section entrance observer ─────────────────────────────────────────────
  useEffect(() => {
    if (PREFERS_REDUCED || !sectionRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setSectionVisible(true);
        obs.disconnect();
      },
      { threshold: 0.06 }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // ── Timeline observer: draw line + stagger node fills ────────────────────
  useEffect(() => {
    if (PREFERS_REDUCED || !timelineRef.current) return;

    const fillTimeouts = []; // collected for cleanup

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setLineDrawn(true); // starts width/height CSS transition

        STAGES.forEach((_, i) => {
          // Each node fills as the line (~1200ms) reaches its position
          const t1 = setTimeout(() => {
            setFilledNodes(prev => new Set([...prev, i]));
            setPulsingNodes(prev => new Set([...prev, i]));

            // Remove from pulsing set after animation completes
            const t2 = setTimeout(() => {
              setPulsingNodes(prev => {
                const next = new Set(prev);
                next.delete(i);
                return next;
              });
            }, 220);
            fillTimeouts.push(t2);
          }, i * 170 + 80); // 80ms base so first node fills slightly after line starts

          fillTimeouts.push(t1);
        });

        obs.disconnect();
      },
      { threshold: 0.35 }
    );

    obs.observe(timelineRef.current);
    return () => {
      obs.disconnect();
      fillTimeouts.forEach(clearTimeout);
    };
  }, []);

  // Cleanup pending description-fade timeout on unmount
  useEffect(() => () => { if (changeTimeout.current) clearTimeout(changeTimeout.current); }, []);

  // ── Node click: fade out → swap content → fade in ────────────────────────
  const handleNodeClick = (index) => {
    if (index === activeNode) return;
    if (changeTimeout.current) clearTimeout(changeTimeout.current);

    if (PREFERS_REDUCED) {
      setActiveNode(index);
      return;
    }

    setIsChanging(true);
    changeTimeout.current = setTimeout(() => {
      setActiveNode(index);
      setIsChanging(false);
      changeTimeout.current = null;
    }, 180);
  };

  // ── Entrance animation style factory ─────────────────────────────────────
  const fadeUp = (delay, duration = 550, ty = 18) => ({
    opacity:    sectionVisible ? 1 : 0,
    transform:  sectionVisible ? 'translateY(0)' : `translateY(${ty}px)`,
    transition: PREFERS_REDUCED
      ? 'none'
      : `opacity ${duration}ms ease ${delay}ms, transform ${duration}ms ease ${delay}ms`,
  });

  // ── Shared node circle + label renderer ───────────────────────────────────
  // Called for both orientations; direction changes the flex axis.
  const renderNode = (stage, i, direction) => {
    const isFilled  = filledNodes.has(i);
    const isPulsing = pulsingNodes.has(i);
    const isActive  = activeNode === i;

    const circleStyle = {
      width:           '14px',
      height:          '14px',
      borderRadius:    '50%',
      flexShrink:      0,
      position:        'relative',
      zIndex:          10,
      border:          `2px solid ${isFilled ? '#DE9F2E' : 'rgba(57,71,31,0.4)'}`,
      backgroundColor: isFilled ? '#DE9F2E' : 'transparent',
      transition:      PREFERS_REDUCED ? 'none' : 'background-color 150ms ease, border-color 150ms ease',
      // Pulse animation fires once on fill; active scale takes over after
      animation:       isPulsing && !PREFERS_REDUCED ? 'hib-pulse 200ms ease-out' : 'none',
      transform:       !isPulsing && isActive ? 'scale(1.28)' : 'scale(1)',
    };

    if (direction === 'horizontal') {
      return (
        <button
          key={stage.name}
          type="button"
          onClick={() => handleNodeClick(i)}
          className="flex flex-col items-center gap-2"
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          aria-label={`Stage: ${stage.name}`}
          aria-pressed={isActive}
        >
          <div style={circleStyle} />
          <span
            className="text-[#39471F]"
            style={{
              fontFamily:  "'IBM Plex Mono', monospace",
              fontSize:    '12px',
              fontWeight:  isFilled ? 600 : 400,
              transition:  PREFERS_REDUCED ? 'none' : 'font-weight 200ms',
              userSelect:  'none',
            }}
          >
            {stage.name}
          </span>
        </button>
      );
    }

    // Vertical (mobile): circle left, label right
    return (
      <button
        key={stage.name}
        type="button"
        onClick={() => handleNodeClick(i)}
        className="flex flex-row items-center gap-4 text-left"
        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
        aria-label={`Stage: ${stage.name}`}
        aria-pressed={isActive}
      >
        <div style={circleStyle} />
        <span
          className="text-[#39471F]"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize:   '13px',
            fontWeight: isFilled ? 600 : 400,
            userSelect: 'none',
          }}
        >
          {stage.name}
        </span>
      </button>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <section
      id="how-i-build"
      ref={sectionRef}
      className="bg-[#F1ECDD] border-t border-[#3A3D2F]/10"
    >
      {/* Scoped keyframe — injected once per mount */}
      <style dangerouslySetInnerHTML={{ __html: PULSE_CSS }} />

      <div className="container-max px-6 sm:px-10 lg:px-16 py-16 sm:py-20 lg:py-24">

        {/* ── Eyebrow ───────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 mb-5" style={fadeUp(0, 500, 14)}>
          <span aria-hidden="true" className="flex-shrink-0 w-px h-[18px] bg-[#39471F]/55" />
          <p
            className="text-[11px] text-[#39471F] tracking-[0.22em] uppercase"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            // how i build
          </p>
        </div>

        {/* ── Heading ──────────────────────────────────────────────── */}
        <h2
          className="font-black text-[#15180F] leading-[1.05] tracking-tight mb-5"
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize:   'clamp(2rem, 3.5vw, 2.5rem)',
            ...fadeUp(100, 550, 18),
          }}
        >
          How I build
        </h2>

        {/* ── Intro line ───────────────────────────────────────────── */}
        <p
          className="text-[#3A3D2F] mb-14 sm:mb-16"
          style={{
            fontFamily: "'Work Sans', sans-serif",
            fontSize:   '17px',
            lineHeight: 1.65,
            ...fadeUp(180, 500, 14),
          }}
        >
          Before I touch code, I usually sit with three questions:
        </p>

        {/* ── Three questions ──────────────────────────────────────── */}
        <div
          className="flex flex-col gap-10 mb-20 sm:mb-24"
          style={fadeUp(280, 500, 14)}
        >
          {QUESTIONS.map((q, i) => (
            <div key={i} className="flex flex-row gap-6 sm:gap-8 items-start">

              {/* Index label */}
              <span
                className="text-[#DE9F2E] tracking-[0.2em] flex-shrink-0"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize:   '11px',
                  marginTop:  '5px',
                }}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Question + answer */}
              <div>
                <p
                  className="text-[#15180F] leading-[1.2]"
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontSize:   'clamp(1.25rem, 2vw, 1.5rem)',
                    fontWeight: 700,
                  }}
                >
                  "{q.question}"
                </p>
                <p
                  className="text-[#3A3D2F] mt-3"
                  style={{
                    fontFamily: "'Work Sans', sans-serif",
                    fontSize:   '16px',
                    lineHeight: 1.7,
                  }}
                >
                  {q.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Workflow timeline ─────────────────────────────────────── */}
        <div>
          {/* Label */}
          <p
            className="text-[#39471F] tracking-[0.18em] uppercase mb-8 sm:mb-10"
            style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px' }}
          >
            my actual process
          </p>

          {/* Timeline — dual layout: horizontal md+, vertical < md */}
          <div ref={timelineRef}>

            {/* ─── Desktop: horizontal nodes connected by a horizontal line ─── */}
            <div className="hidden md:block">
              <div className="relative">
                {/* Base track — olive at low opacity */}
                <div
                  className="absolute left-0 right-0 bg-[#39471F]/22"
                  style={{ top: '7px', height: '2px' }}
                />
                {/* Animated mustard overlay — draws left-to-right */}
                <div
                  className="absolute left-0 bg-[#DE9F2E]"
                  style={{
                    top:        '7px',
                    height:     '2px',
                    width:      lineDrawn ? '100%' : '0%',
                    transition: PREFERS_REDUCED ? 'none' : 'width 1200ms linear',
                  }}
                />
                {/* Node row */}
                <div className="relative flex justify-between">
                  {STAGES.map((stage, i) => renderNode(stage, i, 'horizontal'))}
                </div>
              </div>
            </div>

            {/* ─── Mobile: vertical nodes connected by a vertical line ─────── */}
            <div className="md:hidden">
              <div className="relative">
                {/* Base track */}
                <div
                  className="absolute bg-[#39471F]/22"
                  style={{ left: '7px', top: '7px', width: '2px', bottom: '7px' }}
                />
                {/* Animated overlay — draws top-to-bottom */}
                <div
                  className="absolute bg-[#DE9F2E]"
                  style={{
                    left:       '7px',
                    top:        '7px',
                    width:      '2px',
                    height:     lineDrawn ? 'calc(100% - 14px)' : '0%',
                    transition: PREFERS_REDUCED ? 'none' : 'height 1200ms linear',
                  }}
                />
                {/* Node column */}
                <div className="relative flex flex-col gap-7">
                  {STAGES.map((stage, i) => renderNode(stage, i, 'vertical'))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Description area: tap-a-step prompt → node description ── */}
          {/* Whole area fades out/in on click; content swaps mid-fade */}
          <div
            className="mt-8 sm:mt-10 md:flex md:justify-center"
            style={{
              minHeight:  '3.5em',
              opacity:    isChanging ? 0 : 1,
              transition: PREFERS_REDUCED ? 'none' : 'opacity 180ms ease',
            }}
          >
            {activeNode === null ? (
              <p
                className="text-[#3A3D2F]/35 md:text-center"
                style={{
                  fontFamily:      "'IBM Plex Mono', monospace",
                  fontSize:        '11px',
                  letterSpacing:   '0.12em',
                }}
              >
                tap a step
              </p>
            ) : (
              <p
                className="text-[#3A3D2F] md:text-center md:max-w-[50ch]"
                style={{
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize:   '15px',
                  lineHeight: 1.65,
                }}
              >
                {STAGES[activeNode].desc}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowIBuild;
