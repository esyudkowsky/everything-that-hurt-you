#!/usr/bin/env python3
"""Remove a flat chroma background from a sprite.

Usage: bgremove.py in.png out.png [tol]
Key color is auto-detected as the median of the four corner pixels (prompts
always request flat magenta, but the model sometimes shifts the hue). All
pixels within `tol` of the key are cleared, plus a saturation heuristic for
magenta-family halos. Alpha edge gets erosion + slight blur to kill fringe.
"""
import sys
from PIL import Image, ImageFilter


def main():
    inp, outp = sys.argv[1], sys.argv[2]
    tol = int(sys.argv[3]) if len(sys.argv) > 3 else 70
    img = Image.open(inp).convert("RGBA")
    w, h = img.size
    px = img.load()
    corners = [px[0, 0], px[w - 1, 0], px[0, h - 1], px[w - 1, h - 1]]
    key = tuple(sorted(c[i] for c in corners)[2] for i in range(3))
    # aggressive halo cleanup only when key is unambiguously bright magenta,
    # far from anything in the art palette; dark keys get a tight tolerance
    bright = key[0] > 200 and key[2] > 180 and key[1] < 100
    magenta_key = bright
    if not bright:
        tol = min(tol, 35)
    removed = 0
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            hit = abs(r - key[0]) <= tol and abs(g - key[1]) <= tol and abs(b - key[2]) <= tol
            if not hit and magenta_key:
                # generic magenta-family: strong purple/pink, g far below r and b
                hit = r > 120 and b > 100 and g < min(r, b) - 60 and abs(int(r) - int(b)) < 130
            if hit:
                px[x, y] = (0, 0, 0, 0)
                removed += 1
    a = img.getchannel("A").filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.7))
    img.putalpha(a)
    img.save(outp)
    frac = removed / (w * h)
    print(f"{outp}: key={key} removed {removed}px ({frac:.1%})")
    if frac < 0.05:
        print("WARNING: <5% removed — background likely not flat chroma", file=sys.stderr)
        return 2
    return 0


if __name__ == "__main__":
    sys.exit(main())
