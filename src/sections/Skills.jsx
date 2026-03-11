import React from 'react';
import { useScrollReveal, useSectionHeading, use3DTilt } from '../hooks/useGsapReveal';
import { skills } from '../data/skills';

// Tooltip with Simple Icons logo that pops up above each pill
const SkillTooltip = ({ item }) => {
  const iconUrl = item.icon
    ? `https://cdn.simpleicons.org/${item.icon}/ffffff`
    : null;

  return (
    <div className="relative group/pill inline-block">
      {/* The pill itself */}
      <span
        className="px-3.5 py-1.5 rounded-md text-sm font-medium text-slate-300 bg-[#0f1117]/60 border border-white/5 cursor-default
                   group-hover/pill:bg-indigo-500/10 group-hover/pill:border-indigo-500/30 group-hover/pill:text-indigo-300
                   transition-all duration-200 inline-block select-none"
      >
        {item.label}
      </span>

      {/* Floating tooltip card */}
      <div
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5
                   pointer-events-none opacity-0 scale-90 translate-y-1
                   group-hover/pill:opacity-100 group-hover/pill:scale-100 group-hover/pill:translate-y-0
                   transition-all duration-200 ease-out z-50"
      >
        <div className="flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-xl
                        bg-[#1a2133] border border-indigo-500/25 shadow-xl shadow-black/50
                        min-w-[70px] whitespace-nowrap">
          {iconUrl && (
            <img
              src={iconUrl}
              alt={item.label}
              width={22}
              height={22}
              className="opacity-90"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          )}
          <span className="text-[11px] font-semibold text-slate-300 leading-none">{item.label}</span>
        </div>
        {/* Arrow */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0
                        border-l-[6px] border-l-transparent
                        border-r-[6px] border-r-transparent
                        border-t-[6px] border-t-[#1a2133]" />
      </div>
    </div>
  );
};

const SkillCard = ({ title, description, items, icon }) => {
  const { wrapperRef, tiltRef } = use3DTilt(4, -8);

  return (
    // wrapperRef: holds perspective + captures mouse events
    <div ref={wrapperRef} className="h-full">
      {/* tiltRef: GSAP drives rotateX/Y + lift — CSS hover only for non-transform properties */}
      <div
        ref={tiltRef}
        className="card-item relative bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg shadow-black/20 rounded-2xl p-6 md:p-8 flex flex-col h-full transition-colors transition-shadow duration-[250ms] hover:bg-white/10 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-black/40 group overflow-visible"
      >
        {/* Subtle hover gradient glow inside card */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />

        {/* Header */}
        <div className="flex items-start justify-between mb-2 relative z-10">
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors duration-300">{title}</h3>
            <p className="text-slate-500 text-sm mt-1 mb-6 leading-[1.65] pr-2">{description}</p>
          </div>
          {/* Category icon with popup tooltip */}
          <div className="relative group/icon flex-shrink-0 ml-4">
            <span className="text-2xl opacity-60 group-hover:opacity-100 group-hover/icon:scale-110 transition-all duration-200 bg-[#0f1117]/80 w-10 h-10 flex items-center justify-center rounded-lg border border-[#1e2638] group-hover:border-indigo-500/30 group-hover/icon:border-indigo-500/50 group-hover/icon:bg-indigo-500/10 shadow-sm cursor-default">
              {icon}
            </span>
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2.5 pointer-events-none
                            opacity-0 scale-90 translate-y-1
                            group-hover/icon:opacity-100 group-hover/icon:scale-100 group-hover/icon:translate-y-0
                            transition-all duration-200 ease-out z-50">
              <div className="px-3 py-2 rounded-xl bg-[#1a2133] border border-indigo-500/25 shadow-xl shadow-black/50 whitespace-nowrap">
                <span className="text-[11px] font-semibold text-slate-300 leading-none">{title}</span>
              </div>
              {/* Arrow pointing right-aligned */}
              <div className="absolute top-full right-3 w-0 h-0
                              border-l-[6px] border-l-transparent
                              border-r-[6px] border-r-transparent
                              border-t-[6px] border-t-[#1a2133]" />
            </div>
          </div>
        </div>

        {/* Skills List with icon tooltips */}
        <div className="flex flex-wrap gap-2.5 mt-auto border-t border-[#1e2638]/40 pt-6 relative z-10">
          {items.map((item) => (
            <SkillTooltip key={item.label} item={item} />
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
        <div ref={headingRef} className="mb-14 max-w-1xl">
          <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">Expertise</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4 tracking-tight">Technical Skills.</h2>
          <p className="text-slate-500 text-lg leading-relaxed pb-2">
            A focused toolkit built through real projects. No fluff — just the technologies I use to ship performant, scalable applications.
          </p>
        </div>

        {/* Cards grid — 1 col mobile, 2 col tablet, 3 col desktop */}
        <div ref={containerRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
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
