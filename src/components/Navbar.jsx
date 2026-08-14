import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

// ── Navigation links ───────────────────────────────────────────────────────────
// sectionId = the DOM id to observe / scroll to
const NAV_LINKS = [
  { label: 'Home',    href: '#hero',     sectionId: 'hero'     },
  { label: 'Work',    href: '#projects', sectionId: 'projects' },
  { label: 'About',   href: '#about',    sectionId: 'about'    },
  { label: 'Contact', href: '#contact',  sectionId: 'contact'  },
];

const Navbar = () => {
  const [menuOpen,       setMenuOpen]       = useState(false);
  const [activeSection,  setActiveSection]  = useState('hero');
  const navRef        = useRef(null);
  const mobileMenuRef = useRef(null);

  // ── Entrance animation ──────────────────────────────────────────────────────
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -56, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', delay: 0.1 }
    );
  }, []);

  // ── Active section tracking via IntersectionObserver ───────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-15% 0px -55% 0px', threshold: 0 }
    );

    NAV_LINKS.forEach(({ sectionId }) => {
      const el = document.getElementById(sectionId);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // ── Mobile menu entrance animation ─────────────────────────────────────────
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!mobileMenuRef.current || prefersReduced || !menuOpen) return;
    gsap.fromTo(
      mobileMenuRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out' }
    );
  }, [menuOpen]);

  // ── Body scroll lock while mobile menu is open ──────────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // ── Smooth scroll handler ───────────────────────────────────────────────────
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setMenuOpen(false);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.getElementById(sectionId);
    if (target) {
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 56, // 56px = nav height
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* ── Persistent top bar ─────────────────────────────────────────────── */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 bg-[#F1ECDD] border-b border-[#3A3D2F]/15 h-14"
      >
        <div className="container-max h-full flex items-center justify-between px-6 sm:px-10 lg:px-16">

          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, 'hero')}
            className="text-[11px] tracking-[0.22em] uppercase text-[#3A3D2F] hover:text-[#15180F] transition-colors duration-200"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            hemant.dev
          </a>

          {/* Desktop links */}
          <div
            className="hidden md:flex items-center gap-8"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            {NAV_LINKS.map(({ label, href, sectionId }) => {
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={sectionId}
                  href={href}
                  onClick={(e) => handleNavClick(e, sectionId)}
                  className={`text-[11px] tracking-[0.18em] uppercase pb-px transition-all duration-200 ${
                    isActive
                      ? 'text-[#15180F] font-semibold border-b border-[#15180F]'
                      : 'text-[#3A3D2F] font-medium border-b border-transparent hover:text-[#15180F] hover:border-[#3A3D2F]/40'
                  }`}
                >
                  {label}
                </a>
              );
            })}
          </div>

          {/* Mobile hamburger — thin editorial lines */}
          <button
            className="md:hidden flex flex-col justify-between h-[13px] w-[18px] hover:opacity-60 transition-opacity"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span
              className={`block h-px w-full bg-[#15180F] transition-transform duration-300 origin-center ${
                menuOpen ? 'rotate-45 translate-y-[6px]' : ''
              }`}
            />
            <span
              className={`block h-px w-full bg-[#15180F] transition-opacity duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-px w-full bg-[#15180F] transition-transform duration-300 origin-center ${
                menuOpen ? '-rotate-45 -translate-y-[6px]' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* ── Mobile fullscreen menu ─────────────────────────────────────────── */}
      {menuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-40 bg-[#F1ECDD] flex flex-col justify-center px-8 pt-14"
        >
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map(({ label, href, sectionId }) => {
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={sectionId}
                  href={href}
                  onClick={(e) => handleNavClick(e, sectionId)}
                  className={`py-4 border-b border-[#3A3D2F]/10 transition-colors duration-200 ${
                    isActive ? 'text-[#15180F]' : 'text-[#3A3D2F]/60 hover:text-[#15180F]'
                  }`}
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontSize: '2.6rem',
                    fontWeight: 800,
                    lineHeight: 1,
                  }}
                >
                  {label}
                </a>
              );
            })}
          </nav>

          {/* Subtle footer tag in mobile menu */}
          <p
            className="mt-12 text-[10px] text-[#3A3D2F]/35 tracking-[0.2em] uppercase"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            hemant.dev · 2026
          </p>
        </div>
      )}
    </>
  );
};

export default Navbar;
