#!/usr/bin/env python3
"""Emit claude-notes/jobs/cgs.json — all 41 event CGs."""
import json

STYLE = ("Event CG illustration for a kinetic novel, full-scene composition, 16:9. Clean anime lineart, "
         "muted earthy palette, soft cel shading, painterly detailed background. No text, no speech "
         "bubbles, no watermark, unless the description says otherwise. ")
USE_REFS = ("Use the character(s) shown in the attached reference image(s), keeping their faces, hair, "
            "colors and outfits consistent; IGNORE the flat magenta backgrounds of the references. ")

AV = "claude-notes/refs/avram_traveler_master.png"
AV_E = "claude-notes/raw/avram_earth.neutral.png"
AV_L = "claude-notes/raw/avram_late.neutral.png"
HER = "claude-notes/refs/her_armor_master.png"
HER_C = "claude-notes/raw/her_camp.cheer.png"
HER_F = "claude-notes/raw/her_free.still.png"
GOD = "claude-notes/raw/god.serene.png"
ANN = "claude-notes/raw/announcer.barker-grin.png"
SLV = "claude-notes/raw/slavetaker.easy-menace.png"

AVRAM = ("Avram: the young man from the reference — dark curly hair, modern clean-shaven face, "
         "green-brown traveler's cloak over light leather armor, and (deliberate detail) beat-up modern "
         "Earth sneakers on his feet in any full-body shot")
AVRAML = ("Avram late-story: the young man from the reference — dark curly hair, harder-edged face, worn "
          "travel-stained cloak over fitted steel-and-leather armor, beat-up modern Earth sneakers in any "
          "full-body shot")
SHE = ("the beastfolk woman from the reference — wolf ears, russet-auburn hair, amber eyes, russet wolf "
       "tail, clawed hands, dark iron slave collar, full-coverage steel-and-leather fighting armor")
SHE_C = ("the beastfolk woman from the reference — wolf ears, russet-auburn hair, amber eyes, russet wolf "
         "tail, clawed hands, dark iron slave collar, plain earth-tone camp tunic")
SHE_F = ("the beastfolk woman from the reference — wolf ears, russet-auburn hair, amber eyes, russet wolf "
         "tail, clawed hands, plain earth-tone tunic, NO collar, bare throat visible")

CGS = [
 ("cg_tea_flash", [AV_E, GOD],
  "Avram: the young man from the first reference — dark curly hair, modern clean-shaven face, wearing his "
  "modern Earth clothes (dark hoodie and jacket, sneakers). He sits at a small floating wooden table set "
  "with a teapot and two teacups, beside the old man from the second reference — long white beard, plain "
  "robes — who serenely sips tea, his face partially shadowed and turned away. All around them: "
  "featureless bright luminous sky, no ground. Avram looks bewildered but polite. Dreamlike divine calm."),
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
  "the barker's hands rests on her dark iron slave collar — the collar is GLOWING with harsh arcane light "
  "— and his other hand rests flat on Avram's head. Avram looks deeply uncomfortable; she smiles "
  "pleasantly. Auction dais setting, crowd silhouettes blurred below."),
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
  "an absurd tower of emptied stacked plates, happily working on yet another heaped plate, ears up, tail "
  "visible. Across the table, {AVRAM} watches her with his chin propped on one hand, expression halfway "
  "between disbelief and the first hint of warmth. Warm gold light."),
 ("cg_grip_correction", [HER, AV],
  f"Close-up CG at dawn in a grassy training clearing: {SHE}'s clawed hand closed gently over {AVRAM}'s "
  "hand, correcting his grip on a sword hilt. Focus tight on the two hands and the hilt; their bodies soft "
  "behind. Morning gold light, dew."),
 ("cg_knockdown", [AV, HER],
  f"Training clearing at dawn. {AVRAM} flat on his back in the dirt, dust still rising, winded, sneakers "
  "in view. Standing over him, {SHE} offers a hand down to help him up, cheerful bright smile, ears "
  "perked, tail relaxed. Wooden practice posts around."),
 ("cg_first_strike", [AV, HER],
  f"A torchlit rough-stone dungeon corridor. {AVRAM} mid-swing, landing his first clean sword strike on a "
  "dissolving green acid-slime creature — the slime splitting apart with the hit. Behind him {SHE} whoops "
  "with both fists raised, delighted, ears up, tail out. Dynamic action framing, warm torchlight."),
 ("cg_bedroll_transparent", [AV, HER_C],
  f"Night camp under cold starry sky, small fire burned low. A large two-person bedroll shown with a "
  "stylized cutaway/transparency view into it: inside, {AVRAM} lies rigid as a plank, arms at his sides, "
  "eyes open staring straight up at the sky; {SHE_C} is curled comfortably against his side, asleep, her "
  "tail draped over his legs. His discomfort vs her perfect ease. Cold blue night, warm ember light."),
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
  "stark BLACK SILHOUETTE of a young man standing with both arms flung out. Around the frame edges, six "
  "vague dark humanoid shapes coming apart — disintegrating into drifting flecks at their edges. Absolute "
  "minimalism: white, one black figure, six dissolving shadows. No other detail."),
 ("cg_one_hand_block", [AV_L, HER],
  f"A deep dungeon hall. {AVRAML} stands calmly between {SHE} and a MASSIVE descending monster blow — a "
  "huge dark stone-crusted fist or club — stopping it dead with ONE RAISED HAND, faint light flaring at "
  "the point of contact, his cloak whipping from the impact wind. She stands behind him, safe. Total "
  "inversion of protector and protected. Monumental scale contrast."),
 ("cg_carry_road", [AV, HER],
  f"A dirt road at dusk, motion-blurred: {AVRAM} RUNNING hard down the road toward the viewer, carrying "
  f"{SHE} limp in his arms — her head against his chest, one arm hanging. Faint white-gold glow still "
  "guttering and streaming off his hands and forearms like dying sparks. Desperation, speed lines, "
  "failing light."),
 ("cg_altar_everything", [AV],
  f"Temple of healing, altar draped in pale cloth, candles. Close over-shoulder framing on {AVRAM}: his "
  "coin pouch UPENDED over the altar, coins still spilling and bouncing; his sheathed sword already laid "
  "flat on the altar cloth. His face barely visible, jaw set. 'Everything. Take everything.' Sacred hush, "
  "candlelight."),
 ("cg_vigil", [AV],
  f"A dim temple sick-room at night: a cot with a bandaged sleeping figure (wolf ears just visible above "
  f"the blanket), a single candle, and {AVRAM} sitting in the wooden chair beside the cot, elbows on "
  "knees, hands clasped, utterly unmoving, watching her. Long-night stillness. The doorway glows faint "
  "behind him."),
 ("cg_boss_bench", [HER],
  f"A vast dungeon hall with enormous sealed double doors of dark stone and bronze, steps before them. "
  f"{SHE} sits alone on the steps beside the doors, small against the colossal architecture, chin resting "
  "in both hands, tail curled around her feet, waiting patiently. Faint cold glow. The composition "
  "emphasizes how small she is against the doors."),
 ("cg_collar_removal", [AV, HER_C],
  f"Night camp, firelight. Close framing on {AVRAM}'s two hands at the dark iron collar around the neck "
  f"of {SHE_C} — the moment of removal, the clasp just opening, a faint dying glow in the collar's runes. "
  "CRITICAL: her face is NOT visible — she is turned away / cropped out of frame above the mouth. His "
  "face if visible: grave. The bare line of her throat where the collar separates is the focus."),
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
  "outstretched furry clawed hand — only the hand and forearm visible at the frame's border. NOTHING else "
  "of the figure is shown. Absolute restraint, stillness, silence. No other detail, no face, no body."),
 ("cg_digging", [AV_L],
  f"Evening near the cliff base. {AVRAML}, cloak thrown off to one side, on his knees, DIGGING a grave "
  "with his BARE HANDS — dirt caked up his forearms, a mound of earth beside him, his face down-turned "
  "and mechanical. He could conjure tools; he digs by hand. Fading violet-gray light."),
 ("cg_sick", [AV_L],
  f"Same evening gravesite: {AVRAML} kneeling turned away to one side from the half-dug grave, one hand "
  "braced on the ground, shoulders heaving, being sick — framed with restraint, his back mostly to the "
  "viewer, face hidden. The half-dug grave and dirt mound soft in the background. Muted, unglamorous "
  "grief."),
 ("cg_grave_open", [],
  "Looking down over a shoulder from above: a finished, neatly dug open grave in cleared earth near a "
  "cliff base at dusk — dark rectangular pit, clean vertical sides, dirt mounded beside, a pair of "
  "dirt-caked hands just visible at the frame's lower edge. No body visible in the grave. Quiet, final, "
  "blue-gray dusk."),
 ("cg_grave_filled", [AV_L],
  f"Dusk gravesite: {AVRAML} pushing the last of the mounded earth over the now-filled grave with his "
  "bare forearms, the ground a low fresh rectangle of turned soil. His movements read as finished — "
  "nothing left to do with his hands. Near-dark, first stars."),
 ("cg_gravestone_conjure", [AV_L],
  f"Night gravesite: {AVRAML} standing over the fresh grave with both hands extended downward, palms "
  "glowing white-gold, and a plain rectangular STONE SLAB rising up out of the earth at the grave's head, "
  "still fused with the ground, faint light tracing its edges. The stone's face is BLANK — no inscription "
  "yet. Cold stars, small warm glow."),
 ("cg_dragon_hoard", [],
  "At the very center of the world: a mountain of treasure inconceivable — coins, crowns, weapons, "
  "artifacts rising in a golden hill inside a vast dark hall — and coiled upon it, an UTTERLY BLACK "
  "dragon silhouette, wings folded, one dim ember eye. The dragon is pure black shape, no interior "
  "detail; the treasure glows faint gold. Mythic stillness."),
 ("cg_tombstone", [],
  "Close CG of a conjured stone grave marker at night at the base of a cliff: a plain rectangular stone "
  "slab standing at the head of a fresh grave of turned earth, faint white-gold conjuration light still "
  "fading around its base, stars above. The stone face is COMPLETELY BLANK AND SMOOTH — no letters, no "
  "carving (inscription will be overlaid by the game engine). Framed straight-on, the blank face large "
  "and centered."),
 ("cg_burning_walk", [AV_L],
  f"{AVRAML} walking away from the viewer down the center of a burning forest — the same dense fantasy "
  "forest now scathed and aflame on both sides, embers drifting around him, his silhouette dark against "
  "the fire-light ahead, cloak edge smoldering unnoticed. BACK TO VIEWER, steady unhurried stride. He is "
  "not fleeing the fire; the fire is his."),
]

jobs = []
for cid, refs, desc in CGS:
    prompt = STYLE + (USE_REFS if refs else "") + desc
    jobs.append({"out": f"assets/cg/{cid}.png", "aspect": "16:9", "refs": refs, "prompt": prompt})

json.dump(jobs, open("claude-notes/jobs/cgs.json", "w"), indent=1)
print(len(jobs), "jobs")
