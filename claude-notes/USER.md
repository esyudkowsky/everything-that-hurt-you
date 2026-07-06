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
- 2026-07-03 (Fable session, after the todo-12 pass): User (Eliezer, the author)
  gave style + art direction, all actionable now (not todo-prefixed):
  (a) **Prose style:** recently-added narration has too much "flashy language /
  eyeball kicks"; match his sparer style. The only place flash is appropriate is
  the slave auctioneer's patter. Scope confirmed by user: ALL session-added
  narration (auction rewrite, ownership transfer, ch-9 healer transition, boss/
  armor transitions, bridging beats); his own script.md-derived lines untouched.
  (b) **Expressions:** often too exaggerated for their lines — generate subtler
  artwork with the newer (Opus master-pipeline) style, e.g. prompt "subtly
  surprised" instead of "surprised"; audit every expression against the lines it
  appears over; no constant open-mouthed shock; Avram should not smile over
  somber content — he is *usually somber*, with some exceptions. Her "cheer"
  calibration (user choice): **bright but closed-mouth** — clearly sunny mask,
  not the current open-mouthed grin; distinct from fixed-smile/content.
  (c) **Sprite consistency:** old-gen sprites mixed with new-gen are jarring —
  found: avram.neutral + her.cheer + all 18 side-cast sprites + cg_nobleman_bid
  are still 07-02 old-generation. User: regenerate them all in the new style,
  BUT "if it's taking a lot of your time to do multiple tries on the art, stop
  and talk to me before proceeding. **Your thinking time is the expensive
  limiting constraint, not the art price.**"
- 2026-07-03 (mid-task follow-up): on repeated moderation problems with a
  specific image, user directed trying **the Grok image generator** for that
  image. Applied to `cg_nobleman_bid`: shipped from
  `x-ai/grok-imagine-image-quality` (composition brief nailed first try);
  gemini alternate kept in `claude-notes/raw/cg_nobleman_bid_gemini_alt.png`.
  Tone is grittier than neighboring gemini CGs — awaiting author verdict.
- 2026-07-03: User gave the in-world rationale for the sneaker removal (ART-TODO
  #16): Avram wouldn't wear Earth sneakers because they could **give him away as
  Summoned**. Hard worldbuilding rule for all future art — no Earth clothing
  tells on isekai-era Avram (Earth clothes are fine only in avram_earth /
  pre-summoning contexts like cg_tea_flash). Verified no sneakers remain in any
  shipped asset; stale references cleaned from ART-PIPELINE lesson 13
  (cg_regens.json is a superseded 07-02 prompt file, don't reuse verbatim).
- 2026-07-03 (same Fable session, later): User asked whether a revised full
  script matching the KN exists (it didn't — script.md rev. 3 had gone stale),
  and gave opening-scene direction, all implemented same session EXCEPT the
  master script which the user redirected to a handoff mid-task ("could be done
  by Opus instead of you. probably."):
  (a) **Master script rev. 4** — regenerate `claude-inputs/script.md` from
  `/script.txt` in enough detail that edits echo back to the KN → Opus handoff
  spec written at `claude-notes/HANDOFF-SCRIPT.md`; SCRIPT-CHANGES.md marks
  rev. 3 STALE with script.txt as sole source of truth meanwhile.
  (b) **Opening fix (confirmed not previously fixed):** the "From time to time,
  arises a Demon Lord" line must superpose over Avram's ARRIVAL image in Elhom
  (forest, shock) — **in retrospect a deliberate hint** (he's the Demon Lord).
  Implemented; staging note in script.txt warns not to restage it off that image.
  (c) **New truck prequel:** 3 CGs — Earth clothes, crossing the street, turning
  his head, seeing the oncoming truck — fading into the reworded first line
  **"I tell you now a tale of the planet, Elhom IV."** then "has a cycle" over
  the tea CG. Generated (cg_truck_cross/turn/see) and staged.
  (d) **Standing rule (re-stated; Opus had it but it didn't register):** in the
  opening, most text beyond the first scene must NOT sit on solid black — it
  superposes over graphics. Implemented: only the first line is on black; every
  later voiceover group letterboxes over its image (mapping follows script.md's
  own panel placements).
  (e) **Skagganauk font:** not previously resolved (real font file never
  existed; plain cream serif fallback). Per user: black text in white outline
  as the interim treatment → implemented in index.html `.voline` (black fill,
  white text-stroke, dark halo; legibility verified over bright and dark art).
- 2026-07-02 (session close): User **auditioned the SFX and rejected them** — "came out completely as music … basically do not work" (including the salvaged sword/impact one-shots; those were pulled from the manifest and archived as `claude-notes/raw/sfx_*_salvaged_FAILED.wav`). User was unsure what `sfx_silence-cut` was → explained in /HUMAN.md §3 (spec's reverse-cymbal whiteout sting; synthesized; still needs audition). User hit session limits and directed Claude to close down, leave notes for a less-smart model (→ `claude-notes/HANDOFF-AUDIO.md`) and write a human-readable to-do list for what OpenRouter couldn't do (→ `/HUMAN.md`: source 4 foley SFX from a sound library, audition 6 BGM + loop seams + silence-cut).

- 2026-07-03 (Opus session — prototype gate + title music + script rev. 4):
  Four directives, all completed:
  (a) **PROTOTYPE sign** added to the title screen (stamped placard, top-right;
  `#prototype-sign` in index.html).
  (b) **Kid-brother password gate** — password **"red flower rocket"** must be
  entered to start the game proper. Explicitly "don't bother with real security,
  just kid-brother security": implemented as a djb2-xor hash (`cf67cb57`) of the
  case/whitespace-normalized phrase in engine.js — plaintext is NOT in the source,
  but it's obfuscation, not crypto. Gate wraps Begin/Continue/Chapters on the title
  screen; unlocks for the rest of the page session once entered. Verified via
  Playwright (wrong pw rejected, correct pw with messy casing accepted, no leak).
  (c) **Title-screen music, two loops** (was the deferred HANDOFF-AUDIO todo; key
  was set this session). Generated via the existing Lyria pipeline: `bgm_title`
  (cheerful, shown before finishing) and `bgm_title_end` (somber, shown after
  `sv.fin`). Looped, added to manifest, wired into `showTitle()`. Same-melody-
  reharmonized ideal attempted via text description only (Lyria has no audio
  conditioning) — human audition still needed (added to /HUMAN.md §2).
  (d) **script.md rev. 4** written from /script.txt per HANDOFF-SCRIPT.md — full
  regeneration with the new "echo-able" bracket-asset annotations. Verified:
  dialogue parity 169=169 (0 diffs), asset parity complete, 15 chapter headings
  match. SCRIPT-CHANGES.md logs the rev.3→rev.4 diff and the now-INVERTED sync
  direction (author edits script.md → sessions echo into script.txt).

- 2026-07-03 (same Opus session, follow-up): User reported the previous
  Skagganauk treatment (black fill + centered white `-webkit-text-stroke`) read
  as "a thin line of dark surrounded by mostly white" — the centered stroke ate
  the glyph. User wants the classic MacOS **Outline + Shadow** font-variant look:
  dark text, white outline, dark shadow. Fixed in index.html `.voline`:
  `color:#1a1409` (warm near-black body), `-webkit-text-stroke:0.5cqh #f4efe1`
  with **`paint-order: stroke fill`** (draws the white stroke UNDER the dark fill
  so it becomes an outer outline instead of eating the letter), plus a directional
  dark `text-shadow`. Verified with screenshots over both pure black (first line)
  and a bright CG (final line over cg_burning_walk) — QA in
  claude-notes/qa/engine/skag_onblack.png + skag_overimage.png. Physical caveat
  noted to user: on PURE BLACK a dark body can't literally show, so there it reads
  as a bold white-outlined letter with a faint warm-dark core; over images it's
  the full dark-body engraved look.

- 2026-07-03 (Opus, opening-polish batch): several author directives on Ch.1 and Ch.2:
  (a) Over-image Skagganauk text: removed the darkened-edge gradient on `.vo-over`
  (text now sits directly on the picture) and removed the extra click-gate so text
  co-appears with each opening picture — THEN partially reversed per author: the two
  action-y slime CGs show first and reveal text ON A CLICK (@hold re-added); the town
  gate reveals text immediately; the guild reveals on a click.
  (b) "not supreme / but they fight" beat moved OFF bg_town_gate onto two NEW forest CGs:
  `cg_slime_backoff` (Avram subtly-nervous, backing off his first slime) + `cg_slime_rock`
  (Avram standing over it, killed by dropping a rock — clumsy first kill). SUBTLE
  expressions per doctrine. Author general note: "tell image models to go for subtle
  expressions if you don't want them hugely exaggerated."
  (c) Town gate = "Not uncommonly" (immediate); guild = "There is much...familiar" (on
  click). Both now use a NEW back-turned Avram sprite `avram.back` (proceeding toward the
  gate / facing the guild, not turned to viewer). Generated from the traveler master;
  bgremove auto-key failed (corner median skewed to g=110) so keyed manually on the
  magenta family.
  (d) avram_earth `shock`→`neutral` on the "Demon Lord" arrival (he expected to materialize).
  (e) Ch.1 last line gets a period: "...not one."
  (f) Bartender line "It's not that type of" was `avram wry` — read as a dopey grin; the
  wry sprite's INTENDED expression was "a dry wry half-smile, deadpan amused eyes" (dry
  self-aware wit). Swapped that beat to `avram neutral`. Author mused the wry sprite may
  not be good anywhere (5 other uses remain: script.txt lines ~200/330/422/550/566 — not
  yet touched).
  (g) Author dislikes the default `avram.neutral` as "dopey"; asked for "quietly
  determined" alternates. Generated 3 options in claude-notes/qa/avram_alts/
  (avram.determined_v1/v2/v3) — PENDING author's choice of whether one replaces the
  default avram.neutral globally. NOT wired in yet.

- 2026-07-03 (Opus, avatars + credits batch):
  (a) Default Avram avatar: author picked "quietly determined v3" to REPLACE avram.neutral
  globally (old soft neutral backed up at claude-notes/raw/avram.neutral_soft_backup.png).
  v2 became a new sprite `avram.eyes-narrowed` (for beats where Avram SUDDENLY focuses on
  something). v1 rejected (looked at viewer). Alternates kept in claude-notes/qa/avram_alts/.
  (b) Gaze failure mode (author): sprites that look AT THE VIEWER instead of toward
  center-screen are wrong unless specified. Regenerated `avram.wry` (was a dopey
  viewer-smile) and `avram.alarm` to look toward his front-right (his partner); added a
  gaze clause to their descs in make_expression_jobs.py. Rest of the avram set audited via
  claude-notes/qa/avram_gaze_audit.jpg — looked fine.
  (c) `bartender.startled` regenerated subtler (good eye only mildly widened, not bugged;
  scar-shut left eye preserved) — desc updated in make_side_jobs.py.
  (d) Conversation breaks (split long say-lines into click beats, dialogue text unchanged):
  bartender "...why I'm *asking.*" | "If the Demon..."; and "You know, maybe...why it's
  stupid." | "But if Summoned..." | "...continent?" | "Like, geez...". The "It's not that
  type of" and "You know, maybe" beats also switched off the wry sprite (not smiling moments).
  (e) Delivered a full LIST of further dramatic-beat break suggestions across the script
  (esp. the ch.14 cliff monologues, incl. the 725-char "The nobles know" block) + proposed
  `eyes-narrowed` placements — PENDING author approval, NOT yet applied.
  (f) NEW: Credits screen on the title (btn-credits-title). Lists: Original story outline
  by Eliezer Yudkowsky (CLICKABLE -> scrollable render of claude-inputs/original-script.md),
  Story transitions by Claude 5 Fable, Editing by Yudkowsky, Images managed by Fable 5 /
  Opus 4.8 / Yudkowsky, Images drawn by Nano Banana 2 and Pro, Music by Google Lyria 3.
  Engine: openCredits/openScriptView/renderOutline in engine.js; Esc + Back navigation.
  NOTE: the outline viewer fetches claude-inputs/original-script.md at runtime, so that
  file must be served with the app (fails gracefully with a message if absent).

- 2026-07-03 (Opus, opening-clothing + breaks workflow):
  (a) eyes-narrowed applied to TWO beats: auction bid "That, and the rest of it. All of it."
  (avram eyes-narrowed) and cliff "This is a very serious question...I could die." (NEW
  avram_late.eyes-narrowed generated from the late master). Both in manifest.
  (b) "And another rises / the Summoned Hero" restaged onto NEW cg_forest_trek = dirty Avram
  in ORIGINAL EARTH CLOTHES trekking the forest (was bg_road_dusty + avram neutral). For
  continuity, cg_slime_backoff + cg_slime_rock REGENERATED in dirty Earth clothes (no cloak).
  Cloak/armor first appear at the town gate (avram.back). New AVRAM_E descriptor in
  make_cg_jobs.py. bg_road_dusty now unused.
  (c) BREAK CONVENTION established: author marks "%" (space-percent-space) inline in
  script.md where a line should break into a new say-beat. Workflow chosen by author:
  I place SUGGESTED breaks as % in script.md; author deletes/moves; I FINALIZE (convert
  surviving % -> real line breaks in BOTH files) ONLY when the author requests. Applied
  the author's own 3 marked breaks already (bartender "Deathstorms"/"Sounds more like a
  villain's style"; Avram "If the Demon Lord..." with the author's "...doing. Whether..."
  polish). Then placed 32 suggested % across 10 long monologues (script.md lines ~275-914,
  esp. the 725-char "The nobles know" -> 6 breaks) — NOT yet finalized, script.txt still
  has those as single lines (parity intentionally diverges until finalize).

- 2026-07-03 (Opus, finalize breaks + cliff hand): Author reviewed script.md and kept all
  32 suggested % breaks. FINALIZED: converted every % to a real line break in BOTH files
  (10 monologues; dialogue beats 178 -> 210; parity 210=210, validator 0 errors). NOTE for
  future finalizes: the % marks live only in script.md, so after splitting script.md you must
  RE-SPLIT script.txt to match (align md beats -> txt) — a one-file split leaves script.txt's
  long lines intact and breaks parity. cg_cliff_base_aftermath regenerated: her outstretched
  hand is now bare skin + dark claws, NO fur (was too furry vs her other CGs); prompt fixed in
  make_cg_jobs.py.

- 2026-07-03/04 (Opus, large feature+art+restructure batch):
  ENGINE: (1) VN rollback — ArrowLeft/Up step back through displayed beats, ArrowRight/Down
  forward (advance at leading edge), End or click-while-reviewing returns to present & eats
  the input; uses history[] of blocking-stop pcs + seek(). (2) Shift held hides the dialogue
  overlay (#textbox), release restores. (3) Coordinated CHAPTER-TRANSITION FADE: at every
  @chapter boundary during forward play, a black curtain (#chapfade) fades in (~1.8s, old bgm
  fading via the trailing @bgm), holds, the new chapter's setup runs under black, then fades
  out as the new bgm fades in. Guards: reviewing/seek/rollback never fade; startChapterFade/
  finishChapterFade/cancelChapterFade in engine.js. Tested OK (ch1->2 black peak 1.0 -> reveal).
  MUSIC (new tracks via Lyria pro, looped, in manifest): bgm_montage (ch5-6 training-montage
  theme), bgm_campfire (ch8 intimate campfire theme). BGM changes now at 4->5 (montage),
  6->7 (tavern), 7->8 (campfire) — crossfading during the chapter fades.
  ART (several regens; Nano Banana PRO = google/gemini-3-pro-image via gen_style.py is the
  fix for instruction-following/gaze/anatomy trouble — flash often ignores it): cg_auction_fixed
  (same dais viewpoint + single figure), cg_ownership_transfer (hands clearly on collar + on
  Avram) + NEW cg_ownership_dark successor (runes extinguished, for "The runes go dark"),
  cg_knockdown (on grass, no posts), cg_slime_lecture (PRO: she looks at Avram not camera),
  cg_pamphlet_rules (campfire, no table/cup), cg_bedroll_transparent (PRO: clear translucent
  cutaway of BOTH of them side by side in a two-person bedroll — attempt 1 worked, tent variant
  not needed). Pamphlet English-cover CG dropped -> title shown as a text box ("My first slave:
  Rules for effective use."). "Master's wishes" beat -> her matter-of-fact.
  SCRIPT RESTRUCTURE (echoed from author's saved script.md via git diff): ch3 auction rewordings;
  ch5 now = training montage only; the pamphlet reading moved into ch6 (before the bedroll; old
  "Frost on the grass" intro cut); the guild/clerk/status scene moved to ch7's opening; several
  auction line edits + deletions ("That, and the rest of it. All of it." cut). All % finalized.
  SYNC WORKFLOW CONFIRMED: author edits script.md in the IDE; once SAVED, `git diff
  claude-inputs/script.md` shows the edits cleanly (script.md is committed), and I echo them into
  script.txt (dialogue text verbatim). git diff shows NOTHING until the file is saved — so the
  author must save (Ctrl+S) before I can pick edits up (enabling VSCode auto-save makes this
  seamless). Parity 212=212, validator 0 errors after the batch.

- 2026-07-04 (Opus, continuation batch): (a) Synced author's Ch9 (Healer) rewrite from
  script.md -> script.txt: the dungeon mishap is now a mountain-troll fight (club to the
  sword arm; his magic blasts its head off; wound slow to heal), walk-out/caravan/splint
  reworded (healer "insists on talking to his slave in private for a few coins"), Healer
  "That she doesn't know" -> "She doesn't know". Author left a BLANK "Avram:" beat after
  the healer's "sell her off" line -> rendered as a silent "Avram: ..." in both files
  (flagged: replace with a real line if intended). (b) BGM change 9->10: campfire theme ->
  bgm_montage for the parity montage. (c) Ch10 floor markers now show a DIFFERENT dungeon
  CG per floor (cg_dungeon_a corridor/16, cg_dungeon_b chasm-bridge/18, cg_dungeon_c pillar
  hall/20) and the flashing sign reads "Floor 16" not "16" (engine showFloor). Same pattern
  could be applied to ch12's floors 26/30/35 if wanted. (d) cg_ambush_ring regenerated (PRO):
  camera behind the pair so we see their backs as they face the ring of attackers (attackers'
  fronts visible), Avram's profile SUBTLY alarmed, hers harder. (e) Ambush confrontation
  ("We've no wealth worth your risk") -> avram eyes-narrowed (determined facing the bandit);
  the later "first to die by my hand" line kept sad-distant (deliberate grief beat).
  All validated: 0 errors, dialogue parity 213=213, app boots clean.

- 2026-07-04 (Opus, title + music-toggle batch): (a) Title byline "a kinetic novel..." and
  the content-warning notice were hard to read on the light sunset art — gave them a dark
  halo text-shadow + brighter cream color (like the h1) so light text separates from light
  bg. (b) Added a MUSIC ON/OFF toggle (#musicbtn, ♪, top-LEFT corner, z-index 60 so it shows
  above menus on EVERY screen incl. title/pause/endcard). Persists as settings.musicOn;
  toggleMusic() resumes the current st.bgm on / fades out on; playBgm respects musicEnabled
  (remembers st.bgm while muted so the toggle can start it). Muted state = dimmed note with a
  diagonal slash. NOTE: the earlier "title click doesn't start music" report was a false alarm
  (user's PC sound was off); browser AUTOPLAY POLICY is why music can't play before the first
  user gesture — the toggle/first click is that gesture. (c) cg_melee_flank had two Avrams ->
  regenerated via Nano Banana PRO with an EXACTLY-ONE-Avram constraint (single figure now).

- 2026-07-04 (Opus, music-toggle refinement): the corner ♪ icon now reflects ACTUAL playback,
  not just the preference. Added `audioUnlocked` (set true only when a real user gesture lets
  audio actually start). Icon shows the slashed/muted note when `!(musicEnabled && audioUnlocked)`
  — i.e. muted-looking on the title at load (autoplay-blocked) UNTIL the first click starts it,
  then it flips to ♪. Distinction preserved: if the user never muted, the first click (title or
  Begin) starts the music; if the user explicitly muted (settings.musicOn=false, persisted in
  localStorage across loads), clicks do NOT auto-start music and the icon stays muted until they
  click the button itself. Verified via Playwright with a mocked autoplay-block: default->muted-
  at-load-then-on-after-click; persisted-mute->stays muted on plain clicks, bgm_title starts only
  when the music button is clicked.

- 2026-07-04 (Fable, ch. 11 combat rework): Author flagged a story-logic hole around
  cg_lance_hit — "if Avram's valuable, why are they trying to kill him?" Author-specified
  fix, implemented this session: additional battle CGs + narration establishing the
  slavetakers fight to CAPTURE (Avram is merchandise); Avram takes his FIRST LIFE in a CG
  and keeps fighting without pause; the bandit captain shouts "Code mauve!" (verbatim
  author line — an in-world escalation/authorization code); then ANOTHER warrior (not the
  captain) aims the short black rod at Avram from the side; then cg_lance_hit
  (Haurvatat interposing); then a CG of her on the ground in front of Avram (same scene);
  then the slavetaker's existing post-strike lines; then the whiteout. Gore contingency
  the author gave (NOT needed in the end — Nano Banana drew the fallen panel clean with a
  scorched strike-mark): (1) generate her falling without gore and have Grok or another
  image AI modify it in; (2) failing that, show her wracked by a curse with blackly
  bulging veins — but DON'T let the generator overdo the veins instruction (author notes
  most image models overdo such instructions). Keep these fallbacks in mind for any
  future gore-adjacent panel.

- 2026-07-04 (Fable, follow-up on the combat rework): Author questioned where the "no gore"
  restraint came from — it is NOT an author request and never was. Author's actual standing
  preference: "it is fine to have blood where blood would realistically appear." Provenance
  of the old restraint, for the record: the "No gore beyond the strike itself" note on
  cg_lance_hit and the "dark stains, restrained" in the cg_scream_cutoff prompt were written
  by a prior Claude session (commit 42c1ff2), and this session's prompts extended that plus
  added its own conservatism. Do not silently sanitize violence going forward; if an image
  model refuses or a prompt is being softened for moderation-practicality reasons, SAY SO
  explicitly and use the author's edit-blood-in-afterwards workaround instead.

- 2026-07-04 (Opus, title/gate/music-fix): (a) FIXED music-icon race — clicking the ♪ icon
  as the very first interaction on a fresh title used to start AND toggle-off the music in one
  click (and persist an accidental mute). Now: unlockAudio skips the #musicbtn target, and
  toggleMusic treats "first click while blocked-but-enabled" as START-only (no mute); normal
  on<->off toggling only once audioUnlocked. Verified: 1st click starts music, 2nd mutes
  (persisted), and clicking on a persisted-mute title turns it on. (b) Title "EVERYTHING THAT
  HURT YOU" + byline lifted into the sky: wrapped in #title-head (position:absolute; top:10cqh)
  so it sits above the tree/heads; the notice+buttons stay bottom-packed. (c) Password gate no
  longer re-prompts a RETURNING player — requireGate() auto-unlocks if a save cookie exists
  (sv.pc>0 || sv.max>0 || sv.fin); fresh players still get the password. All browser-verified.

- 2026-07-04 (Opus, ch11 wound rework batch): synced author's script.md edits into script.txt
  (Slavetaker "...An easy, valuable drop."); "Code mauve" -> "Code black". Slavetaker sprite now
  SLIDES in from the right before the shout (new optional 4th @sprite token `slide` -> setSprite
  transform animation). DELETED cg_scream_cutoff (script + manifest + asset). Rod beat: NEW
  cg_rod_raise (an ordinary ambusher, NOT the captain, raising the glowing rune-carved rod) since
  bg_forest_road alone was too empty. cg_altar_everything: sword REMOVED (coins only). ART regens
  via Nano Banana PRO: cg_melee_press (unsuccessful grab + Light-flash), cg_first_kill (pressed,
  sword through the NECK, 2nd opponent + Haurvatat engaging two), cg_her_fallen (fallen+kneeling,
  Avram NOT kneeling), cg_whiteout (his own build, no spiked pauldrons), cg_carry_road (no
  hand-glow, nothing protruding from her). cg_lance_hit: 3 PRO candidates in
  claude-notes/qa/wound_candidates/ (default=candidate 2, her leaping from the right like
  cg_first_kill; swap _1/_3 if preferred). bg_temple_cot regenerated WITH Haurvatat in the cot.
  avram_late looked too old -> master regenerated YOUNG (same early-20s face, late armor) and the
  whole avram_late expression set + eyes-narrowed re-derived; make_expression_jobs.py descriptor
  updated to keep the youthful face. validate 0 errors, dialogue parity 214=214, app boots clean.

- 2026-07-04 (Opus, wound follow-ups): cg_lance_hit — the winning composition (author's
  "candidate 2": Avram left with bloody sword over a fallen enemy, Haurvatat leaping in from
  the RIGHT, purple magic lance to the chest) regenerated via PRO with an explicit HUMAN-FACE
  constraint (freckles + human nose/mouth + wolf ears, NO muzzle/snout) — shipped as v2_3
  (alts v2_1/v2_2 in claude-notes/qa/wound_candidates/). SKY CONSISTENCY: the big-fight CGs
  (cg_melee_flank, cg_melee_press, cg_first_kill, cg_her_fallen, cg_rod_raise) had mismatched
  sky shades; unified them with PRO image-EDITS ("reproduce exactly, change only sky/lighting")
  to a shared warm amber-gold dusk + slate-blue upper sky — compositions/faces/blood preserved.
  Pre-edit originals backed up at claude-notes/raw/prewarm_backup/ in case any edit degraded.

- 2026-07-04 (Opus, wound polish + flash/music + sync): FLASH/MUSIC BUG — a redundant
  "@bgm bgm_dungeon" (already playing) restarted the track right before a @flash; removed it
  AND added a general playBgm guard (no-op when the requested track is already playing; tags
  bgmEl.dataset.bgmId) so a duplicate @bgm / seek / chapter-fade re-applying the same track
  never restarts it. cg_rod_raise regenerated: ambusher AIMS the rune-rod in his RIGHT hand,
  leveled off-frame at Avram (not raised high); narration "off-hand"->"right hand". cg_lance_hit
  regenerated (v3_3): fixed Avram LIKENESS + Haurvatat human face (no muzzle) + other slavetakers
  still menacing in the bg. cg_her_fallen regenerated (v2_1): she's COLLAPSED all the way to the
  ground clutching the chest wound (not kneeling) + menacing bg. Alts for both in
  claude-notes/qa/wound_candidates/ (lance v3_1/2/3, fallen v2_1/2). SYNCED author's script.md
  edits into script.txt: Slavetaker "you WERE worth money... before you finish dying"; cg_melee_press
  narration "hands trying to grab"; Code black slavetaker sprite easy-menace->SNARL; attendant
  exchange reworked ("She saved my life." / "I'd save hers whether I was attached to her or not." /
  "Wow." / "I'd heard about guys like you, but I'd never met one in real life before." / "That poor,
  poor girl."); removed the trailing silent "Avram: ..." at ch11 end (flagged in-file as possibly
  unintended); added "Her: Yes, master." + an ARMORED her (matter-of-fact) sprite at the boss doors.
  Slavetaker avatar now shown over bg_forest_road (cut off the CG) for both Code black and the
  post-strike line, since CGs cover sprites. Parity 217=217, validator 0 errors.

- 2026-07-04 (Opus, CGs-no-longer-cover-sprites + boss art + sync): MAJOR LAYER CHANGE
  (reverses the informal-spec "cg covers sprites"): the DOM/z order is now bg -> CG -> sprites,
  so SPRITES RENDER ABOVE CGs. To keep pure-CG scenes clean, showCg() now auto-clears sprites
  (execClear all) and the seek replay clears st.sprites on @cg — so a bare @cg looks unchanged
  (sprites were invisible under it before), and to place a dialogue figure OVER a CG you set the
  @sprite AFTER the @cg. Verified: opening pure-CG beats have no stray sprites; slavetaker sprite
  now shows over cg_first_kill (Code black) and cg_her_fallen (post-strike) — removed the old
  bg_forest_road-cut workaround for both. cg_boss_fight + cg_boss_win regenerated (Nano Banana Pro,
  ref = young avram_late master; boss described in text to match cg_boss_bench's stone-and-shadow
  design) — Avram YOUNG and ALONE in both (first attempt using cg_boss_bench as a ref cloned the
  scene incl. Haurvatat; fixed by ref-ing only the Avram master + text boss description). Synced
  author script.md edits: "Her: You're getting frightening, Master." (dropped "It went quiet in
  there."); ch12 status overlay gained "Earth Magic: Lv 2 · Water Magic: Lv 3". Parity 217=217,
  validate 0 errors, app boots clean.

- 2026-07-04 (Opus, BG/CG merged into ONE scene layer): eliminated the separate #cglayer —
  @bg and @cg now both render to the SINGLE scene layer (#bglayer); a @cg replaces a @bg and
  vice versa (single-layer crossfade), which kills the cross-layer flash/ghost bugs that came
  from fading two layers at once. Refactor: setBg/showCg both swapLayer(#bglayer); clearCg now
  clears #bglayer (used by voiceover-on to go black); showCgInstant renders to #bglayer; seek
  replay makes st.bg/st.cg mutually exclusive (each nulls the other). The only remaining
  @bg-vs-@cg difference is semantic: @cg clears sprites (full art) + looks up manifest.cg;
  @bg keeps sprites (backdrop) + looks up manifest.bg. Sprites render ABOVE the scene layer, so
  @sprite after @cg puts a dialogue figure over a CG. #cglayer left in the DOM but vestigial
  (empty). Verified: opening bg<->cg transitions, voiceover-on clears to black / voiceover-over
  keeps the scene, sprite-over-CG composites (slavetaker over cg_her_fallen), no page errors,
  validate 0 errors. NOTE: this fully supersedes the informal-spec "cg covers background and
  sprites" — CG is now just a scene image on the same layer as BG, under the sprites.

- 2026-07-04 (Fable, boss fight/win CG redo): author flagged cg_boss_fight + cg_boss_win as
  off (fight: wrong cave-like chamber + drifted boss + Avram smirking; win: boss intact and
  looming, Avram facing camera looking frightened — read as about-to-die, not victory). Both
  regenerated via Nano Banana PRO (google/gemini-3-pro-image, gen_style.py — author says treat
  NB Pro as the STANDARD FALLBACK whenever anything goes wrong) using cg_boss_bench as a scene
  ref so chamber + boss design match exactly. NEW AUTHOR CANON: Haurvatat IS in the boss
  chamber during the fight — he fights alone but is not alone in the chamber; if the entrance
  doors are in frame she must be shown there silently watching (a closeup that crops the doors
  may show him alone). Rule added to ART-PIPELINE.md canonical decisions. Shipped:
  fight = raw/cg_boss_fight_v8 (Avram three-quarter back view, blazing sword + light-blast,
  Haurvatat watching from the door), win = raw/cg_boss_win_v3 (boss coming apart into shards,
  Avram spent, sword lowered, Haurvatat watching). Intermediates in claude-notes/raw/
  cg_boss_fight_v2–v8, cg_boss_win_v2. Validator 0 errors.

- 2026-07-04 (Opus, lance/fallen/vigil likeness fixes): recurring issue was Avram's complexion
  drifting DARK (his ref is light-olive; warm dusk backlight + ref drift darkened him, even on
  Pro). Fixed with an explicit "skin is LIGHT olive/fair-medium, do NOT darken, keep his face lit"
  clause. cg_lance_hit final = lit_3 (author-approved): dynamic MID-LEAP intercept (fierce, not
  surprised) + the lance now reads as an ungrabbable dark-energy BEAM (not a physical spear she
  grabs) + correct light Avram + menacing-bandit bg. cg_her_fallen final = lit_1 (fully collapsed
  clutching the wound, correct light Avram). cg_vigil regenerated with HER ref added ([HER, AV])
  + explicit two-tone russet-and-white hair w/ white fringe streak — she now looks like herself in
  the cot (was generated from text only, wrong hair). Backups of prior versions in
  claude-notes/raw/prewarm_backup/. Candidates in claude-notes/qa/wound_candidates/. validate 0 errors.

- 2026-07-04 (staging/sync pass): User made a batch of script.md edits and asked to echo them and reconcile script.md↔script.txt. Actions taken:
  - **cg_her_fallen** regenerated (Banana Pro): background slavetakers now ADVANCING toward Avram (were fighting each other), and she is fully COLLAPSED face-down on the ground clutching her wound (not upright). Chosen candidate = down_2. Old lit_1 backed up to claude-notes/raw/prewarm_backup/cg_her_fallen_lit1.png.
  - **Temple wake beat**: her sprite removed (she's already in the cot via the bed art); new **bg_temple_cot_awake** (eyes-open variant of bg_temple_cot) generated and used at "She wakes, bandaged." Removed the "She settles back, eyes closing" narration + her_temple sprite to match script.md (author had dropped it). bg_temple_cot (eyes-closed) now unused but harmless.
  - **"The great doors open. She is on her feet before he's through."** — deleted from script.txt (already gone from script.md).
  - **"She's asleep by the fire. Avram sits awake, looking at her."** — beat deleted from script.txt (already gone from script.md).
  - **Armor continuity**: her_camp→her (armored) for all pre-freeing ch13 beats (script.md 763/780/814 + 753 already done by author; script.txt 987/997/1012/1043). She stays armored like Avram from the dungeon through ch13; reverts to town clothes only at the ch14 cliff. NOTE: the ch12 market "New armor…" beat (script.txt 964 / script.md 740) was LEFT as her_camp — it's before the author's stated 753 boundary. → open question for user.
  - **Floor 30/35 montage**: added a new random dungeon CG **cg_dungeon_d** (rune-hall, Avram casting light, both armored) behind the floor-35 marker, matching the ch10 "a CG behind each floor marker" pattern.
  - **Chapter 14**: reworked to CG-only staging, NO character sprites (per user). Her ALONE at the edge first via new **cg_cliff_her** (Avram removed from the cg_cliff_two framing), then cg_cliff_two the moment Avram appears, held through the whole conversation. The former her_free "final-gentle" tired-smile sprite switch is DROPPED (the turn now plays in text). Synced in both files.
  - **Altar line**: echoed author change "Everything. Take everything." → "I'll pay whatever it takes." into script.txt.
  - manifest.json updated with the 3 new assets; validate = 0 errors; dialogue parity 217=217.

- 2026-07-04 (large rev.4 batch): echoed a big set of author script.md edits + art regens + engine features. Highlights:
  - **Dialogue**: many ch13/ch14 single lines split into separate beats (parity now 225=225); altar line "Everything. Take everything." → "I'll pay whatever it takes."; several sprite-expression tweaks in the freeing scene; "She stands still."→silence "..." beats + `@hold` pauses; the defeated final "Avram: Okay." now renders in **smaller/quieter text** via a new `@small` engine directive.
  - **her_free_armored.still** — NEW sprite: her armor, bare throat (no collar), "still" absent expression; used from the collar-removal beat through ch13 (she keeps armor until the ch14 cliff, where she's in town clothes).
  - **Aftermath (ch14 end)** — author parenthesized every narration line = show-don't-tell; converted all those CG beats to silent `@hold` (CG + click, no onscreen text).
  - **Art regens (Banana Pro)**: cg_her_fallen (down_3: wolfgirl clearly, fully down, Avram subtly alarmed — worry_1); cg_sick (now the consistent daytime hillside, leaning to be sick, not the night graveyard); cg_grave_open (over-shoulder, no stray head); cg_gravestone_conjure (filled mound + rising slab); cg_dragon_hoard (MUCH larger — skyscraper dragon, vast cavern); ALL cg_cliff feet planted (standing still); cg_cliff_alone regenerated = new cliff_two minus Haurvatat (was obsolete old-Avram); cg_cliff_step = Avram at the very brink; cg_cliff_her feet fixed. Backups in claude-notes/raw/prewarm_backup/.
  - **Ch15**: cg_dragon_hoard appearance moved up — letters render OVER the hoard for two lines then black out again; added cg_forest_walk + **whiteout+hiss** (`sfx_hiss`, needs asset — see /HUMAN.md) before cg_burning_walk.
  - **Announcer**: removed the doubled announcer sprite over cg_auction_sexy (his line now plays over the CG).
  - **BUG FIX**: opening Skagganauk voiceover lines were vanishing before any click — a prior `@voiceover off`'s deferred 800ms hide-timer fired after the next line showed. Now cancelled when the layer re-shows. Verified in browser.
  - **Engine features**: (1) returning to title straight from the finale KEEPS Skagganauk's music (bgm_void); the somber bgm_title_end plays only on a fresh reload of a finished save. (2) Settings has a red two-click "Delete all progress" that wipes the save and restores the original title theme. (3) The Chapters screen (from title) now shows a **Music jukebox** of every BGM heard so far — title theme, all story tracks, and bgm_title_end once finished — each clickable to play. All three verified in a headless browser (no page errors).

- 2026-07-04 (follow-ups): (1) Finale whiteout hiss now reuses **sfx_silence-cut** (the same hiss as the earlier big whiteout at the wound) instead of a new sfx_hiss asset — HUMAN.md task retired. (2) **cg_slime_rock** regenerated: Avram with controlled fear (was dopey satisfaction), a bigger/scarier acid-slime being squished, and a smaller realistic rock he's throwing. (3) Avram's **materialization** beat (script.md line 54 / arrival) changed from `avram_earth neutral` to **`avram_earth strained`** (new sprite generated) — arrival now reads tense/strung-out, not composed.

- 2026-07-04 (aftermath lighting + finale polish): coordinated relight of the death→burial sequence to a coherent DAWN/sunrise progression (author: "sunrise not sunset when Haurvatat dies; base of cliff in shadow; light brightening"). Warm cliff-top (cliff_step) → warm descent (cg_float_down, resunset→dawn) → SHADOWED base: cg_cliff_base_aftermath (dim shadow, now a wolf-girl FURRY-CLAWED arm with a large blood pool spreading from the arm's off-frame source, not just under the hand), cg_digging + cg_sick both dim/shadowed and matching (cg_sick now matches cg_digging's lighting/grass with Avram's head turned aside to be sick) → brightening: cg_grave_open (grey daylight) → cg_grave_filled (regenerated: a real FILLED mound, warm dawn — was a night shot) → cg_gravestone_conjure (regenerated: upright headstone rising at the HEAD of the mound, dawn light consistent with grave_filled). Backups in claude-notes/raw/prewarm_backup/.
  - **Skagganauk voiceover text**: fill is now absolute black (#000, was #1a1409) with a thinner white outline (0.3cqh, was 0.5cqh) — "he is a void dragon, he speaks in black." Verified in browser.
  - **Finished-title notice**: after the story is finished the title's content-warning is replaced by "This story is meant to be read twice. Please do not spoil it for others." (id #title-notice, swapped in showTitle by sv.fin). Verified in browser.

- 2026-07-04 (grave-sequence consistency pass): reworked the whole burial run for consistency. cg_sick: Avram now clearly turned away, being sick onto bare open ground with NO grave hole near him (was retching into the grave). Removed the stray green cloak draped on the rocks and made the ground CONSISTENTLY grass-free across cg_digging / cg_sick / cg_grave_open / cg_grave_filled / cg_gravestone_conjure (grass was "suddenly growing"). Fixed grave_filled Avram likeness + a clean filled MOUND, and made grave_filled ↔ gravestone_conjure mutually consistent (same mound; stone rises UPRIGHT at the HEAD of the grave). Model note: GPT Image 2 (openai/gpt-image-2) was 500-ing via OpenRouter, and Banana Pro's fill-state clarity was weak, so the grave sequence (digging/sick/grave_open/grave_filled/gravestone) was regenerated with **Riverflow (sourceful/riverflow-v2.5-pro, --image-only)** — best composition-following, no moderation issue for a grave scene. Backups in claude-notes/raw/prewarm_backup/.

- 2026-07-04 (voiceover layout + slime sync): (1) Skagganauk voiceover lines shown in series no longer shift the older lines when a new line appears beneath them. The engine now PRE-LAYS-OUT the whole voiceover group as hidden (opacity-0) placeholders when the group starts (prerenderVoGroup scans ahead to the next @voiceover directive), then reveals each line in place — so the block height/position is fixed and earlier lines never move. Seek/resume rebuilds the full group and reveals the read count. Verified in browser: first line moves 0px when the second appears. (2) cg_slime_backoff regenerated to show Avram encountering ONE LARGE slime (Banana Pro), synced to the big slime in cg_slime_rock — the two forest-clearing encounters now match. Backups in claude-notes/raw/prewarm_backup/.

- 2026-07-04 (voice acting feasibility question): User asked whether voice acting can be
  done through OpenRouter, and whether a different API key is needed. Answer: YES via
  OpenRouter with the existing `OPENROUTER_KEY` — `openai/gpt-audio` / `openai/gpt-audio-mini`
  are the only speech-output models on OpenRouter (no ElevenLabs or dedicated TTS carried).
  Verified working this session with a live test line ("Everything that hurt you — I
  remember it all.", weary-older-man read, voice "ash") → sample saved for audition at
  `claude-notes/qa/voice_test_ash.mp3`. API quirks (same family as Lyria's): `stream: true`
  required for audio output, and when streaming `audio.format` MUST be `pcm16` (mp3
  rejected) — decode base64 `choices[].delta.audio.data` chunks, concat, then
  `ffmpeg -f s16le -ar 24000 -ac 1` to mp3. Transcript in the stream matched the requested
  line verbatim (use it as an automated fidelity check). Cost measured: ~$0.00026/line on
  mini (~$0.06 for all ~218 dialogue lines; full gpt-audio ~10-50x that, still trivial).
  Constraints told to user: OpenAI preset voices only (alloy/ash/ballad/coral/echo/sage/
  shimmer/verse/…), no voice cloning; it's a chat model performing the line, so tone is
  steerable by prompt but per-line verbatim + consistency needs QA; Claude cannot audition.
  A different key (e.g. ElevenLabs) would only be needed for higher-grade acting/cloning.
- 2026-07-04 (voice-acting trial, follow-up): User's two desiderata for VA: (a) voice
  constancy, (b) correct intonations; suspects intonation is the blocker unless there is
  a channel to tell the engine about context/delivery. Directed a 4-passage trial (two
  characters, contrasting emotions) BEFORE any engine changes or full voice pass. Done —
  `claude-notes/qa/voice_trial/`: avram_market_awkward + avram_first_kill_promise (voice
  "verse": ashamed stumbling speech vs. quiet sad death-promise) and her_name_number_cheer
  + her_collar_centipede (voice "sage": sunny-mask joke vs. flat trauma recount). Model
  `openai/gpt-audio` (full, not mini; ~$0.015/line, $0.058 total), per-character SYSTEM
  prompt (constancy) + per-line scene context + delivery direction in the user message
  (the intonation channel — gpt-audio is a chat model, so it takes direction like an
  actor). All 4 transcripts verbatim. Generator script kept at scratchpad only (trivial to
  recreate; prompts recorded here). AWAITING AUTHOR AUDITION. Told user: strongest
  outside-OpenRouter options if intonation disappoints = ElevenLabs v3 (inline audio tags
  like [whispers]/[sobbing], voice design, best-in-class acting) and Hume Octave
  (context-conditioned acting by design); both need their own API keys.
- 2026-07-04 (voice-acting, round 2 — ElevenLabs): User auditioned the 4 gpt-audio trial
  samples and REJECTED them ("pretty terrible when it comes to emotionality") — gpt-audio
  lane is effectively closed for acting quality. User added `ELEVENLABS_KEY` as a Codespace
  secret; it synced to `/workspaces/.codespaces/shared/user-secrets-envs.json` but does NOT
  appear in already-running shells (read it from that JSON; a codespace restart would put it
  in env proper). Key verified: FREE tier, 10,000 chars/month — enough for trials; a full
  pass (~18k chars of dialogue + tags) needs a paid tier, which ALSO matters because free
  tier is non-commercial + attribution-required. Regenerated the same 4 trial passages with
  `eleven_v3` (stability 0.0 "creative", inline audio tags like [nervous]/[flat, drained])
  → `claude-notes/qa/voice_trial/*_11l.mp3`. Casting: Avram = "Will" (bIHbv24MWmeRgasZH58o,
  young relaxed male), Her = "Jessica" (cgSgspJ2msm6clMCkdW9, young bright female) — preset
  picks for the trial; voice DESIGN (text-described custom voices) is available if these
  don't fit. AWAITING AUDITION. Caveat: ElevenLabs returns no transcript, so no automated
  verbatim check on this lane (tags are interpreted, not spoken — but ears must confirm).
  User also asked for a larger aggregator carrying Hume: answered NO — Hume Octave is not
  on OpenRouter/Replicate/fal.ai/Bedrock/Azure/Vertex; direct signup at platform.hume.ai
  only (has a free tier). Expressive-TTS models that ARE on aggregators (fal.ai/Replicate):
  MiniMax Speech-02, Dia, Chatterbox, Orpheus — a fal.ai key would unlock several at once.
- 2026-07-04 (voice-acting, round 3 — diagnostic): User auditioned the ElevenLabs v3 round-2
  samples: still "a bored voice actor reading off the words without thinking about what they
  mean"; unsure whether the limit is the model or insufficient context/direction supplied.
  Built a disambiguation set on the hardest line (her centipede/collar speech), all in
  `claude-notes/qa/voice_trial/`: centipede_A_bare (no direction — floor), C_maximal +
  C_maximal_take2 (heavy mid-sentence tags + performance punctuation; two takes to show
  take variance), D_control_sobbing (SAME WORDS, opposite emotion — if D sounds like C,
  tags do nothing and it's the model), E_scene_dialogue (whole cliff exchange incl. Avram's
  apology via the /v1/text-to-dialogue endpoint — ElevenLabs' real context channel; 37s,
  target line performed mid-scene). Objective pre-signal: same words span 7.7s→17.2s across
  directions, so pacing direction lands; emotional truth = author's ears. Interpretation
  rules given to user: D≈C → model limit → Hume/other; D wildly ≠ C but C still hollow →
  channel works, direction/context needs to get richer (scene-context dialogue endpoint +
  multi-take-and-pick workflow). Take variance (13.6s vs 17.2s for identical input) means
  a production pipeline should generate N takes per emotional line regardless.
- 2026-07-04 (voice-acting, round 4 — Hume Octave): User added `HUME_KEY` Codespace secret
  (found key page at app.hume.ai/keys after browsing trouble). API gotchas: Cloudflare
  blocks python-urllib's default User-Agent with 403 error 1010 — send a browser UA;
  auth header is `X-Hume-Api-Key`; acting `description` requires `"version": "1"`
  (Octave 1; not yet on Octave 2 per docs). Ran the same 4-passage trial →
  `claude-notes/qa/voice_trial/*_hume.mp3`. Voices DESIGNED from text prompts and SAVED
  to the Hume account as reusable custom voices "Avram" (early-20s light baritone,
  somber, understated) and "Haurvatat" (young woman, bright practiced cheer over
  something guarded) — design-audition files hume_avram_voice_design.mp3 /
  hume_her_voice_design.mp3. Each trial line got: saved voice + ≤100-char acting
  description + `context.utterances` = the actual preceding scene lines (unsynthesized
  context the model reads for meaning) — the context channel the user suspected was
  missing from earlier attempts. AWAITING AUDITION vs the gpt-audio and ElevenLabs sets.
- 2026-07-04 (voice-acting, round 5 — Hume facts-context + recast): User's verdict on
  round 4: "could maaaybe end up working." Directions given: (a) give Hume MORE context —
  specifically FACTS about what's happening rather than emotion-keyword direction ("Hume
  might know more about which situations sound like what than your own guess"); (b) recast:
  wolfgirl came out Scottish (funny, wrong) — wants a burr/purr in her voice, American;
  Avram sounded too old — a little (not tons) younger and higher, "21, not 14"; (c) try
  additional lines and additional voices. ALSO: user confirmed the earlier ElevenLabs
  centipede A/C/D diagnostic — C vs D sounded much different (so tags DO steer that model)
  but both "just not well-voiced in context". Done this round, all in
  claude-notes/qa/voice_trial/: 6 new voice designs saved to the Hume account
  (Avram_v2a/b/c — 21yo light tenor variants; Haurvatat_v2a/b/c — husky burr/purr
  variants, explicitly NOT Scottish/British) with audition files hume_avram2_*_design.mp3 /
  hume_her2_*_design.mp3; 5 NEW lines generated with candidate-A voices + facts-based
  context (narrator utterance of plain scene facts + preceding dialogue in
  context.utterances; description field also factual): avram_altar_pay_hume2 ("I'll pay
  whatever it takes."), avram_okay_final_hume2 (the single-word cliff "Okay."),
  her_wake_wanted_hume2, her_frightening_hume2, her_anomaly_hume2. Voices are swappable
  to v2b/v2c without regenerating context work. API note: free tier rate-limits (~a
  dozen requests/min → 429; backoff works). AWAITING AUDITION.
- 2026-07-04 (voice-acting, round 6 — directed "Okay."): User confirmed the one-word
  "Okay." was the right pure-context test AND that it failed — "didn't come out remotely
  correct for the context of a tiny voice in a very sad situation." So facts-only context
  is insufficient on Hume; user directed adding explicit stage directions. Generated 5
  directed variants in claude-notes/qa/voice_trial/ (voice Avram_v2a, cliff-scene facts
  kept as context except v1): v1_dironly (direction only, no context), v2_facts_dir
  (facts + "tiny defeated voice barely above a whisper... the word almost fails him"),
  v3_slow (same + speed 0.6 + trailing_silence 2.5s), v4_whisper ("breath more than
  voice; total surrender"), v5_ellipsis (text "... Okay." + speed 0.7). Durations spread
  0.7s→3.7s, so direction+knobs strongly move pacing. CONFIRMED: Octave 2 API-rejects
  the description parameter (400) — acting instructions are Octave-1-only for now.
  AWAITING AUDITION: the author's target read = "a tiny voice in a very sad situation."
- 2026-07-04 (voice-acting, round 7 — recipe validation): User's audition of the directed
  "Okay." variants: **v5 (ellipsis text-nudge + facts + direction) strongest/most emotional;
  v2 (facts+direction) full of tension, matched the scene; v1 (direction-only) followed
  direction and would suit the @small tiny-text rendering; v3 speed-knob NOT audible vs v2;
  v4 whisper = wrong emotion.** → Production recipe: facts-narration context + preceding
  dialogue + explicit stage direction + performance punctuation (ellipses/commas) in the
  text, words kept verbatim; speed knob unreliable, whisper-direction overshoots. Applied
  the recipe to the 4 original passages → *_hume3.mp3 in claude-notes/qa/voice_trial/
  (richer ~2-sentence narrator facts incl. character interiority, e.g. "cheerfulness is a
  skill she learned the way soldiers learn to march"). AWAITING AUDITION — if these
  generalize, next steps are the production questions: N-takes-per-line curation workflow,
  where direction lives (script.txt directives vs sidecar job file), and engine wiring.
- 2026-07-04 (voice-acting, round 8 — recipe refinements from hume3 audition): Two author
  corrections to the recipe: (1) added ellipsis pauses made "Then I suppose" WORSE —
  "Avram is sad about that, not slow about it" — performance punctuation is NOT a
  universal ingredient, only for literal hesitation (the "Okay." case); pauses read as
  tempo, not grief. (2) The number-joke narrator facts were "waaaay too fancy for some
  poor Hume LLM" (the soldiers-learn-to-march interiority line) — write context PLAIN and
  literal for the model, not literary. Regenerated both lines, 2 takes each (variance is
  large): avram_first_kill_promise_hume4_t1/t2 (script punctuation restored, direction
  "Sad, not slow. Normal speaking pace."), her_name_number_cheer_hume4_t1/t2 (facts
  reduced to 3 plain sentences; direction "Cheerful, quick, teasing. She is joking. She
  sounds happy."). AWAITING AUDITION. Recipe so far: plain-facts narration + preceding
  line + simple direction; text-nudges only where hesitation is literally in-character;
  2+ takes per emotional line.
- 2026-07-04 (voice-acting, round 8 audition results): number-joke takes t1/t2 came out
  NEARLY IDENTICAL (simple direction + plain facts → low take variance; no explicit
  quality verdict from author). First-kill: BOTH acceptable — first acceptable Avram
  emotional reads of the whole trial — with t2 preferred; t1 "needlessly slower and more
  dramatic". Pattern: Hume errs toward over-drama, so house direction style should
  default to understatement ("normal pace, understated") and takes-curation is mainly
  needed on emotionally heavy lines (plain lines barely vary; one take suffices).
  Production go/no-go and remaining design questions (direction authoring for all ~226
  beats, paid tier, engine wiring, curation workflow) NOT yet decided — awaiting author.
- 2026-07-04 (| mid-line pauses + script.md sync + ch3 expressions): (1) `|` in narration/dialogue is a mid-line PAUSE (VN click-to-continue) — symbol is fine. Engine splits a line on `|` into segments, types to the pause, shows the arrow, and a click reveals the next segment in the same box before the beat advances (rollback/review shows the full line). Verified. (2) Synced script.md edits: removed "bartender turns away"; auction bid now a "large magical core" ("takes Avram's core, gauges him"); dropped "The binding passes..."; ch3 dropped "Avram exhales." and split "Um." onto its own line; ~10 new `|` pauses. Parity 226=226. (3) Ch3 deal scene: Avram is `discomfort` THROUGHOUT (removed stray avram neutral/wry); Haurvatat's mid-scene `matter-of-fact` change now reflected in script.md.

- 2026-07-04 (BIG rev.4→rev.5 sync + engine features): processed a large batch of author script.md changes.
  - **Chapters restructured 15→13**: renames (Opening→Arrival, The Bartender→Bartender, The Auction→Auction, She Teaches Him→Teaching, The Healer→Healer, Parity→Together, The Wound→Ambush, Inversion→Rising, The Freeing→Stronger, The Cliff→Truth); NEW ch4 **Meeting** split from the auction; ch4 Naming / ch6 Bedroll / ch8 Campfire headings removed (merged into neighbors); Tavern boundary moved so the guild-hall floor-nine beat ends ch5. validate_script.js chapter check updated to 13.
  - **Content**: ~40 dialogue rewords + `|` mid-line pauses; ch1 voiceover reorder; ch2 new bartender "unusual drop / Guild buyers" exchange; auction bid is now a "large magical core"; ch7 Healer gets the **cg_mountain_troll** beat (Avram's arm crushed; Haurvatat fighting her own troll in the bg) + healer rewords; ch10 **adventurer gossip expanded** (new **Adventurer 3** speaker added to engine; lady-Hero rumor) with the 3 adventurers staged on-screen (adventurer1/2 existing + new **adventurer3** sprite, awed+laughing); status overlay moved to after the floor-markers; "You're getting frightening"→"Your strength has risen"; altar "I'll pay whatever it takes" removed; ch12 final-gentle smile now put up (author retry); parity 232=232.
  - **Engine — auto-advance**: new `@autoplay <ms>`/`@autoplay off` (scoped auto-advance, honored even with global Autoplay off) + `@slow` (per-line slow typing). The ch12 "Goodbye, Master." types slowly, then the aftermath CGs **auto-advance ~3s each** into ch13 (a click still advances + restarts the timer; a click landing on an auto-advance is merged ~250ms). Browser-verified: auto-advanced cliff_two→…→sick with no clicks.
  - **Engine — status screens redesigned**: skills listed vertically, levels right-aligned; the engine now TRACKS the last level shown per skill and shows a **prior→new arrow (bold) only where a prior was shown**, animating the numbers up **on a click**; brand-new skills just show their level. Verified on the ch8 and ch10 status screens (fits, correct arrows).
  - **Art**: cg_mountain_troll (young Avram, dungeon), cg_tombstone regenerated with the corrected epitaph "died 7028" + trailing period, adventurer3 sprite. Backups in claude-notes/raw/prewarm_backup/.

- 2026-07-04 (follow-up art/sprite fixes): cg_mountain_troll — trolls now wield ONLY clubs (no sword); Haurvatat keeps her sword in the bg. cg_nobleman_bid — the kneeling woman now has her own runed slave collar. **Ch10 gossip adventurers made DIFFERENT people** from the ch6 tavern pair: retagged speakers to Adventurer 4/5/6 (added to engine SPEAKERS) with NEW sprites — adventurer4 (bald, mustache, plate), adventurer5 (dark-skinned, locs), adventurer6 (auburn woman, formerly adventurer3), each with neutral + awed + jeering/laughing so the plain lines use a neutral face. script.md gossip speakers retagged too; parity 232=232, validate 0 errors.

- 2026-07-04 (release-prep + finale/UI polish): stripped the PROTOTYPE placard and the password gate (requireGate now passes straight through). Finale whiteout now HOLDS at full white through the whole 7s hiss (`@flash <color> <fadeMs> <holdMs>`; sfx preloaded at boot so the hiss starts instantly). After Skagganauk's last line, one click goes straight to FIN (removed the trailing @hold; endCard clears the voiceover instantly). Status screen: 3-column [name | old Lv | →new Lv] — only the new level + arrow are bold; new-to-the-screen magic is hidden until the click then appears as "Lv 0 → Lv N" with its name, and existing skills' old values stay fixed (no shift). Ch12 (Truth): all standalone "..." are now silent pauses (no text) in both files. Post-game title notice is now two centered lines: "This story benefits from being read twice." / "Please do not spoil it for others." The settings hamburger now also shows top-right on the title (opens Settings; z-index raised above menus). cg_slime_backoff regenerated with Riverflow (backing AWAY from the slime while LOOKING AT it — Gemini kept getting it wrong). Synced the author's script.md edits (split the "New armor…" narration; "trying out putting"→"putting"). Verified in browser; validate 0 errors, parity 232=232.

- 2026-07-05 (script.md sync + UI: chapter progress, screenshot-hide, sfx trim, Lyria length probe):
  - **Synced all script.md edits since last commit into script.txt** (parity 230=230, validate 0 errors): first status screen now AVRAM-only "→ Lv 6 / → Lv 2" (SLAVE line dropped); tavern "Three"→"Two adventurers"; "Outside" sprites avram discomfort→unreadable + her cheer→matter-of-fact; removed stray avram-unreadable before "revisit later"; healer rewrites ("Afterward the healer seems willing", "not well enough to fool my level of social Skills", "On my Skill's read?", NEW healer line "I'm telling you this much…Don't prove me wrong", "long run with her." period, removed "Your coin, your slave."); attendant/avram line-merges with `|`; camp avram_late neutral→hollow + "Am I wrong?"→"Am I correct?" + Her "I haven't been helping you much inside of dungeons"; slap + "You weren't so bad" `|`; pause before "I was… afraid"; "real hard part"→"hard part".
  - **Removed stray narration** the author never wrote: "She stands still and doesn't say anything." + "Avram looks at her." (freed scene → no text until "You can take some time to think"); "Sunset. She's standing on the edge of a cliff…" + "Avram is suddenly standing behind her." (cliff). Preserved the her-alone-first beat with a silent `@hold` between cg_cliff_her and cg_cliff_two.
  - **final-gentle repositioned**: added a **`center` sprite slot** to the engine (spr-center at left:42%, wired through setSprite/clearSlot/execClear/applyDim/seek) so `@sprite her_free final-gentle center` OVERLAYS her cliff-self in cg_cliff_two (reads as her turning to face us) instead of the old `right` which blocked Avram. `@clear center` disappears it before "Goodbye, Master." Browser-verified visually.
  - **Screenshot-hide upgraded**: Shift now hides ALL corner UI (dialogue box, voiceover text #volines, music btn, menu btn, chapter indicator), not just dialogue. NEW: toggling **Caps Lock ON while a scene is shown** does the same but STICKY until the next advance (for screenshots without holding a key); if Caps was already on when the scene was entered, nothing hides (intentional — avoids inscrutable always-hidden UI). Advancing (or blur) clears the caps-hide.
  - **Chapter display is now tri-state** FULL / NUMBER / OFF (was a boolean). Default (and delete-all-progress restore) = **NUMBER**. Shows **N/TOTAL** where TOTAL = SCRIPT.chapters.length (not a hardcoded 13): NUMBER="Ch. 2/13", FULL="Ch. 2/13 · Bartender". Old boolean settings migrate (true→full, false→off). **Clicking the chapter indicator opens the chapter list.** Music icon moved DOWN (top:6.2cqh) so it no longer collides with the indicator. Verified in browser.
  - **sfx_silence-cut lead-in trimmed**: the 7s hiss had ~2.6s of near-inaudible swell; trimmed the first 2.16s (0.5s before the 2% audible point) + 15ms fade-in → now 4.84s (backup: prewarm_backup/scratchpad). Retuned the finale whiteout hold from `@flash white 1400 6800` to `1400 4640` to stay in sync with the shorter hiss.
  - **Lyria 3× length: NOT possible.** A "~9 min / 540s long-form" prompt for bgm_wistful still returned 174.6s (Lyria pro has a fixed ~3-min ceiling, no duration API param). Skipped per the author's "if Lyria can't go longer, skip"; old tracks left untouched. Evidence in claude-notes/qa/longmusic/.
  - **cg_back_to_back**: swapped from b2b_2 to **b2b_3** (author: b2b_2 "has not-Avram in it").

- 2026-07-05 (Skagganauk legibility scrim): author confirmed the primary desideratum for the voiceover lettering: **Skagganauk the Void Dragon speaks in void-black** — the glyphs themselves must stay black; legibility fixes go BEHIND them, never into them. Chosen fix (from options offered): a soft-edged frosted scrim on `#volines::before`, scoped to `.vo-over` only — `backdrop-filter: blur(1.1cqh) brightness(0.68)` + rgba(0,0,0,.26) fallback background, feathered by a radial-gradient mask (35%→98%). It fades in/out with #volayer's own opacity transition at the group's prerendered size, so no pop and no reflow. Pure-black `on` mode gets no scrim. Verified via headless-browser before/after screenshots (first ch1 over-image voiceover: black glyphs no longer sink into Avram's dark jacket / tree bark). This partially revisits the 2026-07-03 "no darkened edges" call, but localized to the text block and author-approved.

- 2026-07-05 (LESSONS handover): author asked for a LESSONS.md distilling this whole project for a fresh Claude starting a NEW visual novel from scratch (USER.md helpful but not primary/exclusive source; skill files optional and LESSONS must not depend on them). Delivered: **claude-notes/LESSONS.md** (self-contained — architecture to copy, script-language primitives that turned out to be needed, author-collaboration norms, art/audio pipelines with model rosters and closed lanes, engine bug patterns as day-one rules, reader affordances, process/verification standards, top-ten fresh-Claude mistakes) + two portable skills at **claude-notes/successor-skills/** (vn-art-pipeline, vn-audio-pipeline) meant to be copied into a new project's .claude/skills/. Synthesized from full reads of USER.md, all HANDOFF-*/TODO/pipeline docs, tools/, HUMAN.md, engine.js + index.html dated fix comments, and persistent memory. Left uncommitted (author commits manually; only the Skagganauk scrim was commit-authorized).

- 2026-07-05 (Skagganauk rev.3 — outline only): author judged the scrim version "still blerg"; per his direction the lettering is now void-black fill + white outer stroke ONLY — drop shadow removed, frosted backdrop scrim removed (both rejected). CSS note updated in index.html (.voline "Rev. 3"). Verified by headless screenshot over the ch1 forest CG: clean separation, no smudge. Committed+pushed per standing authorization for this fix.

- 2026-07-05 (title consultation): author asked Claude to try suggesting a better title for the whole work. Claude's recommendation after a full script reread: KEEP "Everything That Hurt You" — it's the epitaph's promise with the self-serving half ("and maybe then I'll feel better") cut off, comforting on the cover and devastating in retrospect. Alternatives offered and self-culled: "Always Two" (twist-forward but cold), "The Customs of My People" (his excuse, wrong center of gravity), "Maybe Then I'll Feel Better" (aims at his guilt, gives away futility), "Warmth Only" (undersells the world-scale ending). No author decision recorded yet.

- 2026-07-06 (cliff jump clarity + washed-text legibility): a viewer didn't register that Haurvatat had jumped off the cliff. Author's fix: (1) new CG **cg_cliff_edge** — a cg_cliff_two variant with Avram left exactly in place but Haurvatat moved forward to stand on the very lip/brink of the cliff; generated via gen.py from cg_cliff_two + cg_cliff_alone refs, 1376×768. (2) Retimed the aftermath so it auto-advances **1s per frame UP TO cg_cliff_edge** (Goodbye/cliff_two/cliff_edge all at @autoplay 1000), then **@autoplay 3000 kicks in after cliff_edge** so she stands on the brink for 3s before the CUT to cg_cliff_alone (she's gone) — giving the reader time to register poised-then-jumped. cliff_edge→alone stays a hard CUT (abrupt vanish). (3) Also echoed the `|`-pause waits the author added to script.md in Skagganauk's "When the world has stayed in its course too long | ... | they come." line.
  - **Washed Skagganauk text legibility**: black Cinzel on a half-white-faded CG (the "over"/vo-wash mode, boxless, sat low) was still hard to read, worse after being moved down. Author's fix (NOT an outline, NOT the old scrim): a **soft white blur strictly beneath the black glyphs** — `#volayer.vo-wash .voline { text-shadow: 0 0 0.55cqh #fff ×3 }` (≈blur radius 4). Lifts the void-black letters off the busy faded foliage without touching the glyphs. Verified by headless screenshot over the ch1 forest wash. Consistent with the standing rule: Skagganauk's glyphs stay pure void-black, legibility fixes go BEHIND them.

- 2026-07-06 (ch7 bgm + status-screen skill reveal + character-likeness CG rerolls, toward v1.1): batch of fixes, author reviewing before commit.
  - **ch7 bgm**: ch7 (Healer) opens in a dungeon (troll fight) then walks to the caravan/healer's camp. Added `@bgm bgm_dungeon` at ch7 start (was inheriting bgm_campfire from ch6) and `@bgm bgm_campfire` back at the `bg_camp_night` healer's-camp beat. Author flagged the dungeon theme thus plays only briefly — intended. Echoed to script.md.
  - **Status-screen NEW-skill reveal**: on non-first status screens, a brand-new skill (never shown before) now hides its TITLE until the reveal click and fades it in **bold** together with its `→ Lv N` (e.g. Air/Light/Dark Magic in ch8). Already-known skills that merely rose keep their titles visible; only `→ Lv N` fades. Impl: engine.js showStatus adds `pending`+`skill-name-new` to the name cell when `isNew && !isFirstScreen`; revealStatusIncreases now clears ALL `.pending` in #status-lines; CSS `.skill-name.skill-name-new{font-weight:700}`. NB: the SLAVE (Haurvatat) block first appears in ch8, so her Wolf-School row also bolds/fades-in (engine has no prior for her) — author aware.
  - **Character-likeness CG rerolls** (all via NB Pro = google/gemini-3-pro-image; added `--model` flag to gen.py):
    - **cg_whiteout**: the six disintegrating shadows around Avram were reading as "goons in business suits". Regenerated (flash edit, refs: current whiteout + slavetaker.easy-menace) so they read as armored mercenary BANDITS (pauldrons/chainmail/baldric/hip-sword), then per author made them MORE blacked-out + more disintegrating while KEEPING Avram's central black-headed silhouette untouched. Final = v4, promoted.
    - **cg_dungeon_d** (not in make_cg_jobs — separate CG): had a not-quite-Avram + "weird Haurvatat" (hair wrongly split half-white; missing collar; awkward face). Flash EDITS kept producing weird faces → author suggested a different generator / from-scratch. **NB Pro from-scratch** (refs: avram_traveler_master + her_armor_master) gave a clean full-body two-shot (correct white FRINGE streak, dark-iron slave collar, natural faces). Promoted. LESSON: when flash edits keep mangling faces, a from-scratch NB Pro reroll beats iterating edits.
    - **cg_vigil**: Avram wasn't reading as reference-Avram. Tried flash edit, NB Pro edit, NB Pro from-scratch, and NB Pro with **bg_temple_cot as a room reference**. KEY FINDING: feeding bg_temple_cot (which shows Haurvatat on her side at a fixed side-on angle) makes NB Pro copy that exact viewpoint AND her side-lying pose — it would not reangle or put her on her back, because the room reference dominates. Author settled on **room2** ("good enough") — grounded in the real room decor, Avram in the chair, attendant in the doorway. Promoted.
  - Version stays **v1.0.3**; author is driving toward a **v1.1** once all fixes land (bump at release, not per-fix).

- 2026-07-06 (ch13 vo-box fade fix + awake-room door + more script.md echoes):
  - **Tiny floating box bug**: on `@voiceover off` (non-instant), engine cleared `#volines` innerHTML IMMEDIATELY while `#volayer` was still fading out over 800ms — an empty `#volines` collapses to just its padding, showing the grey-fill + jagged clip-path + violet-glow as a tiny "mini text box" that lingered for the whole fade (most visible on ch13's "on"→CG transitions). Fix (engine.js setVoiceover): keep the text+box in place through the fade and clear innerHTML only in the voHideTimer callback after the layer is hidden (instant path clears immediately). Verified headless: box stays full-size (998×262) with content through the fade, clears at 550ms. 
  - **bg_temple_cot_awake door**: cg_vigil (room2) puts the attendant in a right-wall doorway, but the after-she-wakes background had no such door, so it "disappeared" on transition. NB Pro edit added a matching right-wall doorway to bg_temple_cot_awake while keeping the chair EMPTY and Haurvatat (awake) + everything else unchanged. Promoted.
  - **script.md echoes**: campfire two-shot — Avram → `neutral` for his "I hate lying…" line (was wry on her preceding line); market beat — `avram_late` → `unreadable` on "New armor…"; collar line reworded "putting a collar back on you" → "putting a collar on you".

- 2026-07-06 (vo-box fix, corrected — supersedes the timer-defer approach above): the earlier "keep text+box through the fade, clear on an 800ms timer" fix REGRESSED the ch13 dragon bubble: off -> dragon CG -> `@voiceover bubble` run in ONE step, and the deferred bubble pre-renders into #volines right after the off; the late timer then wiped that content, so the first click revealed an EMPTY tiny box (the "weird white patch"). Cleaner fix (author hinted the banner handling was overcomplicated):
  - CSS `#volines:empty { background:none; clip-path:none; filter:none; padding:0; }` — an emptied box carries NO chrome, so it can never flash as a stray mini-box. This lets setVoiceover("off") clear #volines IMMEDIATELY again (no timer race).
  - The deferred ("over"/"bubble") exec path now enforces its own invariant: hide #volayer (display:none, opacity 0) + cancel any pending voHideTimer BEFORE pre-rendering, so a preceding off-fade can't leave the pre-laid-out box visible over the CG. Verified headless: off->dragon shows ONLY the dragon (layer w/h/op = 0), bubble reveals with full text on the next click; ch1 "over" wash still reveals fine.

- 2026-07-06 (ch13 bubble->on "box jump"): going straight from the dragon speech-BUBBLE ("...one of them is this:", box low over the CG) to the black "on" narration ("Always two they are...", box centred) cut instantly, so the speech box looked like it JUMPED from the low position to the centre. Fix = a real fade-out/fade-in crossfade:
  - Restored the box FADE-OUT on `@voiceover off` (keep #volines content through the 0.8s layer fade, clear on the timer) — the earlier :empty-immediate-clear made the box POP instead of fade. Safe now because the deferred over/bubble path already cancels that timer + hides the layer before pre-rendering (so the dragon-bubble white-patch stays fixed — re-verified).
  - script.txt: at that beat, `@voiceover off` + `@pause 850` + `@voiceover on` — the bubble fades out over the dragon, a beat of black, then the whitewash "on" box fades in centred. Verified headless: bubble (cy 557) fades to op 0, then "on" box (cy 360, centred) fades in with "Always two they are" — no jump. ch1 "over" wash + dragon-bubble reveal both still correct.

- 2026-07-06 (Skagganauk caption should fade to the next scene in UNISON, not first): on the "Down and down..." (on) -> dragon transition, the caption+black backdrop were CUT instantly (voDisp:none from t=0) while the dragon faded in — so the caption vanished before the scene arrived. Cause: the deferred over/bubble exec path (added for the white-patch fix) instant-hid #volayer, cutting the preceding @voiceover off fade. Fix: the deferred path no longer touches the layer OR pre-renders; it just records st.voDeferredPc and lets the off fade-out run to completion (caption fades 1->0 in unison with the incoming CG 0->1). The group is pre-rendered lazily when its first line reveals (narrate exec). White-patch stays fixed (nothing pre-rendered during the fade => no flash; reveal lays it out fresh). Verified headless: voOp 1->0.68->0.10->0 while bgOp 0->0.22->0.95->1; ch1 wash + dragon-bubble reveal + bubble->on crossfade all still correct.
