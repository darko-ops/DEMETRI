// src/components/ProjectsContent.jsx
// Shared "WORKS" label + typographic project index, used by both the homepage
// Projects section and the standalone /projects/ page.
import React from 'react';
import ProjectGrid from './ProjectGrid';
import { theme } from '../styles/theme';

const ProjectsContent = () => {
  return (
    <div style={styles.projectsSection} data-section-container>
      <h1 style={styles.title}>WORKS</h1>
      <ProjectGrid />
    </div>
  );
};

const styles = {
  projectsSection: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: `0 ${theme.spacing['4xl']} ${theme.spacing.xl}`,
    minHeight: 'calc(100vh - 200px)',
  },
  title: {
    fontFamily: "'IBM Plex Mono', 'SF Mono', Menlo, monospace",
    fontSize: '12px',
    fontWeight: 400,
    letterSpacing: '0.3em',
    color: '#b8b3aa',
    textAlign: 'left',
    margin: `${theme.spacing.md} 0 0`,
  },
};

export default ProjectsContent;
