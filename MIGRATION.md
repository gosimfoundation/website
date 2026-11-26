# Blog migration: `blog.gosim.org` → `gosim.org/blog`

Plan for moving the old Nuxt Content blog (`../blog`, repo
`gosimfoundation/blog`, live at `https://blog.gosim.org`) into this Astro site's
`blog` collection. Written **2026-08-03** from a full read of the source.

## Status

**Phases 1–2 complete and verified (2026-08-05), uncommitted.**

- 15 covers in `src/assets/blog/`, lowercase-kebab, CJK filenames romanized.
- 30 posts — 15 EN, 15 ZH (7 from the script, 7 hand-translated 2026-08-05).
- `npm run build` clean: **46 pages** (was 18). Every blog page carries
  `og:image`; sampled one resolves to a real 1200×630 JPEG.
- Both archives and a post page checked in a browser: chips, date order,
  credits block, and the next-post link all render correctly.
- The `| Open AGI Forum` suffix is stripped from all titles (the tag chip and the
  cover art already say it).
- **Phase 4 done:** 30 redirects in `astro.config.mjs`, verified end-to-end.

**Phase 3** (editorial) folded into Phase 2 — alt text, tags, credits, and the
four ZH title/description translations were tabled in `scripts/migrate-blog.mjs`
rather than done as a separate pass.

**Remaining:** nothing in this repo. The DNS half — pointing `blog.gosim.org`
here with a **path-preserving** forward — is deliberately deferred until after
this work is deployed, and is tracked as `BACKLOG.md` item 4. Nothing is
committed yet.

## Decisions locked 2026-08-03

- **§5.1** — migrate only the 7 genuinely translated ZH posts. Translating the
  other 7 was completed on 2026-08-05 — all 15 ZH posts now exist.
- **§5.2** — drop the `gosim` tag entirely as redundant, and retag per the table.
- **§5.5** — spread the eight posts tied at `2025-3-17` one day apart, randomly
  assigned. Drawn once and recorded below; do not re-roll.
- **§3** — post 11's slug becomes `using-160000-dollar-to-train-moxin-7b`;
  post 2's becomes `state-of-rust-ui` (2026-08-06, ordinal dropped from the
  slug and the title in both locales).
- **§5.6** — `state-of-rust-ui` ships **published** (`draft: false`), matching
  the live site rather than the stale `published: false` flag.
- **§5.4** — option **(b)**: the *Author* line drives the `author` frontmatter
  field; the remaining credits move to a normalized block at the foot of the body.
- **§5.3** — alt text describes who is pictured, naming neither the card type nor
  the title. Final strings tabled in §5.3.

**All content decisions are settled.** Only §8 questions 3–4 remain, and neither
blocks the migration.

---

## 1. What's actually there

| | Count | Notes |
| --- | --- | --- |
| EN posts | 14 | `../blog/content/blogs/*.md` |
| ZH posts | 14 | `../blog/content/zh/blogs/*.md` — **7 are not translated**, see §5.1 |
| Cover images | 15 referenced | `../blog/public/blogs-img/`, all **1920×1080 or larger** |
| Inline body images | **1** | only in post 2, and it's malformed |
| Raw HTML / MDC components | **0** | clean CommonMark throughout |

**This is a genuinely easy migration.** No Vue components in content, no
shortcodes, no image galleries, no code blocks needing a highlighter swap. The
work is almost entirely frontmatter translation plus editorial cleanup.

The two real risks are **not** technical: seven fake Chinese posts (§5.1) and
tag data that would make twelve of fifteen cards look identical (§5.2).

---

## 2. Frontmatter mapping

Old (Nuxt Content) → new (`src/content.config.ts` `blog` schema):

| Old field | New field | Transform |
| --- | --- | --- |
| `title` | `title` | verbatim; quote titles containing `:` or `#` |
| `description` | `description` | verbatim |
| `date: 2024-7-11` | `date: 2024-07-11` | **zero-pad** — YAML's timestamp rule is fussy about unpadded month/day; don't rely on `z.coerce.date()` rescuing it |
| `image: /blogs-img/blog1.jpg` | `image: "../../../assets/blog/<name>.jpg"` | public URL → path relative to the `.md`, so `image()` can optimize it |
| `alt: First Post` | `imageAlt` | **junk in 13 of 14 posts** — must be rewritten, see §5.3 |
| `ogImage` / `ogimage` | *(dropped)* | `BaseLayout` derives the OG card from `image` |
| `tags` | `tags` | **needs curation**, see §5.2 |
| `published: true` | `draft: false` | **inverted** — get this backwards and drafts go live |
| — | `lang` | `en` / `zh`, from which folder the file came from |
| — | `author` | defaults to `GOSIM Editorial Team`; see §5.4 |

Note the old data has `ogImage` in 12 files and `ogimage` in 2 (posts 13, 14) —
match case-insensitively when parsing, then drop it either way.

---

## 3. Slugs and redirects

Nuxt Content strips the `N.` ordering prefix, so the live URLs are
`https://blog.gosim.org/blogs/<slug>/` and `/zh/blogs/<slug>/`. **All 28 were
verified live** — the list below is measured, not inferred.

Recommendation: **keep every slug byte-identical except posts 2 and 11.**
Stable slugs keep the redirect map mechanical and reviewable.

| # | Old slug (live today) | New slug |
| --- | --- | --- |
| 1 | `welcome-to-gosim-blog` | unchanged |
| 2 | `state-of-rust-ui-1` | **`state-of-rust-ui`** |
| 3 | `the-gateway-to-robotics-is-autonomous-driving` | unchanged |
| 4 | `star-surpasses-35k` | unchanged |
| 5 | `dialog-with-gary-bradski-the-father-of-opencv` | unchanged |
| 6 | `dialogue-with-makepad-creator-rik-arends` | unchanged |
| 7 | `what-is-the-most-effective-application-of-large-models-in-autonous-driving` | unchanged (see note) |
| 8 | `jim-blandy-before-rusts-birth-i-thought-c-had-reached-the-pinnacle-of-system-programming-languages` | unchanged |
| 9 | `11-year-google-product-manager-kevin-moore` | unchanged |
| 10 | `dialogue-with-rust-pioneer-josh-triplett` | unchanged |
| 11 | `using-dollar160000-to-train-moxin-7b` | **`using-160000-dollar-to-train-moxin-7b`** |
| 12 | `scaling-remains-the-most-crucial-factor-in-model-training` | unchanged |
| 13 | `dialogue-with-jenia-jitsev-laion-research-lead` | unchanged |
| 14 | `data-quality-determines-model-performance` | unchanged |

Post 11's source filename is `11.using-$160,000-to-train-moxin-7b.md`; Nuxt
turned `$` into the literal word `dollar` and ate the commas, leaving
`dollar160000` — the currency marker stranded in front of the number, where it
reads as a word rather than a unit. Moving it after the digits
(`160000-dollar`) restores the reading order without disturbing the rest of the
slug.

Two cosmetic warts left alone deliberately — flag if you want them fixed, since
each costs only a second redirect line:

- **#7 says `autonous`**, a typo for `autonomous`.
- **#5 says `dialog`** where every sibling says `dialogue`.

### Redirects — DONE, but with one DNS requirement

**DECIDED 2026-08-05: `blog.gosim.org` is retired and the domain forwarded to
`gosim.org/blog`.**

⚠️ **A plain domain forward is not enough on its own.** The path segment changed
from `/blogs/` to `/blog/`, which means:

- A **path-dropping** forward (the registrar default) sends *every* old deep link
  to the archive index. Fourteen posts' worth of inbound links and search results
  all land in the same place, on the wrong page.
- A **path-preserving** forward sends `/blogs/<slug>` to `gosim.org/blogs/<slug>`
  — a path this site did not previously serve, so: 404.

**The forward must preserve the path**, and this site now catches what arrives.
`astro.config.mjs` declares 30 redirects (14 posts × 2 locales, plus both
archive indexes), each emitted as a static HTML page carrying a meta refresh, a
`rel=canonical` to the new URL, and `robots: noindex`:

```
/blogs/<slug>       →  /blog/<slug>
/zh/blogs/<slug>    →  /zh/blog/<slug>
/blogs              →  /blog
/zh/blogs           →  /zh/blog
```

Posts 2 and 11 are listed separately because their slugs changed on the way
over (`state-of-rust-ui-1` → `state-of-rust-ui`, and
`using-dollar160000-to-train-moxin-7b` → `using-160000-dollar-to-train-moxin-7b`),
so neither can be derived from its old one.

Verified end-to-end against a local server of `dist/`: all four shapes resolve to
the right target, including the renamed slug.

**Sequence matters.** Land this site's redirects *first*, then point the DNS.
Doing it the other way round leaves every old link 404ing in between. And do not
delete the old repo until the forward has been live long enough to be recrawled —
it is the only remaining record of the original URLs.

---

## 4. Images

Copy `../blog/public/blogs-img/*` → `src/assets/blog/`. Moving them out of
`public/` into `src/assets/` is what lets `<Image>` emit responsive WebP and lets
`BaseLayout` render the 1200×630 OG card.

Quality is fine — every cover is **1920×1080 or larger**, so nothing gets
upscaled the way `m-yuan.jpeg` does (see `BACKLOG.md` item 2).

**Four filenames contain CJK characters** and must be renamed; non-ASCII asset
filenames are a known source of trouble in import paths and on case-folding
filesystems:

| Current | Rename to |
| --- | --- |
| `blog11-王言治.jpg` | `blog11-yanzhi-wang.jpg` |
| `blog12-杨宝嵩.jpg` | `blog12-baosong-yang.jpg` |
| `blog4-郑耀威.jpg` | `blog4-yaowei-zheng.jpg` |
| `blog7-岑明.jpg` | `blog7-ming-cen.jpg` |

The EN and ZH versions of a post share one cover file — that's correct and
wants no special handling. Astro dedupes identical bytes by content hash, so one
file is emitted regardless.

Skip `blog.jpg` (2130×828) — it's the old site's header, referenced by no post.

**Also worth converting:** `blog3-German-Ros-Sanchez.png` (1.6 MB) and
`blog5-Gary-Bradski.png` (1.6 MB) are photographs stored as PNG. They're sources,
so Astro will convert them at build time anyway — but re-saving as JPEG keeps
~3 MB of pointless weight out of git history.

---

## 5. Content problems and their resolutions

All six are settled and marked **DECIDED**.

### 5.1 Seven "Chinese" posts are English — the big one

`zh/blogs/` posts **4, 5, 6, 7, 8, 9, and 10 are untranslated copies of the
English post.** Not partially translated — the body is English end to end, and
diffing against the EN original shows only whitespace and stray bold markers.
Their frontmatter is English too.

Genuinely translated: posts **1, 2, 3, 11, 12, 13, 14** (7 of 14).

**DECIDED: migrate only the 7 real translations** (posts 1, 2, 3, 11, 12, 13,
14). `/zh/blog` shows 7 posts, all actually Chinese. This matches how the
collection already behaves — ZH does not fall back to English, by design.

**Superseded 2026-08-05:** posts 4, 5, 6, 7, 8, 9 and 10 were subsequently
translated by hand — roughly 135 KB of interview prose — so `/zh/blog` now
mirrors `/blog` at 15 posts each. The script still only emits the original 7;
the rest exist only as files in `src/content/blog/zh/`, and re-running it will
not overwrite them.

### 5.2 Tags would make twelve cards read "gosim"

Twelve of fourteen posts carry the identical `['gosim', 'open-source',
'grassroots']`. `BlogIndex.astro:76` and `:125` use **`tags[0]` as the visible
card chip**, so the archive would render a column of twelve chips all saying
*gosim*. That's worse than the old site, which showed no chip at all.

**DECIDED: drop the `gosim` tag entirely** — it's redundant on the GOSIM blog,
where every post qualifies. Posts 3–14 are all Open AGI Forum interviews (the
title suffix already says so), which gives them a chip that's both accurate and
distinguishing.

| # | Slug | Tags — `tags[0]` is the visible chip |
| --- | --- | --- |
| 1 | `welcome-to-gosim-blog` | `community`, `open source` |
| 2 | `state-of-rust-ui` | `rust`, `ui`, `open source` |
| 3 | `the-gateway-to-robotics-is-autonomous-driving` | `open agi forum`, `robotics`, `autonomous driving`, `simulation` |
| 4 | `star-surpasses-35k` | `open agi forum`, `ai`, `fine-tuning` |
| 5 | `dialog-with-gary-bradski-the-father-of-opencv` | `open agi forum`, `computer vision`, `robotics` |
| 6 | `dialogue-with-makepad-creator-rik-arends` | `open agi forum`, `rust`, `ui` |
| 7 | `what-is-the-most-effective-application-…-driving` | `open agi forum`, `autonomous driving`, `ai` |
| 8 | `jim-blandy-…-programming-languages` | `open agi forum`, `rust`, `systems programming` |
| 9 | `11-year-google-product-manager-kevin-moore` | `open agi forum`, `flutter`, `cross-platform` |
| 10 | `dialogue-with-rust-pioneer-josh-triplett` | `open agi forum`, `rust`, `systems programming` |
| 11 | `using-160000-dollar-to-train-moxin-7b` | `open agi forum`, `ai`, `open models` |
| 12 | `scaling-remains-the-most-crucial-factor-in-model-training` | `open agi forum`, `ai`, `model training` |
| 13 | `dialogue-with-jenia-jitsev-laion-research-lead` | `open agi forum`, `ai`, `research` |
| 14 | `data-quality-determines-model-performance` | `open agi forum`, `ai`, `data` |

House style follows `src/content/blog/en/gosim-shenzhen-2026.md`: lowercase,
spaces not hyphens (`open source ai`, not `open-source-ai`). Real hyphenated
words (`fine-tuning`, `cross-platform`) keep their hyphen.

ZH posts take the same tags as their EN counterpart. Translating tag values is a
separate question — the existing `gosim-shenzhen-2026.md` pair *does* translate
them (`深圳 2026`, `活动`), so for consistency the 7 migrated ZH posts should get
Chinese tags too. Proposed: `社区`/`开源` for post 1, `Rust`/`UI` for post 2, and
`Open AGI Forum` kept in Latin for the interviews since it's a proper name.

`open source` survives as a secondary tag but is arguably redundant for the same
reason `gosim` was. Left in for now since it never surfaces as a chip; say the
word and it goes too.

### 5.3 Alt text is placeholder in 13 of 14 posts

Thirteen posts say `alt: First Post` (one says `Second Post`, one ZH file says
`首篇文章`). Only post 14 has real alt text.

These become `imageAlt`, which feeds both the `<Image>` accessible name **and**
`og:image:alt`.

**The covers are not photographs.** I opened all fifteen. Posts 3–14 are
**designed title cards** — a gradient background with the GOSIM logo top-left,
"Open AGI Forum" top-right, the article title burned in as text in *both*
Chinese and English, and a cut-out photo of the guest mid-conversation with a
GOSIM interviewer. Two visual generations: posts 3–10 are light blue with the
Chinese title primary; posts 11–14 are purple with the English title primary.

That changes the answer. The naive fix — putting the title in the alt text —
would make a screen reader announce the title twice, once from the `<h1>` at
`Article.astro:60` and again from the image directly below it. Same on social,
where `og:title` and `og:image:alt` sit side by side.

**DECIDED: describe who is pictured; do not name the card type and do not repeat
the title.** The `<h1>` already carries the title, so the alt text is where the
photograph gets described — nowhere else does.

| # | `imageAlt` (EN) |
| --- | --- |
| 1 | The GOSIM Conference stage, a wide LED screen reading "GOSIM Conference Sept. 26" above a Shanghai skyline illustration and rows of sponsor logos |
| 2 | A white line-art skyline of Dutch landmarks on orange, with the RustNL and GOSIM Europe 2024 logos |
| 3 | German Ros Sanchez of NVIDIA, mid-gesture in conversation with a GOSIM interviewer |
| 4 | Yaowei Zheng, author of LLaMA Factory, in conversation with a GOSIM interviewer |
| 5 | Gary Bradski laughing mid-conversation with a GOSIM interviewer |
| 6 | Rik Arends, creator of Makepad, in conversation with a GOSIM interviewer |
| 7 | Ming Cen of Chongqing University in conversation with a GOSIM interviewer |
| 8 | Jim Blandy, author of Programming Rust, in conversation with a GOSIM interviewer |
| 9 | Kevin Moore, product manager for Dart and Flutter, in conversation with a GOSIM interviewer |
| 10 | Josh Triplett, Rust project lead, in conversation with a GOSIM interviewer |
| 11 | Yanzhi Wang, professor at Northeastern University, in conversation with a GOSIM interviewer |
| 12 | Baosong Yang, scientist at Alibaba's Tongyi Lab, in conversation with a GOSIM interviewer |
| 13 | Jenia Jitsev, scientific lead at LAION, in conversation with a GOSIM interviewer |
| 14 | Greg Schoeninger, CEO of Oxen.ai, standing beside a GOSIM interviewer |

Plain text only — no Markdown emphasis in these strings. *Programming Rust* is a
book title, but `imageAlt` lands in an HTML attribute, where `*asterisks*` would
render literally.

The 7 migrated ZH posts share the same image files and take translated alt:

| # | `imageAlt` (ZH) |
| --- | --- |
| 1 | GOSIM 大会舞台，大型 LED 屏幕显示「GOSIM Conference Sept. 26」，下方是上海天际线插画与赞助商标识 |
| 2 | 橙色背景上以白色线条勾勒的荷兰地标天际线，配有 RustNL 与 GOSIM Europe 2024 标识 |
| 3 | 英伟达的 German Ros Sanchez 一边比划一边与 GOSIM 访谈者交谈 |
| 11 | 美国东北大学教授王言治与 GOSIM 访谈者对话 |
| 12 | 阿里巴巴通义实验室科学家杨宝嵩与 GOSIM 访谈者对话 |
| 13 | LAION 科研负责人 Jenia Jitsev 与 GOSIM 访谈者对话 |
| 14 | Oxen.ai CEO Greg Schoeninger 与 GOSIM 访谈者并肩而立 |

Post 14's existing alt ("Greg Schoeninger at the interview site of GOSIM AI Paris
2025") was the only real one in the source. The replacement drops the event
claim, which the image alone doesn't support.

**Separate problem — the one inline image.** `blog-2-2.jpg` in post 2 is a
screenshot of a schedule entry: the time "10:00", the talk title "The State of
Rust GUI", a full paragraph of abstract, and links labelled NICO BURNS and
PRESENTATION. That paragraph exists **only as pixels** — it is not in the post
body anywhere. Alt text alone can't carry it well.

Better fix: transcribe the abstract into the Markdown as real text and either
drop the screenshot or keep it with short alt. That's a content edit, not a
migration step, so it's fine to migrate as-is with alt *"Schedule entry for 'The
State of Rust GUI' at 10:00, with the talk abstract and links to speaker Nico
Burns and the presentation"* and fix it properly later.

### 5.4 Bylines live in the body, not the frontmatter

Twelve of fourteen posts open with a byline block (posts 1 and 2 have none).
`Article.astro:65` renders `post.data.author` in a compact meta line —
`author · date · reading time` — which currently defaults to
`GOSIM Editorial Team`. Migrate naively and every page reads "GOSIM Editorial
Team" in the header with "Author｜Harper Zhuo" three lines below it.

**The full data, verbatim:**

| # | Author | Interview | Editor | Produced |
| --- | --- | --- | --- | --- |
| 3 | Haper Zhuo ← *typo* | Eric Wang | Monica He | Produced by · GOSIM |
| 4 | Monica He | Echo Tang | — | — |
| 5 | Annie Xu | Eric Wang (*Interview & Editing*) | — | GOSIM |
| 6 | Harper Zhuo | Eric Wang | Monica He | GOSIM |
| 7 | Harper Zhuo | Echo Tang | Monica He | GOSIM |
| 8 | Monica He | Eric Wang | — | GOSIM |
| 9 | Harper Zhuo | Eric Wang | Monica He | GOSIM |
| 10 | Harper Zhuo | *Interviewed* · Eric Wang | *Edited* · Monica He | GOSIM |
| 11 | Monica He | Eric Wang | — | GOSIM |
| 12 | Echo Tang (*Author & Interview*) | ↤ same person | *Edited* · Shiqi Wang, Monica He | GOSIM |
| 13 | Eric Wang (*Author & Interviewer*) | ↤ same person | — | Produced by · GOSIM |
| 14 | Shiqi Wang, Monica He | *Interviewer* · Eric Wang | Monica He | GOSIM |

**Five inconsistencies in twelve blocks:**

1. **Two different pipe characters.** ASCII `|` in nine posts, fullwidth `｜` in
   posts 8 and 10 — and post 12 mixes both *within the same block* (`|` on lines
   2 and 4, `｜` on line 3).
2. **Label drift.** `Interview` / `Interviewed` / `Interviewer` /
   `Interview & Editing`; `Editor` / `Edited`; `Produced` / `Produced by`.
3. **`Haper Zhuo`** in post 3 — a typo for Harper Zhuo, credited correctly on
   four other posts.
4. **Combined and multiple roles.** Posts 12 and 13 have one person as both
   author and interviewer; posts 12 and 14 credit two people in one field. A
   single `author` string handles these only by joining with a comma.
5. **A rendering bug in post 12.** Every other byline line ends with two spaces
   (a Markdown hard break); post 12's `*Produced | GOSIM*` ends with one, so it
   silently joins the preceding line.

**DECIDED: option (b).** The three options as weighed:

- **(a) Author line only.** `author: "Harper Zhuo"`, block deleted. Cleanest
  header, but it drops the interviewer, editor, and producer credits entirely —
  and for interviews the interviewer did much of the work.
- **(b) Author in frontmatter, credits at the foot of the body.** `author` drives
  the header meta line; the remaining credits move to the *bottom* of the post as
  a normalized block. Nothing is lost, the header stays short, and it matches how
  print interviews usually run credits. **Recommended.**
- **(c) Extend the schema.** Add optional `interviewer`, `editor`, `producer` to
  the `blog` collection and render them properly. The most correct, but it means
  new schema fields, new `Article.astro` markup, and translation of three new
  labels in `ui.ts` — for content that exists on 12 posts and may never recur.

Under (b): normalize on the ASCII pipe, settle the labels on `Author` /
`Interview` / `Editor` / `Produced by`, and fix the Harper Zhuo typo. For posts
12 and 13, where one person holds two roles, `author` takes the name and the
foot block still lists them under `Interview` — the repetition is accurate, not
an error.

The block moves from the top of the body to the bottom, above nothing else, in a
fixed field order (omitting any field the post lacks):

```markdown
---

*Author | Harper Zhuo*
*Interview | Eric Wang*
*Editor | Monica He*
*Produced by | GOSIM*
```

Two things the script must get right: every line needs **two** trailing spaces
so Markdown emits a hard break (post 12's source has only one, which is the
rendering bug noted above), and the `---` must be preceded by a blank line or
Markdown reads it as a setext heading underline for the preceding paragraph.

ZH posts take translated labels — `作者` / `采访` / `编辑` / `出品`.

### 5.5 Eight posts share one date

Posts 3–10 are all dated `2025-3-17`. The index sorts on
`b.data.date.getTime() - a.data.date.getTime()`, so those eight tie and their
order falls out of glob iteration — arbitrary, and liable to shuffle.

**DECIDED: spread them one day apart, randomly assigned.** The draw below was
made once on 2026-08-03 — it is the record, so **do not re-roll it**. Re-running
a shuffle would silently reorder the archive on some future build.

| Date | Post |
| --- | --- |
| 2025-03-17 | 7 · `what-is-the-most-effective-application-…-driving` |
| 2025-03-18 | 5 · `dialog-with-gary-bradski-the-father-of-opencv` |
| 2025-03-19 | 3 · `the-gateway-to-robotics-is-autonomous-driving` |
| 2025-03-20 | 10 · `dialogue-with-rust-pioneer-josh-triplett` |
| 2025-03-21 | 8 · `jim-blandy-…-programming-languages` |
| 2025-03-22 | 6 · `dialogue-with-makepad-creator-rik-arends` |
| 2025-03-23 | 9 · `11-year-google-product-manager-kevin-moore` |
| 2025-03-24 | 4 · `star-surpasses-35k` |

The window runs forward from the original shared date and collides with nothing
— the next post chronologically is 11/12/13 at `2025-6-24`.

Worth stating plainly: these dates are **deliberately synthetic**. Seven of the
eight now claim a publication day the post did not have. That's an accepted
trade for a stable, sensible-looking archive order, but it means the dates are
presentation, not record. ZH counterparts must take the same date as their EN
post so the two locales stay in step.

### 5.6 Post 2 is marked unpublished but is live

The post (live then at `state-of-rust-ui-1`) has `published: false`, yet
`blog.gosim.org/blogs/state-of-rust-ui-1/`
returns 200 — the old site only honoured the flag on the index. It's also the
only post with an inline body image, and that image is **malformed**:

```markdown
[![Abstract](/blogs-img/blog-2-2.jpg)]
```

A link with no destination. It renders as literal `[` … `]` around the image.

**DECIDED: ships published** — `draft: false`, matching what the live site
actually serves rather than the stale flag.

Fix the image syntax to a plain `![…](…)` pointing at `blog-2-2.jpg` in
`src/assets/blog/`, with the alt from §5.3. Note this is the **only** post whose
body references an image, so it's also the only one where the migration has to
rewrite a body image path rather than just a frontmatter one.

---

## 6. Execution

Do it with a **script**, not by hand — 28 files with mechanical transforms is
exactly where hand-editing introduces silent typos, and a script can be re-run
after each decision above lands.

**Phase 1 — assets.** Copy `blogs-img/*` into `src/assets/blog/`, applying the
ASCII renames from §4. Re-encode the two PNGs as JPEG. One commit.

**Phase 2 — transform script.** Write `scripts/migrate-blog.mjs` (temporary,
deleted after the migration) that reads each source file, applies §2's field
mapping plus the slug map from §3 and the retag table from §5.2, and writes to
`src/content/blog/{en,zh}/<slug>.md`. It should:
- normalize dates to `YYYY-MM-DD`
- invert `published` → `draft`
- strip the `ogImage`/`ogimage` key
- lift the byline into `author` and remove the block (if §5.4 = a)
- strip zero-width joiners (present in post 1, both locales) and non-breaking
  spaces (present in ZH post 13)
- leave ZH body text **unwrapped** — the source is already single-line-per-
  paragraph, which is what CJK needs; a formatter that hard-wraps it would
  inject visible spaces mid-sentence

**Phase 3 — editorial pass.** The parts a script can't do: real `imageAlt` for
15 covers (§5.3), and whatever §5.1 resolves to. This is the bulk of the human
time.

**Phase 4 — redirects.** Generate the 28 stubs into the old repo (§3). Separate
repo, separate commit, separate deploy.

---

## 7. Verification

- `npm run build` clean — schema violations surface here, and an unresolvable
  `image()` path is a hard build error, so a green build proves every cover
  resolved.
- Page count goes **18 → 46** (15 EN posts + 7–14 ZH posts + existing pages).
- `/blog` and `/zh/blog` render, featured card picks the newest post, no card
  shows a blank chip.
- Spot-check one migrated post in each locale for heading hierarchy — old posts
  use `###` for sections in post 1 but `##` in the interviews, and
  `Article.astro` styles `h2` and `h3` differently (`:149` and `:165`).
- Every OG image resolves: each post page's `og:image` should be an absolute
  `https://gosim.org/_astro/….jpg`, 1200×630.
- Curl a sample of old URLs after the redirect deploy and confirm they land on
  the new ones.

---

## 8. Open questions for the site owner

1. Should the `/blog` archive paginate? Fifteen posts is fine in one grid; it
   will not stay fine forever. Does not block the migration.

Answered: `blog.gosim.org` is retired and forwarded (§3), and all of §5 — see the
decisions block at the top.
