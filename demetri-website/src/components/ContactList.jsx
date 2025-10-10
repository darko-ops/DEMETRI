// src/components/ContactGrid.jsx
import React from 'react';
import { CONTACTS } from '../utils/constants';
import { theme } from '../styles/theme';

const ContactGrid = () => {
  return (
    <div style={styles.gridContainer}>
      {CONTACTS.map((contact) => (
        <a 
          key={contact.label}
          href={contact.url} 
          target={contact.url.startsWith('mailto:') ? undefined : '_blank'}
          rel="noopener noreferrer"
          style={styles.contactCard}
        >
          <div style={styles.iconContainer}>
            {getIcon(contact.label)}
          </div>
          <h3 style={styles.contactLabel}>{contact.label}</h3>
          <p style={styles.contactValue}>{contact.value}</p>
        </a>
      ))}
    </div>
  );
};

const getIcon = (label) => {
  const iconStyle = {
    width: '48px',
    height: '48px',
    strokeWidth: '1.5',
  };

  switch(label) {
    case 'EMAIL':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={theme.colors.primary} style={iconStyle}>
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      );
    case 'LINKEDIN':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={theme.colors.primary} style={iconStyle}>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <rect x="2" y="9" width="4" height="12"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      );
    case 'GITHUB':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={theme.colors.primary} style={iconStyle}>
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
        </svg>
      );
    default:
      return null;
  }
};

const styles = {
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: theme.spacing['2xl'],
    marginTop: theme.spacing['4xl'],
    marginBottom: theme.spacing['5xl'],
  },
  contactCard: {
    textDecoration: 'none',
    background: theme.colors.white,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: '12px',
    padding: theme.spacing['3xl'],
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    transition: `all ${theme.transitions.fast}`,
    minHeight: '200px',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  iconContainer: {
    marginBottom: theme.spacing.lg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactLabel: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    letterSpacing: '0.1em',
    color: theme.colors.heading,
    margin: `0 0 ${theme.spacing.sm} 0`,
  },
  contactValue: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.normal,
    color: theme.colors.text,
    margin: 0,
    lineHeight: 1.6,
  },
};

export default ContactGrid;