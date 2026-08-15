import React, { useRef, useEffect, useState } from 'react';

const PREFERS_REDUCED =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const EXPERIENCE_DATA = [
  {
    role: "Freelance Full Stack Developer — VEYRA",
    date: "Nov 2025 – Jan 2026",
    description: "Built a full stack e-commerce platform with React, Tailwind, Node and Express, product catalog, dynamic forms, JWT auth, MongoDB backend. Integrated Stripe end to end, checkout through order confirmation. Delivered on a compressed timeline while the client's requirements kept shifting, and handled domain and hosting setup myself. Storefront pages held a Lighthouse score above 75."
  },
  {
    role: "Web Developer Intern — Dnyanprassarak Mandal's College",
    date: "Oct 2023 – Dec 2023",
    description: "Built CO-PO Mapper, a faculty tool covering course setup, Excel roster upload, marks entry, CO-PO correlation mapping, and print-ready reports, using React and Zustand. Replaced a manual Excel process used across 8+ courses a semester, cutting reporting effort by an estimated 70%."
  },
  {
    role: "Web Developer Intern — HDSOFT Technologies",
    date: "Jul 2022 – Apr 2023",
    description: "Part of a two-person team building SETU HRM, an employee management system, under close mentorship. Built frontend components in React and Tailwind, wired them to backend APIs, and worked with PostgreSQL and Express on the data side. Wireframed the whole thing in Figma before any of it got built."
  }
];

const Experience = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(PREFERS_REDUCED);
  const [openItems, setOpenItems] = useState(new Set()); // allows multiple open

  useEffect(() => {
    if (PREFERS_REDUCED || !sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.2 } // Trigger when a bit more of the section is visible
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleItem = (index) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const fadeUp = (delay, duration = 600, ty = 24) => ({
    opacity:    isVisible ? 1 : 0,
    transform:  isVisible ? 'translateY(0)' : `translateY(${ty}px)`,
    transition: PREFERS_REDUCED
      ? 'none'
      : `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="bg-[#15180F] border-t border-[#F1ECDD]/10"
    >
      <div className="container-max px-6 sm:px-10 lg:px-16 py-20 sm:py-24 lg:py-32">
        
        {/* ── Top Block: Eyebrow + Heading ────────────────────────────────────────── */}
        <div className="mb-14 sm:mb-20">
          <div
            className="flex items-center gap-3 mb-5"
            style={fadeUp(0, 500, 16)}
          >
            <span aria-hidden="true" className="flex-shrink-0 w-px h-[18px] bg-[#DE9F2E]/45" />
            <p
              className="text-[11px] text-[#DE9F2E] tracking-[0.22em] uppercase"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              // experience
            </p>
          </div>

          <h2
            className="font-black leading-[1.0] tracking-tight text-[#F1ECDD]"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize:   'clamp(2rem, 4vw, 3rem)',
              ...fadeUp(100, 550, 20),
            }}
          >
            Where I've worked
          </h2>
        </div>

        {/* ── Vertical Timeline ───────────────────────────────────────────────────── */}
        <div className="relative pl-6 sm:pl-10">
          
          {/* Connecting Vertical Line (Animated Draw Down) */}
          <div
            className="absolute top-2 left-[5px] sm:left-[7px] w-px bg-[#F1ECDD]/20 origin-top"
            style={{
              height: 'calc(100% - 24px)', // Leave room at the bottom
              transform: isVisible ? 'scaleY(1)' : 'scaleY(0)',
              transition: PREFERS_REDUCED ? 'none' : 'transform 1000ms cubic-bezier(0.16, 1, 0.3, 1) 300ms',
            }}
            aria-hidden="true"
          />

          <div className="flex flex-col gap-12 sm:gap-16">
            {EXPERIENCE_DATA.map((item, index) => {
              const isOpen = openItems.has(index);
              const delay = 350 + (index * 150); // Stagger relative to line drawing

              return (
                <div
                  key={index}
                  className="relative group cursor-pointer"
                  onClick={() => toggleItem(index)}
                  style={fadeUp(delay, 600, 24)}
                >
                  {/* Timeline Node */}
                  <div
                    className="absolute top-1.5 -left-6 sm:-left-10 w-3 h-3 rounded-full border-2 border-[#DE9F2E] bg-[#15180F] z-10"
                    style={{
                      transform: isVisible ? 'scale(1)' : 'scale(0)',
                      transition: PREFERS_REDUCED ? 'none' : `transform 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275) ${delay + 100}ms`
                    }}
                    aria-hidden="true"
                  />

                  {/* Date & Toggle */}
                  <div className="flex items-center gap-4 mb-2">
                    <span
                      className="text-[#DE9F2E] text-sm uppercase tracking-wide"
                      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                      {item.date}
                    </span>
                  </div>

                  {/* Role Header */}
                  <div className="flex items-baseline justify-between gap-4">
                    <h3
                      className="text-[#F1ECDD] leading-tight pr-4"
                      style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontSize: 'clamp(1.3rem, 2.5vw, 1.6rem)'
                      }}
                    >
                      {item.role}
                    </h3>
                    <span
                      className="text-[#DE9F2E] text-[12px] flex-shrink-0 transition-colors duration-200"
                      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                      {isOpen ? '- close' : '+ details'}
                    </span>
                  </div>

                  {/* Accordion Body */}
                  <div
                    className={`grid transition-all duration-400 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] mt-4 opacity-100' : 'grid-rows-[0fr] mt-0 opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p
                        className="text-[#CBD3B8] leading-relaxed max-w-[65ch]"
                        style={{
                          fontFamily: "'Work Sans', sans-serif",
                          fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
                        }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Experience;
