import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import Currently from './sections/Currently';
import WhatIBuild from './sections/WhatIBuild';
import SelectedWork from './sections/SelectedWork';
import HowIBuild from './sections/HowIBuild';
import Toolbox from './sections/Toolbox';
import Experience from './sections/Experience';
import BeyondCode from './sections/BeyondCode';
import Contact from './sections/Contact';
import SmoothScroll from './components/SmoothScroll';
import NoiseOverlay from './components/NoiseOverlay';

const App = () => {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[var(--color-cream)] text-[var(--color-text-onlight)] relative">
        <NoiseOverlay />
        <Navbar />
      <main className="relative z-10">
        <Hero />
        <Currently />
        <WhatIBuild />
        <SelectedWork />
        <HowIBuild />
        <Toolbox />
        <Experience />
        <BeyondCode />
        <Contact />
      </main>
      <Footer />
    </div>
    </SmoothScroll>
  );
};

export default App;
