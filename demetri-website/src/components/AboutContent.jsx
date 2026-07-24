// src/components/AboutContent.jsx
// Shared Background / Experience / Education rendering, used by both the
// homepage About section and the standalone /about/ page.
import React from 'react';
import { BACKGROUND, EXPERIENCE, EDUCATION } from '../content/about.js';
import { theme } from '../styles/theme';

const AboutContent = () => {
  return (
    <div style={styles.aboutSection} data-section-container>
      {/* Background */}
      <h1 style={styles.title}>BACKGROUND</h1>
      <div style={styles.prose}>
        {BACKGROUND.map((paragraph, i) => (
          <p key={i} style={styles.paragraph}>{paragraph}</p>
        ))}
      </div>

      {/* Experience */}
      <h2 style={styles.sectionHeading}>EXPERIENCE</h2>
      <div style={styles.entries}>
        {EXPERIENCE.map((item, i) => (
          <div key={i} style={styles.entry}>
            <div style={styles.entryHeader}>
              <span style={styles.entryOrgName}>{item.org}</span>
              {item.location && <span style={styles.entryLocation}>{item.location}</span>}
            </div>
            {item.roles.map((role, r) => (
              <div key={r} style={styles.roleLine}>
                <span style={styles.roleTitle}>{role.title}</span>
                <span style={styles.entryDate}>{role.date}</span>
              </div>
            ))}
            {item.description && <p style={styles.entryDetail}>{item.description}</p>}
            {item.bullets.length > 0 && (
              <ul style={styles.bulletList}>
                {item.bullets.map((bullet, b) => (
                  <li key={b} style={styles.bullet}>{bullet}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Education */}
      <h2 style={styles.sectionHeading}>EDUCATION</h2>
      <div style={styles.entries}>
        {EDUCATION.map((item, i) => (
          <div key={i} style={styles.entry}>
            <div style={styles.entryHeader}>
              <span style={styles.entryOrgName}>{item.org}</span>
              {item.date && <span style={styles.entryDate}>{item.date}</span>}
            </div>
            {item.sub && <div style={styles.roleTitle}>{item.sub}</div>}
            {item.detail && <p style={styles.entryDetail}>{item.detail}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  aboutSection: {
    maxWidth: '820px',
    margin: '0 auto',
    padding: `0 ${theme.spacing['4xl']} ${theme.spacing['4xl']}`,
    minHeight: 'calc(100vh - 200px)',
  },
  title: {
    fontFamily: "'IBM Plex Mono', 'SF Mono', Menlo, monospace",
    fontSize: '12px',
    fontWeight: 400,
    letterSpacing: '0.3em',
    color: '#b8b3aa',
    textAlign: 'left',
    margin: `${theme.spacing.md} 0 ${theme.spacing.lg}`,
  },
  sectionHeading: {
    fontFamily: "'IBM Plex Mono', 'SF Mono', Menlo, monospace",
    fontSize: '12px',
    fontWeight: 400,
    letterSpacing: '0.3em',
    color: '#b8b3aa',
    textAlign: 'left',
    margin: `${theme.spacing['3xl']} 0 ${theme.spacing.lg}`,
  },
  prose: {
    maxWidth: '720px',
  },
  paragraph: {
    fontFamily: theme.typography.fontFamily,
    fontSize: '16px',
    fontWeight: theme.typography.weights.normal,
    lineHeight: 1.8,
    color: '#5a5a5a',
    margin: `0 0 ${theme.spacing.lg}`,
  },
  entries: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing['2xl'],
    maxWidth: '720px',
  },
  entry: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.xs,
  },
  entryHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: theme.spacing.md,
    flexWrap: 'wrap',
  },
  entryOrgName: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.heading,
    letterSpacing: '0.01em',
  },
  entryLocation: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.normal,
    color: '#9a9a9a',
    whiteSpace: 'nowrap',
  },
  roleLine: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: theme.spacing.md,
    flexWrap: 'wrap',
  },
  roleTitle: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.normal,
    color: theme.colors.primary,
  },
  entryDate: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.normal,
    color: '#9a9a9a',
    whiteSpace: 'nowrap',
  },
  entryDetail: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.normal,
    fontStyle: 'italic',
    lineHeight: 1.7,
    color: '#7a7a7a',
    margin: `${theme.spacing.xs} 0 0`,
  },
  bulletList: {
    margin: `${theme.spacing.sm} 0 0`,
    paddingLeft: '1.1em',
    listStyleType: 'disc',
  },
  bullet: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.normal,
    lineHeight: 1.6,
    color: '#6f6f6f',
    marginBottom: theme.spacing.xs,
  },
};

export default AboutContent;
