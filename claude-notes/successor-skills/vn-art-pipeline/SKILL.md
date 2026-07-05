---
name: vn-art-pipeline
description: Generate a consistent visual-novel art set (character sprites, expressions, CGs, backgrounds) with AI image models via OpenRouter — masters-first method, chroma-key cutouts, job files, batch QA. Use when creating or regenerating VN/game art assets at scale.
---

# VN art pipeline (proven on a shipped ~130-image kinetic novel, 07-2026)

Portable copy — originally from `everything-that-hurt-you/claude-notes/`
(see that repo's ART-PIPELINE.md, tools/, and jobs/ for the full worked
example). Verify model names/prices are still current before relying on them.

## Models (OpenRouter)

| Model | Role |
|---|---|
| `google/gemini-3.1-flash-image` (~$0.004/img) | Bulk workhorse — does text-to-image AND reference-image editing (the editing is what makes consistency possible) |
| `google/gemini-3-pro-image` | Standard fallback when anything goes wrong (gaze, anatomy, instructions) |
| `sourceful/riverflow-v2.5-pro` | Best aesthetics + hard composition briefs; moderation blocks dark themes (slavery etc.) |
| `x-ai/grok-imagine-image-quality` | Fallback for content Gemini stochastically refuses; chroma drifts hot-pink → CGs only |

Escalation ladder for a stubborn image: workhorse → NB Pro → Riverflow (or
Grok if moderation is the blocker). Don't re-roll one model forever.

## API shape

`POST https://openrouter.ai/api/v1/chat/completions`
- Google models: `"modalities": ["image","text"]`. Pure image models
  (flux/seedream/recraft/riverflow/grok): `"modalities": ["image"]` ONLY —
  adding "text" → 404.
- Refs: `image_url` data-URLs in message content. Aspect:
  `"image_config": {"aspect_ratio": "16:9"}`.
- Result: data-URL at `choices[0].message.images[0].image_url.url`.
- Catalog of image models: `GET /models?output_modalities=image` (default
  list hides them). `.strip()` your API key env var (trailing newline breaks auth).
- No size knob (~880×1180 for 3:4 sprites, ~1380×776 for 16:9); plan an
  upscaler if needed.
- Moderation refusals are SILENT (finish_reason "stop", no image, no error)
  and STOCHASTIC: retry once, reword the tripping noun (usually body/age
  descriptors), then switch models. If you soften a prompt, tell the author —
  or generate clean and edit the sensitive element in.

## Method: masters first, everything else is an edit

1. ONE master sprite per character-outfit on flat chroma, QA'd hard. All
   later assets inherit its look. Keep masters + pre-cutout raws forever.
2. Expression = master ref + "reproduce this EXACT image, change ONLY the
   facial expression to X". Outfit = master ref + "same face, wearing Y"
   (that raw then refs its own expression set). CG = character master(s) as
   refs + scene text + "IGNORE the flat magenta backgrounds of the references".
3. Sprite background incantation, verbatim (short versions drift dark and
   break keying): "single flat uniform BRIGHT NEON MAGENTA, exactly #FF00FF
   at full brightness, like a greenscreen chroma key — no gradient, no
   vignette, no darkening."
4. Chroma removal: detect key as median of 4 corner pixels; clamp tolerance
   when the key isn't bright magenta (wide tolerance around a dark key eats
   reddish hair); erode + slightly blur alpha; warn if <5% of pixels removed.
5. Save EVERY prompt as a job file (jobs/*.json = the reproducibility
   record); batch with a small thread pool; contact-sheet every batch and
   inspect with vision. Fold fixes into the job generators, not one-off edits.
6. **Skip-if-exists is a trap** after a restyle: `--force` everything, then
   verify by file dates that every asset carries the rerun's date.
7. Exact-geometry UI (textbox frames, markers) is drawn programmatically
   (PIL), never AI-generated.

## Prompt rules (each learned from a real failure)

- Emotions overshoot: prompt "subtly X", describe mechanics, AND negatives
  ("mouth CLOSED, no teeth visible", "NO tears", "keep natural skin tone").
- Gaze defaults to camera: give explicit gaze targets.
- Restate defining features in EVERY edit prompt (scars, "human face, NO
  muzzle", tails not visible in waist-up masters, skin-tone locks under
  dramatic lighting) — they silently vanish.
- Over-shoulder shots grow extra people: "EXACTLY ONE FIGURE in frame ...
  no disembodied limbs."
- Deny genre tropes explicitly with the in-world reason (a grave scene grew
  crosses and a shovel: "NO other graves, NO crosses, NO TOOLS — he dug with
  his bare hands").
- Matched before/after pairs and sequence-consistent skies: generate one,
  then EDIT ("Reproduce this EXACT scene ... remove the woman. Do not move
  the camera." / "change only the sky") — never generate both from text.
- Never use a scene CG as a character ref (clones the whole scene). Master
  ref + textual scene description.
- In-image text: short block letters OK; otherwise "greeked/blurred
  placeholder lines, NO real words" and overlay engine text.
- Record canonical design decisions the spec doesn't pin (exact hair/eye
  color) and worldbuilding constraints on art, in one pipeline doc, so a
  full redo stays possible.
