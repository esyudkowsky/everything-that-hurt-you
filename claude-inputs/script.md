# EVERYTHING THAT HURT YOU — full script (rev. 4)

*Regenerated from the stage script `/script.txt` (the file the engine plays), 2026-07-03.
`/script.txt` is the source of truth; this master mirrors it in enough detail that edits
here can be echoed back into the stage script. See `claude-inputs/SCRIPT-CHANGES.md` for
the rev. 3 → rev. 4 diff and the (now inverted) sync direction.*

## Conventions

- `## <n>. <Title>` headings match the `@chapter` markers in `/script.txt`.
- `\- ` a Skagganauk-font voiceover line (white-outline lettering). A voiceover group is
  either **ON BLACK** (only the very first line of the story) or **OVER** the image named
  in the `: [ … ]` panel that precedes it (letterboxed over the live scene).
- `: [assets] …` a panel / staging description. The bracket names the exact engine assets
  it stages — `[cg_id]`, or `[bg_id | left-sprite expr L, right-sprite expr R]`, or
  `[cg_id + sprite expr]` — so a human editing the prose can see which staging unit they
  are touching and a later session can map each line back to a `/script.txt` block.
  Sprite slots: Avram defaults **L**, her **R**; side characters take whichever slot is free
  (max two on screen). A non-speaking sprite dims; narration renders italic.
- `Speaker: line` dialogue, verbatim from `/script.txt` (dialogue text is sacred — copied
  character-for-character, including *emphasis* and em-dashes). Every speaker, **including
  "Her," shows a nametag** (author direction 2026-07-02; the old "Her has no nametag" rule
  is dropped). A line whose text is exactly `...` is a legal silence panel.
- `> ` a status / inscription overlay line (engine-rendered text over the scene), verbatim.
- Sound and full-screen effects appear on their own bracketed lines where they are
  load-bearing: `[bgm: bgm_x]`, `[bgm: stop]`, `[sfx: sfx_x]`, `[flash white]`. Routine
  engine texture (fade-vs-cut, `@pause`, `@clear`) is omitted unless losing it would change
  what a reader thinks happens on screen.

Production notes that still apply are kept inline in parentheses.

---

## 1. Opening

[bgm: bgm_void]

: [cg_truck_cross] Earth, an overcast day. Avram in Earth clothes, mid-stride on a crosswalk.
: [cg_truck_turn] Closer — he stops, head turning, the first instant of noticing.
: [cg_truck_see] The oncoming truck, headlights flaring: the moment *before*. No impact is shown.

ON BLACK — Skagganauk font (this is the only voiceover line that sits on solid black; every
group after it is superposed over its image):

\- I tell you now a tale of the planet, Elhom IV.

[flash white]

: [cg_tea_flash] A bright flash-panel: Avram in Earth clothes beside an old white-bearded man
at a small floating tea table, featureless bright sky all around. No dialogue.

\- The world of Elhom IV has a cycle.

: [bg_forest_day | avram_earth neutral L] Avram, in Earth clothes, newly arrived in a forest in
the middle of nowhere — composed, not shocked; he expected to materialize here. (The "Demon Lord"
line is deliberately superposed over his *arrival* — a hint; keep the pairing. The truck prequel
carries the shock beat, so this arrival stays calm.)

\- From time to time, arises a Demon Lord, feared and accursed

: [cg_forest_trek] A dirty Avram, still in his original Earth clothes (no cloak yet), making his
way through a green forest — weary and disheveled after days lost in the wild. (Was bg_road_dusty +
avram neutral; he stays in Earth clothes through the forest and only acquires the cloak by the town gate.)

\- And another rises to fight them

\- The great, the powerful, the Summoned Hero

: [cg_slime_backoff] Avram — still the dirty Earth-clothes newcomer — warily backing off from his first
forest acid-slime, subtly worried, no weapon (he has none), weight on his back foot. (These two slime CGs
are more action-y, so the picture shows first and the line fades in ON A CLICK.)

\- They are not supreme when they first arrive

: [cg_slime_rock] The same forest a moment later: Avram (Earth clothes) standing over the slime, which he
has just killed by dropping a heavy rock on it — quiet, understated satisfaction, a first kill by rock not
skill. Line fades in on a click. ("gain in strength" rides the same CG.)

\- But they fight, in forests, in arenas, in dungeon labyrinths

\- And they gain in strength very quickly

: [bg_town_gate | avram back L] Avram, seen from BEHIND, proceeding toward the gates of a
faux-medieval town. (Line appears immediately with the picture.)

\- Not uncommonly, the outsiders are summoned from higher worlds that have invented their own stories, of places not unlike Elhom IV. It's more convenient that way, perhaps. It leaves less to explain.

: [bg_guild_exterior | avram back L] Avram, seen from BEHIND, before the Adventurer's Guild building.
(Line fades in on a click.)

\- There is much about Elhom IV that Avram Detwiler finds strangely familiar.

: [bg_tavern] Avram pushing into a tavern.

\- But what Avram has not as yet been told, it seems

\- Is that there are always two outsiders summoned from another world, not one.

[bgm: stop]

---

## 2. The Bartender

[bgm: bgm_tavern]

: [bg_tavern | avram neutral L, bartender gruff-neutral R] Avram at the bar, before the
bartender — a huge, muscular, scarred woman with bare arms, missing one eye.

Avram: Glass of traveler's mead.

Bartender: Eight copper.

: Avram slides coins across the counter. The bartender slides back a glass.

Avram: Got a rumor I'd like to check on.

: The bartender turns away, to the bottles on the other side of the bar. (Staging carried by
narration; sprite stays gruff-neutral.)

Bartender: Twelve silver.

: [avram neutral L] (Was `avram wry`; the wry sprite read as a dopey grin, so this calm-conversation
beat uses the neutral face.)

Avram: It's not that type of - look, I'm not sure there's anything to this. Could just have been a guy messing with another guy. But have you heard anything about a rising Demon Lord?

Bartender: Aw *slimespit.*

: [bartender menacing-lean R | avram alarm L] The bartender leans in.

Bartender: What'd you hear, kid? Tell me everything. Now.

Avram: I just heard some guy talking about it! That's why I'm asking whether -

Bartender: Some guy *where* saying *what?*

Avram: Some guy in the middle of nowhere who I heard say something about a Demon Lord! That's all I heard, okay? I know practically nothing. That's why I'm *asking.*

Avram: If the Demon Lord has shown up, I'd really like to know where they are, what they're doing.

Avram: Whether their forces are invading here tomorrow.

Avram: That kinda thing.

: [bartender startled R]

Bartender: Deathstorms and balefire! No, I haven't heard anything.

Bartender: I wouldn't be staying on the same continent if I'd heard the next Demon Lord had shown up here, ya know?

Bartender: Or the Summoned Hero either, for that matter. I'd wish the Hero the best of luck fighting, but not the point where I'd want to die for gawking at it, ya know?

: [avram neutral L]

Avram: Yeah, I know.

: Avram drinks from his glass again.

: [bartender gruff-neutral R | avram neutral L] (Not a smiling thought — was `avram wry`, the dopey
viewer-grin; now the neutral face.)

Avram: You know, maybe this is a stupid thought. Feel free to tell me why it's stupid.

Avram: But if Summoned Heroes are supposed to learn so fast, why don't they just stay hidden and keep leveling to the point where they can take out the Demon Lord quickly and without wrecking a continent?

Avram: Like, geez, have some consideration for everybody who lives there.

Bartender: Ha! Doesn't sound very *heroic*.

Avram: That's the only reason you can think of for why the Summoned Hero doesn't do that? It's not heroic enough?

Bartender: I don't think people become heroes without pride, ya know?

: [avram neutral L]

Avram: One might argue that the Summoned Hero ought to take pride in carefully executing their responsibility, to everyone in the world, to defeat the Demon Lord with minimum casualties and risk of failure.

Bartender: Sounds more like a villain's style to me.

Bartender: If you think like that, the Summoned Hero ought to buy a high-level fighting slave and get carried through dungeons, like a sheltered noble scion, right? To avoid the risk that they get killed while they're still weak?

Bartender: But people like that aren't *heroes.* They'd never work up the courage to face the Demon Lord in the end.

: [avram unreadable L] (He hasn't heard before that this is an option.)

Avram: ...

[bgm: stop]

---

## 3. The Auction

[bgm: bgm_tension] · [sfx: sfx_crowd]

: [bg_auction_plaza] The plaza is packed. On the dais, one lot after another is walked out, made
to turn, appraised, and sold.

: [cg_auction_fierce] The beastgirl on the dais: full-coverage armor, slave collar, cheerful
smile, posing fiercely with a sword. The announcer gestures at her; no dialogue bubble.

: [cg_auction_sexy] She strikes a sexy pose, face still cheerful; the announcer now leering.

: [announcer barker-grin R]

Announcer: A *war*-slave, sers! Blooded on the low floors, sound of wind and limb — wolf-blood stock, twice as hardy as any human and worth three warriors on a campaign!

: [cg_nobleman_bid] A rich-looking robed nobleman near the front raises his hand and
names a price. (Two heavy scarred bodyguards
behind him, a skeletally thin, scarred, collared girl kneeling at his side. The entourage shows the fate of his slaves.)

A rich-looking, robed nobleman near the front — two heavy scarred bodyguards behind him, a skeletally thin, scarred, collared girl kneeling at his side — raises his hand and names a price.

: [cg_auction_fixed] Her smile is still there, but it looks fixed. (Must read as "cheer" on first
pass; do not linger.)

: [bg_auction_plaza | avram eyes-narrowed L]

Avram raises his hand.

: [nobleman irritated R]

The nobleman raises his hand and names a higher number.

: [avram neutral L]

Avram empties the purse across the clerk's table.

: [nobleman irritated R]

The nobleman looks at him with disgust, and lets his hand fall.

: The announcer takes Avram's coin, guages him, and hands him a small printed pamphlet before gesturing him and the beast-girl toward the back of the auction stand.

: [cg_pamphlet_cover_runes] The pamphlet cover, inscrutable runes.

My first slave: Rules for effective use.

: [bg_auction_plaza | avram horror-distant L] (Pale, unfocused, slack — Avram reading the pamphlet
in his hand.)

: [cg_ownership_transfer] The announcer lays one hand on her collar, one on top of Avram's head;
the collar's runes light up. The binding passes from the auction-house to Avram.

The announcer puts one hand on her collar, and one hand on top of Avram's head. The collar's runes light up. The binding passes from the auction-house to Avram.

Announcer: [Ownership Transfer.]

The runes go dark. She belongs to him now.

[sfx: stop] · [bgm: bgm_wistful]

: [bg_market | avram discomfort L, her cheer R] Walking away from the auction; she follows,
collared, in armor.

Avram: So. Um. I bought you to help me clear dungeons. I'm not planning to sexually assault you.

Avram: You didn't *look* like the prospect of risking your life in a dungeon would horrify you to the point where you'd rather have gone with the other guy instead.

Avram: It *looked* like you'd be better off with me. Like your life would be - better for my buying you, than my not buying you, if those were your only two options.

Avram: If I was wrong about that - please speak up.

Her: Helping you clear dungeons is fine, Master! Is there a reason you wouldn't also have sex with me?

Avram: It's - against the customs of my people.

Avram: Are you hungry? Do you need a shower, or a doctor, or new underwear, or - or anything at all?

Her: No, Master. I was fed just yesterday.

Avram exhales.

Avram: God. How the hell do I say this? Do this?

Avram: Um. I want you to have an experience that is... as comfortable as it can be under these circumstances.

Avram: I don't mean that I'm ordering you to pretend to be happy.

Avram: Just... please let me know, how we can do this, in a way that minimizes fear and uncertainty for you. On the inside.

Avram: A smile on the outside isn't what I'm looking for, not unless you mean it.

Avram: And the *point* of this whole concept is to make things easier on you, which means, I'm *not* going to punish you if you don't get it right.

Her: Master's wishes... are my command? I'm not sure I understand Master's wishes, though.

Avram: That's fine.

Avram: Next we're going to the finest restaurant in this town and eating a nice meal together, including any of your favorite foods that are on the menu regardless of what they cost.

Avram: And, if it's okay with you, I'd rather you didn't say anything about how grateful you are for such kindly treatment from me.

Her: Why not, Master? It's sort of an obvious thing to say.

Avram: I mean, I *wish* I could say, it's okay for you to thank me if you want to. But I won't actually be able to avoid looking horribly uncomfortable if you do.

: [bg_restaurant → cg_restaurant_plates] A tower of emptied plates; she's working on another;
Avram watching from across the table, chin on hand — his one early unguarded moment (the "gentle"
face is baked into the CG).

---

## 4. Naming

: [bg_town_gate | avram discomfort L, her cheer R] Walking out through the town gates, road stretching ahead.

Avram: So. What do I call you? What's your —

: (Production note: this is the only time in the entire story she interrupts him. The engine cuts
his typewriter reveal short.)

Her: Whatever Master likes! A slave's name is her master's to give.

Avram: No, I meant, the name you had before you —

She taps a clawed finger on her collar, bright.

Her: This says my name is #3,907,825. That's a lot of syllables for a dungeon, Master. You should pick something shorter.

: [avram unreadable L] Looking at her sideways for a long panel.

Avram: ...

Avram: ...I'll think on it.

[flash black]

(The nickname he settles on is never shown in dialogue; her nametag reads "Her" throughout —
the engine-rendered tag, not her actual chosen name.)

---

## 5. She Teaches Him

: [bg_training_clearing | avram neutral L, her cheer R]

On the road, she sizes up what he can't do yet, and appoints herself his teacher.

: (Montage, 4 panels:)
: [cg_grip_correction] Training clearing, dawn: her clawed hand closed over his on the hilt.
: [cg_knockdown] Avram flat on his back; her standing over him, offering a hand up, cheerful.
: [cg_slime_lecture] Dungeon floor three: her pointing at an acid-slime with her sword, lecturing;
Avram nodding along like a student.
: [cg_first_strike] Floor five: his first clean strike; her whooping behind him.

---

## 6. Bedroll

: [bg_camp_night | avram neutral L] By the campfire one night, Avram flips through the pamphlet.

: [cg_pamphlet_rules] The open page, rules legible, his thumb resting next to Rule 5:

> RULE 5: Feed and equip a fighting slave as you would a soldier. Skimping on her meat is skimping on your own shield, and her armor is your investment.
> RULE 6: Be polite, and don't ask your slave about their training. Slaves with bad trainers won't want to remember it, and good trainers will request their students not to reveal the master's proprietary techniques.
> RULE 7: Establish a routine early. A slave who knows what each day holds serves better than one who must guess.

: [bg_camp_night | avram neutral L] Avram closes the pamphlet, and heads to his bedroll.

: [her_camp matter-of-fact R] She lifts the edge of his bedroll.

Her: Master. You're cold.

: [avram discomfort L]

Avram: I'll live.

Her: Master, part of the reason your bedroll is cold is that it's made to hold two people. It's not meant for you to be alone.

Avram: ...

Avram: ...Fine. Warmth only.

: [cg_bedroll_transparent] Transparency/cutaway into the bedroll: Avram rigid as a plank, staring
at the sky; her curled against his side, tail over his legs, eyes closed for the following lines.

Her: Master, since we're sharing warmth anyway —

Avram: No.

Her: You didn't hear the rest of it.

Avram: The answer to the rest of it is also no.

: [cg_bedroll_close, tint off] Closer crop: her asleep against his shoulder, content. His eyes still open.

---

## 7. Tavern

: [bg_guild_hall | avram neutral L, clerk cheerful-surprise R] Guild interior — clerk's desk, notice board.

Clerk: Floor nine already?

: [avram wry L]

Avram: We've been lucky.

: [status overlay]

> [AVRAM — Wolf School Swordsmanship: Lv 1 → Lv 6 · Fire Magic: Lv 0 → Lv 2]
> [SLAVE #3,907,825 — Wolf School Swordsmanship: Lv 11 → Lv 12]

[bgm: bgm_tavern]

: [bg_tavern_tables | avram neutral L, her_camp cheer R] The tavern is crowded. Three adventurers
at the next table, deep in cups.

: [adventurer1 jeering R]

Adventurer 1: Oi. That your slave?

Avram: She's with me.

Adventurer 1: Heard about you two. The boy who buys a beauty like that and bunks like a monk.

: [adventurer2 laughing R]

Adventurer 2: Maybe his sword arm's the only arm that works!

: Laughter. (The room laughs first — no her-sprite yet, so it reads as the tavern's, not hers.)

: [her_camp cheer R] She works through a plate of her favorite food, unbothered.

: [adventurer1 jeering R] Mock-solemn.

Adventurer 1: It's cruelty is what it is. Girl like that, and he makes her sleep *cold*.

: [her_camp cheer R] Brightly, mouth half full.

Her: I don't sleep cold. Master shares the bedroll.

: [adventurer2 awed R] Dead silence at the next table — handed off from her.

Adventurer 2: Shares the bedroll. And *nothing?*

: [adventurer1 awed R]

Adventurer 1: That's not a monk, that's a *saint*. Or a corpse.

: [avram discomfort L] Avram stands, putting coins on the table.

Avram: We're done.

: [her_camp cheer R] She follows, grabbing one last skewer.

Her: Goodnight, sers!

: [bg_town_gate, tint night | avram discomfort L, her_camp cheer R] Outside. (The bg change +
night tint carry "outside"; no narration needed.)

[bgm: bgm_wistful]

Her: Did I say something wrong, Master?

Avram: No.

Avram: Yes.

Avram: We don't want to look anomalous.

Her: Yes, Master.

: [avram unreadable L]

Avram: ...

Her: ...

Avram: I wonder if it's my imagination that I can almost hear you thinking it.

---

## 8. Campfire

: [bg_camp_night, tint firelight → cg_campfire_shoulder] The two-shot CG (her head on his shoulder)
holds through Avram's opening line, then falls back to sprites.

Avram: You can go ahead and say what you're thinking. I feel like I can still hear it.

Her: We'd look less like an anomaly if you told them you were fucking me.

Avram: I hate lying and somebody with superior Social Skills might catch me at it.

Her: And there's an obvious solution to that too, so why don't you? I don't understand. You have the rights to my body and I'd be happier too.

: [avram discomfort L]

Avram: It's -- the customs of my people.

: [her_camp cheer R]

Her: Their customs obviously allow people to fuck under some circumstances or you wouldn't be here, Master.

: [avram unreadable L]

Avram: ...It's a subject we could revisit later under different circumstances.

Her: When, Master?

: [avram neutral L]

Avram: When I've become strong enough to defeat you in a duel, easily, ten times out of ten.

Her: Your mysterious people's customs say you have to conquer me fairly to have the right to take me?

: [avram unreadable L]

Avram: Something like that.

---

## 9. The Healer

(Restaged as a three-beat transition — dungeon mishap → walk out → caravan at dusk.)

: [bg_dungeon_mid] [sfx: sfx_sword] [flash white]

A bad floor, deeper than they should have pushed in one day.

A mountain troll's club bashes Avram's sword arm against the wall.

His magic blasts its head clean off, but his wound is not as fast to heal. 

: [bg_forest_road]

His arm throbs as he walks the road.  Neither of them are expert healers and it's the first serious wound either of them have taken.

: [bg_camp_night, tint dusk] By evening they've fallen in with a traveling caravan. Wagons, cookfires,
hired guards. The caravan has a healer. (Dusk tint = late evening, not full night.)

By evening they've found a traveling caravan. Wagons, cookfires, hired guards. A healer.

: [avram neutral L, healer dry-neutral R] The healer, gray-braided, splints Avram's arm. Across the
camp, out of earshot, she tends the fire.

The gray-braided healer splints Avram's arm for a few coins, though for some reason she insists on talking to his slave in private before agreeing to treat him.

Healer: Your slavegirl's not happy, young man.

Avram: What's wrong?

: [healer pointed R]

Healer: She doesn't know where she stands with you, why you treat her the way you do, what's in store for her, what her life's going to be like, and why you won't fuck her.

: [avram unreadable L]

Avram: It isn't about her. There's a reason and it's a good one.

: [healer dry-neutral R]

Healer: Like what?

Avram: Private.

: [healer pointed R]

Healer: Well if you won't tell even her, that sounds to her like you're planning to sell her off, hm? Not settling down for the long run with her?

: [avram sad-distant L]

Avram: ...

: [healer dry-neutral R] The healer ties off the splint.

Healer: Your coin, your slave.

---

## 10. Parity

: (Montage, 4 panels:)
: [cg_back_to_back] Dungeon floor fourteen: fighting back to back, a ring of fallen monsters.
: [cg_market_flinch] Market foreground: the two at a skewer stall, mid-haggle, laughing. Background,
small and uncentered: another master's raised hand, his slave flinching. Neither of them looking at it.
: [cg_night_practice] Her asleep; Avram apart from the fire, small lights above his open palm.
: [cg_stew_ritual] Ladle raised in offer, bowl held out — a wordless ritual by now.

: [status overlay]

> [AVRAM — Wolf School Swordsmanship: Lv 6 → Lv 13 · Air Magic: Lv 3 · Fire Magic: Lv 5 · Light Magic: Lv 4 · Dark Magic: Lv 2]
> [SLAVE #3,907,825 — Wolf School Swordsmanship: Lv 12 → Lv 16]

: [bg_dungeon_mid → bg_dungeon_deep, floor-marker] Floor-markers ticking past: sixteen. Eighteen. Twenty.

---

## 11. The Wound

[bgm: bgm_tension]

: [bg_forest_road → cg_ambush_ring] Six armed figures step out, ahead and behind. No visible
slavetaking equipment.

: [bg_forest_road | avram neutral L, slavetaker easy-menace R]

Bandit: Easy now. Lay down weapons. No need for anyone to die today.

Avram: We've no wealth worth your risk.

Bandit: We'll be the judge of that.

: [her matter-of-fact R]

Her: Master. I don't think you should. They have the air of slavetakers about them.

: [slavetaker easy-menace R] (Nametag switches Bandit → Slavetaker at her identification line.)

Slavetaker: Clever one, isn't she? That's right. Our guild source says you're a prodigy with no backing, boy.

: [her combat-flat R | avram sad-distant L] Her ears flat, no smile — the ambush is the only place
this face exists.

Avram: Then I suppose you will be the first to die by my hand. I hope you end up somewhere else, but not anywhere you'll be important.

: [sfx: sfx_sword] [flash white] [cg_melee_flank] Melee, a fast silent panel: Avram holds one flank,
genuinely good now. (The CG carries the beat; no narration.)

: [cg_melee_press] They fight to take him whole. Flats and hafts, hands grabbing for his sword arm.
A prodigy is worth nothing dead. (Story logic: the slavetakers want him alive — the rod only comes
out after he starts killing them.)

: [sfx: sfx_sword] [flash white] [cg_first_kill] Avram fights to kill.

The first life he has ever taken. He does not pause.

Slavetaker: Code mauve!

: [bg_forest_road] [flash white] Another ambusher's off-hand comes up with a short black rod, leveled
at Avram from the side —

: [sfx: sfx_impact] [cg_lance_hit] Her leaping in front of him; the dark lance through her armor into
her chest; sword mid-clatter. No gore beyond the strike itself.

: [cg_her_fallen] Her crumpled on the road in front of Avram, same scene; punched hole in her
breastplate, realistic blood. (The slavetaker's post-strike lines play over this panel.)

: [slavetaker snarl R]

Slavetaker: Stupid fucking bitch -- you're worth money too, you know! I'm going to make you regret that really fucking badly --

: [cg_scream_cutoff] (Textbox hidden.) Avram on the ground, her blood on him, mouth open; a speech
bubble cropped by the panel edge, contents unreadable. No text; one click to pass.

[bgm: stop cut] · [sfx: sfx_silence-cut] · [flash white]

: [cg_whiteout] Pure white, no linework: Avram's silhouette, arms out, six shapes coming apart at the
edges. Silence from here through the altar.

: [cg_carry_road] Avram running down the road carrying her, glow still guttering off his hands.

: [bg_temple_altar → cg_altar_everything] Coin pouch upended on the altar; then the sword, unbuckled
and laid down.

Avram: Everything. Take everything.

: [cg_vigil] Dim sick-room, night: Avram in the chair by her cot, her bandaged and unconscious in the
bed, the attendant watching from the doorway. (The CG holds through the whole attendant exchange.)

Attendant: Got attached to the slave, huh.

: Avram, not looking up.

Avram: I'd do it even if I wasn't attached. Just that kind of guy.

Attendant: Wow. I heard about guys like you, but never met one in real life before. That poor, poor girl.

: [bg_temple_cot, tint night | avram hollow L, her_temple weak R] She wakes, bandaged.

Her: The slavetakers —

Avram: Gone. Don't move.

Avram: I ordered you not to just fling yourself in front of me any time there's danger.

Her: I didn't want them to take you away from me, Master. It wouldn't have been good for you.

: [avram gentle L]

Avram: That's a little more pride in our relationship than you've shown before.

: [her_temple content-fading R] She settles back, eyes closing.

Her: Pride is one of the customs of my people.

: [avram hollow L]

Avram: ...

---

## 12. Inversion

(From here to the end, Avram uses his LATE sprite set — `avram_late`: better armor, cloak more worn,
face slightly harder.)

[bgm: bgm_dungeon]

: [bg_boss_doors | avram_late neutral L]

Avram: Let me handle this one alone.

: [cg_boss_bench] Her on the steps outside the great doors, chin in hands, small against the
architecture — anxious/on-edge, not smiling.

: [cg_boss_fight] Inside the boss chamber: Avram alone, mid-fight against the floor boss, sword lit
with magic, holding his own — equal-and-rising, not desperate.

: [sfx: sfx_impact] [flash white] [cg_boss_win] The finishing stroke: the boss falling / coming apart,
Avram standing spent but victorious, alone in the chamber.

: [bg_boss_doors | avram_late neutral L, her_camp cheer R] The great doors open. She is on her feet
before he's through.

Her: It went quiet in there. You're getting frightening, Master.

: [avram_late wry L]

Avram: Getting there.

: [bg_guild_hall] [bgm: stop] Guildhall notice board; the gossipers are off-screen voices.

Adventurer 1: They say a Demon Lord is rising, that's what they say.

Adventurer 2: And I heard a Summoned Hero's been seen already. Over on the western continent.

: [avram_late unreadable L] Avram at the counter as the gossip washes over him — in profile,
expression unreadable (carried by the sprite + a silence beat).

Avram: ...

: [status overlay]

> [AVRAM — Wolf School Swordsmanship: Lv 13 → Lv 17 · Air Magic: Lv 6 · Fire Magic: Lv 8 · Light Magic: Lv 7 · Dark Magic: Lv 5]
> [SLAVE #3,907,825 — Wolf School Swordsmanship: Lv 16 → Lv 17]

: [bg_market | avram_late neutral L, her_camp cheer R] New armor, to replace what the deep floors keep
breaking. Fresh supplies. Then back to the dungeon, and down.

New armor, to replace what the deep floors keep breaking. Fresh supplies. Then back to the dungeon, and down.

: [bg_dungeon_mid → bg_dungeon_deep, floor-marker] Floor-markers falling fast: twenty-six. Thirty. Thirty-five.

: [bg_camp_night | avram_late neutral L] She's asleep by the fire. Avram sits awake, looking at her.

---

## 13. The Freeing

[bgm: bgm_wistful]

: [bg_camp_night | avram_late neutral L, her_camp cheer R]

Avram: I think I'm stronger than you, now. Am I wrong?

Her: Definitely, Master. I'm starting to worry that I'm useless to you, in the dungeons, anyway. Does this mean your people's customs finally allow you to take me now?

: [avram_late eyes-narrowed L] Avram snaps into sudden, deadly-serious focus.

Avram: This is a very serious question. If you lie about it, if you're pretending to be weaker than you are, to make me feel better, I could *die.* Am I strong enough to beat you easily in a real fight?

: [her_camp matter-of-fact R]

Her: I don't understand.

Avram: That's fine. Just answer the question with the complete truth.

Her: You seem strong enough to defeat me easily, Master, ten times out of ten. Even taking into account that you'd be using your magic to make up for having less life-or-death combat experience.

: [avram_late sad-distant L]

Avram: Okay. I didn't want to say this - before - it seemed cruel to say it before I was ready to do it - but I always planned, as soon I was strong enough to survive without your protection, to free you.

: (Asset-level rule: she has no sad/worried expression before she is freed; her mask here is played
with matter-of-fact and cheer exactly as specced — the flatness IS the tell.)

Her: Oh... oh.

: [her_camp cheer R]

Her: I'm fine being your slave, Master. You don't have to -

Avram: I really, really have to.

Her: Master, I - like the way things have been with you. You're very mighty and wise, and I'm proud to be your slave. I would rather that things just stay as they are.

: [avram_late gentle L]

Avram: If you still feel that way in a month, I wouldn't object to trying out putting a collar back on you.

Avram: Not this collar, not a magical slave collar.

Avram: It's - something of a sacred rite among my own people, when somebody steps forward to receive a collar from the one they love, that they name their master of their own will.

Her: So just leave the collar on me, then?

: [avram_late neutral L]

Avram: Yeah, see, the part where they step forward of their own will is important. This collar is *not* that. From my perspective it's a horrific blasphemy.

Her: Take the collar off, then put it back on me again right away?

Avram: I'm not sure how a magical loyalty collar works, exactly. I worry it might be influencing your thinking patterns, not just preventing overt disobedience.

Avram: Even if you say it's not doing that, you might just be saying what the collar programmed you to say, or thinking what you subconsciously believe I wish you'd think.

Avram: Or for all I know, you could be saying these things to me now, because I haven't freed you *yet* and you're scared this is all a trap.

Avram: You need to be free for a month, at least, before I'll trust that you've had time to get used to being free, and that you can make your own decisions in light of that.

Avram: If you still want to be my slave then, or just to kiss me, I wouldn't say no.

: [her_camp matter-of-fact R]

Her: Is this... truly your desire, Master? Truly?

: [avram_late sad-distant L]

Avram: What I want has surprisingly little to do with any of this.

Her: Was I not a good enough slave?

: [avram_late neutral L]

Avram: This isn't about that and I think you have enough common sense to know it.

Avram: Look, I'm sorry, I've tried to avoid giving you explicit orders, but - this isn't optional.

Avram: Come here and stand still while I remove your collar.

: [cg_collar_removal] His hands at her collar, the moment of removal. Her face NOT visible — turned
away or out of frame.

: [bg_camp_night | her_free still R] Freed from here on: no collar, bare throat clearly visible — the
key visual of the ending; the sprite sits unobstructed. She stands still and doesn't say anything.

: [avram_late hollow L] Avram looks at her.

Avram: You can take some time to think, if you need to. I'll be around if you want to talk to me. If you need to - say anything to me.

: She still doesn't say anything, just standing still, as Avram walks away.

[bgm: stop]

---

## 14. The Cliff

[bgm: bgm_lament]

: [bg_cliff_wide | her_free still R] Wide cliff-edge staging, held through the whole conversation; she
is in her nice town clothes, bare throat, at the edge. Sunset. She's standing on the edge of a cliff,
by the end of the forest, looking out on the mountains of the world.

: [avram_late strained L] Avram is suddenly standing behind her.

Avram: Sorry for - interrupting you - but I felt you climb up here. My magical senses extend a long ways, now.

...

Avram: It's a funny thing, I have all sorts of guesses about what you might say, and they all terrify me, and I need to hear it anyways.

She stands still.

Avram: You can slap me for having the temerity to say this, if you want to. But even so, I'm sorry.

: (Her expression stays "still" — expressionless, absent, NOT visibly sad — for every line on this
cliff until the final-gentle switch marked below.)

Her: You weren't so bad. It's not a lie that you were the best master I've ever had. If it had only been you, I might be able to - live with it.

Her: The collar punished me. Like a centipede crawling in my brain and biting me when I thought anything it didn't like.

Her: Every time I thought how much I hated it.

Her: Every time I thought how much I didn't want to keep living.

Her: Every time I resented being punished.

Her: They left me in a cell to scream for weeks while that part worked itself out. Some people in the cells just died that way.

Her: I managed to stop thinking the bad thoughts, and then things were better.

Her: I just kept going and never had to think at all about how much I hated it.

Avram: I was - afraid - it was, it was, it was something, like that...

Her: And now you took off the collar and I can't. Can't stop. Can't stop thinking about it.

Avram: Do you - I want to say this, but, I don't know if I have your permission to say it - do you know the reason I did it, or my excuse, for making you fight with me and protect me, instead of freeing you right after I bought you?

Her: If it's what I think it is, I guessed the first week after you bought me. I didn't say it because it seemed like you didn't want me to, and Master's wants are absolute.

Avram: I'm the Summoned Hero.

Her: No, really? You seemed like such an inhabitant of this planet.

Avram: I'm the Hero and after I've defeated the Demon Lord, when I'm strong enough, I'm going to wipe every slave collar and every slave merchant off the face of this world.

Avram: And then, somehow, I don't know how, arrange it so the slave trade doesn't just come back a hundred years later.

Avram: That's going to be the real hard part, even if I can do the rest.

She goes on looking over the edge of the cliff.

Avram: The nobles know, from what I heard.

Avram: They know the Summoned Heroes sometimes don't like what they see when they get here.

Avram: I suspect the nobles of encouraging Heroes to confront Demon Lords too soon, trying behind the scenes for a mutual kill.

Avram: I couldn't trust anyone. Had to grow in secret. Needed protection while I learned to fight.

Avram: I couldn't think of any safer way than a slave with a magical loyalty collar. So I could free all the slaves later.

Avram: I, I figured, that awful slimeball would have bought you, if I didn't, and that made it, not okay, but a net benefit for you -

Avram: and I, I tried to treat you the best I possibly could. But I needed somebody to protect me, until I was strong enough, and I couldn't trust anyone -

Her: Yeah, I get it.

Her: You know, I do wish you'd used my night services.

Her: The collar, the only kind of thinking it allows, I kept worrying that I was doing something wrong. That I wasn't being good enough for you.

Her: If you'd used me and I hadn't needed to worry about that part, it really would have been - as pleasant as it ever gets while you're a slave.

Avram: I'm sorry, but - I don't regret that decision.

Avram: Making love to you and finding out the truth afterwards would have been horrible beyond imagining. It would have scarred me forever.

Avram: Even worse than this is going to, I mean.

Avram: I - I know I have some trouble with self-forgiveness, but - even I don't think I deserved that.

Avram: If I had to do it all over again, I still wouldn't have sex with you.

Her: I see. I forgive you, then.

...

Avram: What's your real name? Not the nickname I gave you or that slave ID code, your name from -

: (Still "still" — the outburst plays against the absent face; her sprite does not switch here.)

Her: *Stop!* Stop. Don't remind me of that. It's - that was one of the worst parts of the nightmare at the beginning, being punished, never to think of my old name -

: [avram_late alarm L]

Avram: Never mind. I'm sorry.

: [avram_late strained L]

Her: I should - I should go very soon. This is getting harder and harder.

Avram: I don't suppose you'd want to stay, not to defeat the Demon Lord, but to wipe out the entire slave trade afterwards?

Her: No. I can't handle it. Can't put the collar back on, even if that made me able to handle it. Not even to free all the other slaves. I'm sorry.

Avram: It's not your fault. I'll free them for you. Is there - is, is there, anything else you want to say to me, or ask of me?

...

Her: I don't understand you, Summoned Hero. I never did.

Her: You seemed so sad and guilty and I never understood why.

Her: You bought me away from a bidder who would have been much worse. You gave me the kindest treatment you could. You let me go, when you were finished.

Her: Most people in this world are not that nice. I'm not sure what being nicer could look like.

Avram: The way my people see it, you would have the right to demand that I did more. Did better.

: [her_free final-gentle R] The only sprite switch on the cliff: a small, real, tired smile, from here
through "Goodbye, Master."

Her: You keep saying that the standards of behavior are different where you came from.

Her: I don't know what the laws of your world were like. I imagine they must have been very harsh, in some ways, even if they were kindly in others.

Her: But *I* believe that you - what you did, what you're going to do - stop thinking that you're a horrible person, okay, Avram? Because you're not.

Her: That's my wish to you. Grant it.

Avram: Okay.

Her: Goodbye, Master.

: (Aftermath — CGs with narration only, slow fades, no music.)

[bgm: stop]

: [cg_cliff_two] Wide shot: Avram and her on the cliff, sunset.

: [cg_cliff_alone] Same framing, Avram alone.

: [cg_cliff_step] Avram approaches the edge of the cliff, about to walk off it.

: [cg_float_down] Avram floats down next to the rocky face of the cliff, arms extended and fists glowing in the air.

: [cg_cliff_base_aftermath] The pool of blood at the bottom extends out from an outstretched furry-clawed hand. (Restraint is the direction; nothing else shown.)

: [cg_digging] Avram starts digging in the ground, with his bare hands.

: [cg_sick] Kneeling to one side, turned away.

: [cg_digging] Avram digs deeper with his hands.

: [cg_grave_open] The finished open dirt grave, from over his shoulder.

: [cg_grave_filled] The filled grave.

: [cg_gravestone_conjure] A stone rising under his glowing hands.

---

## 15. Close

[bgm: bgm_void]

ON BLACK — Skagganauk font:

\- At the poles of the world, there are two dungeon entrances that never fade, no matter how much time passes without challengers.

\- Down and down go the stairs beyond, through level after level of dungeon, unto the very center of the World.

\- There upon a mountain of treasure inconceivable, lies the last boss of the last dungeon, myself, the Void Dragon, Skagganauk, who waits and watches and guards the last key.

\- Many things do I know, and one of them is this:

: [cg_dragon_hoard] The utterly black silhouette of a dragon, coiled on a mountain of treasure.

\- Always two they are, when they come to this place from elsewhere; when the world has stayed in its course too long, when the boundaries of countries have stayed set and there are no more great discoveries in the academies of magic.

\- When the dance of Summoned Hero and Demon Lord begins.

: [cg_forest_walk] Avram's back, walking a green forest path — the same forest as the arrival; the
calm "before" companion to cg_burning_walk.

\- By whatever machinery brings the two here, it is somehow assured:

\- Of the two outsiders, there is one who chooses to protect the things that are, and one who desires to change them.

: [cg_tombstone] The epitaph is carved into the tombstone art itself:

> Slave #3,907,825
> "Haurvatat"
> Born 7005, died 7023
> I will unmake everything that hurt you, and maybe then I'll feel better

: [cg_burning_walk] Avram walking through the scathed and burning forest, back to viewer. The final
line renders in the Skagganauk font OVER this CG (letterboxed), not on black.

OVER cg_burning_walk:

\- I wish you the best of luck, Demon Lord. May the change you bring, be at last the truth that this world is forever seeking.

---

*END — end card, back to title.*
