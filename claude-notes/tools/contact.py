#!/usr/bin/env python3
"""Contact sheet: contact.py out.jpg cols cellheight img1 [img2 ...]
Labels each cell with its basename. Transparent images composited on gray.
"""
import os, sys
from PIL import Image, ImageDraw

def main():
    out, cols, ch = sys.argv[1], int(sys.argv[2]), int(sys.argv[3])
    paths = sys.argv[4:]
    cells = []
    for p in paths:
        img = Image.open(p).convert("RGBA")
        w = int(img.width * ch / img.height)
        img = img.resize((w, ch))
        bg = Image.new("RGBA", img.size, (110, 110, 110, 255))
        cell = Image.alpha_composite(bg, img)
        d = ImageDraw.Draw(cell)
        label = os.path.basename(p).replace(".png", "")
        d.rectangle([0, 0, 7 * len(label) + 8, 16], fill=(0, 0, 0, 200))
        d.text((4, 2), label, fill=(255, 255, 0, 255))
        cells.append(cell)
    rows = (len(cells) + cols - 1) // cols
    cw = max(c.width for c in cells)
    sheet = Image.new("RGB", (cw * cols, ch * rows), (60, 60, 60))
    for i, c in enumerate(cells):
        sheet.paste(c.convert("RGB"), ((i % cols) * cw, (i // cols) * ch))
    sheet.save(out, quality=88)
    print(out, sheet.size)

if __name__ == "__main__":
    main()
