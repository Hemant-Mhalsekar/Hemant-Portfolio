import React, { useState } from 'react';
import { useScrollReveal, useSectionHeading } from '../hooks/useGsapReveal';

const SOCIAL_LINKS = [
  {
    label: 'Email',
    value: 'hemantmhalsekar1@gmail.com',
    href: 'mailto:hemantmhalsekar1@gmail.com',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/hemant-mhalsekar-464a50244',
    href: 'https://www.linkedin.com/in/hemant-mhalsekar-464a50244/',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'github.com/Hemant-Mhalsekar',
    href: 'https://github.com/Hemant-Mhalsekar',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: 'Resume',
    value: 'Download PDF',
    href: '/resume.pdf',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
    isDownload: true,
  }
];

const Contact = () => {
  const headingRef = useSectionHeading();
  const containerRef = useScrollReveal(0.15);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setStatus('success');
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container-max">
        {/* Heading */}
        <div ref={headingRef} className="mb-14">
          <h2 className="text-4xl font-bold text-white">Let’s Connect</h2>
          <p className="text-slate-400 mt-4 max-w-2xl text-lg">
            Whether you’re looking to collaborate, discuss an opportunity, or start a project — I’d love to hear from you.
          </p>
        </div>

        <div ref={containerRef} className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Contact form */}
          <div className="reveal-target">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2 relative group">
                <label className="text-slate-400 text-sm font-medium group-focus-within:text-indigo-400 transition-colors" htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="px-4 py-3.5 rounded-xl bg-[#161b27] border border-[#1e2638] text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/70 focus:ring-4 focus:ring-indigo-500/15 focus:bg-[#1a2133] hover:border-[#2a344a] transition-all duration-300 text-sm"
                />
              </div>

              <div className="flex flex-col gap-2 relative group">
                <label className="text-slate-400 text-sm font-medium group-focus-within:text-indigo-400 transition-colors" htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="px-4 py-3.5 rounded-xl bg-[#161b27] border border-[#1e2638] text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/70 focus:ring-4 focus:ring-indigo-500/15 focus:bg-[#1a2133] hover:border-[#2a344a] transition-all duration-300 text-sm"
                />
              </div>

              <div className="flex flex-col gap-2 relative group">
                <label className="text-slate-400 text-sm font-medium group-focus-within:text-indigo-400 transition-colors" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or inquiry..."
                  className="px-4 py-3.5 rounded-xl bg-[#161b27] border border-[#1e2638] text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/70 focus:ring-4 focus:ring-indigo-500/15 focus:bg-[#1a2133] hover:border-[#2a344a] transition-all duration-300 text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="mt-2 px-6 py-3.5 rounded-xl font-medium text-sm bg-indigo-500 text-white hover:bg-indigo-400 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(99,102,241,0.3)] transition-all duration-300 active:scale-[0.98]"
              >
                {status === 'success' ? 'Message Sent' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Right: Direct links */}
          <div className="reveal-target flex flex-col h-full lg:border-l lg:border-[#1e2638] lg:pl-16">
            <div className="flex flex-col gap-4">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.label !== 'Email' ? '_blank' : undefined}
                  rel={link.label !== 'Email' ? 'noopener noreferrer' : undefined}
                  download={link.isDownload ? '' : undefined}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#161b27]/80 border border-transparent hover:border-[#1e2638] transition-all duration-300 group"
                >
                  <span className="text-slate-400 group-hover:text-indigo-400 transition-colors p-2.5 rounded-lg bg-[#161b27] border border-[#1e2638] group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20">
                    {link.icon}
                  </span>
                  <div>
                    <p className="text-slate-200 text-sm font-medium group-hover:text-white transition-colors">{link.label}</p>
                    <p className="text-slate-500 text-sm mt-0.5 group-hover:text-slate-400 transition-colors">{link.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Availability Note */}
            <div className="mt-8 lg:mt-auto pt-4">
              <p className="text-slate-500 text-sm">
                Currently open to freelance and full-time opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

