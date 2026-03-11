import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import WorkWithMe from './sections/WorkWithMe';
import ExperienceEducation from './sections/ExperienceEducation';
import Contact from './sections/Contact';
import CursorGlow from './components/CursorGlow';
import SmoothScroll from './components/SmoothScroll';

const App = () => {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#0f1117] text-slate-100 relative">
        <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <WorkWithMe />
        <ExperienceEducation />
        <Contact />
      </main>
      <Footer />
      <CursorGlow />
    </div>
    </SmoothScroll>
  );
};

export default App;
