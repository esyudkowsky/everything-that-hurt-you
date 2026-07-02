# HUMAN.md — things that need a human (or that OpenRouter could not do)

Status as of 2026-07-02, end of the audio session. Claude cannot hear audio, and
OpenRouter has no model that makes sound effects — so the items below are yours.

## 1. Four sound effects need to be sourced by hand

OpenRouter's only audio generators are Lyria 3 (music) and GPT-Audio (speech). Every
attempt to get foley out of Lyria produced music — you heard the results. These four
SFX therefore need to come from a free sound library such as freesound.org (filter by
license CC0, or CC-BY if you're willing to credit):

- **sfx_sword** — one sword-on-sword clash (used in the slavetaker ambush).
- **sfx_impact** — one heavy blunt impact (used in the ambush).
- **sfx_crowd** — crowd murmur/hubbub, loopable (used at the auction).
- **sfx_fire** — campfire crackle, loopable (in the spec's audio list, but currently
  not called anywhere in script.txt — lowest priority, maybe skip).

Install: drop files into `assets/audio/` and add entries under `"audio"` in
`assets/manifest.json` (id → path, same as the existing entries). Any format a
browser plays is fine (mp3/ogg/wav). The novel must also work with these missing,
so there's no deadline pressure from the engine side.

## 2. Listen to the music (Claude could only look at it)

All six BGM tracks were generated and QA'd by spectrogram only. Please audition:

- The six tracks in `assets/audio/` (`bgm_wistful`, `bgm_tavern`, `bgm_dungeon`,
  `bgm_tension`, `bgm_lament`, `bgm_void`). Most at risk of being wrong:
  **bgm_dungeon** (its deep booms may feel too rhythmic for ambience) and
  **bgm_void** (a loud pulsing layer enters ~28s in; the intent was near-static).
- The **loop versions** (`bgm_*_loop.mp3` — these are what the game will actually
  play, on repeat). Let each one wrap around at least once and listen to the seam.
  Most at risk: **tavern** and **tension** (the beat may skip at the seam) and
  **void** (the texture shifts at the seam).

If a track is wrong, tell the next Claude session "regenerate bgm_X, it sounds like
Y, it should sound like Z" — the pipeline is one command and eight cents; directions
are in `claude-notes/HANDOFF-AUDIO.md`.

## 3. About sfx_silence-cut (the one SFX that exists)

You asked what it was: the spec calls for "a reverse-cymbal into nothing" to play at
the whiteout — a ~5 second rising *whoosh* that cuts dead to absolute silence the
instant the screen goes white. Lyria couldn't make it, so it was synthesized from
scratch (`claude-notes/tools/make_sfx.py`). It passes structural checks but no one
has heard it: **please listen to `assets/audio/sfx_silence-cut.wav`.** If the swell
sounds cheap or wrong, replace it with a "reverse cymbal" from a sound library
(common search term, many free hits) — but keep the hard cut + trailing silence, or
have the engine cut it; the instant silence IS the effect.

## Money spent this session

≈ $0.72 of OpenRouter credit total: six songs at $0.08, plus ~$0.24 of failed SFX
clip attempts at $0.04 each.
