// src/components/PageHeader.jsx
import React from 'react';
import { theme } from '../styles/theme';

const PageHeader = ({ subtitle, description }) => {
  return (
    <>
      <p style={styles.pageText}>{description}</p>
      <div style={styles.titleBlock}>
        <h1 style={styles.pageTitle}>
          DEMETRI<span style={{ color: theme.colors.primary }}>.XYZ</span>
        </h1>
        <p style={styles.welcomeText}>{subtitle}</p>
      </div>
    </>
  );
};

const styles = {
  pageText: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.normal,
    lineHeight: 1.8,
    color: theme.colors.text,
    marginBottom: theme.spacing['4xl'],
  },
  titleBlock: {
    textAlign: 'center',
    marginBottom: theme.spacing['4xl'],
  },
  pageTitle: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes['2xl'],
    fontWeight: theme.typography.weights.bold,
    letterSpacing: '-0.02em',
    color: theme.colors.heading,
    margin: `0 0 ${theme.spacing.sm} 0`,
  },
  welcomeText: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.bold,
    letterSpacing: '0.2em',
    color: theme.colors.text,
    margin: 0,
  },
};

export default PageHeader;