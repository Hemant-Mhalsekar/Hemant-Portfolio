import React from 'react';
import { useScrollReveal, useSectionHeading } from '../hooks/useGsapReveal';
import { experience, education } from '../data/experience';

const ExperienceEducation = () => {
  const headingRef = useSectionHeading();
  const containerRef = useScrollReveal(0.15);

  return (
    <section id="experience" className="section-padding bg-[#0f1117]">
      <div className="container-max max-w-4xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="mb-16">
          <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest block mb-3">Background</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Experience & Education</h2>
        </div>

        <div ref={containerRef} className="relative flex flex-col gap-16">
          {/* Work Experience Section */}
          <div className="relative">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="text-indigo-400">💼</span> Experience
            </h3>
            
            <div className="flex flex-col gap-8">
              {/* Vertical line for experience */}
              <div className="absolute left-6 top-14 bottom-4 w-px bg-gradient-to-b from-indigo-500/40 to-transparent hidden sm:block" />

              {experience.map((item) => (
                <div key={item.id} className="reveal-target timeline-item relative sm:pl-20 group">
                  {/* Icon dot — pops on card hover */}
                  <div className="hidden sm:flex absolute left-0 top-0 w-12 h-12 rounded-xl bg-[#161b27] border border-[#1e2638] items-center justify-center text-xl flex-shrink-0 group-hover:border-indigo-500/40 group-hover:bg-indigo-500/10 group-hover:scale-110 group-hover:-translate-y-[3px] group-hover:brightness-110 transition-all duration-[250ms] ease-out">
                    {item.icon}
                  </div>

                  {/* Content */}
                  <div className="bg-[#161b27] border border-[#1e2638] rounded-2xl p-6 transition-all duration-[250ms] ease-out hover:border-indigo-500/30 hover:-translate-y-[8px] hover:shadow-lg hover:shadow-indigo-950/30">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors duration-[250ms]">{item.title}</h4>
                        <p className="text-slate-400 text-sm font-medium mt-1">{item.organization}</p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-mono whitespace-nowrap">
                        {item.period}
                      </span>
                    </div>
                    
                    <ul className="flex flex-col gap-2 mt-4">
                      {item.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                          <span className="text-indigo-400 font-bold mt-0.5 flex-shrink-0">▹</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div className="relative">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="text-indigo-400">🎓</span> Education
            </h3>
            
            <div className="flex flex-col gap-6">
              {/* Vertical line for education */}
              <div className="absolute left-6 top-14 bottom-4 w-px bg-gradient-to-b from-purple-500/40 to-transparent hidden sm:block" />

              {education.map((item) => (
                <div key={item.id} className="reveal-target timeline-item relative sm:pl-20 group">
                  {/* Icon dot — pops on card hover */}
                  <div className="hidden sm:flex absolute left-0 top-0 w-12 h-12 rounded-xl bg-[#161b27] border border-[#1e2638] items-center justify-center text-xl flex-shrink-0 group-hover:border-purple-500/40 group-hover:bg-purple-500/10 group-hover:scale-110 group-hover:-translate-y-[3px] group-hover:brightness-110 transition-all duration-[250ms] ease-out">
                    {item.icon}
                  </div>

                  {/* Content */}
                  <div className="bg-[#161b27] border border-[#1e2638] rounded-2xl p-6 transition-all duration-[250ms] ease-out hover:border-purple-500/30 hover:-translate-y-[8px] hover:shadow-lg hover:shadow-purple-950/20">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h4 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors duration-[250ms]">{item.title}</h4>
                        <p className="text-slate-400 text-sm font-medium mt-1">{item.organization}</p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-mono whitespace-nowrap">
                        {item.period}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ExperienceEducation;
