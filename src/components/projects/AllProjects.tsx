import React, { useState, useMemo } from 'react';
import { LayoutGrid } from 'lucide-react';
import { ProjectItem } from '../../types';
import { ProjectCategories, CategoryFilterType } from './ProjectCategories';
import { ProjectCard } from './ProjectCard';

interface AllProjectsProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
}

const CATEGORIES: CategoryFilterType[] = [
  'All',
  'Web Development',
  'E-Commerce',
  'UI/UX',
  'WordPress',
  'Apps',
  'Digital Solutions',
];

export const AllProjects: React.FC<AllProjectsProps> = ({ projects, onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilterType>('All');

  // Filter projects dynamically
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  // Calculate project count per category for filter badges
  const projectCounts = useMemo(() => {
    const counts: Record<string, number> = { All: projects.length };
    CATEGORIES.forEach((cat) => {
      if (cat !== 'All') {
        counts[cat] = projects.filter((p) => p.category === cat).length;
      }
    });
    return counts;
  }, [projects]);

  return (
    <section 
      id="all-projects"
      className="py-10 sm:py-14 lg:py-16 bg-stone-50 text-stone-900 border-b border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-xs font-semibold text-amber-950">
            <LayoutGrid className="w-3.5 h-3.5 text-amber-700" />
            <span className="tracking-wider uppercase text-[11px]">ALL PROJECTS</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950 leading-tight">
            Explore Our Work.
          </h2>

          <p className="text-sm text-stone-600 font-normal leading-relaxed max-w-xl mx-auto">
            Browse our complete portfolio of web applications, custom storefronts, mobile apps, and digital solutions designed for impact.
          </p>
        </div>

        {/* Category Filters Bar */}
        <ProjectCategories
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          projectCounts={projectCounts}
        />

        {/* Projects Grid: 3 Desktop, 2 Tablet, 1 Mobile */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 pt-2">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={onSelectProject}
              />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center bg-white rounded-2xl border border-stone-200 max-w-md mx-auto p-6 space-y-2">
            <p className="text-sm font-semibold text-stone-800">No projects in this category yet</p>
            <p className="text-xs text-stone-500">Check back soon or explore our other project categories.</p>
            <button
              type="button"
              onClick={() => setActiveCategory('All')}
              className="mt-3 px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-stone-950 font-semibold text-xs transition-colors cursor-pointer"
            >
              Show All Projects
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
