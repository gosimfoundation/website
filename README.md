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
workshops) → **Spotlights** → **Newsletter**. Standalone pages: `/founders` and
`/privacy` (each with a `/zh` counterpart where noted below).

## Project structure

```
src/
  content/              # Markdown content (the source of truth)
    events/             # conferences · workshops · spotlights (the main content)
    blog/en, blog/zh    # stories (currently hidden from the homepage)
    projects/ galleries/
  content.config.ts     # collection schemas
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
public/
  fonts/                # Clash Display TTFs
  events/               # event & city images (skyline, Paris, Hangzhou, …)
  founders/             # founder photos
  admin/                # Decap CMS (index.html + config.yml)
  earth-blue-marble.jpg # globe texture
  logo.svg
```

## Content model

**Events** (`src/content/events/*.md`) are the primary content. Frontmatter:

| Field | Notes |
| --- | --- |
| `title`, `description`, `date` | required |
| `dateLabel` | human range shown in UI, e.g. `"October 16–17, 2026"` |
| `location` | e.g. `"Shenzhen, China"` |
| `image` | card / banner background (path under `/public`) |
| `url`, `urlZh` | external event site; `urlZh` used on `/zh` (falls back to `url`) |
| `cfp` | Call-for-Proposals link (button on the upcoming banner) |
| `status` | `upcoming` \| `past` \| `draft` |
| `lang` | `en` \| `zh` (events fall back to `en` when a locale has none) |

`blog`, `projects`, and `galleries` collections also exist (blog is hidden from
the homepage; projects/galleries back placeholder pages).

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
