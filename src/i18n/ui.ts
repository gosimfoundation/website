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
    'nav.about': 'About',
    'nav.founders': 'Founders',
    'nav.pillars': 'Pillars',
    'nav.stories': 'Stories',
    'nav.events': 'Events',
    'nav.spotlights': 'Spotlights',
    'nav.upcoming': 'Upcoming',
    'nav.projects': 'Projects',
    'nav.galleries': 'Galleries',
    'nav.newsletter': 'Newsletter',
    'nav.privacy': 'Privacy',
    'hero.eyebrow': 'Created by the Open-Source Community, For the Open-Source Community',
    'hero.cta.events': 'Explore events',
    'hero.cta.stories': 'Read stories',
    'section.latest': 'Latest stories',
    'section.events': 'Events',
    'section.newsletter': 'Newsletter',
    'newsletter.prompt': 'Stay connected to receive occasional updates',
    'newsletter.placeholder': 'you@example.com',
    'newsletter.name': 'Your name (optional)',
    'newsletter.button': 'Subscribe',
    'newsletter.loading': 'Subscribing…',
    'newsletter.success': 'You’re subscribed — thanks for joining!',
    'newsletter.exists': 'You’re already on the list.',
    'newsletter.invalid': 'Please enter a valid email address.',
    'newsletter.rate': 'Too many attempts — please try again in a minute.',
    'newsletter.error': 'Something went wrong — please try again.',
    'footer.tagline': 'Created by the Open-Source Community, For the Open-Source Community.',
    'readmore': 'Read more',
    'scroll.hint': 'Scroll',
  },
  zh: {
    'nav.about': '关于',
    'nav.founders': '创始人',
    'nav.pillars': '支柱',
    'nav.stories': '文章',
    'nav.events': '活动',
    'nav.spotlights': '聚焦',
    'nav.upcoming': '近期活动',
    'nav.projects': '项目',
    'nav.galleries': '图库',
    'nav.newsletter': '订阅',
    'nav.privacy': '隐私',
    'hero.eyebrow': '由开源社区创建，服务于开源社区',
    'hero.cta.events': '浏览活动',
    'hero.cta.stories': '阅读文章',
    'section.latest': '最新文章',
    'section.events': '活动',
    'section.newsletter': '订阅',
    'newsletter.prompt': '保持联系，接收不定期更新',
    'newsletter.placeholder': 'you@example.com',
    'newsletter.name': '你的姓名（选填）',
    'newsletter.button': '订阅',
    'newsletter.loading': '订阅中…',
    'newsletter.success': '订阅成功，感谢加入！',
    'newsletter.exists': '你已在订阅列表中。',
    'newsletter.invalid': '请输入有效的邮箱地址。',
    'newsletter.rate': '尝试过于频繁，请稍后再试。',
    'newsletter.error': '出错了，请稍后重试。',
    'footer.tagline': '由开源社区创建，服务于开源社区。',
    'readmore': '阅读更多',
    'scroll.hint': '向下滚动',
  },
} as const;
