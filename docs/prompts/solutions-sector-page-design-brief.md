# Design brief — DocuFlow sector page template

> **Paste this whole document into Claude Design.**
> Target route: `/solutions/[sector]`. All on-screen copy in English.
> Existing site: homepage, `/pricing` and `/product` are built and live.
> Companion: `docs/prompts/solutions-mega-menu-design-brief.md` covers the navigation menu.

---

## 1. What this is

DocuFlow is an all-in-one operations platform for service businesses. It replaces four separate
subscriptions: a time tracker, a monitoring tool, a CRM/project board, and a wiki.

This brief is for **one page design that will be used eight times**.

Eight sector pages are planned — digital agencies, development teams, consulting firms,
accountants, legal services, BPO teams, construction, staffing agencies. Later, six more for use
cases. They all share a structure but **not** their content.

**Design one page completely — Digital agencies, written out in full in §6 — and design it as a
template, so the other seven can be filled in without redrawing anything.**

## 2. Who reads it and what they are thinking

The owner or operations director of a 5–50 person agency. They arrived from a Google search like
"time tracking for agencies", or from the site's own navigation. They are further along than a
homepage visitor: they already believe consolidation is a good idea. What they don't believe yet
is that it was built for **them**.

They are scanning for two things, in this order:

1. **Recognition** — "these people understand how my business actually loses money"
2. **Specificity** — "this isn't a generic page with my industry's name pasted on"

The second point is the whole design problem. Eight pages that differ only by a headline read as
filler, and a reader who senses filler leaves. **The layout has to make room for genuinely
different content per sector, not decorate identical content.**

**Primary conversion:** Start free trial. **Secondary:** Book a 15-minute demo.

## 3. The organising idea

**A page that leads with their problem, not our product.**

The homepage sells consolidation. `/product` is a specification sheet. This page is neither: it
opens on a specific, recognisable, expensive problem — and only then shows the four things
DocuFlow does, **in the order that matters to this reader**.

That ordering is the key structural idea. On the agency page the client record leads, because
retainer burn is the pain. On the accountants page the timer leads, because switching between a
dozen small clients is the pain. **The template must not assume a fixed pillar order.**

Structural spine:

```
THEIR PROBLEM  →  WHAT CHANGES  →  A REAL DAY  →  THEIR OBJECTION  →  WHERE NEXT
```

## 4. Design system — follow exactly

The site exists. This page must look like it belongs to it.

### Colour tokens — use only these

| Token | Hex | Use |
|---|---|---|
| `ink` | `#0F1524` | dark bands, headings |
| `ink-raised` | `#161D30` | raised surface on dark |
| `ink-border` | `#2A3348` | borders on dark |
| `paper` | `#F3F5F7` | page background (cool white) |
| `hour` | `#E9A23B` | primary accent, CTAs |
| `hour-hover` | `#D8912F` | amber hover |
| `live` | `#1F9D6B` | fills only — gauges, dots, bars |
| `live-on-light` | `#187751` | green carrying text or a glyph (AA-safe) |
| `slate` | `#59657A` | body text |
| `slate-on-ink` | `#9AA6B8` | muted text on dark |
| `rule` | `#D8DEE6` | 1px borders and dividers |
| `band-mint` | `#EAF2ED` | tinted section band |
| `band-warm` | `#FBF3E6` | tinted section band |

**No other colour values. No gradients anywhere** — section bands are flat fills.

### Type

- **Cabinet Grotesk** — display, 700/800, letter-spacing `-0.03em`
- **Switzer** — body, 400/500/600
- **JetBrains Mono** — every number, duration, percentage, currency figure, badge and eyebrow

### Form

- Radii 4–8px only. Chips 3px.
- **1px `rule` borders instead of shadows.** The site has exactly one floating shadow and it
  belongs to the nav pill. Nothing on this page floats.
- Uppercase mono eyebrow labels, ~11–12px, letter-spacing `0.06em`
- Content max-width 1200px
- Breakpoints in use: 1240px, 901px, 620px, 561px, 360px

### Layout note — the container is asymmetric

The site does **not** use a centred 1200px column. Content starts at the left edge a centred
1200px column would have and extends further right to a shared right edge. Left margin wide,
right margin narrow. Deliberate. Design to a consistent left edge and a consistent right edge,
not to a centred axis. Centred blocks exist but are the exception (the closing CTA).

### Band rhythm — no two adjacent sections share a background

This is a hard rule on this site. The sequence for this page:

```
paper  →  white  →  paper  →  band-mint  →  band-warm  →  ink  →  white  →  paper  →  hour
Hero      Problem   Pillar1   Pillar2       Pillar3      Day     Objection  Next     CTA
```

### Do not include the left stage rail

The homepage has a fixed vertical rail showing `LEAD → WON → IN PROGRESS → IN REVIEW → COMPLETED`.
It narrates the homepage's client-engagement spine. **It must not appear here.** Do not design
around it or leave a gutter for it.

### Nav and footer

Already built. Show them as context only.

## 5. Visuals — draw the real product, no illustrations

Every product visual on this site is a **schematic mockup of the real DocuFlow interface, drawn
with page elements** — hairline borders, mono labels, flat fills, small bars and chips. Small and
diagrammatic, not screenshots.

**No character illustrations** — no people, desks, plants, coffee cups. That register was
explicitly rejected for this site. No stock photography. No 3D dashboards in perspective.

---

## 6. The worked page — Digital agencies

Design this one completely. Copy below is final unless noted.

### 6.1 Hero — band `paper`

Eyebrow, mono: `AGENCY`

**H1:**
> See the retainer burn while you can still do something about it.

**Lede:**
> Contacts, budget, hours, tasks and documents all sit on the same client project — so budget
> consumed is a live number, not a month-end reconstruction. When a retainer starts running hot,
> you find out in week two.

CTAs: `Start free trial` (amber) · `Book a 15-minute demo` (white with `rule` border)

Fine print, mono: `No credit card. Desktop app for Windows, macOS and Linux.`

**Hero visual — the budget meter.** A compact client-project card: client name, an amber stage
chip, a budget figure in mono, and a consumption meter well past halfway with the percentage in
mono beside it. Below it, one line: `Day 11 of 30`.

That juxtaposition — 62% spent, day 11 — *is* the argument. It should be readable in two seconds
without any supporting text.

### 6.2 The problem — band `white`

Mono eyebrow: `THE PROBLEM`

**H2:**
> The retainer is fixed. The scope isn't.

Three pain points, mono-numbered `01` `02` `03`, each a bold line plus two sentences:

**01 — Work expands in small favours nobody logs.**
A quick extra round, a deck that wasn't in the statement of work, a call that ran long. None of
it is worth arguing about on its own. Together they are the margin.

**02 — The tracker knows the hours. It doesn't know the client.**
Thirty-eight hours were logged last week. Which account they belonged to, and which of them were
in scope, lives in someone's head or in a different tool.

**03 — Profitability is something you reconstruct.**
Two exports, a spreadsheet, an afternoon of reconciliation, and a number that is already three
weeks old by the time anyone acts on it.

Layout: three columns above 901px, stacked below. Separated by 1px `rule`, not boxed in cards.

### 6.3 What changes — three pillar sections

Same scaffold each time, alternating the visual left/right down the page. Each has: mono eyebrow
with a running index, H2, short paragraph (max ~50 characters wide), a short capability list, and
a schematic mockup.

**Note the order.** For agencies the client record leads and the timer follows. This is the part
of the template that changes per sector — see §7.

---

#### `01 / THE CLIENT` — band `paper`, visual right

**H2:** Budget consumed, as it is consumed.

**Body:** Every hour, task, screenshot and document files itself against the client project it
was created in. Budget spent stops being a monthly calculation and becomes a number on the
record.

**Capabilities:**
- Clients, contacts, stages and a full stage history
- Budgeted versus actual hours, live
- Tags, notes with @mentions, reminders with due dates
- Custom fields — 12 types, so your account structure fits

**Mockup:** the client dossier — company name, stage chip, three contacts with initials avatars,
a budget bar at 62%, two tag chips.

---

#### `02 / THE HOURS` — band `band-mint`, visual left

**H2:** Hours that arrive already attributed.

**Body:** The timer runs against a task inside a client project, so nobody writes a timesheet
from memory on Friday afternoon. It survives multiple browser tabs and pauses itself when the
screen goes idle.

**Capabilities:**
- Web timer against a task, never a free-text label
- Multi-tab safe — one tab leads, the others follow, no double counting
- Automatic pause past the idle threshold
- Timesheets and entry history, editable
- Payroll-ready CSV export

**Spec strip** (mono, 1px `rule` between cells):
`60s heartbeat` · `3 min idle threshold` · `8h default day` · `CSV export`

**Mockup:** a running timer row — client · project · task, elapsed duration in mono — with two
or three timesheet lines beneath.

---

#### `03 / THE PAPER TRAIL` — band `band-warm`, visual right

**H2:** The statement of work, where the work is.

**Body:** Briefs, scopes and meeting notes live inside the client project, and recorded calls are
transcribed as they happen. When a client asks whether something was in scope, the answer has a
source.

**Capabilities:**
- Block editor inside the client project — nested pages, templates
- Video embeds transcribed automatically
- AI assistant answering with cited sources
- Full-text search across everything

**Mockup:** the AI answer card — a question in a mono chip, a short answer, two source chips
outlined in `live-on-light` (one a document, one a call).

### 6.4 A real day — band `ink`

Mono eyebrow, amber: `DAY 11`

**H2:** How it actually goes.

A short narrative, `slate-on-ink`, with the figures in mono and white. Two columns above 901px:
prose left, a small schematic right.

> Northwind is on a $48,000 retainer. On the 11th the budget meter reads **62%**, which is high
> for the date — so you open the record before the standup instead of after the invoice.
>
> The hours are already attributed: **38.5 h** on the Ledger rebuild, **21 h** on client calls.
> The call time is the anomaly. Two of those calls have transcripts, and both are about a
> reporting module that isn't in the statement of work.
>
> That is a scope conversation you can have on the 11th, with the document open — not a write-off
> you absorb on the 30th.

This is the section a reader forwards to a partner. Give it room.

### 6.5 The objection — band `white`

Mono eyebrow, green: `TRANSPARENCY`

**H2:** Your team will ask what's being recorded.

**Body:** So tell them, and let them check. DocuFlow shows a visible indicator whenever the timer
is running, screenshots can be blurred so content is never legible, capture can be limited to
working hours, and anyone can open and review their own data.

Then a second paragraph, and this one is the sector-specific argument:

> Used this way, the record protects the team as much as the account. Evidence that a request was
> out of scope is what lets you bill for it — instead of absorbing it as an unpaid evening.

Four guarantee rows, each a green check on a `paper` inset:
- A visible indicator shows the team exactly when the timer is running
- Screenshots can be blurred so content is never legible
- Capture is scheduled to working hours only
- Anyone can open and review their own recorded data

> **Note for the designer:** for agencies, monitoring is the touchiest part of the product, which
> is why it is handled here as an objection rather than as a pillar section. Other sectors will
> promote it to a pillar — the accountants and BPO pages lead with it. The template must allow a
> pillar block and this objection block to swap emphasis.

### 6.6 Where next — band `paper`

Mono eyebrow: `ALSO FOR`

Three sibling sector cards — Consulting firms, Development teams, Staffing agencies — each with
its name, mono tag chip and one line. Then two text links with amber arrows:
`See everything the product does →` and `Compare plans →`.

### 6.7 Closing CTA — band `hour`, centred

**H2:** Start with your next retainer.

CTAs: `Start free trial` (ink) · `Book a 15-minute demo` (white)

---

## 7. What varies per sector — design for this

The other seven pages reuse every component above, but these seven things change. **Design the
template so each can flex without the layout breaking.**

| # | What changes | Range it must absorb |
|---|---|---|
| 1 | H1 and lede | Different length; assume up to 15 words on the H1 |
| 2 | The three pain points | Entirely different copy; assume some run to three sentences |
| 3 | **The pillar order** | The client record leads for agencies; the timer leads for accountants; activity and its evidence score lead for consulting and BPO |
| 4 | **How many pillar blocks** | Three or four. The template must not break at either count |
| 5 | The hero visual | Budget meter for agencies; a timer for accountants; an evidence score card for consulting |
| 6 | The objection | Different per sector; for legal it is privilege, the strongest on the site |
| 7 | Whether monitoring is a pillar or an objection | Agencies: objection. Accountants, BPO: pillar |

The eight sectors and their leading pillar, for reference:

| Sector | Tag | Leads with |
|---|---|---|
| Digital agencies | `agency` | The client record |
| Development teams | `software` | Hours against a task |
| Consulting firms | `advisory` | Activity — the evidence score |
| Accountants | `finance` | The timer — switching cost |
| Legal services | `legal` | Hours + the matter file |
| BPO teams | `outsourcing` | Activity — coverage |
| Construction | `field` | ⚠️ under review, see §9 |
| Staffing agencies | `placement` | ⚠️ under review, see §9 |

## 8. Copy rules

- Sentence case. Active voice. Short sentences.
- Use the sector's own vocabulary — for agencies: retainer, scope, deliverable, account, burn.
- Name things the way a user experiences them — *screenshots*, not *capture pipeline*.
- **Banned:** revolutionary, seamless, powerful, cutting-edge, unlock, supercharge,
  game-changing, robust, world-class.
- A number beats an adjective, every time.

## 9. Honesty constraints — non-negotiable

DocuFlow has no external customers yet. It runs TECHMA's own operations.

- **No invented statistics.** No user counts, no "trusted by N agencies", no percentages of
  improvement, **no testimonials, no customer logos, no case studies**. This page type invites
  all of them — do not add a single one.
- **No compliance claims.** No SOC 2, ISO 27001, HIPAA or GDPR-certified badges.
- **No integrations that don't exist.** No logo wall. The real external touchpoints are Google
  Cloud Storage, OpenAI, Loom, Fathom, YouTube and email delivery. Nothing else.
- Every capability named in §6 has been verified against the application's database schema and
  API. **Do not add capabilities beyond those lists.** If a section looks thin, improve the
  layout — do not pad it.

⚠️ **Two sectors are under review** and are not to be designed as worked examples. DocuFlow is a
desktop agent plus a web app. Construction site workers have no desktop, and staffing agencies
place contractors on the *client's* hardware where an agent often cannot be installed. Both pages
may end up narrowed or dropped. Design the template so it works with three pillar blocks and no
monitoring section at all.

In Canada, misleading representations fall under the Competition Act. This is a legal constraint,
not a stylistic preference.

## 10. Motion

The site uses GSAP with ScrollTrigger. Sections reveal on scroll with a hinged 15° `rotateX`
settle, staggered — eyebrow, then text, then visual. Reuse that; do not invent new motion for
this page.

Non-negotiable: `prefers-reduced-motion` fully respected — **no animation at all**, not a
shortened one. No layout shift; only `opacity` and `transform` animate. No horizontal scrollbar
at any width.

## 11. Responsive

Design at 1440px, then specify 901px and 375px.

At 901px the two-column pillar sections stack — **heading always before its visual**, in every
section without exception. The three pain points stack. The `DAY 11` narrative goes single
column. Check the mono figures in the narrative at 375px; they are the most likely thing to wrap
badly.

## 12. Deliverables

1. The full Digital agencies page at 1440px
2. The same page at 375px
3. **A second hero, for Accountants** — same template, different leading pillar and different
   hero visual (a timer rather than a budget meter). This is what proves the template flexes
   rather than just fits one case.
4. A component sheet: pain-point item, pillar section, spec strip, day-narrative block, guarantee
   row, sibling sector card — each with its rest, hover and focus states

## 13. Quality floor

Responsive to 360px. Visible keyboard focus everywhere — the site uses a two-tone ring, a 2px
amber outline plus a 2px ink ring filling the offset gap, because amber alone fails contrast on
light bands. AA contrast throughout. Reduced motion respected. Lighthouse ≥ 95, LCP < 2s, CLS 0.

## 14. Do not

- Do not include the left stage rail
- Do not assume a fixed pillar order — it changes per sector
- Do not assume exactly three pillar blocks — three or four
- Do not use character illustrations, stock imagery or 3D dashboards
- Do not introduce colours, radii or shadows outside the tokens above
- Do not use gradients
- Do not add testimonials, logos, case studies or statistics
- Do not add capabilities beyond the verified lists in §6
- Do not centre the content column — the site's container is deliberately asymmetric
- Do not let two adjacent sections share a background
