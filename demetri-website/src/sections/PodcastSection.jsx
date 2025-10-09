// src/sections/PodcastSection.jsx
import React from 'react';
import PodcastDisplay from '../components/PodcastDisplay';
import { useEpisodes } from '../hooks/useEpisodes';
import { theme } from '../styles/theme';

const PodcastSection = () => {
  const { episodes, loading, error } = useEpisodes();

  return (
    <div style={styles.podcastSection}>
      <h1 style={styles.title}>Episodes</h1>
      <p style={styles.subtitle}>
        Exploring intelligence, design, and human progress through conversation
      </p>
      
      {error && (
        <div style={styles.error} role="alert">
          {error}
        </div>
      )}
      
      {loading ? (
        <div style={styles.loading}>Loading episodes...</div>
      ) : (
        <PodcastDisplay episodes={episodes} />
      )}
    </div>
  );
};

const styles = {
  podcastSection: {
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
    margin: `${theme.spacing.md} 0 ${theme.spacing.sm}`,
  },
  subtitle: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.normal,
    color: theme.colors.text,
    textAlign: 'left',
    margin: `0 auto ${theme.spacing.xl}`,
    maxWidth: '700px',
  },
  error: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.base,
    color: '#dc2626',
    textAlign: 'center',
    padding: theme.spacing.xl,
    background: '#fee2e2',
    border: '1px solid #fecaca',
    borderRadius: '8px',
    marginBottom: theme.spacing.xl,
  },
  loading: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.base,
    color: theme.colors.text,
    textAlign: 'center',
    padding: theme.spacing['3xl'],
  },
};

export default PodcastSection;