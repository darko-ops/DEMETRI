// src/components/BlogPost.jsx
import React from 'react';
import { theme } from '../styles/theme';

const BlogPost = ({ post }) => {
  return (
    <div style={styles.page}>
      <header style={styles.topbar}>
        <a href="/" style={styles.brand}>
          DEMETRI<span style={{ color: theme.colors.primary }}>.XYZ</span>
        </a>
        <a href="/blog/" style={styles.backLink}>← All writing</a>
      </header>

      <article style={styles.article}>
        <h1 style={styles.title}>{post.title}</h1>
        {post.subtitle && <p style={styles.subtitle}>{post.subtitle}</p>}
        <p style={styles.byline}>{post.byline} · {post.dateDisplay}</p>

        <div style={styles.body}>
          {post.body.map((block, i) =>
            block.type === 'h2' ? (
              <h2 key={i} style={styles.h2}>{block.text}</h2>
            ) : (
              <p key={i} style={styles.paragraph}>{block.text}</p>
            )
          )}
        </div>

        {post.pdf && (
          <div style={styles.pdfRow}>
            <a href={post.pdf} style={styles.pdfLink} target="_blank" rel="noopener noreferrer">
              Download PDF
            </a>
          </div>
        )}
      </article>

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
  article: {
    maxWidth: '720px',
    margin: '0 auto',
    padding: `${theme.spacing.xl} ${theme.spacing.xl} ${theme.spacing['5xl']}`,
  },
  title: {
    fontFamily: theme.typography.fontFamily,
    fontSize: '44px',
    lineHeight: 1.1,
    fontWeight: theme.typography.weights.bold,
    letterSpacing: '-0.02em',
    color: theme.colors.heading,
    margin: `${theme.spacing.lg} 0 ${theme.spacing.md}`,
  },
  subtitle: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.normal,
    lineHeight: 1.35,
    color: theme.colors.secondary,
    margin: `0 0 ${theme.spacing.lg}`,
  },
  byline: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.normal,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    color: theme.colors.lightGray,
    margin: `0 0 ${theme.spacing['3xl']}`,
    paddingBottom: theme.spacing['2xl'],
    borderBottom: `1px solid ${theme.colors.border}`,
  },
  body: {
    fontSize: '18px',
  },
  h2: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.bold,
    letterSpacing: '-0.01em',
    color: theme.colors.heading,
    margin: `${theme.spacing['3xl']} 0 ${theme.spacing.md}`,
  },
  paragraph: {
    fontFamily: theme.typography.fontFamily,
    fontSize: '18px',
    fontWeight: theme.typography.weights.normal,
    lineHeight: 1.75,
    color: '#3f3f3f',
    margin: `0 0 ${theme.spacing.xl}`,
  },
  pdfRow: {
    marginTop: theme.spacing['4xl'],
    paddingTop: theme.spacing['2xl'],
    borderTop: `1px solid ${theme.colors.border}`,
  },
  pdfLink: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.bold,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: theme.colors.primary,
    textDecoration: 'none',
    border: `1px solid ${theme.colors.border}`,
    borderRadius: '8px',
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    display: 'inline-block',
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

export default BlogPost;
