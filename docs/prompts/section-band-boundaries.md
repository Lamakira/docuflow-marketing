# Restore visible boundaries between sections

> Prompt for the implementing agent. Repo: `docuflow-marketing`.
> Components: `src/components/sections/Transparency.astro`, `src/components/sections/ClientRecord.astro`.

---

## The problem

Sections currently run together with no visible boundary. Here is every band on the homepage, in page order:

| # | Section | Band |
|---|---|---|
| 1 | Hero | paper |
| 2 | ProofBand | **ink** |
| 3 | StackFold | paper |
| 4 | ClientRecord | paper |
| 5 | Hours | **mint** |
| 6 | Documentation | **warm** |
| 7 | AiAnswer | paper |
| 8 | Transparency | paper |
| 9 | Sectors | paper |
| 10 | TheBill | **ink** |
| 11 | FinalCta | **hour** |

Two runs of identical background sit back to back: **3–4**, and **7–8–9**.

The 7–8–9 run is the damaging one. `AiAnswer` and `Transparency` both present a large heading on one side and a bordered card on the other, on the same paper background — so they read as one continuous block rather than two distinct arguments. The visitor has no signal that the pillar sequence has ended and a new kind of section has begun.

Root cause: `PillarSection` defaults `band` to `bg-paper`, so pillars 1 and 4 stayed paper while pillars 2 and 3 got a tint. The intended cool-to-warm progression became a bump in the middle.

## Fix 1 — Transparency becomes a full-bleed white band

Change the section band from `bg-paper` to white, and **remove the inner white card**.

Today the section is a white card sitting on a paper band — two nested surfaces doing the same job. Promoting white to the band itself gives the section its own identity and deletes the redundant wrapper in one move.

This resolves both missing boundaries at once: paper → white at `AiAnswer` → `Transparency`, and white → paper at `Transparency` → `Sectors`. No new colour token.

Specifically:

- The `<section>` background becomes white
- Drop the `rounded-[8px] border border-rule bg-white p-12` wrapper — the two-column grid moves up to sit directly inside `container-wide`
- Keep the two-column layout, the `gap-12`, and the `min-[901px]:grid-cols-2` breakpoint
- Keep the vertical rhythm consistent with its neighbours (`py-[88px]`)

### One thing that needs attention

The four guarantee rows are currently `bg-paper` chips on a white card. Once the band itself is white, they still work — paper on white reads as a subtle raised surface, which is the right relationship.

But check the contrast of the row text against `paper` and confirm it still passes AA. If the rows end up too faint against the new band, give them a 1px `rule` border instead of relying on fill alone.

## Fix 2 — StackFold → ClientRecord

Same defect, milder: `StackFold` ends on paper and `ClientRecord` begins on paper.

It reads less badly than 7–8 because the two blocks don't resemble each other — `StackFold` ends with a centred caption, `ClientRecord` opens with a mono stage label. But it is the same missing signal, and it sits at an important moment: the transition out of the sales argument and into the product proof.

**Give `ClientRecord` the mint band**, and shift the pillar tints down one:

| Pillar | Current | New |
|---|---|---|
| ClientRecord | paper | **mint** |
| Hours | mint | **paper** |
| Documentation | warm | warm (unchanged) |
| AiAnswer | paper | paper (unchanged) |

Resulting sequence: paper → **mint** → paper → **warm** → paper → **white** → paper → ink → hour.

Every adjacent pair now differs. The tints alternate with paper instead of clustering, and the warm band still lands late, preserving the cool-to-warm direction the design brief asked for.

Note that `Hours` currently passes `stageTone="live"` for its green stage label. That was tied to the mint band. When `Hours` becomes paper, check the label still reads correctly — and if green on paper looks arbitrary once the mint is gone, move `stageTone="live"` to `ClientRecord` along with the mint band, so the green label and the green-tinted band stay together.

## Do not

- Do not introduce a new colour token. Both fixes use `paper`, `white`, `band-mint` and `band-warm`, all of which already exist.
- Do not give `Transparency` the `ink` band. It would put three dark bands on the page and compete with `TheBill`, which must stay the page's one heavy dark moment.
- Do not add borders, rules or dividers between sections to fake a boundary. The band change is the boundary.
- Do not change any copy, card content, or the four guarantee strings.
- Do not touch `ProofBand`, `Sectors`, `TheBill` or `FinalCta`.

## Acceptance criteria

- [ ] No two adjacent sections share the same background anywhere on the page
- [ ] `Transparency` is a full-bleed white band with no inner card wrapper
- [ ] The guarantee rows remain legible on the new band, AA verified
- [ ] `ClientRecord` sits on mint, `Hours` sits on paper
- [ ] The green stage label and the mint band belong to the same section
- [ ] Vertical rhythm is unchanged — every section keeps its existing padding
- [ ] No new colour tokens
- [ ] Layout, copy and card content are otherwise untouched
- [ ] Checked at 1440px, 900px and 375px
