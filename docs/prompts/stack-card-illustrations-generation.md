# Generating the five stack-card illustrations

> For image generation in ChatGPT. Four illustrations for the competitor cards in
> `StackFold.astro`, plus one for the DocuFlow result card.

---

## How to use this

Generate **all five in a single conversation**, in the order below. Paste the Style System block
first, on its own, and let the model acknowledge it. Then send one Subject block per message.

Keeping them in one thread is what makes the set look like a set — image models hold style far
better across turns than across separate conversations.

---

## Block 1 — Style system (send this first, alone)

```
I need a set of five small illustrations for a B2B SaaS landing page. I'll send you
the subjects one at a time. First, here is the style system that every image in the
set must follow exactly. Confirm you've understood it, then wait for the first subject.

FORMAT
- Square, 1024 × 1024
- Transparent background (if transparent isn't possible, use flat #FFFFFF)
- The artwork must read clearly when scaled down to 96 × 96 pixels — this is the
  actual display size. Build the composition for that size: few elements, generous
  spacing, no fine detail that disappears when small.

STYLE
- Flat geometric vector look. Front-facing, straight-on. No perspective, no isometric
  projection, no 3D.
- Uniform 2px strokes at this canvas size. No tapering, no varying line weight.
- Rounded corners on rectangles, radius roughly 8px at this canvas size.
- Absolutely no gradients, no drop shadows, no glows, no textures, no grain.
- Composition centred, with even margins on all four sides.

PALETTE — use these hex values only, nothing else
- #0F1524  near-black, for primary strokes and solid shapes
- #59657A  grey-blue, for secondary strokes and muted fills
- #D8DEE6  light grey, for tertiary lines, dividers and empty states
- #F3F5F7  very light grey, for surface fills
- #FFFFFF  white

STRICT PROHIBITIONS
- No text of any kind. No letters, no words, no numbers, no labels, no logos.
  Every element must be abstract shape only. This is the most important rule.
- No people, no faces, no hands, no body parts.
- No plants, no coffee cups, no desks, no office scenery, no furniture.
- No decorative dots, sparkles, confetti or floating bubbles.
- No brand marks or recognisable product UI.

Confirm you've understood, then wait for subject 1 of 5.
```

---

## Blocks 2–5 — The four competitor cards

These four represent the tools the customer is currently overpaying for. They must look
**plain, cold and slightly inert** — that is the point. Do not let them become appealing.

Every one of the four carries the same motif: **a short dashed connector leaving the shape
and stopping in empty space, ending in a small open circle.** It's the visual statement that
this tool is isolated and knows nothing about the others. Keep the dangling connector at the
same size and position in all four so the set reads as a system.

### Subject 1 — CRM & projects

```
Subject 1 of 5. Follow the style system exactly.

A single client record card, drawn as a rounded rectangle. Inside it, from top to
bottom: a small circle representing a company avatar, two short horizontal bars of
different lengths representing lines of information, and below them a horizontal
progress bar that is only partly filled.

To the right of the card, one short dashed connector leaves the edge, travels a
short distance and stops in empty space, ending in a small open circle that connects
to nothing.

Muted greys only. Nothing in the image should look active, successful or celebratory.
```

### Subject 2 — Time tracker

```
Subject 2 of 5. Same style system.

A simple circular timer: a plain circle with a single hand pointing up and to the
right, no numbers or tick labels on the dial. Below it, three short horizontal bars
of decreasing length, evenly spaced, representing logged durations.

One short dashed connector leaves the left side, travels a short distance and stops
in empty space, ending in a small open circle that connects to nothing.

Muted greys only.
```

### Subject 3 — Monitoring

```
Subject 3 of 5. Same style system.

A two-by-two grid of four small rounded rectangles, evenly spaced, representing blank
screen captures. Each one is empty — a plain light fill with a thin border, no content
inside, no icons. Below the grid, a row of six short vertical bars of varying heights,
like a small flat bar chart, all in grey.

One short dashed connector leaves the right side, travels a short distance and stops
in empty space, ending in a small open circle that connects to nothing.

Muted greys only. The empty captures should read as anonymous and contextless.
```

### Subject 4 — Wiki & docs

```
Subject 4 of 5. Same style system.

Three overlapping document pages, drawn as rounded rectangles stacked with a slight
offset, the front one fully visible and the two behind it peeking out at the top-right.
On the front page, three short horizontal bars representing lines of text, in the
lightest grey so the page reads as barely used.

One short dashed connector leaves the bottom, travels a short distance and stops in
empty space, ending in a small open circle that connects to nothing.

Muted greys only. The stack should feel closed and untouched.
```

---

## Block 6 — The DocuFlow card

This one is the payoff. It is the **only** image in the set allowed to use colour, and it
**resolves** the dangling connectors: the four separate things become one.

```
Subject 5 of 5. Same style system, with three changes:

1. The background is solid #0F1524 (dark navy), not transparent or white.
2. Two accent colours are now allowed, and only these two:
   - #E9A23B  amber, for the single primary highlight
   - #1F9D6B  green, for one confirmation element
   Strokes and secondary shapes become #FFFFFF and #9AA6B8 so they read on dark.
3. The composition resolves rather than dangles.

The subject: one central rounded square node, drawn with a clear amber stroke. Four
short connectors come in toward it from the four sides — top, bottom, left and right.
Unlike the previous images these connectors are solid, not dashed, and each one
terminates cleanly ON the central node rather than in empty space.

Inside the central node, a single small green check mark.

Everything else from the style system still applies: flat, geometric, no gradients,
no shadows, no perspective, and above all no text, letters or numbers anywhere.
```

---

## After generation — converting the files

ChatGPT returns PNG. Do not attempt to convert to SVG: auto-tracing a raster produces a
bloated, inaccurate file that is larger than the PNG it came from. True SVG would have to be
redrawn by hand in a vector tool, which is only worth doing if these prove themselves first.

Target: **WebP at 192 × 192** — twice the 96px display size, so it stays sharp on retina.

```bash
# one file
cwebp -q 82 -resize 192 192 crm_projects.png -o crm-projects.webp

# all of them
for f in *.png; do cwebp -q 82 -resize 192 192 "$f" -o "${f%.png}.webp"; done
```

Then strip metadata — generated images carry C2PA content-credential blocks that add weight
with no benefit on a marketing page:

```bash
exiftool -all= *.webp
```

Expected result: **well under 20 KB per file**, against 1.4 MB for the previous set.

Place them in `public/illustrations/` and reference them with `<img>` rather than inlining.
Inlining several SVGs or data URIs in one page risks colliding `id` attributes and class names
between them, and it defeats caching.

## Acceptance check

- [ ] No text, letters or numbers anywhere in any of the five images
- [ ] No people, plants, desks or office scenery
- [ ] The four competitor images contain no amber and no green — greys only
- [ ] Only the DocuFlow image uses colour
- [ ] All four competitor images share the same dangling-connector motif at a consistent size
- [ ] The DocuFlow image resolves those connectors onto the central node
- [ ] Every image is still legible at 96 × 96 pixels — check by actually shrinking it
- [ ] No gradients, shadows or 3D anywhere
- [ ] Each exported WebP is under 20 KB
- [ ] Every colour is one of the six palette values

## If the model drifts

Image models tend to slide back toward friendly stock illustration. The three failures to
watch for, and the correction to send:

**It added text.** *"Remove all text, letters and numbers. The illustration must be entirely
abstract shapes. Regenerate."*

**It added people or a desk scene.** *"Remove all people, furniture and scenery. Only the
abstract UI shapes described, on a plain background. Regenerate."*

**It made the competitor cards colourful.** *"Use only #0F1524, #59657A, #D8DEE6, #F3F5F7 and
#FFFFFF. No amber, no green, no blue. These illustrations must look deliberately plain.
Regenerate."*
