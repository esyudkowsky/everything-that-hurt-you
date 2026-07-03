#!/usr/bin/env python3
"""Emit claude-notes/jobs/backgrounds.json — 22 remaining backgrounds."""
import json

STYLE = ("Visual novel background art, 16:9 full-screen, art-book quality, NO people, no characters, no "
         "text, no watermark. Refined anime-style painted background with crisp lineart edges, atmospheric "
         "cinematic lighting, muted earthy palette, tasteful restrained detail. ")

BGS = {
    "bg_void_tea": "A featureless, bright, softly luminous sky in every direction — no ground, no horizon. Floating impossibly in the middle of the air: a small round wooden table set with a simple teapot and two teacups, and two plain chairs. Serene, dreamlike, divine waiting-room calm. Soft white-gold light.",
    "bg_road_dusty": "An open dusty dirt road stretching toward the horizon through low rolling hills, sparse grass, afternoon light, a few distant trees. Big sky. The long empty middle of a journey.",
    "bg_town_gate": "A faux-medieval fantasy town gate seen from just outside: weathered stone archway with wooden doors standing open, a cobbled street visible beyond with timber-framed buildings, daylight.",
    "bg_guild_exterior": "The exterior of an Adventurer's Guild in a faux-medieval fantasy town: a large sturdy timber-and-stone building with a hanging wooden sign over the door bearing crossed swords and the words ADVENTURER'S GUILD, notice board beside the entrance, daylight street.",
    "bg_tavern": "A fantasy tavern interior viewed from a seat at the bar: the long wooden bar counter in the foreground, and behind it shelves crowded with bottles, kegs, hanging mugs, warm lamplight. No people.",
    "bg_tavern_tables": "A fantasy tavern interior, the table-seating area: heavy wooden tables and benches, candles, warm firelight from a hearth on one wall, low timber ceiling beams. No people.",
    "bg_auction_plaza": "A faux-medieval town square set up for an auction: a raised wooden dais/platform at center-back with steps, bunting, and around its base a dense crowd rendered ONLY as dark anonymous silhouettes seen from behind, faceless. Harsh midday light. Slightly oppressive mood.",
    "bg_restaurant": "The interior of the finest restaurant in a faux-medieval fantasy town: candlelit tables with white cloths, fine tableware, warm golden light, wood-paneled walls, subtle luxury by medieval standards. No people.",
    "bg_training_clearing": "A grassy forest clearing at dawn: dew on the grass, pale gold-pink first light slanting between distant trees, mist low on the ground, a few worn practice posts. Quiet promise.",
    "bg_dungeon_early": "A dungeon corridor, upper floors: rough natural stone walls crudely reinforced, wooden torch brackets with burning torches, warm flickering light, packed-dirt floor. Shallow, almost welcoming danger.",
    "bg_dungeon_mid": "A dungeon corridor, middle floors: precisely worked stone in a style no human culture built, subtly wrong non-euclidean geometry, narrower joints, faint carved patterns that seem to watch, cooler bluer light from sparse guttering torches, long shadows. A place growing stranger and more dangerous.",
    "bg_dungeon_deep": "A dungeon depth, the deep floors: a vast pitch-dark stone hall whose ceiling is lost in absolute blackness, colossal alien columns receding into gloom, a faint sourceless blue-green glow bleeding along the floor seams, cold mist pooling low. Menacing, ancient, indifferent, wrong — a place humans were never meant to reach. Oppressive dread.",
    "bg_boss_doors": "Enormous sealed double doors of dark stone and blackened bronze at the end of a vast dungeon hall, covered in dim carvings, broad stone steps leading up to them, faint cold glow. The doors dwarf everything.",
    "bg_camp_night": "A wilderness campsite at night: a small campfire burning warm orange at center-low, bedrolls beside it, dark treeline behind, and above a huge cold starry sky in deep blues. Warm firelight pocket inside cold night.",
    "bg_market": "A faux-medieval daytime market street: wooden stalls with awnings, hanging goods, crates of produce, skewer-grill smoke, cheerful daylight. No people.",
    "bg_forest_road": "A narrow dirt road walled in tightly on both sides by dense dark forest, late-day light failing to reach the road, long sightlines ahead and behind cut off by curves. A perfect place for an ambush. Tense stillness.",
    "bg_temple_altar": "The interior of a temple of healing: a stone altar at center draped in pale cloth, many lit candles, soft holy light from high narrow windows, herb bundles and offering bowls. Hushed sanctuary.",
    "bg_temple_cot": "A plain temple sick-room at night: a simple cot with clean linens, a small window showing night sky, a single candle on a stool, a wooden chair beside the cot, whitewashed walls. Quiet vigil mood.",
    "bg_cliff_sunset": "A cliff edge where a forest ends: grass and stone running out to the drop, an immense view beyond of forested valleys and far mountains, under a heavy, molten, deep-orange and crimson sunset sky. Vast, beautiful, final.",
    "bg_cliff_wide": "A wide, dramatic cliff-edge vista at the end of a forest under a heavy molten orange-crimson sunset: the grassy stone rim runs across the lower-middle of the frame with the sheer drop just beyond, an immense view of forested valleys and far mountains below and ahead, big burning sky. Framed and composed as a stage for two figures to stand at the very edge (open foreground rim, the drop and vista behind). Vast, beautiful, final — the precipice is palpable.",
    "bg_cliff_base": "The base of a tall rocky cliff seen from below at twilight: the dark rock face rising out of frame, scree and boulders at its foot, dim blue-gray failing light. Cold and silent.",
    "bg_gravesite": "A small patch of cleared earth near the base of a cliff at evening: soft dug soil, sparse grass around it, a few stones, the cliff shadow falling long, dusk light in muted violet-gray. Bare and quiet. No gravestone yet.",
    "bg_forest_burning": "REFERENCE IMAGE PROVIDED: the same dense fantasy forest as the reference, now scathed and burning — trees charred and aflame, embers drifting, smoke columns, the undergrowth scorched away, orange fire-light replacing the green. Keep recognizably the same forest and art style as the reference.",
}

jobs = []
for bid, desc in BGS.items():
    job = {"out": f"assets/bg/{bid}.png", "aspect": "16:9", "prompt": STYLE + desc}
    if bid == "bg_forest_burning":
        job["refs"] = ["assets/bg/bg_forest_day.png"]
    jobs.append(job)

json.dump(jobs, open("claude-notes/jobs/backgrounds.json", "w"), indent=1)
print(len(jobs), "jobs")
