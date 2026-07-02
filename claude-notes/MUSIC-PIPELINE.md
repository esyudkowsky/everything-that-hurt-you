# MUSIC-PIPELINE.md — how the audio was generated, and how to redo it

Written by Claude Fable 5, 2026-07-02, after generating the BGM set. Companion to
ART-PIPELINE.md; read that first for the general job-file/QA conventions.

## What exists

All six BGM slots from `claude-inputs/informal-spec.md` §"Audio slots", plus the one
musical SFX, in `assets/audio/` and registered under `"audio"` in `assets/manifest.json`:

- `bgm_wistful` (2:57), `bgm_tavern` (2:49), `bgm_dungeon` (2:57), `bgm_tension` (1:45),
  `bgm_lament` (3:02), `bgm_void` (3:01) — MP3, 192kbps, 44.1kHz, mean loudness −14.3dB
  (Lyria normalizes; no post-processing was needed or applied). These are the **masters**;
  the manifest points at their `*_loop.mp3` siblings (see "Loopability" below).
- `sfx_silence-cut.wav` — 7.0s WAV: 5.5s reverse-cymbal swell → instant cut to digital
  zero → 1.5s of true silence. **Synthesized programmatically, not AI** (see below).
NOT delivered — **all foley SFX** (`sfx_sword`, `sfx_impact`, `sfx_crowd` used in
script.txt; `sfx_fire` spec only). Every attempt to get foley out of Lyria produced
music: fire/crowd came back as metronomic percussion loops, and even the "salvaged"
single strikes cut from Lyria's sword/impact output **failed human audition**
(2026-07-02, the user listened: "came out completely as music … basically do not
work"). Failed attempts are archived in `claude-notes/raw/` (`sfx_*_try.mp3`,
`sfx_*_salvaged_FAILED.wav`) — do NOT re-ship or re-register these. No other
OpenRouter model can do foley: `openai/gpt-audio(-mini)` are the only other
audio-output models and they are speech/voice models. **Direction for the next
model: do not retry SFX with Lyria or any music model. This lane is closed.** The
four foley SFX must come from a free SFX library (see /HUMAN.md) or from a human.
The engine must run silent without them (spec: all audio optional).

## Loopability (manufactured, not prompted)

The prompts DID request loopability ("even dynamics throughout, suitable for seamless
looping") and that part worked — the bodies are loop-friendly — but Lyria still ends
every track with a fade-out and there is no prompt that prevents it. Regenerating does
not fix this; deterministic editing does. `make_loops.py` trims leading quiet + the
trailing fade (windowed RMS vs. track median), then equal-power crossfades the last 2s
into the track's own head and starts the file 2s in — so end-of-file is sample-continuous
with start-of-file. Seam QA: `claude-notes/qa/seam_*.png` (last 4s + first 4s butted
together; no gaps/clicks visible on any of the six).
**Engine note:** MP3 has ~50ms codec padding at file edges — loop via Web Audio decoded
buffers (sample-accurate) or two crossfading `<audio>` elements, NOT a naive
`<audio loop>` tag. Human should still audition seams; the tavern/tension seams may
jump beat phase, and the void seam shifts timbre (amplitude is continuous, ears decide).

## SFX salvage (tried, failed — kept for the record)

Prompted for "one sword clash / one heavy impact then silence", Lyria returned a ~25s
*rhythmic sequence* of the right sound; the final strike + decay was cut out
programmatically as a one-shot. Spectrally it looked right, but the user auditioned the
results and rejected them — they still read as music, not foley. Lesson: spectrogram QA
can validate *structure* (one hit, decay, silence) but not *foley-ness*; a musical
instrument hit and a real-world impact look alike on a spectrogram. Do not repeat this
salvage; it is recorded only so the next model doesn't reinvent it.

## Toolchain (claude-notes/tools/)

- `gen_music.py` — one OpenRouter music call. `--out --prompt [--model pro|clip] [--retries]`.
  Models: `google/lyria-3-pro-preview` (full song, ~2–3 min, $0.08) and
  `google/lyria-3-clip-preview` (~30s, $0.04). Whole BGM set cost ≈ $0.52 including the
  failed clip attempts. **Audio output requires `stream: true`** (a non-streaming call
  400s with "Audio output requires stream: true"); base64 MP3 arrives in
  `delta.audio.data` chunks — in practice one big chunk at the end. The text stream
  carries a "transcript": `<instrumental>` or `[[A0]]`-style section markers for
  instrumental output; actual lyric text would appear here if the model added vocals —
  **check the transcript as a cheap no-vocals test.**
- `make_sfx.py` — synthesizes `sfx_silence-cut.wav` from numpy noise + inharmonic
  partials. Deterministic (seeded).
- `make_loops.py` — makes the `*_loop.mp3` seamless-loop versions (fade trim +
  self-crossfade; see "Loopability" below). `make_loops.py assets/audio/bgm_*.mp3`
  regenerates all of them from the masters.
- `claude-notes/jobs/music_jobs.json` — the complete, verbatim prompt record for every
  audio asset (same convention as the art job files). The driver was an inline 3-worker
  loop over this file; each entry is exactly one `gen_music.py` call.

## Prompt method that worked

Every BGM prompt has five parts: (1) "Instrumental background music for a fantasy visual
novel" + the scene it underscores, in-fiction; (2) instrumentation, named concretely
(solo cello over sparse piano, lute + fiddle + hand drum, ...); (3) the emotional
register, including what it is NOT ("mysterious rather than frightening", "grief, not
melodramatic"); (4) dynamics discipline for looping: "even/consistent … throughout,
suitable for seamless background looping"; (5) hard negatives: "Strictly instrumental,
NO vocals, no singing, no big finale/ending swell." All six came back instrumental,
even-dynamics, correct in mood-critical instrumentation on the first attempt.

## QA without ears

Claude cannot listen. The QA that is possible and was done (`claude-notes/qa/`):
`music_contact.jpg` = per-track spectrogram (ffmpeg `showspectrumpic`) + waveform
(`showwavespic`); check duration/loudness via ffprobe/volumedetect. This catches:
wrong structure (the failed SFX read as a drum loop at a glance), silence, clipping,
dynamics unsuitable for looping, missing hard cuts. It does NOT verify mood or
melody quality — **a human must audition the six BGM tracks**; regen is one
`gen_music.py` call per track. Listen hardest to `bgm_dungeon` (regular deep booms —
intended "distant stone impacts", could read as too rhythmic) and `bgm_void`
(gains a loud pulsing layer ~28s in; prompt asked for near-static).

## Lessons learned

1. **Lyria refuses to be a foley box — everything comes back as music.** A lone reverse
   cymbal → no audio twice, then a drum loop. Fire crackle / crowd walla → metronomic
   percussion. Single sword clash / impact → a rhythmic sequence of clashes, and even the
   cut-out final hit failed human audition (see "SFX salvage"). Verdict, confirmed by the
   user's ears: **no path from OpenRouter to usable foley exists.** Exact-behavior SFX are
   made programmatically (same rule as the ui_* graphics in the art set); everything else
   foley needs a sound library or a human.
2. **Tracks end in fade-outs, not loop points, regardless of prompt.** Solved by
   post-editing, not regeneration — see "Loopability" section.
3. **Track length follows requested energy, not a knob** — there is no duration
   parameter; the tense track came back shorter (1:45) than the calm ones (~3:00).
4. **Transcripts are the vocal check** (see toolchain note). If a regen's transcript
   ever shows real words, regen with the no-vocals negatives made louder.

## If redoing

Edit the prompt in `claude-notes/jobs/music_jobs.json` (keep the five-part structure and
the closing negatives verbatim), rerun `gen_music.py` for that id, re-render its
spectrogram+waveform, and have a human listen. For a different overall score style,
change part (2) of each prompt (instrumentation) and keep everything else.
