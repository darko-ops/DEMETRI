// src/content/posts.js
// Central registry of writing. Posts with `hasPage: true` get a prerendered
// HTML page at /blog/<slug>/; PDF-only entries link straight to the PDF.
import { theDoldrums } from './posts/the-doldrums.js';
import { massDriftTheory } from './posts/mass-drift-theory.js';

export const POSTS = [
  theDoldrums,
  massDriftTheory,
];

export function getPost(slug) {
  return POSTS.find((p) => p.slug === slug) || null;
}

// Link target for a post: its HTML page if it has one, otherwise the PDF.
export function postHref(post) {
  return post.hasPage ? `/blog/${post.slug}/` : post.pdf;
}
