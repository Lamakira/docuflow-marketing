# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: the owner or operations director of a **service business of 5 to 50 people** — digital
agencies, development studios, consulting firms, accounting and legal practices, staffing agencies,
BPO teams, construction.

Their situation: they bill clients hourly or by fixed fee and don't know precisely where their team's
time goes. They already pay four per-seat subscriptions that don't talk to each other. They are
pragmatic, skeptical of marketing language, and they compare prices. If the offer isn't clear in ten
seconds, they close the tab.

Two things are true of them that shape the work:

- They are **uncomfortable with the idea of "monitoring" their team.** This is a real objection to be
  answered on the page, not avoided. The Transparency section exists for this reason.
- They are evaluating, not using. This site is a purchase decision surface; the product itself lives
  in a separate repo (`../techma-documentation-platform`).

Secondary audience: buyers arriving from competitor comparison searches ("Time Doctor alternative"),
who are late in the buying cycle rather than in discovery.

## Product Purpose

DocuFlow is an all-in-one operations platform for service businesses, built and run by **TECHMA**. It
consolidates into one tool what these teams currently pay four vendors for:

1. **Time** — web timer, timesheets, attendance, payroll-ready exports
2. **Activity** — desktop agent (Windows / macOS / Linux) capturing screenshots, keyboard/mouse
   activity levels and idle time; analytics dashboards
3. **Work and clients** — CRM (companies, contacts, pipeline, budgets), projects, tasks, daily updates
4. **Knowledge** — Notion-style block documentation editor, company documents, automatic video
   transcription, an AI assistant answering by semantic search across that corpus

The product exists and runs in production. It is used daily by the team that sells it, and it replaced
Time Doctor for that team. (See Evidence on Hand — this is true, but its publishable form is not yet
approved.)

The site's job: convince the buyer that replacing a four-tool stack with one is credible, then get them
to start a trial. **Primary conversion: Start free trial.** One primary CTA, et un seul :
le « Book a 15-minute demo » secondaire est retiré des quatre héros faute de destination réelle
(#231 — voir « Les appels à l'action et l'application » dans AGENTS.md). Il revient le jour où
une page contact ou un outil de rendez-vous existe.

## Positioning

**Consolidation is the product.** DocuFlow has no flagship feature and must not be sold as one — the
grouping *is* the argument. A buyer paying for four tools has to understand within fifteen seconds that
they are replacing four, not buying a fifth stopwatch.

The mechanism a neighboring product cannot truthfully copy is structural, not rhetorical: in DocuFlow's
schema, `crmProjects` is the pivot table. Hours, tasks, screenshots, notes, reminders, members and
documentation all attach to it by `crmProjectId`. **The client project is literally what unifies the
four pillars** — files don't get filed against a client because someone tagged them, but because that's
where they were created.

Competitors (Time Doctor, Hubstaff, Toggl, Clockify, ActivTrak, Insightful) each cover one slice. The
comparison is honest and it is the highest-converting page family in the category.

Consequence for every surface: **one pillar, one section.** Time tracking is one pillar of four, never
the organizing spine. An earlier concept organized the homepage around the hours of a workday
(`08:12`, `09:40`…) and was rejected for exactly this reason — the metaphor made DocuFlow read as a
time tracker with extras. The correction is recorded in `docs/landing-corrections.md`, which supersedes
`docs/design-brief.md` on concept.

## Operating Context

The homepage is structured as a **client mandate**, following the product's real CRM stages:

```
LEAD  →  WON  →  IN PROGRESS  →  IN REVIEW  →  COMPLETED
```

This is not decoration — those are the actual stage values in the app. The vertical rail encodes true
information rather than ornamenting.

Real artifacts and vocabulary that belong to the product and are legitimate material for any surface:
CRM stages, companies, contacts and roles, project budgets with consumption, tags, reminders, timers
and timesheets, screenshot thumbnails, activity histograms, idle time, block-editor pages with nested
pages and templates, breadcrumbs, source-cited AI answers, payroll exports.

Fictional-but-approved sample data used across the site: **Northwind**, **Meridian**, **Kaleido**,
project **Ledger rebuild**, budget `$48,000`. These are consistent placeholders, not customer claims,
and they carry over between surfaces.

Evaluation context: desktop-first buyer research, but mobile rendering matters and has not yet been
visually verified. Structural reference is timedoctor.com; SEO playbook reference is agentiavocal.ca.

## Capabilities and Constraints

**Scope.** This repo is the public marketing site only — no application code, no database access.

**Stack.** Astro 7, static output. Tailwind 4 via `@tailwindcss/vite`, CSS-first config in
`src/styles/global.css`; there is deliberately **no `tailwind.config.js`**. `@astrojs/react` for
optional interactive islands, `@astrojs/sitemap` for SEO. Fonts self-hosted in `public/fonts` — **no
request to any third-party domain**, ever.

**Performance budget.** Lighthouse ≥ 95 on all four axes, LCP < 2 s, CLS ≈ 0. Reserved heights on any
zone whose content changes. Rail progress is written **directly to the DOM**, throttled in
`requestAnimationFrame` — never routed through framework state, which would re-render on every pixel.
One major animation per page (the stack fold); everything else is hover-level micro-interaction.
`prefers-reduced-motion` respected everywhere.

**Language.** All on-screen copy is **English**. French is phase 2: i18n routing structure goes in from
the start so FR can be added without a rewrite, but no FR content ships now. *(Confirmed 2026-07-22.)*
This decision structures all routing and cannot be retrofitted cleanly — any new page template must be
i18n-shaped.

**Pricing is a placeholder and must not be published as fact.** The $7 / $14 / $22 / Custom tiers in
`src/data/site.ts` (`PLANS`) are design-only values. The public site shows **"Beta pricing — subject to
change"** or routes to Contact us. *(Confirmed 2026-07-22.)* Rationale: Google caches old prices and a
prospect anchors on the first number they see.

**Copy is not ours to change.** Screen copy comes from the approved handoff; any modification goes back
through **Masdouk**. Same for concept-level changes.

**Voice.** Active voice, short sentences, sentence case. Banned: *revolutionary*, *seamless*,
*powerful*, *cutting-edge*, *unlock*, *supercharge*, *game-changing*.

**Open product decisions** (recorded, not invented):

- The **domain** is unresolved; `astro.config.mjs` currently uses `docuflow.ca` as a placeholder, which
  feeds canonicals, Open Graph and the sitemap.
- Whether city-level local pages ship at all (documented recommendation: no — duplicate-content risk
  for a B2B SaaS sold everywhere; spend the budget on comparison pages instead).
- Remaining page templates are unbuilt: product, sector, comparison, mega-menu, and `/pricing` (mockup
  exists at `docs/design-handoff/Pricing.dc.html`).

## Brand Commitments

- Product name **DocuFlow**; built and operated by **TECHMA**.
- Existing design tokens are **frozen by the brief and must not be renamed**: `ink` `#0F1524`,
  `paper` `#F3F5F7`, `hour` `#E9A23B`, `live` `#1F9D6B`, `slate` `#59657A`, `rule` `#D8DEE6`.
- Typefaces are committed: **Cabinet Grotesk** (display), **Switzer** (body), **JetBrains Mono** for
  every number, duration, price and badge — JetBrains Mono is already the product's own font.
- Form language: 4–8 px radii, 1 px rules rather than drop shadows, 1200 px max content width, flat
  section bands — **never a gradient**.
- Approval authority for copy and concept: **Masdouk**.

## Evidence on Hand

**There is no publishable proof today.** *(Confirmed 2026-07-22.)* DocuFlow has no external customers.

- `PROOF_STATS` in `src/data/site.ts` (184,200 hours · 2.6M screenshots · 11,400 documents · 1,340
  projects) are **invented placeholders and must not ship.** They are removed or replaced with real,
  sourced figures before any public launch. This is blocking.
- **No invented statistics, customer logos, testimonials or trust counts.** In Canada, misleading
  representations fall under the *Competition Act*; a prospect who discovers a fabricated number is
  lost permanently.
- Two facts are true and documented but **not yet approved for publication**: the team runs DocuFlow
  daily in production, and DocuFlow replaced Time Doctor for that team. Neither may be used as an
  on-page claim until Masdouk confirms the wording and, for the dogfooding claim, the start date.
- Competitor claims on any comparison page must be sourced from the competitor's **public pricing page,
  with the consultation date recorded.** A false comparison table is a disparagement complaint.

Real assets on hand: the validated HTML mockups in `docs/design-handoff/` (`Homepage.dc.html`,
`Pricing.dc.html`), self-hosted fonts, and the implemented homepage sections.

## Product Principles

1. **The grouping is the sale.** Every surface must make consolidation legible before it makes any
   single capability impressive. One pillar, one section — no pillar may take over the spine.
2. **The client project is the unifying object.** Structure follows the real data model
   (`crmProjects` as pivot), not a metaphor laid on top. Metaphors drift; the schema doesn't.
3. **Only claim what is verifiable.** No invented numbers, logos or customers — legal exposure and a
   permanently lost prospect are the same cost.
4. **Answer the monitoring objection, don't route around it.** The buyer's discomfort with surveillance
   is real; transparency is a selling position, not a disclaimer.
5. **Restraint is the house style.** One risk per page, 1 px rules over shadows, flat bands, no
   gradients — the content carries the page and the performance budget is part of the design.

## Accessibility & Inclusion

No formal standard has been set by the user yet. Established in the implementation and to be preserved:
global focus ring `2px solid #E9A23B`, `prefers-reduced-motion` honored on every animation, breakpoints
at 1240 / 900 / 560, reserved heights to hold CLS ≈ 0. Mobile rendering has breakpoints in place but
has **not been visually verified**.

Quebec/Canadian context is relevant (Law 25 page in the footer, *Competition Act* on claims), so a
WCAG 2.1 AA target is the sensible default — but it is not yet a confirmed requirement.
