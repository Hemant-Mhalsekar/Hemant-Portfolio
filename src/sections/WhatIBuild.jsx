import React, { useEffect, useState } from 'react';
import { useScrollReveal, PREFERS_REDUCED } from '../hooks/useScrollReveal';

// ── Data ───────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    name: 'Veyra',
    oneLiner:
      'A full e-commerce platform for a Kuwait-based food brand — started as a bilingual pre-launch landing page, grew into the complete storefront.',
    tags: ['React', 'Node.js', 'MongoDB'],
    link: 'https://verya-launch.netlify.app/',
  },
  {
    name: 'Real-Time AI Surveillance System',
    oneLiner:
      'Watches live video and flags loitering, running, or intrusion, combining rule-based heuristics with a trained classifier.',
    tags: ['Python', 'YOLOv8', 'Flask'],
    link: 'https://real-time-ai-surveillance-system.onrender.com/',
  },
  {
    name: 'TaskPilot',
    oneLiner:
      'A Kanban board that ranks your tasks by urgency and breaks them into subtasks using an LLM.',
    tags: ['MERN', 'Socket.io', 'Groq'],
    link: 'https://taskpilot-task-manager.netlify.app/login',
  },
  {
    name: 'CO-PO Mapper',
    oneLiner:
      'Replaced a manual Excel process for academic outcome reporting — entirely in-browser, zero backend.',
    tags: ['React', 'Zustand', 'SheetJS'],
    link: 'https://co-po-pos-mapping.netlify.app/',
  },
  {
    name: 'Shortify',
    oneLiner:
      'A URL shortener with Google sign-in, click tracking, and a rate-limited API, built on Spring Boot.',
    tags: ['Java', 'Spring Boot', 'MySQL'],
    link: 'https://shortify-url-shortener-alpha.vercel.app/',
  },
  {
    name: 'Library Management System',
    oneLiner:
      'A console-based library system in Java and MySQL — book issuing, returns, and a fine engine that actually enforces a grace period.',
    tags: ['Java', 'MySQL', 'JDBC'],
    link: 'https://github.com/Hemant-Mhalsekar/Library-Management-System',
  },
];


// ── Project Card ───────────────────────────────────────────────────────────────
// Hover state managed via Tailwind `group` — no JS state per card needed.
const ProjectCard = ({ project }) => (
  <div className="group bg-[#F1ECDD] border border-[#39471F]/30 p-7 rounded-[8px] flex flex-col h-full hover:border-[#DE9F2E] transition-colors duration-200">

    {/* Content area — grows to push link to bottom */}
    <div className="flex-1">
      <h3
        className="text-[#15180F] leading-[1.15]"
        style={{
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontSize: '1.375rem',
          fontWeight: 700,
        }}
      >
        {project.name}
      </h3>

      <p
        className="text-[#3A3D2F] mt-[10px]"
        style={{
          fontFamily: "'Work Sans', sans-serif",
          fontSize: '0.9375rem',
          lineHeight: 1.55,
        }}
      >
        {project.oneLiner}
      </p>

      {/* Tag pills — outlined mustard, no fill */}
      <div className="flex flex-wrap gap-2 mt-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="border border-[#DE9F2E]/60 text-[#DE9F2E] px-2.5 py-[4px] rounded-[4px] hover:scale-[1.03] hover:border-[#DE9F2E] transition-all duration-150 motion-reduce:transition-none cursor-default"
            style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10.5px', lineHeight: 1 }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>

    {/* View link — pinned to card bottom, arrow translates on parent hover */}
    <div className="mt-5 pt-4 border-t border-[#39471F]/10">
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#39471F] tracking-[0.12em] uppercase flex items-center gap-1.5 w-fit"
        style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px' }}
        aria-label={`View ${project.name}`}
      >
        View project
        {/* Arrow translates 4px on group (card) hover */}
        <span
          className="inline-block transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        >
          →
        </span>
      </a>
    </div>
  </div>
);

// ── Down Chevron ───────────────────────────────────────────────────────────────
const ChevronDown = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 11 11"
    fill="none"
    aria-hidden="true"
    className="flex-shrink-0"
  >
    <path
      d="M2 3.5L5.5 7.5L9 3.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const WhatIBuild = () => {
  const { sectionRef, isVisible: sectionVisible, fadeUp } = useScrollReveal(0.08);

  // Extra card reveal: tracks which of indices 3-5 are faded in
  const [showAll,       setShowAll]       = useState(false);
  const [revealedExtras, setRevealedExtras] = useState(new Set());

  // ── "See more" handler ──────────────────────────────────────────────────────
  const handleSeeMore = () => {
    setShowAll(true); // renders extra cards at opacity 0 in first commit

    if (PREFERS_REDUCED) {
      setRevealedExtras(new Set([3, 4, 5]));
      return;
    }

    // Stagger: extra cards fade in at 0ms, 100ms, 200ms after render
    const timeouts = [];
    [3, 4, 5].forEach((idx, order) => {
      const t = setTimeout(() => {
        setRevealedExtras((prev) => new Set([...prev, idx]));
      }, order * 100);
      timeouts.push(t);
    });

    // Store for cleanup if component unmounts mid-reveal
    return () => timeouts.forEach(clearTimeout);
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className="bg-[#F1ECDD] border-t border-[#3A3D2F]/10"
    >
      <div className="container-max px-6 sm:px-10 lg:px-16 py-16 sm:py-20 lg:py-24">

        {/* ── Section header ─────────────────────────────────────────────── */}
        <div className="mb-12 sm:mb-16">

          {/* Eyebrow — fade + up 16px, 0ms */}
          <div
            className="flex items-center gap-3 mb-5"
            style={fadeUp(0, 500, 16)}
          >
            <span aria-hidden="true" className="flex-shrink-0 w-px h-[18px] bg-[#39471F]/55" />
            <p
              className="text-[11px] text-[#39471F] tracking-[0.22em] uppercase"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              // what i build
            </p>
          </div>

          {/* Heading — fade + up 20px, 110ms */}
          <h2
            className="font-black text-[#15180F] leading-[1.05] tracking-tight"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: 'clamp(2rem, 3.5vw, 2.5rem)',
              ...fadeUp(110, 550, 20),
            }}
          >
            A running list of things I've shipped
          </h2>
        </div>

        {/* ── Project grid ──────────────────────────────────────────────── */}
        {/* 1 col → 2 col (sm) → 3 col (lg). Extra cards (idx≥3) are
            conditionally rendered; they start at opacity:0 and fade in
            via staggered timeouts after the "see more" click. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => {
            const isExtra = i >= 3;
            if (isExtra && !showAll) return null; // not yet in DOM

            const isRevealed = !isExtra || revealedExtras.has(i);

            return (
              <div
                key={i}
                className="h-full"
                style={{
                  opacity:    isExtra ? (isRevealed ? 1 : 0) : 1,
                  transition: isExtra && !PREFERS_REDUCED
                    ? 'opacity 350ms ease'
                    : 'none',
                }}
              >
                <ProjectCard project={project} />
              </div>
            );
          })}
        </div>

        {/* ── "See more" trigger ─────────────────────────────────────────── */}
        {!showAll && (
          <div className="mt-10 sm:mt-12 flex justify-center">
            <button
              onClick={handleSeeMore}
              className="text-[#39471F] tracking-[0.15em] uppercase flex items-center gap-2 hover:opacity-60 transition-opacity duration-200"
              style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px' }}
            >
              See more projects
              <ChevronDown />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default WhatIBuild;
