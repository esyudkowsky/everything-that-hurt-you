#!/usr/bin/env bash
# Test Riverflow's compositional prompt-following on the scenes that were hardest in the
# original pipeline (see ART-PIPELINE.md lessons 6/8/9). Text-to-image, character
# descriptions INLINED (no reference images) so this isolates prompt-following.
set -u
cd /workspaces/everything-that-hurt-you
MODEL=sourceful/riverflow-v2.5-pro
G="python3 claude-notes/tools/gen_style.py --model $MODEL --aspect 16:9 --retries 3 --image-only"
OUT=claude-notes/style-experiments/riverflow-scenes
mkdir -p "$OUT"

STYLE="Clean anime lineart, muted earthy palette, soft cel shading, painterly detailed background. No text, no speech bubbles, no watermark. Full-scene event CG illustration for a kinetic novel, 16:9."
HER="a wolf-beastfolk young woman with pointed russet wolf ears, shaggy russet-auburn hair, amber eyes, warm tan skin, a dark iron buckled slave collar, gray steel plate armor over brown leather, clawed hands with dark nails, and a russet wolf tail"
AVR="a young man with dark tousled curly black hair, brown eyes, fair-tan skin, wearing an olive-green hooded traveler's cloak over tan leather armor"

declare -A P

P[auction_fierce]="$STYLE A slave auction dais under harsh midday light. On the wooden dais, $HER, in a DYNAMIC FIERCE COMBAT POSE: sword raised high in a two-handed guard, knees bent in a fighting crouch, a cheerful combat grin with teeth showing, ears forward, tail lashing — she is demonstrating her skill to buyers like a showpiece. Beside the dais an oily auction barker (thin mustache, burgundy vest) gestures grandly at her, mid-pitch. The crowd below is rendered ONLY as dark anonymous silhouettes seen from behind. Her cheerful ferocity is the bright center of the frame."

P[altar_everything]="$STYLE Temple of healing interior: a stone altar draped in pale cloth, many candles, sacred hush, warm candlelight. EXACTLY ONE FIGURE in frame: $AVR, standing at the altar seen from behind and slightly to the side, his face mostly hidden, jaw set. He is UPENDING his leather coin pouch over the altar — a stream of coins spilling and scattering across the altar cloth — and his sheathed sword already lies flat on the altar beside the coins. Single subject only: no duplicate figures, no extra people, no disembodied limbs."

P[grave_filled]="$STYLE Dusk in a lonely rocky clearing at the base of a tall cliff — bare stone, scree, sparse grass. THERE IS EXACTLY ONE GRAVE: the fresh one. NO other graves, NO tombstones, NO crosses, NO markers, NO lanterns, NO graveyard, NO tools of any kind — this is raw wilderness and this grave is the only one that has ever existed here. $AVR, with dirt-caked bare forearms, pushes the last of the mounded earth over the filled grave WITH HIS BARE HANDS: a low fresh rectangle of turned soil. His movements read as finished, nothing left for his hands to do. Near-dark blue dusk, first stars."

P[market_flinch]="$STYLE Daytime faux-medieval market street. FOREGROUND LEFT, large and joyful: $HER and $AVR at a skewer stall, laughing together mid-haggle, she holding grilled skewers. BACKGROUND RIGHT, SMALL and off-center in the middle distance: a well-dressed merchant has his arm raised — merely pointing up at a stall awning — while a thin young human slave beside him (simple clothes, visible collar) cringes hard away from the raised arm, shoulders up, arms half-raised to shield her head: an unmistakable trained flinch from expected blows. The merchant is not even looking at her. The two foreground characters do NOT see it. Background figures small, ordinary daylight, nothing stylized or monstrous — the horror is entirely in the body language."

pids=()
for name in auction_fierce altar_everything grave_filled market_flinch; do
  $G --out "$OUT/$name.png" --prompt "${P[$name]}" > "$OUT/$name.log" 2>&1 &
  pids+=($!)
done
fail=0
for p in "${pids[@]}"; do wait "$p" || fail=$((fail+1)); done
echo "DONE. failures=$fail"
