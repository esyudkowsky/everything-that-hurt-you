# HANDOFF — state of the build as of 2026-07-02 (Fable session, engine/build work)

Written for the next model (Opus or otherwise) picking this up cold. Read
`/CLAUDE.md`, then `/claude-inputs/MANIFEST.md`, then this file.

## TL;DR — where things stand

**The kinetic novel is COMPLETE and WORKING end-to-end.** A dependency-free
single-page web app (vanilla JS, no build step) at the repo root plays the
full rev-2 script with all art and BGM. It was verified with a headless-
Chromium click-through of the entire story (236 clicks, title → end card),
plus targeted probes of every set-piece. Nothing is committed to git yet —
the user has been making the commits; don't commit without being asked.

## Deliverables in place (all at repo root unless noted)

| File | What it is |
|---|---|
| `script.txt` | The full stage script (dialogue verbatim from `claude-inputs/script.md` rev. 2, plus staging directives). THE canonical play script; the engine parses it at load. Has 15 `@chapter` markers. |
| `index.html` | App shell + all CSS (layers, textbox, menus, title, voiceover, overlays). |
| `engine.js` | Parser + player. Also `module.exports`s the parser for the node validation harness. |
| `assets/` | All art (23 bg + 46 cg + 60 sprites + ui) and audio, mapped by `assets/manifest.json`. Made by the companion art session; see `claude-notes/ART-PIPELINE.md`. |
| `claude-notes/tools/validate_script.js` | Node harness: parses script.txt, cross-checks every asset ref against the manifest, checks structure (chapters, voiceover/montage balance, slot conventions). Run: `node claude-notes/tools/validate_script.js` → currently **OK, 0 errors, 3 warnings** (the 3 missing foley sfx, see Audio below). |
| `claude-notes/tools/e2e.js` | Playwright end-to-end drive (full click-through, cookie/localStorage checks, chapter jump, mid-read resume). Needs `npm i playwright && npx playwright install chromium-headless-shell` somewhere outside the repo, plus `python3 -m http.server 8321` in the repo root. All checks pass as of this writing. |
| `claude-notes/tools/split_textbox.py` | Derives `assets/ui/ui_textbox_box.png` + `ui_textbox_plate.png` from the flattened `ui_textbox.png` (mirror-reconstructs the box corner under the plate). Re-run after any `make_ui.py` restyle. Already run; outputs are in the manifest. |
| `claude-notes/qa/engine/` | Screenshots from the verification run (title, auction CG, tavern, cliff jump, temple, long-line fit, pamphlet, status overlay, tombstone, burning walk). |

## How to run it

```
cd /workspaces/everything-that-hurt-you && python3 -m http.server 8000
# open http://localhost:8000/
```
Any static host works. `fetch()` of script.txt/manifest.json means plain
file:// won't work in Chrome — a server is required (message shown in-app).

## User requirements from this session — all met, verified by e2e

1. **Web viewing** — single-page vanilla JS app (framework decision: the
   informal spec Part IV explicitly wants no build step + script parsed at
   load; Ren'Py etc. can't do the cookie behaviors below).
2. **Saving places / auto-save via cookies, no UI action** — every displayed
   line writes `{pc,max,fin,ts}` to BOTH cookie `ethy_save` (max-age 1y) and
   localStorage (newer wins on load). Title screen offers **Continue**, which
   seeks back to the exact line.
3. **Going back to already-viewed chapters** — Chapters menu (title screen,
   and Esc/≡ pause menu in-game). Chapters unlock when their line index ≤
   max progress. Jumping uses `seek()`: a silent state replay of all
   directives before the target, so bg/sprites/tint/bgm/voiceover state is
   always correct.

## Engine architecture (engine.js, ~700 lines)

- `parseScript(text)` → `{ins, chapters}`; instruction objects per directive.
  Dialogue detection = `Speaker: text` against a speaker whitelist; anything
  else is narration. `@overlay status|inscription` consume `> ` lines until
  `@overlay end`.
- Player is a pc/step/exec loop: non-blocking directives apply instantly;
  blocking ones (say/narrate/hold/pause/floor/overlay/montage-panel) set
  `waiting` and return. Click = complete typewriter → advance.
- Layer order (DOM, back→front): bg → sprites → **cg (covers sprites, per
  spec)** → tint → flash → textbox → inscription → status/floor → voiceover
  → menus. Stage is a 16:9 `container-type: size` box; all sizes in `cqh`.
- Her's lines show NO nametag (plate+label hidden) — deliberate, spec'd.
  Non-speaking sprite dims `brightness(0.6)`. Narration renders italic.
- Typewriter ~30 chars/s; long paragraphs auto-shrink font (`fitDialogFont`,
  steps 3.4→1.95cqh) so the 725-char cliff paragraph fits without clipping.
- Voiceover mode: black screen, Skagganauk-styled centered lines accumulate
  per entry; `@voiceover over` = same lines letterboxed over the current CG
  (used once: final line over cg_burning_walk). A real font file dropped at
  `assets/fonts/skagganauk.woff2` is picked up conditionally at boot
  (FontFace API; no 404 spam when absent); until then a Palatino
  letterspaced stack approximates it.
- Missing assets render `placeholder_card` + monospace id (spec's test
  strategy). Missing audio ids are silent no-ops.
- Known engine subtleties (bugs already found & fixed — don't reintroduce):
  - CG layer must sit ABOVE sprites (spec: "covers background and sprites").
  - `clearSlot` fade-out timeout is generation-guarded so a sprite set within
    400ms of a `@clear` isn't wiped (`sprGen`).
  - Chapters 3 and 6 needed explicit `@clear all` in script.txt (stale
    sprites from the previous scene otherwise linger behind/beside CGs).
  - `@voiceover on` (2026-07-02 fix): `setVoiceover()` fades volayer's opacity
    0→1 over 0.8s; if a CG was still showing when "on" fired, it was visible
    through the semi-transparent black during that fade — a real flash bug the
    user caught right before the chapter 15 close voiceover (the previous CG
    briefly ghosting through). Fixed by instantly `clearCg("cut")` when mode
    is exactly `"on"` (not `"over"`, which deliberately keeps the scene
    visible) inside `setVoiceover()`. Don't remove that clear call.

## script.txt conventions (beyond informal-spec minimum)

Documented in its header block: `@hold`, `@textbox hide|show`, `@tint`,
`@cg <id> [fade|cut]`, multi-line `@overlay ... @overlay end`,
`@overlay inscription` (engine text over CGs — pamphlet rules, tombstone),
`@chapter <n> <title>`, `@voiceover over`. Expression choices per line follow
the informal spec's rules strictly (her: no unhappy face before H-free;
`still` for all cliff lines until `final-gentle` at "stop thinking that
you're a horrible person"; `fixed-smile` auction-only; Avram `strained`
reserved for the cliff, `sad-distant` = grieving-before-the-fact beats).

## Audio status (per user note, 2026-07-02; see `claude-notes/HANDOFF-AUDIO.md` and `/HUMAN.md` for the full story)

- **BGM exists and is wired**: all 6 slots (`bgm_wistful/tavern/dungeon/
  tension/lament/void`), generated by the companion session (Lyria 3 via
  OpenRouter; see `claude-notes/MUSIC-PIPELINE.md`), post-processed into
  seamless loops (`*_loop.mp3`, see that session's `make_loops.py`), mapped
  in `manifest.json → audio`, playing in-engine (`@bgm`, loop, vol 0.7).
  **Human audition still needed** (tracks, loop seams) — see `/HUMAN.md`.
- **Foley SFX NOT done and NOT fillable via OpenRouter**: `sfx_crowd`,
  `sfx_sword`, `sfx_impact` are referenced in script.txt (`sfx_fire` is a
  spec slot, currently unreferenced). The companion's Lyria salvage attempt
  was auditioned by the user and REJECTED ("came out completely as music");
  failures archived at `claude-notes/raw/sfx_*_salvaged_FAILED.wav`. The
  user's to-do (`/HUMAN.md`) is to source them from a free SFX library.
  Wiring is trivial once files exist: drop in `assets/audio/`, add ids to
  `manifest.json → audio` — the engine already references them and no-ops
  silently meanwhile.
- `sfx_silence-cut` exists (synthesized reverse-cymbal-into-nothing) and IS
  used at the whiteout; needs human audition too. `@bgm stop` cuts instantly
  there, and the cliff aftermath plays with no music — both intentional.

## Remaining / nice-to-have (none blocking)

0. **Title-screen music, two loops** — requested 2026-07-02, not started (no
   `OPENROUTER_KEY` in that session's env). Full plan, draft prompts, and the
   ~2-line engine wiring are in `claude-notes/HANDOFF-AUDIO.md` under "TODO
   (not started): title-screen music, two loops". Cheerful loop for the title
   screen; somber loop (ideally same theme, flagged by the user as hard)
   replaces it once `sv.fin` is true.
1. **Foley SFX** (above) — source from a library (do NOT generate; closed
   lane, see HANDOFF-AUDIO.md), add to manifest. ~15 min of human time.
2. **Skagganauk font** — find/make an angular display woff2, drop at
   `assets/fonts/skagganauk.woff2`. Zero code changes needed.
3. **Pamphlet inscription contrast** — rules text over the bright open-book
   CG is readable but could use a stronger scrim (`#inscription` CSS).
4. ~~BGM crossfade~~ — **DONE 2026-07-02** (user-requested, implemented this
   session): `@bgm` changes now fade out the old track / fade in the new one
   over 1.2s (`playBgm`/`fadeOutBgmEl`/`fadeInBgmEl` in `engine.js`). The
   whiteout stays an instant hard cut via the new `@bgm stop cut` syntax
   (see `script.txt` header note) — do not remove the `cut` there.
   **Still open: gapless looping.** Looping is still a bare `<audio loop>`
   per track (`el.loop = true`), so MP3 edge padding (~50ms) will click/gap
   at the loop seam even on the `_loop` files, independent of the crossfade
   work above. Web Audio buffer looping (or two crossfading `<audio>`
   elements timed to the track length) fixes this; not attempted yet.
5. **Mobile pass** — layout is responsive (16:9 letterbox) and tap advances,
   but untested on real phones; check tap targets on the menus.
6. **Human proofread** of script.txt staging against `claude-inputs/
   script.md` rev. 2 — dialogue was transcribed verbatim and validated
   mechanically, but an author pass on expression choices is worthwhile
   (they're all argued in @note lines).

## Verification evidence (what "working" means here)

- `validate_script.js`: 0 errors (536 instructions, 15 chapters, 150
  dialogue / 47 narration / 21 voiceover lines, 41 distinct sprites used).
- e2e run: full click-through to end card; cookie AND localStorage present
  and equal; mid-read reload → Continue → exact-line resume (pc 114);
  all 15 chapters unlocked after finish; chapter-jump to The Cliff rebuilds
  `bg_cliff_sunset` + `her_free.still`; zero page errors; zero unexpected
  404s. Screenshots in `claude-notes/qa/engine/`.

## Open questions for the user (non-blocking, use judgment)

- Should the finished repo state be committed / PR'd? (User has been
  committing manually; everything above is currently uncommitted.)
- Deployment target (GitHub Pages would work as-is)?
