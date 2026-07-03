# SCRIPT-CHANGES.md — diff log between script.md revisions

Tracks user-directed line-level edits to the master script (`claude-inputs/script.md`)
after rev. 2 was locked in and staged into `/script.txt` (the file the engine actually
plays). Each entry lists what changed, why, and which files were touched — both the
master script and the live stage script must be kept in sync; check this file's
"synced to" line before trusting `/script.txt` matches the current script.md rev.

---

## rev. 3 → rev. 4 (2026-07-03)

**Change:** `claude-inputs/script.md` fully regenerated FROM `/script.txt` (the stage script
the engine plays), which had become the sole source of truth after two un-back-ported author
passes (see the stale-warning entry below). rev. 4 absorbs every one of those changes:

- Ch 1 opening: NEW 3-CG truck prequel (`cg_truck_cross/turn/see`) before the first line;
  first line reworded to "I tell you now a tale of the planet, Elhom IV."; all voiceover groups
  after that first line now superposed (letterboxed) over their images rather than on black;
  the "Demon Lord" line deliberately over Avram's forest arrival (`avram_earth shock`) as a hint.
- Ch 3: auction narration regrounded (announcer barker line, grounded bidding); ownership-transfer
  narration added; pamphlet rules rebalanced (old RULE 5/6 merged; renumbered to 5/6/7).
- Ch 4→5 seam: "she … appoints herself his teacher" bridge added.
- Ch 7: laughter / dead-silence beats restaged (room laughs first, then handed off to the next
  table via sprite-cut timing).
- Ch 8: opening line now plays over `cg_campfire_shoulder` before the sprite cutover.
- Ch 9 (Healer): now a three-beat transition — dungeon mishap → walk out → caravan at dusk
  (`@tint dusk`); narration rewritten spare.
- Ch 11 (The Wound): "Bandit" → "Slavetaker" nametag switch at her identification line; melee
  narration cut in favor of the silent `cg_melee_flank` panel; temple scene restaged so `cg_vigil`
  holds through the attendant exchange (she is visibly in the bed; attendant speaks to Avram
  directly). Avram's attendant line is now "I'd do it even if I wasn't attached." (was "…if I wasn't.")
- Ch 12 (Inversion): boss fight now shown (`cg_boss_fight` / `cg_boss_win`); armor-resupply
  transition added; the old "hands" tic lines removed.
- Ch 13/14: long paragraphs split into per-beat lines; cliff staged on `bg_cliff_wide`; Avram's
  line corrected to "I really, really **have to**." (rev. 3 had "…really do.").
- Ch 15 (Close): tombstone epitaph now baked into `cg_tombstone` art (the old `@overlay inscription`
  block was removed); `cg_forest_walk` "before" beat added; final line renders over `cg_burning_walk`.
- Global: every speaker — **including "Her"** — now shows a nametag (rev. 3's "Her has no nametag"
  note dropped); spare-prose pass over all session-added narration (flashy language reserved for the
  auctioneer); all sneaker-motif references dropped.
- Format: rev. 4 adds the "echo-able" requirement — every `: ` panel line names its engine assets
  in square brackets (`[cg_id]`, `[bg_id | left expr L, right expr R]`), so prose edits map
  mechanically back to `/script.txt` staging blocks.

**Why:** Author request 2026-07-03 (spec: `claude-notes/HANDOFF-SCRIPT.md`) — there was no prose
master corresponding to how the kinetic novel now plays; rev. 3 had been diverging since the
2026-07-02/03 passes. Transcription task, no new creative decisions.

**Synced to:**
- `claude-inputs/script.md` (rev. 4 header; whole file regenerated from `/script.txt`).
- `/script.txt` — unchanged; it was and remains the source rev. 4 was written from.

**Verification:**
- Dialogue parity: extracted every `Speaker: text` line from `/script.txt` (169) and from rev. 4
  (169) and diffed — identical, 0 diffs. (The three bare `...` silence panels on the cliff are
  unattributed narration in both, correctly not counted as dialogue.)
- Asset parity: every `@bg`/`@cg`/`@sprite` id used in `/script.txt` appears in ≥1 rev. 4 bracket
  annotation, and no bracket names an id `/script.txt` doesn't use.
- Chapter parity: all 15 `## n. Title` headings match the `@chapter` markers in number, title, and
  order; panels within each chapter are transcribed in `/script.txt` directive order.
- `node claude-notes/tools/validate_script.js` → 0 errors (script.txt untouched by this task).

**⚠ SYNC DIRECTION NOW INVERTS.** Every prior note in the repo assumes edits flow script.md → script.txt.
From rev. 4 onward it is the opposite: **the author edits `claude-inputs/script.md` (rev. 4+), and a
session echoes those edits INTO `/script.txt`.** rev. 4's bracket annotations exist to make that
mechanical. When you back-port a script.md edit, re-run the three parity checks above and
`validate_script.js`, then log the change here.

---

## ⚠ rev. 3 is STALE relative to the kinetic novel (2026-07-03)

Since rev. 3, two author passes (2026-07-02 evening and 2026-07-03) applied many
narrative/staging changes directly to `/script.txt` without back-porting them here —
including a reworded opening line ("I tell you now a tale of the planet, Elhom IV."),
a new 3-CG truck prequel before it, the restaged opening voiceover (superposed over
images; the Demon-Lord-line-over-arrival hint), the auction/healer/boss-sequence
rewrites, and a global spare-prose pass. **`/script.txt` is currently the sole source
of truth.** The author has requested a full regenerated master script (rev. 4) — task
spec in `claude-notes/HANDOFF-SCRIPT.md` (Opus-suitable). Do not hand-edit script.md
rev. 3 content in the meantime; write rev. 4 from script.txt instead.

---

## rev. 2 → rev. 3 (2026-07-02)

**Change:** "Some guy in the middle of nowhere drinking tea who I heard say something
about a Demon Lord!" → "Some guy in the middle of nowhere who I heard say something
about a Demon Lord!" (Avram's line, bartender scene, 1 occurrence).

**Why:** User-directed. "Drinking tea" foreshadows the prologue-flash reveal (the
God is the one drinking tea) too specifically for a throwaway Avram line — removing
it keeps the later "guy drinking tea in the middle of nowhere" payoff (see
`claude-inputs/fable-conversation.md` line 33/47, the prologue tea-flash panel)
from being spoiled early.

**Synced to:**
- `claude-inputs/script.md` (rev. 3 header; line ~69)
- `/script.txt` (stage script v2 header; the `Avram:` line in chapter 2, The
  Bartender)

**Verification:** `node claude-notes/tools/validate_script.js` → 0 errors after the
edit (dialogue text changes aren't checked against anything but must not break
directive parsing, which it doesn't — plain text edit only).
