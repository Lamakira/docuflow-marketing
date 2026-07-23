# Stack-fold section: scroll-driven, centred, readable

> Prompt for the implementing agent. Repo: `docuflow-marketing`.
> Component: `src/components/sections/StackFold.astro`.

---

## Why this section matters

This is the emotional peak of the landing page. Four separate subscriptions collapse into one, and the visitor understands the entire sales argument — *replace four tools with one, $38 becomes $14* — without reading a word.

Everything below serves one goal: **give the visitor time to understand the comparison, and let them feel in control of the moment.**

## Problem 1 — No time to read, and no control

### What's wrong today

The animation is triggered by an `IntersectionObserver` at `threshold: 0.45` on a 300px container, then plays a fixed ~1.5s CSS transition on wall-clock time.

Two consequences:

- **It fires too early.** At 45% of a 300px box, only ~135px of the section is on screen. The cards start converging while they're still crossing the bottom edge of the viewport. The first card has no delay at all — it moves immediately.
- **It ignores the user.** Once triggered, it runs its 1.5s regardless of scroll speed, direction, or whether the user has stopped. You cannot pause it, slow it, or replay it.

This is the wrong model, not a mistuned parameter.

### What I want

**Scroll-driven (scrubbed) animation with the section pinned.** Progress is bound to scroll position, not to elapsed time.

- The section pins when it reaches the centre of the viewport
- Continued scrolling drives the animation from 0% to 100%
- Scrolling back up reverses it — this reversibility is what produces the sense of control
- The section unpins and the page resumes

### Timeline

Normalised progress over the scrubbed distance. The two holds are the point of the whole thing — do not shorten them.

| Progress | What happens |
|---|---|
| `0.00 → 0.30` | **Reading hold.** All four cards static and fully legible. Caption reads "Your stack — $38 /user/mo". Nothing moves. |
| `0.30 → 0.70` | Cards converge toward centre, slightly staggered, tilting and scaling down as they fade out |
| `0.55 → 0.80` | DocuFlow card rises and fades in, overlapping the tail of the convergence |
| `0.70 → 0.85` | Caption cross-fades to "One tool — $14 /user/mo" |
| `0.85 → 1.00` | **Resolution hold.** End state held so the answer registers before the section releases. |

The first hold fixes "I don't have time to read the cards". The second stops the payoff from being scrolled past the instant it appears.

### Scrub feel

Use a small numeric scrub value (around `0.5`) rather than a rigid 1:1 binding. The slight easing lag reads as smooth and deliberate; a hard 1:1 feels mechanical and amplifies trackpad jitter.

### Pin distance

Map the animation to roughly **1.2× viewport height** of scrolling. Express it relative to viewport height, never as a fixed pixel value — a fixed value behaves completely differently on a laptop and on a tall monitor.

Too short and it feels rushed; too long and the visitor feels stuck and starts fighting the page.

### Pinning constraints

- Pin spacing must be enabled so the page doesn't jump when the section pins and releases
- The pinned section must sit below the sticky header in stacking order — check it against the floating pill state, which is `z-30`
- The stage rail on the left is `position: fixed` and derives progress from document scroll height. Pinning changes that height. Verify the rail still tracks correctly, and accept that it advances while the section is pinned — that is correct behaviour, not a bug
- Recompute measurements on resize and after the self-hosted fonts load, since font swap changes card widths. Use ScrollTrigger's invalidate-on-refresh so positions are recalculated rather than cached from first paint

### Reduced motion

Under `prefers-reduced-motion: reduce`: **no pin, no scrub, no animation.**

But do not simply jump to the end state — that is what the current code does, and it silently destroys the argument. These users must still see the comparison: the four cards with their prices, the $38 total, and the DocuFlow card at $14, all laid out statically and simultaneously.

**The animation embellishes the argument. It must never be the only thing carrying it.**

### Use GSAP's matchMedia

Handle the responsive and reduced-motion branches through `gsap.matchMedia()` rather than hand-rolled media query listeners. It scopes each context and cleans up its own triggers when a query stops matching — which is exactly where hand-rolled versions leak and start misbehaving after a resize.

Suggested contexts:

- `(min-width: 901px) and (prefers-reduced-motion: no-preference)` → full pinned scrub
- everything else → static layout, no pin, no ScrollTrigger

## Problem 2 — The DocuFlow card sits left of centre

### Root cause

The card carries two horizontal offsets that **add up instead of replacing each other**:

- the Tailwind class `-translate-x-1/2` (line 39)
- and in the stylesheet, `transform: translate(-50%, …)` (lines 69 and 95)

**Tailwind 4 no longer uses `transform` for these utilities — it emits the standalone `translate` property.** Per spec, `translate` is applied first and `transform` composes on top of it. They do not override one another.

So the card shifts back by 50% of its width, then by another 50%. That's 100% instead of 50% — 300px instead of 150px — landing it exactly 150px left of centre.

### What to do

Remove the Tailwind transform utility. **One system owns `transform` on this element, and once GSAP is in play, that system is GSAP.**

This applies to every element GSAP animates in this section. No Tailwind transform utilities on any of them — the conflict is silent and will resurface.

### While you're there

The convergence target itself is correct and should not be changed: the cards gather at `left: 39%` and are `22%` wide, so their centres land at 50%. Only the result card is mispositioned.

## Problem 3 — The section has three competing axes

Today the heading and paragraph are left-aligned, the cards span the full container, the result card is centred, and the caption is centred. Four elements, three different alignments.

### What I want

**Centre the whole section** — heading, paragraph, card cluster, caption.

Two reasons. This is the moment the page asks the visitor to stop and watch, and centring signals exactly that. And the page already has this mode: the final CTA is centred, so "centred = moment" is an established convention here rather than a one-off.

### One caveat

The paragraph is currently constrained to `62ch`. Centred text at that measure is hard to read — the eye struggles to find the start of each line. **Tighten it to around `48–50ch` when centring**, and keep it centred with `mx-auto`.

## Additional — not in my original list, but it belongs here

**On mobile, this section currently deletes its own argument.**

Below 900px the four cards are set to `display: none` (line 109-111). Phone visitors see only the DocuFlow card and "One tool — $14". They never see the four tools. They never see the $38. The heading promises "your stack has four logins" and nothing below it shows four of anything.

The comparison is invisible on the device that carries most of the traffic.

Since this work already forces a decision about mobile behaviour, fix it here: build a **vertical static comparison** for narrow viewports — the four cards stacked with their prices, the $38 total, then the DocuFlow card at $14. Animated or not, it must be present and legible.

## GSAP adoption notes

- GSAP has been fully free since 2025, ScrollTrigger included. No licence step required.
- Register the plugin explicitly before use; ScrollTrigger is not registered by default.
- The code must run client-side only. In an Astro component, a plain `<script>` tag is bundled and executed in the browser — that's the right place. It must not run during SSR.
- Keep the import local to this component so GSAP isn't shipped on pages that don't animate.
- If the site later adopts Astro's client router or view transitions, triggers must be killed and rebuilt on navigation, or they will accumulate and leak. Leave a comment marking that dependency.

## Acceptance criteria

- [ ] The four cards stay completely still and legible for the first third of the scrubbed distance
- [ ] Scrolling up reverses the animation smoothly at any point
- [ ] Stopping mid-scroll leaves the animation frozen mid-state, with no drift
- [ ] The end state is held before the section releases — the payoff is never scrolled past instantly
- [ ] The DocuFlow card is exactly horizontally centred, verified in devtools and not by eye
- [ ] Heading, paragraph, cards and caption share one centred axis
- [ ] The centred paragraph measures roughly 48–50ch
- [ ] No layout jump when the section pins or unpins
- [ ] Under reduced motion, the full comparison is visible and static — four cards, $38, and $14
- [ ] Below 900px, the four tools and the $38 total are visible
- [ ] Behaviour survives a window resize and a font swap without stale positions
- [ ] No new colour, radius or shadow values outside the existing tokens

## Do not

- Do not keep the `IntersectionObserver` one-shot trigger — it is being replaced, not tuned
- Do not use a fixed pixel value for the pin distance
- Do not mix Tailwind transform utilities with GSAP-controlled transforms on the same element
- Do not let reduced motion or mobile collapse to the end state alone — the comparison must survive
- Do not pin on touch viewports; hijacking scroll on a phone is worse than showing a static layout
- Do not ship GSAP globally if this section is its only consumer
