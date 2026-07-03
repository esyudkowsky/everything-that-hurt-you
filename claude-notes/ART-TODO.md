# ART-TODO.md — artwork revisions and new-feature art requested by the user

Distinct from `claude-notes/ART-REQUESTS.md` (which tracks art the *script* needs
but the spec catalog never listed). This file tracks fixes to existing art and new
art-driven features the user has asked for but that have **not been implemented yet**.
Per the user's instruction (2026-07-02): do not implement any item here until asked —
this is a todo list only.

---

## ✅ RESOLUTION LOG — 2026-07-03 author pass (items checked off, NOT deleted)

Implemented in the master-pipeline rerun (new Pro-generated leads: Avram = dense dark
Ashkenazi ringlet curls, worn boots; Haurvatat = brown-and-white two-tone wolf coat,
solid seamless dark-iron slave collar with NON-glowing runes) + upgraded aesthetic.
Art fixes were **folded into the generation job prompts** so the regen emits corrected art.

- **1 stairs-to-nowhere** — ✅ DONE (`cg_tea_flash` prompt: "NO stairs, no staircase")
- **2 portrait faceplates** — ⏸ DEFERRED (author: skip for now)
- **3 guild clerk seated** — ✅ DONE (`bg_guild_hall` regenerated with a prominent clerk's desk in foreground; clerk sprite reads as seated behind it)
- **4 bedroll cutaway broken** — ✅ DONE (`cg_bedroll_transparent`: full body/anatomy enforced + clearer cutaway)
- **5 Avram slave-market actions** — ✅ DONE (auction narration rewritten show-not-tell, script side; see SCRIPT #2)
- **6 melee swords** — ✅ DONE (`cg_melee_flank`: EXACTLY ONE sword, no duplication)
- **7 whiteout silhouette** — ✅ DONE (`cg_whiteout`: outline reads as armored/cloaked, not Earth clothes)
- **8 one-hand-block CG** — ✅ DONE (author chose CUT; removed from script)
- **9 carry-road damage** — ✅ DONE (`cg_carry_road`: cracked chest armor + restrained blood)
- **10 altar payment figure** — ✅ DONE (`cg_altar_everything`: robed priestess behind the altar)
- **11 temple-cot empty bed** — ✅ DONE (restaged to hold `cg_vigil` through the attendant exchange; no empty-bed bg)
- **12 boss-bench expression** — ✅ DONE (`cg_boss_bench`: anxious/on-edge, not smiling)
- **13 avram hollow too harsh** — ✅ DONE (hollow expression softened: numb/tender, no eyebags)
- **14 cliff strained too teary** — ✅ DONE (strained expression: dry, controlled eyes)
- **15 cliff staging / her outfit** — ✅ DONE (new `bg_cliff_wide`; her in nice town clothes per author, NOT armor; bare throat)
- **16 digging sneakers** — ✅ DONE (author: remove EVERYWHERE — sneaker motif dropped from all prompts + script notes; worn boots)
- **17 dragon/hoard scale** — ✅ DONE (`cg_dragon_hoard`: cosmic ~30-story scale, hall dwarfed)
- **18 "when the dance begins" walk** — ✅ DONE (new `cg_forest_walk`; script beat restaged to use it, matched to `cg_burning_walk`)
- **19 gravestone lettering** — ✅ DONE tier-1 attempt (English epitaph carved into `cg_tombstone`, name "Haurvatat"); `@overlay inscription` kept as fallback pending QA of the carved text

---

## 1. Remove "stairs to nowhere" from the Avram/teadrinker scene

**Asset:** `assets/cg/cg_tea_flash.png` — confirmed by viewing the rendered
scene in-browser (headless click-through) and matching it against the file: a
free-floating stone staircase sits at the bottom-left of the image, leading up
to nothing, disconnected from the tea table and clouds. This is the CG shown
in `script.txt`'s opening flash panel (`@cg cg_tea_flash cut`, line ~45) —
Avram in Earth clothes at a tea table with the old white-bearded man (the God
who sent him to Elhom IV; see `claude-inputs/informal-spec.md` §Backgrounds
and `claude-inputs/fable-conversation.md` line 33/47). This CG is reused
throughout the opening narration under `@voiceover over` (superimposed text),
so the stairs are on screen for several beats, not just one flash.

**Not this file:** `assets/bg/bg_void_tea.png` is a *different*, similar-looking
but unused asset (confirmed via `node claude-notes/tools/validate_script.js`
"unused in library" list, alongside `god.serene`) — it has no stairs and is not
referenced anywhere in `script.txt`. Don't edit it; it's dead weight, not the bug.

**Requested fix:** remove the stairs-to-nowhere element from `cg_tea_flash.png`.
Check `claude-notes/ART-PIPELINE.md` for the generation/editing method (prompt
+ reference-image editing via `google/gemini-3.1-flash-image`) if regenerating
rather than hand-editing.

---

## 2. Character head/expression portraits alongside dialogue text

**Requested by the user 2026-07-02, flagged "outside your own scope"** — i.e. bigger
than a quick edit; treat as a real project, not a todo one session knocks out.

**Ask:** slice off character heads (bust/portrait crops) per expression, and show
the speaking character's portrait next to the textbox when they talk — the classic
VN "face plate" pattern. This is different from the current engine, which shows only
full-body standing sprites on the stage (see `engine.js`: `her.*`, `avram*.*`,
`bartender.*`, etc., positioned as full sprites, dimmed to `brightness(0.6)` when
not speaking).

**Scope notes for whoever picks this up:**
- **Art side:** every existing full-body sprite expression (42 currently used, see
  validate_script.js output) would need a corresponding head crop, OR a new
  generation pass specifically for close-up portraits (the latter likely looks
  better — a naive crop of a full-body sprite's head will be low-resolution and may
  not match typical VN portrait framing/angle). Decide which before starting; a
  crop-based approach is much cheaper (no new generation) but should be visually
  proofed against a few sample lines before committing to all 42.
- **Engine side:** needs a new DOM layer (portrait slot near/in the textbox),
  wiring to whichever sprite/expression id is currently speaking (the parser
  already tracks per-line speaker + expression for nametag purposes), and a
  decision on portrait position (textbox corner vs. beside it) and how it
  interacts with the existing full-body sprite layer (both visible at once?
  portrait replaces the body shot when close-in?).
- **Her's untagged lines** are a special case already in the engine (no nametag
  plate shown, deliberate/spec'd) — decide whether her portrait should also be
  suppressed or whether that rule is nametag-specific.

Not started. No assets, no engine changes yet.

---

## 3. Guild clerk should be seated behind a desk

**Asset:** `assets/bg/bg_guild_hall.png` (Adventurer's Guild interior — see
`claude-notes/ART-REQUESTS.md` item 1, already generated/fulfilled). Requested
2026-07-02: the clerk should be shown seated behind a desk, as official guild
personnel, not however they're currently posed. Not yet inspected/confirmed
against the live file — check the current render before editing.

---

## 4. Cutaway-bedroll CG is broken — her lower body is missing

**Asset:** `assets/cg/cg_bedroll_transparent.png` (the "transparency/cutaway
view into the bedroll" CG, `script.txt` ~line 375, chapter 6 Bedroll).
**Confirmed broken** by viewing the file directly (2026-07-02): her body simply
ends at roughly the waist — no legs, no hips — her tail curls into the empty
space where they should be, and a single boot floats disconconnected near
Avram's feet with nothing visibly attached to it. Separately, the "cutaway"
concept itself doesn't read: the image doesn't clearly communicate a transparent
tent/cross-section view (it just looks like an ordinary night bedroll scene with
a translucent-ish border) — this may need a different compositing approach, not
just fixing the anatomy. User's note: "this may take some tweaking to fix,"
i.e. don't expect a one-shot regeneration to nail it. Priority: high — this is
a genuinely broken render currently live in the build (chapter 6), not a
polish item.

---

## 5. Avram's slave-market actions: show-not-tell rewrite OR new CG art

Cross-referenced with `claude-notes/SCRIPT-TODO.md` item 2 — the user flagged
that what Avram does during the slave-market/auction sequence is currently
under-described (narration tells rather than shows) and doesn't match the
immersive weight the auction scene needs. Two possible fixes, either art or
script; see SCRIPT-TODO.md for the full framing. Not started.

---

## 6. Melee CG has inconsistent swords — AI art artifact

**Asset:** `assets/cg/cg_melee_flank.png` (chapter 11 The Wound, the fast
combat panel — "Avram holding one flank against slavetakers," see
`claude-notes/ART-REQUESTS.md` item 5, already generated/fulfilled). Requested
2026-07-02: "melee scene has inconsistent swords, bad AI art." Confirmed by
viewing the file directly: Avram appears to be wielding **three blades at
once** — two crossing in an X near the top of frame blocking the left
attacker's sword, plus a third blade held vertically lower down that doesn't
connect logically to either hand — a classic AI-art weapon-duplication
artifact, not a real two-sword or sword-and-parry stance. Needs regeneration
or manual cleanup; check `claude-notes/ART-PIPELINE.md` for the generation
method.

---

## 7. Whiteout CG: Avram's silhouette is in Earth clothes, should be armored

**Asset:** `assets/cg/cg_whiteout.png` (chapter 11 The Wound, `script.txt`
~line 655 — "pure white, no linework: Avram's silhouette, arms out, six shapes
coming apart at the edges" — this is the big power-unleashing beat where he
takes out all six ambushers/slavetakers at once; the "shapes coming apart at
the edges" ARE the dissolving/evaporating bandits). Requested 2026-07-02: "the
scene of him in the center evaporating the bandits was good, but needs him to
be in his armor rather than in his Earth clothing." Confirmed by viewing the
file: his silhouette reads as a fitted short-sleeve shirt/casual outline, not
his cloak-and-armor isekai silhouette — no cape, no shoulder armor bulk, no
belt/pouches. Since it's a pure black silhouette (no linework by design), the
fix is specifically about the **outline shape** reading as armored rather than
about surface detail — needs the silhouette redrawn/regenerated with his cloak
and armor's actual profile (broader shoulders, cape flare, etc.), not just a
texture pass.

## 8. One-hand-block CG doesn't fit its context — consider cutting it

**Asset:** `assets/cg/cg_one_hand_block.png` (chapter 12 Inversion opening,
`script.txt` ~line 725 — "dungeon corridor: Avram stepping in front of her,
stopping one-handed a blow that would have taken them both," a `@hold` panel,
no dialogue). Requested 2026-07-02: "the art for Avram wielding more power
than usual didn't make sense. He was apparently in the middle of a different
scene with different lighting, saying nothing." Confirmed by rereading the
script: the scene immediately before this CG is the quiet temple sickroom
vigil (dim, intimate, tint off — Avram looking at his own hands after Her's
recovery) — then chapter 12 opens cold on this CG: a torch-lit dungeon
corridor, him blocking a giant stone fist one-handed, no transition or
narration bridging the two. The lighting, location, and tone all jump without
warning, and there's no text on screen to anchor what's happening (per spec
`@hold` panels are silent by design, which compounds the disorientation here
specifically). **User's suggestion: if this can't be fully redone to fit
consistently with the scene before it, just skip/cut the CG** rather than
force a fix — i.e. this doesn't have to become a new-art request, dropping the
panel and going straight to `@bg bg_boss_doors fade` / Avram's line is an
acceptable resolution if a proper fix isn't worth the effort. Needs an
authorial call on which way to go (bridge the transition vs. cut it).

## 9. Carry-the-road CG: her armor/body should show damage from the lance hit

**Asset:** `assets/cg/cg_carry_road.png` (chapter 11, `script.txt` ~line 660 —
"Avram running down the road carrying her, glow still guttering off his
hands," right after `cg_lance_hit`'s "the dark lance through her armor into
her chest"). Requested 2026-07-02: "the scene of him carrying her needs her to
have correspondingly damaged armor and blood on her." Confirmed by viewing the
file: her armor reads as pristine/undamaged and there's no visible blood or
wound marking, despite this being moments after she took a lance through her
armor and chest protecting him. Needs a damage pass on her armor (the chest
piece specifically, matching where `cg_lance_hit` places the wound) plus
visible blood — consistent with `cg_lance_hit`'s own note ("no gore beyond the
strike itself," so keep it restrained/PG rather than graphic, but currently
there's *none* at all here, which reads as a continuity gap).

---

## 10. Altar-payment CG needs someone there to receive it

**Asset:** `assets/cg/cg_altar_everything.png` (chapter 11 The Wound,
`script.txt` ~line 664-668 — right after the whiteout/carry sequence, Avram
reaches the temple and says "Everything. Take everything," upending his coin
purse and laying down his sword). Requested 2026-07-02. Confirmed by viewing
the file: it's just Avram alone at an empty altar (with a carved relief of a
goddess on the wall behind, no living figure) — no one is shown receiving the
payment, which reads oddly given the line "Take everything" is addressed to
someone. **User's suggested fixes, either acceptable:**
- Add a priestess/healer/temple-secretary figure standing behind the altar,
  accepting the payment (keeps the current altar staging).
- OR restage as a counter at the front of the temple instead of an altar (more
  transactional/mundane framing), with or without an attendant figure.
- User's own preference if forced to pick: **the altar staging works fine as
  long as a priestess-secretary figure is added behind it** — restaging to a
  counter is the fallback, not the first choice.
Needs a new/revised CG either way — not a quick fix, this is a compositional
change (new figure or new staging), not a touch-up.

---

## 11. Temple-cot background shows an empty bed during "Got attached to the slave, huh"

**Asset:** `assets/bg/bg_temple_cot.png` (chapter 11, `script.txt` ~line 675-688
— the Attendant/Avram exchange right after `cg_vigil`, while she's still
unconscious/recovering; she doesn't wake until line 691). Requested 2026-07-02.
Confirmed by viewing both files: `cg_vigil.png` (shown just before, line 670)
correctly shows her bandaged and unconscious in the bed — but `bg_temple_cot.png`
(the background used for the dialogue scene right after) shows a completely
empty, neatly made bed with no one in it. Since the script has no `her`/
`her_temple` sprite active during this exchange (she's meant to be part of the
background art lying in the cot, not a separate sprite layer), the background
itself needs to show her there. Continuity break: reads as if she's vanished
from the room mid-scene. Fix needs either a version of `bg_temple_cot` with her
sleeping/bandaged in the bed baked in, or (cleaner, more flexible) a matching
sprite/overlay of her sleeping-in-bed that can be layered onto the existing
background — check which approach fits the engine's layer system better before
generating new art.

---

## 12. Boss-bench CG: her smile reads wrong for the moment

**Asset:** `assets/cg/cg_boss_bench.png` (chapter 12, `script.txt` ~line 736
— her waiting alone on the steps outside the boss door while Avram fights
inside). Requested 2026-07-02, part of the same note as `SCRIPT-TODO.md` item
19: "having her smiling in front of the dungeon door is weird." Confirmed by
viewing the file: she has a small closed-mouth smile while sitting alone
outside a large, ominous locked door, chained hands in her lap. Given the
stakes (Avram alone fighting a boss inside), a smile reads tonally off —
something more anxious/tense/waiting-on-edge would fit better. Needs an
expression swap, not a full regeneration — check if the same pose can be
reused with a different face.

---

## 13. "Avram looks at her" sprite (avram_late.hollow) is too harsh for the moment

**Asset:** `assets/sprites/avram_late.hollow.png`, used at `script.txt` line
840-841 (`@sprite avram_late hollow left` / "Avram looks at her.") — the beat
right after he removes her collar (`cg_collar_removal`), a tender/uncertain
moment, not a harsh one. Requested 2026-07-02: "much more awful-looking an
expression than it should be." Confirmed by viewing the file: haggard, sunken
dark circles under both eyes, dead/exhausted stare, slack half-open mouth,
visibly dirt-stained clothing — reads as physically wrecked/numb-with-
exhaustion rather than the gentler "searching her face, uncertain, tender"
beat the scene calls for. The expression name "hollow" may have been intended
for a numb/empty emotional read, but the execution leans much harder into
haggard exhaustion than that. Needs either a re-generation of this specific
expression with softer/gentler direction, or check whether a different
existing `avram_late.*` expression (see the unused-sprite list from
`validate_script.js` for candidates) already fits this beat better than
`hollow` does — might not need new art at all, just a different sprite pick.

---

## 14. Cliff-scene "strained" expression reads as almost-crying, used for nearly the whole scene

**Asset:** `assets/sprites/avram_late.strained.png` — per `script.txt` line 860
and the `@note` at line 873-874, this expression is used "for every line on
this cliff until the final-gentle switch" (i.e. nearly the entire climactic
cliff conversation, chapter 14). Requested 2026-07-02: "when avram appears to
look at her on the mountain, he should not be almost-crying." Confirmed by
viewing the file: visibly glistening/welling eyes and a tense grimace — reads
as on the verge of tears. Since this one expression covers almost the entire
scene (per the script's own note reserving `strained` for exactly this
stretch, see also `HANDOFF.md`'s staging conventions: "Avram strained reserved
for the cliff"), having him visibly near-crying for the whole conversation
undercuts the arc — "strained" should probably read as tense/restrained/
holding it together rather than already tearing up, saving visible emotion for
wherever the script actually wants it to break. Needs either a re-generation
with drier eyes (keep the tension in the brow/jaw, drop the glisten), or
splitting this into two expressions (restrained vs. actually crying) if the
scene has a beat that warrants the latter — check the dialogue for where (if
anywhere) tears would actually be earned before deciding.

---

## 15. Cliff scene needs consistent "both of them at the cliff edge" staging, her in armor

Requested 2026-07-02, spans art + staging — see `SCRIPT-TODO.md` item 22 for
the staging half. `script.txt` chapter 14 (The Cliff): the entire climactic
conversation (lines 855-930+) currently runs on `@bg bg_cliff_sunset` with
plain standing sprites (`her_free.still`, `avram_late.strained`) — generic
sprite-on-background staging. `cg_cliff_two` (line 942 — "wide shot: Avram and
her on the cliff, sunset") exists and looks good (confirmed by viewing it: a
proper two-shot of both of them standing near the cliff edge, dramatic sunset,
real sense of the precipice) but currently only appears **after** the
conversation ends, as a transition into the jump/aftermath sequence.

**User's request:** the whole conversation should visually read as the two of
them standing at the cliff edge together (like `cg_cliff_two` conveys), not
generic background+sprites for the dialogue and then a nicer wide shot tacked
on at the end. **Also: she should be in armor for this scene**, not the
casual dress `her_free.still` currently wears (confirmed: it's a plain
olive/gray dress, not adventuring gear) — this is presumably tied to the
"H-free" sprite set's wardrobe choice (casual clothes symbolizing her freedom)
but the user wants armor specifically here. **Sequencing must be preserved:**
she's alone at the cliff edge first, Avram appears after — this already
matches the current script order (line 857-858 her alone, 860-861 "Avram is
suddenly standing behind her") and should carry over into whatever new staging
replaces this.

**Scope note:** this likely means either (a) a new background specifically
framed as a wide cliff-edge shot (so standing sprites read as "at the edge"
convincingly, closer to `cg_cliff_two`'s framing, rather than the current more
generic `bg_cliff_sunset`), (b) a new armored `her` sprite variant for this
scene, or (c) restaging large parts of the scene around `cg_cliff_two`-style
CGs instead of sprites entirely. This is a real scope decision, not a quick
fix — read `SCRIPT-TODO.md` item 22 alongside this before starting.

---

## 16. Digging CG: Avram shouldn't be wearing sneakers

**Asset:** `assets/cg/cg_digging.png` (chapter 14 aftermath — Avram digging a
grave with his bare hands, coastal cliffside). Requested 2026-07-02: "should
not have sneakers." Confirmed by viewing the file: he's kneeling, digging
bare-handed, wearing modern Earth sneakers. **Flag before touching this:**
his Earth sneakers are an established *deliberate* continuity motif elsewhere
in the script — `script.txt` line 66, `@note isekai cloak now, but his old
Earth sneakers — keep in any full render` (set at the very first full-body
reveal in the opening narration, chapter 1). So this request likely means the
user wants a **specific exception for this scene** (grave-digging, a somber
different-register moment) rather than a reversal of the general rule — don't
read this as "remove the sneakers everywhere," just from this one CG, unless
the user says otherwise when this is picked up. Worth confirming with the user
before generating art, given it contradicts a standing "keep in any full
render" note.

---

## 17. Skagganauk and the treasure hoard need to be MUCH larger — cosmic scale

**Asset:** `assets/cg/cg_dragon_hoard.png` (chapter 15 Close, `script.txt`
~line 997 — "utterly black dragon silhouette coiled on a mountain of
treasure," accompanying the voiceover line naming the Void Dragon Skagganauk,
"last boss of the last dungeon"). Requested 2026-07-02: "the mountain of
treasure is MUCH larger. Skagganauk is MUCH MUCH larger. 30-story-office-
building large." Confirmed by viewing the file: the dragon and treasure pile
currently read as modest, room-scale relative to the visible dungeon
architecture (columns, stairs, doorways) — maybe 15-20ft dragon, 20-30ft
treasure pile. Given the voiceover frames Skagganauk in cosmic/mythic terms
(bookending the whole story alongside the `bg_void_tea`/prologue material,
per `bgm_void`'s own description as "an ancient world-ending being"), the
scale needs to be dramatically larger — user's explicit benchmark: **~30
stories tall**. Needs a full regeneration with scale as the primary prompt
direction (small human-scale reference objects, if any survive as visual
anchors, should read as tiny by comparison) rather than a touch-up of the
current composition.

---

## 18. "When the dance begins" beat needs a CG of Avram's back on the forest path, not a standing sprite

**Location:** `script.txt` lines 1006-1010 (chapter 15 Close, right after the
voiceover line "When the dance of Summoned Hero and Demon Lord begins."):
```
@voiceover off
@bg bg_forest_day fade
@sprite avram_late neutral left
@note Avram walking through the forest — the same forest as the arrival
@hold
```
Requested 2026-07-02. Currently staged as a plain standing sprite
(`avram_late neutral`) over `bg_forest_day`, with a `@note` (not shown to the
reader) describing him "walking through the forest" — same underlying failure
mode as `SCRIPT-TODO.md` item 12 (action description that leaked into a note
instead of becoming actual visual staging; a standing sprite can't convey
"walking"). **User's fix: replace with a CG of just his back, walking along a
forest path** — no dialogue, no sprite. Convenient precedent already exists a
few beats later in this same sequence: `cg_burning_walk` (line 1029-1030,
"Avram walking through the scathed and burning forest, back to viewer") is
already exactly this kind of shot, just in the burning/later version of the
forest. This new CG would essentially be the "before" companion to that
"after" — same pose/framing convention (back to viewer, walking a forest
path), ordinary daytime forest instead of scathed/burning. Worth generating
both from a shared reference for visual consistency between the two.

---

## 19. Gravestone needs carved lettering (or runes) — currently completely blank stone

**Asset:** `assets/cg/cg_tombstone.png` (chapter 15 Close, `script.txt`
~line 1019). Requested 2026-07-02: "the art of the gravestone in the final
chapter does not have the lettering on the gravestone. It should be part of
the art itself, carved on the gravestone. If the art AI can't do that, have it
show runes on the gravestone and we can show the translation as dialogue."
Confirmed by viewing the file: the stone is completely blank, no carving of
any kind. Currently the epitaph text ("Slave #3,907,825 / 'Haurvatat' / Born
7005, died 7023 / I will unmake everything that hurt you, and maybe then I'll
feel better") is shown entirely via the engine's `@overlay inscription`
mechanism — literal text rendered by the browser floating over the blank
stone, not carved into the art at all, which is why it currently reads as
disconnected from the object.

**Note on the existing convention:** `script.txt`'s header documents `@overlay
inscription` as used "because spec prefers engine text over baked text" for
this exact asset (and the pamphlet). This request is a **deliberate exception
to that general preference for this specific gravestone** — not a reversal of
the rule elsewhere (the pamphlet CGs etc. should keep using engine text unless
told otherwise).

**Two-tier fix requested, in priority order:**
1. First choice: regenerate with the actual epitaph lettering carved directly
   into the stone (real legible English text baked into the art). Flag: image
   models are frequently bad at rendering coherent legible text — this may
   fail repeatedly.
2. Fallback if (1) doesn't work: carved **runes** (illegible fantasy script,
   which art models render far more reliably since nothing needs to spell
   real words) baked into the stone, with the actual English translation
   still shown via dialogue/narration text (not necessarily the current
   `@overlay inscription` mechanism — could be a straightforward `Avram:` or
   narration line "translating" what's carved).
Either way this needs `script.txt` changes too (the `@overlay inscription`
block would likely be replaced or reworked depending on which tier lands) —
coordinate the art and script sides together rather than regenerating the CG
in isolation.

---

(Append further art todo/revision items below as they're requested.)
