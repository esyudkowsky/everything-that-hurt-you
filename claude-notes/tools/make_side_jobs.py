#!/usr/bin/env python3
"""Emit side-character sprite jobs: masters.json (fresh) and extras.json (ref-based)."""
import json

BG = ("The background MUST be a single flat uniform BRIGHT NEON MAGENTA color, exactly #FF00FF at "
      "full brightness, like a greenscreen chroma key — no gradient, no vignette. ")
STYLE = ("Clean anime lineart, muted earthy palette, soft cel shading, visual novel talking-sprite "
         "style, fantasy-medieval world. Waist-up portrait, single character, no text, no watermark.")
FACE_L = "Body and face angled three-quarters toward the viewer's left. "

CHARS = {
    "bartender": {
        "desc": "a huge muscular middle-aged tavern-keeper woman, taller and broader than most men, bare heavily-muscled scarred arms, her left eye missing — an old scar seaming across the permanently closed eyelid — short practical dark hair, a dark leather apron over a plain work shirt",
        "master": ("gruff-neutral", "gruff neutral — level unimpressed stare while wiping a mug with a rag"),
        "extras": [
            ("menacing-lean", "leaning forward menacingly, palms planted, her one good eye boring into the viewer, jaw set"),
            ("startled", "mildly startled but composed — her one good eye only SLIGHTLY widened (NOT bulging, NOT bugged fully open, NOT cartoonish), eyebrows raised just a little, lips barely parted; a tough seen-it-all tavern-keeper caught a bit off guard, understated surprise. Her scarred LEFT eye stays fully CLOSED"),
        ],
    },
    "god": {
        "desc": "an old man with a long white beard and long white hair, in plain undyed robes, holding a small ceramic teacup mid-sip; his face partially in soft shadow and turned well away from the viewer — his face is never fully lit and never fully frontal; gentle, unknowable",
        "master": ("serene", "utterly serene — eyes nearly closed, the faintest smile, mid-sip of tea"),
        "extras": [],
    },
    "announcer": {
        "desc": "an oily slave-auction barker, a middle-aged man with slicked-back dark hair, a thin curled mustache, flashy fine clothes — embroidered burgundy vest, silk cravat, rings on his fingers",
        "master": ("barker-grin", "a wide showman's barker grin, one eyebrow arched, mid-pitch to a crowd"),
        "extras": [
            ("leer", "an unpleasant oily leer, half-lidded eyes, tongue almost visible at the corner of his grin"),
        ],
    },
    "nobleman": {
        "desc": "a rich nobleman with a soft, doughy, pampered face, elaborate silk-and-fur-trimmed robes in deep blue and gold, jeweled rings, immaculately groomed",
        "master": ("haughty", "haughty — chin raised, looking down his nose with mild contempt"),
        "extras": [
            ("irritated", "irritated and flushed — scowling, jaw clenched, the look of a man who has just been outbid"),
        ],
    },
    "clerk": {
        "desc": "a young adventurer's-guild clerk, a man barely twenty with neat but ink-stained fingers, round wire spectacles, a simple brown vest over a linen shirt, a quill tucked behind one ear",
        "master": ("cheerful-surprise", "cheerful surprise — eyebrows up, bright genuine smile, looking up impressed from a document"),
        "extras": [],
    },
    "adventurer1": {
        "desc": "a burly bearded adventurer in his thirties, thick brown beard, worn leather armor over a broad chest, a tavern mug in one hand",
        "master": ("jeering", "a jeering mocking grin, leaning sideways as if over the back of a chair, mid-heckle"),
        "extras": [
            ("awed", "awed disbelief — grin gone, eyes wide, the mug halfway lowered and forgotten"),
        ],
    },
    "adventurer2": {
        "desc": "a younger lanky adventurer barely out of his teens, messy sandy hair, a visible gap between his front teeth, simple padded gambeson",
        "master": ("laughing", "laughing open-mouthed, head tipped back a little, gap-toothed grin on full display"),
        "extras": [
            ("awed", "awed disbelief — laughter gone, eyes wide, mouth still half-open but silent"),
        ],
    },
    "healer": {
        "desc": "an older traveling healer woman in her sixties, gray hair in a single long braid over her shoulder, weathered practical travel clothes with many pockets and a leather satchel of splints and bandages",
        "master": ("dry-neutral", "dry, level, seen-it-all neutrality — faint knowing crease at the mouth"),
        "extras": [
            ("pointed", "a pointed, direct look — one eyebrow slightly raised, mouth set, delivering an unwelcome truth kindly but without mercy"),
        ],
    },
    "slavetaker": {
        "desc": "a weathered slavetaker captain in his forties, short gray-flecked hair, several days' stubble, light practical dark armor with no insignia, an easy confident posture; no weapon visible in frame",
        "master": ("easy-menace", "easy professional menace — a relaxed, almost friendly half-smile that never reaches his flat cold eyes"),
        "extras": [
            ("snarl", "an ugly snarl of rage and pain, teeth bared, all professionalism gone"),
        ],
    },
    "attendant": {
        "desc": "a young temple acolyte woman in pale healer's-temple robes with a simple cord belt, short neat dark hair",
        "master": ("curious", "open curiosity — slight head tilt, eyebrows raised, studying something odd"),
        "extras": [
            ("pitying", "soft pity — brows tilted up, a small sad sympathetic almost-smile, shaking-her-head energy"),
        ],
    },
}

masters, extras = [], []
for cid, c in CHARS.items():
    expr, edesc = c["master"]
    masters.append({
        "out": f"assets/sprites/{cid}.{expr}.png",
        "sprite": True,
        "aspect": "3:4",
        "prompt": f"Visual novel character sprite: {c['desc']}. Expression: {edesc}. {FACE_L}{BG}{STYLE}",
    })
    for expr2, edesc2 in c["extras"]:
        extras.append({
            "out": f"assets/sprites/{cid}.{expr2}.png",
            "sprite": True,
            "aspect": "3:4",
            "refs": [f"claude-notes/raw/{cid}.{expr}.png"],
            "prompt": (f"Using the reference image: the exact same character — {c['desc']} — same colors, same art "
                       f"style, same waist-up framing, same angle. Change ONLY the expression/pose to: {edesc2}. "
                       + BG + STYLE),
        })

json.dump(masters, open("claude-notes/jobs/side_masters.json", "w"), indent=1)
json.dump(extras, open("claude-notes/jobs/side_extras.json", "w"), indent=1)
print(len(masters), "masters,", len(extras), "extras")
