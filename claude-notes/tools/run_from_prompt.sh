#!/usr/bin/env bash
# Generate the two leads FROM PROMPT ONLY (no image references), across the latest image models.
set -u
cd /workspaces/everything-that-hurt-you
G="python3 claude-notes/tools/gen_style.py --aspect 3:4 --retries 3"
OUT=claude-notes/style-experiments/from-prompt

STYLE="Art style: clean anime lineart, muted earthy palette, soft cel shading. Flat solid pure bright neon magenta background, exactly #FF00FF at full brightness like a greenscreen chroma key — no gradient, no scenery, no text, no watermark."

AVR="Character concept sprite for a fantasy visual novel. A young man in his early twenties named Avram: dark tousled curly black hair, thick dark eyebrows, tired intelligent brown eyes, clean-shaven fair-tan skin, a lean thoughtful face. He wears an olive-green hooded traveler's cloak over tan light-brown leather armor with rounded shoulder pauldrons, a leather strap across the chest, and a buckled belt. Expression: calm, guarded, neutral. Waist-up, body angled three-quarters toward the viewer's right. $STYLE"

HER="Character concept sprite for a fantasy visual novel. A young wolf-beastfolk woman: pointed russet wolf ears on top of her head, shaggy shoulder-length russet-auburn hair, large amber eyes, warm tan skin, a bright cheerful open-mouthed smile showing one small fang. Around her neck a dark iron buckled slave collar. She wears gray steel plate armor over brown leather — rounded pauldrons, a fitted breastplate, vambraces — and clawed hands with dark nails; a russet wolf tail. Expression: bright, cheerful, open. Waist-up, body angled three-quarters toward the viewer's left, one hand resting on her hip. $STYLE"

# key|model
MODELS=(
"nano_banana_pro|google/gemini-3-pro-image"
"gpt5.4_image2|openai/gpt-5.4-image-2"
"nano_banana_2_lite|google/gemini-3.1-flash-lite-image"
)

pids=()
for m in "${MODELS[@]}"; do
  IFS='|' read -r key model <<< "$m"
  $G --model "$model" --out "$OUT/$key/avram.png" --prompt "$AVR" > "$OUT/$key.avram.log" 2>&1 &
  pids+=($!)
  $G --model "$model" --out "$OUT/$key/her.png" --prompt "$HER" > "$OUT/$key.her.log" 2>&1 &
  pids+=($!)
done

fail=0
for p in "${pids[@]}"; do wait "$p" || fail=$((fail+1)); done
echo "DONE. failures=$fail"
