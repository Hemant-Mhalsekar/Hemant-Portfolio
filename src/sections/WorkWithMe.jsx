import React, { useRef, useEffect } from 'react';
import { useScrollReveal, useSectionHeading, useMagneticHover, use3DTilt } from '../hooks/useGsapReveal';

// ─── Data ────────────────────────────────────────────────────────────────────

const services = [
  {
    id: 1,
    icon: '🖥️',
    title: 'Full Stack Web Applications',
    description: 'Develop scalable web applications with clean architecture, maintainable code, and real-world performance.',
  },
  {
    id: 2,
    icon: '🎨',
    title: 'Modern Frontend Interfaces',
    description: 'Create responsive and interactive user interfaces with modern technologies and accessible experiences.',
  },
  {
    id: 3,
    icon: '🛒',
    title: 'Shopify Development',
    description: 'Build and customize high-performance Shopify stores tailored to your brand and business needs.',
  },
  {
    id: 4,
    icon: '⚡',
    title: 'Performance & Optimization',
    description: 'Improve application speed, user experience, and overall system efficiency through targeted improvements.',
  },
];

const collaborations = [
  {
    id: 1,
    icon: '🤝',
    title: 'Freelance Projects',
    description: 'Helping businesses build websites, applications, or Shopify stores end-to-end.',
  },
  {
    id: 2,
    icon: '🚀',
    title: 'Startup Collaboration',
    description: 'Working with early-stage teams to design and build scalable, production-ready platforms.',
  },
  {
    id: 3,
    icon: '💼',
    title: 'Full-Time Opportunities',
    description: 'Open to software engineering roles building modern web products at scale.',
  },
];

const expectations = [
  'Clean, maintainable code',
  'Performance-focused solutions',
  'Clear communication throughout',
  'Scalable, future-ready architecture',
];

const stats = [
  { value: '3+', label: 'Projects Delivered' },
  { value: '10+', label: 'Technologies Used' },
  { value: '100%', label: 'Real Client Work' },
];

// ─── Service Card (tilt + spotlight) ─────────────────────────────────────────

const ServiceCard = ({ s }) => {
  const { wrapperRef, tiltRef } = use3DTilt(3, -7);
  const spotlightRef = useRef(null);
  const isTouchRef = useRef(false);

  useEffect(() => {
    isTouchRef.current = window.matchMedia('(pointer: coarse)').matches;
  }, []);

  const handleMouseMove = (e) => {
    if (isTouchRef.current || !spotlightRef.current || !tiltRef.current) return;
    const { left, top } = tiltRef.current.getBoundingClientRect();
    spotlightRef.current.style.background =
      `radial-gradient(circle at ${e.clientX - left}px ${e.clientY - top}px, rgba(255,255,255,0.06) 0%, transparent 55%)`;
  };

  const handleMouseEnter = () => { if (!isTouchRef.current && spotlightRef.current) spotlightRef.current.style.opacity = '1'; };
  const handleMouseLeave = () => { if (spotlightRef.current) spotlightRef.current.style.opacity = '0'; };

  return (
    <div ref={wrapperRef} className="h-full">
      <div
        ref={tiltRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="card-item relative overflow-hidden bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg shadow-black/20 rounded-2xl p-7 flex flex-col h-full transition-colors transition-shadow duration-[250ms] hover:bg-white/[0.08] hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-950/50 group"
      >
        {/* Cursor spotlight */}
        <div ref={spotlightRef} className="absolute inset-0 pointer-events-none z-[1] opacity-0 transition-opacity duration-300" style={{ willChange: 'background' }} />
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-600/20 via-indigo-400/50 to-purple-600/20 group-hover:from-indigo-500/50 group-hover:via-indigo-400/90 group-hover:to-purple-500/50 transition-all duration-300" />

        <span className="relative z-10 text-2xl mb-5 w-11 h-11 flex items-center justify-center bg-[#0f1117] rounded-xl border border-[#1e2638] group-hover:border-indigo-500/30 group-hover:bg-indigo-500/5 opacity-80 group-hover:opacity-100 transition-all duration-[250ms] group-hover:scale-[1.12] group-hover:-translate-y-[3px] group-hover:brightness-125">
          {s.icon}
        </span>
        <h3 className="relative z-10 text-base font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors duration-300">{s.title}</h3>
        <p className="relative z-10 text-slate-400 text-sm leading-relaxed">{s.description}</p>
      </div>
    </div>
  );
};

// ─── Collaboration Card (lighter, CSS-only hover) ─────────────────────────────

const CollabCard = ({ c }) => (
  <div className="flex items-start gap-4 p-5 rounded-2xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.08] hover:border-indigo-500/40 hover:-translate-y-[8px] hover:shadow-lg hover:shadow-indigo-950/40 transition-all duration-[250ms] ease-out group">
    <span className="text-xl w-10 h-10 flex-shrink-0 flex items-center justify-center bg-[#0f1117] rounded-xl border border-[#1e2638] group-hover:border-indigo-500/30 group-hover:bg-indigo-500/5 transition-all duration-[250ms] group-hover:scale-[1.15] group-hover:-translate-y-[3px] group-hover:brightness-125">
      {c.icon}
    </span>
    <div>
      <h4 className="text-sm font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors duration-[250ms]">{c.title}</h4>
      <p className="text-slate-500 text-sm leading-relaxed">{c.description}</p>
    </div>
  </div>
);

// ─── Main Section ─────────────────────────────────────────────────────────────

const WorkWithMe = () => {
  const headingRef = useSectionHeading();
  const servicesRef = useScrollReveal(0.12);
  const collabRef = useScrollReveal(0.1);
  const expectRef = useScrollReveal(0.1);
  const statsRef = useScrollReveal(0.12);
  const ctaRef = useScrollReveal(0.1);
  const primaryBtnRef = useMagneticHover(12);
  const emailBtnRef = useMagneticHover(12);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
  };

  return (
    <section id="work-with-me" className="section-padding relative bg-gradient-to-b from-[#0a0d13] via-[#0f1117] to-[#0a0d13]">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-600/4 blur-[150px] rounded-full pointer-events-none" />

      <div className="container-max max-w-5xl mx-auto relative z-10 flex flex-col gap-16">

        {/* ── 1. Heading + Intro ────────────────────────────────── */}
        <div ref={headingRef} className="text-center">
          <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest block mb-3">Work With Me</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">Let's Build Something Great</h2>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            I collaborate with startups, businesses, and teams to build scalable web applications and modern digital experiences —
            from <span className="text-slate-300 font-medium">full-stack web apps</span> to{' '}
            <span className="text-slate-300 font-medium">Shopify storefronts</span>.
          </p>
        </div>

        {/* ── 2. Service Cards ──────────────────────────────────── */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-3">
            <span className="flex-1 h-px bg-white/5" />
            What I Build
            <span className="flex-1 h-px bg-white/5" />
          </h3>
          <div ref={servicesRef} className="grid sm:grid-cols-2 gap-4">
            {services.map((s) => <ServiceCard key={s.id} s={s} />)}
          </div>
        </div>

        {/* ── 3. Collaboration Cards ────────────────────────────── */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-3">
            <span className="flex-1 h-px bg-white/5" />
            Ways We Can Work Together
            <span className="flex-1 h-px bg-white/5" />
          </h3>
          <div ref={collabRef} className="grid sm:grid-cols-3 gap-4">
            {collaborations.map((c) => <CollabCard key={c.id} c={c} />)}
          </div>
        </div>

        {/* ── 4. What You Can Expect ────────────────────────────── */}
        <div ref={expectRef}>
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-3">
            <span className="flex-1 h-px bg-white/5" />
            What You Can Expect
            <span className="flex-1 h-px bg-white/5" />
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {expectations.map((item) => (
              <div key={item} className="reveal-target flex items-center gap-3 px-5 py-4 rounded-xl bg-white/[0.03] border border-white/8 hover:border-indigo-500/30 hover:bg-white/[0.07] hover:-translate-y-[8px] hover:shadow-md hover:shadow-indigo-950/30 transition-all duration-[250ms] ease-out group">
                <span className="w-5 h-5 flex-shrink-0 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center transition-all duration-[200ms] group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:bg-indigo-500/25 group-hover:border-indigo-500/60">
                  <span className="text-indigo-400 text-[10px] font-bold">✓</span>
                </span>
                <span className="text-slate-300 text-sm font-medium group-hover:text-white transition-colors duration-[250ms]">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── 5. Credibility Strip ─────────────────────────────── */}
        <div ref={statsRef}>
          <div className="reveal-target flex flex-wrap items-center justify-center gap-0 rounded-2xl bg-white/[0.03] border border-white/8 overflow-hidden divide-x divide-white/8">
            {stats.map(({ value, label }) => (
              <div key={label} className="flex-1 min-w-[120px] flex flex-col items-center justify-center py-7 px-6 hover:bg-white/[0.04] transition-colors duration-300 group">
                <p className="text-3xl font-black text-white group-hover:text-indigo-400 transition-colors duration-300">{value}</p>
                <p className="text-slate-500 text-xs font-medium mt-1 uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── 6. Call To Action ─────────────────────────────────── */}
        <div ref={ctaRef} className="reveal-target flex flex-col items-center text-center gap-6">
          <div>
            <p className="text-white text-2xl font-bold mb-2">Ready to start a project?</p>
            <p className="text-slate-400 text-base max-w-md mx-auto">
              Whether you have a detailed brief or just an idea — I'd love to hear about it.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <div ref={primaryBtnRef}>
              <button
                onClick={scrollToContact}
                className="px-7 py-3.5 bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl font-semibold text-sm shadow-[0_4px_20px_rgba(99,102,241,0.35)] hover:shadow-[0_6px_28px_rgba(99,102,241,0.45)] hover:-translate-y-0.5 transition-all duration-300"
              >
                Start a Project
              </button>
            </div>
            <div ref={emailBtnRef}>
              <a
                href="mailto:hemantmhalsekar1@gmail.com"
                className="px-7 py-3.5 border border-white/15 hover:border-indigo-500/50 bg-white/[0.04] hover:bg-white/[0.07] text-slate-300 hover:text-white rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Me
              </a>
            </div>
          </div>

          {/* Availability pill */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse block" />
            <span className="text-emerald-400/90 text-sm font-medium">Currently open to freelance and full-time opportunities</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WorkWithMe;
