import React from 'react';

export type CategoryFilterType = 
  | 'All'
  | 'Web Development'
  | 'E-Commerce'
  | 'UI/UX'
  | 'WordPress'
  | 'Apps'
  | 'Digital Solutions';

interface ProjectCategoriesProps {
  categories: CategoryFilterType[];
  activeCategory: CategoryFilterType;
  onSelectCategory: (cat: CategoryFilterType) => void;
  projectCounts?: Record<string, number>;
}

export const ProjectCategories: React.FC<ProjectCategoriesProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  projectCounts,
}) => {
  return (
    <div className="w-full">
      {/* Scrollable Container on Mobile with No Overflow, Centered on Desktop */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none no-scrollbar">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          const count = projectCounts ? projectCounts[cat] : undefined;

          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-1.5 shrink-0 ${
                isActive
                  ? 'bg-amber-500 text-stone-950 shadow-xs scale-100 ring-2 ring-amber-500/20'
                  : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200/80 hover:text-stone-950'
              }`}
            >
              <span>{cat}</span>
              {typeof count === 'number' && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-amber-600/30 text-stone-950' : 'bg-stone-100 text-stone-500'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
