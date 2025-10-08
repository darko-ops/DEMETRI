// src/components/PodcastCarousel.jsx
import React from 'react';
import { useCarousel } from '../hooks/useCarousel';
import { theme } from '../styles/theme';

const PodcastCarousel = ({ episodes }) => {
  const {
    currentSlide,
    isFlipping,
    dragOffset,
    handleNext,
    handlePrev,
    goToSlide,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleKeyDown,
  } = useCarousel(episodes.length);

  if (episodes.length === 0) return null;

  const currentEpisode = episodes[currentSlide];

  return (
    <div style={styles.carouselWrapper}>
      {/* Previous Button */}
      <button 
        onClick={handlePrev}
        onKeyDown={handleKeyDown}
        style={{...styles.navButton, ...styles.navButtonLeft}}
        disabled={isFlipping}
        aria-label="Previous episode"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>

      {/* Carousel Container */}
      <div 
        style={styles.carouselContainer}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="region"
        aria-label="Podcast episodes carousel"
        tabIndex="0"
        onKeyDown={handleKeyDown}
      >
        <div 
          style={{
            ...styles.flipCard,
            transform: `translateX(${dragOffset}px) rotateY(${isFlipping ? '180deg' : '0deg'})`,
          }}
        >
          <div style={styles.flipCardInner}>
            <div style={styles.episodeCard}>
              <div style={styles.episodeNumber}>
                EP {currentEpisode.episode_number || currentSlide + 1}
              </div>
              <h2 style={styles.episodeTitle}>{currentEpisode.title}</h2>
              <div style={styles.episodeDate}>{currentEpisode.date}</div>
              <p style={styles.episodeDescription}>
                {currentEpisode.description}
              </p>
              <a 
                href={currentEpisode.link} 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.episodeLink}
              >
                Listen now →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Next Button */}
      <button 
        onClick={handleNext}
        onKeyDown={handleKeyDown}
        style={{...styles.navButton, ...styles.navButtonRight}}
        disabled={isFlipping}
        aria-label="Next episode"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>

      {/* Progress Bar */}
      <div style={styles.progressBar}>
        <div style={styles.progressTrack} role="tablist">
          {episodes.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                ...styles.progressDot,
                ...(currentSlide === index ? styles.progressDotActive : {})
              }}
              role="tab"
              aria-selected={currentSlide === index}
              aria-label={`Go to episode ${index + 1}`}
            />
          ))}
        </div>
        <div style={styles.progressText} aria-live="polite">
          {currentSlide + 1} / {episodes.length}
        </div>
      </div>
    </div>
  );
};

const styles = {
  carouselWrapper: {
    marginTop: theme.spacing['4xl'],
    marginBottom: theme.spacing['4xl'],
    position: 'relative',
  },
  carouselContainer: {
    position: 'relative',
    maxWidth: theme.layout.centerColumnWidth,
    margin: '0 auto',
    height: '280px',
    perspective: '1000px',
    cursor: 'grab',
    userSelect: 'none',
  },
  flipCard: {
    width: '100%',
    height: '100%',
    transition: `transform ${theme.transitions.slow} cubic-bezier(0.4, 0, 0.2, 1)`,
  },
  flipCardInner: {
    width: '100%',
    height: '100%',
  },
  episodeCard: {
    width: '100%',
    height: '100%',
    background: theme.colors.white,
    border: `1px solid ${theme.colors.border}`,
    padding: `${theme.spacing['3xl']} ${theme.spacing['2xl']}`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  episodeNumber: {
    fontFamily: theme.typography.fontFamily,
    fontSize: '42px',
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
    letterSpacing: '0.05em',
  },
  episodeTitle: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.bold,
    marginBottom: theme.spacing.sm,
    color: theme.colors.heading,
    letterSpacing: '-0.01em',
  },
  episodeDate: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.normal,
    color: theme.colors.lightGray,
    marginBottom: theme.spacing.md,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  episodeDescription: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.normal,
    color: '#8a8a8a',
    marginBottom: theme.spacing.lg,
    lineHeight: 1.6,
  },
  episodeLink: {
    fontFamily: theme.typography.fontFamily,
    color: theme.colors.primary,
    textDecoration: 'none',
    borderBottom: `1px solid ${theme.colors.primary}`,
    fontSize: '13px',
    fontWeight: theme.typography.weights.normal,
    padding: '2px 0',
    transition: `opacity ${theme.transitions.fast}`,
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '36px',
    height: '36px',
    background: 'transparent',
    border: 'none',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: `all ${theme.transitions.fast}`,
    zIndex: 10,
    color: theme.colors.secondary,
  },
  navButtonLeft: {
    left: '-18px',
  },
  navButtonRight: {
    right: '-18px',
  },
  progressBar: {
    marginTop: theme.spacing.xl,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  },
  progressTrack: {
    display: 'flex',
    gap: '6px',
    alignItems: 'center',
  },
  progressDot: {
    width: '6px',
    height: '6px',
    background: theme.colors.border,
    borderRadius: '50%',
    cursor: 'pointer',
    transition: `all ${theme.transitions.medium}`,
    border: 'none',
    padding: 0,
  },
  progressDotActive: {
    width: '24px',
    height: '6px',
    borderRadius: '3px',
    background: theme.colors.primary,
  },
  progressText: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.normal,
    color: theme.colors.lightGray,
    letterSpacing: '0.05em',
  },
};

export default PodcastCarousel;