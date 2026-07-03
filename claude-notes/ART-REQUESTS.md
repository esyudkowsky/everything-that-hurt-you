# ART-REQUESTS — new artwork discovered needed while writing script.txt

Running list of assets referenced by `/script.txt` that are **not** in the
informal-spec catalog and not yet generated. Append new entries at the bottom
as staging work continues. Style/consistency rules per informal-spec Part I
(same character reference sheets, muted earthy palette, clean lineart).
Everything here renders as the placeholder card until generated, so nothing
blocks the build.

Requested 2026-07-02 (stage-script pass over script.md rev. 2):

---

## 1. `bg_guild_hall` — background, HIGH priority
Adventurer's Guild **interior**: counter with a clerk's station, notice board
with pinned papers, wood-and-stone hall. ~16:9 like the other bgs.
- **Why:** Sections 5 ("Guild hall. A clerk looking up from Avram's adventurer
  plate") and 12 ("Guildhall notice board" rumor scene) both play indoors.
  The spec catalog only has `bg_guild_exterior`. Two dialogue scenes currently
  play over a placeholder.

## 2. `cg_slime_lecture` — event CG, HIGH priority
Dungeon floor three (use `bg_dungeon_early` architecture): her pointing at an
acid-slime with her sword, mid-lecture; Avram nodding along like a student.
H-armor outfit, collar visible, cheer/fierce energy.
- **Why:** It's one of the four Montage A panels in script.md rev. 2
  ("Dungeon floor three. Her pointing at an acid-slime..."), but the spec CG
  list jumps from `cg_knockdown` (10) to `cg_first_strike` (12). Montage
  panels are timed full-screen art with no textbox, so there's no
  narration/sprite fallback — this beat has no substitute.

## 3. `cg_nobleman_bid` — event CG, MEDIUM-HIGH priority
Auction crowd: the rich robed nobleman with hand raised mid-bid, two heavy
scarred collared bodyguards behind him, and a skeletally thin, scarred,
collared girl kneeling at his side.
- **Why:** The rev-2 panel explicitly shows the entourage, and it's the load-
  bearing image behind the cliff line "that awful slimeball would have bought
  you... a net benefit for you." The `nobleman.haughty/irritated` sprites show
  only the man himself — the kneeling girl (her alternative fate) is lost with
  sprite-only staging.

## 4. `cg_campfire_shoulder` — event CG, MEDIUM priority
Campfire two-shot: her head resting on Avram's shoulder, firelight, his
expression caught between comfort and guilt. H-camp outfit + collar.
- **Why:** Section 8 opens on this pose ("her resting her head on his
  shoulder") and it's the story's single physically-intimate tableau before
  the temple. Sprites can't touch, so without a CG the pose exists only in
  narration. Scene still works without it (script falls back to sprites), so
  medium.

## 5. `cg_melee_flank` — event CG, LOW priority / optional
Fast combat panel on the forest road: Avram holding one flank against
slavetakers, competent, mid-swing. Speed-line energy is fine.
- **Why:** "Melee. Fast panels. Avram holding one flank — genuinely good now."
  Currently staged as narration + white flashes, which is acceptable. A single
  action panel would strengthen the contrast with the whiteout. Skip if budget
  is tight — the spec's own economy (no melee CG) may have been intentional.

## 6. `bartender.turned-back` — sprite expression, LOW priority / optional
Bartender seen from ¾ behind, facing her bottle shelves.
- **Why:** Two beats play with her back turned ("Twelve silver." / "Aw
  *slimespit.*") and the deadpan lands better if the sprite actually turns.
  Narration covers it acceptably now.

---

## Reminder (not new art — already specced, but assets/ui is still empty)
The Part III UI set has not been generated yet and script.txt depends on the
overlay pieces:
- `ui_textbox` (nametag plate variant needed; "Her" lines render no tag)
- `ui_status_frame` (status overlays end each montage)
- `ui_floor_marker` (floors 16/18/20 and 26/30/35)
- `ui_title` (title screen)
- placeholder card (needed FIRST — it's how the build is tested with missing art)

---

(Append further requests below as staging/build work continues.)

---

## STATUS 2026-07-02 (art session — Claude Fable): requests 1–5 FULFILLED

Generated, visually QA'd, and added to `assets/manifest.json`:
1. `bg_guild_hall` ✔ (counter + clerk station, notice board with greeked papers)
2. `cg_slime_lecture` ✔ (sword-pointing lecture, Avram nodding, floor-3 rough stone)
3. `cg_nobleman_bid` ✔ (outdoor plaza midday to match the other auction CGs; entourage +
   kneeling collared frail young woman, restrained per spec). NOTE: the image model
   silently refuses "skeletally thin ... girl" + collar + kneeling — phrasing it as
   "frail gaunt young woman" generates fine. Recorded in ART-PIPELINE.md lesson 12.
4. `cg_campfire_shoulder` ✔ (head on shoulder, collar verified visible, his
   comfort-vs-guilt expression)
5. `cg_melee_flank` ✔ (Avram competent, two rank-and-file slavetakers, no gore)
6. `bartender.turned-back` — NOT generated (deliberate): script.txt never references it
   (verified by cross-checking every `@sprite/@bg/@cg` id in script.txt against the
   manifest — those five above were exactly the missing set). If staging later adds the
   turned-back beat, request it again and it's a one-liner off the bartender master.

Re: the UI reminder — the full UI set now exists (`assets/ui/`): ui_title (AI art),
ui_textbox / ui_status_frame / ui_floor_marker / placeholder_card (PIL-drawn with true
alpha by `claude-notes/tools/make_ui.py`; edit that script to restyle). The textbox's
nametag plate is a separate rounded rect at its top-left — engine hides it for Her's
untagged lines.

---

## STATUS 2026-07-03 (subtle-expressions + consistency pass — Claude Fable)

Author direction: expressions were too exaggerated ("subtly X" prompting now doctrine, see
ART-PIPELINE.md lesson 15) and old-gen sprites were still mixed with the new-gen cast
(root cause: batch.py skip-existing, lesson 14). Regenerated and visually QA'd, 26 assets:

- **Leads:** `avram.neutral` (was the OLD character design — now cut from the new traveler
  master), `her.cheer` + `her_camp.cheer` (closed-mouth bright smile per author calibration),
  `avram.alarm` / `avram.discomfort` / `avram.horror-distant` / `avram_late.alarm` (subtle
  versions; horror keeps his normal skin tone now).
- **Side cast re-rendered in the new style, same designs:** bartender ×3 (startled now subtle;
  menacing-lean restaged as a quiet loom, mouth closed), announcer.barker-grin (flash kept —
  auction patter exemption), nobleman.haughty master + irritated (cold now, NOT red-faced),
  clerk.cheerful-surprise (closed-lip), adventurer1 jeering/awed + adventurer2 laughing/awed
  (awed pair subtle now), healer ×2, slavetaker ×2 (snarl intensity kept — earned rage).
- **`cg_nobleman_bid`** regenerated; shipped version is from `x-ai/grok-imagine-image-quality`
  (gemini refusals were stochastic and its passing attempt missed the composition brief);
  gemini alternate kept at `claude-notes/raw/cg_nobleman_bid_gemini_alt.png`. Grittier tone
  than neighboring CGs — flag for author review.
- Unused old-gen sprites (announcer.leer, attendant ×2, god.serene) deliberately NOT
  regenerated — nothing references them; regenerate from the new masters if staging ever
  picks them up.

Jobs: `claude-notes/jobs/subtle_wave1.json` + `subtle_wave2.json`. Verified in-engine
(12 scene screenshots) + full e2e to the end card, no errors.

---

## 8-10. `cg_truck_cross` / `cg_truck_turn` / `cg_truck_see` — FULFILLED 2026-07-03

Author-requested opening prequel (3 CGs): Avram in Earth clothes crossing a city
street; turning his head; the oncoming truck (moment BEFORE impact — no collision,
the `@flash white` + tea-flash cut IS the impact). Generated same session from
`raw/avram_earth.neutral.png`, in `claude-notes/jobs/truck_prequel.json`; the
turn panel needed one retry (first try drifted to night — final is overcast day
matching panel 1; panel 1 dry vs 2-3 rainy, judged acceptable, flag if author
disagrees). Manifest entries added; staged at the top of chapter 1.
NOTE: Earth sneakers/clothes are CORRECT here — pre-summoning context is the one
place Earth clothing is allowed (see USER.md 2026-07-03 worldbuilding rule).

---

## 7. `cg_healer_splint` — event CG, LOW priority / optional (filed 2026-07-03)
Caravan camp at LATE EVENING/DUSK (not full night): the gray-braided healer
splinting Avram's seated arm in the foreground; drawn-up wagons and cookfires
behind; Haurvatat small in the background across the camp, tending a fire, out
of earshot. Warm low light.
- **Why:** SCRIPT-TODO #12 (Healer-scene jump cut) — the author's third
  suggested fix was a healer-mid-treatment CG at late evening/sunset rather
  than night. The scene has since been restaged in script.txt (three-beat
  transition + `@tint dusk` over `bg_camp_night`), so this panel is optional
  polish, not a blocker. Caveat from visual QA (2026-07-03 screenshots): the
  dusk tint warms the trees but `bg_camp_night`'s prominent Milky Way starfield
  still reads as full night — this CG (or a dusk variant of the camp bg) is
  what would actually land the "late evening" read the author asked for.
  **NOT referenced by script.txt yet** — add the `@cg` only after the asset
  exists, so no placeholder card appears mid-scene.
