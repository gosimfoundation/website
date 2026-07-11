/**
 * UI strings for site chrome (nav, footer, labels). Content itself lives in
 * Markdown collections; this is only for the interface.
 *
 * To add French: add `fr` to `languages`, add an `fr` block to `ui`, and add
 * 'fr' to the locales list in astro.config.mjs + the content schema enums.
 */

export const languages = {
  en: 'English',
  zh: '中文',
} as const;

export const defaultLang = 'en';

export type Lang = keyof typeof languages;

export const ui = {
  en: {
    'nav.stories': 'Stories',
    'nav.events': 'Events',
    'nav.projects': 'Projects',
    'nav.galleries': 'Galleries',
    'nav.newsletter': 'Newsletter',
    'hero.eyebrow': 'Editorial Hub / Open Campus',
    'hero.cta.events': 'Explore events',
    'hero.cta.stories': 'Read stories',
    'section.latest': 'Latest stories',
    'section.events': 'Event archive',
    'section.newsletter': 'Newsletter',
    'newsletter.prompt': 'One list for events, stories, and community updates.',
    'newsletter.placeholder': 'you@example.com',
    'newsletter.button': 'Subscribe',
    'footer.tagline': 'A global home for open-source conferences, stories, and community.',
    'readmore': 'Read more',
  },
  zh: {
    'nav.stories': '文章',
    'nav.events': '活动',
    'nav.projects': '项目',
    'nav.galleries': '图库',
    'nav.newsletter': '订阅',
    'hero.eyebrow': '编辑中心 / 开放校园',
    'hero.cta.events': '浏览活动',
    'hero.cta.stories': '阅读文章',
    'section.latest': '最新文章',
    'section.events': '活动存档',
    'section.newsletter': '订阅',
    'newsletter.prompt': '一个列表，涵盖活动、文章与社区动态。',
    'newsletter.placeholder': 'you@example.com',
    'newsletter.button': '订阅',
    'footer.tagline': '开源大会、故事与社区的全球家园。',
    'readmore': '阅读更多',
  },
} as const;
