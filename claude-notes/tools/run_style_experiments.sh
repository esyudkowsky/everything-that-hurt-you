#!/usr/bin/env bash
# Generate the two leads in several art styles across different frontier image models.
set -u
cd /workspaces/everything-that-hurt-you
G="python3 claude-notes/tools/gen_style.py --aspect 3:4 --retries 3"
OUT=claude-notes/style-experiments

AVR_REF=claude-notes/refs/avram_traveler_master.png
HER_REF=claude-notes/refs/her_armor_master.png

AVR_DESC="the young man from the reference image: dark tousled curly black hair, thick dark eyebrows, tired intelligent brown eyes, clean-shaven fair-tan skin, wearing an olive-green hooded traveler's cloak over tan leather armor with shoulder pauldrons and a chest strap. Waist-up portrait, body angled three-quarters toward the viewer's right, calm guarded neutral expression."
HER_DESC="the wolf-beastfolk young woman from the reference image: pointed russet wolf ears, shaggy shoulder-length russet-auburn hair, large amber eyes, warm tan skin, a bright cheerful open smile with a small fang, a dark iron buckle collar around her neck, gray steel plate armor over brown leather (pauldrons, breastplate, vambraces), clawed hands with dark nails. Waist-up portrait, body angled three-quarters toward the viewer's left, one hand resting on her hip, bright cheerful expression."

FRAME="Restyle this character into the art style described below. KEEP the same character design, face, hair, eye color, outfit and colors as the reference image; ONLY the art style changes. Flat solid pure magenta background, exactly #FF00FF at full brightness like a greenscreen chroma key, no gradient, no scenery, no text, no watermark. ART STYLE:"

# style_key|model|style_text
STYLES=(
"painterly|google/gemini-3-pro-image|Painterly semi-realistic fantasy digital painting. Rich visible brushwork, dramatic soft cinematic lighting, detailed rendering like high-end fantasy novel cover key art, subtle color variation across skin and metal, atmospheric depth."
"watercolor|openai/gpt-5.4-image-2|Soft hand-painted watercolor storybook illustration. Gentle translucent washes, visible cold-press paper texture, delicate loose ink linework, muted warm pastel palette, gentle bleeding edges."
"retro90s_anime|openai/gpt-5-image|Vintage 1990s cel-animation anime style. Hand-painted cels, subtle film grain, slightly desaturated retro palette, bold confident linework, nostalgic OVA aesthetic, flat cel shading with hard shadow shapes."
"ink_graphic_novel|google/gemini-3-pro-image|Bold western graphic-novel ink style. Heavy black inking, dramatic cross-hatching and spot blacks, limited flat color fills, high-contrast comic-book rendering, strong confident brush lines."
)

pids=()
for s in "${STYLES[@]}"; do
  IFS='|' read -r key model style <<< "$s"
  $G --model "$model" --ref "$AVR_REF" --out "$OUT/$key/avram.png" \
     --prompt "$FRAME $style Subject: $AVR_DESC" > "$OUT/$key.avram.log" 2>&1 &
  pids+=($!)
  $G --model "$model" --ref "$HER_REF" --out "$OUT/$key/her.png" \
     --prompt "$FRAME $style Subject: $HER_DESC" > "$OUT/$key.her.log" 2>&1 &
  pids+=($!)
done

fail=0
for p in "${pids[@]}"; do wait "$p" || fail=$((fail+1)); done
echo "DONE. failures=$fail"
