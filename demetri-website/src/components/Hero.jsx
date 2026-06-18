// src/components/Hero.jsx
import React from 'react';
import { theme } from '../styles/theme';

const Hero = () => {
  return (
    <div style={styles.hero}>
      <div style={styles.heroContent}>
        <p style={styles.subheadline}>INTELLIGENCE : RESEARCH</p>
        
        {/* Centered Photo */}
        <div style={styles.photoContainer}>
          <img 
            src="/hero.jpg"
            alt="Demetri Hodges"
            style={styles.photo}
            className="hero-photo"
          />
        </div>
        
        <h1 style={styles.siteTitle} data-hero-title>
          DEMETRI<span style={{ color: 'white' }}>.XYZ</span>
        </h1>
        <h2 style={styles.headline} data-hero-headline>
          EXPLORATION  <br />
          THROUGH INTUITION<br />
        </h2>
        <p style={styles.tagline} data-hero-tagline>A CIRCULAR RUINS CREATION</p>
      </div>
    </div>
  );
};

const styles = {
  hero: {
    background: theme.colors.background,
    height: '100vh',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: `1px solid ${theme.colors.border}`,
  },
  heroContent: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  subheadline: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.bold,
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    color: theme.colors.secondary,
    position: 'absolute',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    margin: 0,
  },
  photoContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 0,
  },
  photo: {
    width: '350px',
    height: '500px',
    objectFit: 'cover',
  },
  siteTitle: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes['6xl'],
    fontWeight: theme.typography.weights.bold,
    letterSpacing: '-0.09em',
    color: 'white',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    margin: 0,
    whiteSpace: 'nowrap',
    zIndex: 0,

  },
  headline: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    letterSpacing: '0.05em',
    lineHeight: 1.4,
    color: '#545454',
    position: 'absolute',
    bottom: '50px',
    left: '60px',
    margin: 0,
  },
  tagline: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.bold,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: theme.colors.secondary,
    position: 'absolute',
    bottom: '20px',
    right: '60px',
    margin: 0,
  },
};

export default Hero;