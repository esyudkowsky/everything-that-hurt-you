---
name: vn-audio-pipeline
description: Generate visual-novel BGM with Lyria via OpenRouter, manufacture seamless loops, synthesize exact-behavior SFX in code, and route voice acting — including which lanes are closed and why. Use when creating or regenerating game/VN music, SFX, or voiceover.
---

# VN audio pipeline (proven on a shipped kinetic novel, 07-2026)

Portable copy — originally from `everything-that-hurt-you/claude-notes/`
(MUSIC-PIPELINE.md, HANDOFF-AUDIO.md, tools/gen_music.py, make_loops.py,
make_sfx.py). Verify model names/prices before relying on them.

**Declare up front: Claude cannot hear.** Spectrogram/waveform QA (ffmpeg
`showspectrumpic`, `showwavespic`, seam images of last-4s+first-4s,
volumedetect) catches structure, clipping, and loop-hostile dynamics — NOT
mood or realism. A human audition is a mandatory final gate; file it as a
human task with the riskiest tracks named and the feedback format
pre-scripted ("regenerate bgm_X, sounds like Y, should sound like Z").

## BGM via Lyria (OpenRouter)

- `google/lyria-3-pro-preview` ~$0.08/track (~2–3 min);
  `google/lyria-3-clip-preview` ~$0.04 (~30s).
- `"stream": true` is REQUIRED (non-streaming 400s). Base64 MP3 arrives in
  `delta.audio.data` SSE chunks. The streamed TEXT is the vocal check:
  `<instrumental>` / `[[A0]]` markers = good; real lyric words = vocals
  leaked → regen with louder negatives. Output arrives normalized (~−14 dB).
- **Length is fixed ~3 min max.** No duration parameter; length requests are
  ignored. Longer ambience = looping, never generation.
- Prompt formula (went 6-for-6 first try):
  1. "Instrumental background music for a fantasy visual novel" + the scene,
     described in-fiction;
  2. concrete instrumentation;
  3. emotional register including what it is NOT;
  4. "even dynamics throughout, suitable for seamless background looping";
  5. hard negatives: "Strictly instrumental, NO vocals, no singing, no big
     finale/ending swell."
- Same-melody variants (cheerful↔somber) are effectively impossible (text
  conditioning only) — don't promise; a contrasting piece is the fallback.

## Looping is manufactured, not prompted

Lyria ALWAYS ends on a fade-out. Recipe: trim leading quiet + trailing fade
(windowed RMS vs track median), equal-power crossfade the final 2s into the
track's own head, then start the file 2s in → end is sample-continuous with
start. Rerun after every regen. Engine note: MP3 in `<audio loop>` still
clicks (~50ms codec edge padding) — real gaplessness needs Web Audio
decoded-buffer loops or two crossfading elements.

## SFX

- **Foley via generative music models is a CLOSED LANE** — every attempt
  (fire, crowd, swords, impacts) came back as music; even salvaged single
  hits failed human audition. Foley = free sound library (freesound.org,
  CC0/CC-BY — a human task), installed by dropping files in and mapping ids
  in the manifest (engine silent-no-ops meanwhile).
- Exact-behavior stings (e.g. swell → instant cut to digital zero) are
  synthesized deterministically in code (seeded numpy → WAV, so no codec
  smear at the cut).
- Trim generated/sourced SFX lead-ins to the audible point, and retune any
  engine timings synced to the asset's length.

## Voice acting lane history (do not re-litigate without new evidence)

- `openai/gpt-audio(-mini)`: technically works (stream:true +
  `audio.format:"pcm16"` only — mp3 rejected; decode base64 → ffmpeg s16le
  24000 mono; ~$0.06/whole script on mini; transcript = free verbatim check).
  REJECTED by the author for flat emotionality. Closed.
- ElevenLabs v3: inline tags do steer delivery (proved by same-words-
  opposite-emotion controls) but still "bored voice actor". Closed.
- Hume Octave (the lane that survived): direct API key only (no aggregator);
  send a browser User-Agent (Cloudflare 403s python-urllib); header
  `X-Hume-Api-Key`; acting `description` requires `"version":"1"`; free tier
  429s at ~10 req/min (backoff works); designed voices save to the account.
  Production recipe: context utterances = PLAIN-facts narration + preceding
  line, written literally not literarily; default direction to
  understatement ("normal pace, understated" — it errs over-dramatic);
  ellipses only for literal in-character hesitation; don't use the speed
  knob or whisper directions; 2+ takes on emotionally heavy lines (high
  variance), 1 take on plain lines.
- Reusable diagnostic method: controlled variant sets — no-direction floor,
  maximal direction, same-words-opposite-emotion control, in-scene context —
  so the author can tell model limits from direction-channel failure.

## Misc

- "Music doesn't play" reports: check browser autoplay policy and the
  user's speakers before debugging.
- Codespaces: new secrets don't reach running shells — read
  `/workspaces/.codespaces/shared/user-secrets-envs.json`. Strip trailing
  newlines from keys.
