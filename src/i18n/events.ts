import { getCollection } from 'astro:content';
import { defaultLang, type Lang } from './ui';

export async function getLocalizedEvents(lang: Lang) {
  const events = await getCollection('events');
  const local = events.filter(({ data }) => data.lang === lang);
  const entries = local.length ? local : events.filter(({ data }) => data.lang === defaultLang);
  return entries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
