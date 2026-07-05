# LESSONS.md — Handover to a Claude starting a new visual novel from scratch

Written 2026-07-05, at the end of building "Everything That Hurt You" (a kinetic
novel by Eliezer Yudkowsky: vanilla-JS engine, ~130 AI-generated images, 8 AI
BGM tracks, 13 chapters, shipped). Everything below was learned by doing it,
usually the hard way. Where this file and your instincts disagree, trust this
file — several entries are conclusions from experiments that already failed
once and were rejected by the author.

Two companion skill files exist at `claude-notes/successor-skills/` (art
pipeline, audio pipeline) — copy them into the new project's `.claude/skills/`
if you like, but **this file is self-contained; do not depend on them.**

---

## 1. Architecture that worked — copy it wholesale

The entire app was `index.html` + `engine.js` + `script.txt` + an
`assets/manifest.json`. No framework, no build step, served statically.
This was never a limitation.

- **The script compiles to an instruction list; the only state is `(script, pc, maxPc)`.**
  Save = a tiny record `{pc, max, fin, ts}` written to BOTH localStorage and a
  cookie on every displayed line (belt and suspenders; load takes the newer
  `ts`). No save UI at all — for a choice-free novel, an integer program
  counter IS the save file.
- **Seek = silent replay.** One function resets fresh state and re-executes
  instructions 0..target applying *state effects only* (bg/cg, sprites, tint,
  bgm, voiceover-group progress, overlay levels, chapter), then renders the
  result instantly. This single function powers resume, chapter jump, and
  rollback. Never serialize visual state; derive it from the script.
  *Trap to avoid this time:* the state-effect switch inside seek() had to be
  kept in lockstep with the live exec() by hand. Derive both from one
  state-effect table.
- **Rollback/backlog are derived too**: history of pcs at blocking stops;
  backlog rebuilt on demand from the script up to pc — always correct after
  any jump.
- **One scene layer, not two.** BG and CG share a single crossfading layer with
  replace semantics. Separate bg+cg layers cross-fading independently caused a
  whole class of ghost/flash bugs before they were merged. A figure over a CG =
  set the sprite *after* the CG (`@cg` auto-clears sprites).
- **Size everything in `cqh`.** One `#stage` div with `aspect-ratio: 16/9`,
  `width: min(100vw, calc(100vh*16/9))`, `container-type: size`; every font,
  gap, button inside is in cqh units. The whole UI scales with zero JS. Mobile
  portrait = a CSS-only `rotate(90deg)` media query gated to
  `(pointer: coarse)`; cqh resolves against the pre-transform box so nothing
  else changes.
- **Assets are indirected through `manifest.json` and every miss degrades
  gracefully** (labeled placeholder card for images, silent no-op for audio).
  The game was playable at every stage of asset production. Keep this.
- **Exact-geometry UI (textbox frame, status frame, placeholder card) is drawn
  programmatically with PIL, not AI-generated.** Anything needing precise
  pixels or true alpha is code.
- **Export the parser for Node** (`module.exports` escape hatch) so the
  validator uses the REAL parser, not a reimplementation.

Do differently next time:
- Declare speakers (and their sprite prefixes / default slots) in the script or
  manifest, not hardcoded in the engine.
- Don't hardcode the chapter count anywhere — derive "Ch. N/TOTAL" and the
  validator check from the script. (Ours had a hand-maintained literal that
  went stale across a 15→13 restructure.)
- Give story-specific overlays (status screens etc.) a plugin seam instead of
  parsing their text format inside the engine.
- Menus: use a tiny screen-stack instead of ad-hoc `style.display` toggling
  with breadcrumbs — ours grew an unmaintainable Escape-key else-if chain.
- Gapless BGM looping wants Web Audio decoded-buffer loops from day one; MP3 in
  `<audio loop>` has ~50ms codec edge padding and clicks (we shipped with the
  click; open item forever).

## 2. The script language — what a VN engine turns out to need

Line-oriented plain text. `@directive args`, `Speaker: text` for dialogue
(allowlisted speakers), bare lines = narration, `@note` for comments (use them
liberally — the script becomes its own changelog).

Start with the minimum set (`@bg`, `@cg`, `@sprite`, `@clear`, `@bgm`, `@sfx`,
say/narrate) but KNOW you will need all of these — every one was added on
authorial demand:

- `@hold` — textbox hidden, wait one click (the "silent panel"). Used constantly.
- `@voiceover on|off|over` — a narrator layer with TWO modes: on black vs
  superposed on the scene. The distinction was an author restaging need.
- `@textbox hide|show` — explicit control (screams, wordless beats).
- `@pause <ms>` — timed wait, no input.
- `@flash <color> <fadeMs> [holdMs]` — holdMs holds full color (finale whiteout).
- `@tint night|dusk|firelight|off` — scene lighting without new art.
- `@autoplay <ms>|off` — SCOPED auto-advance for cinematic runs, honored even
  when the global autoplay setting is off.
- `@small` / `@slow` — per-line typography/timing modifiers, implemented as
  stateful prefixes attaching to the next line (good authoring ergonomics).
- `|` mid-line pause token — typer stops at each `|` awaiting a click; measure
  font-fit against the FULL text so size never changes mid-line.
- `@chapter <n> <title>` — drives menu, indicator, and a coordinated
  black-curtain transition (old bgm out, new chapter's setup runs under black).
- `@montage begin/end`, `@overlay ... end` blocks for CG sequences and
  RPG-status screens.
- `"..."` as dialogue = legal silence panel.
- Crossfade is the default `@bgm` transition; hard `cut` existed and was used
  exactly once, by design. Keep such rarities documented in the script header.

**Two-file split.** The author writes a prose master (`script.md`, with
bracket-annotations for assets); the engine runs a stage script (`script.txt`)
with expressions and staging. Rules that kept this sane:
- State IN WRITING which file is currently the source of truth. Ours inverted
  direction mid-project; the explicit declaration is what saved it.
- Author edits arrive as `git diff` on the committed prose master (ask the
  author to enable editor auto-save, or diffs lag reality).
- Echo dialogue verbatim; sync every line-edit to BOTH files; report dialogue
  parity as a count ("232=232") after every sync. Automate the parity check.
- If you split a line in one file, re-split it in the other — a one-file split
  silently breaks parity.
- The `%` break-mark workflow worked well: Claude proposes line breaks as
  " % " inline in the author's file; author moves/deletes them; Claude
  finalizes into real breaks in both files only on request.
- Fallback narration written to cover missing art becomes redundant the moment
  the art ships — audit and cut it.

**Validator** (run after every batch; exit-1 gate): unknown directives; every
asset id resolves in the manifest (audio missing = warning only, it's
optional); every manifest path exists on disk; chapter numbering contiguous;
voiceover/montage balance (no dialogue inside, no unclosed blocks); slot-
convention lints (each lead character owns a side of the stage); a simulated
click-through that counts blocking beats; an unused-asset report (repeatedly
useful — it found existing expressions that satisfied "new art" requests).

## 3. Working with the author

- **The user is the author and has final creative say.** He can override any
  prior session's "deliberate — do not fix" note. If a request contradicts a
  standing note, surface the conflict ONCE, then proceed on his word.
  Creative authority does not extend to engineering judgment calls.
- **"todo:"-prefixed messages are FILED, not implemented** — into the right
  TODO file, with full context (line numbers, verbatim user quotes, cross-
  references, scope warnings), so they read as ready-to-execute briefs.
  "todo ... you can go ahead and do now" is a green light despite the word.
  If a filed todo is a genuine live-build breakage, mark it high-priority but
  still only file it.
- **Thinking time is the scarce resource, not API cost.** Art is ~$0.004/image;
  the standing rule was "if it's taking a lot of your time to do multiple
  tries, stop and talk to me." One well-specified generation beats a retry loop.
- **Prose style: spare.** No "eyeball kicks" — no vivid similes or writerly
  flourishes in Claude-added narration (one flamboyant in-world character was
  the sole exemption). Never restyle the author's own lines. Recurring tics he
  had to correct: over-long paragraphs in one textbox (split into beats),
  stage directions leaking into displayed narration, the Claude tic of
  characters "looking at their own hands", exaggerated emotion everywhere.
- **VN prose is not book prose**: prior lines aren't visible, so callbacks must
  be self-contained ("I really, really do." → "I really, really have to.").
- **Never invent content restraints.** A "no gore" softness traced back to a
  prior Claude session's own conservatism, not the author. His rule: blood
  where blood would realistically appear. If you soften a prompt for
  moderation reasons, SAY SO and offer the generate-clean-then-edit-it-in
  workaround. Keep decision provenance traceable (who decided what, when).
- **Flag ambiguities instead of guessing**; when 4+ small issues cluster in one
  scene, propose a combined pass rather than point fixes. Author feedback
  usually carries a generalizable principle — record the principle, not just
  the fix, in a running USER.md.
- **The author commits manually. Never commit unasked** (he may explicitly ask;
  then do it).

## 4. AI art pipeline (the method that held identity across 130+ images)

Roster as of 07-2026, all via OpenRouter (`POST /api/v1/chat/completions`):
- `google/gemini-3.1-flash-image` ("Nano Banana 2", ~$0.004/img) — bulk
  workhorse; does BOTH text-to-image and reference-image editing, which is
  what makes character consistency possible. Whole art set cost $1–2.
- `google/gemini-3-pro-image` ("Nano Banana Pro") — **author-designated
  standard fallback whenever anything goes wrong** (gaze, anatomy,
  instruction-following).
- `sourceful/riverflow-v2.5-pro` — best aesthetics and best at hard
  composition briefs, BUT Sourceful moderation 422s dark themes Gemini
  renders fine. Escalation ladder on a stubborn image: NB Pro → Riverflow.
- `x-ai/grok-imagine-image-quality` — fallback for content Gemini
  stochastically refuses; its chroma key drifts hot-pink, so CGs only.
- API quirks: image catalog only via `GET /models?output_modalities=image`;
  pure-image models need `"modalities": ["image"]` ONLY (adding "text" →
  404); refs go in as `image_url` data-URLs; aspect via
  `"image_config": {"aspect_ratio": "16:9"}`; result is a data-URL at
  `choices[0].message.images[0].image_url.url`; `.strip()` your env key
  (a trailing newline broke auth). No size knob (~880×1180 sprites,
  ~1380×776 bgs) — plan an upscaler if you need bigger.

**Method — masters first, everything else is an edit:**
1. Generate ONE master sprite per character-outfit on flat chroma magenta;
   QA it hard. Every later asset inherits its look.
2. Expressions = master ref + "change ONLY the facial expression to X".
   Outfits = master ref + "same face, now wearing Y" (then that raw refs its
   own expression set). CGs = character master(s) as refs + scene text +
   "IGNORE the flat magenta backgrounds of the references".
3. The magenta incantation matters verbatim: "single flat uniform BRIGHT NEON
   MAGENTA, exactly #FF00FF at full brightness, like a greenscreen chroma key
   — no gradient, no vignette, no darkening." A short "magenta background"
   drifts dark and breaks keying. Chroma removal: auto-detect the key from
   corner-pixel median, clamp tolerance when the key isn't bright magenta
   (a wide tolerance around a dark key once ate russet hair), erode + blur
   the alpha, and warn if <5% of pixels were removed.
4. Save EVERY verbatim prompt as a job file (`jobs/*.json`); batch-run with a
   thread pool; contact-sheet every batch and look at it with vision. Fold
   fixes back into the job generators so regens emit corrected art.
   **Skip-if-exists is a trap**: after any style recast, `--force` everything
   and then verify by file dates — ours silently stranded the two most-used
   lead sprites at the old design.
5. Back up every replaced asset; keep pre-cutout raws (they're the editing
   refs for future additions); keep candidate sets in qa/ for author picks on
   load-bearing sprites.

**Prompt lessons (each one was actually hit):**
- Emotion prompts overshoot ("pale with horror" → corpse-white). Author
  doctrine: prompt "subtly X", describe the mechanics, AND state the negative
  ("mouth CLOSED, no teeth visible", "NO tears").
- Gaze: models default to looking at the viewer — give explicit gaze clauses
  ("looks toward his front-right", at the scene partner).
- Restate defining features (scars, species anatomy like "human face, NO
  muzzle", traits not visible in the waist-up master like a tail, skin-tone
  locks under strong lighting) in EVERY edit prompt — they silently vanish.
- Duplication: over-shoulder shots grow second figures — "EXACTLY ONE FIGURE
  in frame ... no disembodied limbs."
- Genre contamination: a grave scene grew crosses and a shovel — deny the
  trope explicitly, with the in-world reason ("he dug with his bare hands").
- Matched before/after CG pairs: generate one, then EDIT it ("Reproduce this
  EXACT scene ... remove the woman. Do not move the camera.") — never
  generate both from text. Same trick fixes sky/lighting mismatches across a
  sequence ("reproduce exactly, change only the sky").
- Never use a full scene CG as a character reference — it clones the whole
  scene, unwanted people included. Ref the character master + describe the
  scene in text.
- In-image text: short block letters work; otherwise ask for "greeked/blurred
  placeholder lines, NO real words" and overlay engine text. Engine text over
  baked-in text is the default policy.
- Moderation refusals are SILENT (finish_reason stop, no image, no error) and
  STOCHASTIC — retry once, reword the tripping noun (usually a body/age
  descriptor), then switch models. Record which providers block which themes
  before committing a model to the whole set.
- Record canonical character-design decisions the spec doesn't pin down
  (exact hair color, eye color) and worldbuilding rules that constrain art
  ("no Earth sneakers — they'd out him as Summoned") in ONE pipeline doc,
  so a full redo is possible.

## 5. AI audio pipeline — and the closed lanes (do NOT retry these)

**BGM via Lyria works.** `google/lyria-3-pro-preview` ($0.08/track, ~2–3min)
or `-clip-preview` ($0.04, ~30s), via OpenRouter. `"stream": true` is
REQUIRED (non-streaming 400s); base64 MP3 arrives in `delta.audio.data`; the
streamed TEXT is your vocal check — `<instrumental>`/`[[A0]]` markers good,
real lyric words = vocals leaked, regen with louder negatives. Output is
already normalized. Prompt formula that went 6-for-6 first try: (1)
"Instrumental background music for a fantasy visual novel" + the scene
in-fiction, (2) concrete instrumentation, (3) emotional register including
what it is NOT, (4) "even dynamics throughout, suitable for seamless
background looping", (5) hard negatives: "Strictly instrumental, NO vocals,
no singing, no big finale/ending swell."

- **Length is fixed at ~3 min.** No duration param; "make it 9 minutes" was
  ignored (returned 174.6s). Longer ambience = looping, not generation.
- **Lyria always ends on a fade-out.** Loopability is MANUFACTURED: trim
  leading quiet + trailing fade (windowed RMS vs track median), equal-power
  crossfade the last 2s into the track's own head, start the file 2s in.
  Rerun the loop tool after every regen.
- **Foley via generative music is a CLOSED LANE** — every attempt (fire,
  crowd, sword, impacts) came back as music; even salvaged single hits failed
  the author's audition. Foley = free sound library (human task) or, for
  exact-behavior stings, deterministic synthesis in code (numpy → WAV, so
  there's no codec smear at a hard cut).
- **Voice acting lane history:** `openai/gpt-audio(-mini)` works technically
  (stream:true + `audio.format: pcm16` only, ~$0.06 for a whole script on
  mini, transcript = free verbatim check) but was REJECTED for emotionality.
  ElevenLabs v3: tags steer it, still "bored voice actor" — closed. Hume
  Octave was the live lane: direct key only (no aggregator), browser UA
  required (Cloudflare 403s python-urllib), `X-Hume-Api-Key` header, acting
  `description` needs `"version":"1"`, free tier 429s ~10 req/min. Validated
  recipe: context = PLAIN-facts narration + preceding line, written literally
  not literarily; default direction to understatement (Hume errs
  over-dramatic); ellipses only for literal in-character hesitation; don't
  use the speed knob or whisper directions; 2+ takes on heavy lines (high
  variance), 1 take on plain lines.
- **Claude cannot hear. Say so up front.** QA substitute: ffmpeg
  `showspectrumpic`/`showwavespic` contact sheets, seam images (last 4s +
  first 4s butted), volumedetect. This catches structure/clipping/loop-hostile
  dynamics but NOT mood or foley-ness — a human audition is a mandatory final
  gate; file it in HUMAN.md with the riskiest tracks named and the feedback
  format pre-scripted ("regenerate bgm_X, sounds like Y, should sound like Z
  — one command, eight cents").
- Same-melody variants (cheerful↔somber reharmonization) are text-description-
  only (no audio conditioning) — don't promise it; a contrasting piece is the
  pre-authorized fallback.
- Trim SFX lead-ins to the audible point, and retune any engine timings synced
  to the asset's length.
- "Music doesn't play" reports: check browser autoplay policy and the user's
  speakers before debugging the engine (both happened).
- Codespaces: new secrets don't appear in running shells — read
  `/workspaces/.codespaces/shared/user-secrets-envs.json`.

## 6. Engine bug patterns — adopt these as rules from day one

Each of these shipped as a bug first:

1. **Every deferred hide/removal carries a cancellation token.** An 800ms
   fade-out-hide timer from `@voiceover off` fired after the next `over`
   showed, vanishing the fresh line. A pending sprite-slot wipe needed a
   generation counter to abort when a newer sprite took the slot. Rule:
   cancel pending timers whenever a layer re-shows; version-stamp deferred
   DOM destruction.
2. **Idempotent audio commands.** Re-requesting the currently-playing BGM
   (duplicate `@bgm`, or a seek re-applying it) must NOT restart the track —
   key the element by track id. Guard fades so a superseded fade-in can't
   clobber a newer track's volume.
3. **Autoplay policy: separate preference from capability.** `musicOn`
   (persisted setting) vs `audioUnlocked` (first real gesture). The mute icon
   reflects ACTUAL playback. The global unlock listener must EXCLUDE the mute
   button, or the first click both unlocks and mutes. A persisted mute must
   not auto-start audio. Decode long SFX at boot or their first play is late.
4. **Never move already-rendered text.** For progressive reveals (voiceover
   groups, status screens), pre-lay-out the whole block as opacity-0
   placeholders, then reveal in place; put later-appearing values in their own
   pre-reserved grid columns. Verified standard: "line moves 0px".
5. **Text opacity animation inside a transformed (rotated-mobile) stage
   subpixel-shifts** — force a compositing layer on the text
   (`translateZ(0); will-change: opacity; backface-visibility: hidden`).
6. **Text-over-art legibility**: a centered `-webkit-text-stroke` eats the
   glyph — use `paint-order: stroke fill` for an outer stroke. Know the
   escalation options (drop shadow; a feathered `backdrop-filter` scrim
   behind the text block, masked radial gradient + rgba fallback, scoped to
   the over-image mode) — but on THIS project the author ultimately rejected
   every darkening aid as smudge ("blerg"): full-width letterbox gradient,
   drop shadow, and the localized scrim all came out again. Final form was
   dark fill + white outer stroke ALONE. Lesson: authors may prefer a
   less-technically-legible but visually clean treatment; offer the aids,
   don't assume they'll stick, and make each one trivially removable.
7. **Seeks/resumes must never trigger presentation effects** (chapter fades,
   autoplay) — arm those only around click-driven stepping.
8. **Preload ahead** (scan the next ~24 instructions for assets at every
   blocking stop) and make every missing asset a graceful no-op.
9. **Settings migrate.** A boolean became tri-state; loadSettings merged over
   defaults with explicit old-shape migration. Plan for it from the start.

## 7. Reader-facing affordances that turned out to be expected

- Autosave every line (no save UI), Continue on title, chapter jump menu that
  unlocks as read.
- Rollback: arrow keys walk history of blocking beats (no typing animation in
  review); click while reviewing returns to present and EATS that click.
- Hold-Ctrl skip that hard-stops at furthest-read (never skips unread text).
- Hide-UI for screenshots: hold Shift hides ALL corner UI (not just the
  textbox); CapsLock = sticky hide until next advance; if Caps was already on
  at scene entry, do nothing (avoids inscrutable always-hidden UI); window
  blur clears sticky states.
- Scoped auto-advance for cinematic runs; a click during it advances AND
  restarts the timer, with a ~250ms merge window so a click landing on an
  auto-advance doesn't double-fire.
- Settings: text speed, autoplay + delay, skip behavior, tri-state chapter
  indicator (full/number/off, clickable → chapter list), music toggle
  reachable on every screen (z-index above menus), two-click delete-all-
  progress that also resets settings.
- Dialog font auto-fit: pre-measure and step down sizes so long paragraphs
  never clip.
- First-run hint ("Click, tap, or press Space"), shown once ever.
- Post-completion touches the author cared about: title music continuity
  depends on HOW you reached the title (straight from the finale keeps the
  finale theme; a fresh reload of a finished save gets the somber variant);
  a jukebox of tracks heard so far; a spoiler-courtesy notice.
- Corner widgets accumulate and collide — do a collision pass whenever one is
  added.

## 8. Process — how the multi-session build actually stayed coherent

- **Verification standard: a real headless browser, every time.** Playwright
  against `python3 -m http.server` (fetch() means file:// never works).
  The e2e drove: mid-read resume, a full click-through to the end card
  (double-key clicks to finish the typer, periodic waits to absorb
  auto-advance), cookie+localStorage presence, chapters unlocked, chapter
  jump with DOM read-back of the reconstructed scene, page errors and
  HTTP≥400 collected. Screenshots archived as evidence. "It should work" was
  never accepted; batch close-out line was "validate 0 errors, parity N=N,
  app boots clean."
- **Handoff docs are the backbone.** Structure that worked: date + intended
  audience + reading order + an authority claim ("trust this file over your
  judgment — these are failed-experiment conclusions"); DONE-do-not-redo
  first; then UNDONE with full plans (draft prompts, exact wiring snippets,
  expected cost); then **CLOSED LANES with the rejection evidence archived on
  disk** (`raw/*_FAILED.wav`) — the single strongest pattern in the repo;
  known-subtle bugs listed with "don't reintroduce" rationale; concrete
  verification numbers a successor can re-run and compare.
- **Scope tasks by model tier** ("mechanical, no creative decisions — if a
  judgment call seems required you've drifted out of scope") — sessions hit
  context limits repeatedly and handoffs were written for a possibly-smaller
  successor.
- **Where information lives** (recreate this layout): USER.md = every user
  directive with resolution status (mandated by CLAUDE.md; paid off
  massively). ART-TODO/SCRIPT-TODO = filed todos with append-only ✅
  resolution logs (check off, never delete; correct stale notes in place with
  dated corrections). ART-PIPELINE/MUSIC-PIPELINE = method + lessons + redo
  playbooks. jobs/*.json = verbatim prompts. qa/ = contact sheets,
  spectrograms, screenshots, audition samples. raw/ = backups + pre-cutout
  masters. /HUMAN.md at repo root = tasks only the human can do (ears, foley
  sourcing, paid tiers, commits, deployment), each with the why and exact
  install steps, plus money spent.
- **Parallel sessions** (art / script / engine in one repo) worked with role
  separation + the shared running logs + dedicated request files
  (ART-REQUESTS.md for art the script side discovers it needs).
- **State capability limits up front** (can't hear audio; can't verify a font
  renders "well") with the QA substitute and the human task filed — don't let
  them be discovered late.
- **When blocked (missing key, missing asset), write the full executable plan
  down** instead of guessing — the next session with the key runs it directly.

## 9. The top ten mistakes a fresh Claude would make on this project type

1. Implementing a "todo:"-prefixed message immediately.
2. Committing (or worse, pushing) without being asked.
3. Inventing content restraints the author never set — then silently
   sanitizing prompts.
4. Writing flashy narration / exaggerated character expressions.
5. Retrying a documented closed lane (foley-via-music-model, gpt-audio
   acting, ElevenLabs acting).
6. Using a scene CG as a character reference, or re-rolling one model forever
   instead of escalating NB Pro → Riverflow / switching for moderation.
7. Splitting a line in one script file and not the other (parity break), or
   trusting skip-if-exists after a restyle.
8. Restarting BGM on a duplicate directive; forgetting a deferred hide-timer;
   letting a seek trigger a chapter fade.
9. Hardcoding chapter counts / speaker lists / asset paths in the engine.
10. Shipping any change without a headless-browser check, or claiming audio
    is fine because the spectrogram looked right.
