// src/components/ContactList.jsx
import React from 'react';
import { CONTACTS } from '../utils/constants';
import { theme } from '../styles/theme';

const ContactList = () => {
  return (
    <div style={styles.contactList}>
      {CONTACTS.map((contact) => (
        <a 
          key={contact.label}
          href={contact.url} 
          target={contact.url.startsWith('mailto:') ? undefined : '_blank'}
          rel="noopener noreferrer"
          style={styles.contactItem}
        >
          <span style={styles.contactLabel}>{contact.label}</span>
          <span style={styles.contactValue}>{contact.value}</span>
        </a>
      ))}
    </div>
  );
};

const styles = {
  contactList: {
    marginTop: theme.spacing['3xl'],
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
  },
  contactItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
    background: theme.colors.white,
    border: `1px solid ${theme.colors.border}`,
    textDecoration: 'none',
    transition: `all ${theme.transitions.fast}`,
  },
  contactLabel: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.bold,
    letterSpacing: '0.15em',
    color: theme.colors.heading,
  },
  contactValue: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.normal,
    color: theme.colors.primary,
  },
};

export default ContactList;