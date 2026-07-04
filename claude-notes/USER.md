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
