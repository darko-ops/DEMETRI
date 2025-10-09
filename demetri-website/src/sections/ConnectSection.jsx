// src/sections/ConnectSection.jsx
import React from 'react';
import ContactGrid from '../components/ContactGrid';
import { theme } from '../styles/theme';

const ConnectSection = () => {
  return (
    <div style={styles.connectSection}>
      <h1 style={styles.title}>Contact me</h1>
      <p style={styles.subtitle}>
        Let's collaborate, discuss ideas, or just say hello
      </p>
      <ContactGrid />
    </div>
  );
};

const styles = {
  connectSection: {
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
    textAlign: 'center',
    margin: `${theme.spacing.md} 0 ${theme.spacing.sm}`,
  },
  subtitle: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.normal,
    color: theme.colors.text,
    textAlign: 'center',
    margin: `0 auto ${theme.spacing.xl}`,
    maxWidth: '600px',
  },
};

export default ConnectSection;