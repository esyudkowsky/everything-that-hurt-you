#!/usr/bin/env bash
# Iteration 2, on the original Google models.
# Avram: keep YOUNG, light stubble ok, NO modern shirt (would out him as Summoned) -> period
#   linen collar; rework HAIR to dense tight defined Ashkenazi ringlets in a controlled short cut
#   (the wild anime mane was the main genericism driver).
# Harvautat: continue from Feral. Fix collar to grim dark MAGICAL-METAL slave restraint (not a
#   buckled pet/BDSM collar). Two-tone the hair/fur brown-and-white (agouti wolf markings).
set -u
cd /workspaces/everything-that-hurt-you
FLASH=google/gemini-3.1-flash-image
PRO=google/gemini-3-pro-image
OUT=claude-notes/style-experiments/individuation/iter2
mkdir -p "$OUT/flash" "$OUT/pro"
GEN(){ python3 claude-notes/tools/gen_style.py --aspect 3:4 --retries 3 "$@"; }

STYLE="High-quality anime visual-novel character art, art-book / key-visual quality. Clean confident expressive linework, refined soft cel shading with an added layer of subtle gradient rendering, delicate rim lighting plus a soft warm key light, carefully rendered luminous eyes with real depth, detailed hair with individual strand flow, muted earthy palette with tasteful restrained accent saturation. Appealing, distinctive and characterful — deliberately NOT generic. Waist-up visual-novel sprite, body angled three-quarters toward CENTER. Flat solid pure bright neon magenta background exactly #FF00FF at full brightness like a greenscreen chroma key — no background gradient, no scenery, no text, no watermark."

# ---------------- AVRAM ----------------
AV_COMMON="Avram Detwiler, a human man who is clearly YOUNG — early twenties, youthful and unlined, do NOT make him look older than about 23. Face: lean, deep-set thoughtful dark-brown eyes under strong dark brows, a straight well-defined nose with a slightly high bridge, light-olive skin, at most a single day's worth of light dark stubble (NOT a full beard, NOT gaunt or weathered). His secular Central/Eastern-European Ashkenazi ancestry reads ONLY through hair texture plus naturalistic coloring and bone structure — subtle and tasteful; absolutely NO religious clothing, NO head covering (no kippah), NO sidelocks, NO caricature. He wears an olive-green hooded traveler's cloak over tan leather armor; at his throat only a plain roughspun natural-linen undershirt collar — period-appropriate medieval-fantasy clothing, deliberately NOT modern Earth clothing (he hides his Earth origin, so nothing anachronistic). Expression calm, guarded, thoughtful. Facing three-quarters toward the viewer's right."

# Hair is the variable:
AV_HAIR1="HAIR (the key change): dark, almost-black, DENSE TIGHT DEFINED CURLS forming distinct coiled ringlets — real curly Jewish-diaspora hair texture — kept in a controlled, fairly SHORT modern cut, close at the sides. NOT long, NOT windswept, NOT a wild flowing anime mane."
AV_HAIR2="HAIR (the key change): a neat, rounded, dense crop of tight dark coils — fuller on top, tidy and short at the sides, a controlled compact curly shape. Real coiled Ashkenazi curl texture, well-groomed and modern. NOT long, NOT windswept, NOT a loose flowing anime mane."

GEN --model "$PRO"   --out "$OUT/pro/avram_curls1.png"   --prompt "$STYLE $AV_COMMON $AV_HAIR1" &
GEN --model "$PRO"   --out "$OUT/pro/avram_curls2.png"   --prompt "$STYLE $AV_COMMON $AV_HAIR2" &
GEN --model "$FLASH" --out "$OUT/flash/avram_curls1.png" --prompt "$STYLE $AV_COMMON $AV_HAIR1" &

# ---------------- HARVAUTAT ----------------
HV_COMMON="Harvautat, a wolf-beastfolk young woman — a specific scrappy individual, NOT a generic cute beastgirl: pointed wolf ears, large keen amber eyes with a faintly predatory glint, a light scatter of freckles across her nose and cheekbones, a small old healed nick through one eyebrow and a small notch bitten from one ear tip, warm sun-weathered tan skin, a bright genuine warm open-mouthed smile with one small fang. Clawed hands with dark nails. She wears gray steel plate armor over brown leather (rounded pauldrons, breastplate, vambraces). Facing three-quarters toward the viewer's left, one hand resting on her hip. CRITICAL — THE COLLAR: around her throat is a grim SLAVE collar of dark blackened magical metal: a heavy, seamless, riveted band of near-black arcane iron faintly etched with dim cold glowing runes — an oppressive instrument of magical bondage. It is emphatically NOT a cheerful buckled leather pet collar and NOT a BDSM choker — render it unmistakably as a hard metal slave restraint."

HV_FUR1="HAIR & FUR: a russet-auburn base marked with natural WHITE / CREAM streaks — wolfish two-tone agouti coloring: a pale cream streak running through her shaggy fringe, white underfur inside the ears, and a white tip on her russet wolf tail. Brown-and-white multi-colored, like real wolf markings, tasteful and integrated."
HV_FUR2="HAIR & FUR: a bold two-tone brown-AND-white coat, like a real wolf's markings: a clear bright white streak through the fringe, white insides of the ears, pale cream at the jaw/cheek fluff, and a distinctly white-tipped russet tail. Stronger, more dramatic brown-and-white contrast, but natural and integrated — not dyed-looking."

GEN --model "$PRO"   --out "$OUT/pro/harvautat_fur1.png"   --prompt "$STYLE $HV_COMMON $HV_FUR1" &
GEN --model "$PRO"   --out "$OUT/pro/harvautat_fur2.png"   --prompt "$STYLE $HV_COMMON $HV_FUR2" &
GEN --model "$FLASH" --out "$OUT/flash/harvautat_fur1.png" --prompt "$STYLE $HV_COMMON $HV_FUR1" &

wait
echo "DONE"
ls -la "$OUT"/pro/*.png "$OUT"/flash/*.png 2>/dev/null | awk '{print $5,$9}'