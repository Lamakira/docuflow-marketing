# Header collapses into a floating pill on scroll

> Prompt for the implementing agent. Repo: `docuflow-marketing`.
> Component: `src/components/Nav.astro`, consumed by `src/layouts/Layout.astro`.

---

## What I want

The header has two states and switches between them based on scroll position.

**State A — at the top of the page.** The current header, unchanged: full-width bar, DocuFlow logo on the left, the four nav links, "Sign in" and the "Start free trial" button on the right, 1px bottom rule.

**State B — as soon as you scroll down.** The header collapses into a **centered floating pill**, detached from the top edge of the screen, containing only the four main links: Product, Solutions, Pricing, Resources.

Scroll all the way back to the top and it returns to its original form.

## The look I'm after

Reference: a compact floating toolbar, the kind you see in modern editors.

- **Shape**: fully rounded ends (`9999px` radius) — a pill, not a rounded rectangle
- **Height**: compact, around 44px
- **Width**: driven by its content and horizontally centered — not full width
- **Fill**: `paper` at high opacity with `backdrop-blur`, so content is visibly moving behind it without hurting legibility
- **Border**: 1px `rule`
- **Shadow**: soft and low — just enough to lift the pill off the content, never a heavy drop shadow
- **Detachment**: a visible gap between the top of the screen and the pill, roughly 10–12px. That gap is what sells the floating effect.
- **Links**: `slate` at rest, `ink` on hover, same sizes and weights as today, generous horizontal spacing between items

The rest of the band the header occupies becomes **transparent** in state B. Only the pill is visible.

### If a reference screenshot is attached

Read it for **proportion and weight only** — the ratio of horizontal padding to height, the spacing between items, how heavy the shadow reads.

Ignore everything else about it. It comes from an unrelated product, so its labels, icons, dropdown chevrons, separator, status dot and colours are not part of this design. Our pill contains four plain text links and nothing else, and every colour comes from the tokens listed below.

## Specification

### Trigger

Use a **sentinel element** the height of the header (64px), placed at the very top of the page, watched by an `IntersectionObserver`.

- Sentinel in view → state A
- Sentinel out of view → state B

Do not attach a scroll listener that reads position every frame. The sentinel gives the right behaviour, costs nothing, and naturally avoids flicker when the user hovers around the threshold.

The return to state A happens **only when you're back at the very top**, not on the first upward gesture.

### Layout stability — critical

**Switching states must not shift page content in either direction (CLS = 0).**

To guarantee that: do not morph the `<header>` element itself. It keeps its fixed 64px height and `sticky top-0` positioning in both states. **The inner container is what transforms** — from full-width bar to a pill centered vertically within those 64px.

A 44px pill centered in 64px leaves 10px above and below, which produces exactly the detachment described above without ever touching document flow.

### The transition

Animate: `max-width`, `border-radius`, `background-color`, `border-color`, `box-shadow`, and the opacity of the departing elements.

- Duration: 260–320ms
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)`
- Departing elements (logo, "Sign in", CTA button) must fade **and** stop occupying width — otherwise the pill can't contract

Do not use GSAP for this. It's a two-state toggle; CSS transitions are simpler and more robust here. GSAP is reserved for scroll-driven sequences.

### Accessibility

- **Do not remove the hidden elements from the DOM.** If keyboard focus is inside the header when the switch happens, focus would be lost and thrown back to the start of the document.
- Hide them visually, then take them out of the tab order with the `inert` attribute on their wrapper. `inert` handles focus and screen-reader exposure in one go — cleaner than combining `tabindex="-1"` and `aria-hidden`.
- Link contrast must stay AA-compliant against the pill's translucent fill. Check it against real content scrolling behind, not just against flat `paper`.
- The focus ring (`2px solid #E9A23B`) must stay legible on the pill, including on the end items where the rounded radius can clip it.
- In-page anchors need a `scroll-margin-top` at least equal to the header height, or headings will land hidden behind the pill.

### Reduced motion

Under `prefers-reduced-motion: reduce`, keep the switch working — it's a meaningful state change, not decoration — but **with no transition**: snap between states.

### Mobile

Below 561px the nav links are already hidden in the current implementation. Decide this explicitly rather than letting it fall out by accident:

- either the pill carries only the logo and a menu trigger,
- or the header keeps its current form and the morph is disabled below that breakpoint.

Do not ship an empty pill or one that overflows the viewport.

### Stacking

The header is `z-30`, the stage rail is `z-20`. The pill must stay above the rail and all content. Verify that no `backdrop-blur` creates a stacking context that breaks that order.

## Decisions to settle before writing code

These three change the outcome. They're mine to make, not the agent's — but the agent should raise them rather than pick silently.

**1. Does "Start free trial" really disappear?**
My original ask said "only the main links". But it's the only persistent call to action on the page, and conversion is the site's only goal. Removing it the moment the user scrolls means removing the path to signup at exactly the point they're getting interested.
*Recommendation: keep a compact version of the CTA at the right end of the pill.* Failing that, confirm the in-page CTAs are enough.

**2. Does the logo disappear?**
Without it we lose both the way home and brand presence for the whole scroll.
*Recommendation: keep a compact mark at the left of the pill.*

**3. Reappear on scroll-up, or only at the very top?**
I asked for "only at the very top". That's coherent, but many sites restore the full header as soon as you scroll up, which makes navigation easier on a long page.
*To confirm: we're keeping "only at the very top".*

## Acceptance criteria

- [ ] No content shift on switching, in either direction (CLS = 0)
- [ ] Transition is smooth both ways, with no flicker when hovering around the threshold
- [ ] The pill is visibly detached from the top edge, with a clear gap above it
- [ ] Page content is visibly moving behind the pill
- [ ] Keyboard tabbing never lands on a hidden element
- [ ] Focus is never lost at the moment of the switch
- [ ] State A returns only at the very top of the page
- [ ] Under `prefers-reduced-motion`, the switch is instant and still functional
- [ ] Mobile behaviour is explicit — no empty or overflowing pill
- [ ] In-page anchors never park headings under the pill
- [ ] No new colour tokens: only `ink`, `paper`, `hour`, `live`, `slate`, `rule`

## Do not

- Do not add GSAP or any animation library for this
- Do not listen to the `scroll` event to read position every frame
- Do not remove hidden elements from the DOM
- Do not animate `height`, `top` or `padding` on the `<header>` — that's where layout shift comes from
- Do not introduce new colour, radius or shadow values outside the existing tokens
- **Do not mix Tailwind transform utilities with a hand-written `transform` property on the same element.** Tailwind 4 emits the standalone `translate` property, which **composes** with `transform` instead of replacing it. This exact trap already produced an off-centre bug in `StackFold.astro` — don't reproduce it here.
