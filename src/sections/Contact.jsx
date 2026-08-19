import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const SOCIAL_LINKS = [
  { id: 'email', label: <>Say hi <span className="opacity-60 text-[12px] ml-1.5 tracking-wide">(Email)</span></>, href: 'mailto:hemantmhalsekar1@gmail.com' },
  { id: 'linkedin', label: 'LinkedIn, if you must', href: 'https://www.linkedin.com/in/hemant-mhalsekar-464a50244/' },
  { id: 'github', label: <>See the code <span className="opacity-60 text-[12px] ml-1.5 tracking-wide">(GitHub)</span></>, href: 'https://github.com/Hemant-Mhalsekar' },
  { id: 'resume', label: <>Grab the resume <span className="opacity-60 text-[12px] ml-1.5 tracking-wide">(PDF)</span></>, href: '/resume.pdf', isDownload: true }
];

const PREFERS_REDUCED =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const Contact = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(PREFERS_REDUCED);

  const formRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (PREFERS_REDUCED || !sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.15 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setLoading(true);
    setSuccess(false);
    setError(false);

    emailjs.sendForm(
      import.meta.env.VITE_EMAIL_SERVICE_ID,
      import.meta.env.VITE_EMAIL_TEMPLATE_ID,
      formRef.current,
      import.meta.env.VITE_EMAIL_PUBLIC_KEY,
    ).then(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    }).catch(() => {
      setLoading(false);
      setError(true);
      setTimeout(() => setError(false), 5000);
    });
  };

  const fadeUp = (delay = 0, duration = 550, ty = 20) => ({
    opacity:    isVisible ? 1 : 0,
    transform:  isVisible ? 'translateY(0)' : `translateY(${ty}px)`,
    transition: PREFERS_REDUCED
      ? 'none'
      : `opacity ${duration}ms ease ${delay}ms, transform ${duration}ms ease ${delay}ms`,
  });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-[#15180F] border-t border-[#F1ECDD]/10"
    >
      <div className="container-max px-6 sm:px-10 lg:px-16 py-20 sm:py-24 lg:py-32">
        
        {/* ── Top Block ─────────────────────────────────────────────────────────── */}
        <div className="mb-16 lg:mb-20">
          <div
            className="flex items-center gap-3 mb-6"
            style={fadeUp(0, 500, 16)}
          >
            <span aria-hidden="true" className="flex-shrink-0 w-px h-[18px] bg-[#DE9F2E]/45" />
            <p
              className="text-[11px] text-[#DE9F2E] tracking-[0.22em] uppercase"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              // let's talk
            </p>
          </div>

          <h2
            className="relative w-fit font-black leading-[1.0] tracking-tight text-[#F1ECDD] mb-6"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: 'clamp(2.5rem, 4.5vw, 3.75rem)',
              ...fadeUp(100, 550, 20),
            }}
          >
            Have something<br className="hidden sm:block" /> worth building?
            
            <span
              className="absolute -top-6 -right-8 sm:-right-12 bg-[#DE9F2E] text-[#39471F] uppercase tracking-wider font-semibold rounded-sm"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '12px',
                padding: '6px 14px',
                transform: 'rotate(-3deg)',
              }}
            >
              say hi
            </span>
          </h2>

          <p
            className="text-[#CBD3B8] leading-[1.72]"
            style={{
              fontFamily: "'Work Sans', sans-serif",
              fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
              maxWidth: '50ch',
              ...fadeUp(200, 550, 20),
            }}
          >
            I'm currently looking for full-time software development roles, and open 
            to freelance work in the meantime. If either sounds like a fit, reach out.
          </p>
        </div>

        {/* ── Two Column Layout ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left: Form */}
          <div style={fadeUp(350, 600, 24)}>
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              <div className="flex flex-col gap-2">
                <label 
                  htmlFor="name" 
                  className="text-[#CBD3B8] text-[12px] uppercase tracking-wider"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-transparent border border-[#39471F] text-[#F1ECDD] rounded-[6px] px-4 py-3 text-sm focus:outline-none focus:border-[#DE9F2E] transition-colors duration-300"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label 
                  htmlFor="email" 
                  className="text-[#CBD3B8] text-[12px] uppercase tracking-wider"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-transparent border border-[#39471F] text-[#F1ECDD] rounded-[6px] px-4 py-3 text-sm focus:outline-none focus:border-[#DE9F2E] transition-colors duration-300"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label 
                  htmlFor="message" 
                  className="text-[#CBD3B8] text-[12px] uppercase tracking-wider"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-transparent border border-[#39471F] text-[#F1ECDD] rounded-[6px] px-4 py-3 text-sm focus:outline-none focus:border-[#DE9F2E] transition-colors duration-300 resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#DE9F2E] text-[#15180F] border border-transparent font-medium px-7 py-3 rounded-[6px] hover:bg-[#d09123] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px' }}
                >
                  {loading ? 'sending...' : 'Send message'}
                </button>
              </div>

              {/* Status Messages */}
              <div className="min-h-[24px]">
                {success && (
                  <p 
                    className="text-[#DE9F2E] text-sm"
                    style={{ fontFamily: "'Work Sans', sans-serif" }}
                  >
                    sent. I'll get back to you soon.
                  </p>
                )}
                {error && (
                  <p 
                    className="text-[#e27e7e] text-sm"
                    style={{ fontFamily: "'Work Sans', sans-serif" }}
                  >
                    something broke. email me directly instead.
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* Right: Direct Links */}
          <div style={fadeUp(450, 600, 24)} className="flex flex-col">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  target={link.id !== 'email' ? '_blank' : undefined}
                  rel={link.id !== 'email' ? 'noopener noreferrer' : undefined}
                  download={link.isDownload ? '' : undefined}
                  className="flex items-center justify-start px-5 py-4 border border-[#DE9F2E] text-[#F1ECDD] hover:bg-[#DE9F2E] hover:text-[#15180F] transition-colors duration-200"
                  style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px' }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="mt-8">
              <p 
                className="text-[#CBD3B8] text-[12px]"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                Open to full-time and freelance work.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
