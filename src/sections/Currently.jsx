import React from 'react';
import { useScrollReveal, useSectionHeading } from '../hooks/useGsapReveal';

// ── Currently Section ──────────────────────────────────────────────────────────
// A quiet typographic pause between Hero and About.
// No cards, no icons, no grid — just prose doing the work.
const Currently = () => {
  const headingRef = useSectionHeading();     // fade-up on scroll, once
  const contentRef = useScrollReveal(0.15);   // staggered reveal for paragraphs

  return (
    <section
      id="currently"
      className="bg-[#F1ECDD] border-t border-[#3A3D2F]/10"
    >
      <div className="container-max px-6 sm:px-10 lg:px-16 py-16 sm:py-20 lg:py-24">

        {/* ── Heading block ────────────────────────────────────────────────── */}
        <div ref={headingRef} className="mb-10 sm:mb-12">

          {/* Eyebrow — thin olive rule + mono label */}
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

          {/* Section heading */}
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

        {/* ── Body content ─────────────────────────────────────────────────── */}
        {/* useScrollReveal looks for .reveal-target children and staggers them */}
        <div ref={contentRef} className="flex flex-col gap-8">

          {/* Main paragraph — flowing prose, no bullet points */}
          <p
            className="reveal-target text-[17px] sm:text-[18px] text-[#3A3D2F] leading-[1.72]"
            style={{ fontFamily: "'Work Sans', sans-serif", maxWidth: '65ch' }}
          >
            Right now I'm deep in AWS — IAM, S3, EC2 — because a project I'm
            building needed it, and I'd rather actually understand it than just
            know the buzzwords. Alongside that I'm going deeper into React, Node
            and JavaScript, less "make it work," more "understand why it works."
            I've also been grinding DSA in Java, and somewhere in there I ended
            up liking Java more than I expected to, enough that I've got a few
            Spring Boot project ideas I want to build. Next up is TypeScript and
            Next.js. The list never really ends, and I've made peace with that.
          </p>

          {/* Emphasized paragraph — mustard left-border accent */}
          <p
            className="reveal-target text-[17px] sm:text-[18px] text-[#3A3D2F] leading-[1.72] border-l-2 border-[#DE9F2E] pl-5"
            style={{ fontFamily: "'Work Sans', sans-serif", maxWidth: '65ch' }}
          >
            Right now I'm looking for a full-time software development role where
            I can keep building things end to end.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Currently;
