import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Content collections for the E "Civic Archive" page system.
 *
 * Authoring model: plain Markdown/MDX (source of truth in git), with a Decap
 * CMS `/admin` UI on top for non-technical editors (see public/admin/config.yml).
 *
 * i18n: content is organized in per-language folders (e.g. blog/en, blog/zh).
 * The `lang` field is also stored in frontmatter so routes and filters don't
 * have to parse the path. Add 'fr' to the enums when the French phase starts.
 */

const langEnum = z.enum(['en', 'zh', 'fr']);

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      lang: langEnum.default('en'),
      author: z.string().default('GOSIM Editorial Team'),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
    }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    // Human-readable date/range shown in the UI (e.g. "May 5–6, 2026").
    // Falls back to a formatted `date` when omitted.
    dateLabel: z.string().optional(),
    location: z.string().optional(),
    // Card background image (path under /public), e.g. "/events/paris.png".
    image: z.string().optional(),
    // External event website. When set, event links open this in a new tab
    // instead of an internal details page.
    url: z.string().url().optional(),
    // Call-for-Proposals link — shown as a CTA on the upcoming-event banner.
    cfp: z.string().url().optional(),
    // Localized (Chinese) event website; used on /zh, falls back to `url`.
    urlZh: z.string().url().optional(),
    status: z.enum(['upcoming', 'past', 'draft']).default('upcoming'),
    lang: langEnum.default('en'),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date().optional(),
    repo: z.string().url().optional(),
    lang: langEnum.default('en'),
  }),
});

const galleries = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/galleries' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date().optional(),
    city: z.string().optional(),
    lang: langEnum.default('en'),
  }),
});

export const collections = { blog, events, projects, galleries };
