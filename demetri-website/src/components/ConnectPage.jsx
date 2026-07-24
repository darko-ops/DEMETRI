// src/components/ConnectPage.jsx
// Standalone, prerendered /connect/ page. Reuses the shared ConnectSection
// and wraps it in the same page chrome as the other standalone pages.
import React from 'react';
import ConnectSection from '../sections/ConnectSection';
import { theme } from '../styles/theme';

const ConnectPage = () => {
  return (
    <div style={styles.page}>
      <header style={styles.topbar}>
        <a href="/" style={styles.brand}>
          DEMETRI<span style={{ color: theme.colors.primary }}>.XYZ</span>
        </a>
        <a href="/" style={styles.backLink}>← Home</a>
      </header>

      <main style={styles.main}>
        <ConnectSection />
      </main>

      <footer style={styles.footer}>
        © {new Date().getFullYear()} Demetri. All rights reserved.
      </footer>
    </div>
  );
};

const styles = {
  page: {
    fontFamily: theme.typography.fontFamily,
    background: theme.colors.background,
    color: theme.colors.text,
    minHeight: '100vh',
    margin: 0,
  },
  topbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1100px',
    margin: '0 auto',
    padding: `${theme.spacing['2xl']} ${theme.spacing.xl}`,
  },
  brand: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.bold,
    letterSpacing: '0.2em',
    color: theme.colors.heading,
    textDecoration: 'none',
  },
  backLink: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.normal,
    letterSpacing: '0.05em',
    color: theme.colors.primary,
    textDecoration: 'none',
  },
  main: {
    paddingTop: theme.spacing.xl,
  },
  footer: {
    fontFamily: theme.typography.fontFamily,
    textAlign: 'center',
    padding: '30px 0',
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.normal,
    color: theme.colors.lightGray,
    background: theme.colors.white,
    borderTop: `1px solid ${theme.colors.border}`,
  },
};

export default ConnectPage;
