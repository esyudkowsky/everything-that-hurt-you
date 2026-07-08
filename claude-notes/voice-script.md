# voice-script.md — emotional direction for voice acting

**What this is.** Every line of dialogue in `script.txt` (see the comment-free copy,
`claude-notes/script-nocomments.txt`), annotated with a guess at what the character was
*actually feeling* when they said it, and — separately, where the two differ — *what
they were trying to outwardly present as feeling*. This is for an experiment (author,
2026-07-08): direction by inner emotional state rather than by explicit intonation
instructions. The annotations are written in plain, literal language because they may be
consumed by a small voice model: simple emotion words and concrete physical states only.

**How to use it.** Perform the *feeling*. Where a *presenting* line exists, the
character is hiding their real feeling behind a different outward manner; the voice
should mostly sound like the presented feeling, with the real feeling slightly audible
underneath. Where no *presenting* is given, the character is not hiding anything.

**Conventions.**
- `|` inside a quoted line is a pause already in the script text. Do not read it aloud.
- Lines whose entire text is `...` are silent panels — nothing is spoken. They are
  included (marked *silent*) so the actor knows the character's state during the pause.
- Third-person narration lines and on-screen text (`@overlay` blocks, the pamphlet
  title) are not dialogue and are excluded. If narration is ever voiced, use
  Skagganauk's voice: calm, deep, slow, unemotional.

**Spoilers are required reading for the cast**, because both leads hide things the
audience learns late.

---

## Cast — baseline emotional states

**AVRAM DETWILER.** A man from Earth, killed by a truck, summoned to this world. He is
secretly the Summoned Hero and tells no one until the last scene. He believes the nobles
arrange for Heroes to die young, so he hides, buys a collared slave as a
bodyguard-teacher, and plans to free her once he can survive alone. He is disgusted by
slavery and by his own participation in it. He is falling in love with her and refuses
to act on it, because she cannot meaningfully consent while collared. Baseline voice:
controlled, careful, guarded. He feels much more than he lets show. When his control
slips, it slips toward sadness, not anger.

**HER / HAURVATAT** (name never spoken; tag "Her"). Wolf-blood beast-girl, enslaved
young. Her collar physically punished negative thoughts — hatred, despair, memory of her
own name — until she stopped having them. So her cheerfulness early in the story is not
deliberate lying; it is trained-in and she does not consciously feel the misery
underneath. What she genuinely feels early on: eagerness to be useful, comfort in
routine, and one allowed kind of distress — worry that she is not serving well. Play the
early cheer as real but shallow and slightly too quick. She never sounds sad before the
collar comes off. After the collar comes off (chapters 11–12), all the suppressed pain
returns; her true voice is quiet, tired, dry, precise, and genuinely fond of Avram. She
is 23. At the cliff she has already decided to die, is calm about it, and sincerely
forgives him.

**SKAGGANAUK, the Void Dragon.** The narrator; the last boss of the world's deepest
dungeon; extremely old. He has watched the Hero/Demon-Lord cycle many times and already
knows how this story ends. Baseline: calm, patient, unhurried, emotionally distant but
not cold. Never fast, never loud. At the very end he shows warmth and hope for the first
time.

**BARTENDER.** Gruff, experienced. His fear when the Demon Lord is mentioned is real.
Otherwise he is relaxed and enjoys teasing the young customer. He does not know the
customer is the Hero.

**Minor voices.** Announcer: a professional auctioneer, bored, selling people the way
one sells livestock. Adventurers: drunk, cheerful gossips. Healer: dry, clinical,
quietly sympathetic to the slave. Slavetakers: calm professionals until things go wrong,
then angry and cruel. Attendant: flat, mildly pitying. Clerk: friendly and surprised.

---

## Chapter 1 — Arrival (Skagganauk voiceover)

All chapter 1 lines are Skagganauk. Overall state: calm, ancient, unhurried, telling a
story he already knows is sad. No urgency anywhere.

- **Skagganauk:** "I tell you now a tale of the planet, Elhom IV."
  - *feeling:* calm and formal; slow; a storyteller beginning.
- **Skagganauk:** "The world of Elhom IV has a cycle."
  - *feeling:* patient; stating a familiar fact.
- **Skagganauk:** "From time to time, arises a Demon Lord, feared and accursed."
  - *feeling:* neutral, even; no fear or menace of his own.
- **Skagganauk:** "And another rises to fight them."
  - *feeling:* even, matter-of-fact.
- **Skagganauk:** "The great, the powerful, the Summoned Hero."
  - *feeling:* respectful but unimpressed; he has said these titles many times.
- **Skagganauk:** "They are not supreme when they first arrive."
  - *feeling:* mildly amused, gentle.
- **Skagganauk:** "But they fight, in forests, in arenas, in dungeon labyrinths."
  - *feeling:* steady; quiet approval of effort.
- **Skagganauk:** "And they gain in strength very quickly."
  - *feeling:* certain; this fact matters and he says it firmly, but not ominously.
- **Skagganauk:** "Sometimes, the outsiders are summoned from lands that tell stories of places like Elhom IV. It leaves less to explain."
  - *feeling:* very slightly amused; otherwise even.
- **Skagganauk:** "There is much about Elhom IV that Avram Detwiler finds strangely familiar."
  - *feeling:* interest rising a little as he names the protagonist; still calm.
- **Skagganauk:** "But what Avram has not been told, it seems,"
  - *feeling:* deliberate; slowing down before an important fact.
- **Skagganauk:** "Is that there are always two outsiders Summoned, not one."
  - *feeling:* serious and weighty for this one line; then let it go.

---

## Chapter 2 — Bartender

- **Avram:** "Glass of traveler's mead."
  - *feeling:* tired from the road; alert and watchful underneath; he is really here to gather information.
  - *presenting:* an ordinary, forgettable customer; flat and easy.
- **Bartender:** "Eight copper."
  - *feeling:* bored; no interest in the customer.
- **Avram:** "Got a rumor I'd like to check on."
  - *feeling:* slightly tense; this question matters to him and he has rehearsed sounding casual.
  - *presenting:* idle curiosity.
- **Bartender:** "Twelve silver."
  - *feeling:* amused; half joking, half genuinely charging for information.
- **Avram:** "Not that kind of rumor - look, I'm not sure there's anything to this. Could just have been a guy messing with another guy. | But have you heard anything about a rising Demon Lord?"
  - *feeling:* tense; he already knows the rumor is true and needs to learn how far it has spread. The hedging is protective.
  - *presenting:* slightly embarrassed to be asking; ready to laugh it off.
- **Bartender:** "Aw *slimespit.*"
  - *feeling:* sudden real fear; dismay.
- **Bartender:** "What'd you hear, kid? Tell me everything. Now."
  - *feeling:* frightened, urgent; covering fear with aggression.
  - *presenting:* intimidating, demanding.
- **Avram:** "I just heard some guy talking about it! That's why I'm asking whether -"
  - *feeling:* startled and alarmed by the sudden menace; also afraid of revealing how he actually knows.
  - *presenting:* innocent and defensive.
- **Bartender:** "Some guy *where* saying *what?*"
  - *feeling:* still scared; pressing hard.
- **Avram:** "Some guy in the middle of nowhere who I heard say something about a Demon Lord! That's all I heard, okay? | I know practically nothing. That's why I'm *asking.*"
  - *feeling:* stressed; improvising a cover story under pressure and choosing words carefully so it is technically true.
  - *presenting:* exasperated innocence.
- **Avram:** "If the Demon Lord has shown up, I'd really like to know where they are, what they're doing."
  - *feeling:* completely serious; this is the information he actually needs.
  - *presenting:* a sensible traveler being prudent.
- **Avram:** "Whether their forces are invading here tomorrow."
  - *feeling:* serious; the danger is concrete to him.
  - *presenting:* slightly wry, keeping it hypothetical.
- **Avram:** "That kinda thing."
  - *feeling:* deliberately lowering the temperature after raising it; still watchful.
  - *presenting:* casual shrug.
- **Bartender:** "Deathstorms and balefire! No, I haven't heard anything."
  - *feeling:* relieved; the fear draining away.
- **Bartender:** "I wouldn't be staying on the same continent if I'd heard the next Demon Lord had shown up here, ya know?"
  - *feeling:* candid, calming down; explaining his honest survival policy.
- **Bartender:** "Or the Summoned Hero either, for that matter. | I'd wish the Hero the best of luck fighting, but not to the point where I'd want to die for gawking at it, ya know?"
  - *feeling:* comfortable, cynical, a little pleased with his own good sense.
- **Avram:** "Yeah, I know."
  - *feeling:* quietly noting that ordinary people flee from Heroes too; a small private heaviness.
  - *presenting:* idle agreement.
- **Avram:** "Probably a dumb question, but if a guy runs across an unusual drop, is there any more profitable and sophisticated thing to do with it than flipping it to the Guild buyers?"
  - *feeling:* focused; he is planning how to pay for something expensive. The self-deprecation is deliberate camouflage.
  - *presenting:* a naive newcomer asking about money.
- **Bartender:** "Guess what, kid? | You're right. | That is a dumb question."
  - *feeling:* enjoying himself; teasing; fear entirely forgotten.
- **Bartender:** "Better hope nobody overheard it."
  - *feeling:* mostly mocking, with a small real warning underneath. Said as a throwaway.
- **Avram:** "You know, maybe this is another stupid thought. Feel free to tell me why it's stupid."
  - *feeling:* focused and serious underneath; he is about to describe his real life plan and wants it criticized if it is wrong.
  - *presenting:* idle bar-stool philosophizing.
- **Avram:** "But if Summoned Heroes are supposed to learn so fast, why don't they just stay hidden and keep leveling to the point where they can take out the Demon Lord quickly and without wrecking a continent?"
  - *feeling:* strong conviction hidden under a casual question; some anxiety that there is a flaw he cannot see.
  - *presenting:* a hypothetical, nothing personal.
- **Avram:** "Like, geez, have some consideration for everybody who lives there."
  - *feeling:* he sincerely means this; it is his core moral position.
  - *presenting:* joking exasperation.
- **Bartender:** "Ha! Doesn't sound very *heroic*."
  - *feeling:* genuinely amused; the idea strikes him as obviously wrong.
- **Avram:** "That's the only reason you can think of for why the Summoned Hero doesn't do that? It's not heroic enough?"
  - *feeling:* pressing for a real objection; some relief growing (if this is the best counterargument, his plan is sound), kept hidden.
  - *presenting:* mild debating.
- **Bartender:** "I don't think people become heroes without pride, ya know?"
  - *feeling:* comfortable, certain, unbothered.
- **Avram:** "One might argue that the Summoned Hero ought to take pride in carefully executing their responsibility, to everyone in the world, to defeat the Demon Lord with minimum casualties and risk of failure."
  - *feeling:* this is his sincere personal creed; quiet passion underneath formal wording.
  - *presenting:* detached, impersonal argument.
- **Bartender:** "Sounds more like a villain's style to me."
  - *feeling:* cheerful and offhand. He attaches no weight to this line; say it lightly.
- **Bartender:** "If you think like that, the Summoned Hero ought to buy a high-level fighting slave and get carried through dungeons, like a sheltered noble scion, right? To avoid the risk that they get killed while they're still weak?"
  - *feeling:* having fun building an absurd example; mildly pleased with himself. (He is unknowingly describing exactly what Avram is about to do; do not signal this.)
- **Bartender:** "But people like that aren't *heroes.* They'd never work up the courage to face the Demon Lord in the end."
  - *feeling:* warm, dismissive, satisfied; wrapping up his argument.
- **Avram:** "..." *(silent panel)*
  - *feeling:* chilled and shaken. The bartender has just described his entire plan and called it cowardly and villainous, and he is going to do it anyway. If breath is recorded: one slow exhale.

---

## Chapter 3 — Auction

- **Announcer:** "A *war*-slave, sers! Blooded on the low floors, sound of wind and limb — wolf-blood stock, twice as hardy as any human and worth three warriors on a campaign!"
  - *feeling:* bored underneath; this is routine work.
  - *presenting:* loud professional showmanship, projecting to a crowd, emphasizing the selling points. No cruelty and no sympathy — pure salesmanship.
- **Announcer:** "[Ownership Transfer.]"
  - *feeling:* nothing; a rote official formula he has said thousands of times. Completely flat.

---

## Chapter 4 — Meeting

Context: Avram has just bought a person. He is ashamed and close to nausea, working from
a speech he rehearsed. She is assessing a new master and finding him confusing.

- **Avram:** "So. Um. I bought you to help me clear dungeons. And help teach me to fight. | I'm not planning to sexually assault you."
  - *feeling:* deeply ashamed and uncomfortable; tense in the throat and jaw; the rehearsed speech is coming out wrong.
  - *presenting:* calm and businesslike.
- **Avram:** "You didn't *look* like the prospect of risking your life in a dungeon would horrify you to the point where you'd rather have gone with the other guy instead."
  - *feeling:* justifying the purchase to her and to himself; slightly too fast; anxious.
  - *presenting:* reasonable and transparent.
- **Avram:** "It *looked* like you'd be better off with me. Like your life would be - better for my buying you, than my not buying you, if those were your only two options."
  - *feeling:* uneasy; he is stating the moral reasoning he used and checking that it still holds. He hesitates before "better."
  - *presenting:* careful fairness.
- **Avram:** "If I was wrong about that - please speak up."
  - *feeling:* sincere; afraid of the answer but genuinely wanting it.
- **Her:** "Helping you clear dungeons is fine, Master! | Is there a reason you wouldn't also have sex with me?"
  - *feeling:* relieved to have a clear assignment; then genuinely confused by his unusual terms. The question is practical to her, not shy and not seductive.
  - *presenting:* bright, cheerful, at ease.
- **Avram:** "It's - against the customs of my people."
  - *feeling:* cornered; retreating to a prepared cover story; discomfort spiking.
  - *presenting:* a mild statement of cultural fact.
- **Avram:** "Are you hungry? Do you need a shower, or a doctor, or new underwear, or - or anything at all?"
  - *feeling:* guilty and slightly frantic; rushing to do something kind immediately; the list runs too long.
  - *presenting:* practical logistics.
- **Her:** "No, Master. | I was fed just yesterday."
  - *feeling:* content; in her view this is a reassuring, low-maintenance answer. She has no idea how bad it sounds.
  - *presenting:* cheerful adequacy.
- **Avram:** "God. | How the hell do I say this? Do this?"
  - *feeling:* dismayed and shaken by her last answer; briefly talking to himself, not to her. Quiet, winded.
- **Avram:** "Um."
  - *feeling:* collecting himself; rethinking what to say.
- **Avram:** "I want you to have an experience that is... as comfortable as it can be under these circumstances."
  - *feeling:* strained; choosing each word very carefully; he cannot bring himself to say the word "slavery."
  - *presenting:* considered, gentle.
- **Avram:** "I don't mean that I'm ordering you to pretend to be happy."
  - *feeling:* anxious; urgently heading off a misunderstanding he fears.
- **Avram:** "Just... please let me know, how we can do this, in a way that minimizes fear and uncertainty for you. | On the inside."
  - *feeling:* earnest and careful; softer on "on the inside."
- **Avram:** "A smile on the outside isn't what I'm looking for, not unless you mean it."
  - *feeling:* gentle and deliberate; he noticed her fake-looking smile at the auction and is speaking to it.
- **Avram:** "And the *point* of this whole concept is to make things easier on you, which means, I'm *not* going to punish you if you don't get it right."
  - *feeling:* anxious that he won't be believed; the emphasis comes from worry, not sternness.
  - *presenting:* patient clarity.
- **Her:** "Master's wishes... are my command? | I'm not sure I understand Master's wishes, though."
  - *feeling:* genuinely confused; a real, quiet worry underneath — she cannot tell what serving this man correctly looks like, and that uncertainty frightens her a little.
  - *presenting:* dutiful willingness.
- **Avram:** "That's fine."
  - *feeling:* softening; relieved she said something honest.
- **Avram:** "Next we're going to the finest restaurant in this town and eating a nice meal together, including any of your favorite foods that are on the menu regardless of what they cost."
  - *feeling:* relieved to have found a concrete kindness he can actually do; a little warmth comes through.
- **Avram:** "And, if it's okay with you, I'd rather you didn't say anything about how grateful you are for such kindly treatment from me."
  - *feeling:* awkward; gratitude from someone he owns would make him feel worse.
  - *presenting:* a mild, apologetic request.
- **Her:** "Why not, Master? It's sort of an obvious thing to say."
  - *feeling:* honest puzzlement; not challenging him, just noting another oddity.
- **Avram:** "I mean, I *wish* I could say, it's okay for you to thank me if you want to. | But I won't actually be able to avoid looking horribly uncomfortable if you do."
  - *feeling:* honest and a little embarrassed; admitting his own limits; slightly self-mocking. His guard is mostly down for this line.

*(Naming beat, same chapter — town gate.)*

- **Avram:** "So. What do I call you? What's your —"
  - *feeling:* light, hopeful; trying for a normal getting-to-know-you moment.
- **Her:** "Whatever Master likes! A slave's name is her master's to give."
  - *feeling:* this is the only time in the whole story she interrupts him. Underneath: a reflex of trained avoidance — his question was heading toward her old name, a topic she was tortured over — but she does not consciously feel that; she only feels a sudden strong urge to be helpful right now. Say it slightly too fast and slightly too bright.
  - *presenting:* extra-bright eager helpfulness.
- **Avram:** "No, I meant, the name you had before you —"
  - *feeling:* kind, gently persistent, a little confused by her deflection.
- **Her:** "This says my name is #3,907,825. That's a lot of syllables for a dungeon, Master. You should pick something shorter."
  - *feeling:* steering quickly away from an uncomfortable topic by making it practical and funny; she is not aware of why she needs to steer away. Light and quick.
  - *presenting:* bright, clever, playful.
- **Avram:** "..." *(silent panel — long sideways look)*
  - *feeling:* a first quiet sense that something is wrong under her cheerfulness; he cannot name it yet.
- **Avram:** "...I'll think on it."
  - *feeling:* deciding not to push; quiet, gentle, a little troubled.

---

## Chapter 5 — Teaching

*(Bedroll scene, campfire at night.)*

- **Her:** "Master. You look cold."
  - *feeling:* comfortable; practical concern; glad to have something useful to offer.
- **Avram:** "I'll live."
  - *feeling:* guarded and wary of where this is going; also genuinely cold and tired. Clipped.
  - *presenting:* stoic indifference.
- **Her:** "Master, part of the reason your bedroll is cold is that it was made to hold two people. It's not meant for you to be alone."
  - *feeling:* patient and factual; she knows she is right about the bedroll; a small worry that a badly-rested master reflects on her.
- **Avram:** "..." *(silent panel)*
  - *feeling:* reluctantly recognizing her argument is sound; weighing principle against being cold all night.
- **Avram:** "...Fine. Warmth only."
  - *feeling:* giving in on the small point while firmly holding the larger boundary; tense and precise on "warmth only."
- **Her:** "Master, since we're sharing warmth anyway...?"
  - *feeling:* hopeful and light; to her this is practical, and unused services feed her worry that she is not good enough.
- **Avram:** "No."
  - *feeling:* immediate and absolute; it costs him effort — he is attracted to her and refusing himself, not just her. Flat, gentle, final.

*(Guild hall.)*

- **Clerk:** "Floor nine already?"
  - *feeling:* friendly astonishment; pleasantly surprised.
- **Avram:** "We've been lucky."
  - *feeling:* wary; fast progress attracts attention, which is dangerous for him.
  - *presenting:* modest, mildly wry.

---

## Chapter 6 — Tavern

- **Adventurer 1:** "Oi. That your slave?"
  - *feeling:* drunk, cheerful, looking for entertainment; no malice yet.
- **Avram:** "She's with me."
  - *feeling:* the word "slave" bothers him; guarded; he can tell where this is going.
  - *presenting:* neutral, indifferent.
- **Adventurer 1:** "Heard about you two. The boy who buys a beauty like that and bunks like a monk."
  - *feeling:* delighted; performing for his table.
- **Adventurer 2:** "Maybe his sword arm's the only arm that works!"
  - *feeling:* very pleased with his own joke; laughing as he says it.
- **Adventurer 1:** "It's cruelty is what it is. Girl like that, and he makes her sleep *cold*."
  - *feeling:* having fun; pretending to be solemn while joking.
  - *presenting:* mock-serious.
- **Her:** "I don't sleep cold. Master shares the bedroll."
  - *feeling:* simply correcting a factual mistake, cheerful, mouth half full, mostly interested in her food. She does not notice the sexual implication at all. Completely sincere — do not play any awareness of the joke.
- **Adventurer 2:** "Shares the bedroll. And *nothing?*"
  - *feeling:* genuine astonishment.
- **Adventurer 1:** "That's not a monk, that's a *saint*. Or a corpse."
  - *feeling:* amazed and delighted; a story he will retell for years.
- **Avram:** "We're done."
  - *feeling:* alarmed — the table just advertised his strangeness to a crowded room — plus plain embarrassment. Tight and flat; he is already standing.
  - *presenting:* bored finality.
- **Her:** "Goodnight, sers!"
  - *feeling:* cheerful and friendly; she enjoyed the evening; completely unbothered.

*(Outside the gate, night.)*

- **Her:** "Did I say something wrong, Master?"
  - *feeling:* real worry — the one kind of distress she is able to feel is anxiety about having made an error. Quiet and flat.
- **Avram:** "No."
  - *feeling:* protective; none of this is her fault.
- **Avram:** "Yes."
  - *feeling:* correcting himself a moment later because he will not lie to her; heavier than the "No."
- **Avram:** "We don't want to look anomalous."
  - *feeling:* serious, low, tired; the real danger behind this rule is much larger than he can explain.
- **Her:** "Yes, Master."
  - *feeling:* slightly relieved; a clear correction is easier for her than an unreadable master.
- **Avram:** "..." *(silent panel)*
  - *feeling:* aware he has again given her a rule with no reasons; unhappy about the pattern.
- **Her:** "..." *(silent panel)*
  - *feeling:* patiently holding an unspoken thought; not suppressed, just waiting.
- **Avram:** "I wonder if it's my imagination that I can almost hear you thinking it."
  - *feeling:* tired, wry, affectionate; offering a small joke as a peace gesture.

*(Campfire, firelight.)*

- **Avram:** "You can go ahead and say what you were thinking. I feel like I can still hear it."
  - *feeling:* open and relaxed by his standards; tired amusement; deliberately giving her permission.
- **Her:** "We'd look less like an anomaly if you told them you were fucking me."
  - *feeling:* matter-of-fact; she is offering a practical solution to the problem he named; slightly pleased with its neatness. No flirtation.
- **Avram:** "I hate lying and somebody with superior Social Skills might catch me at it."
  - *feeling:* even and careful; the answer is true but he is also using it to avoid the deeper question.
- **Her:** "And there's an obvious solution to that too, so why don't you?"
  - *feeling:* calm, genuinely curious; she knows she has him cornered logically.
- **Her:** "I don't understand. You have the rights to my body and I'd be happier too."
  - *feeling:* earnest confusion; "happier" is sincere — it would resolve her worry about being inadequate and make the relationship understandable. Slightly plaintive under the flat delivery. Not seductive.
- **Avram:** "It's -- the customs of my people."
  - *feeling:* strained; the excuse is wearing out and he knows it; he stalls in the middle of the sentence.
  - *presenting:* the same mild cultural fact as before.
- **Her:** "Their customs obviously allow people to fuck under some circumstances or you wouldn't be here, Master."
  - *feeling:* pleased with her own logic; bright, lightly teasing; enjoying the conversation.
- **Avram:** "...It's a subject we could revisit later under different circumstances."
  - *feeling:* careful and quiet; buying time; choosing words very deliberately.
- **Her:** "When, Master?"
  - *feeling:* direct; she wants a real answer and senses one is close.
- **Avram:** "When I've become strong enough to defeat you in a duel, easily, ten times out of ten."
  - *feeling:* underneath: sadness and tenderness, because this condition secretly marks the date he will free her, and he knows what that means and she does not. Delivered with mock-formal firmness.
  - *presenting:* a strange foreign custom, stated with a straight face.
- **Her:** "Your mysterious people's customs say you have to conquer me fairly to have the right to take me?"
  - *feeling:* amused skepticism; she doesn't believe the framing but accepts it; satisfied to finally have a concrete rule with a date attached.
- **Avram:** "Something like that."
  - *feeling:* quiet; closing the topic gently; a small ache underneath.
  - *presenting:* unreadable calm.

---

## Chapter 7 — Healer

- **Healer:** "Your slavegirl's not happy, young man. | She's trying to hide it, but not well enough to fool my level of social Skills."
  - *feeling:* dry and level; she dislikes slave-owners and is testing what kind this one is; watching his reaction closely.
- **Avram:** "What's wrong?"
  - *feeling:* instant, unguarded concern; no pause and no calculation. The speed and sincerity of this line matter.
- **Healer:** "On my Skill's read? | She doesn't know where she stands with you, or why you treat her the way you do. | Or what's in store for her, or what her life's going to be like, or why you won't fuck her."
  - *feeling:* clinical; delivering a diagnosis item by item, deliberately not softening it; still watching him.
- **Healer:** "I'm telling you this much, because my Skill judges it'll do her more good than harm for you to know. Don't prove me wrong."
  - *feeling:* quiet firmness; her sympathy is with the girl; the last sentence is a genuine warning.
- **Avram:** "It isn't about her. There's a reason and it's a good one."
  - *feeling:* stung and defensive, because the diagnosis is accurate and he cannot fix it without revealing his secret. Tense.
  - *presenting:* calm assurance.
- **Healer:** "Like what?"
  - *feeling:* unimpressed; giving him a chance she expects him to refuse.
- **Avram:** "Private."
  - *feeling:* miserable behind a wall; one word because more words would crack his composure.
  - *presenting:* flat finality.
- **Healer:** "Well if you won't tell even her, that sounds to her like you're planning to sell her off, hm? Not settling down for the long run with her."
  - *feeling:* deliberately pressing on his conscience because she has spotted that he has one. Dry, pointed, unhurried.
- **Avram:** "..." *(silent panel)*
  - *feeling:* hit hard. He now knows his silence is itself hurting her, and he still cannot speak. Sad and distant.

---

## Chapter 8 — Together

*(Montage; no dialogue.)*

---

## Chapter 9 — Ambush

- **Bandit:** "Easy now. Lay down weapons. | No need for anyone to die today."
  - *feeling:* relaxed and confident; routine work with a numbers advantage; the calm tone is itself the threat.
- **Avram:** "We've no wealth worth your risk."
  - *feeling:* adrenaline rising; buying seconds while he counts enemies and plans. Level and spare.
  - *presenting:* calm; trying to sound like a poor, boring target.
- **Bandit:** "We'll be the judge of that."
  - *feeling:* unbothered; everything going as usual from his side.
- **Her:** "Master. I don't think you should. | They have the air of slavetakers about them."
  - *feeling:* alarmed and protective — fear for him, not herself — plus professional certainty about what she is seeing. Low, flat, urgent; all cheer gone. (This combat voice appears nowhere else before the cliff.)
- **Slavetaker:** "Clever one, isn't she? | That's right. Our guild source says you're a prodigy with no backing, boy. | An easy, valuable drop."
  - *feeling:* enjoying himself; confident; in no hurry; savoring the reveal.
- **Avram:** "Then I suppose you will be the first to die by my hand. | I hope you end up somewhere else, but not anywhere you'll be important."
  - *feeling:* sad and certain. He has never killed anyone, has just decided to, and is already grieving it. The second sentence is a sincere, odd kindness — he personally knows death may not be the end. Quiet and steady. No anger, no bravado, no growl.
- **Slavetaker:** "Code black!"
  - *feeling:* shocked and furious — his men are dying and the plan has failed; barking an emergency order.
- **Slavetaker:** "Stupid fucking bitch -- you were worth money too, you know! I'm going to make you regret that really fucking badly, before you finish dying --"
  - *feeling:* rage turning cruel; he has lost money and men and wants to hurt someone. Loud, ugly, escalating until cut off.

*(Temple, sick-room vigil.)*

- **Attendant:** "Got attached to the slave, huh."
  - *feeling:* flat curiosity with mild contempt; casual small talk to her, not intended as cruelty.
- **Avram:** "She saved my life. | I'd save hers whether I was attached to her or not."
  - *feeling:* exhausted and hollow after hours at her bedside; also dodging the word "attached," which is truer than he wants to admit. He does not look up. Voice level and drained.
  - *presenting:* principle rather than feeling.
- **Attendant:** "Wow. | I'd heard about guys like you, but I'd never met one in real life before."
  - *feeling:* genuine surprise; recalibrating; almost respectful.
- **Attendant:** "That poor, poor girl."
  - *feeling:* sincere pity — by her worldview, a kind master is bad for a slave in the long run because he teaches her to hope. Said quietly, half to herself.
- **Her:** "The slavetakers —"
  - *feeling:* waking disoriented, urgent, still mentally in the fight.
- **Avram:** "Gone. Don't move."
  - *feeling:* intense relief held tightly under control; gentle, immediate.
- **Avram:** "I ordered you not to just fling yourself in front of me any time there's danger."
  - *feeling:* anger that is really fear, plus guilt — she nearly died protecting him. Not loud; strained and frayed.
  - *presenting:* a stern master enforcing an order.
- **Her:** "I didn't want them to take you away from me, Master. It wouldn't have been good for you."
  - *feeling:* weak, sincere, unapologetic; deep personal attachment expressed in the only terms she is able to use — his welfare.
- **Avram:** "That's a little more pride in our relationship than you've shown before."
  - *feeling:* surprised warmth breaking through his exhaustion; gently probing the new thing he just heard.
- **Her:** "Pride is one of the customs of my people."
  - *feeling:* weak but wry; she is echoing his own stock excuse back at him as a joke, with real feeling inside the joke. If she smiles, it is small and tired.

---

## Chapter 10 — Rising

- **Avram:** "Let me handle this one alone."
  - *feeling:* calm and resolved, with private weight — he needs to prove he can survive without her, because that is the condition for freeing her.
- **Her:** "Yes, master."
  - *feeling:* obedient on the surface, worried and vigilant underneath; she will watch every second of the fight, ready to move. Flat assent, tension underneath.
- **Her:** "Your strength has risen, Master."
  - *feeling:* professional assessment plus a teacher's pride; warm and even. Somewhere underneath, awareness that his promised condition is getting close.
- **Avram:** "Getting there."
  - *feeling:* grim satisfaction; deliberately understated. He is tracking a much bigger goal than she knows.

*(Guild hall gossip. The three adventurers are enjoying themselves; none of them know
the Hero is standing at the counter.)*

- **Adventurer 4:** "They say a Demon Lord may be rising, somewhere. Heard it from a bartender."
  - *feeling:* enjoying passing on big news from a safe distance; a pleasant thrill, no real fear.
- **Adventurer 5:** "I heard a Summoned Hero's been seen already. Over on the western continent."
  - *feeling:* pleased to top the previous rumor.
- **Adventurer 4:** "So very glad it's not here."
  - *feeling:* comfortable, heartfelt relief.
- **Adventurer 5:** "A *lady* Hero."
  - *feeling:* leaning in; getting to the juicy part.
- **Adventurer 6:** "A pretty one?"
  - *feeling:* eager; single-minded interest.
- **Adventurer 5:** "Aren't they always?"
  - *feeling:* worldly chuckle; enjoying sounding knowledgeable.
- **Adventurer 4:** "That's not on any list of Hero signs I've heard about."
  - *feeling:* mildly and happily contrary; the group's pedant.
- **Adventurer 5:** "And she's got a whole court of interesting men around herself, says the rumor, and she's not fucking any of them."
  - *feeling:* scandalized delight; saving the best detail for last.
- **Adventurer 4:** "That one was on the list."
  - *feeling:* dry satisfaction at being proven right.
- **Adventurer 6:** "That's got to be the most frustrating thing in the world, ain't it? The literal actual legendary Hero right there in camp with you and you're not getting it on."
  - *feeling:* sincere drunken sympathy for men he has never met. He has no idea he is also describing the man at the counter; play it fully oblivious.
- **Avram:** "..." *(silent panel, at the counter, profile)*
  - *feeling:* cold shock arriving in stages: the other summoned outsider is real, is publicly visible, and is following the exact same strategy he is — which means his own behavior pattern is recognizable. He goes very still and thoughtful. Outwardly just a man reading a notice board.

---

## Chapter 11 — Stronger

Night camp. He has confirmed he can survive alone, which means it is time to free her.
He has been dreading this conversation for as long as he has wanted it.

- **Avram:** "I think I'm stronger than you, now. Am I correct?"
  - *feeling:* dread held under a steady voice; he knows this question starts something she is not expecting.
  - *presenting:* calm, almost formal.
- **Her:** "Definitely, Master. I haven't been helping you much, or not inside of dungeons. | Does this mean your people's customs finally allow you to take me now?"
  - *feeling:* bright and hopeful; the promised date has arrived; her long-standing worry about being unused is about to be resolved. The eagerness is real.
- **Avram:** "This is a very serious question."
  - *feeling:* grave and gentle; wincing internally at her hope; slowing everything down.
- **Avram:** "If you lie about it, if you're pretending to be weaker than you are, to make me feel better, I could *die.*"
  - *feeling:* intense and low; literal truth; also making the stakes heavy enough that her urge to please cannot bend her answer.
- **Avram:** "Am I strong enough to beat you easily in a real fight?"
  - *feeling:* braced; asking the question that decides everything.
- **Her:** "I don't understand."
  - *feeling:* confused; his seriousness does not match what she thought tonight was about; the first hint that something is wrong. Flat and honest.
- **Avram:** "That's fine. Just answer the question with the complete truth."
  - *feeling:* soft and even; kind but procedural.
- **Her:** "You seem strong enough to defeat me easily, Master, ten times out of ten. | Even taking into account that you'd be using your magic to make up for having less life-or-death combat experience."
  - *feeling:* careful professional assessment; she is precise because her expertise is real; she believes this answer unlocks what she wants.
- **Avram:** "Okay. I didn't want to say this - before - it seemed cruel to say it before I was ready to do it."
  - *feeling:* committed now; grief already present; hesitating over word choices to avoid cruelty.
- **Avram:** "But I always planned, as soon I was strong enough to survive without your protection, to free you."
  - *feeling:* quiet, steady, and wretched; he watches the words hurt her as he says them.
- **Her:** "Oh... oh."
  - *feeling:* shock; the structure her world depends on is being removed, and the collar's conditioning does not even let her form the protest clearly. Two small syllables; the second even smaller.
- **Her:** "I'm fine being your slave, Master. You don't have to -"
  - *feeling:* fear, coming out as reassurance because that is the only form her conditioning allows; talking slightly too fast.
  - *presenting:* bright, easy contentment.
- **Avram:** "I really, really have to."
  - *feeling:* pained but absolute; soft volume, total finality.
- **Her:** "Master, I - like the way things have been with you. You're very mighty and wise, and I'm proud to be your slave. | I would rather that things just stay as they are."
  - *feeling:* as close to open pleading as she is capable of; dignity and fear together; she stumbles at "I - like" because the sentence contains a real personal feeling and she has no practice saying those. Underneath: in her experience, change has always meant catastrophe.
  - *presenting:* composed, respectful preference.
- **Avram:** "If you still feel that way in a month, I wouldn't object to putting a collar on you."
  - *feeling:* softening; making a real offer; hope showing despite his effort to hide it.
- **Avram:** "Not this collar, not a magical slave collar."
  - *feeling:* quick and precise; anxious not to be misunderstood on exactly this point.
- **Avram:** "It's - something of a sacred rite among my own people, when somebody steps forward to receive a collar from the one they love, that they name their master of their own will."
  - *feeling:* embarrassed and deeply sincere at once; he is describing something tender from his home world, and it is as close to a declaration of love as he can manage. Awkward and warm.
- **Her:** "So just leave the collar on me, then?"
  - *feeling:* bargaining; desperate underneath, reasonable-sounding on top; she wants any version where nothing changes.
- **Avram:** "Yeah, see, the part where they step forward of their own will is important. This collar is *not that.* From my perspective it's a horrific blasphemy."
  - *feeling:* real anger finally showing — aimed at the collar and the world that made it, never at her. Controlled but hot.
- **Her:** "Take the collar off, then put it back on me again right away?"
  - *feeling:* scrambling for another workaround; panic underneath a bright, helpful surface; slightly too fast.
  - *presenting:* helpful problem-solving.
- **Avram:** "I'm not sure how a magical loyalty collar works, exactly. | I worry it might be influencing your thinking patterns, not just preventing overt disobedience."
  - *feeling:* careful and quietly horrified; this is the fear he has carried the whole story — that he has never once talked to her un-influenced self.
- **Avram:** "Even if you say it's not doing that, you might just be saying what the collar programmed you to say. | Or thinking what you subconsciously believe I wish you'd think."
  - *feeling:* weary; he has run through these loops many times in his head; steady but tired.
- **Avram:** "Or for all I know, you could be saying these things to me now, because I haven't freed you *yet* and you're scared this is all a trap."
  - *feeling:* bleak thoroughness; he applies the doubt against himself too.
- **Avram:** "Once you've been free for a month, I'll trust that you've had time to get used to freedom, and making your own decisions."
  - *feeling:* reciting the plan that makes real consent possible; solemn; hope hidden inside the procedure.
- **Avram:** "If you still want to be my slave then, or just to kiss me, I won't say no."
  - *feeling:* his most exposed line: real longing, allowed out for one sentence. "Or just to kiss me" is hard for him to say. Quiet and plain.
- **Her:** "Is this... truly your desire, Master? Truly?"
  - *feeling:* the closest her conditioning lets her come to saying "please don't do this"; checking twice, hoping for an exit. Small voice.
- **Avram:** "What I want has surprisingly little to do with any of this."
  - *feeling:* bleak and true; flat with fatigue. What he wants is her, and he will not let that decide anything.
- **Her:** "Was I not a good enough slave?"
  - *feeling:* genuine hurt in the one shape her conditioning permits: fear of inadequacy. Small and sincere.
- **Avram:** "This isn't about that and I think you have enough common sense to know it."
  - *feeling:* firm, warm underneath, fraying; refusing to let her believe it is her fault.
- **Avram:** "Look, I'm sorry, I've tried to avoid giving you explicit orders, but - this isn't optional."
  - *feeling:* apologetic and unbending at the same time; he is breaking his own rule against giving orders, and hates doing it, in order to end all orders.
- **Avram:** "Come here and stand still while I remove your collar."
  - *feeling:* grief held under a deliberately steady voice. If the voice wavers, it wavers on "stand still."
- **Avram:** "You can take some time to think, if you need to."
  - *feeling:* hollow and helpless; with the collar off he suddenly cannot read her at all; gentle.
- **Avram:** "I'll be around if you want to talk to me."
  - *feeling:* aching; retreating slowly; leaving every opening he can.
- **Avram:** "If you need to - say anything to me."
  - *feeling:* almost breaking; "anything" includes screaming at him or hating him — he would accept all of it. Nearly a whisper.

---

## Chapter 12 — Truth (the cliff)

Register change for both. Her collar is off: the conditioned cheer is gone completely.
Her true voice: quiet, tired, dry, precise, kind, sounding older than before. She has
already decided to die and is calm about it. He suspects what the cliff means and will
not use force or authority to stop her; that refusal costs him everything.

- **Avram:** "Sorry for - interrupting you - but I felt you climb up here. My magical senses extend a long ways, now."
  - *feeling:* deep fear, kept very quiet and slow — he knows what a cliff might mean and is trying not to startle her. The small talk is deliberate gentleness.
  - *presenting:* apologetic, casual, light.
- **Avram:** "It's a funny thing, I have all sorts of guesses about what you might say, and they all terrify me, and I need to hear it anyways."
  - *feeling:* honest fear, openly admitted; no performance left; bare and quiet.
- **Avram:** "You can slap me for having the temerity to say this, if you want to. | But even so, I'm sorry."
  - *feeling:* a long-carried apology finally spoken; braced for anger; quiet and steady.
- **Her:** "You weren't so bad. | It's not a lie that you were the best master I've ever had."
  - *feeling:* tired kindness; carefully exact — she gives him only as much comfort as is honestly true. Low, level, unhurried.
- **Her:** "If it had only ever been you, I might be able to - live with it."
  - *feeling:* quietly explaining her decision; she hesitates before "live with it." Calm about something enormous — that calm is the correct register for all her testimony here.
- **Her:** "The collar punished me. Like a centipede crawling in my brain and biting me when I thought anything it didn't like."
  - *feeling:* giving testimony about torture in a level, tired, precise voice; no drama.
- **Her:** "Every time I thought how much I hated it."
  - *feeling:* flat and even; listing things she was never allowed to say.
- **Her:** "Every time I thought how much I didn't want to keep living."
  - *feeling:* the same flatness — to her this item is no bigger than the others.
- **Her:** "Every time I resented being punished."
  - *feeling:* precise; a trace of old, dry disbelief that the punishment covered even resenting punishment.
- **Her:** "They left me in a cell to scream for weeks while that part worked itself out. Some people in the cells just died that way."
  - *feeling:* the worst memory, reported plainly, like a fact about logistics; quiet.
- **Her:** "I managed to stop thinking the bad thoughts, and then things were better."
  - *feeling:* even; "better" is said with grim accuracy, not sarcasm.
- **Her:** "I just kept going and never had to think at all about how much I hated it."
  - *feeling:* quiet, conclusive; the explanation of her whole earlier cheerfulness.
- **Avram:** "I was... afraid... it was, it was, it was something like that..."
  - *feeling:* devastated. His worst guesses confirmed and worse. Grief, horror, and guilt at once; the stutter is real; barely above a whisper.
- **Her:** "And now you took off the collar and I can't. Can't stop. Can't stop thinking about it."
  - *feeling:* the suppressed pain flooding back and overwhelming her calm for the first time; tight, urgent, repeating herself. Her closest approach to breaking down before the shout.
- **Avram:** "Do you - I want to say this, but, I don't know if I have your permission to say it -"
  - *feeling:* halting and careful; genuinely asking her permission to speak, and meaning it.
- **Avram:** "Do you know the reason I did it, or my excuse, for making you fight with me and protect me? Instead of freeing you right after I bought you?"
  - *feeling:* he corrects "reason" to "excuse" honestly, mid-sentence; he needs her to have the whole truth. Quiet, unsteady.
- **Her:** "If it's what I think it is, I guessed the first week after you bought me. | I didn't say it because it seemed like you didn't want me to, and Master's wants are absolute."
  - *feeling:* faint dry humor, even now; the last phrase is said with mild irony and is also simply how her world worked.
- **Avram:** "I'm the Summoned Hero."
  - *feeling:* the secret of two years, said flatly, with no drama left; relief and shame together; it comes out small.
- **Her:** "No, really? You seemed like such an inhabitant of this planet."
  - *feeling:* deadpan gentle teasing — a deliberate kindness to him; letting him know his secret was never really a secret, and that she is not angry about it.
- **Avram:** "I'm the Hero and after I've defeated the Demon Lord, when I'm strong enough, I'm going to wipe every slave collar and every slave merchant off the face of this world."
  - *feeling:* a sworn vow; intense but not shouted; heat rising through the sentence.
- **Avram:** "And then, somehow, I don't know how, arrange it so the slave trade doesn't just come back a hundred years later. | That's going to be the hard part, even if I can do the rest."
  - *feeling:* serious and thinking; he admits the hard part honestly, which is how she can tell the vow is real.
- **Avram:** "The nobles know, from what I heard. | They know the Summoned Heroes sometimes don't like what they see when they get here."
  - *feeling:* quiet and bitter; explaining the threat that shaped his whole plan.
- **Avram:** "I suspect the nobles of encouraging Heroes to confront Demon Lords too soon, trying behind the scenes for a mutual kill."
  - *feeling:* cold, considered; a suspicion he has never been able to say to anyone. Low.
- **Avram:** "I couldn't trust anyone. | Had to grow in secret. | Needed protection while I learned to fight."
  - *feeling:* his defense, coming out in fragments; tired; afraid it sounds like a mere excuse.
- **Avram:** "I couldn't think of any safer way than a slave with a magical loyalty collar. So I could free all the slaves later."
  - *feeling:* steady, ashamed, unflinching; he hears how bad it sounds as he says it and says it anyway.
- **Avram:** "I, I figured, that awful slimeball would have bought you, if I didn't, and that made it, not okay, but a net benefit for you."
  - *feeling:* the reasoning sounds weaker spoken aloud than it did in his head, and he can hear that; stammering slightly; refusing to excuse himself even while explaining.
- **Avram:** "And I tried to treat you the best I possibly could. But I needed somebody to protect me, until I was strong enough, and I couldn't trust anyone -"
  - *feeling:* the defense running out; trailing off into helplessness; exhausted.
- **Her:** "Yeah, I get it."
  - *feeling:* simple, real forgiveness; tired and plain; cutting his spiral short because she truly does understand.
- **Her:** "You know, I do wish you'd used my night services."
  - *feeling:* rueful and honest; looking back at what might have been easier; slightly wry. Not flirtation, not accusation.
- **Her:** "The collar, the only kind of thinking it allows, I kept worrying that I was doing something wrong. | That I wasn't good enough for you."
  - *feeling:* calmly naming the anxiety she lived with; level; slightly wondering, like examining an old injury.
- **Her:** "If you'd used me and I hadn't needed to worry about that part, it really would have been - as pleasant as it ever gets while you're a slave."
  - *feeling:* precise and honest; the qualifier at the end is deliberate — she refuses to prettify it, the same way he refuses easy comfort.
- **Avram:** "I'm sorry, but - I don't regret that decision. | Making love to you and finding out the truth afterwards would have been horrible beyond imagining. It would have scarred me forever."
  - *feeling:* honest even though honesty is costly here; in pain; voice held level by effort.
- **Avram:** "Even worse than this is going to, I mean."
  - *feeling:* plainly acknowledging that this conversation will wound him permanently; said simply, almost as an afterthought.
- **Avram:** "I - I know I have some trouble with self-forgiveness, but - even I don't think I deserved that. | If I had to do it all over again, I still wouldn't have sex with you."
  - *feeling:* halting; a rare, effortful moment of being fair to himself; the final clause firm.
- **Her:** "I see. | I forgive you, then."
  - *feeling:* sincere, simple, conclusive; warm; a settled decision.
- **Avram:** "What's your real name? Not the nickname I gave you or that slave ID code, your name from -"
  - *feeling:* soft and warm; he intends this as a kind gift — giving her back her identity — and has no idea he is touching her worst trauma.
- **Her:** "*Stop!* | Stop. | Don't remind me of that. | It's - that was one of the worst parts of the nightmare at the beginning, being punished, never to think of my old name -"
  - *feeling:* the only shout in the scene: sudden panic, before thought, from her oldest wound. The first "Stop!" is loud and sharp; the second is quiet, already pulling herself back; the explanation after is ragged and shaky.
- **Avram:** "Never mind. I'm sorry."
  - *feeling:* instant retreat; horrified at what he touched; small voice.
- **Her:** "I should - I should go very soon. This is getting harder and harder."
  - *feeling:* ("go" means die.) The pain is rising past what her calm can hold and she says so honestly, with apology in it; strained but gentle.
- **Avram:** "I don't suppose you'd want to stay, not to defeat the Demon Lord, but to wipe out the entire slave trade afterwards?"
  - *feeling:* his last attempt to give her a reason to live, made already expecting it to fail; hope and hopelessness together.
  - *presenting:* light and casual, so that refusing costs her nothing.
- **Her:** "No. | I can't handle it. Can't put the collar back on, even if that made me able to handle it. | Not even to free all the other slaves. I'm sorry."
  - *feeling:* certain, and genuinely sorry about being certain; the "I'm sorry" is sincere and calm.
- **Avram:** "It's not your fault. I'll free them for you."
  - *feeling:* immediate reassurance, then a renewed vow, now made to her personally; tender.
- **Avram:** "Is there - is, is there, anything else you want to say to me, or ask of me?"
  - *feeling:* stammering; trying to keep the conversation alive a little longer because he knows it is the last one; wrecked but gentle.
- **Her:** "I don't understand you, Summoned Hero. I never did."
  - *feeling:* soft wonder; the title said almost fondly; beginning her goodbye.
- **Her:** "You seemed so sad and guilty and I never understood why."
  - *feeling:* tender puzzlement; unhurried.
- **Her:** "You bought me away from a bidder who would have been much worse. | You gave me the kindest treatment you could. | You let me go, when you were finished."
  - *feeling:* calm and deliberate; listing the facts in his favor, item by item, as a considered judgment.
- **Her:** "Most people in this world are not that nice. | I'm not sure what being nicer could look like."
  - *feeling:* plain truth from experience; quiet finality.
- **Avram:** "The way my people see it, you would have the right to demand that I did more. Did better."
  - *feeling:* quietly refusing her verdict; stubborn; close to breaking.
- **Her:** "You keep saying that the standards of behavior are different where you came from."
  - *feeling:* (a small, real, tired smile arrives here.) Affectionate exasperation with him; warm; the most ordinary-sounding feeling in the scene.
- **Her:** "I don't know what the laws of your world were like. | I imagine they must have been very harsh, in some ways, even if they were kindly in others."
  - *feeling:* gentle insight; she has understood that his own moral code punishes him; wise and warm, unhurried.
- **Her:** "But *I* believe that you - | what you did, what you're going to do -"
  - *feeling:* gathering strength to say something important; the broken phrasing is effort, not confusion; warmth rising.
- **Her:** "Stop thinking that you're a horrible person, okay, Avram? Because you're not."
  - *feeling:* she says his name for the first and only time. Direct, warm, urgent but gentle; she needs this to land; steady.
- **Her:** "That's my wish to you. Grant it."
  - *feeling:* calm and final; a free woman giving her former master an order and meaning it; a small trace of wry humor.
- **Avram:** "Okay."
  - *feeling:* (rendered small and quiet on screen.) Complete defeat and complete love; a promise he does not believe he can keep, made because she asked. Barely voiced, almost no air behind it.
- **Her:** "Goodbye, Master."
  - *feeling:* settled, grateful, calm; "Master" is now freely chosen and affectionate, not submissive; a very slight smile in the voice; nothing in it asks to be stopped. Unhurried. (The line types slowly on screen; match that pace.)

---

## Chapter 13 — Change (Skagganauk close)

Same narrator as chapter 1, but now the story has been told. Slightly more warmth
showing through the calm, and the final line is openly warm and hopeful.

- **Skagganauk:** "At the poles of the world, there are two dungeon entrances that never fade, no matter how much time passes without challengers."
  - *feeling:* calm and steadying after the cliff scene; slow and even.
- **Skagganauk:** "Down and down go the stairs beyond, through level after level of dungeon, unto the very center of the World."
  - *feeling:* patient; slow, steady rhythm, like a long descent.
- **Skagganauk:** "There upon a mountain of treasure inconceivable, lies the last boss of the last dungeon, |I, |myself, |the Void Dragon Skagganauk, |where I wait and watch and guard the last key."
  - *feeling:* revealing himself without vanity; huge stillness at the pauses around "I, myself"; quiet amusement at stepping out from behind the narration.
- **Skagganauk:** "Many things do I know, and one of them is this:"
  - *feeling:* deliberate; gathering weight before an important statement.
- **Skagganauk:** "Always two they are, when they come to this place from elsewhere."
  - *feeling:* absolute certainty; stating a law of the world; even and slow.
- **Skagganauk:** "When the world has stayed in its course too long, |when the boundaries of countries have stayed set, |when there are no more great discoveries in the academies of magic, |they come."
  - *feeling:* patient, rhythmic, almost ceremonial; a faint eagerness underneath, because change is what he waits for.
- **Skagganauk:** "And the dance of Summoned Hero and Demon Lord begins."
  - *feeling:* grave; he knows what this costs the two people involved; the barest warmth.
- **Skagganauk:** "By whatever machinery brings the two here, it is somehow assured:"
  - *feeling:* honest, dry wonder; even he does not know how this works.
- **Skagganauk:** "Of the two outsiders, there is one who chooses to protect the things that are, | and one who desires to change them."
  - *feeling:* careful and even-handed; no judgment on either side; do not hint at which of the two Avram is.
- **Skagganauk:** "I wish you the best of luck, Demon Lord. May the change you bring, be at last the truth that this world is forever seeking. |[]"
  - *feeling:* a sincere blessing, spoken to Avram. Respect, compassion, and real hope. Warm for the first and only time in the piece. Slow and final.
