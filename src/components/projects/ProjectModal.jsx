import React, { useEffect, useRef, useContext } from 'react';
import gsap from 'gsap';
import { useMagneticHover } from '../../hooks/useGsapReveal';
import { LenisContext } from '../SmoothScroll';

const ProjectModal = ({ project, onClose }) => {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const lenis = useContext(LenisContext);
  
  // Magnetic CTAs
  const liveBtnRef = useMagneticHover(10);
  const githubBtnRef = useMagneticHover(10);

  // Open animation
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      const tl = gsap.timeline();

      // Fade in overlay with backdrop blur
      tl.fromTo(
        overlayRef.current,
        { opacity: 0, backdropFilter: 'blur(0px)' },
        { opacity: 1, backdropFilter: 'blur(12px)', duration: 0.3, ease: 'power3.out' }
      );

      // Scale and fade in modal
      tl.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.95, y: 16 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power3.out' },
        '-=0.2'
      );

      return () => tl.kill();
    }
  }, []);

  // Smooth close animation
  const handleClose = () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      onClose();
      return;
    }

    const tl = gsap.timeline({ onComplete: onClose });
    
    tl.to(modalRef.current, {
      opacity: 0,
      scale: 0.95,
      y: 12,
      duration: 0.3,
      ease: 'power3.in',
    }).to(overlayRef.current, {
      opacity: 0,
      backdropFilter: 'blur(0px)',
      duration: 0.2,
      ease: 'power3.in',
    }, '-=0.15');
  };

  // ESC key close & Scroll Locking
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', handleKey);
    
    // Lock both native and smooth scrolling
    document.body.style.overflow = 'hidden';
    lenis?.stop();
    
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
      lenis?.start();
    };
  }, [lenis]);

  // Focus trap — cycle Tab/Shift+Tab within the modal
  useEffect(() => {
    if (!modalRef.current) return;

    // Focus the modal wrapper itself on mount so screen readers announce it
    modalRef.current.focus();

    const FOCUSABLE = [
      'a[href]',
      'button:not([disabled])',
      'textarea',
      'input',
      'select',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    const handleTrap = (e) => {
      if (e.key !== 'Tab') return;

      const focusable = Array.from(modalRef.current.querySelectorAll(FOCUSABLE));
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleTrap);
    return () => window.removeEventListener('keydown', handleTrap);
  }, []);

  // Click outside
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) handleClose();
  };

  if (!project) return null;

  // Placeholder visual renderer based on visualType
  const renderVisualArea = () => {
    return (
      <div className="w-full h-48 sm:h-64 bg-[#0f1117] rounded-xl border border-[#1e2638] flex items-center justify-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5" />
        <div className="text-center relative z-10">
          <span className="text-4xl block mb-3 opacity-60 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-110 transform">
            {project.visualType === 'website' ? '🌐' : project.visualType === 'reports' ? '📊' : '💻'}
          </span>
          <p className="text-slate-500 text-sm font-medium uppercase tracking-widest">
            {project.visualType === 'website' ? 'Web Interface' : project.visualType === 'reports' ? 'Data & Reports' : 'Console Architecture'}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-[#0f1117]/80 flex items-center justify-center p-4 sm:p-6 overscroll-contain"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="relative flex flex-col w-full max-w-4xl max-h-[90vh] sm:max-h-[85vh] bg-[#161b27] border border-[#1e2638] rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] outline-none overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        tabIndex={-1}
      >
        {/* 1. Modal Header */}
        <div className="flex items-start justify-between p-6 md:p-8 border-b border-[#1e2638]">
          <div className="pr-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{project.title}</h2>
            <p className="text-slate-400 text-base md:text-lg">{project.tagline}</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2.5 rounded-xl text-slate-400 bg-[#0f1117] border border-[#1e2638] hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all duration-200 flex-shrink-0"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body Content - Scrollable */}
        <div className="p-6 md:p-8 flex flex-col gap-6 md:gap-8 flex-1 overflow-y-auto">
          
          {/* 2. Visual Section */}
          {renderVisualArea()}

          {/* 3. Project Overview */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-indigo-400 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              Overview
            </h3>
            <p className="text-slate-300 text-base leading-relaxed">{project.description}</p>
          </div>

          {/* 4. Problem -> Solution -> Outcome */}
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {[
              { label: 'Problem', value: project.problem, color: 'rose' },
              { label: 'Solution', value: project.solution, color: 'indigo' },
              { label: 'Outcome', value: project.outcome, color: 'emerald' },
            ].map(({ label, value, color }) => (
              <div key={label} className={`p-5 rounded-2xl bg-${color}-500/5 border border-${color}-500/15`}>
                <span className={`text-xs font-bold uppercase tracking-widest text-${color}-400 mb-2 block`}>{label}</span>
                <p className="text-slate-300 text-sm leading-relaxed">{value}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* 5. Key Features */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-indigo-400 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                Key Features
              </h3>
              <ul className="flex flex-col gap-3">
                {project.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-slate-300 text-sm">
                    <span className="text-emerald-400 font-bold mt-0.5 flex-shrink-0">✓</span>
                    <span className="leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 7. Role & Ownership */}
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-indigo-400 mb-0 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                Execution context
              </h3>
              <div className="p-5 rounded-2xl bg-[#0f1117] border border-[#1e2638] flex flex-col gap-3">
                <div className="flex justify-between items-start border-b border-[#1e2638]/60 pb-3">
                  <span className="text-slate-500 text-sm font-medium">Role</span>
                  <span className="text-white text-sm font-semibold text-right">{project.role}</span>
                </div>
                <div className="flex justify-between items-start border-b border-[#1e2638]/60 pb-3">
                  <span className="text-slate-500 text-sm font-medium">Ownership</span>
                  <span className="text-white text-sm font-semibold text-right">{project.ownership}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-slate-500 text-sm font-medium">Responsibilities</span>
                  <span className="text-white text-sm text-right pl-4 leading-relaxed">{project.responsibilities}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 6. Tech Stack (Grouped) */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-indigo-400 mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              Technology Used
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {Object.entries(project.groupedTech).map(([groupName, techList]) => (
                <div key={groupName}>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 bg-[#0f1117] inline-block px-2 py-1 rounded-md border border-[#1e2638]">
                    {groupName}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {techList.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded text-xs font-medium bg-white/5 border border-white/10 text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 8. Modal CTA Buttons */}
        <div className="px-6 md:px-8 py-5 border-t border-[#1e2638] flex flex-wrap items-center gap-4 bg-[#0a0d13] rounded-b-2xl">
          {project.live && (
            <div ref={liveBtnRef}>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </a>
            </div>
          )}
          {project.github && (
            <div ref={githubBtnRef}>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium border border-[#1e2638] bg-[#161b27] text-slate-300 hover:text-white hover:border-indigo-500/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
            </div>
          )}
          <button
            onClick={handleClose}
            className="ml-auto px-6 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-[#161b27] text-sm font-medium transition-colors duration-200"
          >
            ❌ Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
