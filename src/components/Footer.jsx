import React, { useState, useEffect } from 'react';

// Nav links mirror Navbar.jsx targets
const NAV_LINKS = [
  { label: 'Home',    sectionId: 'hero'        },
  { label: 'Work',    sectionId: 'work'        },
  { label: 'Process', sectionId: 'how-i-build' },
  { label: 'Contact', sectionId: 'contact'     },
];

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
  else window.scrollTo({ top: 0, behavior: 'smooth' });
};

const formatTime = () => {
  const now = new Date();
  return now.toLocaleTimeString('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  });
};

const Footer = () => {
  const [time, setTime] = useState(formatTime());

  useEffect(() => {
    const id = setInterval(() => setTime(formatTime()), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="bg-[#15180F] border-t border-[#39471F]/40 py-10 md:py-12 w-full">
      <div className="container-max px-6 sm:px-10 lg:px-16">

        {/* ── Top row: left/right split ─────────────────────────────── */}
        <div className="flex flex-col items-center text-center md:flex-row md:items-start md:justify-between md:text-left gap-8 md:gap-0">

          {/* Left column */}
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <h2
              className="text-[#F1ECDD] font-bold text-[22px]"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              Hemant Mhalsekar
            </h2>
            <p
              className="text-[#CBD3B8] opacity-60 text-[12px]"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              Built with React, coffee, and mild sleep deprivation.
            </p>
            {/* Live local time */}
            <p
              className="text-[#CBD3B8] opacity-40 text-[11px]"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              aria-live="polite"
              aria-label="Local time in Bengaluru"
            >
              Bengaluru, IN — {time}
            </p>
          </div>

          {/* Right column — nav links (hidden on small screens, inline row on md+) */}
          <nav aria-label="Footer navigation">
            {/* Desktop: vertical stack */}
            <ul className="hidden md:flex md:flex-row md:items-center gap-4">
              {NAV_LINKS.map(({ label, sectionId }, i) => (
                <React.Fragment key={sectionId}>
                  {i > 0 && (
                    <li aria-hidden="true" className="text-[#CBD3B8] opacity-25 select-none" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px' }}>·</li>
                  )}
                  <li>
                    <button
                      onClick={() => scrollTo(sectionId)}
                      className="text-[#CBD3B8] opacity-40 hover:opacity-100 hover:text-[#DE9F2E] transition-all duration-200"
                      style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    >
                      {label}
                    </button>
                  </li>
                </React.Fragment>
              ))}
            </ul>
            {/* Mobile: horizontal row */}
            <ul className="flex md:hidden flex-row gap-5 justify-center">
              {NAV_LINKS.map(({ label, sectionId }) => (
                <li key={sectionId}>
                  <button
                    onClick={() => scrollTo(sectionId)}
                    className="text-[#CBD3B8] opacity-50 hover:opacity-100 hover:text-[#DE9F2E] transition-all duration-200"
                    style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* ── Bottom strip ──────────────────────────────────────────── */}
        <div className="mt-8 pt-6 border-t border-[#39471F]/25 flex flex-col items-center gap-3 text-center">
          <p
            className="text-[#CBD3B8] opacity-50 text-[12px] max-w-md"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            Designed and built by me. No templates were harmed in the making of this website.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-[#DE9F2E] hover:brightness-125 hover:underline transition-all duration-200"
            style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            aria-label="Back to top"
          >
            $ cd ~/top ↑
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
