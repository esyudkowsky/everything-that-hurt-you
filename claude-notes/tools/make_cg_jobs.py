#!/usr/bin/env python3
"""Emit claude-notes/jobs/cgs.json — all event CGs.

Revised 2026-07-03 (author pass): upgraded aesthetic; individuated leads
(Avram = dense dark Ashkenazi ringlet curls, NO sneakers anywhere -> worn boots;
Haurvatat = brown-and-white two-tone wolf coat, solid seamless dark-iron runed
slave collar with NON-glowing engraved runes); her free-outfit is nice town
clothes (not a slave shift); plus folded ART-TODO fixes and new CGs.
"""
import json

STYLE = ("Event CG illustration for a kinetic novel, full-scene composition, 16:9, art-book / key-visual "
         "quality. Confident expressive anime lineart, refined soft cel shading with subtle gradient "
         "rendering, painterly detailed background, delicate cinematic lighting, muted earthy palette with "
         "restrained accent saturation. Appealing and distinctive, not generic. No text, no speech "
         "bubbles, no watermark, unless the description says otherwise. ")
USE_REFS = ("Use the character(s) shown in the attached reference image(s), keeping their faces, hair, "
            "colors, markings and outfits consistent; IGNORE the flat magenta backgrounds of the references. ")

AV = "claude-notes/refs/avram_traveler_master.png"
AV_E = "claude-notes/raw/avram_earth.neutral.png"
AV_L = "claude-notes/raw/avram_late.neutral.png"
HER = "claude-notes/refs/her_armor_master.png"
HER_C = "claude-notes/raw/her_camp.cheer.png"
HER_F = "claude-notes/raw/her_free.still.png"
GOD = "claude-notes/raw/god.serene.png"
ANN = "claude-notes/raw/announcer.barker-grin.png"
SLV = "claude-notes/raw/slavetaker.easy-menace.png"

# --- lead descriptors (NO sneakers anywhere per ART-TODO #16; worn boots instead) ---
AVRAM = ("Avram: the young man from the reference — dense dark almost-black curly ringlet hair in a short "
         "modern cut, clean-shaven youthful face, green-brown hooded traveler's cloak over tan leather "
         "armor with a plain roughspun linen undershirt, and worn leather boots in any full-body shot")
AVRAML = ("Avram late-story: the young man from the reference — same dense dark curly ringlet hair, "
          "slightly harder-edged face, worn travel-stained cloak over fitted steel-and-leather armor, "
          "worn leather boots in any full-body shot")
# Earth-clothes Avram, freshly arrived and roughing it: he has NOT yet acquired his fantasy cloak/armor
# (those appear only from the town gate on). Dirty and travel-worn from days in the wild.
AVRAM_E = ("Avram: the young man from the reference — dense dark almost-black curly ringlet hair, clean-shaven "
           "youthful face, wearing his ordinary modern EARTH clothes (a dark hoodie under an open dark jacket, "
           "plain trousers) now DIRTY and travel-worn — dust, grime and a stray leaf or two on him, hair a bit "
           "unkempt; he has NO fantasy cloak and NO armor yet, just the disheveled Earth clothes")
# Haurvatat: two-tone brown-and-white wolf coat + solid seamless non-glowing runed iron slave collar
SHE_LOOK = ("wolf ears, two-tone russet-brown-and-white hair and fur (a white streak through the fringe, "
            "white insides of the ears, a white-tipped tail), amber eyes, freckles across the nose, a small "
            "notch in one ear, clawed hands with dark nails, and a solid seamless dark blackened-iron slave "
            "collar engraved with dim NON-glowing runes")
SHE = (f"Haurvatat, the wolf-beastfolk woman from the reference — {SHE_LOOK}, in full-coverage "
       "steel-and-leather fighting armor")
SHE_C = (f"Haurvatat, the wolf-beastfolk woman from the reference — {SHE_LOOK}, in a plain earth-tone camp "
         "tunic")
# free: NO collar, bare throat, NICE town clothes (not a slave shift)
SHE_F = ("Haurvatat, the wolf-beastfolk woman from the reference — wolf ears, two-tone russet-brown-and-white "
         "hair and fur (white fringe streak, white ear-insides, white-tipped tail), amber eyes, freckles, "
         "clawed hands, wearing plain but well-made town clothes (a simple nicely-made tunic-dress, the kind "
         "bought for wandering a town — NOT a slave shift, NOT rags), and CRITICALLY no collar of any kind, "
         "her bare throat fully and clearly visible")

CGS = [
 ("cg_tea_flash", [AV_E, GOD],
  "Avram: the young man from the first reference — dense dark curly hair, clean-shaven, wearing his modern "
  "Earth clothes (dark hoodie and open jacket). He sits at a small floating round wooden table set with a "
  "teapot and two teacups, beside the old man from the second reference — long white beard, plain robes — "
  "who serenely sips tea, his face partially shadowed and turned away. All around them featureless bright "
  "luminous sky, no ground, NOTHING else floating: NO stairs, NO staircase, no other objects — only the "
  "small table and two chairs in the void. Avram looks bewildered but polite. Dreamlike divine calm."),
 # Chapter-1 opening beats (author 2026-07-03): a three-CG forest micro-scene BEFORE the town — Avram
 # still in dirty Earth clothes (no cloak yet). cg_forest_trek = "and another rises / the Summoned Hero";
 # the two slime CGs = "not supreme" / "but they fight" — his first clumsy, rock-not-skill kill. SUBTLE
 # expressions per the author's doctrine (lesson 15). The cloak/armor only appear from the town gate on.
 ("cg_forest_trek", [AV_E],
  f"A green fantasy forest in dappled daylight, an overgrown game-trail winding between mossy trees. {AVRAM_E}, "
  "full body, making his way through the woods — mid-stride, pushing past a low branch, tired and disheveled "
  "after days lost in the wild, looking around to get his bearings. Expression SUBTLE: weary and a little wary, "
  "NOT distressed, NOT exaggerated, mouth closed; keep his normal warm tan skin tone. Ordinary worn shoes. "
  "Quiet green wilderness, no path signs, no other people."),
 ("cg_slime_backoff", [AV_E],
  f"A sunlit green fantasy forest, dappled daylight. {AVRAM_E}, full body, taking one wary step BACKWARD "
  "away from a knee-high translucent green acid-slime creature oozing toward him across the forest floor. "
  "He is a raw newcomer who has never fought: he has NOT drawn a weapon (he has none), one hand raised warily, "
  "weight on his back foot. Expression SUBTLE — only slightly worried and nervous: a small wary frown, brows a "
  "little raised, eyes on the slime. NOT terrified, NOT screaming, mouth CLOSED with no teeth, NOT open-mouthed, "
  "NOT bug-eyed, NOT cartoonishly panicked; keep his normal warm tan skin tone. Ordinary worn shoes. Green "
  "canopy light, quiet ordinary danger."),
 ("cg_slime_rock", [AV_E],
  f"The SAME sunlit green forest a moment later, same trees and lighting for continuity. {AVRAM_E}, full "
  "body, standing over the now-defeated acid-slime: a big heavy rock has been dropped squarely onto it, the "
  "slime flattened and harmlessly splattered under the stone (green goo only, no gore). He stands catching "
  "his breath, looking down at his handiwork. Expression SUBTLE — quiet understated satisfaction and mild "
  "relief, mouth closed or the faintest wry almost-smile; NOT a big grin, NOT a triumphant fist-pump, NOT "
  "exaggerated. He solved it with a rock, not skill. Ordinary worn shoes, green canopy daylight."),
 ("cg_auction_fierce", [HER, ANN],
  f"A slave auction dais under harsh midday light. {SHE}, full body on the wooden dais, striking a FIERCE "
  "pose with a sword — combat grin, teeth showing, ears forward. Beside the dais, the oily auction barker "
  "from the second reference gestures grandly at her, mid-pitch. Crowd below rendered only as dark "
  "silhouettes seen from behind. Her cheerful ferocity is the bright center of the frame."),
 ("cg_auction_sexy", [HER, ANN],
  f"A slave auction dais under harsh midday light. {SHE}, full body on the dais, striking an exaggerated "
  "pin-up style pose — one hand behind her head, hip cocked — while her face keeps its simple BRIGHT "
  "CHEERFUL smile, fully at odds with the pose's intent; she is doing a routine, not flirting. The oily "
  "barker from the second reference leers and gestures. Crowd as dark silhouettes from behind. Fully "
  "clothed in her full-coverage armor; nothing revealing — the pose is the performance."),
 ("cg_auction_fixed", [HER],
  f"Close crop, waist-up: {SHE} on the auction dais, harsh light. Her smile has the exact same cheerful "
  "shape as always, but her eyes are open a fraction too wide and the smile is held a beat too long — a "
  "fixed smile, subtle wrongness, still reading as cheer at first glance. Blurred crowd silhouettes below, "
  "out of focus."),
 ("cg_ownership_transfer", [ANN, HER, AV],
  f"The moment of a magical ownership transfer: the oily barker stands between {SHE} and {AVRAM}. One of "
  "the barker's hands rests on her dark-iron slave collar — at THIS moment of transfer the collar's runes "
  "flare awake with cold blue arcane light — and his other hand rests flat on Avram's head. Avram looks "
  "deeply uncomfortable; she smiles pleasantly. Auction dais setting, crowd silhouettes blurred below."),
 ("cg_pamphlet_cover_runes", [],
  "Object close-up CG: two hands (young man's hands, one visible sleeve of a green-brown cloak) holding a "
  "small cheaply-printed pamphlet. The cover shows ONLY inscrutable angular fantasy runes — an invented "
  "alien script, definitely NOT readable as any real language — plus a crude woodcut-style illustration of "
  "a collar. Shallow depth of field, dusty street bokeh behind."),
 ("cg_pamphlet_cover_english", [],
  "Object close-up CG: the same small cheaply-printed pamphlet held in the same young man's hands, same "
  "framing, but now the cover text is in plain blunt English block letters: 'MY FIRST SLAVE' as the large "
  "title, and beneath it the subtitle 'SIMPLE RULES FOR EFFECTIVE USE'. Same crude woodcut collar "
  "illustration. The text must be exactly as written, legible, correctly spelled."),
 ("cg_pamphlet_rules", [],
  "Object close-up CG: an open pamphlet lying flat, lit by campfire light. The visible page shows a "
  "numbered list layout — but all body text is rendered as soft unreadable printed-looking placeholder "
  "lines (blurred greeked text), NO real words, so text can be overlaid by the game engine later. A thumb "
  "rests at the margin beside the fifth entry."),
 ("cg_restaurant_plates", [AV, HER],
  f"Interior of the finest restaurant in town, candlelit, white tablecloth. {SHE} sits at the table behind "
  "a modest comical little stack of a FEW emptied plates (not a huge tower — just several), happily working "
  "on another heaped plate, ears up, tail visible. Across the table, {AVRAM} watches her with his chin "
  "propped on one hand, expression halfway between disbelief and the first hint of warmth. Warm gold light."),
 ("cg_grip_correction", [HER, AV],
  f"Close-up CG at dawn in a grassy training clearing: {SHE}'s clawed hand closed gently over {AVRAM}'s "
  "hand, correcting his grip on a sword hilt. Focus tight on the two hands and the hilt; their bodies soft "
  "behind. Morning gold light, dew."),
 ("cg_knockdown", [AV, HER],
  f"Training clearing at dawn. {AVRAM} flat on his back in the dirt, dust still rising, winded, worn boots "
  "in view. Standing over him, {SHE} offers a hand down to help him up, cheerful bright smile, ears "
  "perked, tail relaxed. Wooden practice posts around."),
 ("cg_first_strike", [AV, HER],
  f"A torchlit rough-stone dungeon corridor. {AVRAM} mid-swing, landing his first clean sword strike on a "
  "dissolving green acid-slime creature — the slime splitting apart with the hit. Behind him {SHE} whoops "
  "with both fists raised, delighted, ears up, tail out. Dynamic action framing, warm torchlight."),
 ("cg_bedroll_transparent", [AV, HER_C],
  f"Night camp under cold starry sky, small fire burned low. A large two-person bedroll shown as a clear "
  "cross-section / cutaway (a neat transparent slice through the blankets so we see inside, unmistakably a "
  "cutaway view). Inside: {AVRAM} lies rigid as a plank, arms at his sides, eyes open staring straight up; "
  f"{SHE_C} is curled comfortably against his side, asleep. CRITICAL ANATOMY: show her COMPLETE body "
  "correctly — full torso, hips, and both legs present and properly connected, her tail draped over his "
  "legs; NOTHING cut off at the waist, no missing or floating limbs, no detached boot. His discomfort vs "
  "her perfect ease. Cold blue night, warm ember light."),
 ("cg_bedroll_close", [AV, HER_C],
  f"Closer crop of the same night bedroll scene, cutaway view: {SHE_C} asleep against {AVRAM}'s shoulder, "
  "utterly content, breathing soft; his eyes still open, fixed on the stars, unreadable. Intimate framing, "
  "cold blue night palette with faint warm ember light on their faces."),
 ("cg_back_to_back", [AV, HER],
  f"A worked-stone dungeon hall, floor fourteen. {AVRAM} and {SHE} fighting BACK TO BACK at the center of "
  "a ring of fallen monster bodies (canine shadow-beasts, defeated, no gore), both mid-guard, both "
  "confident. Equal partners composition — neither larger. Cool stone light, torch accents."),
 ("cg_market_flinch", [AV, HER],
  f"Daytime market street. FOREGROUND, large and cheerful: {SHE} and {AVRAM} at a skewer stall, "
  "mid-haggle with laughter, she holding skewers. BACKGROUND, small, off-center, easy to miss: another "
  "master raising a hand merely to gesture at a stall — and his thin collared slave flinching hard away "
  "from the raised hand. Neither Avram nor she is looking at it. The background element must be small and "
  "NOT centered; foreground joy dominates."),
 ("cg_night_practice", [AV, HER_C],
  f"Deep night camp. {AVRAM} sits apart from the dying fire, awake, holding one open palm up: a spiral of "
  "small white-gold lights turning slowly above his hand, lighting his focused face from below. Beyond "
  "him, out of the light, {SHE_C} sleeps by the fire. Secret, quiet, cold stars above."),
 ("cg_stew_ritual", [HER_C, AV],
  f"Campfire at dusk. {SHE_C} holds up a wooden ladle from the stew pot in offering, ears up, soft "
  "cheerful; {AVRAM} holds out his bowl to receive it. A practiced wordless ritual between them — calm "
  "domestic warmth. Firelight palette."),
 ("cg_ambush_ring", [AV, HER, SLV],
  f"A narrow forest road walled by dark trees, late day. {AVRAM} and {SHE} halted at center, "
  "back-to-back-adjacent, tense. SIX armed figures in dark practical armor step out of the treeline — "
  "some ahead, some behind, encircling. The lead figure is the weathered captain from the third reference, "
  "relaxed, professionally menacing. No weapons drawn yet. Tense standoff composition."),
 ("cg_lance_hit", [HER, AV],
  f"The wound, on the forest road: {SHE} mid-leap in front of {AVRAM}, her body between him and the "
  "attack, arms spread — a crackling LANCE OF DARK FORCE from off-frame punching through her chest armor. "
  "Her sword spins away mid-clatter. Avram's face behind her: beginning to understand. Restraint: the "
  "dark energy impact and shattered armor plate only, NO gore, no visible wound detail. Motion, shock, "
  "grief-about-to-happen."),
 ("cg_scream_cutoff", [AV],
  f"Aftermath on the forest road: {AVRAM} on the ground on his knees, her blood streaked on his cloak and "
  "hands (dark stains, restrained), head thrown back, MOUTH OPEN in a scream. A comic-style speech bubble "
  "rises from him but is CROPPED by the panel edge so its contents are cut off and unreadable — only the "
  "bubble's edge shows. His scream has no words we can read. Wide desperate framing, cold light."),
 ("cg_whiteout", [],
  "A pure white field — the entire frame washed out white, no linework, no background. At center: the "
  "stark BLACK SILHOUETTE of a young man standing with both arms flung out. CRITICAL: the silhouette's "
  "OUTLINE must clearly read as his fantasy cloak-and-armor profile — broad armored shoulders/pauldrons, a "
  "cloak or cape flaring out at his sides, armored bulk — NOT a plain casual t-shirt outline. Around the "
  "frame edges, six vague dark humanoid shapes coming apart, disintegrating into drifting flecks at their "
  "edges. Absolute minimalism: white, one armored black figure, six dissolving shadows. No other detail."),
 ("cg_carry_road", [AV, HER],
  f"A dirt road at dusk, motion-blurred: {AVRAM} RUNNING hard down the road toward the viewer, carrying "
  f"{SHE} limp in his arms — her head against his chest, one arm hanging. CONTINUITY: her chest armor is "
  "visibly cracked and punched through where the dark lance struck it, and there is restrained dark blood "
  "at that wound and smeared on his arms (restrained, not graphic — matching the earlier strike). Faint "
  "white-gold glow still guttering off his hands and forearms like dying sparks. Desperation, speed, "
  "failing light."),
 ("cg_altar_everything", [AV],
  f"Temple of healing, a stone altar draped in pale cloth, candles, sacred hush. Over-shoulder framing on "
  f"{AVRAM} at the near side of the altar: his coin pouch UPENDED over the altar, coins still spilling; his "
  "sheathed sword already laid flat on the altar cloth. Standing BEHIND the altar, facing him, a robed "
  "temple priestess receives the payment, hands folded, grave and quiet. EXACTLY TWO figures in frame "
  "(Avram and the priestess) — no duplicate figures, no extra people, no disembodied limbs. Candlelight."),
 ("cg_vigil", [AV],
  f"A dim temple sick-room at night: a cot with a bandaged sleeping figure (wolf ears just visible above "
  f"the blanket), a single candle, and {AVRAM} sitting in the wooden chair beside the cot, elbows on "
  "knees, hands clasped, utterly unmoving, watching her. A temple attendant (young woman, short dark hair) "
  "stands watching quietly from the glowing doorway behind him. Long-night stillness."),
 ("cg_boss_bench", [HER],
  f"A vast dungeon hall with enormous sealed double doors of dark stone and bronze, steps before them. "
  f"{SHE} sits alone on the steps beside the doors, small against the colossal architecture, elbows on "
  "knees, hands clasped tight, tail curled around her feet. Her expression is ANXIOUS and on-edge — "
  "worried, tense, watching the doors, NOT smiling, waiting for something behind them to end. Faint cold "
  "glow. The composition emphasizes how small she is against the doors."),
 ("cg_boss_fight", [AV_L],
  f"Inside a huge boss chamber deep in the dungeon: {AVRAML} ALONE, mid-fight against a massive dungeon "
  "boss (a hulking dark stone-and-shadow monster looming over him), his sword blazing with white-gold "
  "magic, a fireball or light-blast leaving his other hand. He is holding his own — competent, rising, "
  "not desperate. Dynamic action, dramatic cold chamber light cut by his magic. Exactly one human figure."),
 ("cg_boss_win", [AV_L],
  f"The finishing moment in the boss chamber: the massive boss coming apart / collapsing into dissolving "
  f"dark shards, and {AVRAML} standing alone amid the settling ruin, sword lowered, spent but victorious, "
  "his magic guttering out around him. Aftermath stillness, shafts of cold light, drifting motes. Exactly "
  "one human figure, alone."),
 ("cg_collar_removal", [AV, HER_C],
  f"Night camp, firelight. Close framing on {AVRAM}'s two hands at the dark-iron collar around the neck "
  f"of {SHE_C} — the moment of removal, the seam of the collar just parting, a faint dying glow in the "
  "runes as the binding releases. CRITICAL: her face is NOT visible — she is turned away / cropped out of "
  "frame above the mouth. His face if visible: grave. The bare line of her throat where the collar "
  "separates is the focus."),
 ("cg_cliff_two", [AV_L, HER_F],
  f"WIDE SHOT: a cliff edge at the end of a forest under a heavy molten sunset, mountains beyond. Two "
  f"small figures stand near the edge, a few paces apart: {SHE_F} nearer the edge looking out, and "
  f"{AVRAML} behind her. Their smallness against the vast sunset is the point. Heavy orange-crimson sky, "
  "long shadows."),
 ("cg_cliff_alone", [AV_L],
  f"THE EXACT SAME wide cliff-edge framing as before — same cliff, same sunset, same mountains, same "
  f"camera — but now ONLY {AVRAML} stands there, alone, in the same spot he stood before. The space where "
  "the other figure stood is empty. Heavy orange-crimson sky, long shadows."),
 ("cg_cliff_step", [AV_L],
  f"Close-wide framing at the cliff edge, sunset failing to dusk: {AVRAML} walking calmly toward the very "
  "edge, one foot about to step past the rim into open air. Seen from the side. His face calm, spent. "
  "Not a jump — a step, like walking down a stair that isn't there."),
 ("cg_float_down", [AV_L],
  f"The dark rocky cliff face at twilight, seen from a distance: {AVRAML} descending slowly through the "
  "air alongside the rock wall, upright, arms slightly extended, both fists wrapped in faint white-gold "
  "glow that lowers him like a slow elevator. Cold blue-gray light, small figure against the vast rock."),
 ("cg_cliff_base_aftermath", [],
  "Twilight at the rocky base of a cliff. The frame shows mostly bare stone and scree in dim blue-gray "
  "light. At the very EDGE of the panel: a still pool of dark blood extending outward from a single "
  "outstretched clawed hand — a human-shaped hand with dark claws/nails, skin visible, NOT covered in fur "
  "(no shaggy fur on the hand or forearm — just the claws); only the hand and forearm visible at the frame's "
  "border. NOTHING else of the figure is shown. Absolute restraint, stillness, silence. No other detail, no "
  "face, no body."),
 ("cg_digging", [AV_L],
  f"Evening near the cliff base. {AVRAML}, cloak thrown off to one side, on his knees, DIGGING a grave "
  "with his BARE HANDS — dirt caked up his forearms, a mound of earth beside him, his face down-turned "
  "and mechanical. He could conjure tools; he digs by hand. Worn boots, no sneakers. Fading violet-gray "
  "light."),
 ("cg_sick", [AV_L],
  f"Same evening gravesite: {AVRAML} kneeling turned away to one side from the half-dug grave, one hand "
  "braced on the ground, shoulders heaving, being sick — framed with restraint, his back mostly to the "
  "viewer, face hidden. The half-dug grave and dirt mound soft in the background. Muted, unglamorous "
  "grief."),
 ("cg_grave_open", [],
  "Looking down over a shoulder from above: a finished, neatly dug open grave in cleared earth near a "
  "cliff base at dusk — dark rectangular pit, clean vertical sides, dirt mounded beside, a pair of "
  "dirt-caked hands just visible at the frame's lower edge. No body visible in the grave. Quiet, final, "
  "blue-gray dusk. NO tombstone, NO cross, NO markers, NO tools — bare wilderness."),
 ("cg_grave_filled", [AV_L],
  f"Dusk gravesite: {AVRAML} pushing the last of the mounded earth over the now-filled grave with his "
  "bare forearms, the ground a low fresh rectangle of turned soil. His movements read as finished — "
  "nothing left to do with his hands. NO other graves, NO cross, NO markers, NO tools of any kind — lone "
  "wilderness. Near-dark, first stars."),
 ("cg_gravestone_conjure", [AV_L],
  f"Night gravesite: {AVRAML} standing over the fresh grave with both hands extended downward, palms "
  "glowing white-gold, and a plain rectangular STONE SLAB rising up out of the earth at the grave's head, "
  "still fused with the ground, faint light tracing its edges. The stone's face is BLANK — no inscription "
  "yet. Cold stars, small warm glow."),
 ("cg_dragon_hoard", [],
  "At the very center of the world, a vast dark cathedral-like hall of impossible scale. COSMIC SCALE IS "
  "THE POINT: a TITANIC utterly black dragon — roughly thirty stories tall, the size of a skyscraper — "
  "coiled upon a colossal mountain of treasure (coins, crowns, weapons, artifacts) that is itself "
  "enormous. Any columns, stairs or doorways in the hall read as TINY by comparison, dwarfed. The dragon "
  "is a pure black silhouette, no interior detail, one dim ember eye; the treasure glows faint gold. "
  "Overwhelming mythic scale, a being that ends worlds."),
 ("cg_tombstone", [],
  "Close CG, framed straight-on, of a conjured stone grave marker at night at the base of a cliff: a plain "
  "rectangular stone slab standing at the head of a fresh grave of turned earth, faint white-gold "
  "conjuration light still fading around its base, stars above. The stone face is CARVED with this exact "
  "epitaph, deeply and legibly incised in plain block letters, correctly spelled, centered, five short "
  "lines:\n"
  "SLAVE #3,907,825\n"
  "\"HAURVATAT\"\n"
  "BORN 7005  DIED 7023\n"
  "I WILL UNMAKE EVERYTHING THAT HURT YOU\n"
  "AND MAYBE THEN I'LL FEEL BETTER\n"
  "The lettering must be the actual carving in the stone. Nothing else carved."),
 ("cg_burning_walk", [AV_L],
  f"{AVRAML} walking away from the viewer down the center of a burning forest — a dense fantasy forest now "
  "scathed and aflame on both sides, embers drifting around him, his silhouette dark against the "
  "fire-light ahead, cloak edge smoldering unnoticed. BACK TO VIEWER, steady unhurried stride. He is not "
  "fleeing the fire; the fire is his."),
 ("cg_forest_walk", [AV_L],
  f"{AVRAML} walking away from the viewer down the center of an ordinary green fantasy forest path in calm "
  "daytime light — the SAME forest as cg_burning_walk but whole and alive, dappled sun, green canopy, "
  "quiet. BACK TO VIEWER, steady unhurried stride, same pose and framing as the burning-forest shot so the "
  "two read as a matched before/after pair. Calm, ordinary, a little lonely."),
]

jobs = []
for cid, refs, desc in CGS:
    prompt = STYLE + (USE_REFS if refs else "") + desc
    jobs.append({"out": f"assets/cg/{cid}.png", "aspect": "16:9", "refs": refs, "prompt": prompt})

json.dump(jobs, open("claude-notes/jobs/cgs.json", "w"), indent=1)
print(len(jobs), "jobs")
