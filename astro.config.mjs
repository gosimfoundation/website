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

  integrations: [mdx(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
});
