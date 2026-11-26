/**
 * One-shot migration of the old Nuxt Content blog (../blog) into this site's
 * `blog` collection. See MIGRATION.md for why each transform exists.
 *
 * Everything editorial — slugs, tags, dates, alt text, credits — is tabled
 * below rather than derived, so the output is reviewable against the plan.
 * Delete this file once the migration is committed.
 *
 * NOTE: only 7 posts carry a `zh` entry below — the ones the old repo had
 * genuinely translated. The other 7 Chinese posts were translated by hand
 * afterwards and live only in src/content/blog/zh/. This script does not know
 * about them and will not overwrite them; re-running it is safe.
 *
 *   node scripts/migrate-blog.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const SRC = '/Users/guofoo/git/gosim/blog/content';
const DST = 'src/content/blog';

/** Credits normalized to one label set; see MIGRATION.md §5.4. */
const en = (author, interview, editor, produced = 'GOSIM') => ({
  author,
  credits: [
    ['Author', author],
    interview && ['Interview', interview],
    editor && ['Editor', editor],
    produced && ['Produced by', produced],
  ].filter(Boolean),
});
const zh = (author, interview, editor, produced = 'GOSIM 开源创新汇') => ({
  author,
  credits: [
    ['作者', author],
    interview && ['采访', interview],
    editor && ['编辑', editor],
    produced && ['出品', produced],
  ].filter(Boolean),
});

const POSTS = [
  {
    n: 1,
    slug: 'welcome-to-gosim-blog',
    image: 'blog1.jpg',
    date: '2024-07-11',
    promoteHeadings: true,
    en: {
      tags: ['community', 'open source'],
      alt: 'The GOSIM Conference stage, a wide LED screen reading "GOSIM Conference Sept. 26" above a Shanghai skyline illustration and rows of sponsor logos',
      author: 'GOSIM Editorial Team',
    },
    zh: {
      tags: ['社区', '开源'],
      alt: 'GOSIM 大会舞台，大型 LED 屏幕显示「GOSIM Conference Sept. 26」，下方是上海天际线插画与赞助商标识',
      author: 'GOSIM 编辑团队',
    },
  },
  {
    n: 2,
    // Old slug was `state-of-rust-ui-1`; the trailing ordinal is dropped here
    // and in the title, so the redirect for this one can't be derived.
    slug: 'state-of-rust-ui',
    image: 'blog-2-1.jpg',
    date: '2025-01-31',
    promoteHeadings: true,
    en: {
      title: 'State of Rust UI',
      tags: ['rust', 'ui', 'open source'],
      alt: 'A white line-art skyline of Dutch landmarks on orange, with the RustNL and GOSIM Europe 2024 logos',
      author: 'GOSIM Editorial Team',
      inlineAlt:
        "Schedule entry for 'The State of Rust GUI' at 10:00, with the talk abstract and links to speaker Nico Burns and the presentation",
    },
    zh: {
      title: 'Rust UI 状态',
      tags: ['Rust', 'UI', '开源'],
      alt: '橙色背景上以白色线条勾勒的荷兰地标天际线，配有 RustNL 与 GOSIM Europe 2024 标识',
      author: 'GOSIM 编辑团队',
      inlineAlt: '「The State of Rust GUI」10:00 的日程条目，含演讲摘要以及讲者 Nico Burns 与演示文稿的链接',
    },
  },
  {
    n: 3,
    slug: 'the-gateway-to-robotics-is-autonomous-driving',
    image: 'blog3-german-ros-sanchez.jpg',
    date: '2025-03-19',
    en: {
      tags: ['open agi forum', 'robotics', 'autonomous driving', 'simulation'],
      alt: 'German Ros Sanchez of NVIDIA, mid-gesture in conversation with a GOSIM interviewer',
      // Source read "Haper Zhuo"; corrected against four other posts.
      ...en('Harper Zhuo', 'Eric Wang', 'Monica He'),
    },
    zh: {
      tags: ['Open AGI Forum', '机器人', '自动驾驶', '仿真'],
      alt: '英伟达的 German Ros Sanchez 一边比划一边与 GOSIM 访谈者交谈',
      ...zh('Harper Zhuo', 'Eric Wang', 'He Miao', 'GOSIM'),
    },
  },
  {
    n: 4,
    slug: 'star-surpasses-35k',
    image: 'blog4-yaowei-zheng.jpg',
    date: '2025-03-24',
    en: {
      tags: ['open agi forum', 'ai', 'fine-tuning'],
      alt: 'Yaowei Zheng, author of LLaMA Factory, in conversation with a GOSIM interviewer',
      ...en('Monica He', 'Echo Tang', null, null),
    },
  },
  {
    n: 5,
    slug: 'dialog-with-gary-bradski-the-father-of-opencv',
    image: 'blog5-gary-bradski.jpg',
    date: '2025-03-18',
    en: {
      tags: ['open agi forum', 'computer vision', 'robotics'],
      alt: 'Gary Bradski laughing mid-conversation with a GOSIM interviewer',
      // Source credited Eric Wang as "Interview & Editing" — split across both.
      ...en('Annie Xu', 'Eric Wang', 'Eric Wang'),
    },
  },
  {
    n: 6,
    slug: 'dialogue-with-makepad-creator-rik-arends',
    image: 'blog6-rik-arends.jpg',
    date: '2025-03-22',
    en: {
      tags: ['open agi forum', 'rust', 'ui'],
      alt: 'Rik Arends, creator of Makepad, in conversation with a GOSIM interviewer',
      ...en('Harper Zhuo', 'Eric Wang', 'Monica He'),
    },
  },
  {
    n: 7,
    slug: 'what-is-the-most-effective-application-of-large-models-in-autonous-driving',
    image: 'blog7-ming-cen.jpg',
    date: '2025-03-17',
    en: {
      tags: ['open agi forum', 'autonomous driving', 'ai'],
      alt: 'Ming Cen of Chongqing University in conversation with a GOSIM interviewer',
      ...en('Harper Zhuo', 'Echo Tang', 'Monica He'),
    },
  },
  {
    n: 8,
    slug: 'jim-blandy-before-rusts-birth-i-thought-c-had-reached-the-pinnacle-of-system-programming-languages',
    image: 'blog8-jim-blandy.jpg',
    date: '2025-03-21',
    en: {
      tags: ['open agi forum', 'rust', 'systems programming'],
      alt: 'Jim Blandy, author of Programming Rust, in conversation with a GOSIM interviewer',
      ...en('Monica He', 'Eric Wang'),
    },
  },
  {
    n: 9,
    slug: '11-year-google-product-manager-kevin-moore',
    image: 'blog9-kevin-moore.jpg',
    date: '2025-03-23',
    en: {
      tags: ['open agi forum', 'flutter', 'cross-platform'],
      alt: 'Kevin Moore, product manager for Dart and Flutter, in conversation with a GOSIM interviewer',
      ...en('Harper Zhuo', 'Eric Wang', 'Monica He'),
    },
  },
  {
    n: 10,
    slug: 'dialogue-with-rust-pioneer-josh-triplett',
    image: 'blog10-josh-triplett.jpg',
    date: '2025-03-20',
    en: {
      tags: ['open agi forum', 'rust', 'systems programming'],
      alt: 'Josh Triplett, Rust project lead, in conversation with a GOSIM interviewer',
      ...en('Harper Zhuo', 'Eric Wang', 'Monica He'),
    },
  },
  {
    n: 11,
    slug: 'using-160000-dollar-to-train-moxin-7b',
    image: 'blog11-yanzhi-wang.jpg',
    date: '2025-06-24',
    en: {
      tags: ['open agi forum', 'ai', 'open models'],
      alt: 'Yanzhi Wang, professor at Northeastern University, in conversation with a GOSIM interviewer',
      ...en('Monica He', 'Eric Wang'),
    },
    zh: {
      // Source ZH frontmatter was still English; translated here.
      title: '16 万美元训练出的 Moxin 7B，挑战 Llama 与「越大越好」的 AI 信条 | Open AGI Forum',
      description: '对话美国东北大学教授王言治',
      tags: ['Open AGI Forum', 'AI', '开源模型'],
      alt: '美国东北大学教授王言治与 GOSIM 访谈者对话',
      ...zh('何苗、刘景伟', 'Echo Tang'),
    },
  },
  {
    n: 12,
    slug: 'scaling-remains-the-most-crucial-factor-in-model-training',
    image: 'blog12-baosong-yang.jpg',
    date: '2025-06-24',
    en: {
      tags: ['open agi forum', 'ai', 'model training'],
      alt: "Baosong Yang, scientist at Alibaba's Tongyi Lab, in conversation with a GOSIM interviewer",
      ...en('Echo Tang', 'Echo Tang', 'Shiqi Wang, Monica He'),
    },
    zh: {
      title: 'Scaling 仍是模型训练中最关键的因素 | Open AGI Forum',
      description: '对话阿里通义实验室科学家杨宝嵩',
      tags: ['Open AGI Forum', 'AI', '模型训练'],
      alt: '阿里巴巴通义实验室科学家杨宝嵩与 GOSIM 访谈者对话',
      ...zh('唐小引 Echo Tang', '唐小引 Echo Tang', '王诗琪、何苗'),
    },
  },
  {
    n: 13,
    slug: 'dialogue-with-jenia-jitsev-laion-research-lead',
    image: 'blog13-jenia-jitsev.jpg',
    date: '2025-06-24',
    en: {
      tags: ['open agi forum', 'ai', 'research'],
      alt: 'Jenia Jitsev, scientific lead at LAION, in conversation with a GOSIM interviewer',
      ...en('Eric Wang', 'Eric Wang'),
    },
    zh: {
      title: '对话 LAION 科研负责人 Jenia Jitsev | Open AGI Forum',
      description: '一场从「绝望」中诞生的科学复兴',
      tags: ['Open AGI Forum', 'AI', '科研'],
      alt: 'LAION 科研负责人 Jenia Jitsev 与 GOSIM 访谈者对话',
      ...zh('王启隆 Eric Wang', '王启隆 Eric Wang'),
    },
  },
  {
    n: 14,
    slug: 'data-quality-determines-model-performance',
    image: 'blog14-greg-schoeninger.jpg',
    date: '2025-07-10',
    en: {
      tags: ['open agi forum', 'ai', 'data'],
      alt: 'Greg Schoeninger, CEO of Oxen.ai, standing beside a GOSIM interviewer',
      ...en('Shiqi Wang, Monica He', 'Eric Wang', 'Monica He'),
    },
    zh: {
      title: '数据质量决定模型表现，正如环境塑造人——对话 Oxen.ai CEO Greg Schoeninger',
      description: '对话 Oxen.ai CEO Greg Schoeninger，聊数据质量与模型表现',
      tags: ['Open AGI Forum', 'AI', '数据'],
      alt: 'Oxen.ai CEO Greg Schoeninger 与 GOSIM 访谈者并肩而立',
      ...zh('王诗棋 何苗', '王启隆 Eric Wang'),
    },
  },
];

/** Locate a source file by its leading post number; filenames vary. */
function sourceFor(dir, n) {
  const hit = readdirSync(dir).find((f) => f.match(/^(\d+)\./)?.[1] === String(n));
  if (!hit) throw new Error(`no source for post ${n} in ${dir}`);
  return join(dir, hit);
}

function splitFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error('no frontmatter');
  const fields = {};
  for (const line of m[1].split(/\r?\n/)) {
    const f = line.match(/^([A-Za-z]+):\s*(.*)$/);
    if (!f) continue;
    let v = f[2].trim().replace(/^['"]|['"]$/g, '');
    fields[f[1].toLowerCase()] = v;
  }
  return { fields, body: m[2] };
}

/** A byline line: emphasized, containing one of four pipe characters. */
const BYLINE = /^\*[^*]*[|｜丨][^*]*\*\s*$/;

function transformBody(body, post, locale, meta) {
  let lines = body.split(/\r?\n/);

  // Drop the leading byline block; credits are re-emitted at the foot.
  let i = 0;
  while (i < lines.length && lines[i].trim() === '') i++;
  const start = i;
  while (i < lines.length && BYLINE.test(lines[i])) i++;
  if (i > start) lines = lines.slice(i);

  let out = lines.join('\n');

  // U+200D zero-width joiner and U+00A0 non-breaking space, both invisible
  // in the source and both meaningless here.
  out = out.replace(/[‍ ]/g, (c) => (c === ' ' ? ' ' : ''));

  // Posts 1 and 2 open at h3 under the h1, skipping a level.
  if (post.promoteHeadings) out = out.replace(/^### /gm, '## ');

  // Post 2's only inline image is wrapped in a link with no destination.
  if (meta.inlineAlt) {
    out = out.replace(
      /\[!\[[^\]]*\]\(\/blogs-img\/blog-2-2\.jpg\)\]/,
      `![${meta.inlineAlt}](../../../assets/blog/blog-2-2.jpg)`
    );
  }

  out = out.replace(/^\s+/, '').replace(/\s+$/, '');

  if (meta.credits?.length) {
    // Two trailing spaces per line: Markdown hard breaks. A blank line before
    // the rule stops it parsing as a setext underline.
    const block = meta.credits.map(([k, v]) => `*${k} | ${v}*  `).join('\n');
    out += `\n\n---\n\n${block.replace(/\s+$/, '')}`;
  }

  return out + '\n';
}

const yamlStr = (s) => `"${String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;

/**
 * Drop the "| Open AGI Forum" suffix. The tag chip above the headline already
 * says it, and so does the cover art — four repeats in one screenful.
 * Handles the fullwidth pipe and the one source title missing its space.
 */
const stripSeriesSuffix = (title) => title.replace(/\s*[|｜]\s*Open AGI Forum\s*$/i, '').trim();

let written = 0;
for (const post of POSTS) {
  for (const locale of ['en', 'zh']) {
    const meta = post[locale];
    if (!meta) continue; // ZH exists only for the seven real translations.

    const src = sourceFor(locale === 'en' ? `${SRC}/blogs` : `${SRC}/zh/blogs`, post.n);
    const { fields, body } = splitFrontmatter(readFileSync(src, 'utf8'));

    const fm = [
      '---',
      `title: ${yamlStr(stripSeriesSuffix(meta.title ?? fields.title))}`,
      `description: ${yamlStr(meta.description ?? fields.description)}`,
      `date: ${post.date}`,
      `lang: ${locale}`,
      `author: ${yamlStr(meta.author)}`,
      `tags: [${meta.tags.map(yamlStr).join(', ')}]`,
      `image: "../../../assets/blog/${post.image}"`,
      `imageAlt: ${yamlStr(meta.alt)}`,
      '---',
      '',
    ].join('\n');

    const dest = join(DST, locale, `${post.slug}.md`);
    writeFileSync(dest, fm + transformBody(body, post, locale, meta));
    written++;
    console.log(`${locale}  ${post.slug}`);
  }
}
console.log(`\n${written} files written`);
