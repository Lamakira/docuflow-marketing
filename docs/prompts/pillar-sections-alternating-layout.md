# Pillar sections: alternate the side of the visual

> Prompt for the implementing agent. Repo: `docuflow-marketing`.
> Components: `src/components/PillarSection.astro` and the four sections that use it.

---

## What I want

The four pillar sections currently put the visual on the right in three cases out of four, which reads as a stack rather than a rhythm. I want the visual to **alternate sides** as you scroll down.

| Order | Section | Component | Visual |
|---|---|---|---|
| 1 | `WON — the client` | `ClientRecord.astro` | left |
| 2 | `IN PROGRESS — the hours` | `Hours.astro` | right |
| 3 | `IN PROGRESS — the documentation` | `Documentation.astro` | **left** |
| 4 | `IN REVIEW — the answer` | `AiAnswer.astro` | right |

In practice only section 3 changes today — it currently sits visual-right. Sections 1, 2 and 4 already match.

But treat this as establishing a **rule**, not applying a one-off fix. See below.

## Make the rhythm systematic, not hand-set

Right now `reverse` is set by hand inside each section component. Nothing connects them, so inserting, removing or reordering a pillar silently breaks the alternation and nobody notices until someone looks at the whole page.

**Move the decision to `src/pages/index.astro`**, where the page order actually lives, and pass `reverse` down as a prop derived from each pillar's position in the sequence. One place to read, one place to get it right, and reordering the page keeps the rhythm intact automatically.

If that turns out to fight the current component structure, the fallback is acceptable: keep `reverse` local but add a single comment block naming the rule and listing the expected order, so the next person has something to check against. Do not leave four independent booleans with no stated rule.

## Three things that must not break

### 1. Reading order stays fixed

The alternation is **purely visual**. In the DOM, every section keeps the same order: heading and paragraph first, visual second.

`PillarSection` already does this correctly with `order-1` / `order-2` utilities rather than swapping the markup. Keep that approach. Swapping the DOM instead would change screen-reader and keyboard order section by section, so the page would be narrated inconsistently — visual-then-heading in half the sections, heading-then-visual in the other half.

### 2. Mobile always stacks the same way

Below `901px` the grid collapses to a single column, and in that layout the heading must always come first, in every section without exception. A visual arriving before its own heading is disorienting on a phone.

This works today because the order utilities are scoped to `min-[901px]:`. Keep that scoping. Any new ordering logic must be breakpoint-scoped the same way.

### 3. Text stays left-aligned in both orientations

When the visual moves to the left and the text to the right, the text block stays **left-aligned inside its own column**. Do not right-align it to "mirror" the layout.

The existing measures stay as they are: `18ch` on the heading, `52ch` on the paragraph.

## Keep the stage label where it is

The stage label — `IN PROGRESS — the hours` — sits above the grid and is anchored to the left edge of the container in every section, whichever side the visual is on.

Do not move it above the text column when the section is reversed. That label is the page's spine marker; it must stay on one consistent axis or the rail on the left loses its visual connection to the content.

## Leave the rest alone

This change is layout only. Do not modify:

- band colours (`paper`, `bg-band-mint`, `bg-band-warm`) — the colour progression is an independent rhythm and it is already correct
- headings, paragraphs, or any card content
- vertical alignment (`items-center`) or the `gap-14` between columns

If card content looks wrong to you, raise it separately. It is not part of this task.

## Acceptance criteria

- [ ] Scrolling the four pillars shows the visual on the left, right, left, right in that order
- [ ] The alternation is derived from one declared source, not four independent flags with no stated rule
- [ ] DOM order is heading-then-visual in all four sections, verified in the accessibility tree
- [ ] Tab and screen-reader order is identical across the four sections
- [ ] Below 901px every section stacks heading first, visual second
- [ ] Text is left-aligned in its column in all four sections, reversed or not
- [ ] The stage label sits at the container's left edge in all four sections
- [ ] Band colours and all card content are unchanged
- [ ] Reordering the pillars in `index.astro` keeps the alternation correct without touching the section components

## Do not

- Do not swap markup order to achieve the visual swap — use ordering utilities
- Do not apply ordering below the `901px` breakpoint
- Do not right-align text in the reversed sections
- Do not move the stage label off the container's left edge
- Do not touch band colours or card content
