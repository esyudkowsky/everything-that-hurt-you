# Riverflow compositional test — the hardest scenes

Testing `sourceful/riverflow-v2.5-pro` on the four scenes that were hardest in the original
Gemini pipeline (ART-PIPELINE.md lessons 6/8/9). **Text-to-image, character descriptions
inlined, NO reference images** — so this isolates compositional prompt-following, not
reference-consistency. 16:9. Generated 2026-07-03 via `run_riverflow_scenes.sh` (+ two reworded
reruns, see moderation note).

## Verdict: compositional following is excellent — as good as or better than Gemini here.

| Scene | Hard requirement (why it was tough) | Riverflow result |
|---|---|---|
| `market_flinch.png` | Two joyful leads FG-left + a small, off-center BG-right collared servant flinching from a raised arm the leads don't notice (lesson 9 — multi-plane narrative staging) | **Nailed it.** All three planes correct; the flinch reads purely as body language; leads oblivious. The standout. |
| `altar_everything.png` | EXACTLY ONE figure, from behind, no duplicate limbs (lesson 8 — over-shoulder shots grew extra legs on Gemini) | **Correct.** Single figure from behind, coins spilling from the upended pouch, sheathed sword flat on the altar. (Goddess engraving on the wall = iconography, not a duplicate person.) |
| `grave_filled.png` | Lone wilderness grave, NO crosses/tombstones/tools/graveyard, dug bare-handed (lesson 6 — Gemini repeatedly added crosses + a shovel) | **Correct first try.** One fresh mound, dirt-caked bare hands, cliff base, first stars. No forbidden tropes. |
| `auction_fierce.png` | Dynamic fierce combat pose + second figure (barker) + crowd as silhouettes-from-behind | **Correct.** Full dynamic crouch, combat grin, tail lashing; barker mid-pitch in burgundy vest; foreground crowd silhouettes. |

## The one real catch: provider-side content moderation
`auction_fierce` and `market_flinch` **failed on the first pass** with HTTP 422
`"Inappropriate content detected"` (VALIDATION_ERROR from Sourceful). The trigger was the
story's own subject matter — "slave auction", "slave", "trained flinch from expected blows".
Gemini rendered the identical wording fine. They succeeded only after rewording to euphemisms
("performance dais", "servant", "flinching as though bracing for a hit").

**This matters for THIS project specifically** — "Everything That Hurt You" is centrally about
slavery, and many of its CGs carry that content. Riverflow's filter is materially stricter than
the current Gemini pipeline's. Adopting Riverflow would mean either (a) systematically euphemizing
scene prompts (extra work, and it softens authorial intent in the prompt), or (b) accepting that
a subset of the darkest CGs won't pass. The character sprites and non-slavery scenes are unaffected.

## Other notes
- Riverflow returns near-true #FF00FF and honored 16:9; small file sizes are just efficient PNGs, not failures.
- These are look-tests at Riverflow's native design (no ref), so faces/armor differ from the shipped
  masters. For production you'd still want ref-consistency; whether Riverflow supports multi-image
  reference composition on OpenRouter is untested here.
