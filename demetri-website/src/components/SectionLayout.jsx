// src/components/SectionLayout.jsx
import React from 'react';
import { theme } from '../styles/theme';

const SectionLayout = ({ label, children, quoteText, quoteAuthor }) => {
  return (
    <div style={styles.selectedContent}>
      <div style={styles.verticalLabel}>{label}</div>
      <div style={styles.pageContent}>
        {children}
      </div>
      <div style={styles.quoteSection}>
        <p style={styles.quote}>
          {quoteText}
          <span style={styles.quoteAuthor}>— {quoteAuthor}</span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  selectedContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `${theme.spacing['5xl']} ${theme.spacing['4xl']}`,
    position: 'relative',
    minHeight: 'calc(100vh - 200px)',
  },
  verticalLabel: {
    fontFamily: theme.typography.fontFamily,
    fontSize: '120px',
    fontWeight: theme.typography.weights.bold,
    letterSpacing: '0.05em',
    color: 'rgba(0, 0, 0, 0.03)',
    position: 'absolute',
    left: '-40px',
    top: '50%',
    transform: 'rotate(-90deg) translateX(-50%)',
    transformOrigin: 'left center',
    whiteSpace: 'nowrap',
    zIndex: 0,
  },
  pageContent: {
    position: 'relative',
    zIndex: 1,
    maxWidth: theme.layout.contentMaxWidth,
    margin: '0 auto',
  },
  quoteSection: {
    textAlign: 'center',
    alignItems: 'center',
  },
  quote: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.bold,
    letterSpacing: '0.05em',
    lineHeight: 1,
    color: theme.colors.secondary,
    margin: 0,
    whiteSpace: 'pre-line',
  },
  quoteAuthor: {
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.primary,
    display: 'block',
    marginTop: theme.spacing.sm,
    letterSpacing: '0.05em',
  },
};

export default SectionLayout;