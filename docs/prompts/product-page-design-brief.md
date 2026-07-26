# Design brief — DocuFlow Product page

> **Paste this whole document into Claude Design.**
> Target route: `/product`. All on-screen copy in English.
> Existing site: homepage and `/pricing` are already built and live in the repo.

---

## 1. What this page is

DocuFlow is an all-in-one operations platform for service businesses — agencies, dev shops,
consultancies, accountants. It replaces four separate subscriptions: a time tracker, a
monitoring tool, a CRM/project board, and a wiki.

The **homepage** sells the consolidation. The **pricing page** sells the plans.

This page is the **product overview** — the complete answer to "what does it actually do?".
It is the destination of the `Product` nav item, and later the parent of ten per-feature pages
(`/product/time-tracking`, `/product/crm`, …) which are not in scope here.

## 2. Who reads it and what they are thinking

Someone already interested, now doing diligence. They are further along than a homepage
visitor: they don't need to be persuaded that consolidation is desirable, they need to believe
it is *real*.

**They arrive with one specific objection, and the page exists to defeat it:**

> "An all-in-one does everything badly. I'd rather have four good tools than one mediocre one."

That is the thesis of the page. Not breadth — **depth**. Every section must prove that the
pillar in question is a real product with real engineering behind it, not a checkbox added to
pad a comparison table.

**Primary conversion:** Start free trial. **Secondary:** Book a 15-minute demo.

## 3. The organising idea

**A specification sheet that happens to be beautiful.**

Competitors in this category write vague marketing prose. DocuFlow's advantage on this page is
to be *unusually precise*: real intervals, real counts, real platform names, real limits.
Publishing the actual numbers is itself the argument — it says the thing was built, not
white-labelled.

So the page should read dense and confident, closer to a well-designed datasheet than to a
marketing page. Numbers carry the persuasion. Prose stays short.

This suits the existing visual language exactly — see §4, which was built for precision.

### Structural spine

Four pillars, in this order. **This taxonomy already exists on the pricing page's comparison
table — keep it identical**, so the two pages agree:

```
TIME  →  ACTIVITY  →  CLIENTS  →  KNOWLEDGE
```

## 4. Design system — follow exactly

The site exists. This page must look like it belongs, not like a new design.

### Colour tokens — use only these

| Token | Hex | Use |
|---|---|---|
| `ink` | `#0F1524` | dark bands, headings |
| `ink-raised` | `#161D30` | raised surface on dark |
| `ink-border` | `#2A3348` | borders on dark |
| `paper` | `#F3F5F7` | page background (cool white) |
| `hour` | `#E9A23B` | primary accent, CTAs |
| `live` | `#1F9D6B` | fills only — gauges, dots, bars |
| `live-on-light` | `#187751` | green that carries text or a glyph (AA-safe) |
| `slate` | `#59657A` | body text |
| `slate-on-ink` | `#9AA6B8` | muted text on dark |
| `rule` | `#D8DEE6` | 1px borders and dividers |
| `band-mint` | `#EAF2ED` | tinted section band |
| `band-warm` | `#FBF3E6` | tinted section band |

**No other colour values.** No gradients anywhere — section bands are flat fills.

### Type

- **Cabinet Grotesk** — display, 700/800, letter-spacing `-0.03em`
- **Switzer** — body, 400/500/600
- **JetBrains Mono** — every number, duration, interval, count, price, badge and eyebrow label

The monospace rule matters more on this page than anywhere else on the site: this page is
mostly specifications, and mono is what makes a figure read as measured rather than claimed.

### Form

- Radii 4–8px only. Chips 3px.
- **1px `rule` borders instead of shadows.** Shadows only on genuinely floating elements.
- Uppercase mono eyebrow labels, ~11–12px, letter-spacing `0.06em`
- Content max-width 1200px
- Breakpoints in use: 1240px, 901px, 561px

### Layout note — the container is asymmetric

The site does **not** use a centred 1200px column. Content starts at the left edge a centred
1200px column would have, and extends further right to a shared right edge. Left margin wide,
right margin narrow. This is deliberate. Design to a consistent left edge and a consistent
right edge, not to a centred axis.

### Do not include the left stage rail

The homepage has a fixed vertical rail on the left showing `LEAD → WON → IN PROGRESS →
IN REVIEW → COMPLETED`. That rail is the homepage's spine and belongs to the client-engagement
narrative. **It must not appear on this page.** Do not design around it or leave a gutter for it.

### Nav and footer

Already built, reused as-is. The nav collapses into a floating centred pill on scroll. Design
the page body only; show nav and footer as context.

## 5. Visuals — draw the real product, no illustrations

Every product visual on this site is a **schematic mockup of the real DocuFlow interface, drawn
with page elements** — hairline borders, mono labels, flat fills, small bars and chips. Not
photographs, not stock illustrations, not 3D dashboards floating in perspective.

**Do not use character illustrations** — no people, desks, plants, coffee cups. That register
was explicitly rejected for this site.

Keep mockups small and schematic. They illustrate, they are not screenshots.

## 6. Page structure

### 6.1 Hero

Eyebrow, mono: `PRODUCT`

**H1:**
> Four products, not four checkboxes.

**Sub:**
> Time tracking, activity monitoring, client projects and documentation — each one built to
> stand on its own, all of them filed against the same client record. Here is everything
> DocuFlow does.

CTAs: `Start free trial` (amber) · `Book a 15-minute demo` (white, `rule` border)

**Hero visual — the spec summary.** Not a dashboard. A compact four-column strip, one column
per pillar, each showing the pillar name and its capability count in mono. It sets the
datasheet register immediately and doubles as a promise of completeness.

### 6.2 Pillar jump bar

A horizontal row of four anchors — Time, Activity, Clients, Knowledge — that sticks below the
header as the reader scrolls, with the current pillar marked.

This is functional, not decorative: the page is long and a reader comparing products needs to
jump. Mono labels, 1px bottom rule, current item in `ink`.

Note: the site's sticky header is 64px and in-page anchors already account for it.

### 6.3 The four pillar sections

Same scaffold for each, alternating the visual left/right down the page (the homepage
component already does this — match it).

Each pillar has:

1. Mono eyebrow: `01 / TIME` … — numbering is legitimate here, this is an ordered specification
2. H2 — the depth claim
3. Short paragraph, max ~50 characters wide
4. **Capability list** — the real features, grouped
5. **Spec strip** — a mono row of hard numbers, `rule` borders between cells. This is the
   section's proof
6. Schematic mockup

Alternate the band backgrounds so no two adjacent sections share one: `paper` → `band-mint` →
`paper` → `band-warm`.

---

#### 01 / TIME

**H2:** Hours that already know what they were for.

**Body:** The timer runs against a task inside a client project, so a timesheet is a
by-product rather than a chore. It survives multiple browser tabs, pauses itself when the
screen goes idle, and exports clean enough for payroll.

**Capabilities:**
- Web timer — start, pause, resume, stop
- Time logged against a task inside a client project, never a free-text label
- Multi-tab safe: one tab is elected leader, the others follow — no double counting
- Automatic pause when the tab has been hidden past the idle threshold
- Timesheets and entry history, editable
- Attendance and presence
- Configurable expected hours per person per day
- Payroll-ready CSV export

**Spec strip:**
`60s heartbeat` · `3 min idle threshold` · `8h default day` · `CSV export`

**Mockup:** a running timer row — project · task · elapsed duration in mono · a pause control —
plus two or three timesheet lines below it.

---

#### 02 / ACTIVITY

**H2:** Evidence, and a score telling you how good it is.

**Body:** A desktop agent on Windows, macOS and Linux records screenshots, keyboard and mouse
activity and idle time in the background. It keeps working offline. And it grades its own
coverage, so you know when the record is thin instead of assuming it is complete.

**Capabilities:**
- Desktop agent for Windows, macOS and Linux
- Screenshots at randomised intervals, organisation-configurable
- Keyboard and mouse activity levels sampled in 60-second windows
- Idle detection with a configurable prompt and countdown
- Capture restricted to an active-hours window
- Offline-first: events queue locally and sync when the connection returns
- Device registry with remote revocation
- Screenshots are soft-deleted with a recorded reason — never silently erased
- **Evidence quality score, 0–100 per person**, graded strong / moderate / weak / insufficient
- Admin analytics: overview, activity, productivity, coverage, data quality, devices, alerts
- Screenshot review with a timezone selector
- CSV export

**Spec strip:**
`3–15 min capture` · `60s activity window` · `0–100 evidence score` · `3 platforms`

**Mockup:** a small grid of schematic capture thumbnails with an activity bar beneath, and an
evidence score chip showing a value and its grade.

> The evidence quality score is the most unusual thing in this pillar and no competitor
> publishes an equivalent. Give it visual weight — it deserves to be the element a skimming
> reader stops on. Important: it scores the *quality of the recorded evidence*, it never
> modifies tracked time. Do not let the design imply it grades the person.

---

#### 03 / CLIENTS

**H2:** A CRM that knows what the work cost.

**Body:** Clients, contacts, projects, stages, budgets, tasks and daily updates. Because the
hours live in the same place, budget consumed is a live number rather than a month-end
reconstruction.

**Capabilities:**
- Clients and contacts, with status and source
- Client projects with stages and a full stage-change history
- Kanban board across all projects
- Budgeted versus actual hours — consumption visible as it happens
- Tasks with open / in progress / done / archived
- Team assignment per project
- Coloured tags
- Notes with @mentions that notify the person named
- Audio notes, transcribed automatically
- Reminders with due dates, in-app and by email
- **Custom modules and fields — 12 field types**: text, number, date, datetime, select,
  multi-select, checkbox, textarea, email, phone, URL, currency
- Daily updates: one per person per project per day, with status and blockers, plus an admin
  KPI dashboard
- Project cloning

**Spec strip:**
`12 field types` · `5 project stages` · `1 update/person/day` · `full stage history`

**Mockup:** a client record — company name, stage chip, two or three contacts, a budget bar
showing percentage consumed, two tags.

---

#### 04 / KNOWLEDGE

**H2:** Ask your own company a question.

**Body:** A block editor inside the client project, company files in folders, and meeting
videos transcribed automatically. All of it indexed as it is written, so the assistant answers
with a source instead of a list of files.

**Capabilities:**
- Block editor with slash commands and nested pages
- Drag-and-drop page reordering, templates, page duplication
- Images, file attachments and audio recordings
- Video embeds — YouTube, Loom, Fathom
- **Automatic video transcription**, indexed so meetings become searchable
- Company documents in folders — PDF, Word and plain text extracted on upload
- Full-text search across everything
- **AI assistant over semantic search**, answering with cited sources
- Re-indexing skips unchanged content

**Spec strip:**
`~800-char chunks` · `1536-dim embeddings` · `3 video providers` · `PDF · Word · text`

**Mockup:** a question in a mono chip, a short answer beneath it, and two source chips in
`live-on-light` — one a document, one a call.

### 6.4 Platform section — band `ink`

The things that sit under all four pillars. Dark band, `ink`, to mark a change of altitude.

**Eyebrow:** `PLATFORM`
**H2:** Underneath all four.

Four to six compact cards on `ink-raised` with `ink-border`:

- **Roles and permissions** — admin and member roles, per-capability visibility
- **Teams** — grouping with owner / admin / member roles and expiring invite codes
- **Notifications** — mentions and system alerts, in-app and by email
- **Offline-first agent** — local queue, idempotent sync, no double-counted work
- **Device security** — device tokens stored only as hashes, revocable at any time
- **Claude Desktop integration** — an MCP server exposing 22 tools, so an AI assistant can
  query projects, documents, clients and time entries directly

> The MCP server is a real differentiator — no competitor in this category has one. Give it a
> full card, not a footnote.

### 6.5 What you won't find elsewhere

**H2:** The parts nobody else built.

Four or five items, each one sentence. This is the direct answer to "why not Hubstaff":

1. **An evidence quality score** — the monitoring data grades its own completeness
2. **Meetings that answer questions** — recorded calls are transcribed and indexed, so the
   assistant can answer from what was said
3. **A CRM you can reshape** — 12 custom field types, not a fixed schema
4. **An agent that survives the network** — work queues locally and reconciles without
   duplicates
5. **An MCP server** — query your operations from Claude Desktop

Treat this as the page's one moment of emphasis. Everything around it is a specification; this
is the argument.

### 6.6 Full capability table

The exhaustive list, grouped by the four pillars. This is both the diligence artifact and the
page's SEO payload.

Two columns — capability, and a short qualifier where one is useful. Group headers in mono
uppercase amber. 1px `rule` dividers, 12px row padding. Dense but readable.

Below it, a link: `Compare plans →` to `/pricing`.

### 6.7 Closing CTA

Amber band, centred, matching the homepage's final CTA.

**H2:** See it against your own client list.
CTAs: `Start free trial` (ink) · `Book a 15-minute demo` (white)

## 7. Copy rules

- Sentence case. Active voice. Short sentences.
- Name things the way a user experiences them — *screenshots*, not *capture pipeline*.
- **Banned words:** revolutionary, seamless, powerful, cutting-edge, unlock, supercharge,
  game-changing, robust, world-class.
- Being specific beats being clever. A number beats an adjective every time.

## 8. Honesty constraints — non-negotiable

DocuFlow has no external customers yet. It runs TECHMA's own operations.

- **No invented statistics.** No user counts, no "trusted by N teams", no percentages of
  improvement, no testimonials, no customer logos.
- **No compliance claims.** Do not write SOC 2, ISO 27001, HIPAA or GDPR-certified. The product
  supports transparent monitoring and a DPA exists; it holds no certification.
- **No integrations that don't exist.** Do not draw a logo wall of Slack, Jira, Salesforce and
  so on. The real external touchpoints are: Google Cloud Storage, OpenAI, Loom, Fathom,
  YouTube, and email delivery. Nothing else.
- **Every capability in §6 has been verified against the application's database schema and API.
  Do not add capabilities that are not on those lists.** If a section looks thin, make the
  layout better — do not pad it with features that don't exist.

In Canada, misleading representations fall under the Competition Act. This is a legal
constraint, not a stylistic preference.

## 9. Motion

The site uses GSAP with ScrollTrigger. Existing behaviours:

- The nav collapses into a floating pill on scroll
- Section content reveals on scroll with a hinged 15° `rotateX` settle, staggered — label,
  then text, then visual

Reuse the reveal for the pillar sections. **Do not invent new major animations for this page**
— the homepage's pinned scroll-driven sequence is its own signature moment and should not be
echoed here.

Non-negotiable: `prefers-reduced-motion` fully respected, no layout shift (only `opacity` and
`transform` animate), no horizontal scrollbar at any width.

## 10. Responsive

Design desktop first at 1440px, then specify 900px and 375px.

At 900px the two-column pillar sections stack — **heading always before its visual**, in every
section without exception. The jump bar becomes horizontally scrollable rather than wrapping.
The capability table must stay readable: either it scrolls inside its own container or it
reflows into stacked groups.

## 11. Deliverables

1. Full page, desktop
2. Mobile at 375px
3. The pillar section as a reusable pattern, since ten per-feature pages will follow
4. Spec strip, capability table row, and platform card as named components with their states

## 12. Quality floor

Responsive to 360px. Visible keyboard focus everywhere — the site uses a two-tone ring, 2px
amber outline with a 2px ink offset ring, because amber alone fails contrast on light bands.
AA contrast throughout. Reduced motion respected. Lighthouse ≥ 95, LCP < 2s, CLS 0.

## 13. Do not

- Do not include the left stage rail
- Do not reuse the homepage's four-tools fold animation
- Do not use character illustrations, stock imagery or 3D dashboards
- Do not introduce colours, radii or shadows outside the tokens above
- Do not use gradients
- Do not invent statistics, logos, testimonials or certifications
- Do not add capabilities beyond the verified lists in §6
- Do not centre the content column — the site's container is deliberately asymmetric
