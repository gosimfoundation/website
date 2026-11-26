# Backlog

Open work on GOSIM.org. Last reviewed **2026-08-05**, against `70e2fba`.

**Fixed 2026-08-05 (uncommitted):** the 320px horizontal-scroll bug. The Events
heading "Conferences and workshops" is an unbreakable 311px word at `text-5xl`,
wider than its 265px grid cell, so it forced the whole document to scroll.
`Home.astro` now uses `text-[clamp(2.35rem,13vw,3rem)]` below `sm`; verified
`scrollWidth === clientWidth` at 320px, and the longest word fits at every width
from 320 to 639.

**Also done 2026-08-05:** all seven English-only Chinese posts were translated,
so `/zh/blog` now mirrors `/blog` at 15 posts each. The old item 3 is removed.

**Also changed 2026-08-05:** heading typography, site-wide. Clash Display's space
glyph measures 0.19× the width of an `n`, against 0.42× for Inter at the same
size, so Tailwind's `tracking-tight` (−0.025em) was closing word gaps almost to
nothing and long headlines ran together. `--tracking-tight` is now −0.015em and
`h1`–`h4` carry `word-spacing: 0.06em` (`src/styles/global.css`). This is why the
Events heading needed the clamp above: it was already 4px over before the change.

---

## 1. "Stories" vs "Blog" wording is inconsistent (English only)

The nav was renamed to **Blog**, but the rest of the English UI still says
*stories*. Chinese is already internally consistent (`博客` in the nav, `文章`
everywhere else) — **this is an English-only cleanup.**

| Location | Current string |
| --- | --- |
| `src/i18n/ui.ts:23` | `'nav.stories': 'Blog'` ← the rename that started this |
| `src/i18n/ui.ts:35` | `'hero.cta.stories': 'Read stories'` |
| `src/i18n/ui.ts:36` | `'section.latest': 'Latest stories'` |
| `src/i18n/ui.ts:37` | `'blog.back': 'All stories'` |
| `src/i18n/ui.ts:43` | `'blog.empty': 'No stories yet.'` |
| `src/pages/blog/index.astro:6` | `title="Stories — GOSIM"` |
| `src/i18n/home.ts:51` | the whole `stories.*` block (`eyebrow: '// Latest stories'`, `cta: 'All stories'`, …) |
| `src/i18n/home.ts:114` | the `zh` counterpart of that block |

**Needs a decision before anyone edits:** how far to take it. Three defensible
scopes —

- **Chrome only** — page title + nav-adjacent strings say Blog; prose keeps
  "stories" as an editorial word.
- **All user-facing English** — every visible "stories" becomes "Blog"/"posts".
- **Everything, keys included** — also rename the `stories.*` / `nav.stories` /
  `hero.cta.stories` keys, which touches `home.ts`, `ui.ts`, and every consumer.

The `.astro` markup reads these through `t()` and `c.stories.*`, so scopes 1 and
2 are string-only; scope 3 is a refactor.

---

## 2. `m-yuan.jpeg` is upscaled on retina

**`src/assets/founders/m-yuan.jpeg`** — a **225×225** source (7.9 KB) rendered
into a slot that requests `widths={[288, 576]}` (`src/components/Founders.astro:46`).
Astro will not invent pixels, so the 288 and 576 variants are both soft, and
visibly so next to the other founder portraits.

**Not fixable in code — needs a higher-resolution original**, ideally ≥576px
square so the 2× variant is genuine. Drop the full-resolution file in at the
same path; the build downsizes it.

---

## 3. Decap CMS auth — DecapBridge wired; deploy, invites, protection left

**Decided 2026-08-07: DecapBridge with classic (email + password) auth** —
moderators mostly have no GitHub accounts, which ruled out every GitHub-backend
option. The repo side is done (uncommitted):

- `public/admin/config.yml` — DecapBridge git-gateway backend (site
  `89d7b31f-…`), per-author commit messages, `publish_mode:
  editorial_workflow`, login-screen branding, `site_url`.
- `public/admin/index.html` — decap-cms 3.14.1 → 3.15.1, SRI regenerated;
  unpkg bundle verified byte-identical to the npm registry tarball.
- `.github/workflows/ci.yml` — **new** build-only check on `pull_request`.
  `astro.yml` runs only on push to main, so without this a required check
  would leave every PR (including CMS drafts) permanently unmergeable.
- `README.md` — "CMS auth (TODO)" rewritten; authoring section documents the
  invite flow and the local-proxy caveat.

Verified locally: `/admin/index.html` renders the email + password login with
the Bridge logo and no config errors. (A `localhost:8081` connection-refused
in the console is the `local_backend` probe falling back to DecapBridge — by
design. The local proxy doesn't support the editorial workflow; comment out
`publish_mode` when testing writes locally.)

### Remaining, in order

1. **Deploy** (ships with the migration commit), then log in at
   `https://gosim.org/admin/index.html` and publish a test draft end to end.
2. **Invite moderators** by email from the DecapBridge dashboard (free tier
   covers 10 collaborators).
3. **Protect `main`** with "Build (PR)" as a required check — one decision
   first. The DecapBridge PAT currently belongs to an org owner, and admins
   can merge past failing checks unless enforcement includes administrators.
   So either (a) enforce for admins too — CMS publishes are properly gated,
   but every direct push to main now needs a PR — or (b) issue the PAT from a
   dedicated machine-user account with plain write access: strict gating for
   CMS publishes while owners keep pushing directly. (b) is the textbook
   setup.
4. **PAT expiry** — auth fails silently when the token lapses; rotate it in
   the DecapBridge dashboard and keep a calendar reminder.

Fallbacks if DecapBridge ever folds (researched 2026-08-06): Sveltia CMS +
sveltia-cms-auth worker — config-compatible, but no editorial workflow and
editors need GitHub accounts with repo write; Pages CMS once its
roles/permissions feature ships.

---

## 4. Retire `blog.gosim.org` and forward it here

**Blocked until the blog migration is deployed to production.** Everything on
this site's side is already built (`astro.config.mjs` `redirects`, verified
end-to-end); this item is the DNS half, and it must go second.

### Do these in order

1. **Deploy the migration** — the 15 posts, the assets, and the 30 redirect
   pages. Confirm `https://gosim.org/blogs/welcome-to-gosim-blog/` redirects in
   production, not just locally.
2. **Point `blog.gosim.org` here with a path-preserving forward.**
3. Spot-check a handful of real old URLs end to end.
4. Only then retire the old GitHub Pages deploy.

Reversing 1 and 2 leaves every old link 404ing in the gap.

### The requirement that's easy to get wrong

**The forward must preserve the path.** The old blog served `/blogs/<slug>`; this
site serves `/blog/<slug>` — different segment. So:

| Forward type | Result |
| --- | --- |
| Path-dropping (the registrar default) | Every deep link lands on the archive index. Fourteen posts' worth of inbound links and search results all arrive at the same wrong page. |
| **Path-preserving** | `/blogs/<slug>` → `gosim.org/blogs/<slug>`, which this site now catches and redirects to `/blog/<slug>`. ✅ |

If the registrar can only do a path-dropping forward, put Cloudflare (or
similar) in front of the subdomain and use a rewrite rule instead — the
redirects on this side stay exactly as they are either way.

### Don't delete the old repo yet

`gosimfoundation/blog` is the only remaining record of the original URLs and
their content. Keep it until the forward has been live long enough for the old
URLs to be recrawled and the new ones to be indexed in their place.

Full detail, including the enumerated URL map, is in `MIGRATION.md` §3.

---

## Known non-issues — do not re-report

- **~6.5 MB of untouched originals in `dist/_astro`.** Vite emits them; nothing
  references them and visitors never fetch them.
- **A header appearing mid-page in a full-page screenshot.** A `position: fixed`
  capture artifact, not a layout bug.
- **`/blog`'s cover resolving to a `shenzhen-tower.*` filename.** Identical bytes
  are deduped by content hash; the blog copy is still a real independent source
  file at `src/assets/blog/gosim-shenzhen-2026.jpg`.
- **`@astrojs/markdown-satteri` is a genuine `@astrojs` package** (published
  2026-05-28, hence unfamiliar). Registry hashes match byte-for-byte. It is
  **not** a typosquat of `markdown-remark` — do not re-flag it.

---

## Not project work

Carried here only so it isn't lost: `claude doctor` reported a failed auto-update
on 2026-07-29 (`install_failed`, `version_to: null`, `error_code: null`). The
versions directory is writable, so the likely cause is the disk sitting at 98%
full. Running `claude update` or in-session `/doctor` would address it — this
touches the local Claude Code install, not this repository.
