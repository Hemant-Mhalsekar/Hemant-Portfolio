import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

// ── Helpers ────────────────────────────────────────────────────────────────────
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ── Typewriter sequence ────────────────────────────────────────────────────────
// type: 'cmd' → mustard (#DE9F2E), 'out' → cream-dark (#CBD3B8)
// pause: ms to wait before starting the next line
const SEQUENCE = [
  { text: '$ whoami',                  type: 'cmd', pause: 380 },
  { text: '> hemant mhalsekar',        type: 'out', pause: 560 },
  { text: '$ stack',                   type: 'cmd', pause: 380 },
  { text: '> react, node, mongodb, java', type: 'out', pause: 560 },
  { text: '$ status',                  type: 'cmd', pause: 380 },
  { text: '> open to full-time roles', type: 'out', pause: 0   },
];

// ── Terminal Widget ────────────────────────────────────────────────────────────
const TerminalWidget = () => {
  const [lines,       setLines]       = useState([]);  // completed lines
  const [typing,      setTyping]      = useState('');  // currently-typing text
  const [currentType, setCurrentType] = useState('cmd');
  const [done,        setDone]        = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Reduced motion: show all lines instantly, no animation
    if (prefersReduced) {
      setLines(SEQUENCE);
      setDone(true);
      return;
    }

    let cancelled = false;

    (async () => {
      await sleep(900); // let hero entrance animation finish first

      for (const line of SEQUENCE) {
        if (cancelled) return;
        setCurrentType(line.type);

        // Type each character
        for (let i = 0; i <= line.text.length; i++) {
          if (cancelled) return;
          setTyping(line.text.slice(0, i));
          await sleep(line.type === 'cmd' ? 65 : 48);
        }

        if (cancelled) return;
        // Commit finished line to history
        setLines((prev) => [...prev, line]);
        setTyping('');

        // Pause before next line
        if (line.pause) await sleep(line.pause);
      }

      if (!cancelled) setDone(true);
    })();

    return () => { cancelled = true; };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="bg-[#15180F] w-[320px] sm:w-[360px] select-none flex-shrink-0"
      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 px-6 py-3 border-b border-[#3A3D2F]/60">
        <span className="w-[10px] h-[10px] rounded-full bg-[#3A3D2F]" />
        <span className="w-[10px] h-[10px] rounded-full bg-[#3A3D2F]" />
        <span className="w-[10px] h-[10px] rounded-full bg-[#3A3D2F]" />
        <span
          className="ml-2 text-[10px] tracking-[0.2em] uppercase text-[#3A3D2F]"
        >
          bash
        </span>
      </div>

      {/* Terminal body */}
      <div className="px-7 py-7 space-y-1 min-h-[200px]">

        {/* Completed lines */}
        {lines.map((l, i) => (
          <div
            key={i}
            className={`text-[15px] leading-[1.8] ${
              l.type === 'cmd' ? 'text-[#DE9F2E]' : 'text-[#CBD3B8]'
            }`}
          >
            {l.text}
          </div>
        ))}

        {/* Currently-typing line (shown while not done) */}
        {!done && (
          <div
            className={`text-[15px] leading-[1.8] ${
              currentType === 'cmd' ? 'text-[#DE9F2E]' : 'text-[#CBD3B8]'
            }`}
          >
            {typing}
            {/* Blinking block cursor — uses .terminal-cursor from index.css */}
            <span className="terminal-cursor inline-block w-[0.5em] h-[0.88em] align-middle bg-current" />
          </div>
        )}

        {/* Final blinking cursor after all lines are complete */}
        {done && (
          <div className="text-[15px] leading-[1.8] text-[#CBD3B8]">
            <span className="terminal-cursor inline-block w-[0.5em] h-[0.88em] align-middle bg-current" />
          </div>
        )}
      </div>
    </div>
  );
};

// ── Hero Section ───────────────────────────────────────────────────────────────
const Hero = () => {
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const eyebrowRef  = useRef(null);
  const headlineRef = useRef(null);
  const subheadRef  = useRef(null);
  const ctaRef      = useRef(null);
  const metaRef     = useRef(null);
  const terminalRef = useRef(null);
  const scrollCueRef = useRef(null);
  const statusChipRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // All elements with opacity:0 initial style — collect for easy manipulation
    const animRefs = [eyebrowRef, headlineRef, subheadRef, ctaRef, metaRef, terminalRef, scrollCueRef, statusChipRef];

    if (prefersReduced) {
      // Show everything immediately — no animation
      animRefs.forEach((r) => { if (r.current) r.current.style.opacity = '1'; });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl
        .fromTo(eyebrowRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5 }
        )
        .fromTo(headlineRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.75 },
          '-=0.2'
        )
        .fromTo(subheadRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.35'
        )
        .fromTo(ctaRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.3'
        )
        .fromTo(metaRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          '-=0.15'
        )
        .fromTo(terminalRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.5'
        )
        .fromTo(statusChipRef.current,
          { opacity: 0, y: 10, rotate: 0 },
          { opacity: 1, y: 0, rotate: 3, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(scrollCueRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, delay: 1.5 },
          '-=0.6'
        );
    });

    return () => ctx.revert();
  }, []);

  // ── Smooth scroll utility ──────────────────────────────────────────────────
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 72,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-[#F1ECDD] overflow-hidden flex flex-col justify-center pt-14"
    >
      <style>{`
        @keyframes scrollDot {
          0% { transform: translate(-50%, -10px); opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translate(-50%, 60px); opacity: 0; }
        }
      `}</style>

      {/* ── Ghost background word ──────────────────────────────────────────── */}
      {/* Large, low-opacity "DEVELOPER" anchored to bottom-left. overflow-hidden
          on the section clips it so it bleeds naturally below the fold. */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 pointer-events-none select-none"
        style={{ lineHeight: 0.85 }}
      >
        <span
          className="block font-black text-[#15180F] whitespace-nowrap tracking-tight"
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: 'clamp(5.5rem, 17vw, 16rem)',
            opacity: 0.045,
            transform: 'translateY(14%)',
          }}
        >
          DEVELOPER
        </span>
      </div>

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <div className="relative z-10 container-max w-full px-6 sm:px-10 lg:px-16 py-16 sm:py-20">

        {/* Asymmetric two-column layout:
            left  → text content (flex-1, max-w constrained)
            right → right column stretches vertically to match left column height, distributing items via justify-between */}
        <div className="flex flex-col lg:flex-row lg:items-stretch lg:gap-20">

          {/* ── Left column: all text content ──────────────────────────────── */}
          <div className="flex-1 max-w-[640px]">

            {/* Eyebrow */}
            <p
              ref={eyebrowRef}
              className="mb-7 text-[11px] text-[#39471F] tracking-[0.22em] uppercase"
              style={{ fontFamily: "'IBM Plex Mono', monospace", opacity: 0 }}
            >
              // full stack developer
            </p>

            {/* Headline — Bricolage Grotesque, fluid size, tight leading */}
            <h1
              ref={headlineRef}
              className="font-black leading-[0.93] tracking-tight text-[#15180F] mb-8"
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: 'clamp(2.75rem, 5.8vw, 5.5rem)',
                opacity: 0,
              }}
            >
              I build full stack products, and lately I've been giving them a brain when it actually helps.
            </h1>

            {/* Subhead — Work Sans, relaxed, constrained to ~38ch */}
            <p
              ref={subheadRef}
              className="text-[17px] sm:text-[18px] text-[#3A3D2F] leading-[1.72] mb-10"
              style={{
                fontFamily: "'Work Sans', sans-serif",
                maxWidth: '38ch',
                opacity: 0,
              }}
            >
              Working mainly in React, Node and MongoDB. I've been folding AI into
              what I build where it's actually useful — an LLM that helps prioritize
              tasks, a model that reads a resume and tells you what's missing — not AI
              for the sake of a buzzword. Java and Spring Boot run alongside as a
              second track.
            </p>

            {/* CTA Buttons — flat, no rounded corners, no shadows, no gradients */}
            <div
              ref={ctaRef}
              className="flex flex-wrap gap-3 mb-10 sm:mb-12"
              style={{ opacity: 0 }}
            >
              {/* Primary: flat mustard fill */}
              <button
                onClick={() => scrollTo('work')}
                className="px-6 py-3 bg-[#DE9F2E] text-[#15180F] text-[13px] font-semibold tracking-wide hover:bg-[#c98c24] active:bg-[#b87c1f] transition-colors duration-200"
                style={{ fontFamily: "'Work Sans', sans-serif" }}
              >
                View my work
              </button>

              {/* Secondary: outlined ink, fills on hover */}
              <button
                onClick={() => scrollTo('contact')}
                className="px-6 py-3 border border-[#15180F] bg-transparent text-[#15180F] text-[13px] font-medium tracking-wide hover:bg-[#15180F] hover:text-[#F1ECDD] transition-colors duration-200"
                style={{ fontFamily: "'Work Sans', sans-serif" }}
              >
                Let's talk
              </button>
            </div>

            {/* Meta line — mono, very low key */}
            <p
              ref={metaRef}
              className="text-[11px] text-[#3A3D2F]/50 tracking-[0.16em] uppercase"
              style={{ fontFamily: "'IBM Plex Mono', monospace", opacity: 0 }}
            >
              Bengaluru&nbsp;&middot;&nbsp;MCA (AI/ML)&nbsp;&middot;&nbsp;Open to full-time SDE roles
            </p>
          </div>

          {/* ── Right: Terminal widget, Status Chip, & Scroll cue ─────────────────────────── */}
          <div className="flex flex-col items-center lg:items-end gap-16 lg:gap-0 lg:justify-between mt-10 lg:mt-0 lg:pb-4 w-full lg:w-auto">
            {/* .terminal-positioned in index.css applies margins and rotation */}
            <div
              ref={terminalRef}
              className="terminal-positioned"
              style={{ opacity: 0 }}
            >
              <TerminalWidget />
            </div>

            {/* Status Chip (Desktop only, mid-column) */}
            <div 
              ref={statusChipRef}
              className="hidden lg:block bg-[#DE9F2E] text-[#39471F] uppercase tracking-wider font-semibold rounded-sm lg:mr-16 xl:mr-24"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '12px',
                padding: '8px 16px',
                transform: 'rotate(3deg)',
                opacity: prefersReduced ? 1 : 0,
              }}
            >
              open to work
            </div>

            {/* Scroll Cue (Fades in slightly after terminal, but roughly centered relative to terminal) */}
            <div 
              ref={scrollCueRef}
              className="flex flex-col items-center gap-3 lg:mr-32"
              style={{ opacity: 0 }}
            >
              <div className="relative w-px h-[55px] bg-[#39471F]/40">
                {!prefersReduced ? (
                  <div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[6px] h-[6px] rounded-full bg-[#DE9F2E]"
                    style={{ animation: 'scrollDot 1.8s ease-in-out infinite' }} 
                  />
                ) : (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full bg-[#DE9F2E]" />
                )}
              </div>
              <span 
                className="text-[11px] text-[#3A3D2F] uppercase tracking-widest" 
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                scroll
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
