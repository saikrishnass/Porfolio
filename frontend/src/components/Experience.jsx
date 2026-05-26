import React, { useState, useEffect } from 'react';
import Reveal from './Reveal';

const Experience = ({ experiences = [], loading }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const highlights = [
    "Architected robust MERN & MEAN stack communication systems.",
    "Integrated Vector Embeddings & RAG architectures for custom AI agents.",
    "Automated enterprise integrations via n8n & Make workflows.",
    "Engineered real-time API communications using WebSockets and Node.js.",
    "Engineered secure Auth0, JWT and secure token authentication models.",
    "Created pixel-perfect and highly interactive responsive UI components."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % highlights.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const currentExp = experiences[0] || {
    role: "MERN Stack Developer",
    company: "Kiruvar Technology",
    duration: "2026 - Present"
  };

  return (
    <section className="min-h-[70vh] py-16 flex items-center justify-center" id="experience">
      <Reveal className="w-full max-w-5xl">
        <div className="glass-card w-full p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-electric-blue/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <h2 className="font-display-xl text-3xl md:text-5xl text-on-surface mb-2">
            Experience
          </h2>
          <p className="font-label-caps text-label-caps text-electric-blue mb-10 tracking-[0.2em] uppercase">
            PROFESSIONAL JOURNEY
          </p>

          {loading ? (
            <div className="animate-pulse bg-surface-container/30 h-48 rounded-2xl border border-glass-border"></div>
          ) : (
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12">
              
              {/* Left: Job Info */}
              <div className="flex-shrink-0 md:w-[40%]">
                <span className="inline-block font-label-caps text-xs text-electric-blue bg-electric-blue/10 px-4 py-1.5 rounded-full uppercase tracking-wider">
                  {currentExp.duration}
                </span>
                <h3 className="font-headline-lg text-2xl md:text-3xl text-on-surface font-bold mt-4 mb-2">
                  {currentExp.role}
                </h3>
                <p className="text-soft-gray font-body-lg text-base md:text-lg">
                  {currentExp.company}
                </p>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-[1px] self-stretch min-h-[100px] bg-glass-border flex-shrink-0"></div>

              {/* Right: Rolling Highlights — simple fade transition */}
              <div className="flex-1 w-full">
                <p className="font-label-caps text-[10px] text-soft-gray/60 uppercase tracking-widest mb-4">
                  Key Contributions
                </p>

                <div className="relative h-[48px] overflow-hidden">
                  {highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="absolute inset-0 flex items-center gap-3 transition-all duration-700 ease-in-out"
                      style={{
                        opacity: index === activeIndex ? 1 : 0,
                        transform: index === activeIndex
                          ? 'translateY(0)'
                          : index === (activeIndex - 1 + highlights.length) % highlights.length
                            ? 'translateY(-100%)'
                            : 'translateY(100%)',
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-electric-blue flex-shrink-0"></span>
                      <span className="font-body-md text-sm md:text-base text-on-surface/90 font-medium leading-snug">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Progress dots */}
                <div className="flex gap-1.5 mt-5">
                  {highlights.map((_, i) => (
                    <span 
                      key={i} 
                      className={`h-1 rounded-full transition-all duration-500 ${
                        i === activeIndex ? 'w-6 bg-electric-blue' : 'w-1.5 bg-glass-border'
                      }`}
                    ></span>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
};

export default Experience;
