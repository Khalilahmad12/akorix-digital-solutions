import React, { useState, useEffect } from 'react';
import { ProjectsHero } from './ProjectsHero';
import { FeaturedProjects } from './FeaturedProjects';
import { AllProjects } from './AllProjects';
import { ProjectsCTA } from './ProjectsCTA';
import { ProjectModal } from './ProjectModal';
import { SHOWCASE_PROJECTS } from '../../data';
import { ProjectItem } from '../../types';

interface ProjectsPageProps {
  onOpenContact: (initialMessage?: string) => void;
  onNavigateToContact?: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  onOpenContact,
  onNavigateToContact,
}) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleStartProject = (customMsg?: string) => {
    const msg = customMsg 
      ? `Hi AKorix team, I am interested in building a project similar to "${customMsg}".`
      : 'Hi AKorix team, I would like to start a new project with your team.';
      
    if (onNavigateToContact) {
      onNavigateToContact();
    } else {
      onOpenContact(msg);
    }
  };

  const handleContactUs = () => {
    if (onNavigateToContact) {
      onNavigateToContact();
    } else {
      onOpenContact('Hi AKorix team, I have a project question and would like to get in touch.');
    }
  };

  return (
    <article className="min-h-screen bg-white text-stone-900 selection:bg-amber-400 selection:text-stone-950">
      {/* 01 — Projects Hero */}
      <ProjectsHero />

      {/* 02 — Featured Projects */}
      <FeaturedProjects
        projects={SHOWCASE_PROJECTS}
        onSelectProject={(project) => setSelectedProject(project)}
      />

      {/* 03 & 04 — Project Categories & All Projects */}
      <AllProjects
        projects={SHOWCASE_PROJECTS}
        onSelectProject={(project) => setSelectedProject(project)}
      />

      {/* 05 — Final CTA */}
      <ProjectsCTA
        onStartProject={() => handleStartProject()}
        onContactUs={handleContactUs}
      />

      {/* Interactive Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onStartProject={(title) => handleStartProject(title)}
      />
    </article>
  );
};
