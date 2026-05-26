import React from 'react';
import Reveal from './Reveal';

const Hero = () => {
  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="min-h-screen flex flex-col justify-center items-start pt-32 pb-section-gap relative"
      id="hero"
    >
      <Reveal className="max-w-4xl">
        <p className="font-label-caps text-label-caps text-electric-blue mb-6 tracking-[0.2em]">
          MERN • MEAN • AI • AUTOMATION
        </p>
        <h1 className="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl text-on-surface mb-8">
          Full Stack Developer &<br />AI Engineer
        </h1>
        <p className="font-body-lg text-body-lg text-soft-gray mb-12 max-w-2xl">
          Developing intelligent systems, scalable backend architectures, and automation-driven applications for real-world impact.
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          <a
            onClick={(e) => handleScrollTo(e, '#projects')}
            className="inline-flex items-center justify-center bg-on-surface text-background font-label-caps text-label-caps px-8 py-4 rounded-full hover:bg-electric-blue hover:text-on-surface transition-all duration-300 cursor-pointer shadow-lg hover:shadow-electric-blue/20"
          >
            View Projects
          </a>
          <a
            onClick={(e) => handleScrollTo(e, '#contact')}
            className="inline-flex items-center justify-center glass-card text-on-surface font-label-caps text-label-caps px-8 py-4 rounded-full hover:border-electric-blue hover:text-electric-blue transition-all duration-300 cursor-pointer"
          >
            Contact Me
          </a>
        </div>
      </Reveal>

      {/* Pulsing Scroll Indicator */}
      <div
        onClick={(e) => handleScrollTo(e, '#about')}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-pulse cursor-pointer group"
      >
        <span className="w-[1px] h-16 bg-glass-border group-hover:bg-electric-blue mb-2 transition-colors duration-300"></span>
        <span className="font-label-caps text-[10px] text-soft-gray group-hover:text-electric-blue transition-colors duration-300 uppercase tracking-widest">
          SCROLL
        </span>
      </div>
    </section>
  );
};

export default Hero;
