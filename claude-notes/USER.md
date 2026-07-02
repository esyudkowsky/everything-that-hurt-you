# USER.md — information solicited from or given by the user

- 2026-07-02: User directed Claude to generate **all artwork** for the kinetic novel itself, using **OpenRouter** (env var `OPENROUTER_KEY` is provided), and to **visually inspect** each generated image with Claude's own vision to QA it (regenerate on failure).
- Model chosen for generation (Claude's decision, not user-mandated): `google/gemini-3.1-flash-image` ("Nano Banana 2") — image generation + reference-image editing for character consistency, ~$0.004/image.
- 2026-07-02 (mid-task): User directed Claude to leave **extensive notes** for itself or a future Opus in case the art job must be redone (different central character models, different art style): save all prompts, key reasoning, and lessons learned about what did or did not work. → Done: see `claude-notes/ART-PIPELINE.md` (method, canonical design decisions, 12 lessons, redo playbook); all verbatim prompts are in `claude-notes/jobs/*.json`; QA contact sheets in `claude-notes/qa/`; pre-cutout sprite raws (future editing refs) in `claude-notes/raw/`.
- 2026-07-02: While the companion session generates artwork, user directed this session to write the **next-level-of-detail script** (per-line facial expressions, sprite staging, etc.) → delivered as `/script.txt` in the informal-spec `@`-directive format. User also directed that any newly-needed expressions/artwork be requested in a dedicated running file, appended as work continues → `/claude-notes/ART-REQUESTS.md`.
- 2026-07-02: User directed Claude to generate the **KN/VN music** via the OpenRouter key if readily possible (abort and say so otherwise). It was possible: OpenRouter carries Google Lyria 3 (music generation). → Done: all 6 BGM slots + `sfx_silence-cut` in `assets/audio/`; see `claude-notes/MUSIC-PIPELINE.md`. Model choice (Claude's decision, not user-mandated): `google/lyria-3-pro-preview`, $0.08/song, total ≈ $0.52. Caveat given to user: Claude cannot audition audio — spectrogram/loudness QA only; human listen still needed (esp. `bgm_dungeon`, `bgm_void`). Foley SFX (sword/impact/crowd/fire) not generated — out of scope for a music model.
- 2026-07-02 (follow-up): User directed Claude to (a) record lessons for a later Claude (already done → MUSIC-PIPELINE.md; also saved to Claude's persistent memory), (b) try any OpenRouter model that can do the SFX, (c) ensure the music loops well. → `sfx_sword`/`sfx_impact` delivered by salvaging the final strike from Lyria's rhythmic output; `sfx_fire`/`sfx_crowd` unfillable via OpenRouter (Lyria makes beats of them; gpt-audio is speech-only) — need a free SFX library. Loopability: prompts had asked for it, but Lyria always ends on a fade; fixed deterministically via `make_loops.py` (fade trim + 2s self-crossfade); manifest now points at `*_loop.mp3`. Human audition still needed (tracks + loop seams).
- 2026-07-02: User directed this (engine/build) session to **produce the complete visual novel**, framework of Claude's choosing, requiring: Web viewing; saving places; automatic place-saving via cookies with no UI action; and returning to already-viewed chapters. → Done and verified headless-end-to-end: `/index.html` + `/engine.js` (vanilla JS, no build step) playing `/script.txt`; autosave to cookie `ethy_save` + localStorage on every line; Continue + 15-chapter menu (unlock-as-read). Full state + verification evidence in `claude-notes/HANDOFF.md`; engine QA screenshots in `claude-notes/qa/engine/`.
- 2026-07-02 (session close, this session): User hit session limit; directed Claude to save all plans/current state in a format Opus could pick up → `claude-notes/HANDOFF.md`. User also noted BGM now exists but SFX are incomplete → reflected in HANDOFF.md's audio section (cross-referencing `claude-notes/HANDOFF-AUDIO.md` and `/HUMAN.md`).
- 2026-07-02: User directed a future session to generate a **soft cheerful title-screen
  music loop**, plus a **second sad/somber loop** (ideally sharing the same melodic
  theme, though the user flagged that as much harder to do with AI) that replaces the
  title music once the player has finished the story; explicitly "only try yourself if
  you think it's within your competence." This session couldn't attempt it —
  `OPENROUTER_KEY` was not set in the environment — so it was recorded as a todo
  instead of guessed at: full plan, draft prompts, and engine wiring are in
  `claude-notes/HANDOFF-AUDIO.md` (§"TODO: title-screen music, two loops") and
  `claude-notes/HANDOFF.md` (remaining-items list).
- 2026-07-02: User opened an **artwork todo list** (not to be implemented yet):
  (1) remove "stairs to nowhere" from the Avram/teadrinker scene (`bg_void_tea.png`;
  this session inspected the current file and didn't see stairs — flagged for a closer
  look before editing); (2) "outside your own scope" — add character head/expression
  portraits next to the textbox when a character speaks (classic VN face-plate), a
  bigger art+engine project, not started. Full detail in `claude-notes/ART-TODO.md`.
- 2026-07-02: User directed a line edit — "in the middle of nowhere drinking tea" →
  "in the middle of nowhere" (Avram's bartender-scene line; removes a too-specific
  foreshadow of the prologue tea-flash reveal) — synced to both `claude-inputs/
  script.md` (bumped to rev. 3) and `/script.txt` (bumped to stage-script v2); full
  diff entry in the new `claude-inputs/SCRIPT-CHANGES.md`.
- 2026-07-02: User gave a long batch of "todo:"-prefixed items during this session,
  explicitly meant to be recorded rather than implemented immediately (established
  pattern: messages prefixed "todo" = file for later; direct imperatives without
  that prefix = do now). Filed in full in `claude-notes/SCRIPT-TODO.md` (narrative/
  pacing: auction scene needs narration+music; Avram's slave-market actions need a
  show-not-tell rewrite or new CG; ownership-transfer scene too jump-cutty; long
  dialogue paragraphs need splitting, audit the whole script; restaurant scene has
  too many dishes; town→sword-practice transition is jarring; pamphlet rule 7 too
  long, combine rules 5+6; first leveling screen should animate swordsmanship 11→12
  instead of showing it static) and `claude-notes/ART-TODO.md` (guild clerk should
  sit behind a desk; **cutaway-bedroll CG (`cg_bedroll_transparent.png`) confirmed
  genuinely broken** — her lower body is missing entirely, tail curls into empty
  space, a boot floats disconnected — high priority, not just polish). One item —
  wanting a nametag "Her" shown throughout her dialogue — was **not** filed as a
  normal todo because it directly contradicts an explicit "deliberate, do not fix"
  instruction already in both `claude-inputs/informal-spec.md` and `script.txt`
  itself; surfaced back to the user instead (see `SCRIPT-TODO.md`'s flagged section).
- 2026-07-02: User requested "Her" show a nametag throughout dialogue. This
  session initially flagged the conflict rather than implementing it, since both
  `claude-inputs/informal-spec.md` and `script.txt` explicitly said the no-nametag
  behavior was "deliberate, do not fix." **The user then identified themselves as
  the author and explicitly overrode that earlier decision**, so it was
  implemented: `engine.js` no longer special-cases "Her" to hide the nametag
  plate; both `informal-spec.md` and `script.txt`'s notes were updated to match.
  Full history in `claude-notes/SCRIPT-TODO.md`'s "RESOLVED" section.
- 2026-07-02: User gave three more staging notes, recorded in `claude-notes/
  SCRIPT-TODO.md` items 9-11: (a) tavern-after-bedroll "Laughter" line should read
  as the room's reaction, not hers — her sprite currently appears before the laugh
  line, making it read as attributed to her; (b) "Dead silence at the next table"
  has the same issue, immediately following her line with her sprite still
  highlighted; (c) the campfire-shoulder CG (`cg_campfire_shoulder`, now generated)
  cuts away to plain background+sprites immediately after appearing — a leftover
  fallback from when the CG didn't exist yet — dialogue could play over it for a
  beat or two first instead of discarding it right away.
- 2026-07-02: User flagged the chapter-9 Healer scene transition as too abrupt
  (reuses `bg_camp_night` from the just-finished campfire scene, so a load-bearing
  jump — joining a caravan, new NPC, Avram injured offscreen — is compressed into
  one narration line with no visual change). Suggested fixes: transition fade,
  a new CG of the dungeon fight that hurt him, a new healer CG at sunset instead
  of night. **User also flagged this as possibly a systemic issue** — stage-
  direction-style sentences being shown as literal narration instead of unpacked
  into CG/show-don't-tell — asked for a search across the rest of the script for
  similar instances, and explicitly said this class of problem might need Claude
  Fable rather than a mechanical fix. Recorded in full in `claude-notes/
  SCRIPT-TODO.md` item 12; not implemented (todo-prefixed).
- 2026-07-02: User gave four more notes, all recorded (not implemented):
  (a) dungeon floor-number markers ("Floor 16" etc.) don't communicate anything
  to readers without matching visuals, and even with them the number becomes
  redundant — questions whether the mechanic should exist in its current form
  (`SCRIPT-TODO.md` item 13); (b) Slavetaker should be labeled "Bandit" until
  Harvautat identifies him — his nametag currently spoils her reveal now that
  every speaker gets a nametag (`SCRIPT-TODO.md` item 14); (c) "Avram, hand on
  sword" (line 605) is a second confirmed instance of the item-12 pattern —
  blocking/gesture direction leaking into displayed narration instead of
  becoming a sprite directive; (d) the melee CG (`cg_melee_flank.png`) has an
  AI-art weapon-duplication artifact — Avram appears to wield three swords at
  once — filed in `ART-TODO.md` item 6.
- 2026-07-02: User flagged a third confirmed instance of the item-12 pattern:
  "Melee. Fast. Avram holds one flank — genuinely good now." (line 629) was
  written as a fallback for when `cg_melee_flank` didn't exist yet, but the CG
  now exists — the narration is likely redundant now and should be cut/shortened
  once that CG's separate art bug (duplicated swords, see `ART-TODO.md` item 6)
  is fixed. Recorded in `SCRIPT-TODO.md` item 12 alongside the other two
  instances (Healer-scene transition, "hand on sword") as the third data point
  for the systemic search the user asked for.
- 2026-07-02: User gave three more art-continuity notes for chapter 11's climax
  sequence, all recorded in `ART-TODO.md` (items 7-9), none implemented:
  (a) `cg_whiteout.png`'s Avram silhouette reads as Earth clothes, should be his
  armored isekai silhouette; (b) `cg_one_hand_block.png` doesn't fit its context
  — cuts in cold with mismatched lighting/location right after a quiet temple
  scene, no bridging text since it's a silent `@hold` panel — user suggested
  just cutting the CG if it can't be made to fit rather than forcing a fix;
  (c) `cg_carry_road.png` shows her with pristine undamaged armor and no blood,
  despite being right after she took a lance through the chest — needs a damage
  pass matching `cg_lance_hit`'s wound placement, kept restrained per that CG's
  own "no gore beyond the strike" note.
- 2026-07-02: User flagged `cg_altar_everything.png` (the "Take everything"
  payment scene) as needing someone to receive the payment — currently just
  Avram alone at an empty altar. Preference order given: altar staging is fine
  if a priestess/healer/temple-secretary figure is added behind it; a front-
  counter restage is the fallback if that doesn't work. Recorded in
  `ART-TODO.md` item 10, not implemented.
- 2026-07-02: User flagged two more items in the temple-attendant scene
  (chapter 11), both recorded, neither implemented: (a) `bg_temple_cot.png`
  shows an empty made bed instead of her lying there bandaged/unconscious as
  in the immediately preceding `cg_vigil.png` — continuity gap (`ART-TODO.md`
  item 11); (b) small line-clarity edit, "I'd do it even if I wasn't." → "I'd
  do it even if I wasn't attached." (`SCRIPT-TODO.md` item 15).
- 2026-07-02: User asked (recorded, not implemented, `SCRIPT-TODO.md` item 16)
  for the temple attendant to address Avram directly instead of "walking off,
  to another acolyte" before her "guys like that" line — with the matching
  pronoun change "guys like that" → "guys like you" once she's speaking to his
  face. Same scene as items 11/15.
- 2026-07-02: User flagged "She wakes, bandaged. Avram in the chair." (line 692,
  same temple-recovery scene as items 11/15/16) as another instruction-not-
  description leak — no sprite/CG actually shows Avram seated; sprites are
  standing-only so nothing can render "in the chair" as written. Recorded
  `SCRIPT-TODO.md` item 17, cross-referenced with `ART-TODO.md` item 11 —
  flagged that this whole temple-recovery sequence has accumulated four related
  small issues (11, 15, 16, 17) and might be worth one combined authorial pass
  rather than four separate fixes. Not implemented.
- 2026-07-02: User asked to delete "Avram looks down at his own hands" (line
  713, end of the post-injury temple scene) and replace it with an `Avram: ...`
  silence beat timed to when her eyes close (line 708's "She settles back, eyes
  closing"). Recorded `SCRIPT-TODO.md` item 18 with the exact-placement
  ambiguity flagged (before/after her "Pride is one of the customs" line) for
  whoever implements it to judge. Not implemented.
- 2026-07-02: User flagged three connected issues with the chapter-12 boss
  sequence, all recorded, none implemented: (a) the boss fight itself is never
  shown or narrated — Avram goes in alone and the story just continues, no win
  beat (`SCRIPT-TODO.md` item 19); (b) `cg_boss_bench.png` shows her smiling
  while alone outside an intimidating boss door, tonally wrong for the tension
  of the scene (`ART-TODO.md` item 12); (c) the cut from the guildhall/level-up
  scene back into the dungeon (floor markers 26/30/35) is jarring — suggested
  connective material like buying replacement armor or a return-to-dungeon
  transition sequence.
- 2026-07-02: User flagged "Avram looking at his hands" as a possible recurring
  Claude writing tic with no matching graphic, asked for it to be eliminated
  everywhere. This session searched the whole script: found exactly two
  instances of the tic (line 713, already flagged in item 18; line 764, a new
  find — "Avram sitting awake, looking at her, then at his hands" over a plain
  standing sprite) and confirmed three OTHER hands-references are legitimate
  (tied to real depicted actions — glowing hands in `cg_carry_road`, collar
  removal, digging — left alone). Recorded as `SCRIPT-TODO.md` item 20,
  cross-referenced with item 18. Not implemented.
- 2026-07-02: User requested a line edit, "I really, really do." → "I really,
  really have to." (line 801), with a general principle attached: VN textbox
  format doesn't keep prior lines visible on screen the way prose does, so
  lines that call back to a referent several beats earlier (here, "to free
  you" from line 791) need to be more self-contained than book-style writing
  would require. Recorded `SCRIPT-TODO.md` item 21 with this principle flagged
  for future line-editing passes generally. Not implemented.
- 2026-07-02: User flagged a second over-long paragraph needing to be split
  into separate lines — Avram's "I'm not sure how a magical loyalty collar
  works..." speech (line 815, six sentences in one textbox), same issue as
  item 4's original example. Recorded as a second confirmed instance under
  `SCRIPT-TODO.md` item 4. Not implemented.
- 2026-07-02: User flagged `avram_late.hollow` (used for "Avram looks at her."
  right after the collar removal) as too harsh an expression for that tender
  moment — confirmed haggard/exhausted rather than gentle. Recorded
  `ART-TODO.md` item 13, suggested checking if an existing unused expression
  fits better before generating new art. Not implemented.
- 2026-07-02: User gave two more notes on the chapter-14 cliff scene, both
  recorded, neither implemented: (a) `avram_late.strained` (used for nearly the
  entire cliff conversation per the script's own note) reads as visibly
  near-crying — confirmed glistening eyes in the file — undercutting a scene
  meant to hold tension rather than already show tears (`ART-TODO.md` item 14);
  (b) "The collar punished me..." (her centipede-in-the-brain speech, line 877)
  is a third instance of the over-long-paragraph issue, flagged as especially
  urgent given how emotionally load-bearing it is (`SCRIPT-TODO.md` item 4,
  third instance).
- 2026-07-02: User asked for the whole chapter-14 cliff conversation to be
  visually anchored at the cliff edge throughout (currently generic sprite
  staging over `bg_cliff_sunset`; the good two-shot `cg_cliff_two` only shows
  up after the conversation ends), with her in armor (currently a casual dress
  in `her_free.still`) rather than her free/casual outfit. Confirmed the
  alone-then-he-appears sequencing is already correct and should be preserved.
  Recorded as a linked pair: `ART-TODO.md` item 15 (asset side) and
  `SCRIPT-TODO.md` item 22 (staging side) — flagged as a substantial restaging
  job, not a quick fix, and that the two should be coordinated together. Not
  implemented.
- 2026-07-02: User asked for Avram's sneakers to be removed from `cg_digging.png`
  (the grave-digging scene). Recorded in `ART-TODO.md` item 16, but flagged a
  conflict worth the user's attention: his Earth sneakers are an established
  *deliberate* continuity motif per `script.txt` line 66 ("keep in any full
  render"), set at his first full reveal in the opening. Filed as a likely
  scene-specific exception rather than a reversal of the general rule, but
  whoever implements it should confirm with the user first given it
  contradicts a standing note. Not implemented.
- 2026-07-02: User caught a real bug: a flash of `cg_gravestone_conjure`
  visible right before the chapter-15 close voiceover goes black. Root cause:
  `setVoiceover("on")` faded the black overlay in over 0.8s without clearing
  the CG layer first, so the stale gravestone image showed through during the
  fade. Fixed in `engine.js` (`clearCg("cut")` added when voiceover mode is
  exactly "on"); verified via Playwright that `cglayer` has 0 children
  immediately after the transition, and a screenshot mid-fade confirms no
  ghosting. Documented in `claude-notes/HANDOFF.md`'s engine-subtleties list.
- 2026-07-02: User gave three more art notes for the ending sequence, all
  recorded, none implemented: (a) `cg_dragon_hoard.png`'s Skagganauk and
  treasure pile need to be dramatically larger — explicit benchmark "30-story-
  office-building large" vs. the current room-scale rendering (`ART-TODO.md`
  item 17); (b) the "When the dance begins" beat (script.txt line 1006-1010)
  is staged as a standing sprite with a note saying "walking through the
  forest" instead of an actual CG — user wants a companion shot to the later
  `cg_burning_walk` (back-to-viewer, walking a forest path), just in the
  ordinary daytime forest (`ART-TODO.md` item 18); (c) `cg_tombstone.png` is
  completely blank — no carved lettering at all, the epitaph is only shown via
  engine text overlay. User wants real carved lettering if the art model can
  manage it, or carved runes with the translation shown as dialogue as a
  fallback — explicitly flagged as a deliberate exception to the documented
  "engine text over baked text" preference for this one asset (`ART-TODO.md`
  item 19).
- 2026-07-02 (session close): User **auditioned the SFX and rejected them** — "came out completely as music … basically do not work" (including the salvaged sword/impact one-shots; those were pulled from the manifest and archived as `claude-notes/raw/sfx_*_salvaged_FAILED.wav`). User was unsure what `sfx_silence-cut` was → explained in /HUMAN.md §3 (spec's reverse-cymbal whiteout sting; synthesized; still needs audition). User hit session limits and directed Claude to close down, leave notes for a less-smart model (→ `claude-notes/HANDOFF-AUDIO.md`) and write a human-readable to-do list for what OpenRouter couldn't do (→ `/HUMAN.md`: source 4 foley SFX from a sound library, audition 6 BGM + loop seams + silence-cut).
