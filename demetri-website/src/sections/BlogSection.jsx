// src/sections/BlogSection.jsx
import React from 'react';
import BlogGrid from '../components/BlogGrid';
import { theme } from '../styles/theme';

const BlogSection = () => {
  return (
    <div style={styles.blogSection}>
      <h1 style={styles.title}>Observations</h1>
      <BlogGrid />
    </div>
  );
};

const styles = {
  blogSection: {
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
    margin: `${theme.spacing['0xl']} 0`,
  },
};

export default BlogSection;