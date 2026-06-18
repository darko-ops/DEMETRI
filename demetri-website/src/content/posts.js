// src/content/posts.js
// Central registry of writing. Posts with `hasPage: true` get a prerendered
// HTML page at /blog/<slug>/; PDF-only entries link straight to the PDF.
import { theDoldrums } from './posts/the-doldrums.js';

export const POSTS = [
  theDoldrums,
  {
    slug: 'mass-drift-theory',
    title: 'Mass Drift Theory',
    subtitle: 'A Macrodynamic Framework for Systemic Shifts in Collective Opinion',
    dateDisplay: 'May 2025',
    dateISO: '2025-05',
    description:
      'A macrodynamic framework for systemic shifts in collective opinion.',
    pdf: '/papers/Mass Drift Theory- A Macrodynamic Framework for Systemic Shifts in Collective Opinion.pdf',
    hasPage: false,
  },
];

export function getPost(slug) {
  return POSTS.find((p) => p.slug === slug) || null;
}

// Link target for a post: its HTML page if it has one, otherwise the PDF.
export function postHref(post) {
  return post.hasPage ? `/blog/${post.slug}/` : post.pdf;
}
