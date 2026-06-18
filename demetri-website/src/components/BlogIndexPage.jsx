// src/components/BlogIndexPage.jsx
import React from 'react';
import { POSTS, postHref } from '../content/posts.js';
import { theme } from '../styles/theme';

const BlogIndexPage = () => {
  return (
    <div style={styles.page}>
      <header style={styles.topbar}>
        <a href="/" style={styles.brand}>
          DEMETRI<span style={{ color: theme.colors.primary }}>.XYZ</span>
        </a>
        <a href="/" style={styles.backLink}>← Home</a>
      </header>

      <main style={styles.main}>
        <h1 style={styles.title}>Writing</h1>
        <ul style={styles.list}>
          {POSTS.map((post) => (
            <li key={post.slug} style={styles.item}>
              <a href={postHref(post)} style={styles.postLink}>{post.title}</a>
              <p style={styles.date}>{post.dateDisplay}</p>
              {post.description && <p style={styles.desc}>{post.description}</p>}
            </li>
          ))}
        </ul>
      </main>

      <footer style={styles.footer}>
        © {new Date().getFullYear()} Demetri. All rights reserved.
      </footer>
    </div>
  );
};

const styles = {
  page: {
    fontFamily: theme.typography.fontFamily,
    background: theme.colors.background,
    color: theme.colors.text,
    minHeight: '100vh',
    margin: 0,
  },
  topbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '720px',
    margin: '0 auto',
    padding: `${theme.spacing['2xl']} ${theme.spacing.xl}`,
  },
  brand: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.bold,
    letterSpacing: '0.2em',
    color: theme.colors.heading,
    textDecoration: 'none',
  },
  backLink: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.normal,
    letterSpacing: '0.05em',
    color: theme.colors.primary,
    textDecoration: 'none',
  },
  main: {
    maxWidth: '720px',
    margin: '0 auto',
    padding: `${theme.spacing.xl} ${theme.spacing.xl} ${theme.spacing['5xl']}`,
  },
  title: {
    fontFamily: theme.typography.fontFamily,
    fontSize: '44px',
    fontWeight: theme.typography.weights.bold,
    letterSpacing: '-0.02em',
    color: theme.colors.heading,
    margin: `${theme.spacing.lg} 0 ${theme.spacing['3xl']}`,
  },
  list: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing['2xl'],
  },
  item: {
    paddingBottom: theme.spacing['2xl'],
    borderBottom: `1px solid ${theme.colors.border}`,
  },
  postLink: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.bold,
    letterSpacing: '-0.01em',
    color: theme.colors.heading,
    textDecoration: 'none',
  },
  date: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.normal,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    color: theme.colors.lightGray,
    margin: `${theme.spacing.xs} 0 0`,
  },
  desc: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.normal,
    lineHeight: 1.6,
    color: theme.colors.text,
    margin: `${theme.spacing.sm} 0 0`,
  },
  footer: {
    fontFamily: theme.typography.fontFamily,
    textAlign: 'center',
    padding: '30px 0',
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.normal,
    color: theme.colors.lightGray,
    background: theme.colors.white,
    borderTop: `1px solid ${theme.colors.border}`,
  },
};

export default BlogIndexPage;
