# Revision 2.0.  May not yet be consistent with later revisions of script.md.

# EVERYTHING THAT HURT YOU — Phase 2: art catalog + informal kinetic-novel spec

## Part I. Global art style

All art in a consistent anime/manga-adjacent style: clean lineart, muted earthy palette for the world, warm firelight scenes, cold blue night scenes. Every sprite of a given character generated from the same reference sheet / seed for consistency. Lighting variants (day / night / firelight) handled by engine tinting, not separate art, except where noted. Sprites are waist-up, transparent background, facing 3/4 toward center; each character gets a left-facing and mirrored right-facing render, or the engine mirrors.

## Part II. Expression sprites (talking heads)

### AVRAM DETWILER
Human man, early 20s. Dark curly hair, a little unruly. Tired, intelligent eyes. Slight build early, visibly harder-edged in late-story art. Distinctly modern face among fantasy characters — clean-shaven, no scars until late.

Outfit variants (each needs the full expression set unless noted):
- **A-earth**: modern Earth clothes (hoodie or jacket, sneakers). Prologue + arrival only. Expressions needed: neutral, shock.
- **A-traveler**: isekai cloak, light leather armor, sword belt, and his old Earth sneakers (deliberate detail, keep in every full-body render). Sections 2–11.
- **A-late**: better armor, cloak more worn, face slightly harder. Sections 12–15.

Expression set (A-traveler and A-late):
1. **neutral** — resting, guarded.
2. **wry** — one corner of mouth, deadpan; bartender scene, banter.
3. **discomfort** — stiff, eyes averted, faint flush; bedroll, tavern, any advance.
4. **alarm** — eyes wide; bartender leaning in, ambush start.
5. **horror-distant** — pale, unfocused eyes, slack; reading the pamphlet.
6. **sad-distant** — calm, remote, grieving-before-the-fact; "then I suppose you will be the first to die by my hand."
7. **hollow** — exhausted, empty; temple vigil.
8. **gentle** — rare small true smile; restaurant panel, stew ritual.
9. **strained** — barely holding together, jaw tight, wet-eyed but not weeping; the cliff.
10. **unreadable** — deliberately flat; guildhall rumor, "I'll think on it."

### HER (Slave #3,907,825)
Beastgirl: wolf-like ears, tail, clawed hands, athletic build. Warm coloring. Slave collar visible in every sprite until section 13. Reference notes per original outline (full-coverage armor, slightly less bulky than reference, cheerful default).

Outfit variants:
- **H-armor**: full-coverage fighting armor + collar. Auction, dungeons, road.
- **H-camp**: simple camp clothes + collar. Campfires, bedroll, tavern.
- **H-temple**: bandages/plain gown + collar. Section 11 cot scenes only. Expressions needed: weak, content-fading.
- **H-free**: camp clothes, NO collar, bare throat clearly visible. Sections 13 (post-removal) and 14 only. Expressions needed: still, final-gentle. (The bare throat is the key visual of the ending; render deliberately.)

Expression set (H-armor and H-camp):
1. **cheer** — default bright smile, ears up. Used for the overwhelming majority of her lines.
2. **fierce** — combat grin, teeth showing.
3. **fixed-smile** — identical smile geometry to `cheer` but eyes fractionally too wide, held too long; auction only. Must be subtle enough to read as "cheer" on first pass.
4. **matter-of-fact** — calm, practical; bedroll opening, "they have the air of slavetakers."
5. **content** — soft, sleepy, eyes half-closed; bedroll close, stew ritual.
6. **combat-flat** — ears flat, no smile; slavetaker ambush only.
7. **weak** (H-temple) — pale, waking.
8. **still** (H-free) — expressionless, unreadable. Used for ALL her cliff dialogue except the last line. Not visibly sad — absent.
9. **final-gentle** (H-free) — small, real, tired smile; "stop thinking that you're a horrible person" through "Goodbye, Master."

**Asset-level rule: no expression conveying private anxiety, fear of Avram, or unhappiness exists in her sprite set before H-free.** Her interiority is expressed only through the fixed-smile geometry trick and, retroactively, dialogue. Do not generate or use any "sad," "worried," or "hurt" variant for her in sections 1–12.

### Side characters (2–3 expressions each)
- **Bartender** — huge muscular scarred woman, bare arms, missing one eye, apron. Expressions: gruff-neutral, menacing-lean, startled.
- **God** — old white-bearded man at tea. One sprite: serene, eyes nearly closed, mid-sip. Face never fully lit / never fully frontal.
- **Announcer** — oily auction barker, fine clothes. Expressions: barker-grin, leer.
- **Nobleman** — rich robes, soft face. Expressions: haughty, irritated (outbid).
- **Guild clerk** — young, ink-stained fingers. Expression: cheerful-surprise.
- **Adventurer 1** — bearded, mug in hand. Expressions: jeering, awed.
- **Adventurer 2** — younger, gap-toothed. Expressions: laughing, awed.
- **Healer** — gray-braided older woman, practical clothes, splint kit. Expressions: dry-neutral, pointed (delivering the warning).
- **Slavetaker captain** — weathered, easy professional menace, short black rod at belt (not visible until drawn). Expressions: easy-menace, snarl.
- **Temple attendant** — acolyte robes. Expressions: curious, pitying.
- **Skagganauk** — no talking head. Voiceover only (unique font); visual is the full-scene silhouette CG.

## Part III. Other graphics

### Backgrounds (static, full-screen, ~16:9)
1. `bg_void_tea` — featureless bright sky, small floating table, two teacups.
2. `bg_forest_day` — dense unfamiliar forest, shafts of light.
3. `bg_road_dusty` — open dusty road, low hills.
4. `bg_town_gate` — faux-medieval town gate and street.
5. `bg_guild_exterior` — Adventurer's Guild building with sign.
6. `bg_tavern` — tavern interior, bar with bottle shelves.
7. `bg_tavern_tables` — tavern interior, table seating (section 7).
8. `bg_auction_plaza` — town square with wooden dais, crowd silhouettes.
9. `bg_restaurant` — the finest restaurant in town, candlelit.
10. `bg_training_clearing` — grassy clearing, dawn light.
11. `bg_dungeon_early` — rough stone corridor, torch light (floors 1–9).
12. `bg_dungeon_mid` — worked stone, stranger architecture (floors 10–20).
13. `bg_dungeon_deep` — vast dark halls, faint glow (floors 21+).
14. `bg_boss_doors` — enormous sealed double doors, steps before them.
15. `bg_camp_night` — campfire in wilderness, starry sky.
16. `bg_market` — daytime market street with stalls.
17. `bg_forest_road` — narrow road walled by trees (ambush).
18. `bg_temple_altar` — temple of healing, altar, candles.
19. `bg_temple_cot` — plain sick-room, cot, small window, night.
20. `bg_cliff_sunset` — cliff edge at forest's end, mountains beyond, heavy sunset.
21. `bg_cliff_base` — rocky cliff face from below, twilight.
22. `bg_gravesite` — cleared earth near the cliff base, evening.
23. `bg_forest_burning` — the same forest as bg_forest_day, scathed and burning.

### Event CGs (full-screen illustrations; replace sprites+bg)
1. `cg_tea_flash` — Avram in Earth clothes seated beside the white-bearded man, teacups, bright sky. The single prologue panel.
2. `cg_auction_fierce` — her full-body on the dais, fierce sword pose, announcer gesturing.
3. `cg_auction_sexy` — her full-body, sexy pose, cheerful face, announcer leering.
4. `cg_auction_fixed` — closer crop, the fixed smile.
5. `cg_ownership_transfer` — announcer's hands on collar and Avram's head, collar glowing.
6. `cg_pamphlet_cover_runes` — pamphlet, rune cover.
7. `cg_pamphlet_cover_english` — pamphlet: MY FIRST SLAVE: SIMPLE RULES FOR EFFECTIVE USE.
8. `cg_pamphlet_rules` — open page, Rules 5–8 legible (text baked into art or overlaid by engine; prefer engine overlay for editability).
9. `cg_restaurant_plates` — tower of plates, her eating, Avram chin-on-hand.
10. `cg_grip_correction` — her clawed hand over his on the sword hilt.
11. `cg_knockdown` — Avram on his back, her offering a hand up.
12. `cg_first_strike` — Avram landing a clean hit on a dungeon creature, her whooping.
13. `cg_bedroll_transparent` — night camp, transparency/cutaway view into the shared bedroll: Avram rigid, staring up; her curled against him, tail over his legs.
14. `cg_bedroll_close` — closer crop of same: her asleep on his shoulder, his eyes open.
15. `cg_back_to_back` — the two fighting back to back, ring of fallen monsters.
16. `cg_market_flinch` — market foreground haggling/laughing; small background figure of a slave flinching from a raised hand. Background element must be small and uncentered.
17. `cg_night_practice` — Avram alone, small lights turning above his palm; her asleep beyond.
18. `cg_stew_ritual` — ladle raised, bowl held out, firelight.
19. `cg_ambush_ring` — six figures on the forest road, ahead and behind.
20. `cg_lance_hit` — her leaping in front of Avram; dark lance through her armor into her chest; sword mid-clatter. No gore beyond the strike itself.
21. `cg_scream_cutoff` — Avram on the ground, her blood on him, mouth open; speech bubble cropped by panel edge, contents unreadable.
22. `cg_whiteout` — pure white field, Avram's black silhouette arms out, six shapes disintegrating at the edges. (Also cropped/reused for montage C's one-handed block if budget is tight — otherwise:)
23. `cg_one_hand_block` — late Avram stopping a massive blow one-handed, her behind him.
24. `cg_carry_road` — Avram running down the road carrying her, faint glow guttering off his hands.
25. `cg_altar_everything` — coin pouch upended on the altar, sword laid down. "Everything. Take everything."
26. `cg_vigil` — dim sick-room, Avram in the chair, unmoving.
27. `cg_boss_bench` — her on the steps by the great doors, chin in hands, small against the architecture.
28. `cg_collar_removal` — Avram's hands at her collar, the moment of removal. Her face not visible (turned away or out of frame).
29. `cg_cliff_two` — wide shot: Avram and her on the cliff, sunset.
30. `cg_cliff_alone` — same framing, Avram alone.
31. `cg_cliff_step` — Avram approaching the edge, about to walk off it.
32. `cg_float_down` — Avram descending beside the rock face, fists glowing.
33. `cg_cliff_base_aftermath` — as written in script: pool of blood extending from an outstretched furry-clawed hand at the panel's edge. Nothing else shown. Restraint is the direction; do not elaborate beyond the script's framing.
34. `cg_digging` — Avram digging with bare hands.
35. `cg_sick` — Avram kneeling aside, turned away.
36. `cg_grave_open` — the finished open grave, viewed from above his shoulder.
37. `cg_grave_filled` — filling in.
38. `cg_gravestone_conjure` — stone rising under his glowing hands.
39. `cg_dragon_hoard` — utterly black dragon silhouette coiled on a mountain of treasure.
40. `cg_tombstone` — the tombstone, legible: Slave #3,907,825 / "Haurvatat" / Born 7005, died 7023 / I will unmake everything that hurt you, and maybe then I'll feel better. (Prefer engine text over baked text.)
41. `cg_burning_walk` — Avram walking through the burning forest, back to viewer.

### UI graphics
- `ui_textbox` — semi-transparent dark box, lower third; nametag plate upper-left of box.
- `ui_status_frame` — game-like status overlay frame for level readouts (isekai-UI flavored: thin gold border, dark translucent fill).
- `ui_floor_marker` — dungeon floor number card (large numeral, brief flash).
- `ui_title` — title screen art (suggest: the two walking a road at dusk, seen from behind, or reuse cg_dragon_hoard darkly).
- Placeholder card — flat dark rectangle with asset name in monospace, used automatically for any missing asset.

## Part IV. Informal spec — kinetic novel

**What it is.** A linear kinetic novel (no choices, no branching). Click / tap / space / enter advances. One playthrough, roughly 30–45 minutes.

**Tech.** Single-page web app: one HTML file + JS + assets folder. No build step, no server; runs from file:// or static hosting. (Ren'Py acceptable alternative if implementer prefers; web is default.)

**Layers, back to front:** background → CG (when active, covers background and sprites) → sprites (max two on screen, left/right) → visual effects (tints, flashes) → textbox → overlays (status frames, floor markers) → letterbox/voiceover mode.

**Script format.** The story ships as a plain-text script file the app parses at load. Human-editable; the rev-2 Markdown is the source of truth and should convert nearly line-for-line. Directive lines start with `@`; dialogue lines are `speaker: text`; bare text lines are narration. Minimum directive set:

```
@bg <id> [fade|cut]
@sprite <char> <expression> <left|right>   (re-issuing swaps expression in place)
@clear [left|right|all]
@cg <id>
@voiceover on|off        (black screen, Skagganauk font, centered lines)
@flash white|black <ms>
@overlay status <text block>
@overlay floor <number>
@montage begin <seconds-per-panel> ... @montage end   (auto-advance; click skips to next panel)
@pause <ms>
@sfx <id>   @bgm <id>|stop     (all audio optional; app must run silent)
@note <production note — ignored by engine, kept in script>
```

**Speaker nametags.** "Avram", "Bartender", "Healer", "Her", etc. — every speaker, including Her, displays a nametag; speaker is also indicated by sprite highlight (non-speaking sprite dims 30%). (Revised 2026-07-02 by author direction: Her's lines previously displayed no nametag; overridden, see `claude-notes/SCRIPT-TODO.md` for the history.) Skagganauk's voiceover lines have no tag either; the font is the tag.

**Fonts.** Three: (1) body font for dialogue/narration, humanist serif or clean sans; (2) Skagganauk font — angular, high-contrast display face, used ONLY for voiceover mode and nowhere else; (3) monospace/geometric UI font for status overlays and floor markers. Emphasis: `*word*` in script renders italic.

**Text behavior.** Typewriter reveal (~30 chars/sec); click completes instantly; second click advances. No auto-mode needed. No skip-mode needed (nothing to skip to).

**Key set-pieces (engine must support):**
- *Voiceover bookends*: pure black, lines fade in one at a time in the Skagganauk font. Opening interleaves one CG flash (`cg_tea_flash`) and the arrival panels between voiceover lines — so voiceover mode must be enterable/exitable repeatedly.
- *Montages* (three): timed panel sequences of CGs/backgrounds ending in a status overlay. Status overlay slides in over the last panel and waits for click.
- *Whiteout*: `@flash white` held — screen goes white, BGM cuts to silence instantly, then `cg_whiteout` fades in. Silence continues through the carry and altar scenes.
- *The scream*: `cg_scream_cutoff` shown with textbox hidden. No text. One click to pass.
- *The cliff*: sprites on `bg_cliff_sunset`; her sprite is H-free/still for everything until final-gentle. After "Goodbye, Master." — the four aftermath beats are CGs with narration only, slow fades, no music.
- *Tombstone*: `cg_tombstone` with engine-rendered inscription text, held; final voiceover lines over `cg_burning_walk`.

**Sprite conventions.** Avram defaults left, her right. Sprite changes without dialogue (reaction beats written as `: Avram: ...` silence panels) are legal: a dialogue line whose text is exactly `...` renders the ellipsis in the textbox normally.

**Flow.** Title screen (title, "Begin", optional content-notice line: "Contains depictions of slavery and suicide.") → script plays → end card → back to title. Single auto-bookmark: app remembers last line index in localStorage-equivalent and offers "Continue". No save slots, no gallery, no settings beyond text speed and volume.

**Missing assets.** Any `@bg/@cg/@sprite` referencing an absent file renders the placeholder card with the asset id. The whole novel must be playable start to finish with zero art present. This is how the build gets tested before generation.

**Asset manifest.** `assets/manifest.json` mapping ids → file paths; sprite ids compose as `char.expression` (e.g. `her.cheer`, `avram_late.strained`). Outfit variant is part of the char id (`her_temple`, `her_free`, `avram_earth`, `avram`, `avram_late`).

**Audio slots (all optional, fill later):** bgm_wistful (roads, camps), bgm_tavern, bgm_dungeon, bgm_tension (ambush), bgm_lament (temple, cliff), bgm_void (voiceover bookends); sfx_sword, sfx_impact, sfx_fire, sfx_crowd, sfx_silence-cut (a reverse-cymbal into nothing, for the whiteout).

**Out of scope:** choices, variables, flags, achievements, voice acting, localization plumbing. Do not add them.
