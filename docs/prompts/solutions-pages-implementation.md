# Solutions section — mega-menu, index page, eight sector pages

> Prompt for the implementing agent. Repo: `docuflow-marketing`.
> Touches `src/components/Nav.astro`, adds `src/pages/solutions/`, `src/data/solutions.ts`,
> `src/components/solutions/` and `src/components/nav/`.
> Companion document: `docs/prompts/solutions-mega-menu-design-brief.md` — the visual design of
> the menu and drawer. Read it before building either.

---

## Why this is urgent

The homepage already advertises a Solutions section that does not exist.
`src/components/sections/Sectors.astro` renders an editorial index of eight sectors, and **all
eight links 404 today**:

```
/solutions/digital-agencies   /solutions/accounting-firms   /solutions/construction
/solutions/software-teams     /solutions/legal-services     /solutions/staffing-agencies
/solutions/consulting-firms   /solutions/bpo-call-centers
```

`FOOTER_COLUMNS` links five of the same eight. Fixing that is the point of this work; the
mega-menu is what makes the section reachable once it exists.

## What gets built

Nine pages plus two navigation surfaces:

- `/solutions` — the index
- `/solutions/[slug]` — the eight sector pages
- The Solutions mega-menu in the header
- A mobile navigation drawer below 561px, **which does not exist at all today**

Out of scope: the six `/use-cases/*` pages. See §1.3 for how the menu handles that without
shipping six new broken links.

---

## Part 1 — The content problem. Read this before anything else.

### 1.1 The rule

Eight pages generated from one template with the industry name swapped is, almost verbatim,
Google's definition of a **doorway page**. `docs/site-architecture.md` §3.2 already rejected
city pages for exactly this reason; the same trap applies here and it is the single most likely
way this work fails.

> **Each sector page leads with a pain that is *only* true for that sector, in that sector's own
> vocabulary, and orders the four pillars differently because a different one matters most.**
>
> A page whose industry name could be find-and-replaced and still read correctly has failed and
> must be rewritten.

This is not a stylistic preference. Thin duplicated pages get the whole directory demoted, so
eight weak pages are worse than three strong ones.

### 1.2 The per-sector angles

Every capability referenced below already exists in `src/data/product.ts`, verified against the
application's schema and API. **Do not add capabilities that are not there.** If a page looks
thin, improve the layout — do not pad the list.

| Sector | The pain only they have | Leads with | Their vocabulary | Their objection |
|---|---|---|---|---|
| **Digital agencies** | A fixed-fee retainer whose scope creeps until the margin is gone, and nobody notices until the month closes | **CLIENTS** — budget consumed as a live number | retainer, scope, deliverable, account, burn | "my creatives will resent being watched" |
| **Development teams** | Estimate versus actual; a mid-sprint change request with no evidence it was out of scope | **TIME + CLIENTS** — hours against a task inside a project | sprint, estimate, ticket, velocity, scope change | "screenshots are toxic engineering culture" |
| **Consulting firms** | The client questions the invoice — "what did you actually do for these 40 hours?" | **ACTIVITY** — the evidence quality score | engagement, deliverable, utilisation, statement of work | confidentiality of client material |
| **Accountants** | Busy season: a dozen small clients in a day, timesheets rebuilt from memory, hours written off | **TIME** — the cost of switching between clients | engagement, billable, write-off, realisation, busy season | client financials visible in captures |
| **Legal services** | Docket discipline, and a matter record that must stay defensible months later | **TIME + KNOWLEDGE** — documents attached to the matter | matter, docket, billable, file, retainer | **privilege** — the strongest objection anywhere on this site |
| **BPO teams** | Proving staffed coverage to the client, at scale | **ACTIVITY** — coverage and attendance | SLA, shift, adherence, agent, seat, coverage | volume: hundreds of agents |
| **Construction** | ⚠️ weak fit — see §1.4 | — | — | — |
| **Staffing agencies** | ⚠️ weak fit — see §1.4 | — | — | — |

Note the "Leads with" column: **the four pillars appear in a different order on each page.** That
ordering is the main structural defence against the doorway-page problem, and it is also simply
true — a legal practice and a BPO floor genuinely care about different halves of this product.

### 1.3 The use-case column, without six new broken links

The mega-menu has a "By use case" column, but the six `/use-cases/*` pages are out of scope.
Shipping the column as real page links would replace eight broken links with six new ones.

**Resolution:** `/solutions` carries a *By use case* section whose six entries are real content
blocks with `id` attributes. The menu column links to those anchors:

```
/solutions#remote-teams          /solutions#employee-productivity
/solutions#hybrid-teams          /solutions#project-profitability
/solutions#client-billing        /solutions#onboarding-documentation
```

Nothing 404s. When the six pages are built later, only the `href` values in one data file change.

### 1.4 Two sectors are a weak product fit — raise this, do not silently paper over it

DocuFlow is a desktop agent plus a web app. Two sectors in the agreed list contain people who
are not sitting at a company computer:

- **Construction** — site workers have no desktop. An honest page can address project
  administration, document control and subcontractor coordination. It **cannot** claim site-hour
  tracking, which is what the current draft blurb ("Site hours and captures on the right job")
  implies.
- **Staffing agencies** — placed contractors work on the *client's* hardware, where installing a
  monitoring agent is frequently not permissible.

`AGENTS.md` is explicit that overclaiming falls under the Competition Act. But `SECTORS` in
`src/data/site.ts` is marked *« ne pas les toucher sans Masdouk »*, and both sectors are live on
the homepage today. So this is listed in *Decisions to settle* below and **must not be decided
unilaterally.**

---

## Part 2 — The sector page template

`src/pages/solutions/[slug].astro`, `getStaticPaths` from `src/data/solutions.ts`.

Section order, with the band rhythm noted — **two adjacent sections never share a background**,
the rule already documented in `product.astro`:

| # | Section | Band |
|---|---|---|
| 1 | Hero | `paper` |
| 2 | The problem — three pain points | `white` |
| 3 | Pillar map — 3 to 4 blocks, ordered per sector | alternating `paper` / `band-mint` / `band-warm` |
| 4 | A scenario in their vocabulary | `ink` |
| 5 | Their objection, answered | `white` |
| 6 | Related — three other sectors + product + pricing | `paper` |
| 7 | `FinalCta` | `hour` |

Notes per section:

**Hero.** Monospace eyebrow carrying the sector tag (`AGENCY`, `LEGAL`…). `<h1>` in their
language, not ours. Lede, then the standard CTA pair. Layout: reuse `ProductHero`'s two-column
shape rather than inventing a third hero.

**The problem.** Three pain points, monospace-numbered. This is the section that must be
unmistakably sector-specific — if these three sentences would read correctly on another sector's
page, the page has failed.

**Pillar map.** Three or four blocks in the order given by the table in §1.2. Each links to the
relevant anchor on `/product`. Reuse `SpecStrip.astro` for the hard numbers, and the mockup
conventions from `src/components/product/mockups/` — schematic redraws of the real interface
using page elements, never illustrations.

**Scenario.** A short concrete narrative on the `ink` band, in that sector's vocabulary. This is
the section a reader forwards to a colleague.

**Objection.** The one from §1.2, answered directly. Reuse the shape of the homepage
`Transparency.astro` section — this is the same kind of argument.

**Related.** Three sibling sectors, plus `/product` and `/pricing`. `site-architecture.md` §7
sets the internal-linking rule; follow it.

**`FinalCta`** is already parameterised (`title`, `note`) — pass wording specific to the sector.

### Sector pages set `rail={false}`

The `StageRail` (`LEAD → COMPLETED`) narrates the homepage's client-engagement spine. It means
nothing on a sector page. `/pricing` and `/product` both already pass `rail={false}`; do the same.

---

## Part 3 — The `/solutions` index

It must **earn its existence** against the homepage sector index, which already lists the same
eight with the same blurbs. If it is the same page twice, it is duplicate content and a wasted
click.

What makes it different:

1. Its own `<h1>` and intro, addressing "which of these is me?" rather than "who is this for?"
2. **The use-case axis**, which the homepage does not have — the six blocks from §1.3, each with
   its `id`, each a real content block with a sentence or two, not a bare link
3. A route out for the undecided: a short block pointing at `/product`

Do not simply import `Sectors.astro`. Reuse its *entry* pattern — the ruled editorial index with
monospace numbering — but the page around it is new.

---

## Part 4 — The mega-menu

Visual design is in the companion brief. This section covers the parts that are structural.

### 4.1 The trigger is a native `<details>` / `<summary>`

Not a link. Not a link-plus-button split.

This single choice gives, for free: `aria-expanded`, keyboard open and close, correct touch
behaviour (the first tap opens the menu rather than navigating away), and **a working panel with
JavaScript disabled**. The precedent is already in this repo — `src/components/pricing/PricingFaq.astro`
makes the same argument for the FAQ, and its header comment documents four CSS-only approaches
that were tried and failed.

**Consequence:** the header loses its `<a href="/solutions">`. The destination moves to an
"All solutions →" row at the head of the panel. That is a real trade-off — see *Decisions to settle*.

`aria-current` cannot sit on a `<summary>`. Preserve the intent of the existing `isCurrent()`
logic by putting `data-current` on the summary when the path starts with `/solutions`, and
`aria-current="page"` on the matching link *inside* the panel, where it is valid.

### 4.2 The panel is `position: absolute` inside `.nav-header` — never `fixed`

`--edge-side` is built on `100%`, and a custom property resolves at its **use site**. A `fixed`
box resolves `100%` against the viewport — scrollbar included — so the panel's left edge would
desync from every section on the page by the scrollbar width, **on Windows and Linux only**.
That is exactly the ~8px defect the shared-edge system exists to prevent, and it is the kind of
bug that survives review because it is invisible on macOS.

That placement also settles stacking: `.nav-header` is already a stacking context at `z-30`, so
a descendant with `z-index: auto` paints above `.nav-shell`, above `JumpBar` and `StageRail`
(both 20), and below the skip link (50).

> **Ship the panel with no `z-index` declaration at all, and leave a comment saying so** — the
> next person to touch this will want to add `z-index: 40`, and that is the bug, not the fix.

### 4.3 Four traps

**1. `--pill-w` is measured, not declared.** `Nav.astro` temporarily sets `.nav-shell` to
`width: max-content` and reads `getBoundingClientRect()`, on init, on `document.fonts.ready`, on
resize and on media-query change. Two properties protect the measurement — a closed `<details>`
renders no content at all, and an absolutely-positioned panel is out of flow — but **write the
invariant down in a comment**, and add a `close()` at the top of `measure()` as a third layer.

The chevron *does* legitimately widen the pill. Bump the hard-coded `760px` fallback, which
appears twice. And forbid, in a comment, any open-state change to the trigger's metrics beyond
colour and a rotating chevron: a weight change or an added glyph would silently invalidate the
measured width.

**2. Close the menu on every nav state change.** The state A ↔ B morph animates `max-width`,
`margin-left` and `padding` over 280ms. An open panel during that window drifts, and a
`measure()` firing mid-morph reads garbage. Hook the **three handlers that already exist** —
`sync()`, the `wide` media-query listener, and the throttled `resize` — rather than adding scroll
listeners.

**3. `prefers-reduced-motion` does not reach the Web Animations API.** The global block in
`global.css` overrides `animation-duration` and `transition-duration` only. A WAAPI `.animate()`
call runs at full length regardless. The script must branch explicitly, exactly as `PricingFaq`
does — bail out before `.animate()` and flip the state directly.

**4. `overflow: hidden` is forbidden project-wide** — it creates a scroll container and breaks
the nav's `sticky`. `overflow-x: clip` only. This also rules out the usual mobile scroll lock;
see §5.

### 4.4 Standing rules that apply here

- Hidden state is set **by** the script, never by a static CSS rule — if the script fails, the
  content must still be reachable
- Only `opacity` and `transform` animate; CLS stays 0
- **Never the `animation:` shorthand** — Lightning CSS renormalises a nameless declaration to
  `animation: none` at build. Longhands only, and verify against the delivered CSS in
  `dist/_astro/*.css`, not just on screen
- Declare `grid-cols-1` explicitly on any responsive grid — an implicit track sizes to its
  min-content and guarantees a horizontal scrollbar at 360px
- **No `role="menu"` or `role="menuitem"`.** Plain `<ul>` / `<li>` / `<a>`. `role="menu"` switches
  assistive tech into application mode and breaks Tab semantics inside a navigation

### 4.5 Behaviour

- Hover intent on desktop only, gated on `(hover: hover) and (pointer: fine)` — without that
  gate a tap fires `pointerenter` (open) then `click` (toggle closed). Roughly 120ms to open,
  220ms grace to close.
- Escape closes **and** returns focus to the trigger. Native `<details>` does not do this.
- Outside click closes, with no focus restore — focus follows the click.
- Tab out closes. **No focus trap** — this is a menu, not a dialog.

---

## Part 5 — The mobile drawer, below 561px

There is currently no mobile navigation whatsoever: `.nav-links` is `display: none` and the pill
collapse is disabled below 561px. Product, Solutions and Pricing are unreachable from the header
on a phone — they exist only in the footer.

Build a second `<details>` after the CTA inside `.nav-shell`, so DOM order is trigger then panel.
Same technique as the desktop menu, different box.

- The panel is `position: absolute`, **not** `fixed` — same reasoning as §4.2
- Full height under the bar, opaque `paper`, 1px `rule` top border
- **No scroll lock.** `overflow: hidden` on `<body>` is forbidden and would break the sticky
  header. The panel is opaque and full-height so background scroll is invisible; use
  `overscroll-behavior: contain` to stop scroll chaining. This is a deliberate decision, not an
  oversight — comment it.
- Focus containment via `inert` on `<main>` and `<footer>`, reusing the pattern already in
  `Nav.astro` for the departing `Sign in`. Escape closes and returns focus to the burger.
- Solutions inside the drawer is a nested in-flow `<details>` accordion from the same data. In
  flow is safe here: `.nav-links` is `display: none` at every width where the drawer exists, so
  nothing it contains can ever reach the pill measurement.
- Close the drawer on the `wide` media-query change.
- v1: no animation on the nested accordion — native snap. It satisfies reduced motion trivially.

⚠️ **The width budget at 360px is the likeliest visual failure of this entire feature.** Wordmark
+ CTA + burger + padding + gaps only fits once `Sign in` moves into the drawer and `--nav-gap`
drops. `AGENTS.md` already lists 360px as untested. **Measure it in a browser; do not assume it.**

---

## Part 6 — Data and structure

### Follow the `product.ts` pattern, not Content Collections

`docs/site-architecture.md` §5 proposed Astro Content Collections. **Do not introduce them here.**
No `src/content/` directory exists, and the established pattern is a per-page TypeScript module
with a private master const and derived public exports — see `src/data/product.ts`, where
`PILLAR_DEFINITIONS` feeds both `PRODUCT_PILLARS` and `CAPABILITY_GROUPS` so the two cannot drift.

New file: **`src/data/solutions.ts`**, keyed by slug.

**`SECTORS` in `src/data/site.ts` stays the single source** of `name`, `tag`, `icon` and `href`.
The new file keys into it rather than restating those fields, so the homepage index, the footer,
the menu and the pages cannot disagree. `AGENTS.md` already flags one duplicated taxonomy as a
liability — do not create a second.

Shape `solutions.ts` so a locale key could be added without restructuring, and say so in the
header comment. EN-only is the current decision but bilingual is still open — see *Decisions*.

### Components

```
src/components/nav/SolutionsPanel.astro    the inside of the panel only
src/components/nav/DrawerContent.astro     the mobile list + nested accordion
src/components/solutions/…                 sector section template and its parts
src/components/solutions/mockups/…         per-sector schematic redraws
```

The panel's **wrapper box and all its positioning stay in `Nav.astro`**, so the geometry has one
owner and no cross-component `:global()` selectors are needed.

Build the panel component **generic**: `docs/design-brief.md` always intended a Product mega-menu
as well, and ten `/product/*` pages are planned. Columns come from data, so Product can adopt it
later without a rewrite.

`ProductPillar` is documented as the template for those ten future pages and deliberately does
not reuse `PillarSection`. Same reasoning here — a sector section gets its own shape. Reuse the
**primitives**: `SpecStrip.astro`, the mockup conventions, `FinalCta` (already parameterised).

### Reveal

Reuse `src/scripts/reveal.ts`. Its contract is two attributes — `[data-reveal-group]` on the
section, `[data-reveal]` on the elements in cascade order — plus a one-line import. An ES module
runs once per document however many components import it. **Do not write a second reveal
implementation.**

**The menu panel must not use it.** A navigation panel is not a scroll reveal.

### Files

| File | Change |
|---|---|
| `src/data/solutions.ts` | new — per-sector content, keyed to `SECTORS` by slug |
| `src/data/site.ts` | `NAV_LINKS` Solutions → `/solutions`; add `USE_CASES` and `SOLUTIONS_MENU` |
| `src/components/Nav.astro` | `<details>` trigger, panel wrapper and positioning, mobile drawer, behaviour appended to the existing script so it interleaves with `measure()` and `sync()` |
| `src/components/nav/SolutionsPanel.astro` | new |
| `src/components/nav/DrawerContent.astro` | new |
| `src/components/solutions/…` | new |
| `src/pages/solutions/index.astro` | new |
| `src/pages/solutions/[slug].astro` | new |
| `astro.config.mjs` | add `chevron-down`, `menu`, `x` to the Lucide `include`. The eight sector icons are already there. **An absent name renders nothing and does not fail the build** — verify by counting `<svg>` in the built HTML |
| `AGENTS.md` | record the four invariants from §4.3 — they are exactly what gets silently broken later |

---

## Decisions to settle before writing code

These are mine to make, not yours. Raise them rather than picking silently.

**1. The header loses its direct `/solutions` link** under the `<details>` approach. The
alternative — a link plus an adjacent toggle button — keeps it, but reintroduces the touch
problem (tapping on a phone navigates away before the menu is seen) and needs a documented
derogation from the no-static-hidden-state rule.
*Recommendation: `<details>`, with the destination as the panel's first row. Document the
alternative in a comment.*

**2. Construction and Staffing** — narrow the pages honestly to what the product actually
serves, drop the two sectors, or keep them as they are. See §1.4.
*Recommendation: narrow honestly. Dropping them means editing `SECTORS`, which needs Masdouk.*

**3. The `/solutions` index versus the homepage sector index** — they must not be the same page
twice. See Part 3.
*Recommendation: the use-case axis is what earns the index its existence.*

**4. `/use-cases/*` prefix** — keep it, or move the six under `/solutions/` so the menu's two
columns share a parent.
*Recommendation: decide now, because the anchors in §1.3 become redirects later either way.*

**5. EN-only versus bilingual is still open**, and `AGENTS.md` warns it *« structure tout le
routing, à trancher avant d'ajouter des pages »*. This adds nine.
*Recommendation: ship EN-only — the eight live 404s cost more than the retrofit — but shape
`solutions.ts` so a locale key can be added later without restructuring.*

---

## Acceptance criteria

- [ ] `astro build` passes; crawling `dist/` finds **no dead internal links** — every href in
      `SECTORS`, `FOOTER_COLUMNS` and both menu columns resolves to a built page or a real anchor
- [ ] With **JavaScript disabled**, the menu still opens natively, every nav link is reachable,
      and all page content is visible
- [ ] Keyboard only: Escape closes and restores focus to the trigger; Tab never enters a closed
      panel; focus is not trapped
- [ ] Under `prefers-reduced-motion`, nothing animates — **including the WAAPI panel transition**,
      which the global CSS override does not reach
- [ ] Opening the menu at the top of the page then scrolling 1px closes it cleanly, with no drift
- [ ] Opening the menu then drag-resizing across 561px leaves `--pill-w` uncorrupted
- [ ] At 1440px **with a classic scrollbar forced on**, the panel's left edge is pixel-identical
      to a `container-wide` section's left edge
- [ ] No horizontal scrollbar at 1440 / 901 / 620 / 561 / **360** — 360 is the one most likely
      to fail
- [ ] Mobile: every nav destination is reachable from the header on a phone, which is not true today
- [ ] Sector pages pass the find-and-replace test: **swapping the industry name would make the
      page read wrong**
- [ ] No new colour, radius or shadow values outside the existing tokens
- [ ] `AGENTS.md` documents the four invariants

## Do not

- Do not use `position: fixed` for either panel — it breaks the shared left edge on Windows and Linux
- Do not add a `z-index` to the panel — the header's stacking context already handles it
- Do not use `overflow: hidden` anywhere, including a mobile scroll lock — `overflow-x: clip` only
- Do not use the `animation:` shorthand — Lightning CSS renormalises it to `animation: none`
- Do not use `role="menu"` / `role="menuitem"`
- Do not put hidden state in a static CSS rule
- Do not change the trigger's width or height when it opens
- Do not write a second reveal implementation, and do not apply the reveal to the menu panel
- Do not introduce Content Collections
- Do not re-declare the sector list — key into `SECTORS`
- Do not add capabilities that are not in `src/data/product.ts`
- Do not invent statistics, client logos, testimonials or compliance claims
- Do not edit `SECTORS` names or hrefs without raising decision 2 first
