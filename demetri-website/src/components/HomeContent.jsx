// src/components/HomeContent.jsx
import React from 'react';
import Navigation from './Navigation';
import QuoteBlock from './QuoteBlock';
import { QUOTES, SECTION_CONTENT } from '../utils/constants';
import { theme } from '../styles/theme';

const HomeContent = ({ activeSection, onSectionChange }) => {
  const getTitleText = () => {
    if (!activeSection) return 'GENIUS';
    return SECTION_CONTENT[activeSection]?.title || 'GENIUS';
  };

  const getTightTracking = (txt) => {
    return txt.length >= 4 ? '-0.1em' : '-0.02em';
  };

  const getQuote = () => {
    return QUOTES[activeSection] || QUOTES.home;
  };

  const getContext = () => {
    if (!activeSection) {
      return {
        subtitle: '[WELCOME]',
        text: "I'm Demetri, a self-taught builder and designer. I work across systems, interfaces, and ideas, creating intuitive products with clear logic and minimalist design. GENIUS is the archive : a place to track progress, spot patterns, and refine perspective through writing, audio, and experiments that trace how thought becomes form."
      };
    }
    return {
      subtitle: SECTION_CONTENT[activeSection]?.subtitle || '[WELCOME]',
      text: SECTION_CONTENT[activeSection]?.description || ''
    };
  };
  const handleSubtitleClick = () => {
    if (activeSection) {
      // Calculate the height to scroll: hero (100vh) + home section height
      const heroHeight = window.innerHeight;
      const homeSection = document.querySelector('[data-home-section]');
      const homeSectionHeight = homeSection ? homeSection.offsetHeight : 0;
      
      window.scrollTo({
        top: heroHeight + homeSectionHeight,
        behavior: 'smooth'
      });
    }
  };

  const getSubtitleStyle = () => {
    if (!activeSection) {
      return {
        ...styles.subtitle,
        cursor: 'default',
        opacity: 1,
      };
    }
    return styles.subtitle;
  };
  const titleText = getTitleText();
  const quote = getQuote();
  const context = getContext();

  return (
    <div style={styles.homeSection} data-home-section>
      <div style={styles.threeColumnLayout} data-three-column>
        {/* Left Column */}
        <div style={styles.leftColumn} data-left-column>
          <div style={styles.leftCenterGroup}>
            <h3 style={styles.leftWebsiteName}>
              DEMETRI<span style={{ color: theme.colors.primary }}>.XYZ</span>
            </h3>
            
            <h2
              className="page-name-heading"
              style={{
                ...styles.pageName,
                letterSpacing: getTightTracking(titleText),
              }}
              data-page-name
            >
              {titleText}
            </h2>
          </div>
          <div style={styles.quoteWrapper} data-quote-wrapper>
            <QuoteBlock text={quote.text} author={quote.author} />
          </div>
        </div>

        {/* Center Column - Navigation */}
        <div style={styles.centerColumn} data-center-column>
          <Navigation 
            activeSection={activeSection}
            onSectionChange={onSectionChange}
          />
        </div>

        {/* Right Column - Context */}
        <div style={styles.rightColumn} data-right-column>
          <button 
            onClick={handleSubtitleClick}
            style={getSubtitleStyle()}
            disabled={!activeSection}
            data-subtitle-button
            onMouseEnter={(e) => {
              if (activeSection) {
                e.target.style.opacity = '0.7';
              }
            }}
            onMouseLeave={(e) => {
              if (activeSection) {
                e.target.style.opacity = '1';
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            {context.subtitle}
            {activeSection && (
              <span style={styles.arrowIcon}></span>
            )}
          </button>
          <p style={styles.contextText} data-context-text>{context.text}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  homeSection: {
    maxWidth: theme.layout.maxWidth,
    margin: '0 auto',
    padding: `${theme.spacing['3xl']} ${theme.spacing['4xl']} ${theme.spacing.xl}`,
    position: 'relative',
    minHeight: '60vh',
    background: theme.colors.background,
  },
  threeColumnLayout: {
    display: 'grid',
    gridTemplateColumns: `minmax(0, 1fr) ${theme.layout.centerColumnWidth} minmax(0, 1fr)`,
    gap: theme.spacing['5xl'],
    alignItems: 'start',
    minHeight: '100vh',
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    minHeight: '90vh',
  },
  leftCenterGroup: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '1px',
    width: '100%',
  },
  pageName: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes['3xl'],
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.secondary,
    margin: 0,
    lineHeight: 1,
    whiteSpace: 'nowrap',
  },
  leftWebsiteName: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.bold,
    letterSpacing: '0.2em',
    color: theme.colors.primary,
    margin: 0,
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  quoteWrapper: {
    width: '100%',
    marginTop: theme.spacing['1xl'],
    display: 'flex',
    justifyContent: 'center',
  },
  centerColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh',
    position: 'sticky',
    top: '10vh',
    width: theme.layout.centerColumnWidth,
    flexShrink: 0,
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'bottom',
    minHeight: '110vh',
  },
  subtitle: {
    fontFamily: '"Inter", sans-serif',
    fontSize: theme.typography.sizes.lg,
    fontWeight: 700,
    letterSpacing: '0.1em',
    color: '#537385',
    textAlign: 'right',
    width: '100%',
    marginBottom: theme.spacing.lg,
  },

  contextText: {
    fontFamily: '"Inter", sans-serif',
    fontFamily: '"Inter", sans-serif',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.8,
    color: '#7a7a7a',
    margin: 0,
    textAlign: 'right',
    maxWidth: '600px',
    hyphens: 'none',
    wordSpacing: 'normal',
  },
};

export default HomeContent;