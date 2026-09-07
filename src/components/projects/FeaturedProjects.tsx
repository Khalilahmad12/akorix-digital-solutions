import React from 'react';
import { Sparkles, ArrowRight, Layers } from 'lucide-react';
import { ProjectItem } from '../../types';

interface FeaturedProjectsProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ projects, onSelectProject }) => {
  const featuredList = projects.filter(p => p.isFeatured).slice(0, 2);

  if (featuredList.length === 0) return null;

  return (
    <section 
      id="featured-projects"
      className="py-10 sm:py-14 lg:py-16 bg-white text-stone-900 border-b border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-xs font-semibold text-amber-950">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span className="tracking-wider uppercase text-[11px]">FEATURED WORK</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950 leading-tight">
            A Few Projects We’re Proud Of.
          </h2>

          <p className="text-sm text-stone-600 font-normal leading-relaxed max-w-xl mx-auto">
            Deep-dive into flagship digital platforms built with precision engineering, modern design systems, and measurable business performance.
          </p>
        </div>

        {/* 2 Featured Projects in Balanced Two-Column Layout */}
        <div className={`grid grid-cols-1 ${featuredList.length > 1 ? 'lg:grid-cols-2' : 'max-w-4xl mx-auto'} gap-6 sm:gap-8`}>
          {featuredList.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group relative rounded-2xl bg-stone-50 border border-stone-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-amber-400/80 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Large Project Image with Zoom */}
                <div className="relative aspect-16/10 w-full bg-stone-200 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/10 transition-colors" />
                  
                  {/* Category Pill on Image */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[11px] font-bold text-stone-900 border border-stone-200/80 shadow-xs">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 sm:p-7 space-y-3.5">
                  <h3 className="text-xl sm:text-2xl font-bold text-stone-950 group-hover:text-amber-900 transition-colors leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Services & Technology Badges */}
                  <div className="space-y-2 pt-1">
                    {project.services && project.services.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] font-semibold text-stone-500 flex items-center gap-1 mr-1">
                          <Layers className="w-3 h-3 text-amber-600" />
                          Services:
                        </span>
                        {project.services.slice(0, 3).map((svc) => (
                          <span
                            key={svc}
                            className="px-2 py-0.5 rounded-md bg-stone-200/70 text-stone-700 text-[11px] font-medium"
                          >
                            {svc}
                          </span>
                        ))}
                      </div>
                    )}

                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] font-semibold text-stone-500 mr-1">Tech:</span>
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200/60 text-[11px] font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="p-5 sm:p-7 pt-0 border-t border-stone-200/60 mt-4 flex items-center justify-between">
                <span className="text-xs font-bold text-amber-700 group-hover:text-amber-800 flex items-center gap-1.5 transition-colors">
                  View Project
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-[11px] font-semibold text-stone-400">Flagship Solution</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
