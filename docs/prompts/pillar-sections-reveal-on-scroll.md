# Pillar sections: drape reveal on scroll

> Prompt for the implementing agent. Repo: `docuflow-marketing`.
> Component: `src/components/PillarSection.astro` — shared by `ClientRecord`, `Hours`,
> `Documentation` and `AiAnswer`.

---

## The motion I want

Not a fade-up. Not elements snapping into place.

Picture holding a cloth by its top edge, standing upright, perpendicular to the table it will
land on. You let go. It pivots down, falls, touches, settles. It does not slap flat — it lands
and comes to rest. And it does not land all at once: the near edge touches first and the rest
follows a beat later.

That is the effect. In technical terms it is a **hinge reveal with a damped settle and
follow-through** — three ingredients that have to be present together:

| Ingredient | What it does |
|---|---|
| **Hinge** | The element pivots on `rotateX` around its top edge, from tilted to flat |
| **Damped settle** | It overshoots very slightly, then comes to rest. This is what separates *settling* from *snapping* |
| **Follow-through** | The three elements arrive in sequence, not together. This is what makes it read as cloth rather than a board |

The follow-through matters most. Uniform arrival kills the whole thing.

## Use GSAP

GSAP and ScrollTrigger are already loaded on the homepage by `StackFold.astro`, so importing
them here costs no additional bytes. `AGENTS.md` has been updated — the previous restriction on
importing GSAP outside `StackFold` no longer applies to the homepage.

GSAP is the right tool here for three specific reasons:

- **The settle.** A CSS `cubic-bezier` can overshoot once but cannot produce a damped
  oscillation. `back.out` gives the settle directly, and `CustomEase` is available (free, needs
  registering) if the curve needs shaping.
- **The follow-through.** `stagger` handles the cascade in one property.
- **The failure mode inverts itself.** Set the initial hidden state with `gsap.set()`, never in
  a static CSS rule. If GSAP fails to load, no hidden state is ever applied and the content
  simply renders. This must be the approach — see the constraint below.

## Specification

### Values

- **Hinge:** `rotateX` from `15deg` to `0`, `transform-origin: top center`
- **Fall:** `y` from `12px` to `0`, animated together with the rotation
- **Fade:** `opacity` from `0` to `1`
- **Perspective:** roughly `1200px`, set on the **container**, not on each element — a shared
  vanishing point is what makes the three parts read as one surface rather than three
  independent objects
- **Duration:** ~700ms
- **Ease:** `back.out` with modest overshoot (start around `1.2` and tune by eye). The
  overshoot should be felt, not seen — if you can clearly watch it bounce, it is too strong
- **Stagger:** ~90ms between elements

### Order

Three targets, in this order:

1. Stage label (`IN PROGRESS — the hours`)
2. Text column (heading + paragraph)
3. Visual column

The stage label always leads. It is the page's spine marker — the signal that a new stage of
the engagement has begun — so it should land before its content.

### Reversibility — full, in both directions

The reveal reverses when scrolled away from and replays when scrolled back to, at both the top
and bottom edges of the trigger.

Use ScrollTrigger `toggleActions` set to `"play reverse play reverse"`.

**Do not use `scrub`.** Binding progress directly to scroll position would override the easing,
and the damped settle — the entire point of this effect — would be replaced by whatever speed
the user happens to be scrolling at. `toggleActions` keeps the animation playing at its own
designed pace while still responding to scroll direction.

Trigger boundaries: start when the section top reaches roughly 80% of the viewport height, end
when its bottom passes roughly 20%. That keeps the section settled for most of its time on
screen, with reversal only at the extremes.

### Make the reversal one line to undo

This is being tried deliberately, and it may prove to be too much — reversing at the top edge
means content fades out as it exits upward, which some readers find distracting.

Put the `toggleActions` string in a single named constant at the top of the script, with a
comment giving the fire-once alternative (`"play none none none"`). Switching between the two
behaviours must be a one-line edit, not a rewrite.

## Constraints

### Content must never depend on JavaScript to be visible

Apply the initial hidden state with `gsap.set()` inside the script — never as a static CSS
rule. If the script fails, is blocked, or errors, nothing is ever hidden and all four sections
render normally.

Verify by disabling JavaScript in devtools and reloading. All four sections must be fully
readable.

### Reduced motion

Handle this through `gsap.matchMedia()`, matching the pattern already used in `StackFold.astro`.
Under `prefers-reduced-motion: reduce`, no animation at all and no hidden state — content is
present and final from the start. Do not merely shorten the duration.

### No layout shift

Only `opacity` and `transform` may animate. Both are composited and neither affects layout, so
CLS stays at 0.

### Text sharpness through the rotation

Text rendered mid-rotation in 3D can lose subpixel antialiasing and look soft. At 15° this
should be marginal, but check it on the headings, which are the largest type on the page. If
softness is visible, `will-change: transform` and `backface-visibility: hidden` on the animated
wrappers are the usual mitigations — and remove `will-change` once the animation settles rather
than leaving it permanently on.

### No horizontal overflow

The rotation is on the X axis so it should not push content sideways, but `container-wide`
already runs close to the right edge. Verify at several widths. If a scrollbar appears, use
`overflow-x: clip` on the section — **not** `overflow: hidden`, which creates a scroll container
and would break the sticky header. The hero already uses `clip` for this reason.

## Acceptance criteria

- [ ] The three parts arrive in sequence — label, text, visual — never together
- [ ] The motion reads as pivoting and settling, not sliding or fading
- [ ] The overshoot is felt but not conspicuous
- [ ] The reveal reverses and replays in both scroll directions
- [ ] Switching to fire-once is a single-line edit
- [ ] With JavaScript disabled, all four sections are fully visible and readable
- [ ] Under `prefers-reduced-motion`, content is final and static, with no hidden state
- [ ] CLS remains 0
- [ ] Headings stay legible throughout the rotation
- [ ] No horizontal scrollbar at any width
- [ ] Checked at 1440px, 900px and 375px

## Do not

- Do not use `scrub` — it destroys the settle
- Do not put the hidden state in a static CSS rule
- Do not animate anything other than `opacity` and `transform`
- Do not let the three elements arrive simultaneously
- Do not exceed 15° of rotation or 12px of translate
- Do not use `overflow: hidden` to contain the transform
