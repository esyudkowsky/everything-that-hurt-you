# HANDOFF-SCRIPT.md — write master script rev. 4 (suitable for Opus)

Author request 2026-07-03: there is currently NO version of the full prose script that
corresponds to the kinetic novel as it now plays. Write one — "in enough detail that
changes to the script could be echoed back to the kinetic novel." The author initially
asked Fable to do this, then redirected it to a handoff: **this is an Opus-suitable
task** — careful, mechanical, no new creative decisions. Where a judgment call seems
required, that's a sign you've drifted out of scope: transcribe, don't rewrite.

## Deliverable

`claude-inputs/script.md` **rev. 4**, regenerated FROM `/script.txt` (the stage script
the engine plays — it is the canonical source of truth; script.md rev. 3 is STALE and
has been diverging since the 2026-07-02/03 author passes). Plus a rev. 3 → rev. 4 entry
in `claude-inputs/SCRIPT-CHANGES.md` (follow that file's existing entry format).

## Why script.md rev. 3 is stale (do NOT trust it for content)

All of these went into script.txt only — this is the diff rev. 4 must absorb:
- Chapter 1 opening: NEW truck prequel (3 CGs), first line reworded to
  "I tell you now a tale of the planet, Elhom IV.", all voiceover groups now
  superposed over images (only the first line sits on black), "Demon Lord" line
  deliberately over the forest-arrival image (a hint — keep the pairing explicit).
- Chapter 3: auction narration rewritten (grounded bidding sequence), ownership-
  transfer narration added, pamphlet rules rebalanced (rules 5+6 merged; renumbered).
- Chapter 4→5 seam: "appoints herself his teacher" bridge added.
- Chapter 7: laughter/dead-silence beats restaged (room-first, sprite-cut timing).
- Chapter 8: dialogue now plays over cg_campfire_shoulder before the sprite cutover.
- Chapter 9: healer scene is now a three-beat transition (dungeon mishap → walk out
  → caravan at dusk with @tint dusk); narration rewritten spare.
- Chapter 11: "Bandit"→"Slavetaker" nametag switch at her identification line;
  melee narration cut (silent CG panel); temple scene restaged (cg_vigil holds
  through the attendant exchange; several line edits per SCRIPT-TODO 15-18).
- Chapter 12: boss fight now shown (cg_boss_fight / cg_boss_win); armor-resupply
  transition added; "hands" tic lines removed.
- Chapter 13/14: long paragraphs split into beats (items 4/21); cliff staged on
  bg_cliff_wide; "I really, really have to." line edit.
- Chapter 15: tombstone epitaph baked into art (overlay removed); cg_forest_walk beat.
- Global: every speaker shows a nametag incl. "Her"; spare-prose pass over all
  session-added narration (2026-07-03; flashy language reserved for the auctioneer).
Cross-check `claude-notes/SCRIPT-TODO.md`'s resolution log + `SCRIPT-CHANGES.md`
if any of the above reads ambiguous — but script.txt itself always wins.

## Format for rev. 4 (author-editable, echo-able)

Keep the rev. 3 conventions the author wrote in (see current script.md):
- `## <n>. <Chapter title>` headings matching `@chapter` markers.
- `\- ` prefix for Skagganauk voiceover lines (note ON-BLACK vs OVER-image: annotate
  which image each group is superposed on, e.g. `: [bg_town_gate + avram neutral] …`
  panel line first, then its `\- ` lines).
- `: ` prefix for panel/staging descriptions. **NEW REQUIREMENT (the "echo-able"
  part): every `: ` panel line must name its engine assets in square brackets** —
  e.g. `: [cg_lance_hit] Her leaping in front of him; the dark lance…` or
  `: [bg_camp_night, tint dusk | avram neutral L, healer dry-neutral R] The healer,
  gray-braided, splints Avram's arm…` — so a human editing the prose can see exactly
  which staging unit they're touching, and a later session can map each script.md
  line back to its script.txt block mechanically.
- Dialogue as `Speaker: line` (verbatim from script.txt — dialogue text is sacred,
  copy character-for-character including *emphasis* and em-dashes).
- `> ` for status/inscription overlay lines, verbatim.
- Sound in brackets on their own lines where the author had them or where they're
  load-bearing: `[bgm: bgm_tension]`, `[sfx: sfx_silence-cut]`, `[flash white]`.
  Don't transcribe every engine directive — @pause, @clear, fade-vs-cut are engine
  texture, not script content. Include a directive only when losing it would change
  what a reader of the script would think happens on screen.
- Keep the author's production notes that still apply (the "only time she interrupts
  him" note, the "silence panel" convention, the H-free bare-throat note, etc.).
  Drop stale ones (anything sneaker-related, "Her has no nametag", floor-marker
  staging that no longer matches).

## Verification (do all three)

1. **Dialogue parity:** extract every `Speaker: text` line from script.txt and from
   your rev. 4; diff them — must be identical modulo the `: ` prefix formatting.
   (Write a ~20-line script; don't eyeball 169 dialogue lines.)
2. **Asset parity:** every @bg/@cg/@sprite id used in script.txt appears in at least
   one rev. 4 bracket annotation; no bracket names an id script.txt doesn't use.
3. **Read one chapter aloud against a click-through** (tools/e2e.js screenshots or a
   manual run of chapter 3) to confirm the panel ordering reads in the same order it
   plays.

## After writing

- Update script.md's header to "rev. 4" with a one-line provenance note
  ("regenerated from stage script /script.txt, 2026-07-XX").
- Add the SCRIPT-CHANGES.md entry (what changed, why, synced-to, verification).
- Going forward the sync rule inverts: the author edits script.md rev. 4+, and
  sessions echo those edits INTO script.txt. Say so explicitly in the
  SCRIPT-CHANGES entry, since every note in the repo currently assumes the
  opposite direction.
