import React from 'react';

const PREFERS_REDUCED =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const NoiseOverlay = () => {
  return (
    <div
      className={`fixed inset-0 z-0 pointer-events-none opacity-[0.035] ${PREFERS_REDUCED ? '' : 'noise-animate'}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        // Make the div larger than the viewport so we can translate it without showing edges
        width: '150%',
        height: '150%',
        top: '-25%',
        left: '-25%',
      }}
      aria-hidden="true"
    />
  );
};

export default NoiseOverlay;
