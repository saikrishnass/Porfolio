import React from 'react';
import TiltCard from './TiltCard';
import Reveal from './Reveal';

const About = () => {
  return (
    <section className="min-h-[100vh] py-16 flex items-center justify-center" id="about">
      <Reveal className="w-full max-w-5xl">
        <TiltCard className="w-full">
          <div className="glass-card w-full p-8 md:p-16 rounded-3xl flex flex-col justify-center shadow-2xl relative overflow-hidden group">
            {/* Visual background ambient glow */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-electric-blue/5 rounded-full blur-3xl group-hover:bg-electric-blue/10 transition-colors duration-500 pointer-events-none"></div>

            <h2 className="font-headline-lg text-3xl md:text-5xl text-on-surface mb-6 tracking-tight">
              About Me
            </h2>
            <p className="font-label-caps text-label-caps text-electric-blue mb-4 tracking-[0.2em] uppercase">
              3RD YEAR IT STUDENT
            </p>
            <p className="font-body-lg text-base md:text-lg leading-relaxed text-soft-gray max-w-3xl">
              3rd-Year Information Technology Student passionate about building intelligent, scalable, and user-centric applications. Skilled in MERN & MEAN stack development, AI model training, AI-powered projects, and workflow automation using n8n & Make. Focused on creating real-world solutions by combining full-stack engineering, automation, and artificial intelligence.
            </p>
          </div>
        </TiltCard>
      </Reveal>
    </section>
  );
};

export default About;
