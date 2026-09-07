import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ProjectItem } from '../../types';

interface ProjectCardProps {
  project: ProjectItem;
  onSelect: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(project)}
      className="group relative rounded-xl bg-white border border-stone-200 shadow-xs hover:shadow-lg hover:border-amber-400/80 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer h-full"
    >
      <div>
        {/* Project Image */}
        <div className="relative aspect-16/10 w-full bg-stone-100 overflow-hidden border-b border-stone-100">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-stone-950/10 group-hover:bg-transparent transition-colors" />

          {/* Category Tag */}
          <div className="absolute top-2.5 left-2.5">
            <span className="px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-xs text-[10.5px] font-bold text-stone-800 border border-stone-200/80 shadow-xs">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 space-y-2">
          <h3 className="text-base sm:text-lg font-bold text-stone-950 group-hover:text-amber-900 transition-colors leading-snug">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 sm:p-5 pt-0 mt-3 border-t border-stone-100 flex items-center justify-between">
        <span className="text-xs font-bold text-amber-700 group-hover:text-amber-800 flex items-center gap-1.5 transition-colors">
          View Project
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </div>
  );
};
