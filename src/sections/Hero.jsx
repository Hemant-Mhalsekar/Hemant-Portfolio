import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import Button from '../components/Button';
import { useMagneticHover } from '../hooks/useGsapReveal';

// Animation config for each glow blob
const GLOWS = [
  {
    // Indigo — large centrepiece
    color: 'bg-indigo-600/20',
    size: 'w-[700px] h-[700px]',
    pos: '-translate-x-[10%] -translate-y-[10%]',
    drift: { x: 40, y: 30, duration: 20 },
    parallax: 0.018,
  },
  {
    // Purple — upper-right accent
    color: 'bg-purple-600/15',
    size: 'w-[500px] h-[500px]',
    pos: 'translate-x-[35%] -translate-y-[25%]',
    drift: { x: -35, y: 25, duration: 18 },
    parallax: 0.012,
  },
  {
    // Blue — lower-left accent
    color: 'bg-blue-600/12',
    size: 'w-[450px] h-[450px]',
    pos: '-translate-x-[30%] translate-y-[20%]',
    drift: { x: 30, y: -20, duration: 22 },
    parallax: 0.010,
  },
];

const Hero = () => {
  const glowRefs = useRef([]);
  const accentLineRef = useRef(null);

  // Individual element refs for sequential entrance
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const taglineRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollHintRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  const primaryBtnRef = useMagneticHover(12);
  const secondaryBtnRef = useMagneticHover(12);

  // ── GSAP animations ─────────────────────────────────────────────────────────
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;

    const ctx = gsap.context(() => {
      // ── 1. Sequential hero content entrance ────────────────────────────────
      if (!prefersReduced) {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(nameRef.current,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.7 }
        )
        .fromTo(accentLineRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.55, ease: 'power2.out' },
          '-=0.2'
        )
        .fromTo(titleRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.25'
        )
        .fromTo(taglineRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.2'
        )
        .fromTo(ctaRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.15'
        )
        .fromTo(scrollHintRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          '-=0.1'
        );

        // ── 1.b Scroll Indicator looping animation ───────────────────────────
        gsap.to(scrollIndicatorRef.current, {
          y: 10,
          opacity: 0,
          duration: 1.2,
          repeat: -1,
          ease: 'power1.out',
        });

        // ── 2. Glow blob drift animations ──────────────────────────────────
        glowRefs.current.forEach((el, i) => {
          if (!el) return;
          const { x, y, duration } = GLOWS[i].drift;
          gsap.to(el, {
            x,
            y,
            duration,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          });
        });
      }

      // ── 3. Mouse parallax on glow blobs ────────────────────────────────────
      if (!prefersReduced && !isTouch) {
        const xTos = glowRefs.current.map((el, i) =>
          el ? gsap.quickTo(el, 'x', { duration: 1.4, ease: 'power2.out' }) : null
        );
        const yTos = glowRefs.current.map((el, i) =>
          el ? gsap.quickTo(el, 'y', { duration: 1.4, ease: 'power2.out' }) : null
        );

        const handleMouse = (e) => {
          const cx = window.innerWidth / 2;
          const cy = window.innerHeight / 2;
          const dx = e.clientX - cx;
          const dy = e.clientY - cy;

          glowRefs.current.forEach((el, i) => {
            if (!xTos[i] || !yTos[i]) return;
            const { x: driftX, y: driftY } = GLOWS[i].drift;
            const factor = GLOWS[i].parallax;
            // Parallax offset layered on top of the drift target
            xTos[i](driftX * (glowRefs.current[i]?._gsap?.yoyo ? -1 : 1) + dx * factor);
            yTos[i](driftY * (glowRefs.current[i]?._gsap?.yoyo ? -1 : 1) + dy * factor);
          });
        };

        window.addEventListener('mousemove', handleMouse, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouse);
      }
    });

    return () => ctx.revert();
  }, []);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">

      {/* ── Glow blob layer ─────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {GLOWS.map((g, i) => (
          <div
            key={i}
            ref={(el) => (glowRefs.current[i] = el)}
            className={`absolute ${g.size} ${g.color} blur-[120px] rounded-full ${g.pos}`}
          />
        ))}
      </div>

      {/* ── Decorative dot grid ─────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* ── Hero content ────────────────────────────────────────────────────── */}
      <div className="container-max w-full flex flex-col items-center text-center relative z-10 pt-20 pb-16">

        {/* Name */}
        <h1
          ref={nameRef}
          className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight tracking-tight mb-2 text-white opacity-0"
        >
          Hemant Mhalsekar
        </h1>

        {/* Accent underline — expands from center */}
        <div
          ref={accentLineRef}
          className="h-[3px] w-48 rounded-full bg-gradient-to-r from-indigo-500 via-purple-400 to-indigo-500 mb-6 opacity-0 origin-center scale-x-0"
        />

        {/* Title */}
        <p
          ref={titleRef}
          className="text-xl sm:text-2xl md:text-3xl text-indigo-400 font-semibold mb-6 opacity-0"
        >
          Full Stack Developer | MCA
        </p>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed mb-10 pb-2 opacity-0"
        >
          I design and build scalable web applications with clean architecture and modern technologies — helping businesses and startups turn ideas into reliable digital products.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-wrap justify-center gap-4 opacity-0">
          <div ref={primaryBtnRef}>
            <Button
              variant="primary"
              onClick={() => handleScrollTo('projects')}
              className="hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-300"
            >
              View My Work
            </Button>
          </div>
          <a
            ref={secondaryBtnRef}
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border border-indigo-500/40 bg-indigo-500/5 text-indigo-300 hover:text-indigo-200 hover:bg-indigo-500/15 hover:border-indigo-500/60 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Resume
          </a>
        </div>

        {/* Scroll hint */}
        <div ref={scrollHintRef} className="mt-20 flex flex-col items-center gap-3 opacity-0">
          <span className="text-slate-600 text-xs uppercase tracking-widest">Scroll</span>
          
          {/* Scroll Cue Pill */}
          <div className="w-[26px] h-10 rounded-full border border-slate-600/50 flex justify-center pt-2">
            <div 
              ref={scrollIndicatorRef}
              className="w-1.5 h-1.5 rounded-full bg-indigo-400"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
