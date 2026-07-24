// src/sections/ConnectSection.jsx
import React from 'react';
import ContactGrid from '../components/ContactGrid';
import { theme } from '../styles/theme';

const ConnectSection = () => {
  return (
    <div style={styles.connectSection} data-section-container>
      <h1 style={styles.title}>CONNECT</h1>
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
    fontFamily: "'IBM Plex Mono', 'SF Mono', Menlo, monospace",
    fontSize: '12px',
    fontWeight: 400,
    letterSpacing: '0.3em',
    color: '#b8b3aa',
    textAlign: 'left',
    margin: `${theme.spacing.md} 0 0`,
  },
};

export default ConnectSection;