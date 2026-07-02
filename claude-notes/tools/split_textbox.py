#!/usr/bin/env python3
"""Split assets/ui/ui_textbox.png (flattened box + nametag plate) into two
full-canvas layers so the engine can hide the plate on Her's untagged lines:

  assets/ui/ui_textbox_box.png   — dialogue box only; the box's top-left
                                   corner (hidden under the plate in the
                                   flattened original) is reconstructed by
                                   mirroring the box's symmetric right side.
  assets/ui/ui_textbox_plate.png — the nametag plate region only.

Idempotent: reads only the original ui_textbox.png. Re-run after any
make_ui.py restyle. Also updates assets/manifest.json (ui section).
"""
import json
from PIL import Image

ROOT = "/workspaces/everything-that-hurt-you"
src = Image.open(f"{ROOT}/assets/ui/ui_textbox.png").convert("RGBA")
W, H = src.size
alpha = src.getchannel("A")

# --- locate plate: topmost opaque row belongs to the plate ---
bbox = alpha.getbbox()
plate_top = bbox[1]
px = alpha.load()

def row_span(y):
    xs = [x for x in range(W) if px[x, y] > 10]
    return (min(xs), max(xs)) if xs else None

# plate x-extent measured a few rows into the plate
p_x0, p_x1 = row_span(plate_top + 8)

# box top = first row where fill extends well beyond the plate span
box_top = None
for y in range(plate_top, H):
    s = row_span(y)
    if s and s[1] > p_x1 + 200:
        box_top = y
        break
assert box_top is not None
box_x0, box_x1 = row_span(box_top + 40)

# plate bottom = last row (below box_top) where the plate region's own pixels
# differ from a pure box row; conservatively: scan down for rows where the
# column just left of the box's left edge is still opaque (plate sticks out
# above/none once inside box; plate overlaps box only slightly) — simpler:
# take plate bottom as box_top + overlap margin measured from the original
# make_ui geometry (plate ends ~30px below box top). Use 36px safety.
plate_bot = box_top + 36

# --- plate layer: rectangular snapshot of the plate region ---
plate = Image.new("RGBA", (W, H), (0, 0, 0, 0))
region = src.crop((p_x0, plate_top, p_x1 + 1, plate_bot + 1))
plate.paste(region, (p_x0, plate_top))

# --- box layer: replace plate region with mirrored right-side pixels ---
# Clear and patch the exact same rectangle so no seam remains. The rect must
# start left of the box's left border so the mirrored patch (which contains
# the mirrored right border) reconstructs border + corner + fill in one piece.
box = src.copy()
mirror_sum = box_x0 + box_x1  # column x mirrors to (mirror_sum - x)
r_x0, r_x1 = box_x0 - 6, p_x1 + 8
m_x0, m_x1 = mirror_sum - r_x1, mirror_sum - r_x0
patch = src.crop((m_x0, plate_top, m_x1 + 1, plate_bot + 1)).transpose(
    Image.FLIP_LEFT_RIGHT
)
clear = Image.new("RGBA", (r_x1 - r_x0 + 1, plate_bot + 1 - plate_top), (0, 0, 0, 0))
box.paste(clear, (r_x0, plate_top))
box.paste(patch, (r_x0, plate_top))

box.save(f"{ROOT}/assets/ui/ui_textbox_box.png")
plate.save(f"{ROOT}/assets/ui/ui_textbox_plate.png")

mpath = f"{ROOT}/assets/manifest.json"
m = json.load(open(mpath))
m["ui"]["ui_textbox_box"] = "assets/ui/ui_textbox_box.png"
m["ui"]["ui_textbox_plate"] = "assets/ui/ui_textbox_plate.png"
json.dump(m, open(mpath, "w"), indent=1)

print("plate:", (p_x0, plate_top, p_x1, plate_bot), "box:", (box_x0, box_top, box_x1))
print(f"geometry percentages for engine CSS:")
print(f"  plate: left {p_x0/W*100:.2f}% top {plate_top/H*100:.2f}% right {p_x1/W*100:.2f}% bottom {plate_bot/H*100:.2f}%")
print(f"  box text area: left {box_x0/W*100:.2f}% top {box_top/H*100:.2f}% right {box_x1/W*100:.2f}% bottom {bbox[3]/H*100:.2f}%")
