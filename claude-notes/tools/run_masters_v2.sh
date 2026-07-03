#!/usr/bin/env bash
# Iteration 3 / master candidates, on Nano Banana Pro.
# Locked: Avram = curls1 (looser defined ringlets); Harvautat = fur2 (bold brown/white wolf).
# Collar corrections: NO glowing runes (drop the word "magical"); runes ENGRAVED/dead only;
# try to force a SOLID SEAMLESS band (no rivets, no buckle) — several phrasings, may be hard.
set -u
cd /workspaces/everything-that-hurt-you
PRO=google/gemini-3-pro-image
OUT=claude-notes/style-experiments/individuation/iter3
mkdir -p "$OUT"
GEN(){ python3 claude-notes/tools/gen_style.py --model "$PRO" --aspect 3:4 --retries 3 "$@"; }

STYLE="High-quality anime visual-novel character art, art-book / key-visual quality. Clean confident expressive linework, refined soft cel shading with an added layer of subtle gradient rendering, delicate rim lighting plus a soft warm key light, carefully rendered luminous eyes with real depth, detailed hair with individual strand flow, muted earthy palette with tasteful restrained accent saturation. Appealing, distinctive and characterful — deliberately NOT generic. Waist-up visual-novel sprite, body angled three-quarters toward CENTER. Flat solid pure bright neon magenta background exactly #FF00FF at full brightness like a greenscreen chroma key — no background gradient, no scenery, no text, no watermark."

# ---------------- AVRAM (curls1) — master candidates ----------------
AV="Avram Detwiler, a human man who is clearly YOUNG — early twenties, youthful and unlined, no older than about 23. Face: lean, deep-set thoughtful dark-brown eyes under strong dark brows, a straight well-defined nose with a slightly high bridge, light-olive skin, at most a single day's worth of light dark stubble (NOT a full beard, NOT gaunt or weathered). HAIR: dark, almost-black, DENSE DEFINED CURLS forming distinct coiled ringlets — real curly Jewish-diaspora hair texture — kept in a controlled, fairly short modern cut, close at the sides. NOT long, NOT windswept, NOT a wild flowing anime mane. His secular Central/Eastern-European Ashkenazi ancestry reads ONLY through hair texture plus naturalistic coloring and bone structure — subtle and tasteful; absolutely NO religious clothing, NO head covering, NO sidelocks, NO caricature. He wears an olive-green hooded traveler's cloak over tan leather armor; at his throat only a plain roughspun natural-linen undershirt collar — period-appropriate, deliberately NOT modern Earth clothing. Expression calm, guarded, thoughtful. Facing three-quarters toward the viewer's right."

GEN --out "$OUT/avram_curls1_a.png" --prompt "$STYLE $AV" &
GEN --out "$OUT/avram_curls1_b.png" --prompt "$STYLE $AV" &

# ---------------- HARVAUTAT (fur2) — collar experiments ----------------
HV_BODY="Harvautat, a wolf-beastfolk young woman — a specific scrappy individual, NOT a generic cute beastgirl: pointed wolf ears, large keen amber eyes with a faintly predatory glint, a light scatter of freckles across her nose and cheekbones, a small old healed nick through one eyebrow and a small notch bitten from one ear tip, warm sun-weathered tan skin, a bright genuine warm open-mouthed smile with one small fang. Clawed hands with dark nails. She wears gray steel plate armor over brown leather (rounded pauldrons, breastplate, vambraces). Facing three-quarters toward the viewer's left, one hand resting on her hip. HAIR & FUR: a bold two-tone brown-AND-white coat like a real wolf's markings: a clear bright white streak through the fringe, white insides of the ears, pale cream at the jaw/cheek fluff, and a distinctly white-tipped tail. Strong natural brown-and-white contrast, not dyed-looking."

# Three collar phrasings — all: dead/engraved runes (no glow), solid seamless, no rivets/buckle.
COLLAR_A="THE COLLAR (critical, get it exactly right): a grim slave collar that is a SINGLE SOLID SEAMLESS RING of dark blackened iron — one smooth unbroken band with absolutely NO buckle, NO clasp, NO rivets, NO hinge, NO seam and no visible fastener, closed and locked around her throat. Cold runes are shallowly ENGRAVED and incised into the dark metal surface — carved lines only, the runes are DARK, DEAD and UNLIT: no glow, no light, no luminance, not glowing at all. Just dull cold engraved dark metal."
COLLAR_B="THE COLLAR (critical): a slave collar forged as ONE SOLID PIECE of smooth matte near-black metal, like a heavy seamless torc — a continuous unbroken ring, NO rivets, NO studs, NO buckle, NO clasp, NO seam anywhere. Its only surface detail is faint runes ENGRAVED into the metal; the runes do NOT glow and emit NO light — dark carved lines in dead cold iron."
COLLAR_C="THE COLLAR (critical): a smooth solid seamless band of dark grey-black metal locked around her throat, carved from a single piece — perfectly smooth surface with NO buckle, NO clasp, NO rivets, NO fastener visible, only shallow engraved (non-glowing, unlit, dark) runes incised into it. A cold grim slave collar of plain solid metal."

GEN --out "$OUT/harvautat_fur2_collarA.png" --prompt "$STYLE $HV_BODY $COLLAR_A" &
GEN --out "$OUT/harvautat_fur2_collarB.png" --prompt "$STYLE $HV_BODY $COLLAR_B" &
GEN --out "$OUT/harvautat_fur2_collarC.png" --prompt "$STYLE $HV_BODY $COLLAR_C" &

wait
echo "DONE"
ls -la "$OUT"/*.png 2>/dev/null | awk '{print $5,$9}'