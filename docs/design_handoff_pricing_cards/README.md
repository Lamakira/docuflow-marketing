# Handoff: Pricing page — plan cards redesign (dog-ear cards)

## Overview
Redesign of the plan cards on the DocuFlow pricing page. The four flat cards become **dog-ear cards**: top-right corner clipped with a small folded flap, a unified 7-row ✓/✗ feature list, struck-through monthly price in annual mode, and pill CTAs. The page header is also condensed to a single row (title/subtitle left, Monthly/Annual toggle right) so the full cards fit above the fold on a ~800px laptop viewport. **Everything else on the page (nav, comparison table, FAQ, CTA band, footer) is unchanged.**

## About the Design Files
`Pricing v2.dc.html` is a **design reference created in HTML** — a prototype showing intended look and behavior, not production code. Open it in a browser (needs `support.js` + `fonts/` beside it). It shows the whole pricing page with the new cards in place; the Monthly/Annual toggle and FAQ are interactive.

Target: the pricing page in the `docuflow-marketing` repo (**Astro + Tailwind v4**). Reuse the repo's tokens (`global.css @theme`) and plan data in `src/data/site.ts` (`PLANS` — extended, see State/Data below).

## Fidelity
**High-fidelity.** Values below are exact.

## Layout

### Condensed header (replaces the centered hero)
Flex row, space-between, align-center, wrap, gap 24, padding `28px 24px 20px`, max-width 1200 centered:
- Left, text-align left: mono 12px uppercase `hour` label "Pricing" (mb 8); H1 "One bill for the whole workday." Cabinet Grotesk 800 `clamp(28px,3.4vw,38px)` (mb 8); subtitle 15px/1.45 `slate`, max-width 66ch.
- Right: existing Monthly/Annual segmented toggle (unchanged styles: white pill container, 1px `rule` border, radius 8; active tab ink bg / paper text).

### Card grid
Max-width 1200, padding `0 24px 40px`, `grid grid-cols-4 gap-5` (2 cols ≤900px, 1 col ≤620px — existing breakpoints).

### Card (each plan)
- Container: position relative, flex column, radius 18, padding `22px 22px 20px`, white bg, `1px solid rule` border, shadow `0 1px 2px rgba(15,21,36,.05)`.
  **Growth (featured)**: `ink` bg (#0F1524), no border, text `paper`/`slate-on-ink`, shadow `0 28px 52px -26px rgba(15,21,36,.55)`.
- **Dog-ear (the signature shape)**: clip the top-right corner with
  `clip-path: polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 0 100%)`
  and add the flap as an absolutely positioned child: 30×30, top 0 right 0, `border-radius: 0 0 0 10px`, `box-shadow: -2px 2px 4px rgba(15,21,36,.15)`. Flap color: `#E4E8EE` on white cards, `hour` (#E9A23B) on Growth.
- **Title row** — flex, gap 8: plan name Cabinet Grotesk 800 21px, letter-spacing −.02em (`ink`; `paper` on Growth). Growth adds chip `MOST TEAMS`: mono 9.5px, letter-spacing .08em, `hour` bg, ink text, padding `3px 7px`, radius 999, **`white-space: nowrap`**.
- **Price row** — flex baseline, gap 8, wrap, margin-top 10: in annual mode a struck old price first (mono 22px 700 `slate-on-ink`, line-through, = monthly price), then price mono 28px 700 letter-spacing −.02em, then `/user/mo` mono 11px muted. Enterprise: `Custom`, no per/old.
- **Billed line** — mono 11px muted, margin-top 4: `billed monthly` / `$72 billed yearly` (annual×12); `&nbsp;` on Enterprise to keep alignment.
- **Note** — 12.5px/1.45 muted, margin-top 8, min-height 36px (equalizes rows).
- **Dashed divider** — `1.5px dashed` `#D8DEE6` (white cards) / `#2A3348` (`ink-border`, Growth), margin `11px 0`.
- **Feature list** — column, gap 7. Seven rows, same list on every card (see Data). Row: flex, center, gap 9, 12.5px, `white-space: nowrap` (labels are sized to never wrap at this column width — don't lengthen them).
  - Included: 16px round dot, `#1F9D6B` bg, white ✓ 9px 700; label full color (`ink` / `paper`).
  - Excluded: 16px transparent dot, `1.5px solid` `#D8DEE6` (white) / `#3A4560` (Growth), ✕ glyph in the border color; label `slate-on-ink` (white cards) / `slate` (Growth).
- **CTA** — block, centered, margin-top 16, padding 11px, **radius 999 (pill)**, 600, 14px. Growth: `hour` bg, ink text, hover `hour-hover` (#D8912F). Others: white bg (`paper` bg on… n/a — only Growth is dark), `1px solid rule`, ink text, hover border ink. Keep `aria-label="{cta} - {name}"` and `/signup?plan={name}` pattern.
- Below the grid: existing beta-pricing badge line, margin-top 18 (unchanged styles).

## Interactions & Behavior
- **Monthly/Annual toggle** (existing behavior, one extra output): annual mode switches each price to the annual rate, shows the struck monthly price beside it, and swaps the billed line to `$NN billed yearly`. Monthly mode: no struck price, `billed monthly`.
- Card hover: none (deliberate — the dog-ear is the accent). CTA hovers as above. FAQ + table interactions unchanged.
- `prefers-reduced-motion`: nothing to do (no animation added).
- **Above-the-fold requirement**: nav (64) + condensed header + full card must fit ≤ ~800px viewport. Card height budget ≤ ~520px — if content is added later, the feature list is the flex point, not the paddings.

## State Management
Existing `annual: boolean` (or equivalent) only.

## Data (`src/data/site.ts`)
Extend `PLANS` with per-plan flags for the unified feature list, plus annual prices if not present:
- `featureList` (shared, exact labels — kept short so rows never wrap): `Timer & timesheets`, `Screenshots & activity`, `Payroll exports`, `CRM & projects`, `Docs & AI search`, `Advanced analytics`, `SSO & residency`.
- Included flags — Starter: first 3; Growth: first 5; Business: first 6; Enterprise: all 7.
- Prices (monthly/annual): Starter 7/6 · Growth 14/11 · Business 22/18 · Enterprise Custom.
*(The old per-card 3-line feature blurbs are replaced by this unified list — copy change, route through Masdouk.)*

## Design Tokens
Existing: `ink #0F1524`, `paper #F3F5F7`, `hour #E9A23B`, `hour-hover #D8912F`, `slate #59657A`, `slate-on-ink #9AA6B8`, `rule #D8DEE6`, `ink-border #2A3348`. New local values: flap gray `#E4E8EE`, excluded-dot dark `#3A4560`, check green `#1F9D6B` (matches the table's check color). Fonts: Cabinet Grotesk 800 (H1, plan names), Switzer (notes, CTAs), JetBrains Mono (labels, prices, billed lines, chip).

## Copy
New/changed strings needing approval: shortened feature labels (above), `billed monthly` / `$NN billed yearly`, `MOST TEAMS` chip (was "Most teams"). All other page copy unchanged.

## Assets
None — the dog-ear is pure CSS (clip-path + one child div). Fonts are the repo's woff2 files (copies in `fonts/` for previewing the prototype; JetBrains Mono via Google Fonts in the prototype only).

## Files
- `Pricing v2.dc.html` — full-page prototype; toggle Monthly/Annual to see both price states.
- `support.js`, `fonts/` — needed only to preview the prototype locally.
- Target: the pricing page component(s) in the repo; data source `src/data/site.ts` (extended as above).
