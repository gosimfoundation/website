// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Served from the apex custom domain at the root, so base stays '/'.
  // `www.gosim.org` redirects here; keep `site` and public/CNAME in sync.
  site: 'https://gosim.org',
  base: '/',

  // EN is the default (served at /), ZH at /zh/. Add 'fr' here when the
  // French phase begins — routing and the language picker pick it up.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  // The old blog lived at blog.gosim.org/blogs/<slug>. That host is being
  // retired and forwarded here, but the path segment changed (`/blogs/` →
  // `/blog/`), so a forward alone would land every old link on a 404. These
  // catch the forwarded paths and send each one to its real post.
  //
  // Enumerated rather than pattern-matched: a static build has to know every
  // route up front, and an explicit list is reviewable against MIGRATION.md §3.
  // Astro emits each as an HTML page with a meta refresh and a canonical link.
  redirects: {
    ...Object.fromEntries(
      [
        'welcome-to-gosim-blog',
        'the-gateway-to-robotics-is-autonomous-driving',
        'star-surpasses-35k',
        'dialog-with-gary-bradski-the-father-of-opencv',
        'dialogue-with-makepad-creator-rik-arends',
        'what-is-the-most-effective-application-of-large-models-in-autonous-driving',
        'jim-blandy-before-rusts-birth-i-thought-c-had-reached-the-pinnacle-of-system-programming-languages',
        '11-year-google-product-manager-kevin-moore',
        'dialogue-with-rust-pioneer-josh-triplett',
        'scaling-remains-the-most-crucial-factor-in-model-training',
        'dialogue-with-jenia-jitsev-laion-research-lead',
        'data-quality-determines-model-performance',
      ].flatMap((slug) => [
        [`/blogs/${slug}`, `/blog/${slug}`],
        [`/zh/blogs/${slug}`, `/zh/blog/${slug}`],
      ])
    ),
    // Two slugs changed on the way over and so can't be derived from the old
    // ones: Nuxt turned this post's `$` into the literal word "dollar", and
    // "State of Rust UI" dropped its trailing ordinal.
    '/blogs/using-dollar160000-to-train-moxin-7b': '/blog/using-160000-dollar-to-train-moxin-7b',
    '/zh/blogs/using-dollar160000-to-train-moxin-7b': '/zh/blog/using-160000-dollar-to-train-moxin-7b',
    '/blogs/state-of-rust-ui-1': '/blog/state-of-rust-ui',
    '/zh/blogs/state-of-rust-ui-1': '/zh/blog/state-of-rust-ui',
    '/blogs': '/blog',
    '/zh/blogs': '/zh/blog',
  },

  integrations: [mdx(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
});
