# Individuation — iteration 3 / MASTER CANDIDATES (Nano Banana Pro)

Locked directions from the author: Pro model, Avram = curls1 (defined ringlets),
Harvautat = fur2 (bold brown/white wolf). Collar corrections applied.
Generated 2026-07-03 via `run_masters_v2.sh` + a follow-up human-face-anchor rerun.

## Collar — corrections that worked
- **Runes no longer glow.** Dropping "magical" and specifying "engraved / incised / DARK, DEAD,
  UNLIT" removed the glow. Confirmed across all iter3 takes.
- **Solid rather than riveted/buckled — achieved** (author thought it might be beyond the models).
  Phrasing "a SINGLE SOLID SEAMLESS RING ... NO buckle, NO clasp, NO rivets, NO hinge, NO seam"
  produced a smooth locked band in `harvautat_final_e` and `_f`. Watch for two failure modes:
  a leash O-ring dangling off the front (`final_d`), or a residual side buckle (earlier `collarB`).
- Note: the bold-fur + heavy-collar prompt initially drifted her into a full **furry wolf muzzle**
  (`collarA`, `collarC`). Fixed with a hard HUMAN-FACE anchor ("human face, small human nose, NOT a
  muzzle/snout, only ears+tail+hair are lupine") — see `final_d/e/f`.

## Picks
- **Avram master → `avram_curls1_a.png`** (younger read; `_b` = alternate, a bit more chiseled).
  Dense defined dark ringlet curls, period linen collar (no modern shirt), light stubble, deep-set
  eyes, high-bridged nose, light-olive skin. Heritage via hair+coloring only, no markers.
- **Harvautat master → `harvautat_final_f.png`** (`_e` = alternate). Human face + freckles + keen
  amber eyes + nicked brow + fang grin; bold russet-brown-and-white coat (white fringe streak /
  ear-insides / tail-tip); solid seamless runed non-glowing slave collar.

## Next step (awaiting author go-ahead)
Install the two picks as the new masters in `claude-notes/refs/` (avram_traveler_master.png,
her_armor_master.png), then per ART-PIPELINE.md: QA, and re-run every batch `--force` — all 126
assets key off these two masters. The upgraded STYLE string (see run scripts) replaces the style
suffix in the four `make_*_jobs.py` generators. This is the big irreversible-ish step; not done yet.
Also unresolved: whether to keep russet base vs the browner fur2 coat drifted a little brown here.
