# Aesthetic upgrade + character individuation — original Google model

Two goals at once, staying on the **originally-used** models:
- **Better aesthetics prompted directly from Nano Banana 2** (`google/gemini-3.1-flash-image`, in `flash/`),
  with **Nano Banana Pro** (`google/gemini-3-pro-image`, in `pro/`) for the harder faces.
- **Individuation** so Avram & Harvautat read as specific people, not generic anime types.

Text-to-image (no refs), since we're exploring a redesign. Generated 2026-07-03 via
`claude-notes/tools/run_individuation.sh`. True #FF00FF magenta preserved (Google models),
3:4 honored. The upgraded style string ("art-book/key-visual quality, refined linework, rim +
key light, luminous eyes, strand-flow hair, restrained accent saturation") visibly lifts quality
over the shipped masters **on the original flash model** — the aesthetic gain does not require
switching providers.

## Avram — files & read
| File | Model | Direction |
|---|---|---|
| `flash/avram_aesthetic.png` | flash | Current design, upgraded rendering only (baseline) |
| `flash/avram_A_modern.png`, `pro/avram_A_modern.png` | flash / pro | **Clean-shaven "modern intellectual"** — grey crew-neck t-shirt collar under the armor as the Earth tell |
| `flash/avram_B_worn.png`, `pro/avram_B_worn.png` | flash / pro | **Travel-worn** — faint stubble, thin leather-cord pendant as an Earth keepsake |

**Ashkenazi heritage handled as the author asked:** conveyed ONLY through naturalistic coloring
and bone structure — near-black loose curls, deep-set dark-brown eyes, strong dark brows, a
straight slightly high-bridged nose, light-olive skin. **No** religious clothing/kippah/sidelocks,
**no** caricature. He reads as a specific real contemporary young man who looks subtly out of place
among fantasy natives. `pro/avram_B_worn` and `pro/avram_A_modern` are the strongest — Pro renders
the face with a bit more finesse, but flash is very close and fully usable.

## Harvautat — files & read
| File | Model | Direction |
|---|---|---|
| `flash/harvautat_aesthetic.png` | flash | Current design, upgraded rendering only (still a bit generic) |
| `flash/harvautat_A_feral.png`, `pro/harvautat_A_feral.png` | flash / pro | **Feral veteran** — freckles, keener sharper amber eyes, nicked ear/brow, wilder hair |
| `flash/harvautat_B_athletic.png` | flash | **Athletic** — stronger jaw, muscled arms, cream ear-underfur, freckles |

Direction A ("feral veteran") does the most to kill the generic-beastgirl read while keeping her
bright warmth; the freckles + keener eyes are the biggest individuators. B reads a touch more
bodybuilder than intended.

## Recommendation / next step
- Aesthetics: **yes, prompt-able directly from Nano Banana 2** — keep the upgraded style string.
- Avram: **`avram_B_worn` (worn, stubble, leather-cord keepsake)** is my pick for a distinctive,
  Earth-and-heritage-legible lead; `avram_A_modern` (crew-neck tell, clean-shaven) if you want him
  younger/softer. Note: canon says clean-shaven *until late*, so A for early game, B for A-late.
- Harvautat: **`harvautat_A_feral`**.
- To adopt: lock one direction each, regenerate the two masters in `claude-notes/refs/` in that
  look (Pro for the master, per its stronger faces), QA, then re-run every batch `--force` — the
  whole pipeline keys off the two masters (see ART-PIPELINE.md "If redoing in a different style").
  The upgraded style string would replace the STYLE suffix in the four `make_*_jobs.py` generators.
