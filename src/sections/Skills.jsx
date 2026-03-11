import React from 'react';
import { useScrollReveal, useSectionHeading, use3DTilt } from '../hooks/useGsapReveal';
import { skills } from '../data/skills';

const SkillCard = ({ title, description, items, icon }) => {
  const { wrapperRef, tiltRef } = use3DTilt(4, -8);

  return (
    // wrapperRef: holds perspective + captures mouse events
    <div ref={wrapperRef} className="h-full">
      {/* tiltRef: GSAP drives rotateX/Y + lift — CSS hover only for non-transform properties */}
      <div
        ref={tiltRef}
        className="card-item relative bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg shadow-black/20 rounded-2xl p-6 md:p-8 flex flex-col h-full transition-colors transition-shadow duration-[250ms] hover:bg-white/10 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-black/40 group overflow-hidden"
      >
        {/* Subtle hover gradient glow inside card */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between mb-2 relative z-10">
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors duration-300">{title}</h3>
            <p className="text-slate-500 text-sm mt-1 mb-6 leading-relaxed max-w-[90%]">{description}</p>
          </div>
          <span className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity ml-4 flex-shrink-0 bg-[#0f1117]/80 w-10 h-10 flex items-center justify-center rounded-lg border border-[#1e2638] group-hover:border-indigo-500/30 shadow-sm">{icon}</span>
        </div>

        {/* Skills List */}
        <div className="flex flex-wrap gap-2.5 mt-auto border-t border-[#1e2638]/40 pt-6 relative z-10">
          {items.map((item) => (
            <span
              key={item}
              className="px-3.5 py-1.5 rounded-md text-sm font-medium text-slate-300 bg-[#0f1117]/60 border border-white/5 group-hover:bg-[#0f1117]/80 group-hover:border-indigo-500/20 group-hover:text-indigo-300 transition-colors duration-200 cursor-default"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  const headingRef = useSectionHeading();
  const containerRef = useScrollReveal(0.15);

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* Optional: Very subtle background blob for glass reflection */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-max relative z-10">
        {/* Heading */}
        <div ref={headingRef} className="mb-14 max-w-2xl">
          <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">Expertise</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4 tracking-tight">Technical Skills.</h2>
          <p className="text-slate-500 text-lg leading-relaxed pb-2">
            A focused toolkit built through real projects. No fluff — just the technologies I use to ship performant, scalable applications.
          </p>
        </div>

        {/* Cards grid */}
        <div ref={containerRef} className="grid md:grid-cols-2 gap-6 pb-4">
          {skills.map((skill) => (
            <SkillCard
              key={skill.id}
              title={skill.category}
              description={skill.description}
              items={skill.items}
              icon={skill.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
