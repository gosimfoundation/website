// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Served from a custom domain at the root, so base stays '/'.
  // Update `site` (and public/CNAME) when the production domain changes.
  site: 'https://testnew.gosim.org',
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
