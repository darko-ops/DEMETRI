// Build-time prerender. Emits fully static HTML:
//   - dist/index.html            (home — keeps its existing head + noscript)
//   - dist/blog/index.html       (writing index)
//   - dist/blog/<slug>/index.html (one per essay, with Article JSON-LD + OG)
// React hydrates the matching component per URL at runtime (see main.jsx).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, 'dist')
const serverDir = path.resolve(distDir, 'server')
const SITE = 'https://demetri.xyz'

const { render, POSTS } = await import(path.resolve(serverDir, 'entry-server.js'))

const escapeAttr = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

// --- Home: inject into the built template (preserves its head + noscript) ---
const templatePath = path.resolve(distDir, 'index.html')
const template = fs.readFileSync(templatePath, 'utf-8')

// Reuse the hashed asset tags (same JS/CSS bundle for every page).
const assetTags = [
  ...template.matchAll(/<link\b[^>]*rel="(?:stylesheet|modulepreload)"[^>]*>/g),
  ...template.matchAll(/<script\b[^>]*type="module"[^>]*><\/script>/g),
]
  .map((m) => m[0])
  .join('\n    ')

if (!template.includes('<!--app-html-->')) {
  throw new Error('prerender: <!--app-html--> placeholder not found in dist/index.html')
}
fs.writeFileSync(templatePath, template.replace('<!--app-html-->', render('/')))

// --- Shared page template for blog routes ---
function pageHtml({ title, description, canonical, headExtra, bodyHtml }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>${escapeAttr(title)}</title>
    <meta name="description" content="${escapeAttr(description)}" />
    <meta name="author" content="Demetri Hodges" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${canonical}" />
${headExtra}
    ${assetTags}
  </head>
  <body>
    <div id="root">${bodyHtml}</div>
  </body>
</html>
`
}

function writeFile(relPath, html) {
  const full = path.resolve(distDir, relPath)
  fs.mkdirSync(path.dirname(full), { recursive: true })
  fs.writeFileSync(full, html)
}

// --- Blog index ---
const indexJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Writing — Demetri Hodges',
  url: `${SITE}/blog/`,
  author: { '@type': 'Person', name: 'Demetri Hodges', url: `${SITE}/` },
  blogPost: POSTS.filter((p) => p.hasPage).map((p) => ({
    '@type': 'BlogPosting',
    headline: p.title,
    url: `${SITE}/blog/${p.slug}/`,
    datePublished: p.dateISO,
  })),
}

const indexHead = `    <meta property="og:type" content="website" />
    <meta property="og:url" content="${SITE}/blog/" />
    <meta property="og:site_name" content="Demetri Hodges" />
    <meta property="og:title" content="Writing — Demetri Hodges" />
    <meta property="og:description" content="Essays and writing by Demetri Hodges." />
    <meta property="og:image" content="${SITE}/og-image.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Writing — Demetri Hodges" />
    <meta name="twitter:description" content="Essays and writing by Demetri Hodges." />
    <meta name="twitter:image" content="${SITE}/og-image.jpg" />
    <script type="application/ld+json">
${JSON.stringify(indexJsonLd, null, 2)}
    </script>`

writeFile(
  'blog/index.html',
  pageHtml({
    title: 'Writing — Demetri Hodges',
    description: 'Essays and writing by Demetri Hodges.',
    canonical: `${SITE}/blog/`,
    headExtra: indexHead,
    bodyHtml: render('/blog/'),
  })
)

// --- Individual posts ---
let pageCount = 0
for (const post of POSTS.filter((p) => p.hasPage)) {
  const canonical = `${SITE}/blog/${post.slug}/`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    alternativeHeadline: post.subtitle,
    description: post.description,
    datePublished: post.dateISO,
    author: { '@type': 'Person', name: post.author || 'Demetri Hodges', url: `${SITE}/` },
    publisher: { '@type': 'Person', name: 'Demetri Hodges' },
    image: `${SITE}/og-image.jpg`,
    url: canonical,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
  }

  const head = `    <meta property="og:type" content="article" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:site_name" content="Demetri Hodges" />
    <meta property="og:title" content="${escapeAttr(post.title)}" />
    <meta property="og:description" content="${escapeAttr(post.description)}" />
    <meta property="og:image" content="${SITE}/og-image.jpg" />
    <meta property="article:published_time" content="${post.dateISO}" />
    <meta property="article:author" content="${SITE}/" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttr(post.title)}" />
    <meta name="twitter:description" content="${escapeAttr(post.description)}" />
    <meta name="twitter:image" content="${SITE}/og-image.jpg" />
    <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
    </script>`

  writeFile(
    `blog/${post.slug}/index.html`,
    pageHtml({
      title: `${post.title} — Demetri Hodges`,
      description: post.description,
      canonical,
      headExtra: head,
      bodyHtml: render(`/blog/${post.slug}/`),
    })
  )
  pageCount++
}

// --- About (profile) page ---
const aboutDescription =
  'Demetri Hodges — Consultant at Coalfire. Cybersecurity and technology background; B.S. in Business Information Technology (Cybersecurity Management & Analytics) from Virginia Tech, and AWS Certified Cloud Practitioner.'

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  url: `${SITE}/about/`,
  mainEntity: {
    '@type': 'Person',
    name: 'Demetri Hodges',
    url: `${SITE}/`,
    jobTitle: 'Consultant',
    worksFor: { '@type': 'Organization', name: 'Coalfire' },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Virginia Polytechnic Institute and State University',
    },
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'degree',
        name: 'B.S. in Business Information Technology, Cybersecurity Management and Analytics (CMA)',
        dateCreated: '2023',
        recognizedBy: {
          '@type': 'CollegeOrUniversity',
          name: 'Virginia Polytechnic Institute and State University',
        },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'certificate',
        name: 'AWS Certified Cloud Practitioner',
        dateCreated: '2024-02',
        recognizedBy: { '@type': 'Organization', name: 'Amazon Web Services' },
      },
    ],
    sameAs: [
      'https://www.linkedin.com/in/demetri-hodges-418534195/',
      'https://github.com/darko-ops',
      'https://x.com/demetrixyz',
      'https://substack.com/@demetrixyz',
    ],
  },
}

const aboutHead = `    <meta property="og:type" content="profile" />
    <meta property="og:url" content="${SITE}/about/" />
    <meta property="og:site_name" content="Demetri Hodges" />
    <meta property="og:title" content="About — Demetri Hodges" />
    <meta property="og:description" content="${escapeAttr(aboutDescription)}" />
    <meta property="og:image" content="${SITE}/og-image.jpg" />
    <meta property="profile:first_name" content="Demetri" />
    <meta property="profile:last_name" content="Hodges" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="About — Demetri Hodges" />
    <meta name="twitter:description" content="${escapeAttr(aboutDescription)}" />
    <meta name="twitter:image" content="${SITE}/og-image.jpg" />
    <script type="application/ld+json">
${JSON.stringify(aboutJsonLd, null, 2)}
    </script>`

writeFile(
  'about/index.html',
  pageHtml({
    title: 'About — Demetri Hodges',
    description: aboutDescription,
    canonical: `${SITE}/about/`,
    headExtra: aboutHead,
    bodyHtml: render('/about/'),
  })
)

// --- Projects (collection) page ---
const projectsDescription =
  'Products and projects built by Demetri Hodges — including Obius, Bouncr, and Dromo.'

const PERSON_REF = { '@id': `${SITE}/#person` }

const projectsJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  url: `${SITE}/projects/`,
  name: 'Projects — Demetri Hodges',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'SoftwareApplication',
          name: 'Obius',
          url: 'https://obius.io',
          applicationCategory: 'ProductivityApplication',
          operatingSystem: 'iOS',
          description:
            'Node-based thinking and notes app with structure-aware AI, live reusable concepts, immutable versioning, and on-device storage.',
          creator: PERSON_REF,
          offers: [
            { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'USD' },
            {
              '@type': 'Offer',
              name: 'Pro',
              priceCurrency: 'USD',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: '9.99',
                priceCurrency: 'USD',
                billingIncrement: 1,
                unitText: 'MONTH',
              },
            },
          ],
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'SoftwareApplication',
          name: 'Bouncr',
          url: 'https://thebouncr.com',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          description:
            "Drop-in AI pricing-negotiation layer for subscription apps; a deterministic policy engine sets every price so the LLM can't be talked below your floor. Stripe settlement, MCP-native.",
          creator: PERSON_REF,
        },
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: {
          // Dromo is pre-launch (waitlist). Intentionally NO offers, price,
          // availability, or operatingSystem — nothing that implies it ships.
          '@type': 'SoftwareApplication',
          name: 'Dromo',
          url: 'https://www.dromo.fit',
          applicationCategory: 'MusicApplication',
          description:
            "Pace-adaptive running music for iOS (coming soon) that locks your library's tempo to your cadence; on-device analysis, BPM-only data leaves the phone.",
          creator: PERSON_REF,
        },
      },
    ],
  },
}

const projectsHead = `    <meta property="og:type" content="website" />
    <meta property="og:url" content="${SITE}/projects/" />
    <meta property="og:site_name" content="Demetri Hodges" />
    <meta property="og:title" content="Projects — Demetri Hodges" />
    <meta property="og:description" content="${escapeAttr(projectsDescription)}" />
    <meta property="og:image" content="${SITE}/og-image.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Projects — Demetri Hodges" />
    <meta name="twitter:description" content="${escapeAttr(projectsDescription)}" />
    <meta name="twitter:image" content="${SITE}/og-image.jpg" />
    <script type="application/ld+json">
${JSON.stringify(projectsJsonLd, null, 2)}
    </script>`

writeFile(
  'projects/index.html',
  pageHtml({
    title: 'Projects — Demetri Hodges',
    description: projectsDescription,
    canonical: `${SITE}/projects/`,
    headExtra: projectsHead,
    bodyHtml: render('/projects/'),
  })
)

// The SSR bundle is only needed during the build — don't ship it.
fs.rmSync(serverDir, { recursive: true, force: true })

console.log(`Prerendered home + /about/ + /projects/ + /blog/ index + ${pageCount} post page(s).`)
