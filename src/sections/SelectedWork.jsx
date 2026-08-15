import React, { useRef, useEffect, useState } from 'react';

const PREFERS_REDUCED =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── Project data ───────────────────────────────────────────────────────────────
// problem / built / learned copy is verbatim — do not paraphrase or shorten.
const PROJECTS = [
  {
    id:   '01',
    name: 'Veyra',
    tags: ['react', 'node.js', 'express', 'mongodb', 'jwt', 'cloudinary'],
    link: 'https://verya-launch.netlify.app/',
    hook: 'Built a bilingual e-commerce platform for a Kuwaiti brand, then hit the wall between local and production.',
    problem:
      "A food brand entering the Kuwaiti market needed to go from nothing to a working e-commerce presence, build brand awareness before launch, then be ready to actually sell product once it dropped. In that market, bilingual (English/Arabic) and mobile-first aren't optional.",
    built:
      "Started with a bilingual pre-launch landing page: automatic Arabic/English switching based on browser language and Gulf timezone detection, RTL layout handling, a persistent countdown timer, and lead capture straight into a spreadsheet so the client didn't need backend infrastructure just to collect signups. From there I built the full e-commerce platform, React and Vite frontend, Node and Express backend, MongoDB Atlas, JWT auth, Cloudinary for product media. The build is complete. Launch is currently on hold pending the client's business paperwork, which is out of my hands but worth being upfront about.",
    learned:
      "Real users don't behave like local testing. In production I hit 429 errors from rate limiting that never showed up locally, caused by express-rate-limit configuration that was fine in dev but too aggressive under real traffic. Fixing it meant actually understanding how React 18's Strict Mode double-invocation behaves differently in development versus production, instead of just patching around the symptom. That's the gap between a project that works on your machine and one that has to hold up for a real client.",
  },
  {
    id:   '02',
    name: 'Real-Time AI Surveillance System',
    tags: ['python', 'yolov8', 'bytetrack', 'opencv', 'pytorch', 'scikit-learn', 'flask'],
    link: 'https://real-time-ai-surveillance-system.onrender.com/',
    hook: "Started with a hunch that a hotel's camera system wasn't smart enough. Ended up training my own classifier.",
    problem:
      "I saw a hotel's surveillance setup that only tracked where people were, with no sense of what they were actually doing. Someone loitering somewhere they shouldn't looked identical to normal foot traffic on that system. That gap felt worth building on.",
    built:
      "A computer vision pipeline that tracks people across frames with ByteTrack and analyzes their movement over a 10-second sliding window, speed, stillness, displacement, to classify what they're doing: normal movement, loitering, running, or intrusion into a restricted area. I started with rule-based heuristics to get it working, then trained a Random Forest classifier on the motion features once I had enough labeled behavior data to make that worth doing. It also does secondary detection for weapons and abandoned bags, with a heuristic for theft when a tracked bag disappears while someone's nearby. It runs as either a CLI tool or a multi-threaded Flask dashboard, three threads split across capture, YOLO inference, and logging so the video feed never stalls.",
    learned:
      "Starting rule-based first, then upgrading to a trained model, taught me when machine learning is actually worth the complexity. The rules got me a working system fast, but couldn't hold up to real variation in how people move. The classifier only made sense once I had real data to train it on; reaching for ML before you have that is usually premature. I also learned the practical side of running inference continuously: memory leaks are real in long-running video processing, which is why the system actively monitors and garbage-collects instead of just running until it falls over.",
  },
  {
    id:   '03',
    name: 'TaskPilot',
    tags: ['react', 'node.js', 'express', 'mongodb', 'socket.io', 'groq'],
    link: 'https://taskpilot-task-manager.netlify.app/login',
    hook: 'Built a Kanban board that thinks about priority for you, then ran into a hard limit of serverless hosting.',
    problem:
      "Kanban boards are everywhere, but most of them just move cards around. They don't help you figure out what actually matters right now. I wanted to see what a task manager looks like if an LLM does some of that thinking instead of leaving it all on the user.",
    built:
      "A full MERN Kanban board with drag-and-drop across To Do, In Progress, and Done, and real-time sync across open tabs via Socket.io. On top of that, three AI workflows running on Groq's Llama 3.3: one ranks incomplete tasks by actual urgency instead of just due date, one takes a task title and breaks it into five concrete subtasks, and a focus mode picks the top three tasks for the day and runs a countdown session. Auth is JWT-based, and the token lives in memory instead of localStorage specifically to reduce XSS exposure.",
    learned:
      "Real-time sync doesn't survive every hosting environment. Locally, Socket.io keeps every open tab in sync instantly. On Vercel, it doesn't work the same way in production, because serverless functions don't hold a persistent connection the way WebSockets need. That's not a bug I fixed, it's a real constraint of serverless architecture, and it taught me to actually check what a hosting platform supports before assuming a feature will carry over from local to production.",
  },
  {
    id:   '04',
    name: 'CO-PO Mapper',
    tags: ['react', 'zustand', 'sheetjs', 'react-to-print'],
    link: 'https://co-po-pos-mapping.netlify.app/',
    hook: 'Built a tool with no backend on purpose, because for this one, the constraint was the whole point.',
    problem:
      "Engineering colleges have to report Course Outcome and Program Outcome attainment for NBA accreditation, and most departments were doing it by hand in Excel: one spreadsheet per course, formulas prone to breaking, no consistent format, and a lot of faculty time lost every semester.",
    built:
      "A guided, step-by-step tool that walks a faculty member through the whole process: define course details and outcomes, import the student roster straight from an Excel file, enter CIE and SEE marks, and the attainment engine calculates direct and indirect attainment levels and CO-PO correlation matrices automatically, then exports a formatted PDF report. The deliberate decision was zero backend. No server, no database, everything runs in the browser and lives in memory for that session. For a tool handling student grading data, that's not a limitation, it's the point: no server means no infrastructure cost, no data leaving the user's machine, and it can be used offline or on a restricted network without setup.",
    learned:
      "Building something with zero backend forces different discipline than a normal web app. There's no server to fall back on if the client-side logic has a bug, so the calculation engine and the Excel parsing had to be right the first time. It also changed how I thought about state: everything lives in one global store instead of being scattered across components, which made the whole data pipeline easier to reason about, but meant getting the store structure right upfront actually mattered.",
  },
  {
    id:   '05',
    name: 'Shortify',
    tags: ['java', 'spring boot', 'mysql', 'spring security', 'jwt'],
    link: 'https://shortify-url-shortener-alpha.vercel.app/',
    hook: 'Wanted to actually learn Spring Boot, not just use it for DSA. This is what came out of it.',
    problem:
      "I wanted a project that actually forced me to work in Java and Spring Boot properly, not just as a side language for DSA. A URL shortener is a small enough scope to build fully, but has enough real pieces, auth, rate limiting, redirects at scale, to actually learn from instead of just checking a box.",
    built:
      "A full-stack shortener with Google OAuth sign-in, custom short codes or aliases, optional link expiration, and a dashboard showing click counts per link. The backend runs on Spring Boot with stateless JWT authentication, and every request is rate-limited with Bucket4j so the API can't get hammered. Deployed as a containerized Spring Boot backend on Render, MySQL on Clever Cloud, React frontend on Vercel.",
    learned:
      "Rate limiting sounds simple until you actually implement it. I used an in-memory token bucket instead of reaching for Redis, since a single-instance app doesn't need a distributed store, and adding one would've been complexity for its own sake. That was a real lesson in matching the tool to the actual scale of the problem, not the scale you imagine you'll eventually have. Getting OAuth working end to end, from Google's redirect back to a signed JWT the frontend can actually use, also taught me more about how authentication flows really work than any tutorial did.",
  },
];

const STORY = [
  { label: 'The problem',  key: 'problem' },
  { label: 'What I built', key: 'built'   },
  { label: 'What I learned', key: 'learned' },
];

// ── ProjectBlock ───────────────────────────────────────────────────────────────
// Manages its own scroll-entrance visibility (IntersectionObserver).
// Receives isExpanded + onToggle from the parent for accordion coordination.
// Height animation uses grid-template-rows: 0fr → 1fr trick so the transition
// works smoothly without a hardcoded max-height guess.
const ProjectBlock = ({ project, index, isExpanded, onToggle }) => {
  const blockRef = useRef(null);
  const [visible, setVisible] = useState(PREFERS_REDUCED);

  useEffect(() => {
    if (PREFERS_REDUCED || !blockRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.06 }
    );

    observer.observe(blockRef.current);
    return () => observer.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    // Full-width strip — background bleeds edge-to-edge; subtle divider between blocks
    <div
      ref={blockRef}
      style={{
        backgroundColor: isEven ? 'rgba(57,71,31,0.18)' : 'transparent',
        borderTop:  '1px solid rgba(203,211,184,0.07)',
        opacity:    visible ? 1 : 0,
        transform:  visible ? 'translateY(0)' : 'translateY(24px)',
        transition: PREFERS_REDUCED
          ? 'none'
          : 'opacity 500ms ease, transform 500ms ease',
      }}
    >
      <div className="container-max px-6 sm:px-10 lg:px-16">

        {/* ── Clickable header — whole row toggles accordion ──────────── */}
        {/* <button> wraps collapsed content only (NOT the expanded story).
            The view-project <a> inside the expanded area is a sibling div,
            so there's no nested interactive-element conflict. */}
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isExpanded}
          aria-controls={`story-${project.id}`}
          className="w-full text-left py-10 sm:py-12 group"
          style={{ cursor: 'pointer', background: 'none', border: 'none', padding: '2.5rem 0' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[140px_1fr] gap-x-8 gap-y-3">

            {/* Index label */}
            <div className="lg:pt-[0.55rem]">
              <span
                className="text-[#DE9F2E] tracking-[0.22em]"
                style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px' }}
              >
                {project.id}
              </span>
            </div>

            {/* Name — tags — hook — toggle */}
            <div>
              {/* Project name */}
              <h3
                className="text-[#CBD3B8] tracking-tight leading-[0.95]"
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontSize:   'clamp(2.5rem, 5vw, 3.5rem)',
                  fontWeight: 800,
                }}
              >
                {project.name}
              </h3>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-[#DE9F2E] text-[#DE9F2E] px-2.5 py-[4px] rounded-[4px]"
                    style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10.5px', lineHeight: 1 }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* One-line hook */}
              <p
                className="text-[#CBD3B8] mt-4 max-w-[62ch]"
                style={{ fontFamily: "'Work Sans', sans-serif", fontSize: '16px', lineHeight: 1.6 }}
              >
                {project.hook}
              </p>

              {/* Expand / collapse control */}
              <div className="mt-4">
                <span
                  className="text-[#DE9F2E] tracking-[0.14em] uppercase"
                  style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px' }}
                >
                  {isExpanded ? '− Close' : '+ Read the story'}
                </span>
              </div>
            </div>
          </div>
        </button>

        {/* ── Animated expanded content ─────────────────────────────────── */}
        {/* grid-template-rows: 0fr → 1fr is the smoothest height-transition
            technique: no max-height guessing, no abrupt snapping.
            Inner div needs overflow:hidden + min-height:0 to collapse. */}
        <div
          id={`story-${project.id}`}
          role="region"
          aria-labelledby={`header-${project.id}`}
          style={{
            display:          'grid',
            gridTemplateRows: isExpanded ? '1fr' : '0fr',
            transition:       PREFERS_REDUCED ? 'none' : 'grid-template-rows 450ms ease',
          }}
        >
          <div style={{ overflow: 'hidden', minHeight: 0 }}>

            {/* Story content — shown only when expanded */}
            <div className="pb-12 sm:pb-14 lg:pb-16">

              {/* Three-part story: each pair is its own 2-col grid */}
              <div className="flex flex-col gap-8 sm:gap-10">
                {STORY.map(({ label, key }) => (
                  <div
                    key={key}
                    className="grid grid-cols-1 lg:grid-cols-[140px_1fr] gap-x-8 gap-y-2"
                  >
                    {/* Mono label */}
                    <div className="lg:pt-[3px]">
                      <span
                        className="text-[#DE9F2E] tracking-[0.18em] uppercase"
                        style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px' }}
                      >
                        {label}
                      </span>
                    </div>

                    {/* Body copy */}
                    <p
                      className="text-[#CBD3B8]"
                      style={{
                        fontFamily: "'Work Sans', sans-serif",
                        fontSize:   '16.5px',
                        lineHeight: 1.72,
                      }}
                    >
                      {project[key]}
                    </p>
                  </div>
                ))}
              </div>

              {/* View project link — empty first cell aligns with content column */}
              <div className="mt-10 grid grid-cols-1 lg:grid-cols-[140px_1fr] gap-x-8">
                <div className="hidden lg:block" aria-hidden="true" />
                <div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#DE9F2E] tracking-[0.12em] uppercase flex items-center gap-1.5 w-fit hover:opacity-60 transition-opacity duration-200"
                    style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px' }}
                    aria-label={`View ${project.name}`}
                  >
                    View project
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── SelectedWork Section ───────────────────────────────────────────────────────
const SelectedWork = () => {
  const sectionRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(PREFERS_REDUCED);

  // expandedId — which project's story is currently open (null = all closed)
  // Accordion: opening one automatically closes the previously open one.
  const [expandedId, setExpandedId] = useState(null);

  const handleToggle = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  // Section-level observer — drives the section header entrance only.
  // Each ProjectBlock manages its own observer independently.
  useEffect(() => {
    if (PREFERS_REDUCED || !sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setHeaderVisible(true);
        observer.disconnect();
      },
      { threshold: 0.05 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const fadeUp = (delay, duration = 550, ty = 20) => ({
    opacity:    headerVisible ? 1 : 0,
    transform:  headerVisible ? 'translateY(0)' : `translateY(${ty}px)`,
    transition: PREFERS_REDUCED
      ? 'none'
      : `opacity ${duration}ms ease ${delay}ms, transform ${duration}ms ease ${delay}ms`,
  });

  return (
    <section
      id="selected-work"
      ref={sectionRef}
      className="bg-[#15180F]"
    >
      {/* ── Section header ─────────────────────────────────────────────── */}
      <div className="container-max px-6 sm:px-10 lg:px-16 pt-16 sm:pt-20 lg:pt-24 pb-2">

        {/* Eyebrow */}
        <div
          className="flex items-center gap-3 mb-5"
          style={fadeUp(0, 500, 16)}
        >
          <span aria-hidden="true" className="flex-shrink-0 w-px h-[18px] bg-[#DE9F2E]/45" />
          <p
            className="text-[11px] text-[#DE9F2E] tracking-[0.22em] uppercase"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            // selected work
          </p>
        </div>

        {/* Heading */}
        <h2
          className="font-black leading-[1.0] tracking-tight text-[#CBD3B8]"
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize:   'clamp(2rem, 3.5vw, 2.5rem)',
            ...fadeUp(110, 550, 20),
          }}
        >
          Five projects, told properly
        </h2>
      </div>

      {/* ── Project blocks ─────────────────────────────────────────────── */}
      {PROJECTS.map((project, i) => (
        <ProjectBlock
          key={project.id}
          project={project}
          index={i}
          isExpanded={expandedId === project.id}
          onToggle={() => handleToggle(project.id)}
        />
      ))}

      {/* Bottom breathing room */}
      <div className="pb-8 sm:pb-12" />
    </section>
  );
};

export default SelectedWork;
