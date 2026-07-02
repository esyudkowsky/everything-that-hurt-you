#!/usr/bin/env python3
"""Draw the alpha-precise UI overlay graphics with PIL (not AI-generated):
ui_textbox, ui_status_frame, ui_floor_marker, placeholder_card.
1920x1080 coordinate space. Gold-line-on-dark-translucent isekai-UI flavor."""
from PIL import Image, ImageDraw

GOLD = (201, 168, 106, 255)
GOLD_DIM = (201, 168, 106, 140)
DARK = (12, 10, 14, 200)
DARK_SOFT = (12, 10, 14, 170)


def rounded(d, box, rad, fill=None, outline=None, width=1):
    d.rounded_rectangle(box, radius=rad, fill=fill, outline=outline, width=width)


# --- ui_textbox: lower-third dialogue box + nametag plate upper-left of box
img = Image.new("RGBA", (1920, 1080), (0, 0, 0, 0))
d = ImageDraw.Draw(img)
box = (60, 780, 1860, 1040)
rounded(d, box, 18, fill=DARK_SOFT, outline=GOLD_DIM, width=2)
rounded(d, (64, 784, 1856, 1036), 15, outline=(255, 255, 255, 18), width=1)
# nametag plate
rounded(d, (90, 726, 420, 786), 12, fill=DARK, outline=GOLD, width=2)
img.save("assets/ui/ui_textbox.png")

# --- ui_status_frame: centered status overlay frame
img = Image.new("RGBA", (1920, 1080), (0, 0, 0, 0))
d = ImageDraw.Draw(img)
box = (360, 360, 1560, 720)
rounded(d, box, 8, fill=DARK, outline=GOLD, width=3)
rounded(d, (372, 372, 1548, 708), 5, outline=GOLD_DIM, width=1)
# corner ticks, game-UI flavor
for cx, cy, dx, dy in [(360, 360, 1, 1), (1560, 360, -1, 1), (360, 720, 1, -1), (1560, 720, -1, -1)]:
    d.line([(cx, cy + 40 * dy), (cx, cy), (cx + 40 * dx, cy)], fill=GOLD, width=6)
img.save("assets/ui/ui_status_frame.png")

# --- ui_floor_marker: small centered card (numeral drawn by engine)
img = Image.new("RGBA", (1920, 1080), (0, 0, 0, 0))
d = ImageDraw.Draw(img)
box = (760, 420, 1160, 660)
rounded(d, box, 10, fill=DARK, outline=GOLD, width=3)
d.line([(800, 470), (1120, 470)], fill=GOLD_DIM, width=2)
d.line([(800, 610), (1120, 610)], fill=GOLD_DIM, width=2)
img.save("assets/ui/ui_floor_marker.png")

# --- placeholder card: flat dark rectangle (asset name drawn by engine in monospace)
img = Image.new("RGBA", (1920, 1080), (24, 22, 28, 255))
d = ImageDraw.Draw(img)
d.rectangle([12, 12, 1907, 1067], outline=(70, 66, 80, 255), width=3)
img.save("assets/ui/placeholder_card.png")

print("ui graphics drawn")
