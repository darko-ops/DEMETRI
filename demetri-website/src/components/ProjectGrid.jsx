// src/components/ProjectGrid.jsx
import React from 'react';
import { PROJECTS } from '../utils/constants';
import { theme } from '../styles/theme';

const ProjectGrid = () => {
  return (
    <div style={styles.gridContainer} data-projects-grid>
      {PROJECTS.map((project) => (
        <a 
          key={project.name}
          href={project.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          style={styles.projectCard}
        >
          <div style={styles.previewContainer}>
            {project.image ? (
              // Use static image if provided
              <img 
                src={project.image}
                alt={`${project.name} preview`}
                style={styles.image}
              />
            ) : (
              // Fall back to iframe preview
              <>
                <iframe 
                  src={project.url}
                  style={styles.preview}
                  title={`${project.name} preview`}
                  scrolling="no"
                  sandbox="allow-same-origin"
                />
                <div style={styles.overlay} />
              </>
            )}
          </div>
          <div style={styles.projectInfo}>
            <h3 style={styles.projectName}>{project.name}</h3>
            <p style={styles.projectDescription}>{project.description}</p>
          </div>
        </a>
      ))}
    </div>
  );
};

const styles = {
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: theme.spacing['2xl'],
    marginTop: theme.spacing['4xl'],
    marginBottom: theme.spacing['5xl'],
  },
  projectCard: {
    textDecoration: 'none',
    background: theme.colors.white,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: '12px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    transition: `all ${theme.transitions.fast}`,
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  previewContainer: {
    position: 'relative',
    width: '100%',
    height: '240px',
    overflow: 'hidden',
    background: theme.colors.background,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  preview: {
    width: '100%',
    height: '600px',
    border: 'none',
    transform: 'scale(0.4)',
    transformOrigin: 'top left',
    pointerEvents: 'none',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(255, 255, 255, 0.05)',
    pointerEvents: 'none',
  },
  projectInfo: {
    padding: theme.spacing['2xl'],
    textAlign: 'center',
    background: theme.colors.white,
  },
  projectName: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.bold,
    letterSpacing: '0.05em',
    color: theme.colors.heading,
    margin: `0 0 ${theme.spacing.sm} 0`,
  },
  projectDescription: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.normal,
    color: theme.colors.text,
    margin: 0,
    lineHeight: 1.6,
  },
};

export default ProjectGrid;