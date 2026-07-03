#!/usr/bin/env bash
# Two things at once, on the ORIGINAL Google model(s):
#  1. Better aesthetics prompted directly from Nano Banana 2 (gemini-3.1-flash-image),
#     with Nano Banana Pro (gemini-3-pro-image) for the harder cases.
#  2. Individuation variations so Avram & Harvautat read as specific people, not generic.
#     Avram: subtle modern-Earth + secular-Ashkenazi heritage as naturalistic coloring/bone
#     structure ONLY — no religious markers, no caricature.
# Text-to-image (no refs) since we're redesigning the character look.
set -u
cd /workspaces/everything-that-hurt-you
FLASH=google/gemini-3.1-flash-image
PRO=google/gemini-3-pro-image
OUT=claude-notes/style-experiments/individuation
mkdir -p "$OUT/flash" "$OUT/pro"
GEN(){ python3 claude-notes/tools/gen_style.py --aspect 3:4 --retries 3 "$@"; }

# --- Upgraded aesthetic direction (stays in the shipped anime family, but pushed) ---
STYLE="High-quality anime visual-novel character art, art-book / key-visual quality. Clean confident expressive linework, refined soft cel shading with an added layer of subtle gradient rendering, delicate rim lighting plus a soft warm key light, carefully rendered luminous eyes with real depth, detailed hair with individual strand flow, muted earthy palette with tasteful restrained accent saturation. Appealing, distinctive and characterful — deliberately NOT generic. Waist-up visual-novel sprite, body angled three-quarters toward CENTER. Flat solid pure bright neon magenta background exactly #FF00FF at full brightness like a greenscreen chroma key — no background gradient, no scenery, no text, no watermark."

# --- AVRAM ---
AV_BASE="Avram Detwiler, a human man in his early twenties: dark, almost-black, loosely curling unruly hair; tired intelligent eyes; clean-shaven; lean build. He wears an olive-green hooded traveler's cloak over tan leather armor with a chest strap. Expression: calm, guarded, thoughtful. Facing three-quarters toward the viewer's right."

# individuation language (tasteful, subtle, no stereotype)
AV_INDIV="Give him a SPECIFIC, memorable, modern face that reads as a real present-day-Earth young man dropped into a fantasy world — subtly out of place among fantasy natives. Individuation: a lean longish face with defined cheekbones, deep-set thoughtful dark-brown eyes under strong dark brows, a straight well-defined nose with a slightly high bridge, light-olive skin. His ancestry is secular Central/Eastern-European Ashkenazi Jewish — convey this ONLY through naturalistic coloring and bone structure, tastefully and subtly; absolutely NO religious clothing, NO head covering (no kippah), NO sidelocks, NO caricature, NO exaggerated features — he just looks like a specific real person of that background."
AV_EARTH_TELL="Subtle Earth tell: the plain ribbed crew-neck collar of a modern grey cotton t-shirt is just visible at his throat beneath the leather armor — quietly anachronistic."

GEN --model "$FLASH" --out "$OUT/flash/avram_aesthetic.png" --prompt "$STYLE $AV_BASE" &
GEN --model "$FLASH" --out "$OUT/flash/avram_A_modern.png" --prompt "$STYLE $AV_BASE $AV_INDIV $AV_EARTH_TELL" &
GEN --model "$FLASH" --out "$OUT/flash/avram_B_worn.png"   --prompt "$STYLE $AV_BASE $AV_INDIV A day or two of faint dark stubble, a little more travel-weathered and hollow-cheeked, hair a bit wilder. A thin dark leather cord necklace (a plain modern-looking pendant) sits at his collarbone as a quiet Earth keepsake." &
GEN --model "$PRO"   --out "$OUT/pro/avram_A_modern.png"   --prompt "$STYLE $AV_BASE $AV_INDIV $AV_EARTH_TELL" &
GEN --model "$PRO"   --out "$OUT/pro/avram_B_worn.png"     --prompt "$STYLE $AV_BASE $AV_INDIV A day or two of faint dark stubble, a little more travel-weathered and hollow-cheeked, hair a bit wilder. A thin dark leather cord necklace (a plain modern-looking pendant) sits at his collarbone as a quiet Earth keepsake." &

# --- HARVAUTAT ---
HV_BASE="Harvautat, a wolf-beastfolk young woman: pointed russet wolf ears, shaggy shoulder-length russet-auburn hair, large amber eyes, warm tan skin, a bright cheerful open-mouthed smile showing one small fang; a dark iron buckled slave collar at her throat; gray steel plate armor over brown leather (rounded pauldrons, breastplate, vambraces); clawed hands with dark nails; a russet wolf tail. Facing three-quarters toward the viewer's left, one hand resting on her hip."

HV_INDIV="Make her a SPECIFIC individual, not a generic cute beastgirl: a keen, faintly predatory glint in sharper more angular amber eyes; a light scatter of freckles across her nose and cheekbones; a small old healed nick through one eyebrow and a small notch bitten out of the tip of one wolf ear; weathered sun-tanned skin; wilder, asymmetric, lived-in hair — a scrappy veteran fighter — while KEEPING her bright, genuine, warm cheerfulness. Canine sharpness, real personality, a little feral."

GEN --model "$FLASH" --out "$OUT/flash/harvautat_aesthetic.png" --prompt "$STYLE $HV_BASE" &
GEN --model "$FLASH" --out "$OUT/flash/harvautat_A_feral.png"    --prompt "$STYLE $HV_BASE $HV_INDIV" &
GEN --model "$FLASH" --out "$OUT/flash/harvautat_B_athletic.png" --prompt "$STYLE $HV_BASE Make her a SPECIFIC individual, not a generic cute beastgirl: a stronger jaw and more athletic, less dainty proportions; deeper russet hair with paler cream underfur on the ears; a scatter of freckles; amber eyes with a bright confident glint; a couple of faint old scars on exposed skin. She still beams with genuine warmth. Distinctive and real, not moe." &
GEN --model "$PRO"   --out "$OUT/pro/harvautat_A_feral.png"      --prompt "$STYLE $HV_BASE $HV_INDIV" &

wait
echo "DONE"
ls -la "$OUT"/flash/*.png "$OUT"/pro/*.png 2>/dev/null | awk '{print $5, $9}'