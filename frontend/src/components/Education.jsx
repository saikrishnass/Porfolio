import React from 'react';
import TiltCard from './TiltCard';
import Reveal from './Reveal';

const Education = ({ education = [], loading }) => {
  return (
    <section className="min-h-[100vh] py-16 flex items-center justify-center" id="education">
      <Reveal className="w-full max-w-5xl">
        <div className="glass-card w-full p-8 md:p-16 rounded-3xl flex flex-col justify-center shadow-2xl">
          <h2 className="font-display-xl text-3xl md:text-5xl text-on-surface mb-4">
            Education
          </h2>
          <p className="font-label-caps text-label-caps text-electric-blue mb-8 tracking-[0.2em] uppercase">
            ACADEMIC BACKGROUND
          </p>

          {loading ? (
            <div className="animate-pulse bg-surface-container/30 h-48 rounded-xl border border-glass-border"></div>
          ) : education.length === 0 ? (
            <div className="text-soft-gray italic py-8 text-center">
              No education records listed. Add records via the admin panel!
            </div>
          ) : (
            <div className="space-y-8">
              {education.map((edu) => (
                <TiltCard key={edu._id} className="w-full">
                  <div className="bg-surface-container/30 p-8 rounded-xl border border-glass-border hover:border-electric-blue/50 transition-colors duration-300">
                    <h3 className="font-headline-lg-mobile text-lg md:text-xl text-on-surface font-semibold mb-2">
                      {edu.degree}
                    </h3>
                    <p className="text-soft-gray font-body-lg text-sm md:text-base mb-4">
                      {edu.institution} // {edu.duration}
                    </p>
                    {edu.description && (
                      <p className="text-soft-gray text-sm md:text-base leading-relaxed max-w-2xl font-body-md">
                        {edu.description}
                      </p>
                    )}
                  </div>
                </TiltCard>
              ))}
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
};

export default Education;
