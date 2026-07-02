# SCRIPT-TODO.md — narrative, pacing, and content revisions requested by the user

Not yet implemented. Per the user's established pattern this session (items prefixed
"todo:" in conversation), these are recorded for a future session to pick up with
authorial judgment — do not mechanically apply without rereading the surrounding scene
in `claude-inputs/script.md` (see `SCRIPT-CHANGES.md` for the current rev) and
`/script.txt` first. Distinct from `ART-TODO.md` (art-specific) and
`HANDOFF.md`/`HANDOFF-AUDIO.md` (engine/audio-specific), though several items below
cross-reference those files where a fix could go either way.

---

## 1. Auction scene: no narration for what's happening, and no music

Requested 2026-07-02. The slave-auction sequence (chapter 3, `script.txt` around
`@bg bg_auction_plaza`) needs narration text describing what's actually going on
around Avram — currently under-narrated — and currently has **no BGM cue at all**
during the auction itself (check `script.txt` for `@bgm` directives in that range;
the tavern/wistful cues bookend it but the auction plaza itself may be silent).
Needs both a script pass (narration) and either an existing BGM slot reassigned or
a new one — cross-check against the six existing BGM slots in
`claude-notes/MUSIC-PIPELINE.md` before generating anything new (the tension/dungeon
tracks might already fit, or might not — use judgment/audition).

## 2. Avram's slave-market actions don't read as immersive / don't match the scene

Requested 2026-07-02. "The present mere description of what Avram does isn't
immersive text and doesn't quite match the slave auction scene and depiction."
Flagged by the user as "outside your own scope" — treat as a real authorial pass,
not a quick edit. Two possible directions, either is acceptable per the user:
(a) rewrite the relevant narration as show-not-tell, more grounded sensory detail
of Avram's actions during the auction; (b) commission CG art for what he's doing,
if a scene beat deserves a full panel instead of prose. See `ART-TODO.md` item 5
for the art-side cross-reference. Whoever picks this up should reread the current
auction chapter in full before deciding which way to go — this needs to match
tone with the rest of the auction sequence, not be bolted on.

## 3. "Ownership transfer" scene needs more narration/detail — too jump-cutty

Requested 2026-07-02. The lead-up to the ownership-transfer beat (chapter 3,
`script.txt` around `@cg cg_ownership_transfer`) currently reads as jarring —
"too many jump cuts, not enough detail" about what's actually happening. Needs a
narration pass to smooth the transition and make the sequence of events legible,
not just a series of CG cuts with minimal connective text.

## 4. Long dialogue paragraphs need breaking into shorter sentences (pacing + textbox fit)

Requested 2026-07-02, example given: the paragraph starting "So. Um. I bought you
to help me clear dungeons" needs to be broken up into shorter sentences as Avram
speaks it — both a pacing/timing issue (a wall of text reads worse than the same
content delivered as several beats) and a textbox-space issue (per
`claude-notes/HANDOFF.md`'s engine notes, very long paragraphs already trigger
`fitDialogFont`'s auto-shrink steps down to 1.95cqh — i.e. this paragraph may
already be hitting the font-shrink floor, which is itself a symptom of the
underlying pacing problem, not just a rendering detail). **User explicitly asked
to check other paragraphs for similar issues** — this should be a full pass over
`script.txt`'s `say`/`narrate` lines, not just the one example, looking for
lines/paragraphs long enough to force aggressive font-shrinking or that read as
a wall of text where the character would naturally pause. Splitting a paragraph
into multiple `say` lines is the standard fix (each becomes its own reader click/
beat) — no engine changes needed, this is a script-only pass.

**Second confirmed instance (2026-07-02):** `script.txt` line 815 (chapter 13
The Freeing): "Avram: I'm not sure how a magical loyalty collar works,
exactly. I worry it might be influencing your thinking patterns, not just
preventing overt disobedience. Even if you say it's not doing that, you might
just be saying what the collar programmed you to say, or thinking what you
subconsciously believe I wish you'd think. Or for all I know, you could be
saying these things to me now, because I haven't freed you *yet* and you're
scared this is all a trap. You need to be free for a month, at least, before
I'll trust that you've had time to get used to being free, and that you can
make your own decisions in light of that. If you still want to be my slave
then, or just to kiss me, I wouldn't say no." — six sentences, one textbox.
Same fix: split into several `Avram:` lines, one beat per sentence or small
group of sentences, so the reader gets natural pauses instead of one long
scrolling wall of reasoning. This paragraph carries a lot of the chapter's
emotional/logical weight (his actual reasoning for delaying/conditioning her
freedom) so the split points matter — read the surrounding scene before
cutting it up, don't just mechanically break every period into its own line.

**Third confirmed instance (2026-07-02):** `script.txt` line 877 (chapter 14
The Cliff): "Her: The collar punished me. Like a centipede crawling in my
brain and biting me when I thought anything it didn't like. Every time I
thought how much I hated it. Every time I thought how much I didn't want to
keep living. Every time I resented being punished. They left me in a cell to
scream for weeks while that part worked itself out. Some people in the cells
just died that way. I managed to stop thinking the bad thoughts, and then
things were better. I just kept going and never had to think at all about how
much I hated it." — one of the heaviest, most important paragraphs in the
whole script, currently a single wall-of-text textbox. This one especially
calls for a beat-by-beat split (the repeated "Every time I..." structure
practically begs for one line each) — arguably more urgent than items 4's
other two instances given how load-bearing this speech is emotionally. Same
caution applies even more strongly here: read the full scene and get the
rhythm right, this is not a mechanical edit.

## 5. Restaurant scene has too many dishes listed

Requested 2026-07-02: "restaurant scene went a bit overboard on number of dishes."
Trim the dish list in the restaurant scene (chapter 4-ish, `@bg bg_restaurant` /
`@cg cg_restaurant_plates`, see `script.txt`) down to something more restrained.

## 6. Jump from town conversation to sword practice is jarring

Requested 2026-07-02. The transition from the town conversation into the sword-
practice/training beat needs connective text — currently jumps without making
clear what's happening or how they got there. Likely the chapter 4→5 boundary
(Naming → the Montage A "She Teaches Him" training sequence, `script.txt` around
`@chapter 5`) — confirm the exact seam before writing the fix, don't assume.

## 7. Pamphlet rule 7 stands out as too long — rebalance rules 5/6/7

Requested 2026-07-02: in the slave-ownership pamphlet (`@overlay inscription`
block, chapter 3, "rules text" per `claude-notes/HANDOFF.md`'s pamphlet-contrast
note), rule 7 is noticeably longer than the others. Fix: combine rules 5 and 6
(feeding and equipping) into a single new rule 6, so the remaining long rule
(renumbered) stands out less by comparison. Find the exact rule text in
`script.txt`'s pamphlet overlay block before editing — renumber carefully, this
is a numbered list and downstream rules shift by one.

## 8. First leveling/status screen: swordsmanship should animate 11→12, not appear static at 12

Requested 2026-07-02. This is an **engine capability gap, not a script-only fix**:
`engine.js`'s `showStatus()` (see `claude-notes/HANDOFF.md` / engine source) just
renders the final stat lines as static text — there's no support for animating a
number counting up from an old value to a new one. To do this properly: the
status overlay would need to know both the "before" and "after" value for the
stat line in question and animate between them (e.g. a short count-up tween) when
the panel appears, rather than the current instant-render of final text. Needs an
engine change (new directive syntax or overlay-line convention to carry both
values) plus updating the specific status block in `script.txt` (first leveling
screen — find via `@overlay status` blocks) to supply both numbers. Not started;
recorded here rather than in HANDOFF.md since it's paired with a specific script
callsite, but touches both.

---

## RESOLVED 2026-07-02: "Her" now shows a nametag throughout — author override

Requested 2026-07-02 ("in her first dialogue line, Harvautat doesn't seem to have
any character name at all... we'd like 'Her' for her character name throughout").
This directly contradicted an explicit, doubly-stated instruction already in the
project — `claude-inputs/informal-spec.md` and `script.txt`'s own Naming chapter
both said the no-nametag rule was "deliberate, do not 'fix' it" — so this session
surfaced the conflict instead of silently applying the change. **The user then
identified themselves as the author and explicitly overrode the earlier decision**,
so it was implemented the same session:

- `engine.js` `showTextbox()`: removed the `speaker !== "Her"` special case that
  hid the nametag plate/label for her lines; every speaker (including Her) is now
  tagged the same way.
- `script.txt`: updated the header nametag-rules note and the Naming-chapter note
  (~line 300) to describe the new behavior instead of the old "do not fix" text.
- `claude-inputs/informal-spec.md` line 168: updated to match (was the original
  source of the "deliberate, do not fix" instruction this session had been
  respecting).

If a future session encounters any other note in the repo still describing Her as
untagged, it's stale — update it to match this entry, don't revert the engine
change based on it.

## 9. Tavern-after-bedroll: "Laughter" should read as the room's, not hers

Requested 2026-07-02. `script.txt` ~line 423-425 (chapter 7 Tavern, right after
the bedroll-conversation adventurers needle Avram):
```
@sprite her_camp cheer right
Laughter. She works through a plate of her favorite food, unbothered.
```
The narration line itself has no speaker tag (it's already plain `narrate`, not
attributed to Her's dialogue tag) — but her sprite (`her_camp cheer`) is set
**before** "Laughter." appears, so she's already on screen and highlighted when
the laugh lands, which reads as if the laughter is coming from/about her
specifically rather than the room in general. User wants: "Laughter" registers
as an unattributed room reaction first, and Harvautat only appears (sprite cut
in) *after* that beat, then shown working through her food unbothered. Likely
fix: split into two beats — a narration-only "Laughter." with no her-sprite yet
(room reacts), then `@sprite her_camp cheer right` + a second line "She works
through a plate of her favorite food, unbothered." Needs an author pass to get
the timing/beat-count right, not a mechanical find-replace.

## 10. "Dead silence at the next table" reads as attributed to her

Requested 2026-07-02, same scene, `script.txt` ~line 433-435:
```
Her: I don't sleep cold. Master shares the bedroll.

Dead silence at the next table.
```
Same underlying issue as item 9: the narration line has no dialogue tag, but it
directly follows Her's line with her sprite still highlighted/undimmed, so the
silence reads as hers rather than the room's reaction to what she said. May need
a beat (sprite dim/neutral cut) between her line and the "Dead silence" narration
to visually hand the moment to the room. Author judgment call on pacing.

## 11. Campfire-shoulder CG cuts away too soon — let dialogue play over it

Requested 2026-07-02: "the dialogue boxes can go with that CG. there's no need
to cut to the [background] CG to show the next lines of dialogue." `script.txt`
~line 482-490 (chapter 8 Campfire):
```
@cg cg_campfire_shoulder fade
@note NEW ART REQUESTED — ... Placeholder until generated; the scene then falls
@note back to the sprites below, which is acceptable staging on its own.
@hold

@bg bg_camp_night cut
@sprite avram wry left
@sprite her_camp content right

Avram: You can go ahead and say what you're thinking. I feel like I can still hear it.
```
The `@bg bg_camp_night cut` immediately after the CG's `@hold` was written as a
fallback for when `cg_campfire_shoulder` didn't exist yet (per the `@note`) —
but the CG has since been generated and fulfilled (`claude-notes/ART-REQUESTS.md`
item 4), so the immediate cut-away is no longer necessary and now just discards
a finished asset a beat after showing it. Fix: let at least the first line or two
of dialogue (Avram's opening line, maybe her reply) play with `cg_campfire_shoulder`
still up, THEN cut to `bg_camp_night` + sprites for the rest of the scene (sprite
expression changes need the plain sprite view eventually — this is a two-shot CG,
it can't show individual expression swaps). Exact cutover point is a pacing call
for whoever picks this up; don't guess, reread the scene.

## 12. Jump cut to the Healer scene is too abrupt — plus a likely systemic issue

Requested 2026-07-02. `script.txt` ~line 528-531 (chapter 9 The Healer, right
after the campfire scene):
```
@bg bg_camp_night fade
@sprite avram neutral left
@sprite healer dry-neutral right
Joint camp with a traveling caravan. A hired healer, gray-braided, splints Avram's arm. Across the camp, out of earshot, she tends the fire.
```
Problem: this reuses `bg_camp_night` — the **same background** as the
just-finished chapter 8 campfire scene — so there's no visual signal that time
has passed, they've joined a caravan, a new NPC (the healer) has arrived, and
Avram was hurt (implying an offscreen dungeon fight). All of that is compressed
into one narration sentence with no CG/background change to carry it, which
reads as an abrupt jump cut. It's less jarring where they're still shown around
the same campfire, but the underlying issue remains: a load-bearing scene
transition is being told in a single prose line instead of shown.

**User's suggested fixes (any or a combination):**
- Fade out of the forest/road before cutting in to the caravan camp (a
  transition beat, not just a hard `fade` background swap).
- An additional CG showing the dungeon fight that hurt Avram's arm (currently
  never shown — only implied after the fact).
- A new CG of the healer mid-treatment, specifically **at late evening/sunset**
  rather than full night — `bg_camp_night` reads as later than intended for
  this beat.

**Broader/systemic concern — read carefully before scoping this as "just one
scene":** the user flagged that lines like "Joint camp with a traveling
caravan" are structurally miscategorized — this kind of sentence is *scene-
setting/stage-direction* (what a CG, background change, or detailed show-don't-
tell narration should convey), not something that should be dumped on the
reader as a literal narration textbox line. **Action item: search the rest of
`script.txt` for other narration lines that read like compressed stage
directions rather than in-scene prose** (dense location/time/logistics info in
a single sentence, especially right after a `@chapter` marker or CG cut) — this
one instance may be a symptom of a wider pattern from how the script was
originally staged, not a one-off.

**User explicitly flagged this might be Fable-level, not Sonnet-level work** —
i.e. properly fixing this (deciding what becomes a new CG request vs. an
expanded show-don't-tell prose rewrite vs. a restaged transition) may need
more creative/authorial judgment than a mechanical editing pass, and should be
routed to Claude Fable rather than handled the same way as the other items in
this file. Don't attempt a quick mechanical fix on this one.

**Second confirmed instance (2026-07-02, same pattern):** `script.txt` line 605,
chapter 11 (The Wound), right after the slavetaker's first line:
```
Slavetaker: Easy now. Lay down weapons. No need for anyone to die today.

Avram, hand on sword.

Avram: We've no wealth worth your risk.
```
"Avram, hand on sword." is sprite/art direction (a tense-posture sprite
expression change) that leaked into displayed narration text instead of being
turned into a sprite directive — as written it reads to the player as literal
narration prose ("Avram puts his hand on his sword"), which is flat/redundant
next to actual prose lines. Per the user this confirms item 12 is systemic, not
a one-off — **treat any future search of the script for this pattern as
covering both**: (a) compressed scene-transition/logistics sentences (the
Healer-scene case above) and (b) terse blocking/gesture directions that read
like stage notes rather than narration (this case). Likely fix for THIS
instance specifically: replace with a `@sprite avram <tense-expression> left`
directive (needs an appropriate expression asset — check the sprite library
for something like "wary"/"guarded"/"ready" for Avram; `avram.strained` exists
in the unused-sprite list per `validate_script.js` and might already fit) rather
than prose. Still Fable-flagged at the general-pattern level; this specific line
may be simple enough for a mechanical pass once the search above is done.

**Third confirmed instance (2026-07-02, same pattern):** `script.txt` line 629,
chapter 11, right after the ambush turns into a fight:
```
@clear all
@sfx sfx_sword
@flash white 120
@cg cg_melee_flank cut
@note NEW ART REQUESTED (optional) — melee, fast panel: Avram holding one
@note flank, genuinely good now. Until generated the placeholder is skipped
@note fast under the flashes and narration carries it.
Melee. Fast. Avram holds one flank — genuinely good now.
```
"Melee. Fast. Avram holds one flank — genuinely good now." is action/pacing
direction (terse fragments meant to convey a quick-cut fight montage under
flash effects) shown as literal reader-facing narration instead of being
carried by the visuals it's describing. Per the `@note` this was written as a
*fallback* for when `cg_melee_flank` didn't exist yet ("until generated the
placeholder is skipped fast... narration carries it") — but the CG has since
been generated and fulfilled (`claude-notes/ART-REQUESTS.md` item 5; also see
`ART-TODO.md` item 6, that same CG currently has a separate art-quality bug,
inconsistent/duplicated swords). Now that real art exists for this beat, the
narration fallback is likely redundant and should probably be cut or drastically
shortened once the CG is fixed — the flash-cut CG can carry "fast, brutal,
he's actually competent now" on its own. **Third data point for the systemic
search in item 12** — this is now three confirmed instances (Healer-scene
transition, "hand on sword," this one) of stage-direction-as-narration; treat
the full-script search as covering all three sub-patterns: compressed scene-
transitions, blocking/gesture directions, and action-fallback narration
originally written for when art was still missing.

## 13. Dungeon floor-number markers don't work for readers

Requested 2026-07-02. The `@overlay floor <n>` markers (`script.txt` lines
583-585: floors 16, 18, 20; lines 758-760: floors 26, 30, 35 — both right after
a `@overlay status` level-up block, between training montages) are meant to
convey descent into a more dangerous dungeon, but per the user: "did not make
any sense... those would have to be accompanied by scenes of lower and more
dangerous dungeons, and if the dungeon floors were looking scarier then the
claims of the dungeon levels being lower would be redundant. In general I think
showing dungeon floors as numbers will be hard for readers to interpret."
This reads as a fundamental critique of the floor-number-marker mechanic itself,
not a tuning tweak — the user is questioning whether bare numeric floor markers
should exist in this form at all, given that either (a) they need matching
visuals to land (in which case the number becomes redundant next to a visibly
scarier scene), or (b) they stay numbers-only and don't communicate anything to
a reader with no reference for what "floor 26" of this setting's dungeons means.
No fix prescribed — needs an authorial decision on whether to cut the floor
markers, replace them with something else (a different escalation signal), or
pair them with new art despite the redundancy concern. Related to item 12's
broader "stage-direction text with nothing to carry it visually" pattern —
possibly worth considering together.

## 14. Slavetaker should be labeled "Bandit" until Harvautat identifies him

Requested 2026-07-02. `script.txt` chapter 11 (The Wound), lines 601-615: the
character currently speaks under the `Slavetaker:` tag from his very first line
—
```
@sprite slavetaker easy-menace right

Slavetaker: Easy now. Lay down weapons. No need for anyone to die today.

...

Slavetaker: We'll be the judge of that.

Her: Master. I don't think you should. They have the air of slavetakers about them.

@sprite slavetaker easy-menace right
Slavetaker: Clever one, isn't she? That's right. Our guild source says you're a prodigy with no backing, boy.
```
— but Her doesn't identify them as slavetakers until the line at ~612. Since
the engine now renders every speaker's nametag (see item "RESOLVED: Her nametag"
above), the reader sees the literal label "Slavetaker" on screen from his very
first line, spoiling Her's identification a few lines later. Fix (mechanical,
not yet applied): rename the speaker tag on the two pre-reveal lines (~603, 609)
from `Slavetaker:` to `Bandit:`, keep `Slavetaker:` from the post-reveal line
(~615) onward. Needs matching engine support: add `"Bandit"` to the `SPEAKERS`
whitelist (`engine.js` top of file) and a `speakerPrefix()` map entry `Bandit:
"slavetaker"` (same sprite art, `slavetaker.*` files — only the displayed
nametag text differs, not the character or the sprite asset). Check whether any
other `@note` or dialogue elsewhere in this scene also uses the "Slavetaker" tag
before the reveal point before editing.

## 15. Small line edit: "even if I wasn't" → "even if I wasn't attached"

Requested 2026-07-02. `script.txt` line 683 (chapter 11, right after
`Attendant: Got attached to the slave, huh.`):
```
@note not looking up
Avram: I'd do it even if I wasn't. Just that kind of guy.
```
Change to "I'd do it even if I wasn't attached. Just that kind of guy." —
small clarity fix, the elided "wasn't" currently trails without its referent
close enough to read cleanly. When applying: this is also the same scene
flagged in `ART-TODO.md` item 11 (temple-cot background missing her in the
bed) — check if a future pass wants to handle both at once, though they're
independent fixes (one text, one art).

## 16. Attendant should address Avram directly instead of walking off to an acolyte

Requested 2026-07-02. `script.txt` lines 685-688, same temple-attendant scene
as items 11/15:
```
@sprite attendant pitying right
The attendant walks off, to another acolyte.

Attendant: Wow. I heard about guys like that, but never met one in real life before. That poor, poor girl.
```
Change: cut "The attendant walks off, to another acolyte." and have her say
the line directly to Avram instead (still on-screen, `attendant pitying`
sprite already active). Requires a matching pronoun change since the line
currently talks *about* him in third person to someone else — **"guys like
that" → "guys like you"** — once she's speaking to his face rather than to a
colleague. Small scope, same scene as items 11 (empty-bed background) and 15
(the "even if I wasn't attached" line edit) — worth handling together if a
future pass touches this scene for any of the three.

## 17. "She wakes, bandaged. Avram in the chair." — text describes a scene the visuals don't show

Requested 2026-07-02, same temple-recovery scene as items 11/15/16.
`script.txt` lines 690-692:
```
@clear right
@sprite her_temple weak right
She wakes, bandaged. Avram in the chair.
```
User's framing: this reads as an **instruction** (director's note describing
what the panel should contain) that got left in as reader-facing **description**
instead of being turned into actual staging — same underlying failure mode as
item 12's pattern (stage direction leaking into shown text), applied here to a
sprite/blocking gap rather than a narration/CG gap. Concretely: only
`her_temple` is placed on the right slot; there is no sprite directive putting
Avram in this shot (whatever was left over from his last `@sprite avram hollow
left` at line 677 is a standing pose, not a seated one — sprites are all
standing full-body art per the engine, so no sprite can actually convey "in the
chair" the way `cg_vigil` did a few beats earlier). The narration asserts
something the engine literally cannot render with the current asset set, so
either the reader gets no visual confirmation of it or (if the stale standing
Avram sprite is still up) a visual that contradicts "in the chair."

**Options for whoever picks this up** (author judgment call, not prescribed):
- Rewrite the line to describe only what's actually shown (drop "in the
  chair," lean on the reader's memory of `cg_vigil`'s seated pose from a few
  beats before).
- Add a proper `@sprite avram <expr> left` for this beat if a standing pose
  reads fine here anyway (he could plausibly have gotten up by the time she
  wakes).
- Or, if this beat is worth it, a small CG of him seated at her bedside as she
  wakes — heavier option, likely overkill for one beat.
Cross-reference `ART-TODO.md` item 11 (this same background, `bg_temple_cot`,
is separately missing her in the bed for the *scene before* this one) — this
whole temple-recovery sequence may be worth a single combined pass rather than
four separate micro-fixes.

## 18. Cut "Avram looks down at his own hands," replace with an "Avram: ..." beat

Requested 2026-07-02. `script.txt` lines 704-715 (same post-injury scene as
items 11/15/16/17, just after it — right before chapter 12 starts):
```
@sprite avram gentle left
Avram: That's a little more pride in our relationship than you've shown before.

@sprite her_temple content-fading right
She settles back, eyes closing.

Her: Pride is one of the customs of my people.

@sprite avram hollow left
Avram looks down at his own hands.

@tint off
```
Requested change: **delete** "Avram looks down at his own hands." (line 713,
narration) entirely; instead have Avram go `Avram: ...` (a legal silence-panel
dialogue line per the script's own convention — see header note "A dialogue
line whose text is exactly '...' is a legal silence panel") **timed to when
her eyes close**, i.e. around/after "She settles back, eyes closing." (line
708). Exact placement needs a judgment call: her "Pride is one of the customs
of my people" line (710) currently comes *after* she closes her eyes and
*before* the hands beat — whoever implements this should decide whether the
new `Avram: ...` beat replaces the hands-line in its current position (after
her line) or moves earlier to land right on "eyes closing" as the user's
phrasing suggests ("as her eyes close on the bed") — reread the scene's
rhythm before picking. Sprite: `avram hollow left` was set for the cut line;
decide whether that expression still fits an `Avram: ...` beat or needs
swapping. **See item 20**: this "looking at his hands" beat is one of two
confirmed instances of a recurring narration tic the user wants eliminated
everywhere — fix the other instance (line 764) in the same pass.

## 19. Boss fight is never shown, and the return-to-dungeon transition is jarring

Requested 2026-07-02. `script.txt` lines 733-762 (chapter 12 Inversion):
```
Avram: Let me handle this one alone.

@clear all
@cg cg_boss_bench fade
@hold
@note her on the steps beside the great doors, chin in hands, small against
@note the architecture

@bg bg_guild_hall fade
@bgm stop
@note guildhall notice board; the gossipers are off-screen voices

Adventurer 1: They say a Demon Lord is rising, that's what they say.
...
@overlay status
> [AVRAM — Wolf School Swordsmanship: Lv 13 → Lv 17 · ...]
@overlay end

@overlay floor 26
@overlay floor 30
@overlay floor 35
```
Two problems, both requested 2026-07-02:

1. **The boss fight itself is never shown or narrated.** Avram goes in alone,
   the next thing on screen is her waiting outside, then a guildhall gossip
   scene, then a level-up overlay. The reader never sees him win — it's only
   implied by the story continuing. User wants **the boss fight win shown**
   (a CG, a montage panel, or at minimum a narration beat — not left as a
   total skip).
2. **The cut from the guildhall/status-overlay back into the dungeon (floor
   markers 26/30/35) is jarring** — there's no transition establishing that
   they've gone back in. User's suggestion: show connective material — buying
   replacement armor (matches `ART-TODO.md` item 9's damaged-armor note; this
   would be where new armor gets acquired), them actually walking back into
   the dungeon, or some comparable sequence of transitional beats — rather
   than cutting straight from guildhall chatter to floor numbers.

Also flag: `cg_boss_bench`'s expression is tonally off for this moment — see
`ART-TODO.md` item 12 for that specific art note (she's smiling while alone
outside an intimidating boss door with Avram fighting inside, which reads
wrong for the tension of the scene).

Cross-reference item 12 (systemic stage-direction/compression pattern) and
item 13 (floor markers not working for readers) — this scene sits at the
intersection of both: missing content (the fight), missing transition
(dungeon return), and the floor-marker mechanic itself already flagged as
weak. Likely needs a combined pass rather than three separate patches.

## 20. "Looking at his hands" is a recurring narration tic with no matching graphic — eliminate it

Requested 2026-07-02: "Avram looking at his hands type stuff seems to maybe be
a Claude tic. Doesn't correspond well to any graphics. Should probably be
eliminated everywhere." This session searched `script.txt` for every "hands"
reference to separate the tic from legitimate uses:

**The tic (no matching visual — introspective hand-gazing as a brooding
gesture, rendered as just a standing sprite that can't show it):**
- Line 713: "Avram looks down at his own hands." — already flagged for
  deletion in item 18 (replace with an `Avram: ...` beat instead).
- Line 764: "Night camp. Her asleep by the fire. Avram sitting awake, looking
  at her, then at his hands." — **new instance, not previously flagged.**
  Scene is just `bg_camp_night` + `@sprite avram_late neutral left`, a standing
  sprite; nothing shows him looking at his hands. Needs a rewrite — could drop
  the "then at his hands" clause and keep "looking at her" (which at least a
  standing sprite facing her direction can gesture toward), or find a different
  closing beat entirely.

**NOT the tic — legitimate hands references tied to an actual depicted
action/CG, do not touch:**
- Line 662 (`@note`, not shown to reader): glow guttering off his hands in
  `cg_carry_road` — the CG genuinely shows magical sparkle effects around his
  hands.
- Line 831 (`@note`): "his hands at her collar, the moment of removal" —
  describes `cg_collar_removal`, a real physical action with narrative weight.
- Lines 961/968: "Avram starts digging in the ground, with his bare hands" /
  "Avram digs deeper with his hands" — both paired with an actual `cg_digging`
  CG showing him digging.

Net: **two confirmed instances of the tic** (713, 764), both now cross-
referenced with item 18. Whoever fixes 713/18 should fix 764 in the same pass
— they're the same underlying habit, not two unrelated edits.

## 21. Line edit: "I really, really do." → "I really, really have to."

Requested 2026-07-02. `script.txt` line 801 (chapter 13 The Freeing):
```
Her: I'm fine being your slave, Master. You don't have to -

Avram: I really, really do.
```
Change to "I really, really have to." User's own diagnosis, worth keeping
verbatim for future line-editing passes: "an instance of my not anticipating
what would be harder to parse in VN format without the referent visible on the
previous screen." I.e. "I really, really do [have to free you]" calls back to
his own line several beats earlier (791: "...to free you") — in prose the
reader could glance back up the page, but the kinetic novel's textbox replaces
each line as it advances, so by the time the reader reaches 801 the referent
("free you") is no longer visible on screen, and "I really, really do"
standing alone doesn't parse as cleanly. "Have to" borrows directly from her
own immediately-preceding "You don't have to -" instead, making it
self-contained. **General principle flagged for future line-editing passes:**
watch for other lines written with a callback/referent several beats back that
assumed prose-style page visibility — VN textbox format doesn't have that,
each line needs to stand more on its own than book prose would.

## 22. Cliff-scene staging should keep them visually at the cliff edge throughout

Requested 2026-07-02 — staging half of `ART-TODO.md` item 15, read that first
for the full context and asset details. `script.txt` chapter 14 (lines
855-930+): the whole climactic conversation currently plays as generic
`@sprite` cuts over `bg_cliff_sunset` (speaker swaps, expression changes) —
standard dialogue staging, not visually anchored to "standing at the edge of a
cliff" the way the story's stakes call for. `cg_cliff_two` (a proper two-shot
of them at the edge) only shows up after the conversation ends. User wants the
whole scene to read as the two of them at the cliff edge, not just the ending.

**Sequencing to preserve when restaging:** she's alone at the edge first
(current lines 857-858), Avram appears behind her after (860-861) — keep this
order; it's already correct in the current script and shouldn't be lost when
the staging changes.

This is a substantial restaging job, not a line edit — likely needs new
background/CG assets (see `ART-TODO.md` item 15) before the script side can
be touched. Don't attempt the script changes in isolation; coordinate with
whoever handles the art side.

---

(Append further script todo/revision items below as they're requested.)
