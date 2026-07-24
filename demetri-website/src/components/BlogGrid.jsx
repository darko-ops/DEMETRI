// src/components/BlogGrid.jsx
import React, { useState } from 'react';
import { BLOG_POSTS } from '../utils/constants';
import { POSTS } from '../content/posts.js';
import { theme } from '../styles/theme';

// Category is defined once on the POSTS objects; map it in by slug so the
// homepage grid and the /blog/ index never drift apart.
const CATEGORY_BY_SLUG = Object.fromEntries(
  POSTS.filter((p) => p.slug).map((p) => [p.slug, p.category])
);
// 'All' first, then each distinct category in the order it appears in POSTS.
const CATEGORIES = ['All', ...Array.from(new Set(POSTS.map((p) => p.category).filter(Boolean)))];

const BlogGrid = () => {
  const [active, setActive] = useState('All');
  const filtered =
    active === 'All'
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => CATEGORY_BY_SLUG[post.slug] === active);

  return (
    <>
      {CATEGORIES.length > 1 && (
        <div style={styles.filterBar} role="group" aria-label="Filter writing by category">
          {CATEGORIES.map((cat) => {
            const isActive = cat === active;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                aria-pressed={isActive}
                style={{ ...styles.filterItem, ...(isActive ? styles.filterItemActive : {}) }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      )}

      <div style={styles.gridContainer} data-blog-grid>
        {filtered.map((post) => {
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
    </>
  );
};

const styles = {
  filterBar: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: theme.spacing.xl,
    marginTop: theme.spacing['2xl'],
  },
  filterItem: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.normal,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: theme.colors.lightGray,
    background: 'none',
    border: 'none',
    borderBottom: '1px solid transparent',
    padding: `0 0 2px`,
    cursor: 'pointer',
    transition: `color ${theme.transitions.fast}`,
  },
  filterItemActive: {
    color: theme.colors.secondary,
    borderBottom: `1px solid ${theme.colors.secondary}`,
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: theme.spacing.xl,
    marginTop: theme.spacing['1xl'],
    marginBottom: theme.spacing['5xl'],
    maxWidth: '800px',
    margin: `${theme.spacing['3xl']} auto ${theme.spacing['5xl']}`,
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
