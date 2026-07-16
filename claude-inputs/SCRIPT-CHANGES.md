# SCRIPT-CHANGES.md — diff log between script.md revisions

Tracks user-directed line-level edits to the master script (`claude-inputs/script.md`)
after rev. 2 was locked in and staged into `/script.txt` (the file the engine actually
plays). Each entry lists what changed, why, and which files were touched — both the
master script and the live stage script must be kept in sync; check this file's
"synced to" line before trusting `/script.txt` matches the current script.md rev.

---

## rev. 5 edit — post-ambush sick-room exchange reworked (2026-07-16)

**Why (author, 2026-07-16):** the old sick-room exchange had her explain that she
shielded him out of attachment ("I didn't want them to take you away from me,
Master") and closed on the "pride is one of the customs of my people" callback.
The author replaced it with a sharper exchange in which Avram argues that her
sacrifice was a tactical miscalculation — throwing herself in front of a possibly
lethal one-shot device could have gotten HIM killed and her captured — and then
forgives her for it.

**Old exchange (deleted):**
- Her: "I didn't want them to take you away from me, Master. It wouldn't have been good for you."
- *(silent beat: [avram gentle L])*
- Avram: "That's a little more pride in our relationship than you've shown before."
- Her: "Pride is one of the customs of my people."

**New exchange (5 beats):**
1. Her: "I thought they were still trying to take you alive, Master."
2. Avram: "Would it have been better for you to be unconscious than me, if they
   only had one shot from a one-use magical device? | The end result might have
   been that they took you away, and killed me outright, rather than taking me as
   a slave." (the `|` is the engine's in-line pause/paragraph break, kept literal
   in script.txt as ` | ` per existing convention.)
3. Her: "..." (silence panel)
4. Her: "I did have less than a second to think about it, Master."
5. Avram (now `avram gentle left`): "We all make mistakes, don't we, when we have
   that little time to think. At least it wasn't me flinging myself in front of you."

**Staging:** Avram holds `avram hollow left` (set at the wake) through his grim-logic
line — the `[avram gentle L]` switch now precedes the closing "We all make mistakes"
line, where he actually forgives her (argued in a new @note). The stale @note about
the chapter ending on her line (with the removed trailing "Avram: ..." beat) is
dropped, since the scene now ends on Avram's line.

**Files touched:** `claude-inputs/script.md` (author edit; header → rev. 5),
`script.txt` (staging echoed; header → stage script v3, from script.md rev. 5),
`claude-notes/script-nocomments.txt` (comment-free copy synced),
`claude-notes/voice-script.md` (old two entries removed, five new entries added).
**Synced to:** script.md, script.txt, script-nocomments.txt, voice-script.md all in sync.
**Verification:** validate_script.js 0 errors; no old-line text ("customs of my
people", "take you away from me, Master") survives outside this change log / git
history; new lines confirmed present in script.txt, script-nocomments.txt, voice-script.md.

---

## rev. 4 edit — ch. 11 combat rework, "Code mauve" (2026-07-04)

**Why (author, 2026-07-04):** story logic — the slavetakers know Avram is a valuable
prodigy, so the old staging (captain simply pulls the lethal rod mid-melee) made no
sense. Reworked so they visibly fight to take him ALIVE; the dark rod is an
escalation, authorized only after Avram starts killing them.

**New sequence (between cg_melee_flank and the slavetaker's post-strike lines):**
1. NEW `cg_melee_press` + narration "They fight to take him whole. Flats and hafts,
   hands grabbing for his sword arm. A prodigy is worth nothing dead." — two
   slavetakers grappling/roping him, no blades raised at him.
2. NEW `cg_first_kill` + "Avram fights to kill." / "The first life he has ever
   taken. He does not pause."
3. Captain shouts `Slavetaker: Code mauve!` (author-specified line, verbatim).
4. Rod line changed: no longer the captain — "Another ambusher's off-hand comes up
   with a short black rod, leveled at Avram from the side —" (absorbs the author's
   partial edit already sitting in script.md, which had both old and new rod lines;
   the old captain line is deleted).
5. `cg_lance_hit` unchanged.
6. NEW `cg_her_fallen` — her crumpled on the road in front of Avram, same scene
   (punched hole in her breastplate, realistic blood). The slavetaker's
   post-strike lines play over this panel.

**Blood correction (same day):** the first pass sanitized the wounds ("no gore" —
an inherited prior-session convention plus model conservatism, NOT an author
request). Author: "it is fine to have blood where blood would realistically
appear." `cg_her_fallen` and `cg_first_kill` regenerated with realistic blood;
no image-model refusals, so the author's edit-blood-in-afterwards fallbacks were
not needed. Clean first-pass versions kept at `claude-notes/raw/*_clean.png`.

**Files touched:** `script.txt` (canonical staging), `claude-inputs/script.md`
(mirrored), `assets/manifest.json` (+3 cg), `assets/cg/cg_melee_press|cg_first_kill|
cg_her_fallen.png` (new art; prompts in `claude-notes/jobs/wound_rework.json`).
**Synced to:** script.txt and script.md both updated this session, in sync.
**Verification:** validate_script.js 0 errors (dialogue 214, +1 = "Code mauve!");
3 new warnings are just added references to the already-missing foley sfx.

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
`claude-inputs/fable5-conversation-full.html`, Eliezer's "guy drinking tea" note — the prologue tea-flash panel)
from being spoiled early.

**Synced to:**
- `claude-inputs/script.md` (rev. 3 header; line ~69)
- `/script.txt` (stage script v2 header; the `Avram:` line in chapter 2, The
  Bartender)

**Verification:** `node claude-notes/tools/validate_script.js` → 0 errors after the
edit (dialogue text changes aren't checked against anything but must not break
directive parsing, which it doesn't — plain text edit only).
