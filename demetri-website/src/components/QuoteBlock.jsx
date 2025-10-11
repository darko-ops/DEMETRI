// src/components/QuoteBlock.jsx
import React from 'react';
import { theme } from '../styles/theme';

const QuoteBlock = React.memo(({ text, author }) => {
  return (
    <div className="quote-block" style={styles.container}>
      <p className="quote-block__text" style={styles.quote}>{text}</p>
      <span className="quote-block__author" style={styles.author}>— {author}</span>
    </div>
  );
});

QuoteBlock.displayName = 'QuoteBlock';

const styles = {
  container: {
    textAlign: 'left',
    alignItems: 'flex-start',
    width: '100%',
  },
  quote: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.bold,
    letterSpacing: '0.05em',
    lineHeight: 1,
    color: theme.colors.secondary,
    margin: 0,
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