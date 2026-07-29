# Design brief — DocuFlow Solutions mega-menu and mobile navigation

> **Paste this whole document into Claude Design.**
> Two objects: the Solutions dropdown panel in the site header, and a mobile navigation drawer.
> All on-screen copy in English.
> Existing site: homepage, `/pricing` and `/product` are built and live. This brief adds
> navigation surfaces to a header that already exists — it does not redesign the header.

---

## 1. What this is

DocuFlow is an all-in-one operations platform for service businesses — agencies, dev shops,
consultancies, accountants. It replaces four separate subscriptions: a time tracker, a
monitoring tool, a CRM/project board, and a wiki.

Two things are needed:

**A. A Solutions mega-menu** — a panel that drops from the `Solutions` item in the header,
routing visitors to the right sector or use-case page.

**B. A mobile navigation drawer** — because below 561px the site currently has **no navigation
at all**. The links are simply hidden. This is a real gap, not a redesign whim.

## 2. Who uses it and what they are doing

Someone mid-evaluation who has just decided the homepage is interesting and now wants to know
whether this was built for *them specifically*. They are scanning for their own job title or
industry. The menu's whole job is: **let them find themselves in under two seconds.**

That means legibility beats density, and the two taxonomies must be visually separable at a
glance — not one undifferentiated wall of links.

## 3. The organising idea

**A filing index, not a marketing panel.**

The site's established visual language is precise and quiet: hairline rules, monospace labels,
flat fills, no gradients, no drop shadows except one. The menu must belong to that world. It is
a well-set table of contents that happens to float.

Concretely: the panel is organised by **rules and labels, not by boxes**. Do not put each link
in its own bordered card — eight cards plus six cards would read as a control panel. Columns
separated by a 1px rule, each headed by a monospace uppercase label, is the register.

## 4. Design system — follow exactly

The site exists. These panels must look like they belong to it.

### Colour tokens — use only these

| Token | Hex | Use |
|---|---|---|
| `ink` | `#0F1524` | headings, primary text |
| `ink-raised` | `#161D30` | raised surface on dark |
| `ink-border` | `#2A3348` | borders on dark |
| `paper` | `#F3F5F7` | page background, inset surfaces |
| `hour` | `#E9A23B` | accent — arrows, current state |
| `hour-hover` | `#D8912F` | amber hover |
| `live` | `#1F9D6B` | fills only — dots, bars, meters |
| `live-on-light` | `#187751` | green carrying text or a glyph (AA-safe) |
| `slate` | `#59657A` | body text, blurbs |
| `slate-on-ink` | `#9AA6B8` | muted text on dark |
| `rule` | `#D8DEE6` | 1px borders and dividers |

**No other colour values. No gradients anywhere.**

### Type

- **Cabinet Grotesk** — display, 700/800, letter-spacing `-0.03em`
- **Switzer** — body, 400/500/600
- **JetBrains Mono** — column headings, tags, and any number or badge

Column headings are monospace uppercase, ~11px, letter-spacing `0.06em`, in `slate`.

### Form

- Radii 4–8px. The panel itself 8px; inset blocks 6px; chips 3px.
- **1px `rule` borders instead of shadows**, with exactly one exception, below.
- **The one shadow.** The site has a single floating shadow token, `--shadow-float`
  (`0 6px 16px -8px rgb(15 21 36 / 0.18)`), already used by the collapsed nav pill. The panel is
  the same kind of object — a sheet floating over the page — so it **reuses that exact token**.
  Do not invent a second, heavier shadow. The panel is a sheet, not a modal.
- Panel background is white; the page behind it is `paper`, so white alone separates them.

### The header has two states — the panel must work under both

This is the most important constraint in the brief.

**State A — at the top of the page.** A full-width bar, 64px tall, `paper` at 90% with a
backdrop blur, 1px bottom rule. Logo left, links, then `Sign in` and an ink `Start free trial`
button right.

**State B — once scrolled.** The bar collapses into a **floating pill**, around 780px wide,
horizontally centred, detached from the top edge by roughly 10px, fully rounded, 1px `rule`
border, with the floating shadow. `Sign in` disappears; the CTA becomes a pill.

So design the panel **twice**:

- **Under state A** it hangs from the header's bottom edge, left-aligned to the site's content
  left edge (see below).
- **Under state B** it floats below the pill with a small gap, **horizontally centred**.

In both cases the panel is **its own sheet, sized by the page — not by the trigger**. Do not
attach it visually to the pill or try to make it the same width. A 1040px panel under a 780px
pill is correct as long as the panel reads as an independent floating sheet, which the shared
border and shadow language achieves.

### Layout note — the container is asymmetric

The site does **not** use a centred 1200px column. Content starts at the left edge a centred
1200px column would have, and extends further right to a shared right edge. Left margin wide,
right margin narrow. Deliberate.

Under state A, the panel's left edge aligns to that same content left edge — the one the
DocuFlow wordmark sits on. Under state B it is simply centred.

### Do not redesign the header

The bar, the pill, the wordmark, `Sign in` and the CTA are all built and signed off. Show them
as context. The only change to the trigger itself is described in §5.1.

## 5. The desktop panel

### 5.1 The trigger

`Solutions` in the header gains a small chevron to its right, indicating a menu.

**Critical constraint:** the trigger's dimensions must be **identical open and closed**. The
pill's width is measured at runtime from its contents, so anything that changes the trigger's
width when it opens would corrupt the pill. Permitted open-state changes: the label colour goes
from `slate` to `ink`, and the chevron rotates 180°. Nothing else — no weight change, no
underline that adds height, no added glyph.

### 5.2 Panel geometry

- Width `min(1040px, 100% - 48px)`
- Three regions left to right: **By industry** · **By use case** · **promo rail**
- Suggested split: roughly `1.1fr / 1fr / 0.85fr`, separated by 1px `rule` verticals
- Internal padding around 28–32px
- The rail sits on a `paper` inset with a 6px radius, so it reads as a distinct object inside
  a white sheet

### 5.3 The overview row

A single full-width row at the **head** of the panel, above the columns, separated by a 1px rule:

> **All solutions** → *Find the page written for how your team bills.*

Bold `ink` label, `slate` supporting sentence, amber `→` at the right. This row carries the link
to `/solutions`, so it is load-bearing rather than decorative — give it real presence.

### 5.4 Column 1 — By industry

Monospace uppercase heading: `BY INDUSTRY`

Eight entries. Each: a 16px monochrome icon in `ink`, the name in Switzer 500 at 15px, and a
monospace uppercase tag chip in `slate` with a 1px `rule` border at 10px.

| Name | Tag |
|---|---|
| Digital agencies | `agency` |
| Development teams | `software` |
| Consulting firms | `advisory` |
| Accountants | `finance` |
| Legal services | `legal` |
| BPO teams | `outsourcing` |
| Construction | `field` |
| Staffing agencies | `placement` |

Two columns of four inside this region if width allows, otherwise a single list of eight.

**No blurbs in this column.** Eight names plus eight sentences is too much to scan. The blurbs
live on the destination pages.

### 5.5 Column 2 — By use case

Monospace uppercase heading: `BY USE CASE`

Six entries, name only, same treatment as column 1 but **without icons** — the absence of icons
is what separates the two taxonomies at a glance.

- Remote teams
- Hybrid teams
- Client billing
- Employee productivity
- Project profitability
- Onboarding documentation

### 5.6 The promo rail

A `paper` inset, 6px radius. Not a hard sell — a way out for someone who does not see themselves
in either list.

> `NOT SURE?` *(monospace uppercase eyebrow, slate)*
>
> **Start from what the product does.**
>
> Time, activity, clients and knowledge — the four things DocuFlow replaces, on one page.
>
> `See the product →` *(text link with an amber arrow — **not** a filled button)*

**Why a text link and not a button:** the header already carries the page's one amber CTA
(`Start free trial`). A second filled amber element inside a floating panel would compete with
it. The site's established pattern for a secondary route is a label with an amber arrow.

### 5.7 States

Specify all of these:

- **Row at rest** — `ink` name, `slate` tag
- **Row hover** — a soft white wash across the full row width (the homepage sector index uses
  `rgb(255 255 255 / 0.55)`; on a white panel use `paper` instead). **No border change, no
  lift, no movement.** The site's hover language is a wash, not a jump.
- **Row focus** — a two-tone ring: 2px `hour` outline with 2px offset, plus a 2px `ink` ring
  filling the gap. Amber alone fails contrast on light surfaces, which is why the site uses both.
- **Trigger closed / open** — per §5.1
- **Panel open / closed**

## 6. The mobile drawer — below 561px

Today there is nothing here. Design it from scratch.

**Closed state:** the bar shows the wordmark, then a burger button at the right. `Sign in` moves
into the drawer to buy back horizontal room.

⚠️ **The width budget at 360px is the likeliest failure point of this whole design.** Wordmark +
CTA + burger + padding + gaps barely fits. Show the 360px state explicitly and, if it does not
fit, say what gives — the recommendation is that the CTA shortens or the wordmark drops to an
icon, not that anything wraps.

**Open state:** a full-height opaque panel sliding down from under the bar, `paper` background,
1px `rule` top border. Contents stacked, generously spaced, ~48px touch targets:

1. **Product** — a link
2. **Solutions** — an expandable row. Tapping it unfolds the two taxonomies as an indented list
   under it, industries then use cases, each group under its monospace heading. It does not
   navigate away.
3. **Pricing** — a link
4. A `rule` divider
5. **Sign in**
6. **Start free trial** — full-width ink button

Design both the collapsed and expanded Solutions states.

## 7. Copy

Everything on screen is already written above. Use it verbatim.

- Sentence case. Active voice. Short.
- **Banned:** revolutionary, seamless, powerful, cutting-edge, unlock, supercharge,
  game-changing, robust, world-class.
- Being specific beats being clever.

## 8. Motion

The site uses GSAP and has an established motion vocabulary, but **this panel is navigation, not
a scroll reveal — do not apply the site's drape reveal to it.**

- Panel entry: fade with a 6px downward slide, ~180ms, `cubic-bezier(0.4, 0, 0.2, 1)` — the same
  curve as the header's pill morph
- Chevron: 180° rotation on the same curve
- Row hover: colour and background only
- Mobile drawer: a straight slide down, same curve

Non-negotiable: `prefers-reduced-motion` means **no animation at all** — not a shortened one.
Nothing may shift layout; only opacity and transform move.

## 9. Honesty constraints — non-negotiable

DocuFlow has no external customers yet. It runs TECHMA's own operations.

- **No invented statistics.** No user counts, no "trusted by N teams", no testimonials, no
  customer logos anywhere in the panel.
- **No compliance claims.** No SOC 2, ISO 27001, HIPAA or GDPR-certified badges.
- **No integrations that don't exist.** No logo wall.
- Every sector and use-case name above is already agreed and live in the site's data. **Do not
  add, rename or reorder them.**

In Canada, misleading representations fall under the Competition Act. This is a legal
constraint, not a stylistic preference.

## 10. Responsive

Design at 1440px, then specify 1240, 901, 620, 561 and **360**.

The desktop panel exists only above 561px; below that the drawer replaces it entirely. Show
where the panel's three regions collapse — the promo rail should drop below the two taxonomy
columns before either column wraps.

## 11. Deliverables

1. The desktop panel under nav state A (full bar), at 1440px
2. The same panel under nav state B (floating pill)
3. The mobile bar closed, at 360px
4. The mobile drawer open, with Solutions collapsed
5. The mobile drawer open, with Solutions expanded
6. A component sheet: row, tag chip, column heading, overview row, promo rail, trigger — each
   with its rest / hover / focus / open states

## 12. Quality floor

Responsive to 360px. Visible keyboard focus everywhere using the two-tone ring described in
§5.7. AA contrast throughout, including the tag chips, which are the smallest text in the panel.
Reduced motion respected. No layout shift when the panel opens.

## 13. Do not

- Do not redesign the header bar, the pill, the wordmark or the CTA
- Do not attach the panel visually to the pill or match its width
- Do not put each link in its own bordered card
- Do not put blurbs under the eight industry names
- Do not use a filled amber button inside the panel
- Do not invent a second shadow — reuse `--shadow-float`
- Do not use gradients
- Do not add icons to the use-case column — their absence is what separates the two taxonomies
- Do not change the trigger's width or height when it opens
- Do not invent statistics, logos, testimonials or certifications
- Do not add, rename or reorder the sectors and use cases
