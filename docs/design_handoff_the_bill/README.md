# Handoff: "COMPLETED — the bill" section redesign (option 2a)

## Overview
Redesign of the homepage pricing section (`src/components/sections/TheBill.astro` in the `docuflow-marketing` repo). The dark receipt card and the four disconnected plan cards are replaced by **one physical paper receipt**: the old four-vendor stack is tallied and struck out on the receipt, and the four plans hang from its bottom edge as **perforated tear-off stubs**. Clicking a stub selects that plan — the stub lifts and the receipt's `DOCUFLOW — {PLAN}` total line updates. Growth is pre-selected.

## About the Design Files
`The Bill.dc.html` is a **design reference created in HTML** — a prototype showing intended look and behavior, not production code to copy. Open it in a browser (needs `support.js` + `fonts/` beside it). It shows several explorations; **implement only the option labeled `2a`** (anchor `#2a`, top of the page). Options 1a–1d are earlier explorations for context only; 1a is a recreation of the current section.

The task is to recreate 2a in the target stack: **Astro + Tailwind v4**, replacing the contents of `src/components/sections/TheBill.astro`, reusing the repo's existing tokens (`src/styles/global.css` `@theme`) and data (`src/data/site.ts`: `STACK`, `STACK_TOTAL`, `DOCUFLOW_PRICE`, `PLANS`). The stub selection needs a small client-side script (Astro `<script>` with vanilla JS is enough — the repo has no client framework).

## Fidelity
**High-fidelity.** Colors, typography, spacing, copy and interactions are final intent. Values below are exact.

## Layout

Section: `bg-ink` (`#0F1524`), default text `slate-on-ink` (`#9AA6B8`), padding ≈ `88px 24px 116px` inside the repo's `container-wide`.

1. **Header row** — flex, space-between, align-end, wrap, gap 24, margin-bottom 64:
   - Left: mono 13px `hour` label `COMPLETED - the bill` (mb 24), then H2 **"Four tools. One bill."** on one line — Cabinet Grotesk 800, 56px (use existing `clamp(34px,5vw,56px)` for responsive), letter-spacing −.03em, line-height 1.05, white.
   - Right (column, align-end, gap 14): existing beta badge — 1px `slate-on-ink` border, radius 3, padding 5px 12px, mono 12px `slate-on-ink`, "Beta pricing - subject to change" — and existing link "Compare all plans →" (15px, `slate-on-ink`, hover `paper`) to `/pricing`.

2. **Receipt object** — width 880px, centered (`margin: 0 auto`; full-width ≤ ~940px), `filter: drop-shadow(0 30px 44px rgba(0,0,0,.55))` on the wrapper (the section's one allowed "off-plane" shadow — the receipt physically sits on the ink band).

### Receipt body
`paper` bg (`#F3F5F7`), ink text, border-radius **3px 3px 0 0** (square bottom — the stubs continue it), padding `30px 36px 20px`, JetBrains Mono 13px throughout.

- Header, centered: `TECHMA — DOCUFLOW` 11px 700 letter-spacing .14em; below, `CLIENT PROJECT · COMPLETED` 10px letter-spacing .1em `slate` (`#59657A`), margin-top 5.
- Dashed divider: `border-top: 1.5px dashed #B9C2CF`, margin `16px 0 12px`. (`#B9C2CF` is a receipt-only tint between `rule` and `slate-on-ink`; used for all dashed dividers and dot leaders here.)
- Section label `YOUR CURRENT STACK — FOUR VENDORS`, 10px, letter-spacing .12em, `slate`, mb 4.
- Four line items from `STACK` **in this order** (must stay synced with the fold animation — single source `site.ts`): CRM & projects $12 · Time tracker $7 · Monitoring $9 · Wiki & docs $10. Each row: flex, baseline, gap 8, padding `4px 0`, color `slate`; name 12.5px; **dot leader** = middle span `flex:1; border-bottom: 2px dotted #B9C2CF`; price right.
- Subtotal row: `YOUR STACK` … `$38 /user/mo` — 700, `slate`, **`text-decoration: line-through`** (whole row), padding `6px 0`. Use `STACK_TOTAL`.
- Dashed divider (margin `12px 0 8px`).
- **Total row (live)**: `DOCUFLOW — GROWTH` (selected plan name, uppercase) … price. 700, 13px, ink; dot leader between. Price chip: `hour` (`#E9A23B`) background, ink text, padding `2px 7px`, radius 2 — text `$14 /user/mo` (`DOCUFLOW_PRICE` / selected plan price; Enterprise shows `Custom`). This chip is the section's amber moment — see "Amber rule" below.
- Centered caption `PICK A PLAN — TEAR OFF BELOW`, 10px, letter-spacing .12em, `slate`, margin-top 16. *(New microcopy — route through Masdouk with the rest of the copy.)*

### Stub strip
Directly under the receipt body: flex row, `border-top: 2px dashed #9AA6B8` (the perforation line). Four stubs from `PLANS`, each `flex: 1` (selected stub `flex: 1.12`), separated by `border-left: 2px dashed #B9C2CF` (stubs 2–4).

Each stub = column: body + torn bottom edge.
- Body: bg `paper` (#F3F5F7); **selected stub bg `#FFFFFF`**; padding `18px 16px 16px`.
- Row 1: checkbox square 14×14, radius 3 — unselected `1.5px solid #9AA6B8`, transparent; selected `1.5px solid #E9A23B`, `hour` bg, ink `✓` 10px — plus plan name uppercase, mono 11px, letter-spacing .08em, `slate`. Growth additionally gets chip `MOST TEAMS`: mono 9px, letter-spacing .08em, `hour` bg, ink text, padding `2px 6px`, radius 2.
- Price: mono 24px 700 ink, margin-top 8 ($7 / $14 / $22 / Custom).
- Note: Switzer 11.5px, line-height 1.45, `slate`, margin-top 8 (exact `note` strings from `site.ts`).
- CTA: inline-block, margin-top 14, padding `7px 12px`, radius 4, 12px 600. Selected: `hour` bg, ink text, hover `hour-hover` (#D8912F). Unselected: `1px solid #59657A` border, ink text, hover border ink. Labels from `PLANS.cta`; keep the existing `aria-label="{cta} - {name}"` and `/signup?plan={name}` href pattern from the current `TheBill.astro`.
- **Torn edge** (bottom of every stub, and nowhere else): 10px-high div, zigzag teeth in the stub's bg color:
  `background-image: linear-gradient(-135deg, {bg} 5px, transparent 0), linear-gradient(135deg, {bg} 5px, transparent 0); background-size: 10px 10px; background-repeat: repeat-x;`

### Selected-stub treatment
`transform: translateY(16px) rotate(±1deg)` (alternate sign by index: even −1°, odd +1°), `filter: drop-shadow(0 20px 26px rgba(0,0,0,.5))`, `flex: 1.12`. Transition: `transform .25s cubic-bezier(.4,0,.2,1), flex .25s cubic-bezier(.4,0,.2,1)`. The stub looks half-torn off the receipt.

## Interactions & Behavior
- **Stub click / Enter / Space** selects the plan (`role="button"`, `tabindex="0"`, `cursor: pointer`, visible `:focus-visible` — global two-tone ring already in `global.css`). Selecting updates: receipt total line name + price chip, stub bg/checkbox/CTA styles, lift transform. Default selection: **Growth**.
- **Tally animation (one-shot)**: IntersectionObserver on the receipt, threshold 0.4, fires once, disconnects. Each `$` amount in the stack lines + subtotal counts up from $0 to its value — duration 520ms, ease-out (`v = end × k(2−k)`), 130ms stagger per line, via `requestAnimationFrame` writing `textContent` directly (never framework state, per repo rule). Markup contains the final values as fallback.
- `prefers-reduced-motion: reduce`: skip the tally entirely (final values already in markup); the global CSS already collapses the stub transition.
- This is a **micro-interaction**, within the brief's one-major-animation budget (the stack fold keeps that slot).
- Responsive: ≤ ~940px receipt goes full-width; ≤ 560px the stub strip wraps to a 2×2 grid (keep perforation top border on all; dashed left borders only on the right column). Header row wraps naturally (already flex-wrap).

## State Management
One state variable: `selectedPlan: 'Starter' | 'Growth' | 'Business' | 'Enterprise'` (default `'Growth'`). Plus a module-level `tallied: boolean` guard for the one-shot animation. No data fetching; all content from `src/data/site.ts`.

## Design Tokens
All existing repo tokens (`global.css @theme`): `ink #0F1524`, `paper #F3F5F7`, `hour #E9A23B`, `hour-hover #D8912F`, `slate #59657A`, `slate-on-ink #9AA6B8`, `rule #D8DEE6`, `ink-border #2A3348`. One new value: **`#B9C2CF`** (receipt dashed dividers, dot leaders, inter-stub perforations) — add as e.g. `--color-receipt-rule` or hardcode locally. Fonts: Cabinet Grotesk 800 (H2), Switzer 400/600 (notes, CTAs), JetBrains Mono 400/700 (everything on the receipt). Radii 2–4px on the receipt (it's paper, not a card); shadows only the two drop-shadows listed.

### Amber rule note
The section intentionally carries amber on: the stage label, the receipt's price chip, the selected stub's checkbox/CTA, and Growth's MOST TEAMS chip. The price chip and the selected CTA are the same object (the chosen plan), so this stays within the spirit of the single-amber rule; the struck subtotal stays `slate` as in the current corrected version. Beta badge stays slate (per `landing-corrections.md` — it's a warning, not a CTA).

## Copy
All plan copy, prices, badge and link text are the validated strings from `site.ts` / the handoff. **New draft microcopy needing Masdouk approval**: receipt header lines (`TECHMA — DOCUFLOW`, `CLIENT PROJECT · COMPLETED`), `YOUR CURRENT STACK — FOUR VENDORS`, `REPLACE…`-style labels are not used in 2a except `PICK A PLAN — TEAR OFF BELOW`.

## Assets
None. The barcode seen in options 1b/1c is **not** part of 2a. Torn edges and perforations are pure CSS. Fonts are the repo's own woff2 files (copies in `fonts/` here for previewing the prototype).

## Files
- `The Bill.dc.html` — design prototype; open in a browser, look at **`#2a`** (top). Interactive: click stubs, scroll for tally.
- `support.js`, `fonts/` — runtime + fonts needed only to preview the prototype locally.
- Target file in repo: `src/components/sections/TheBill.astro` (replace); data source `src/data/site.ts` (unchanged).
