import { ui, defaultLang, type Lang } from './ui';

/** Extract the locale from a URL pathname (e.g. /zh/blog -> 'zh'). */
export function getLangFromUrl(url: URL): Lang {
  const [, seg] = url.pathname.split('/');
  if (seg in ui) return seg as Lang;
  return defaultLang;
}

/** Returns a translator bound to a locale, falling back to the default lang. */
export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/**
 * Rough reading time in minutes for a Markdown body.
 *
 * Latin text is counted in words (~200 wpm). Chinese has no word delimiters, so
 * counting "words" there returns almost nothing — it is counted in characters
 * instead (~400 cpm). Mixed posts (Chinese prose with Latin product names) get
 * both, which is why the two are summed rather than branched on `lang`.
 */
export function readingMinutes(markdown: string): number {
  const text = markdown
    .replace(/```[\s\S]*?```/g, '') // fenced code blocks
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1') // links/images -> their label
    .replace(/[#>*_`~|-]/g, ' '); // leftover markdown punctuation
  const cjk = (text.match(/[㐀-䶿一-鿿]/g) ?? []).length;
  const words = (text.match(/[A-Za-z0-9'’-]+/g) ?? []).length;
  return Math.max(1, Math.round(cjk / 400 + words / 200));
}

/** Build a locale-aware path. EN (default) has no prefix; others get /<lang>. */
export function localizedPath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === defaultLang) return clean;
  return `/${lang}${clean === '/' ? '' : clean}`;
}
