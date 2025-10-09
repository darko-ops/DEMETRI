// src/sections/ProjectsSection.jsx
import React from 'react';
import ProjectGrid from '../components/ProjectGrid';
import { theme } from '../styles/theme';

const ProjectsSection = () => {
  return (
    <div style={styles.projectsSection}>
      <h1 style={styles.title}>Works</h1>
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
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes['2xl'],
    fontWeight: theme.typography.weights.bold,
    letterSpacing: '-0.02em',
    color: theme.colors.secondary,
    textAlign: 'left',
    margin: `${theme.spacing.md} 0 ${theme.spacing.xl}`,
  },
};

export default ProjectsSection;