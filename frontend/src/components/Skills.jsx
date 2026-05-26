import React from 'react';
import TiltCard from './TiltCard';
import Reveal from './Reveal';

const Skills = ({ skills = [], loading }) => {
  const categories = ['Frontend', 'Backend', 'Database', 'AI / Tools', 'Core Areas'];

  const getSkillsByCategory = (cat) => {
    return skills.filter(skill => skill.category === cat);
  };

  return (
    <section className="min-h-[100vh] py-16 flex items-center justify-center" id="skills">
      <Reveal className="w-full max-w-7xl">
        <div className="glass-card w-full p-8 md:p-12 rounded-3xl flex flex-col justify-center shadow-2xl">
          <h2 className="font-headline-lg text-3xl md:text-5xl text-on-surface mb-4 tracking-tight">
            Technical Skills
          </h2>
          <p className="font-label-caps text-label-caps text-electric-blue mb-8 tracking-[0.2em] uppercase">
            MERN / MEAN / FULL-STACK & AI SPECIALIST
          </p>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="animate-pulse bg-surface-container/30 h-64 rounded-xl border border-glass-border"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {categories.map((category) => {
                const filtered = getSkillsByCategory(category);
                return (
                  <TiltCard key={category} className="h-full">
                    <div className="bg-surface-container/50 p-6 rounded-xl border border-glass-border hover:border-electric-blue transition-colors duration-300 h-full flex flex-col">
                      <h3 className="font-headline-lg-mobile text-base text-on-surface font-semibold mb-4 border-b border-glass-border pb-2">
                        {category}
                      </h3>
                      {filtered.length === 0 ? (
                        <p className="text-soft-gray text-xs italic">No skills added yet.</p>
                      ) : (
                        <ul className="text-soft-gray font-body-md space-y-2 flex-grow">
                          {filtered.map((skill) => (
                            <li 
                              key={skill._id} 
                              className="text-xs md:text-sm hover:text-on-surface hover:translate-x-1 transition-all duration-200"
                            >
                              {skill.name}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </TiltCard>
                );
              })}
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
};

export default Skills;
