# From-prompt experiments — the two leads, NO reference images

Both leads generated **purely from a text prompt** (no reference image), to see how
each frontier image model interprets the canonical character descriptions on its own.
Same prompt + shipped style suffix ("clean anime lineart, muted earthy palette, soft
cel shading", magenta chroma-key bg) for every model. Each folder has `avram.png` + `her.png`.

Generated 2026-07-03 by `run_from_prompt.sh` (latest Google/OpenAI) and
`run_from_prompt2.sh` (the models you named). Driver: `gen_style.py`.

| Folder | Model | Notes |
|---|---|---|
| `nano_banana_pro/` | `google/gemini-3-pro-image` | Clean, on-model, **true #FF00FF** magenta, honored 3:4 |
| `gpt5.4_image2/` | `openai/gpt-5.4-image-2` | Polished; magenta drifts to hot-pink |
| `nano_banana_2_lite/` | `google/gemini-3.1-flash-lite-image` | Fast/cheap tier; simpler shading, true magenta |
| `grok_imagine/` | `x-ai/grok-imagine-image-quality` | Bold lineart, good fang/claws; hot-pink bg |
| `seedream_4.5/` | `bytedance-seed/seedream-4.5` | Very sharp, saturated, expressive; hot-pink bg |
| `flux.2_pro/` | `black-forest-labs/flux.2-pro` | Soft clean anime, big files; hot-pink bg |
| `riverflow_2.5_pro/` | `sourceful/riverflow-v2.5-pro` | Strong lineart; **truest magenta** of the non-Google set |
| `recraft_v4.1_pro/` | `recraft/recraft-v4.1-pro` | Crisp flat cel look; hot-pink bg |
| `auto_router/` | `openrouter/auto` | Router picked a Gemini-class model — clean, true magenta, closest to shipped |

## Key findings
- **Grok CAN be reached**, but only via the image-only catalog: `x-ai/grok-imagine-image-quality`
  (`?output_modalities=image` on the models API — the default `/models` list hides it).
  xAI's text Groks (`grok-4.x`) do NOT do images.
- **Pure image models** (Grok, Seedream, Flux, Riverflow, Recraft) only accept the `image`
  output modality — the API call must send `modalities:["image"]`, not `["image","text"]`,
  or it 404s ("No endpoints found that support the requested output modalities"). Handled by
  `gen_style.py --image-only`. Google/OpenAI models + Auto Router accept both.
- **Chroma-key accuracy matters for the sprite pipeline.** Only the Google models, Riverflow,
  and Auto Router return near-true #FF00FF; the rest drift to hot-pink, which would need
  `bgremove.py` retuning before these could feed the real cutout pipeline.
- **Aspect ratio**: `image_config.aspect_ratio` was honored by all here (3:4). (OpenAI's
  `gpt-5-image` earlier ignored it and returned square — model-specific.)
- From-prompt (no ref) gives more design drift than ref-editing: collar/armor/tail details
  vary per model. For production consistency, ref-editing from a master still wins; from-prompt
  is best for *exploring a fresh look*, which is what this set is for.
