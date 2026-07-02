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

## The one big unknown you cannot resolve alone

Whether the six BGM tracks actually FIT the scenes emotionally. Spectrograms cannot
tell you this. The user's ears decide; /HUMAN.md asks them to listen. Flagged as most
at risk: `bgm_dungeon` (booms may be too rhythmic) and `bgm_void` (loud pulsing layer
from ~28s where near-static was wanted).
