#!/usr/bin/env python3
"""Emit claude-notes/jobs/expressions.json — all lead-character expression sprites."""
import json

BG = ("The background MUST be a single flat uniform BRIGHT NEON MAGENTA color, exactly #FF00FF at "
      "full brightness, like a greenscreen chroma key — no gradient, no vignette, no darkening. ")
STYLE = ("Art-book / key-visual quality anime visual-novel talking-sprite: confident expressive lineart, "
         "refined soft cel shading with subtle gradient rendering, luminous eyes, muted earthy palette. "
         "Appealing and distinctive, not generic.")

AVRAM_EXPR = {
    "wry": "a dry wry half-smile, one corner of the mouth raised, deadpan amused eyes",
    "discomfort": "stiff discomfort — eyes averted to the side, faint blush across the cheeks, mouth a tight line, shoulders slightly raised",
    "alarm": "alarm — eyes wide, eyebrows raised, mouth slightly open, caught off guard",
    "horror-distant": "distant horror — face gone pale, unfocused eyes staring through something far away, slack mouth",
    "sad-distant": "calm, remote sadness — grieving-before-the-fact, soft distant eyes, level quiet mouth; quiet and terrible",
    "hollow": "hollow and numb — quiet, emptied-out, a little lost and tender, drained of energy behind the eyes; NOT haggard, NO heavy dark eyebags, keep his natural healthy skin tone, mouth soft and closed, gentle rather than wrecked",
    "gentle": "a rare, small, true gentle smile, warm tired eyes",
    "strained": "barely holding together but holding — jaw set, brows drawn, tension carried in the face; eyes DRY and controlled, NOT wet, NOT glistening, NOT tearful, NOT about to cry — restrained, keeping it in",
    "unreadable": "deliberately flat and unreadable — a carefully composed neutral mask, eyes giving nothing away",
}

HER_EXPR = {
    "fierce": "a fierce combat grin, teeth showing, eyes bright with battle-joy, wolf ears up and forward",
    "fixed-smile": "a smile with IDENTICAL shape and geometry to her normal bright cheerful smile, but the eyes are open fractionally too wide and the smile reads as held one beat too long — an almost imperceptible wrongness; it must still read as 'cheerful' at first glance; do NOT make her look sad, scared, or upset",
    "matter-of-fact": "a calm, practical, matter-of-fact look — small closed mouth, level gaze, businesslike, ears in a neutral position",
    "content": "soft sleepy contentment — eyes half-closed, a gentle small closed-mouth smile, ears relaxed",
    "combat-flat": "wolf ears pressed completely flat back against her head, no smile at all, cold silent focused combat stare",
}


def avram_job(char_id, expr, desc, ref, outfit):
    return {
        "out": f"assets/sprites/{char_id}.{expr}.png",
        "sprite": True,
        "aspect": "3:4",
        "refs": [ref],
        "prompt": (
            f"Using the reference image: the exact same young man — same face, same dense dark curly "
            f"ringlet hair, same brown eyes, same {outfit}, same colors, same art style, same waist-up framing, same "
            f"three-quarter body angle toward the viewer's right. Change ONLY his facial expression to: {desc}. "
            + BG + STYLE
        ),
    }


def her_job(char_id, expr, desc, ref, outfit):
    return {
        "out": f"assets/sprites/{char_id}.{expr}.png",
        "sprite": True,
        "aspect": "3:4",
        "refs": [ref],
        "prompt": (
            f"Using the reference image: the exact same wolf-eared beastfolk young woman — same face, same "
            f"two-tone russet-brown-and-white hair and fur (white fringe streak, white ear-insides), same "
            f"amber eyes, same freckles, same solid seamless dark-iron slave collar with dim NON-glowing "
            f"engraved runes around her neck, same {outfit}, same colors, same art style, same waist-up "
            f"framing, same three-quarter body angle toward the viewer's left. Change ONLY her facial "
            f"expression (and ear position where stated) to: {desc}. "
            + BG + STYLE
        ),
    }


jobs = []

# Avram earth: shock
jobs.append(avram_job("avram_earth", "shock", "total shock — eyes very wide, lips parted, disbelief, looking around as if the world just changed", "claude-notes/raw/avram_earth.neutral.png", "modern hoodie and jacket"))

for expr, desc in AVRAM_EXPR.items():
    jobs.append(avram_job("avram", expr, desc, "claude-notes/refs/avram_traveler_master.png", "green-brown traveler's cloak over light leather armor"))
    jobs.append(avram_job("avram_late", expr, desc, "claude-notes/raw/avram_late.neutral.png", "worn travel-stained cloak over fitted steel-and-leather armor, slightly harder-edged leaner face"))

for expr, desc in HER_EXPR.items():
    jobs.append(her_job("her", expr, desc, "claude-notes/refs/her_armor_master.png", "full-coverage steel-and-leather fighting armor"))
    jobs.append(her_job("her_camp", expr, desc, "claude-notes/raw/her_camp.cheer.png", "plain earth-tone tunic camp clothes"))

# temple content-fading
jobs.append(her_job("her_temple", "content-fading", "a faint content smile just beginning to fade at the edges, eyes half-closed and tired, still pale from injury", "claude-notes/raw/her_temple.weak.png", "plain undyed sick-room gown with white bandages at the shoulder and collarbone"))

# free final-gentle (no collar!)
jobs.append({
    "out": "assets/sprites/her_free.final-gentle.png",
    "sprite": True,
    "aspect": "3:4",
    "refs": ["claude-notes/raw/her_free.still.png"],
    "prompt": (
        "Using the reference image: the exact same wolf-eared beastfolk young woman — same face, same "
        "two-tone russet-brown-and-white hair and fur (white fringe streak, white ear-insides), same amber "
        "eyes, same freckles, same nice well-made town clothes, same bare uncollared throat "
        "(NO collar, nothing around her neck), same art style, same waist-up framing, same three-quarter "
        "body angle toward the viewer's left. Change ONLY her facial expression to: a small, real, tired, "
        "gentle smile — quiet warmth from exhausted eyes; the smile of someone saying a kind goodbye. "
        + BG + STYLE
    ),
})

with open("claude-notes/jobs/expressions.json", "w") as f:
    json.dump(jobs, f, indent=1)
print(len(jobs), "jobs")
