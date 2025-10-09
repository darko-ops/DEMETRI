// src/components/PodcastDisplay.jsx
import React from 'react';
import { theme } from '../styles/theme';

const PodcastDisplay = ({ episodes }) => {
  if (episodes.length === 0) return null;

  const latestEpisode = episodes[0];
  const recentEpisodes = episodes.slice(1, 4); // Next 3 episodes

  return (
    <div style={styles.container}>
      {/* Featured Latest Episode */}
      <div style={styles.featuredSection}>
        <div style={styles.featuredCard}>
          <div style={styles.episodeHeader}>
            <span style={styles.episodeNumber}>
              EP {latestEpisode.episode_number || 1}
            </span>
            <span style={styles.latestBadge}>LATEST</span>
          </div>
          
          <h2 style={styles.featuredTitle}>{latestEpisode.title}</h2>
          <p style={styles.featuredDate}>{latestEpisode.date}</p>
          <p style={styles.featuredDescription}>{latestEpisode.description}</p>
          
          {/* Spotify Embed */}
          {latestEpisode.spotify_embed_url && (
            <div style={styles.spotifyContainer}>
              <iframe
                src={latestEpisode.spotify_embed_url}
                style={styles.spotifyEmbed}
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title={`Spotify player for ${latestEpisode.title}`}
              />
            </div>
          )}
          
          {latestEpisode.link && !latestEpisode.spotify_embed_url && (
            <a 
              href={latestEpisode.link}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.listenButton}
            >
              Listen on Spotify →
            </a>
          )}
        </div>
      </div>

      {/* Recent Episodes Grid */}
      {recentEpisodes.length > 0 && (
        <div style={styles.recentSection}>
          <h3 style={styles.recentTitle}>Recent Episodes</h3>
          <div style={styles.recentGrid}>
            {recentEpisodes.map((episode) => (
              <a
                key={episode.id}
                href={episode.link}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.recentCard}
              >
                <span style={styles.recentEpNumber}>
                  EP {episode.episode_number}
                </span>
                <h4 style={styles.recentCardTitle}>{episode.title}</h4>
                <p style={styles.recentCardDate}>{episode.date}</p>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    marginTop: theme.spacing['4xl'],
    marginBottom: theme.spacing['5xl'],
  },
  featuredSection: {
    marginBottom: theme.spacing['5xl'],
  },
  featuredCard: {
    background: theme.colors.white,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: '12px',
    padding: theme.spacing['4xl'],
    maxWidth: '900px',
    margin: '0 auto',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  episodeHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  episodeNumber: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.primary,
    letterSpacing: '0.05em',
  },
  latestBadge: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.bold,
    letterSpacing: '0.15em',
    color: theme.colors.white,
    background: theme.colors.primary,
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: '4px',
  },
  featuredTitle: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes['2xl'],
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.heading,
    margin: `0 0 ${theme.spacing.sm} 0`,
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
  },
  featuredDate: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.normal,
    color: theme.colors.lightGray,
    margin: `0 0 ${theme.spacing.lg} 0`,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },
  featuredDescription: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.normal,
    color: theme.colors.text,
    margin: `0 0 ${theme.spacing['2xl']} 0`,
    lineHeight: 1.8,
  },
  spotifyContainer: {
    marginTop: theme.spacing['2xl'],
  },
  spotifyEmbed: {
    width: '100%',
    height: '232px',
    borderRadius: '12px',
  },
  listenButton: {
    display: 'inline-block',
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.primary,
    textDecoration: 'none',
    padding: `${theme.spacing.md} ${theme.spacing['2xl']}`,
    border: `1px solid ${theme.colors.primary}`,
    borderRadius: '8px',
    transition: `all ${theme.transitions.fast}`,
    marginTop: theme.spacing['2xl'],
  },
  recentSection: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  recentTitle: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    letterSpacing: '0.05em',
    color: theme.colors.heading,
    margin: `0 0 ${theme.spacing['2xl']} 0`,
    textAlign: 'center',
  },
  recentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: theme.spacing['2xl'],
  },
  recentCard: {
    textDecoration: 'none',
    background: theme.colors.white,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: '12px',
    padding: theme.spacing['2xl'],
    transition: `all ${theme.transitions.fast}`,
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  recentEpNumber: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.primary,
    letterSpacing: '0.1em',
    display: 'block',
    marginBottom: theme.spacing.sm,
  },
  recentCardTitle: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.heading,
    margin: `0 0 ${theme.spacing.xs} 0`,
    lineHeight: 1.4,
  },
  recentCardDate: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.normal,
    color: theme.colors.lightGray,
    margin: 0,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },
};

export default PodcastDisplay;