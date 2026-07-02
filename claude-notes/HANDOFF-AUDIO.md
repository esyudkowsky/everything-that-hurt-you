# HANDOFF-AUDIO.md — state of the audio work, and directions for the next session

Written by Claude Fable 5 at session close, 2026-07-02. Audience: a future Claude
(likely Opus) picking this up. Read this file, then `MUSIC-PIPELINE.md`, before
touching anything audio-related. Follow these directions literally; where this file
and your own judgment disagree, trust this file — several of these are conclusions
from experiments that already failed once.

## Where the audio work stands (all of this is DONE — do not redo)

1. **All 6 BGM tracks exist and are installed.** `assets/audio/bgm_*.mp3` are the
   masters; `assets/audio/bgm_*_loop.mp3` are seamless-loop versions (fade trimmed,
   tail crossfaded into head). `assets/manifest.json` → `"audio"` points at the
   `_loop` files. Generated with `claude-notes/tools/gen_music.py` (OpenRouter,
   `google/lyria-3-pro-preview`); verbatim prompts in `claude-notes/jobs/music_jobs.json`.
2. **`sfx_silence-cut.wav` exists and is installed.** It is the spec's "reverse-cymbal
   into nothing" for the whiteout: 5.5s rising swell, instant cut to digital zero,
   1.5s true silence. Synthesized by `claude-notes/tools/make_sfx.py` (deterministic,
   seeded — rerunning it reproduces the same file).
3. **QA artifacts** are in `claude-notes/qa/`: `music_contact.jpg` (spectrogram +
   waveform per track), `seam_*.png` (loop-seam checks), `sfx_loops_contact.jpg`.

## What is UNDONE

- **Foley SFX: `sfx_sword`, `sfx_impact`, `sfx_crowd`** (all three are called in
  script.txt) **and `sfx_fire`** (spec only, not in script.txt). These are NOT in the
  manifest and NOT in assets/audio. See "closed lanes" below for why you must not try
  to generate them. They are on the human's list (/HUMAN.md).
- **Human audition of everything.** No AI in this repo can hear. The 6 BGM tracks,
  their 6 loop seams, and sfx_silence-cut all pass visual/structural QA but have NOT
  been approved by ears, except as noted in /HUMAN.md.
- **(Engine: DONE by a concurrent session — see `claude-notes/HANDOFF.md`, which is
  the master handoff; this file covers audio only.)** Two audio-facing engine
  nice-to-haves remain there: gapless looping (bare `<audio loop>` gaps ~50ms at the
  seam from MP3 edge padding; use Web Audio buffer looping or two crossfading
  elements) and a 1–2s crossfade on `@bgm` changes — EXCEPT the whiteout `@bgm stop`,
  which must stay an instant cut (spec: "BGM cuts to silence instantly").

## Closed lanes — experiments that already failed; do NOT rerun them

1. **Do not generate foley SFX with Lyria or any music model.** Tried thoroughly this
   session. Fire and crowd prompts → metronomic percussion loops. Single-hit prompts
   (sword, impact) → rhythmic sequences of hits; even cutting out the final hit
   produced files the user auditioned and REJECTED ("came out completely as music").
   Failed attempts are archived in `claude-notes/raw/sfx_*_try.mp3` and
   `sfx_*_salvaged_FAILED.wav` — leave them there; never re-register them.
2. **Do not look for other OpenRouter audio models.** Surveyed 2026-07-02: the only
   audio-output models are Lyria 3 (music) and openai/gpt-audio(-mini) (speech/voice).
   Nothing does foley.
3. **Do not try to prompt Lyria into loopable endings.** Every track ends in a fade-out
   regardless of prompt. Loopability is manufactured after the fact by
   `claude-notes/tools/make_loops.py`. If you regenerate any BGM track, you MUST re-run
   make_loops.py on it and re-point nothing (manifest already points at `_loop` names).

## If the user asks you to regenerate a BGM track

1. Edit its prompt in `claude-notes/jobs/music_jobs.json` (keep the structure: scene,
   instrumentation, mood + what it is NOT, "even dynamics / seamless looping", and the
   closing "Strictly instrumental, NO vocals, no big finale" — these negatives worked).
2. `python3 claude-notes/tools/gen_music.py --out assets/audio/bgm_X.mp3 --prompt "..." --model pro`
   (needs OPENROUTER_KEY env var; costs $0.08).
3. Check the printed transcript: `<instrumental>` or `[[A0]]`-style markers = good;
   real lyric words = vocals leaked in, regenerate with the negatives stated louder.
4. `python3 claude-notes/tools/make_loops.py assets/audio/bgm_X.mp3`
5. Re-render its spectrogram/waveform (commands in MUSIC-PIPELINE.md "QA without
   ears"), LOOK at them, and tell the user a human still has to listen.

## TODO (not started): title-screen music, two loops

Requested by the user 2026-07-02. **A future session should attempt this** (the user
said "only try yourself if you think it's within your competence" — this session
would have attempted it, but `OPENROUTER_KEY` was not set in the environment, so it
was deferred instead of guessed at). Two new BGM slots, neither in the informal spec:

1. `bgm_title` — soft, cheerful loop for the title screen, played whenever the title
   screen is shown AND the player has not yet finished the story (`!sv.fin`).
2. `bgm_title_end` — sad/somber loop, replaces it on the title screen once the player
   HAS finished the story (`sv.fin` true — see `engine.js` save format, `fin: finished
   ? 1 : 0`). The user's ideal is the *same melodic theme*, just reharmonized somber —
   flagged by the user themselves as "much harder to do with AI." Lyria (this API) is
   text-prompt-only with no audio conditioning, so there is no way to feed it the first
   track and ask for a variation; the best available approximation is prompting the
   second generation with an explicit, detailed text description of the first track's
   melodic/instrumental content and asking for the same melody slowed and reharmonized
   in a minor key. Do not promise the user a literal shared theme will result — audition
   both and tell them honestly whether it worked. If it doesn't land, a plain contrasting
   somber piece (same instrumentation family, different melody) is an acceptable fallback.

Draft prompts (edit to taste, follow the same style as `claude-notes/jobs/music_jobs.json`
— mood + explicit negatives, "even dynamics ... seamless looping", "Strictly instrumental,
NO vocals, no big finale"):

- `bgm_title`: "Instrumental main theme for the title screen of a fantasy visual novel.
  Warm, soft, gently cheerful — solo acoustic guitar or harp carrying a simple, hummable
  melody, light warm strings underneath, maybe a soft flute answering phrase. Inviting and
  a little wistful at the edges but mostly bright — like the cover of a beloved storybook
  being opened. Gentle dynamics throughout, no build to a climax, suitable for seamless
  looping while the player reads the title screen. Strictly instrumental, NO vocals, no
  big finale or dramatic ending."
- `bgm_title_end`: "Instrumental theme for the title screen of a fantasy visual novel,
  played only after the story has been finished — the same simple melody as [describe
  bgm_title's actual melodic content once you've heard it], now slow, hollowed-out, and
  grieving: solo cello or low piano carrying the tune, sparse and spacious, no percussion.
  Tender and sad rather than tragic or dramatic — the same story, remembered afterward.
  Even quiet dynamics throughout, no crescendo, suitable for seamless looping. Strictly
  instrumental, NO vocals, no swelling finale."

How to generate (same pipeline as the 6 existing BGM tracks):
```
python3 claude-notes/tools/gen_music.py --out assets/audio/bgm_title.mp3 --prompt "..." --model pro
python3 claude-notes/tools/gen_music.py --out assets/audio/bgm_title_end.mp3 --prompt "..." --model pro
python3 claude-notes/tools/make_loops.py assets/audio/bgm_title.mp3 assets/audio/bgm_title_end.mp3
```
Then add both `_loop.mp3` paths to `assets/manifest.json → audio` (same pattern as the
existing six). Cost: ~$0.16 for both at the `pro` model. Needs `OPENROUTER_KEY` in the
environment (ask the user to set it if it's missing, same as this session hit).

Engine wiring (small, ~2 lines): `engine.js` `showTitle()` (around the `$("title")`
block) currently never calls `playBgm()` — the title screen is silent today. Add, after
loading `sv`:
```js
playBgm(sv && sv.fin ? "bgm_title_end" : "bgm_title");
```
`beginPlay()` doesn't need an explicit stop — the first `@bgm` directive in script.txt
(chapter 1) will cut over via the existing `playBgm()` replace-on-call behavior. Re-run
`node claude-notes/tools/validate_script.js` and reload in-browser to confirm the title
screen now plays audio and that it switches after a full playthrough (use Chapters/dev
shortcuts or just finish the story once). As always: human audition still required
afterward, same as every other track (see `/HUMAN.md`).

## The one big unknown you cannot resolve alone

Whether the six BGM tracks actually FIT the scenes emotionally. Spectrograms cannot
tell you this. The user's ears decide; /HUMAN.md asks them to listen. Flagged as most
at risk: `bgm_dungeon` (booms may be too rhythmic) and `bgm_void` (loud pulsing layer
from ~28s where near-static was wanted).
