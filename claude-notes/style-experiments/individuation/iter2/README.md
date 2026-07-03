# Individuation — iteration 2 (author feedback applied)

Feedback from iter1 addressed, still on the original Google models (`flash/` = Nano Banana 2,
`pro/` = Nano Banana Pro). Generated 2026-07-03 via `run_individuation2.sh`.

## Avram — changes made
- **Keep him YOUNG** — prompted "no older than ~23", light single-day stubble only, no gaunt/weathered.
  Honest note: with stubble + strong jaw the renders still read ~mid-20s. `pro/avram_curls2`
  (tight cropped coils) looks the youngest; can push younger by softening jaw + dropping stubble.
- **Modern t-shirt REMOVED** — he'd hide being Summoned, so no anachronistic clothing. Replaced with
  a plain roughspun natural-linen undershirt collar (period-appropriate).
- **Hair reworked** (the main genericism fix): from wild windswept anime mane -> **dense tight defined
  dark ringlet curls in a controlled short cut**. Reads distinctly more Ashkenazi AND far less generic.
  - `pro/avram_curls1`, `flash/avram_curls1` = looser defined ringlets, a bit fuller.
  - `pro/avram_curls2` = neat tight cropped coils, short sides — most distinctive + youngest read.
- Heritage still conveyed ONLY via hair texture + coloring + bone structure. No religious markers.

## Harvautat — changes made
- **Collar fixed**: now a dark blackened magical-metal slave band with cold glowing runes — reads as
  magical bondage, not a buckled leather pet/BDSM collar. Residual: a small clasp/buckle vestige still
  appears on the front; push to a fully seamless locked band if you want it grimmer.
- **Two-tone brown-and-white fur** (agouti wolf markings) — big individuator, kills the generic
  orange-beastgirl read. Choice:
  - `pro/harvautat_fur1`, `flash/harvautat_fur1` = **russet-auburn base** + white fringe streak /
    white ear-insides / white tail-tip. On-canon coloring, clearly individuated. **Safer pick.**
  - `pro/harvautat_fur2` = **bold wolf agouti** — browner coat, dramatic white streak + neck ruff +
    white tail. Most striking, but shifts base color from russet toward brown.
- Kept from Feral: freckles, keen sharper amber eyes, nicked ear/brow.

## Open choices for the author
1. Avram hair: looser ringlets (`curls1`) vs tight cropped coils (`curls2`).
2. Avram age: current (~mid-20s) ok, or push younger (softer jaw, less stubble)?
3. Harvautat coat: keep russet base + white streaks (`fur1`, on-canon) vs bold brown/white wolf (`fur2`)?
4. Collar: current runed band ok, or fully seamless/locked (remove buckle vestige)?

Once locked, regenerate the two masters in `claude-notes/refs/` at full sprite spec (Pro), QA, then
re-run batches `--force`; upgraded STYLE string replaces the suffix in the four `make_*_jobs.py`.
