# Handoff: "COMPLETED — who it's for" section redesign (option 3c)

## Overview
Redesign of the homepage sectors section (`src/components/sections/Sectors.astro` in the `docuflow-marketing` repo). The 4×2 white card grid becomes a **type-forward editorial index**: two columns of hairline-ruled entries — mono index number, Lucide icon, display-weight sector name, mono domain tag chip, amber arrow — with the blurb underneath. No card boxes; a soft white wash on hover.

## About the Design Files
`The Bill.dc.html` is a **design reference created in HTML** — a prototype, not production code. Open it in a browser (needs `support.js` + `fonts/` beside it). **Implement only the option labeled `3c`** (anchor `#3c`). 3a is a recreation of the current section; 3b/3d are unpicked explorations.

Recreate 3c in the target stack: **Astro + Tailwind v4**, replacing the grid in `src/components/sections/Sectors.astro`. Reuse the repo's tokens (`global.css @theme`), the `SECTORS` array from `src/data/site.ts` (names, blurbs, tags, `icon` Lucide names, hrefs — all unchanged), and the existing `astro-icon` `<Icon>` component. The section wrapper (id `solutions`, `container-wide py-[88px]`), stage label and H2 are unchanged from the current file.

## Fidelity
**High-fidelity.** Values below are exact.

## Layout

Keep from current `Sectors.astro`:
- Label: mono 13px — `COMPLETED` in `hour`, `- who it's for` in `slate`, mb 24.
- H2 "Teams that deliver for clients." — Cabinet Grotesk 800, `clamp(28px,4vw,42px)`, max-width 16ch.

Replace the card grid with:
- **Index grid**: margin-top 48, `grid grid-cols-2`, column gap 72, row gap 0. Collapses to 1 column ≤900px.
- **Entry** (one per sector, in `SECTORS` order, index numbers `01`–`08` by array position): `<a href={sector.href}>`, display block, padding `24px 20px`, margin-inline −16px (hover wash extends past the text edge), `border-top: 1px solid rule (#D8DEE6)`, border-radius 6.
  - **Header row** — flex, align-center, gap 14:
    - Index: mono 11px, `slate-on-ink` (#9AA6B8), zero-padded (`01`).
    - Icon: existing Lucide icon via `<Icon name={sector.icon}>`, 20×20, `ink`, `aria-hidden`.
    - Name: Cabinet Grotesk 800, 24px, letter-spacing −.02em, `ink`.
    - Tag chip: `sector.tag`, mono 10px, letter-spacing .06em, uppercase, `slate`, `1px solid rule` border, radius 3, padding `3px 7px`.
    - Arrow `→`: mono 15px, `hour` (#E9A23B), `margin-left: auto`.
  - **Blurb**: block, margin `8px 0 0 34px` (aligns under the icon+name, past the index), 14.5px, line-height 1.55, `slate`, max-width 44ch.

## Interactions & Behavior
- **Hover (whole entry)**: background `rgba(255,255,255,.55)`, `transition: background .25s ease`. Deliberately soft — no border change, no lift.
- Keep the existing **icon shake on hover** from the repo (`group-hover:animate-icon-shake` — trigger on the entry, not the icon). Reduced-motion is already handled globally.
- Entries are links to `/solutions/*`; global two-tone `:focus-visible` ring applies.
- Responsive: 2 → 1 column ≤900px; nothing else changes. The prototype is desktop-width; use the repo's existing breakpoints.

## State Management
None. Pure static markup from `SECTORS`.

## Design Tokens
All existing: `ink #0F1524`, `paper #F3F5F7` (section bg via body), `hour #E9A23B`, `slate #59657A`, `slate-on-ink #9AA6B8`, `rule #D8DEE6`. Hover wash `rgba(255,255,255,.55)` (white at 55% on paper — add as a local value). Fonts: Cabinet Grotesk 800, Switzer 400 (blurbs), JetBrains Mono 400 (index, tags, arrow). No shadows, radius 3/6 only.

### Amber rule note
Amber appears only on the stage label and the per-entry `→` arrow (the "next action" glyph). If eight amber arrows feel like decoration in review, an acceptable fallback is `slate-on-ink` arrows that turn amber on hover.

## Copy
No new copy. Names, blurbs, tags and hrefs are the existing validated strings in `site.ts` (blurbs are still flagged there as drafts pending Masdouk — unchanged status).

## Assets
Icons are the repo's existing Lucide set via `astro-icon` (`palette`, `code-xml`, `presentation`, `calculator`, `scale`, `headset`, `hard-hat`, `user-search` — already in `astro.config.mjs` include). The prototype loads Lucide from a CDN for preview only.

## Files
- `The Bill.dc.html` — prototype; open in a browser, look at **`#3c`**.
- `support.js`, `fonts/` — needed only to preview the prototype locally.
- Target file in repo: `src/components/sections/Sectors.astro` (replace the grid); data source `src/data/site.ts` (unchanged).
