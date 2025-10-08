// src/sections/PodcastSection.jsx
import React from 'react';
import SectionLayout from '../components/SectionLayout';
import PageHeader from '../components/PageHeader';
import PodcastCarousel from '../components/PodcastCarousel';
import { useEpisodes } from '../hooks/useEpisodes';
import { SECTION_CONTENT, QUOTES } from '../utils/constants';
import { theme } from '../styles/theme';

const PodcastSection = () => {
  const { episodes, loading, error } = useEpisodes();
  const content = SECTION_CONTENT.podcast;
  const quote = QUOTES.podcast;

  return (
    <SectionLayout 
      label={content.label}
      quoteText="YOU HAVE ENEMIES? GOOD.\nTHAT MEANS YOU STOOD\nUP FOR SOMETHING,\nSOMETIME IN YOUR LIFE."
      quoteAuthor="WINSTON CHURCHILL"
    >
      <PageHeader 
        subtitle={content.subtitle}
        description={content.description}
      />
      
      {error && (
        <div style={styles.error} role="alert">
          {error}
        </div>
      )}
      
      {loading ? (
        <div style={styles.loading}>Loading episodes...</div>
      ) : (
        <PodcastCarousel episodes={episodes} />
      )}
    </SectionLayout>
  );
};

const styles = {
  error: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.base,
    color: '#dc2626',
    textAlign: 'center',
    padding: theme.spacing.xl,
    background: '#fee2e2',
    border: '1px solid #fecaca',
    borderRadius: '4px',
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