---
name: DocuFlow
description: The client dossier as a website — precise operational records, with warm layered paper reserved for explanatory illustrations.
colors:
  ink: "#0F1524"
  ink-raised: "#161D30"
  ink-border: "#2A3348"
  ink-hover: "#1C2740"
  paper: "#F3F5F7"
  card-white: "#FFFFFF"
  hour: "#E9A23B"
  hour-hover: "#D8912F"
  live: "#1F9D6B"
  slate: "#59657A"
  slate-on-ink: "#9AA6B8"
  rule: "#D8DEE6"
  receipt-rule: "#B9C2CF"
  band-mint: "#EAF2ED"
  band-warm: "#FBF3E6"
  paper-canvas: "#F6ECDF"
  paper-surface: "#FFFAF4"
  paper-accent: "#FFF0D8"
  paper-layer: "#DFCBB4"
  paper-layer-light: "#EDDBC6"
  paper-rule: "#EADFD4"
  paper-chip: "#F0E5D9"
  paper-track: "#EEE1D3"
  paper-label: "#75685A"
  paper-connector: "#BC9063"
  paper-callout: "#F0C987"
  paper-callout-text: "#5F4528"
  paper-sage: "#F3F8EF"
  paper-sage-surface: "#F7FBF4"
  paper-sage-rule: "#DFE9DA"
  paper-sage-fill: "#CDDFC8"
  paper-sage-text: "#52654D"
typography:
  display:
    fontFamily: "Cabinet Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(38px, 6vw, 66px)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Cabinet Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(28px, 4vw, 42px)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  wordmark:
    fontFamily: "Cabinet Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Cabinet Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body-lg:
    fontFamily: "Switzer, ui-sans-serif, system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  body:
    fontFamily: "Switzer, ui-sans-serif, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  body-sm:
    fontFamily: "Switzer, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  ui:
    fontFamily: "Switzer, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "normal"
  meta:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.06em"
  data:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "normal"
  data-sm:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "10px"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "normal"
  annotation:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "9px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.06em"
  paper-callout:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "8px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "normal"
  timer-metric:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "22px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.02em"
rounded:
  xs: "1px"
  sm: "3px"
  md: "6px"
  lg: "8px"
  full: "9999px"
  receipt-xs: "2px"
  receipt-sm: "4px"
  paper-inset: "12px"
  paper-card: "16px"
  paper-scene: "18px"
spacing:
  tight: "8px"
  card-sm: "20px"
  card: "24px"
  column-gap: "56px"
  section: "88px"
  section-band: "92px"
components:
  button-primary:
    backgroundColor: "{colors.hour}"
    textColor: "{colors.ink}"
    typography: "{typography.ui}"
    rounded: "{rounded.md}"
    padding: "13px 22px"
  button-primary-hover:
    backgroundColor: "{colors.hour-hover}"
    textColor: "{colors.ink}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.ui}"
    rounded: "{rounded.md}"
    padding: "9px 16px"
  button-ink-hover:
    backgroundColor: "{colors.ink-hover}"
    textColor: "{colors.paper}"
  button-secondary:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.ink}"
    typography: "{typography.ui}"
    rounded: "{rounded.md}"
    padding: "13px 22px"
  card-document:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "20px"
  card-plan:
    backgroundColor: "{colors.ink-raised}"
    textColor: "{colors.slate-on-ink}"
    rounded: "{rounded.lg}"
    padding: "24px"
  card-plan-featured:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "24px"
  card-layered-paper:
    backgroundColor: "{colors.paper-surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.paper-card}"
    padding: "18px"
  scene-layered-paper:
    backgroundColor: "{colors.paper-canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.paper-scene}"
    padding: "18px"
  badge-stage:
    backgroundColor: "{colors.hour}"
    textColor: "{colors.ink}"
    typography: "{typography.data}"
    rounded: "{rounded.sm}"
    padding: "3px 8px"
  chip-tag:
    textColor: "{colors.slate}"
    typography: "{typography.data}"
    rounded: "{rounded.sm}"
    padding: "2px 8px"
  chip-source:
    textColor: "{colors.live}"
    typography: "{typography.data}"
    rounded: "{rounded.sm}"
    padding: "3px 8px"
  nav-link:
    textColor: "{colors.slate}"
    typography: "{typography.ui}"
  nav-link-hover:
    textColor: "{colors.ink}"
---

# Design System: DocuFlow

## Overview

**Creative North Star: "The Client Dossier"**

The site is a case file, not a brochure. Every surface behaves like a well-kept record: white stock
laid on cold paper, hairline rules dividing one field from the next, and a small amber tab marking
the only thing that matters right now. Nothing floats, nothing glows, nothing is stacked in
perspective to look impressive. Things are filed.

This is doing real work for the product. DocuFlow's argument is that a client project is the object
everything attaches to — hours, screenshots, tasks, documents — and the visual system makes that
argument before a single word is read. A card opens with an identity line, then a rule, then
contacts, then a rule, then budget, then a rule, then tags. That is the shape of a record, and it is
the shape of the product's data model. The 1px rule is the most load-bearing element in the system
precisely because it is the cheapest: it separates without decorating, and it lets a dense card stay
legible without a single shadow.

The register is precise and unfussy. The buyer is a skeptical operator who has been sold to before,
so the design earns trust by looking like something that was *kept* rather than something that was
*produced*. Operational UI remains ruled, compact and square to the page. Explanatory illustrations
may instead use **Layered Paper**: warm sheets, softened corners and real overlap that makes the
relationship between records visible. Every number is monospaced because monospace means the system
recorded it; prose is Switzer because a human wrote it.

**Key Characteristics:**

- Hairline rules for operational UI; physical paper depth for explanatory illustrations
- Monospace for anything recorded; sans for anything written
- Flat, held section bands that never blend into one another
- Amber rationed to a single mark per screenful
- Purpose-built structural visuals: every card encodes real product shape
- Standalone illustrated cards stay standalone — backing sheets add depth, never an enclosing card
- Reserved heights on anything that changes, so nothing reflows

## Colors

A cold, clerical palette — near-black navy on cool off-white — with exactly two chromatic voices:
amber for *now* and green for *confirmed*.

### Primary

- **Amber Tab** (`#E9A23B`): The current stage, and only the current stage. It fills the rail dot and
  its progress fill, the `IN PROGRESS` badge on a project card, the primary CTA, and the final call
  band. It is never used for a border on a resting element, never for body text, never decoratively.
- **Amber Tab Pressed** (`#D8912F`): The hover state of any amber surface. Darker, not lighter —
  pressing a tab pushes it in.

### Secondary

- **Signed-Off Green** (`#1F9D6B`): Something the system verified. Budget consumption bars, the
  `88% active` readout, checked items, the Transparency guarantees, source chips on an AI answer,
  and high activity intervals. Green is a *result*; amber is a *state*. Never swap them.

### Neutral

- **Case Ink** (`#0F1524`): The anchor. Headings, body-adjacent UI text, dark section bands (proof,
  the bill, the footer), and the secondary ink button. It is the page's gravity.
- **Ink Raised** (`#161D30`): The one step up from Case Ink, for surfaces sitting *on* a dark band —
  the pricing receipt, non-featured plan cards, the footer language select. Tonal layering is how
  depth works on dark ground.
- **Ink Border** (`#2A3348`): The hairline's dark-band counterpart. Same job, same 1px, legible
  against ink where Divider Grey would disappear.
- **Ink Hover** (`#1C2740`): Hover state for ink-filled buttons.
- **Cold Stock** (`#F3F5F7`): The page ground, and also the inset surface *inside* white cards —
  query bubbles, guarantee rows, an unfilled meter track. Deliberately cool: no cream, no warmth,
  no "document paper" cliché.
- **Card White** (`#FFFFFF`): The record itself — every dossier card, every plan card, and the
  receipt's selected stub. White is what a filed page is made of; Cold Stock is the desk it sits on.
  It also appears at 55% as the sector index's hover wash, which is the same idea at a whisper: the
  row you are pointing at lifts toward paper without becoming a card.
- **Archive Slate** (`#59657A`): Running body text, secondary labels, roles, and captions. Carries
  most of the reading on light bands.
- **Slate on Ink** (`#9AA6B8`): The same voice inverted — body text on dark bands, footer links.
- **Divider Grey** (`#D8DEE6`): Every hairline, every resting border, and the "not yet reached" state
  of a stage in a stage list. It is the most-used color in the system.
- **Receipt Rule** (`#B9C2CF`): One step darker than Divider Grey, and used *only* on the pricing
  receipt — its dashed dividers, dotted leaders and inter-stub perforations. Divider Grey vanishes
  against Cold Stock at these dash weights, and Slate on Ink draws a line too hard for paper. It has
  no use anywhere else; if a second surface wants it, that surface is probably not paper.

### Tertiary — band grounds

- **Ledger Mint** (`#EAF2ED`): The activity and hours band. Cool, barely-there green that ties the
  section to Signed-Off Green without competing with it.
- **Manila** (`#FBF3E6`): The documentation band. The one warm ground in the system, and it belongs
  to the knowledge pillar — the folder color, in a system named after documents.

### Layered Paper — illustration palette

This palette belongs to structural marketing illustrations, not to application UI or ordinary
content cards.

- **Paper Canvas** (`#F6ECDF`): a bounded scene containing several overlapping objects. Never wrap
  a single card in it.
- **Paper Surface** (`#FFFAF4`): the primary sheet or card face.
- **Paper Accent** (`#FFF0D8`): the one selected line, current timer row or queried amount.
- **Paper Layer / Light** (`#DFCBB4` / `#EDDBC6`): the two offset sheets behind a standalone card.
- **Paper Rule / Chip / Track** (`#EADFD4` / `#F0E5D9` / `#EEE1D3`): internal separators, quiet
  metadata capsules and meter tracks.
- **Paper Sage family** (`#F3F8EF`, `#F7FBF4`, `#DFE9DA`, `#CDDFC8`, `#52654D`): retained or
  confirmed information inside the paper scene.
- **Paper Connector** (`#BC9063`): lineage paths between source records and the invoice.
- **Paper Callout** (`#F0C987` with `#5F4528` text): a small explanatory bridge such as “Traced to
  the work.” It is not a CTA and never replaces Amber Tab.

### Named Rules

**The One Amber Rule.** Amber marks the current step or the next action — never both in the same
viewport, and never decoration. Its scarcity is the entire reason the rail reads as information
rather than ornament. The final CTA band is the single licensed flood; if a new section wants amber
and a screenful already has it, the new section does not get it.

**The Band Rule.** Section grounds are flat, held colors, and the page moves cool → warm → ink across
its length. A band is one color from edge to edge. There is no gradient anywhere in this system, in
any direction, at any opacity.

**The Two Voices Rule.** Green is a confirmed result; amber is a present state. A budget bar that has
been consumed is green. A stage that is happening is amber. Reversing them makes the interface lie.

**The Layered Paper Boundary.** Warm paper colors communicate that the visitor is looking at an
illustration of records, not a live product panel. Do not apply them to navigation, forms, pricing
cards, ordinary content containers or the application itself.

## Typography

**Display Font:** Cabinet Grotesk (with `ui-sans-serif`, `system-ui`, `sans-serif`)
**Body Font:** Switzer (with `ui-sans-serif`, `system-ui`, `sans-serif`)
**Label/Mono Font:** JetBrains Mono (with `ui-monospace`, `monospace`)

**Character:** Cabinet Grotesk is set tight and heavy — weight 800, `-0.03em` tracking, 1.02–1.05
leading — so headlines read as struck rather than typeset. Switzer underneath is neutral and calm at
a generous 1.55 leading. JetBrains Mono is not a stylistic choice: it is the product's own interface
font, so every figure on this site is set the way the same figure is set inside the app. All three
are self-hosted; no third-party font request is ever made.

### Hierarchy

- **Display** (800, `clamp(38px, 6vw, 66px)`, 1.02): The single `<h1>` per page. Capped at
  `15ch` so it always breaks into a stack of short, hard lines.
- **Headline** (800, `clamp(28px, 4vw, 42px)`, 1.05): Section `<h2>`. Capped at `16–18ch`. Dark
  bands scale up — `clamp(34px, 5vw, 56px)` on the pricing band, `clamp(30px, 4.5vw, 48px)` on the
  amber call band — because a flooded ground can carry more weight.
- **Wordmark** (800, 20px, `-0.02em`): The DocuFlow name itself, in the header and footer. It drops
  to 15px inside the collapsed nav pill — the only place the wordmark changes size.
- **Title** (700–800, 17px, `-0.02em`): Card identity lines (`Northwind · Ledger rebuild`) and
  block-editor headings. Display font at UI scale.
- **Body-lg** (400, 19px, 1.55): The lead paragraph under a page `<h1>`, capped at `62ch`. One step
  above body, and the only place it appears.
- **Body** (400, 18px, 1.55): Section prose, capped at `52ch` in a pillar column.
- **Body-sm** (400, 14px, 1.6): Prose inside a card or panel — inspector lines, plan notes, editor
  paragraphs. The reading size when a record, not a section, is the container.
- **UI** (500, 15px): Nav links, buttons, plan names. Medium weight, never bold.
- **Meta** (400, 13px): Mono section eyebrows (`IN PROGRESS — the hours`), the legal line under a
  CTA, card notes. The largest mono step; not letterspaced.
- **Label** (400, 12px, `0.06em`, uppercase): The `label-mono` utility — card eyebrows, footer column
  heads, stage ticks. Uppercase and letterspaced so it reads as machine annotation.
- **Data** (400, 11px): The workhorse mono step — figures, durations, roles, breadcrumbs, captions.
  The most-used size in the system.
- **Data-sm** (400, 10px): Badges, tags, stage strips, connectors — mono at annotation scale.
- **Annotation** (400, 9px, `0.06em`, uppercase): The smallest step. Gutter labels on a record row
  (`CLIENT` / `HOURS` / `SHOTS`) and avatar initials. Below this, nothing.
- **Score** (700 mono, 36px, `-0.02em`, 1.0): The evidence quality figure, and only that figure —
  `84`, `38`, always followed by a 14px `/100` in Archive Slate. It is the one number in the system
  set larger than a headline's neighbours, because it is the number a skeptical operator came to the
  page to check. Carried by `product/mockups/EvidenceMock`, `solutions/mockups/ScoreMock`,
  `solutions/mockups/WeekMock` and `solutions/mockups/SilenceMock`. A second figure reaching for
  this size is almost certainly a proof stat (24px) or a plan price (34px) instead.

Sizes outside this ramp are one-offs, not steps: `14.5px` (sector blurb), `22px` (block-editor
heading), `24px` (proof figure), `26px` (proof heading), `34px` (plan price). Each appears exactly
once. Treat them as unsystematized rather than as license to add a size — if one starts repeating,
promote it to a role here instead of copying the literal.

**Score is what that promotion looks like.** `36px` sat outside the ramp while already appearing in
two shipped mockups, so it was neither a step nor a one-off — the state this paragraph exists to
prevent. A third use (`SilenceMock`, 30 July 2026) forced the call, and the rule above answers it:
the size was promoted to a role rather than copied again. The three components were already
identical; none of their values changed.

### Named Rules

**The Recorded/Written Rule.** If the system produced it, it is JetBrains Mono. If a person wrote it,
it is Switzer. Hours, prices, percentages, dates, stage names, tags, breadcrumbs and IDs are mono
without exception — including inside prose-heavy cards. This is the single most important typographic
rule in the system and it is what makes the interface feel instrumented rather than styled.

**The Hard Line Rule.** Every heading carries a `ch` cap (`15ch` display, `16–20ch` headline,
`48–62ch` body). Headlines are meant to break into short stacked lines; a heading that runs the full
container width is wrong even when it fits.

## Layout

**The page is deliberately asymmetric.** Content starts at the left edge a centred 1200px column
would have, and runs right to a single shared edge defined by the hero's project card. The left
margin is wide, the right margin narrow, and every band agrees on both edges.

`container-wide` is the real container — the header, every section and the footer use it.
`container-page` (the old centred 1200px column) survives for incidental use but no section uses it.

```
--edge-side  = max(0px, (100% - 1200px) / 2)             ← left edge, unchanged
--edge-extra = min(180px, max(0px, --edge-side - 24px))  ← right overhang, capped
```

Below ~1216px the overhang resolves to zero and `container-wide` degrades to the centred column, so
narrow viewports are unaffected.

**The Shared Edge Rule.** Every measurement is `100%` — relative to `<body>`, scrollbar excluded —
never `vw`, which includes it. Mixing the two desynchronises the left edge by roughly 8px, which is
the exact defect this system exists to remove. And a block whose content does not fill its column
must be sized to its content and pushed right (the proof band's figures); otherwise the section reads
as falling short while its container is perfectly aligned.

**Section rhythm.** `88px` vertical padding is the standard section; `92px` on flooded bands (the
bill, the final call) so a dark or amber ground gets more air; `64px` on the compressed proof band
and footer; `84px` on the hero top.

**Pillar sections** are a two-column grid at `min-width: 901px` — prose left, structural card right,
`56px` gap, vertically centered — collapsing to a single stacked column below. Alternation is
deliberate and sparing: the CRM section reverses to put the client record on the left, breaking what
would otherwise be a metronome.

**Card grids** run 4-up above 901px, 2-up above 561px, 1-up below, with a `16px` gap. The plan cards
are the remaining example.

**The sector index** is not a card grid and is the one place the page abandons boxes entirely: two
columns above 901px, one below, `72px` between columns and **zero** between rows, because a 1px rule
on top of every entry is what separates them. Entries carry `24px 20px` of padding against a
`-16px` inline margin, so the hover wash bleeds past the type while the type itself stays on the
column. Below 620px the header row wraps and the arrow is dropped rather than allowed to squeeze the
sector name.

**Breakpoints** are three, and they are semantic rather than device-named:

- `1240px` — the stage rail appears. Below this there is no gutter to hold it, so it is hidden
  outright rather than relocated.
- `901px` / `900px` — two-column pillar layouts collapse; the stack-fold animation switches from
  horizontal collapse to a static resolved state.
- `561px` / `560px` — nav links hide; card grids go single-column.

**Density.** Light bands are open; cards are dense. A dossier card packs 5–7 fields into ~240px of
height, separated by rules and `16px` gaps, and that compression is the point — it looks like a
record because records are compressed.

**Reserved height.** Any region whose content changes reserves its box: the hero inspector holds
`min-height: 58px`, the fold caption holds `24px`. CLS ≈ 0 is a design constraint, not a build
concern.

## Elevation & Depth

**Operational UI is flat.** Depth there comes from three sources, in this order: 1px hairlines,
tonal layering (Cold Stock inset inside Card White; Ink Raised on Case Ink), and flat band grounds.
There is no resting shadow on navigation, controls, tables or ordinary content cards.

**Layered Paper illustrations are intentionally physical.** Their sheets are rotated, offset and
overlapping, so soft shadows describe actual separation between paper planes. This is an
illustration grammar, not permission to put shadows on the interface.

Shadows are licensed one object at a time, and every licensed object has physically left the plane
of the page. The test is always the same: could a hairline describe this relationship? If yes, the
shadow is decoration.

### Shadow Vocabulary

- **The arrival lift** (`box-shadow: 0 24px 48px -18px rgba(15, 21, 36, .5)`): Carried by the dark
  DocuFlow card at the end of the stack-fold animation, and by the hero's project card while it is
  tilted. Four flat bills collapse and one object arrives lifted; the hero card sits at `1.6°` and
  straightens under the pointer. In both cases the element is off-plane, and a hairline genuinely
  cannot describe an off-plane object — it would read as a rendering fault rather than an intention.
- **The receipt** (`filter: drop-shadow(0 30px 44px rgba(0, 0, 0, .55))`): The pricing receipt is a
  sheet of paper lying on the ink band — a real object on a real surface, not a panel drawn on it.
  It is a `drop-shadow` filter rather than a `box-shadow` because the stubs below it have torn zigzag
  edges, and `box-shadow` would trace their rectangular boxes instead of the teeth.
- **The torn stub** (`filter: drop-shadow(0 20px 26px rgba(0, 0, 0, .5))`): The selected plan stub,
  which lifts `16px` and rotates `±1°` as if half-pulled from the perforation. Same argument as the
  arrival lift, and it is the *only* hover- or selection-driven shadow in the system.
- **Layered Paper card** (`--shadow-paper-card`, with `raised`, `dark` and `hover` variants): A
  marketing illustration of a physical record. The face sits over two rotated backing sheets.
  `--shadow-paper-inset` is reserved for the selected line inside it; it must not create a second
  outer card.

A new use needs the same argument — an object that has genuinely left the page — not a preference
for depth. Nothing that sits square to the grid gets one, including on hover.

### Named Rules

**The Off-Plane Rule.** A shadow is earned only by an element that has physically left the page —
rotated, or arriving from elsewhere. Anything sitting square to the grid separates with a hairline,
including on hover, including when it is the most important object on the screen. Layered Paper
qualifies because its face and backing sheets visibly occupy different planes.

### Named Rules

**The Hairline-First Rule.** A 1px `Divider Grey` rule (or `Ink Border` on dark) is the default
answer to every operational separation problem. Reach for tonal layering second. A shadow requires
a genuine off-plane object or the named Layered Paper illustration pattern.

**The Sticky Nav Rule.** The header separates from scrolling content with a 1px bottom rule and a
`90%` paper background at `blur(8px)` — never a drop shadow. Translucency plus a hairline is how this
system signals "above the fold content".

## Shapes

Radii are small and stepped by function, never by size:

- **1px** (`xs`) — data marks: histogram bars, task squares. Barely-softened rectangles that stay
  legible at 7px.
- **3px** (`sm`) — annotations: badges, tags, source chips, screenshot tiles, checkboxes. Anything
  that behaves like a label stuck onto a record.
- **6px** (`md`) — interactive and inset: buttons, sector index entries, plan CTAs, inset surfaces
  inside a card, the hover target on a hero layer.
- **8px** (`lg`) — records: every dossier card, plan card and panel. The largest radius in the
  system, and it marks "this is a document".
- **full** — only for genuinely circular things: avatars, meter tracks and fills, the rail dot,
  status dots.

Layered Paper illustrations carry their own larger, named scale:

- **12px** (`paper-inset`) — selected lines and inset evidence rows.
- **16px** (`paper-card`) — the face and both backing sheets of a physical card.
- **18px** (`paper-scene`) — a canvas containing several independently positioned paper objects.

These values do not enter buttons, navigation, forms, application panels or ordinary marketing
cards. Their names carry their scope.

**The paper exception.** The pricing receipt is the one surface that steps outside this scale, and it
does so as a set, not one value at a time: `3px 3px 0 0` on the receipt body (square along the bottom,
because the tear-off stubs continue it), `2px` on the amber price chip and the `MOST TEAMS` flag,
`3px` on a stub checkbox, `4px` on a stub CTA. The reason is literal — a printed receipt has cut
corners, not the softened corners of a card, and 6px on a stub CTA immediately reads as a web button
sitting on paper rather than as ink printed on it. They are named `receipt-xs` (2px) and `receipt-sm`
(4px) precisely so the scope travels with the value: these belong to the receipt object, not to the
scale. A component elsewhere reaching for either has no argument.

Borders are always exactly 1px, in Divider Grey on light and Ink Border on dark. Two deliberate
breaks: the featured plan card takes a 2px amber border to mark itself, and the proof-band statistics
take a 2px amber *left* rule — the same idea rotated, amber marking the entry that counts.

The receipt is the third, and again it is the paper argument rather than a preference: `1.5px dashed`
section dividers, `2px dotted` dot leaders, a `2px dashed` perforation across the stub strip, and
`2px dashed` between adjacent stubs, all in Receipt Rule except the perforation, which uses Slate on
Ink so the tear line reads as harder than the folds above it. Dashes and dots exist nowhere else in
the system; solid hairlines separate every other surface.

Screenshot placeholders share one recurring texture — a 45° repeating stripe of Cold Stock and white
at 4px intervals. It reads as "image withheld" without inventing fake screen content, and it is used
identically in the hero, the hours card and the documentation code block.

**The Squares-and-Circles Rule.** In data marks, shape carries meaning: a square marker is a task, a
round marker is a document. Never assign these arbitrarily; the shapes are a legend.

## Components

### Buttons

- **Shape:** Softly cornered rectangles (6px). No pill buttons anywhere in the system.
- **Primary (amber):** Amber Tab ground, Case Ink text, `13px 22px` padding, weight 500. Used once
  per view for the conversion action.
- **Ink:** Case Ink ground, Cold Stock text. The nav's compact CTA (`9px 16px`) and the primary
  action on an amber band, where amber-on-amber is impossible.
- **Secondary:** Card White ground with a 1px Divider Grey border. On hover the border darkens to
  Case Ink — the fill never changes. On dark or amber grounds this becomes a solid white button.
- **Hover / Focus:** `transition-colors` only; no lift, no scale, no shadow. Focus is the global ring
  (2px Amber Tab, 2px offset).

### Cards / Containers

- **Corner Style:** 8px for records and panels; 6px for smaller tiles.
- **Background:** Card White on light bands; Ink Raised on dark bands.
- **Shadow Strategy:** None. See Elevation & Depth.
- **Border:** 1px Divider Grey (Ink Border on dark).
- **Internal Padding:** 20px for dense dossier cards, 24px for plan cards, 48px for the full-width
  Transparency panel.
- **Internal structure:** Fields are separated by a full-width 1px rule with `16px` above and below.
  A dossier card reads top to bottom as identity → rule → people → rule → figures → rule → tags →
  rule → footnote.

### Layered Paper Card — illustration pattern

Use this pattern when a marketing illustration depicts a record, invoice, timesheet or query as a
physical object. The production reference is
`src/components/solutions/mockups/SectorMockup.astro`; activate it with
`<SectorMockup mock={mock} warm />`.

**Standalone recipe**

1. The stage is transparent and has padding only. **Do not give it a background, border, radius or
   shadow. A card alone never sits inside another card.**
2. Place two `aria-hidden` backing sheets behind the face. Both use `paper-card` radius:
   - dark layer: `paper-layer`, `translate(-7px, 5px) rotate(-2.4deg)`
   - light layer: `paper-layer-light`, `translate(6px, 3px) rotate(1.7deg)`
3. The face uses `paper-surface`, `paper-card` radius and `shadow-paper-card`. It carries the real
   content and semantics.
4. Selected rows use `paper-accent` with `paper-inset` radius. Internal rules use `paper-rule`;
   quiet metadata uses `paper-chip`.
5. On a dark band, use `shadow-paper-card-dark`; do not add a dark enclosing panel.

**Multi-object scene**

Use `paper-canvas`, `paper-scene` radius and `shadow-paper-scene` only when the illustration contains
multiple independently positioned objects—such as source records converging into an invoice. The
canvas is the physical desk. It is not available to a single-card mockup.

**Motion**

- Duration: `--paper-motion-duration` (`420ms`)
- Ease: `--paper-motion-ease` (`cubic-bezier(0.16, 1, 0.3, 1)`)
- Hover may separate the backing sheets and lift the face by up to `5px`.
- Gate the effect behind `(hover: hover)`, `(pointer: fine)` and
  `(prefers-reduced-motion: no-preference)`.
- Content is visible and correctly composed without JavaScript.

### Chips

- **Tag:** Transparent ground, 1px Divider Grey border, Archive Slate mono text at 10px, 3px radius,
  `2px 8px` padding. Lowercase — tags are typed by a person (`retainer`, `Q2`).
- **Stage badge:** Amber Tab ground, Case Ink text, bold mono at 10px, 3px radius. Uppercase.
- **Source chip:** Transparent ground, 1px Signed-Off Green border, green mono text. Marks a cited
  source on an AI answer; the green border is what makes an answer feel accountable.

### Navigation

The header has **two states**, and the `<header>` itself never changes: it holds 64px and
`sticky top-0` in both. Only the inner shell transforms, so nothing touches document flow.

- **At the top** — full-width bar, Cold Stock at 90% with an 8px backdrop blur, 1px Divider Grey
  bottom rule. Wordmark at 20px, four links, Sign in, trial CTA.
- **Scrolled** — the bar's ground goes transparent and the shell contracts into a **floating pill**:
  fully rounded, 44px tall, centred, Cold Stock at 94% over a 10px backdrop blur, 1px Divider Grey,
  the `float` shadow. It carries the wordmark at 15px, the four links, and the CTA. "Sign in"
  collapses to zero width and takes `inert`. A 44px pill inside 64px leaves a 10px gap top and
  bottom — that gap is what makes it read as floating.
- Links in Switzer 500 at 15px, Archive Slate → Case Ink on hover. On the translucent pill they hold
  4.78:1 at worst, over the darkest band on the page.
- **The switch is driven by a 64px sentinel** at the top of the document, watched by an
  `IntersectionObserver` — never a scroll listener reading position per frame. State A returns only
  at the very top, not on the first upward gesture.
- **Below 561px the morph is disabled entirely.** The links are already hidden at that width, so a
  pill would have nothing to carry. The bar keeps its normal form.
- Every page carries a skip link that is visually hidden until focused, then appears as an ink chip
  at top-left. `scroll-padding-top: 80px` keeps in-page anchors from parking headings under the bar.

**The Fixed-Frame Rule.** When a sticky element changes shape, the element that occupies layout keeps
its box and an inner wrapper does the moving. Animating height, top or padding on the sticky frame
itself is where layout shift comes from.

### Meters

A 6px full-radius track in Cold Stock with a solid fill — Signed-Off Green for budget consumption,
per-member tone for hours. Always paired with a mono readout of the same value (`62% used`,
`38.5 h`). The bar is never the only carrier of the number.

### The Stage Rail (signature)

A fixed 1px vertical line at `left: 22px`, spanning `20vh` to `80vh`, in Divider Grey, with an amber
fill growing from the top and a 5px amber dot riding the fill. Five stage labels sit alongside in
10px mono at `0.08em`, 75% opacity. Progress is written directly to the DOM in a
`requestAnimationFrame`-throttled scroll handler — never through framework state, which would
re-render on every pixel. It is `aria-hidden`, appears only above 1240px, and encodes true document
progress rather than decorating the margin.

### The Stack Fold (signature)

The page's one major animation. Four white bill cards translate toward a convergence point at 39%,
each rotating `(i - 1.5) × 3°` and scaling to 0.93 while fading out on a 90ms-per-card stagger; the
dark DocuFlow card rises from `translateY(30px) scale(0.92)` into place at a 550ms delay, carrying
the arrival lift. The caption cross-fades from `$38 /user/mo` to `$14 /user/mo` behind it. It fires
once, from an `IntersectionObserver` at `threshold: 0.45`, after a double `requestAnimationFrame` so
the initial state is guaranteed painted. Under `prefers-reduced-motion` the resolved state is applied
immediately with no transition; below 900px the bills are not rendered at all.

### Motion

- **Easing:** `cubic-bezier(0.4, 0, 0.2, 1)` for anything choreographed; plain `ease` for state.
- **Durations:** 0.12s for a hover fill, ~0.15s for color transitions, 0.32s for a cross-fade,
  0.7–0.9s for the fold's staged transforms.
- **Operational surfaces are not displaced on hover.** Controls, rows and ordinary cards change
  color without lift, scale or shadow. Layered Paper illustrations are the explicit exception:
  their backing sheets separate and the face may rise by at most `5px`, because the movement
  explains their physical construction rather than pretending a control was pressed.
- **One thing moves on hover, and it is an icon.** The sector entry's Lucide glyph runs a single
  damped wobble — `rotate` through −8°, +6°, −4°, +2°, back to 0 over 420ms, `ease-out` — triggered
  by the whole entry, never by the glyph itself, which would be a 20px hover target inside a
  full-width link. The decay is what keeps it from reading as a toy: it settles rather than stopping,
  and it never repeats while the pointer rests. Never `infinite` — an icon that keeps twitching pulls
  the eye off the label it exists to support, and eight competing with each other is noise.
- `prefers-reduced-motion` collapses all animation and transition durations to 0.01ms globally and
  disables smooth scrolling.

## Do's and Don'ts

### Do:

- **Do** separate with a 1px rule (Divider Grey on light, Ink Border on dark) before reaching for any
  other device. It is the system's default answer.
- **Do** set every recorded value — hours, prices, percentages, dates, stage names, tags — in
  JetBrains Mono, and everything a human wrote in Switzer. The Recorded/Written Rule is not
  negotiable.
- **Do** give each new section a flat, held band color and keep the page's cool → warm → ink arc
  intact.
- **Do** cap headings with a `ch` measure (`15ch` display, `16–20ch` headline, `48–62ch` body) so
  they break into short stacked lines.
- **Do** reserve height on any region whose content changes, the way the hero inspector holds
  `min-height: 58px`.
- **Do** structure a card as a record: identity, rule, fields, rule, footnote — with `16px` on either
  side of every rule.
- **Do** use Layered Paper for explanatory record illustrations, with two backing sheets and one
  semantic face. Keep the stage transparent when there is only one card.
- **Do** keep the global focus ring (`2px solid #E9A23B`, `2px` offset) on every interactive element,
  and honour `prefers-reduced-motion` on anything that moves.

### Don't:

- **Don't** use a gradient. Anywhere, in any direction, at any opacity. Bands are single held colors.
- **Don't** add a shadow where a hairline would do. Shadows belong to off-plane objects, the receipt
  and the named Layered Paper illustration pattern—not to ordinary interface cards.
- **Don't** put amber twice in the same screenful, or use it as a resting border, body text or
  decoration. One mark, and it means *now*.
- **Don't** swap the amber/green meanings. Amber is a present state; green is a confirmed result.
- **Don't** introduce a fourth typeface or an unnamed radius. The operational scale remains
  1 / 3 / 6 / 8 / full; receipt and Layered Paper radii are available only through their named,
  scoped tokens.
- **Don't** put a standalone card inside a rounded warm container. If there is one card, use a
  transparent stage and backing sheets. `paper-canvas` is only for a multi-object scene.
- **Don't** use a 2px border beyond the featured plan card and the proof-band left rule, or a dashed
  or dotted rule anywhere but the receipt. Every other separation in the system is a solid hairline.
- **Don't** route the stage rail's scroll progress — or any per-pixel value — through framework
  state. It writes to the DOM directly, throttled in `requestAnimationFrame`.
- **Don't** load a font, script or asset from a third-party domain. Everything is self-hosted; the
  performance budget (Lighthouse ≥ 95, LCP < 2s, CLS ≈ 0) is part of the design.
- **Don't** add a second major animation to a page. One per page, plus hover-level micro-interaction.
