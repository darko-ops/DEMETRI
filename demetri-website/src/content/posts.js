// src/content/posts.js
// Central registry of writing. Posts with `hasPage: true` get a prerendered
// HTML page at /blog/<slug>/; PDF-only entries link straight to the PDF.
import { theFairnessDiscoverabilityCeiling } from './posts/the-fairness-discoverability-ceiling.js';
import { theTestThatBroke } from './posts/the-test-that-broke.js';
import { theLiesILoved } from './posts/the-lies-i-loved.js';
import { theGreatForgetting } from './posts/the-great-forgetting.js';
import { theDoldrums } from './posts/the-doldrums.js';
import { massDriftTheory } from './posts/mass-drift-theory.js';

export const POSTS = [
  theFairnessDiscoverabilityCeiling,
  theTestThatBroke,
  theLiesILoved,
  theGreatForgetting,
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
