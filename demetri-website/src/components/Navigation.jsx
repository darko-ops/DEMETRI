// src/components/Navigation.jsx
import React from 'react';
import { theme } from '../styles/theme';

const Navigation = ({ activeSection, onSectionChange }) => {
  const navItems = [
    { key: 'podcast', label: 'About' },
    { key: 'blog', label: 'Writing' },
    { key: 'projects', label: 'Projects' },
    { key: 'sound', label: 'Sound' },
    { key: 'connect', label: 'Connect' },
  ];

  const handleClick = (item) => {
    onSectionChange(item);
  };

  return (
    <nav style={styles.navStack} aria-label="Main navigation">
      {navItems.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => handleClick(key)}
          onMouseDown={(e) => e.preventDefault()}
          style={{
            ...styles.navStackItem,
            ...(activeSection === key ? styles.navStackItemActive : {})
          }}
          aria-current={activeSection === key ? 'page' : undefined}
        >
          {label.toUpperCase()}
        </button>
      ))}
    </nav>
  );
};

const styles = {
  navStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.xl,
    width: '100%',
    maxWidth: theme.layout.centerColumnWidth,
  },
  navStackItem: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.bold,
    letterSpacing: '0.15em',
    padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
    background: 'transparent',
    border: `none`,
    color: theme.colors.text,
    cursor: 'pointer',
    transition: `all ${theme.transitions.fast}`,
    textAlign: 'center',
    whiteSpace: 'nowrap',
    outline: 'none',
    WebkitTapHighlightColor: 'transparent',
    userSelect: 'none',
    boxShadow: 'none',
    WebkitBoxShadow: 'none',
  },
  navStackItemActive: {
    color: theme.colors.heading,
    borderColor: 'transparent',
    outline: 'none',
    boxShadow: 'none',
    WebkitBoxShadow: 'none',
    background: 'transparent',
  },
};

export default Navigation;