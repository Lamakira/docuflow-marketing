# Handoff: Product page (`/product`)

## Overview
The product overview page — the destination of the `Product` nav item and future parent of the ten per-feature pages. Its job is to defeat one objection: *"an all-in-one does everything badly."* The answer is **depth, published as specification** — real intervals, counts, platform names and limits, laid out like a datasheet that happens to be beautiful.

Structure (top → bottom): **Hero** → **sticky pillar jump bar** → **four pillar sections** (Time · Activity · Clients · Knowledge) → **Platform** (dark band) → **The argument** (differentiators) → **Full capability table** → **closing CTA**. Nav and footer are the site's existing components, shown for context only.

## About the Design Files
`Product.dc.html` is a **design reference created in HTML** — a prototype of the intended look and behavior, not production code. Open it in a browser (needs `support.js` + `fonts/` beside it). The reveal animation, sticky jump-bar highlighting and in-page anchors are all live.

Target: a new `src/pages/product.astro` in the `docuflow-marketing` repo (**Astro + Tailwind v4**). Reuse the repo's tokens (`global.css @theme`), the `container-wide` / `container-page` utilities, the `PillarSection.astro` component (already built for the homepage — see below), `Nav.astro` and `Footer.astro`.

## Fidelity
**High-fidelity.** Values below are exact. Everything on the page is drawn with page elements (hairline borders, mono labels, flat fills) — no illustrations, no screenshots, no 3D.

## Layout — the asymmetric container
Do **not** centre the content column. Body sections use `container-wide` (left edge = the centred-1200 gutter, right edge pushed out to `--edge-extra`): left margin wide, right margin narrow. Nav and the closing-CTA band keep the centred `container-page`. Content max-width 1200; breakpoints 1240 / 901 / 561 (the prototype uses 900 / 620 — align to repo values). **Do not include the homepage left stage rail.**

## Section specs

### Hero
`container-wide`, padding `64px 0 56px`. Two columns `minmax(0,1.05fr) / minmax(0,1fr)`, gap 56, align-end.
- **Left:** mono 12px uppercase `hour` eyebrow "Product"; H1 "Four products, not four checkboxes." Cabinet Grotesk 800 `clamp(34px,5vw,58px)`, ls −.03em; sub 18px/1.55 `slate` max 52ch; CTA row — `Start free trial` (`hour` bg, ink text) + `Book a 15-minute demo` (white, `rule` border).
- **Right — "In this datasheet" index card** (chosen direction): white card, 1px `rule`, radius 8; mono uppercase header row; four rows (1px `rule` between), each = mono `01` index (`slate-on-ink`), pillar name Cabinet Grotesk 700 20px, `N capabilities` mono 13px `slate`, `hour` → arrow. **Each row links to its pillar anchor** (`#time` …).

### Pillar jump bar
Sticky `top: 64px` (below the 64px header), `z-index 55`, translucent paper bg + blur, 1px `rule` top & bottom. `container-page`. Row of four anchors — mono 12px uppercase, `slate` default, 2px transparent bottom-border; **current pillar → `ink` text + `ink` bottom-border + weight 700**, set by a scroll spy. Each anchor shows a small `0N` index. Horizontally scrollable ≤900 (never wraps).

### The four pillar sections (reusable pattern)
Same scaffold for each; this is the pattern the ten feature pages will reuse — build it as / fold it into `PillarSection.astro`. `container-wide`, padding `88px 0`, `perspective: 1200px` on the inner. Two-column grid `1fr / 1fr`, gap 56, align-center, `transform-style: preserve-3d`.
- **Visual alternates side** by pillar rank (visual right, left, right, left) via `order` on the columns — **never in the DOM**: heading always precedes its visual in source, so at ≤900 the stack is always heading-then-visual. (Matches the homepage component exactly.)
- **Band alternation, no two adjacent alike:** `paper` → `band-mint` → `paper` → `band-warm`.
- Each text column: mono eyebrow `0N / PILLAR` (`hour`; Activity uses `live-on-light` to stay AA on mint); H2 Cabinet Grotesk 800 `clamp(28px,3.6vw,42px)` max 18ch; body 17px/1.55 `slate` max ~48ch; **capability list** (2-col grid, 5px `live` dot + label, key items weight 600 `ink`); **spec strip** — mono row, 4 cells, 1px `rule` between, each = value 15px 700 + uppercase 9px label, on white, 1px `rule`, radius 6.

Per-pillar content (H2 / spec strip / mockup):
- **01 Time** — "Hours that already know what they were for." Spec: `60s heartbeat · 3 min idle threshold · 8h default day · CSV export`. Mockup: running timer row (project · task · `1:47:12` · pause control) + three timesheet lines.
- **02 Activity** — "Evidence, and a score telling you how good it is." Spec: `3–15 min capture · 60s activity window · 0–100 evidence score · 3 platforms`. Mockup: **evidence quality score `84/100` STRONG** (given the most visual weight — bordered `live-on-light` panel), 4-thumbnail capture grid, 24-bar activity strip. The score grades the *quality of the recorded evidence*, never the person — design must not imply otherwise.
- **03 Clients** — "A CRM that knows what the work cost." Spec: `12 field types · 5 project stages · 1/day per person · full stage history`. Mockup: client record (Northwind Systems, stage chip, 3 contacts, budget bar 62% used in `live-on-light`, two tags).
- **04 Knowledge** — "Search covers what was said, not just what was written." Spec: `~800 char chunks · 1536 dim embeddings · 3 video providers · PDF·Word·text`. Mockup: mono question chip, short answer, two `live-on-light` source chips (doc, call).

### Platform (dark band)
Full-bleed `ink` bg, `container-wide` inner, padding `88px 0`. Eyebrow "PLATFORM" (`hour`); H2 "Underneath all four." (`paper`). 3-col grid of cards on `ink-raised` (#161D30) / `ink-border` (#2A3348), radius 8. Each card: 40px bordered icon square (monoline SVG, `slate-on-ink` stroke) + title Cabinet Grotesk 700 17px (`paper`) + body 14px/1.55 `slate-on-ink`. Cards: Roles & permissions · Teams · Notifications · Offline-first agent · Device security. **The MCP card is featured — full width (`grid-column: span 3`), `hour` border + `hour` icon + `MCP` chip + a row of tool chips** (`list_projects`, `get_client`, `search_documents`, `query_time_entries`, `create_task`, `get_budget`, `+16 more` = 22 tools).

### The argument (differentiators)
`paper`, `container-wide`, padding `96px 0`. Eyebrow "THE ARGUMENT"; H2 "The parts nobody else built." Cabinet Grotesk 800 `clamp(30px,4.4vw,52px)`, max 16ch. 2-col grid, five items, each = mono `0N` index (`hour`) + title Cabinet Grotesk 700 20px + one-sentence body, 1px `rule` top per row: evidence quality score · meetings that answer questions · a CRM you can reshape · an agent that survives the network · an MCP server.

### Full capability table
White band, 1px `rule` top & bottom, `container-wide`, padding `88px 0`, inner max 940. Eyebrow "EVERYTHING, LISTED"; H2 "The full capability list." Four groups (Time/Activity/Clients/Knowledge), group header mono uppercase `hour`; each row = two columns (capability 14.5px `ink` / qualifier mono 12px `slate`), 1px `rule` divider, 12px row padding. Below: `Compare plans →` outline button → `/pricing`. ≤900 collapses to `1.4fr / 1fr`.

### Closing CTA
Full-bleed `hour` band, **centred `container-page`**, padding `88px 24px`, text-center. H2 "See it against your own client list." Cabinet Grotesk 800 `clamp(30px,4.5vw,50px)` (ink). CTAs: `Start free trial` (ink bg) + `Book a 15-minute demo` (white). Mono footnote "No credit card. Desktop app for Windows, macOS and Linux." Matches the homepage's final CTA.

## Interactions & Behavior
- **Scroll reveal** — reuse the homepage's hinged settle: `opacity 0 → 1`, `translateY(14px) → 0`, `rotateX(15deg) → 0`, `transform-origin: top center`, staggered label → text → visual (~130ms). In the repo this is the existing `PillarSection.astro` GSAP/ScrollTrigger behavior; apply it to the pillar, platform and argument sections. **The prototype uses IntersectionObserver + imperative styling** (so state changes never clobber it) — in Astro use the existing GSAP setup instead. Only `opacity` and `transform` animate. **Do not reuse the homepage's pinned four-tools fold** — it is the homepage's signature and must not be echoed here.
- **Jump-bar spy** — IntersectionObserver on the four pillar `id`s (`rootMargin: -45% 0 -50%`) marks the current anchor. In the prototype this is imperative (no re-render); repo can use the same or GSAP ScrollTrigger.
- **`prefers-reduced-motion`** — fully respected: no reveal is mounted, content ships visible (initial hidden state is set by JS, never CSS, so no-JS/reduced-motion pages are readable). No layout shift, no horizontal scrollbar at any width (`overflow-x: clip` on band wrappers guards the `container-wide` right overshoot). `scroll-padding-top: 116px` clears header + jump bar for anchor jumps.

## State Management
None persistent. Two ephemeral scroll observers (reveal, jump-bar spy). No toggles or forms.

## Data
All content is verified against the app's schema/API — **do not add capabilities beyond these lists.** In the prototype it lives in the logic class (`renderVals`): `heroIndex`, `jumpItems`, `{time,act,cli,kno}Caps`, `{time,act,cli,kno}Spec`, `timesheet`, `contacts`, `platform` + `mcpTools`, `wontFind`, `tableGroups`. For the repo, lift these into `src/data/` (e.g. `product.ts`) alongside `site.ts`, so the pillar pattern and the ten feature pages read from one source. Pillar taxonomy **Time → Activity → Clients → Knowledge is identical to the pricing comparison table** — keep them in sync.

## Design Tokens
Repo `@theme` only: `ink #0F1524`, `ink-raised #161D30`, `ink-border #2A3348`, `paper #F3F5F7`, `hour #E9A23B` (+`hour-hover #D8912F`), `live #1F9D6B` (fills only), `live-on-light #187751` (green carrying text/glyph — AA), `slate #59657A`, `slate-on-ink #9AA6B8`, `rule #D8DEE6`, `band-mint #EAF2ED`, `band-warm #FBF3E6`. **No other colours, no gradients, radii 4–8 (chips 3), 1px `rule` borders instead of shadows.** Fonts: Cabinet Grotesk 700/800 (display, ls −.03em), Switzer 400/500/600 (body), JetBrains Mono (every number, interval, count, label, eyebrow).

## Copy
Sentence case, active voice, numbers over adjectives. Banned words per brief §7. **Honesty constraints (brief §8, legal — Competition Act):** no invented stats, user counts, testimonials, logos or certifications; no integrations beyond GCS, OpenAI, Loom, Fathom, YouTube, email. New strings needing sign-off: the Knowledge H2 "Search covers what was said, not just what was written." (changed to differ from the homepage), the "THE ARGUMENT" eyebrow, and the five differentiator one-liners. All pillar H2s / bodies are from brief §6.

## Assets
None external — platform icons are inline monoline SVG; all mockups are CSS/DOM. Fonts are the repo's woff2 files (copies in `fonts/` for previewing only; JetBrains Mono via Google Fonts in the prototype only).

## Files
- `Product.dc.html` — full-page prototype (scroll to see reveals + jump-bar highlighting).
- `support.js`, `fonts/` — needed only to preview the prototype locally.
- Target: new `src/pages/product.astro` + reuse of `PillarSection.astro`, `Nav.astro`, `Footer.astro`; data lifted to `src/data/`.
