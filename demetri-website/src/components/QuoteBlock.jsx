// src/components/QuoteBlock.jsx
import React from 'react';
import { theme } from '../styles/theme';

const QuoteBlock = React.memo(({ text, author }) => {
  return (
    <div style={styles.container}>
      <p style={styles.quote}>{text}</p>
      <span style={styles.author}>— {author}</span>
    </div>
  );
});

QuoteBlock.displayName = 'QuoteBlock';

const styles = {
  container: {
    textAlign: 'flex-start',
    alignItems: 'center',
  },
  quote: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.bold,
    letterSpacing: '0.05em',
    lineHeight: 1,
    color: theme.colors.secondary,
    margin: 0,
    whiteSpace: 'pre',
  },
  author: {
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.primary,
    display: 'block',
    marginTop: theme.spacing.sm,
    letterSpacing: '0.05em',
  },
};

export default QuoteBlock;