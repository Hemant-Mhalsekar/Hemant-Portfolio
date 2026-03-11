import React, { useRef, useEffect } from 'react';
import { use3DTilt } from '../../hooks/useGsapReveal';

const ProjectCard = ({ project, onClick }) => {
  const { wrapperRef, tiltRef } = use3DTilt(4, -8);
  const spotlightRef = useRef(null);
  const isTouchRef = useRef(false);

  useEffect(() => {
    isTouchRef.current = window.matchMedia('(pointer: coarse)').matches;
  }, []);

  const handleMouseMove = (e) => {
    if (isTouchRef.current || !spotlightRef.current || !tiltRef.current) return;
    const { left, top } = tiltRef.current.getBoundingClientRect();
    spotlightRef.current.style.background =
      `radial-gradient(circle at ${e.clientX - left}px ${e.clientY - top}px, rgba(255,255,255,0.07) 0%, transparent 55%)`;
  };

  const handleMouseEnter = () => {
    if (isTouchRef.current || !spotlightRef.current) return;
    spotlightRef.current.style.opacity = '1';
  };

  const handleMouseLeave = () => {
    if (!spotlightRef.current) return;
    spotlightRef.current.style.opacity = '0';
  };

  return (
    <div
      ref={wrapperRef}
      className={`relative h-full ${project.featured ? 'md:col-span-2' : 'col-span-1'}`}
    >
      <article
        ref={tiltRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="card-item relative h-full flex flex-col bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg shadow-black/20 rounded-2xl overflow-hidden group transition-all duration-[250ms] ease-out hover:bg-white/[0.08] hover:border-indigo-500/60 hover:shadow-xl hover:shadow-indigo-950/60"
      >
        {/* Layer z-[1]: cursor spotlight */}
        <div
          ref={spotlightRef}
          className="absolute inset-0 pointer-events-none z-[1] opacity-0 transition-opacity duration-300"
          style={{ willChange: 'background' }}
        />

        {/* Layer z-[2]: diagonal light sweep — translates across on group hover */}
        <div className="absolute inset-y-0 left-0 w-full translate-x-[-105%] group-hover:translate-x-[105%] transition-transform duration-[650ms] ease-in-out pointer-events-none z-[2] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent skew-x-[-12deg]" />

        {/* Always-visible thin accent gradient line at the top */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-600/30 via-indigo-400/70 to-purple-600/30 group-hover:from-indigo-500/60 group-hover:via-indigo-400 group-hover:to-purple-500/60 transition-all duration-[250ms]" />

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-5 right-5 z-10">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-sm">
              ⭐ Featured
            </span>
          </div>
        )}

        <div className="p-6 md:p-8 flex flex-col gap-4 flex-1 mt-2 relative z-10">
          {/* Title + Tagline */}
          <div className="mt-2">
            <h3 className="text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors duration-[250ms]">
              {project.title}
            </h3>
            <p className="text-slate-400 group-hover:text-slate-300 text-sm mt-3 leading-relaxed transition-colors duration-[250ms]">
              {project.tagline}
            </p>
          </div>

          {/* Tech stack tags — lift + brighten on card hover */}
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-md text-xs font-medium bg-white/[0.04] border border-white/8 text-slate-500 group-hover:bg-white/[0.07] group-hover:text-slate-300 group-hover:border-white/15 group-hover:-translate-y-0.5 group-hover:brightness-110 transition-all duration-200 ease-out"
              >
                {t}
              </span>
            ))}
          </div>

          {/*
            Action Buttons
            — On hover-capable devices (desktop): reveal from below (opacity + translateY)
            — On touch devices (mobile): always visible
            [@media(hover:hover)] targets only pointer devices supporting hover
          */}
          <div className="mt-auto pt-6 border-t border-white/[0.06] group-hover:border-indigo-500/20 transition-colors duration-[250ms]">
            <div className="flex flex-wrap gap-3 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:translate-y-0 transition-all duration-[250ms] ease-out">
              <button
                onClick={() => onClick(project)}
                className="px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500 text-indigo-300 hover:text-white rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm"
              >
                View Details
              </button>

              {(project.live || project.github) && (
                <a
                  href={project.live || project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-white/10 hover:border-indigo-500/50 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2"
                >
                  {project.live ? (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live
                    </>
                  ) : (
                    'GitHub'
                  )}
                </a>
              )}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ProjectCard;
