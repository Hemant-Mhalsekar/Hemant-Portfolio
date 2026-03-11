import React from 'react';
import { useScrollReveal, useSectionHeading } from '../hooks/useGsapReveal';

const stats = [
  { value: '5+', label: 'Projects Shipped' },
  { value: '2+', label: 'Years Coding' },
  { value: '3+', label: 'Clients Served' },
  { value: '∞', label: 'Coffee Consumed' },
];

const About = () => {
  const headingRef = useSectionHeading();
  const containerRef = useScrollReveal(0.15);

  return (
    <section id="about" className="section-padding">
      <div className="container-max">
        {/* Heading */}
        <div ref={headingRef} className="mb-14">
          <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">About Me</span>
          <h2 className="text-4xl font-bold text-white mt-2">Who I am</h2>
        </div>

        <div ref={containerRef} className="grid lg:grid-cols-2 gap-14 items-center">
          <div className="flex flex-col gap-5">
            <p className="reveal-target text-slate-300 text-base leading-relaxed pb-2">
              I’m currently pursuing my MCA and building myself into a strong full stack developer with a focus on writing clean, scalable, and maintainable code.
            </p>
            <p className="reveal-target text-slate-400 text-base leading-relaxed pb-2">
              I enjoy working across the entire development process — from crafting intuitive user interfaces to structuring backend systems and APIs that perform efficiently under real-world demands.
            </p>
            <p className="reveal-target text-slate-400 text-base leading-relaxed pb-2">
              I’m deeply interested in building practical solutions, improving systems, and continuously leveling up my technical skills. My long-term goal is to grow as a software engineer while also taking on freelance projects that solve meaningful business problems.
            </p>
          </div>

          {/* Stats + Visual */}
          <div className="reveal-target flex flex-col gap-8">
            {/* Abstract visual */}
            <div className="relative w-full max-w-xs mx-auto lg:mx-0 group cursor-default">
              <div className="w-64 h-64 rounded-3xl bg-gradient-to-br from-[#161b27] to-[#0f1117] border border-[#1e2638] group-hover:border-indigo-500/30 flex items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(99,102,241,0.1)]">
                
                {/* Background glow that pulses on hover */}
                <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
                  <div className="w-32 h-32 rounded-full bg-indigo-500/10 blur-xl group-hover:bg-indigo-500/20 transition-colors duration-500" />
                </div>
                
                {/* Center Content */}
                <div className="relative z-10 text-center transform transition-transform duration-500 group-hover:-translate-y-1">
                  <p className="text-5xl font-black gradient-text">HM</p>
                  <p className="text-slate-400 text-xs mt-2 font-medium tracking-wide uppercase">Full Stack Dev</p>
                </div>
                
                {/* Floating particles that animate on hover */}
                <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-indigo-400/60 transition-all duration-500 group-hover:-translate-y-2 group-hover:bg-indigo-400" />
                <div className="absolute bottom-10 left-8 w-3 h-3 rounded-full bg-purple-400/40 transition-all duration-700 group-hover:translate-y-2 group-hover:scale-110" />
                <div className="absolute top-1/2 right-4 w-1.5 h-1.5 rounded-full bg-emerald-400/50 transition-all duration-300 group-hover:-translate-x-2 group-hover:bg-emerald-400" />
                <div className="absolute top-10 left-10 w-1 h-1 rounded-full bg-white/20 transition-all duration-1000 group-hover:scale-150 group-hover:bg-white/40" />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="p-5 bg-[#161b27] border border-[#1e2638] rounded-2xl text-center group user-select-none hover:border-indigo-500/30 hover:bg-[#1a202e] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/5"
                >
                  <p className="text-3xl font-black text-white group-hover:text-indigo-400 transition-colors duration-300">{s.value}</p>
                  <p className="text-slate-500 text-xs mt-2 font-medium tracking-wide">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
