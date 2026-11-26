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
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      lang: langEnum.default('en'),
      author: z.string().default('GOSIM Editorial Team'),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      // Optional cover, as a path relative to this Markdown file (same
      // convention as events). Posts without one fall back to a typographic
      // header, so this never has to be filled in.
      image: image().optional(),
      imageAlt: z.string().optional(),
    }),
});

const highlightCopy = z.object({ title: z.string(), summary: z.string() });
const highlightResources = z.array(z.object({
  en: z.string(),
  zh: z.string(),
  url: z.string().url(),
  urlZh: z.string().url().optional(),
})).default([]);

const events = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/events' }),
  schema: ({ image }) => {
    const highlightVideo = z.object({
      youtubeId: z.string().regex(/^[\w-]{11}$/),
      thumbnail: image().optional(),
      en: z.string(),
      zh: z.string(),
    }).optional();

    return z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      // Human-readable date/range shown in the UI (e.g. "May 5–6, 2026").
      // Falls back to a formatted `date` when omitted.
      dateLabel: z.string().optional(),
      endDate: z.coerce.date().optional(),
      location: z.string().optional(),
      // Card background image — a path *relative to this Markdown file* into
      // src/assets, e.g. "../../assets/events/paris.png". The image() helper
      // resolves it to ImageMetadata so <Image> can emit optimized WebP.
      image: image().optional(),
      // External event website. When set, event links open this in a new tab
      // instead of an internal details page.
      url: z.string().url().optional(),
      // Call-for-Proposals link — shown as a CTA on the upcoming-event banner.
      cfp: z.string().url().optional(),
      // Localized (Chinese) event website; used on /zh, falls back to `url`.
      urlZh: z.string().url().optional(),
      status: z.enum(['upcoming', 'past', 'draft']).default('upcoming'),
      lang: langEnum.default('en'),
      highlight: z.object({
        en: highlightCopy,
        zh: highlightCopy,
        workshop: z.object({
          en: highlightCopy,
          zh: highlightCopy,
          video: highlightVideo,
          resources: highlightResources,
        }).optional(),
        spotlight: z.object({
          en: highlightCopy,
          zh: highlightCopy,
          url: z.string().url(),
        }).optional(),
        photo: z.object({ image: image(), en: z.string(), zh: z.string() }).optional(),
        video: highlightVideo,
        resources: highlightResources,
      }).optional(),
    });
  },
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
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date().optional(),
    city: z.string().optional(),
    lang: langEnum.default('en'),
    photos: z.array(z.object({
      image: image(),
      caption: z.string(),
      alignTop: z.boolean().optional(),
    })).default([]),
  }),
});

export const collections = { blog, events, projects, galleries };
