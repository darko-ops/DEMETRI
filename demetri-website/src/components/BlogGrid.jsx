// src/components/BlogGrid.jsx
import React from 'react';
import { BLOG_POSTS } from '../utils/constants';
import { theme } from '../styles/theme';

const BlogGrid = () => {
  return (
    <div style={styles.gridContainer}>
      {BLOG_POSTS.map((post) => {
        const hasPage = Boolean(post.slug);
        const href = hasPage ? `/blog/${post.slug}/` : post.url;
        return (
        <a
          key={post.id}
          href={href}
          target={hasPage ? undefined : '_blank'}
          rel={hasPage ? undefined : 'noopener noreferrer'}
          style={styles.gridItem}
        >
          <div style={styles.sheet}>
            {/* Paper/Sheet visual */}
            <div style={styles.sheetLines}>
              {[...Array(8)].map((_, i) => (
                <div key={i} style={styles.line} />
              ))}
            </div>
          </div>
          <h3 style={styles.postTitle}>{post.title}</h3>
          <p style={styles.postDate}>{post.date}</p>
        </a>
        );
      })}
    </div>
  );
};

const styles = {
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: theme.spacing.xl,
    marginTop: theme.spacing['1xl'],
    marginBottom: theme.spacing['5xl'],
    maxWidth: '1000px',
    margin: `${theme.spacing['4xl']} auto ${theme.spacing['5xl']}`,
  },
  gridItem: {
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: `transform ${theme.transitions.fast}`,
    cursor: 'pointer',
    width: '130px',
    margin: '0 auto',
  },
  sheet: {
    width: '100%',
    aspectRatio: '8.5 / 11',
    background: theme.colors.white,
    border: `1px solid ${theme.colors.border}`,
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    position: 'relative',
    overflow: 'hidden',
  },
  sheetLines: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
    paddingTop: '20px',
  },
  line: {
    width: '100%',
    height: '1px',
    background: 'rgba(0,0,0,0.06)',
  },
  postTitle: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.heading,
    textAlign: 'center',
    margin: 0,
    letterSpacing: '0.02em',
  },
  postDate: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.normal,
    color: theme.colors.lightGray,
    textAlign: 'center',
    margin: `${theme.spacing.xs} 0 0 0`,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },
};

export default BlogGrid;