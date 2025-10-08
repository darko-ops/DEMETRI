// src/components/ProjectList.jsx
import React from 'react';
import { PROJECTS } from '../utils/constants';
import { theme } from '../styles/theme';

const ProjectList = () => {
  return (
    <div style={styles.projectList}>
      {PROJECTS.map((project) => (
        <a 
          key={project.name}
          href={project.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          style={styles.projectItem}
        >
          <span style={styles.projectName}>{project.name}</span>
          <span style={styles.projectDesc}>{project.description}</span>
        </a>
      ))}
    </div>
  );
};

const styles = {
  projectList: {
    marginTop: theme.spacing['3xl'],
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
  },
  projectItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
    background: theme.colors.white,
    border: `1px solid ${theme.colors.border}`,
    textDecoration: 'none',
    transition: `all ${theme.transitions.fast}`,
  },
  projectName: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.bold,
    letterSpacing: '0.1em',
    color: theme.colors.heading,
  },
  projectDesc: {
    fontFamily: theme.typography.fontFamily,
    fontSize: '13px',
    fontWeight: theme.typography.weights.normal,
    color: theme.colors.text,
  },
};

export default ProjectList;