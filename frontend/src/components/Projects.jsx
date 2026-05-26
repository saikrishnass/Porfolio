import React from 'react';
import TiltCard from './TiltCard';
import Reveal from './Reveal';
import { ExternalLink, Github } from 'lucide-react';

const Projects = ({ projects = [], loading }) => {
  return (
    <section className="min-h-[100vh] py-16 flex items-center justify-center" id="projects">
      <Reveal className="w-full max-w-5xl">
        <div className="glass-card w-full p-8 md:p-16 rounded-3xl flex flex-col justify-center shadow-2xl">
          <h2 className="font-headline-lg text-3xl md:text-5xl text-on-surface mb-4 tracking-tight">
            Projects
          </h2>
          <p className="font-label-caps text-label-caps text-electric-blue mb-8 tracking-[0.2em] uppercase">
            SCALABLE & INTELLIGENT
          </p>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <div key={i} className="animate-pulse bg-surface-container/30 aspect-video rounded-xl border border-glass-border"></div>
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12 text-soft-gray italic">
              No projects added yet. Add projects from the admin panel!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <TiltCard key={project._id} className="h-full">
                  <div className="group relative overflow-hidden rounded-xl border border-glass-border bg-surface-container/30 aspect-video flex flex-col justify-end p-6 hover:border-electric-blue transition-all duration-300 cursor-pointer h-full">
                    {/* Background image if exists, else dynamic premium gradient */}
                    {project.image ? (
                      <div
                        className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-700 ease-out group-hover:scale-110"
                        style={{ backgroundImage: `url(${project.image})` }}
                      ></div>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-surface-container/80 via-deep-obsidian to-electric-blue/10 z-0 transition-transform duration-700 ease-out group-hover:scale-110"></div>
                    )}

                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-obsidian via-deep-obsidian/70 to-transparent z-1"></div>

                    {/* Content */}
                    <div className="relative z-10 w-full flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-headline-lg-mobile text-lg md:text-xl text-on-surface font-semibold group-hover:text-electric-blue transition-colors duration-300">
                          {project.title}
                        </h3>
                        {/* Links */}
                        <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {project.githubLink && (
                            <a
                              href={project.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-on-surface hover:text-electric-blue p-1 rounded-full bg-background/50 backdrop-blur-sm"
                              title="GitHub Code"
                            >
                              <Github size={16} />
                            </a>
                          )}
                          {project.liveLink && (
                            <a
                              href={project.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-on-surface hover:text-electric-blue p-1 rounded-full bg-background/50 backdrop-blur-sm"
                              title="Live Demo"
                            >
                              <ExternalLink size={16} />
                            </a>
                          )}
                        </div>
                      </div>

                      <p className="text-soft-gray text-sm font-body-md mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="font-label-caps text-[9px] px-3 py-1 border border-glass-border rounded-full text-primary bg-background/30 backdrop-blur-xs uppercase tracking-wider"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
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

export default Projects;
