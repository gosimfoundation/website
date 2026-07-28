# GOSIM.org

The GOSIM.org website — a bold, editorial home for **GOSIM**, the volunteer-run
global community that nurtures the brightest grassroots open-source projects and
connects them across culture and language barriers, through its **Conference**,
**Workshop**, and year-round **Spotlight**.

Features an interactive 3D globe hero, a "cosmic editorial tech" visual language
(Clash Display + monospace tech-labels, teal/coral/lime accents on a light
Open-Campus palette), and a bilingual (English / Chinese) content model.

## Stack

- **[Astro 7](https://astro.build)** — static site framework
- **[Tailwind CSS v4](https://tailwindcss.com)** — CSS-first `@theme` tokens in `src/styles/global.css`
- **Content Collections** — Markdown/MDX content in `src/content`
- **[Decap CMS](https://decapcms.org)** — optional `/admin` web editor for non-technical authors
- **[Three.js](https://threejs.org)** — the animated Blue-Marble globe (hover to spin faster)
- **i18n** — English (default, `/`) and Chinese (`/zh/`); French-ready

> Content & assets (fonts, logo, founder photos, event/city imagery) originate
> from sibling repos **`../GOSIM.org`** (main content) and **`../shenzhen2026`**
> (Shenzhen event assets), used as **content sources only** — no styling or
> framework from them is reused.

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
```

| Command | Action |
| --- | --- |
| `npm run dev` | Start the dev server at `localhost:4321` |
| `npm run build` | Build the production site to `dist/` |
| `npm run preview` | Preview the production build locally |

## Homepage

Section flow: **Hero** (globe) → **Next event** (upcoming-event banner) →
**About** (Global Nexus) → **Three Pillars** → **Events** (past conferences &
workshops) → **Latest stories** (3 newest posts) → **Spotlights** →
**Newsletter**. Standalone pages: `/founders` and `/privacy` (each with a `/zh`
counterpart where noted below).

The stories section hides itself when the current locale has no posts, so a new
locale never renders an empty shell.

## Project structure

```
src/
  content/              # Markdown content (the source of truth)
    events/             # conferences · workshops · spotlights (the main content)
    blog/en, blog/zh    # stories (homepage section + /blog archive)
    projects/ galleries/
  content.config.ts     # collection schemas
  assets/               # build-optimized images (see "Images" below)
    events/             # event & city photos (skyline, Paris, Hangzhou, …)
    founders/           # founder portraits
  components/           # Globe, Home, Founders, SiteHeader/Footer,
                        #   LanguagePicker (globe dropdown), cards, …
  layouts/BaseLayout.astro
  pages/                # routes — EN at /, ZH under /zh/
  i18n/
    ui.ts               # chrome strings (nav, footer, buttons)
    home.ts             # homepage section prose (bilingual)
    founders.ts         # founders content (bilingual)
    utils.ts            # locale helpers
  styles/global.css     # Tailwind import + design tokens + @font-face + effects
public/                 # served verbatim, never optimized
  fonts/                # Clash Display TTFs
  admin/                # Decap CMS (index.html + config.yml)
  earth-blue-marble.jpg # globe texture (loaded at runtime by Three.js)
  logo.svg
```

## Images

Photos live in **`src/assets/`**, not `public/`, so Astro's `<Image>` compiles
them to responsive **WebP** at build time. Rule of thumb:

- **`src/assets/`** — anything rendered by a component or referenced from
  content frontmatter. Optimized, hashed, and emitted per breakpoint.
- **`public/`** — files that must keep a stable URL and byte-for-byte content:
  the globe texture (fetched at runtime by Three.js, so the build can't see it),
  fonts, `logo.svg`, `CNAME`.

Event images are declared in frontmatter as a path **relative to the Markdown
file** (`../../assets/events/paris.png`); the `image()` helper in
`content.config.ts` turns that into `ImageMetadata`. Drop full-resolution
originals in — the build downsizes them, so there's no need to pre-crop.

## Content model

**Events** (`src/content/events/*.md`) are the primary content. Frontmatter:

| Field | Notes |
| --- | --- |
| `title`, `description`, `date` | required |
| `dateLabel` | human range shown in UI, e.g. `"October 16–17, 2026"` |
| `location` | e.g. `"Shenzhen, China"` |
| `image` | card / banner background — path relative to the `.md`, e.g. `"../../assets/events/paris.png"` |
| `url`, `urlZh` | external event site; `urlZh` used on `/zh` (falls back to `url`) |
| `cfp` | Call-for-Proposals link (button on the upcoming banner) |
| `status` | `upcoming` \| `past` \| `draft` |
| `lang` | `en` \| `zh` (events fall back to `en` when a locale has none) |

`blog` posts surface in the homepage "Latest stories" section and at `/blog`;
unlike events they do **not** fall back to English, so `/zh` shows Chinese posts
only. `projects` and `galleries` back placeholder pages for now.

## i18n

- **Section chrome & prose** is translated via `ui.ts` (short strings) and
  `home.ts` / `founders.ts` (longer prose + arrays, keyed by locale).
- **Pages**: EN at `/`, ZH under `/zh/`. Bilingual pages: home, founders.
- **Still English on `/zh`**: event card content (from the English-only event
  Markdown, surfaced via fallback) and `/privacy`.

**Add a locale (e.g. French):**
1. Add `'fr'` to `locales` in `astro.config.mjs`.
2. Add an `fr` block to `src/i18n/ui.ts`, `home.ts`, `founders.ts` (+ `fr` to `languages`).
3. Add `fr` to the `langEnum` in `src/content.config.ts`.
4. Add pages under `src/pages/fr/`.

## Authoring content

**Developers / Markdown users:** add a `.md` file under `src/content/<collection>/`
with the required frontmatter (see existing samples), then commit.

**Non-technical editors:** use the `/admin` web UI. Locally:

```bash
npx decap-server   # terminal 1 — local git backend
npm run dev        # terminal 2 — then open http://localhost:4321/admin
```

## Deployment / CMS auth (TODO)

Decap's `git-gateway` backend is Netlify-native. On **GitHub Pages** (static),
the CMS needs the **GitHub backend behind an external OAuth proxy** (a small
serverless function) — wire this up before enabling `/admin` in production.
Until then, `local_backend: true` in `public/admin/config.yml` supports local
editing via `npx decap-server`.
