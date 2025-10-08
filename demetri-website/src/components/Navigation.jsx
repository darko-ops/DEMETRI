// src/components/Navigation.jsx
import React from 'react';
import { theme } from '../styles/theme';

const Navigation = ({ activeSection, onSectionChange }) => {
  const navItems = ['podcast', 'blog', 'projects', 'connect'];

  const handleClick = (item) => {
    onSectionChange(item);
  };

  return (
    <nav style={styles.navStack} aria-label="Main navigation">
      {navItems.map((item) => (
        <button
          key={item}
          onClick={() => handleClick(item)}
          onMouseDown={(e) => e.preventDefault()}
          style={{
            ...styles.navStackItem,
            ...(activeSection === item ? styles.navStackItemActive : {})
          }}
          aria-current={activeSection === item ? 'page' : undefined}
        >
          {item.toUpperCase()}
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
  },
  navStackItem: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.bold,
    letterSpacing: '0.15em',
    padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
    background: 'transparent',
    border: `1px solid ${theme.colors.border}`,  // ← Change from transparent to theme.colors.border
    color: theme.colors.text,
    cursor: 'pointer',
    transition: `all ${theme.transitions.fast}`,
    textAlign: 'center',
    whiteSpace: 'nowrap',
    outline: 'none',
    WebkitTapHighlightColor: 'transparent',
    userSelect: 'none',
    border: '1px solid transparent',
    boxShadow: 'none',
    WebkitBoxShadow: 'none',
  },
  navStackItemActive: {
    color: theme.colors.heading,
    borderColor: 'transparent',
    outline: 'none',
    border: '1px solid transparent',
    boxShadow: 'none',
    WebkitBoxShadow: 'none',
    background: 'transparent',
    border: 'transparent',
    outline: 'transparent',                 // remove default outline
    WebkitTapHighlightColor: 'transparent',
  },
};

export default Navigation;