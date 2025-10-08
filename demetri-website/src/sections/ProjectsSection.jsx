// src/sections/ProjectsSection.jsx
import React from 'react';
import SectionLayout from '../components/SectionLayout';
import PageHeader from '../components/PageHeader';
import ProjectList from '../components/ProjectList';
import { SECTION_CONTENT } from '../utils/constants';

const ProjectsSection = () => {
  const content = SECTION_CONTENT.projects;

  return (
    <SectionLayout 
      label={content.label}
      quoteText="DESIGN IS NOT JUST\nWHAT IT LOOKS LIKE.\nDESIGN IS HOW IT WORKS."
      quoteAuthor="STEVE JOBS"
    >
      <PageHeader 
        subtitle={content.subtitle}
        description={content.description}
      />
      <ProjectList />
    </SectionLayout>
  );
};

export default ProjectsSection;