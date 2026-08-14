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
      className="bg-[#15180F] w-[280px] sm:w-[300px] select-none flex-shrink-0"
      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-[#3A3D2F]/60">
        <span className="w-[9px] h-[9px] rounded-full bg-[#3A3D2F]" />
        <span className="w-[9px] h-[9px] rounded-full bg-[#3A3D2F]" />
        <span className="w-[9px] h-[9px] rounded-full bg-[#3A3D2F]" />
        <span
          className="ml-2 text-[9px] tracking-[0.2em] uppercase text-[#3A3D2F]"
        >
          bash
        </span>
      </div>

      {/* Terminal body */}
      <div className="px-4 py-4 space-y-px min-h-[108px]">

        {/* Completed lines */}
        {lines.map((l, i) => (
          <div
            key={i}
            className={`text-[12.5px] leading-[1.9] ${
              l.type === 'cmd' ? 'text-[#DE9F2E]' : 'text-[#CBD3B8]'
            }`}
          >
            {l.text}
          </div>
        ))}

        {/* Currently-typing line (shown while not done) */}
        {!done && (
          <div
            className={`text-[12.5px] leading-[1.9] ${
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
          <div className="text-[12.5px] leading-[1.9] text-[#CBD3B8]">
            <span className="terminal-cursor inline-block w-[0.5em] h-[0.88em] align-middle bg-current" />
          </div>
        )}
      </div>
    </div>
  );
};

// ── Hero Section ───────────────────────────────────────────────────────────────
const Hero = () => {
  const eyebrowRef  = useRef(null);
  const headlineRef = useRef(null);
  const subheadRef  = useRef(null);
  const ctaRef      = useRef(null);
  const metaRef     = useRef(null);
  const terminalRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // All elements with opacity:0 initial style — collect for easy manipulation
    const animRefs = [eyebrowRef, headlineRef, subheadRef, ctaRef, metaRef, terminalRef];

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
            right → terminal widget (terminal-positioned CSS class handles
                    rotation + alignment responsively) */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-20">

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
                onClick={() => scrollTo('projects')}
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

          {/* ── Right: Terminal widget ──────────────────────────────────────── */}
          {/* .terminal-positioned in index.css:
              mobile  → margin-top: 2.5rem, no rotation
              desktop → margin-top: 2rem, align-self: flex-start, rotate(-2deg) */}
          <div
            ref={terminalRef}
            className="terminal-positioned"
            style={{ opacity: 0 }}
          >
            <TerminalWidget />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
