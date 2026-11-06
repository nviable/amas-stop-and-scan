# STOP&SCAN — Guided by Amito

## A detailed description of the website and the pedagogical thinking behind it

> STOP&SCAN helps you pause before you trust, scan before you share, and reflect
> before you act. Amito is your friendly guide through the process.

This document describes what the website *is*, how a person moves through it, and
— most importantly — *why* it is built the way it is. It is written for educators,
collaborators, reviewers, and future contributors who want to understand not just
the surface of the product but the reasoning embedded in each design choice. Where
a feature exists because of a specific pedagogical conviction, that conviction is
made explicit.

---

## 1. What this website is

STOP&SCAN is an interactive educational website that teaches a **scaffolded
sensemaking framework** for deciding how much to trust digital media in the age of
AI-generated and synthetic content. It is not a deepfake detector, a fact-checking
service, or a database of known scams. It is a *training ground for a habit of
mind* — a repeatable five-move process a person can run in their own head when a
post, ad, video, or message asks for their trust.

**Amito** is the friendly animated guide who walks alongside the learner. Amito is
deliberately a *messenger and coach*, not an authority who hands down verdicts.
The brand keeps a clean separation: STOP&SCAN is the durable skill; Amito is the
approachable face that lowers the emotional cost of learning it.

The framework spells out as:

- **STOP** — pause and register your gut reaction (the pre-commitment moment).
- **S — Source** — who is *really* behind this?
- **C — Content** — does what you see actually hold up?
- **A — Alignment** — does everything fit together with outside evidence?
- **N — Now Reflect** — has your judgment changed, and why? ("I don't know yet" is
  a valid answer.)

`STOP` is the pre-commitment gut check; the letters `S`, `C`, `A`, `N` literally
spell `SCAN`. The mnemonic is the pedagogy: the name itself encodes the sequence
of moves, so the framework is retrievable from memory without the website present.

---

## 2. The core pedagogical thesis: fix the reasoner, not the artifact

The single most important design decision — the one that shapes everything else —
is the choice to **target human reasoning rather than artifact detection.** This is
stated plainly on the Project page and is worth unpacking because it explains why
the site looks and behaves the way it does.

The reasoning, drawn together on the Project and Resources pages:

1. **People are near chance at spotting deepfakes, and often most confident when
   wrong.** Teaching people to hunt for visual tells (six fingers, warped ears,
   unnatural blinking) does not reliably improve accuracy.
2. **Artifact cues are a moving target.** Generation technology improves faster
   than any checklist of glitches can keep up with. A curriculum built on "look for
   these visual flaws" is obsolete the moment the next model ships.
3. **What stays constant is the structure of manipulation.** Broken provenance,
   emotional amplification, manufactured urgency, and claims that exist in isolation
   are stable across technologies. A genuine event leaves independent traces; a
   fabricated one usually cannot.
4. **Even where detection tools exist, people don't consult them**, and labels can
   backfire — labeling some content as suspect can make *unlabeled* content seem
   more trustworthy than it deserves.

So the intervention is placed at **the cognitive layer**: how a person interprets
signals and how their own bias shapes judgment. This is why the lessons never ask
"is this image AI-generated?" and never reward "catching a fake." They ask "can you
trace this to an accountable source?", "what is this trying to make you feel?", and
"does anything independent confirm it?" — questions whose validity does not expire.

This thesis is reinforced in the framework's `Content` rationale, which states the
position directly: artifact cues are "subtle, evolving, and insufficient as a
primary strategy — generation tech outpaces them. What remains constant is the
emotional and logical structure of manipulation. That's what STOP&SCAN teaches you
to read."

---

## 3. The five moves and the thinking inside each

Each step exists to counter a *specific, named* cognitive vulnerability. The
"Why it works" and "takeaway" copy on each Resource step is seeded from the
framework's underlying research and is intentionally explicit about the mechanism
it is defending against. Teaching the *why* is itself a pedagogical strategy
(see §6 on inoculation): a learner who understands the mechanism can resist the
next variant, not just today's example.

### STOP — pre-commitment gut check

**The move:** Before doing anything else, name your honest first reaction (believe,
doubt, unsure) and the emotion it produced (fear, outrage, excitement, urgency).

**The thinking:** This is borrowed from **digital-forensics practice**, where an
examiner forms an explicit judgment *before* consulting tools so that the findings
can't silently rewrite the initial impression. Two biases are being defended
against at once:

- **Anchoring on what you later find** — without a recorded "before," any
  investigation tends to confirm whatever you already felt.
- **Motivated reasoning** — simply *agreeing* with content is one of the strongest
  predictors of false acceptance. Naming the reaction early makes the bias visible.

The takeaway copy makes the cost explicit and small: "It takes five seconds and
makes your initial judgment explicit, so the investigation can't just confirm
whatever you already felt." The five-second framing matters — a habit only sticks
if its activation cost is trivially low.

Crucially, the in-product STOP message reframes the goal: *"STOP is not about
deciding if something is fake. It's about noticing what the content is doing to you
before you act."* This relocates success from "be a good fake-detector" to "notice
your own state" — a goal everyone can achieve regardless of skill.

### S — Source: who is *really* behind this?

**The move:** Trace content back to its *original creator*, not the person who
reshared it to you. Check whether the account is real, established, and locatable.
Count how many hands it passed through.

**The thinking:** Content spreads by resharing, so by the time it reaches you the
origin may be invisible — often *deliberately*. Bad actors create on anonymous
accounts, let others amplify, and disappear. The key pedagogical reframe is the
takeaway: **"If you cannot find the origin, that is itself the manipulation.
Unverifiable origin = unverified content."** This converts a *failure to find*
something (which feels like an inconclusive dead end) into a *positive signal* —
absence becomes evidence. That reframe is what stops a learner from defaulting to
"well, I couldn't disprove it, so maybe it's fine."

### C — Content: does what you see actually hold up?

**The move:** Ask whether footage could be from a different event/place/time, and —
most importantly — notice the *emotional and logical structure*: is the language
extreme, urgent, or engineered to provoke immediate action?

**The thinking:** Our brains treat seeing as believing, and manipulators exploit
this. The step deliberately *downgrades* artifact-spotting ("do edges/hands/lighting
look consistent?") to just one of several questions, and *upgrades* the emotional
read. The takeaway is a single transferable rule: **"A strong emotional reaction to
content is a signal to slow down, not speed up."** This is the inversion of the
manipulator's intent — they want emotion to accelerate action; the framework turns
the same emotion into a brake.

### A — Alignment: does everything fit together?

**The move:** Search the claim. Does anyone report it *independently*? Do source,
content, timing, and context cohere? Is the narrative suspiciously perfect?

**The thinking:** Real events leave multiple independent traces; manipulated content
exists in isolation because nothing else confirms it. A subtle but deliberate point
in the rationale: **the framework does not require trusting any specific outlet.**
The question is whether independent confirmation exists *anywhere*, applied
consistently. This is designed to be robust for learners across the political and
trust spectrum — it sidesteps "but I don't trust that news source" by making the
test about *convergence of independent traces*, not about any single authority.
The takeaway: isolation is a red flag.

### N — Now Reflect: has your judgment changed, and why?

**The move:** Return to the gut check. State what changed and why. Explicitly check:
if you couldn't complete Source, Content, or Alignment, you don't have enough yet.

**The thinking:** This is the step that most distinguishes STOP&SCAN from a checklist.
The most sophisticated manipulation doesn't make you believe something obviously
false — **it makes you feel certain when you have no real basis for certainty.**
Poorly calibrated confidence is the primary driver of misinformation acceptance and
spread. So the framework's terminal value is not "arrive at the right answer" but
**"calibrate your confidence to your evidence."** Hence the repeated, load-bearing
message: *"I don't know yet" is a complete and honest answer.* Uncertainty,
properly calibrated, is protective. "Not decided yet" is explicitly designed as a
*non-failure* state — see §5.

---

## 4. Two learning paths: Learn (scaffolded) vs. Practice (faded)

The same underlying lesson engine powers two modes, and the difference between them
is a direct implementation of **scaffolding and fading**, a well-established
instructional-design principle: support is high when the skill is new and is
gradually withdrawn as competence grows.

Both modes run identical case content through `LessonEngine`, but they differ in
*when* support appears:

| | **Learn (guided)** | **Practice (faded)** |
|---|---|---|
| Audience | First-time users | People who know the framework |
| Source findings / comment signals | **Shown immediately** | **Hidden** until revealed |
| Per-step feedback | "Check my answer" → immediate **Amito feedback** | "Show hint" is *optional*; feedback is **delayed** |
| To advance | Must make a choice *and* check the answer | Must make a choice (hint not required) |
| Final screen | Standard reflection | Adds a **Practice review** comparing your picks to what Amito would double-check, and flags which steps used a hint |

The pedagogical reasoning, made concrete in code:

- **Immediate vs. delayed feedback.** In Learn mode, learners get feedback at each
  step so misconceptions are corrected before they compound. In Practice mode,
  feedback is *deliberately delayed* to the end ("Feedback was delayed while you
  practiced") so the learner has to commit to a judgment under realistic
  conditions, then review. Delayed feedback strengthens retention and forces
  genuine retrieval rather than recognition.
- **Optional hints, tracked honestly.** Practice mode lets you ask for a hint, but
  records that you did (`hintsUsed`), and the journal/export surfaces "Hints used."
  This is not punitive — it makes the learner's *reliance on support* visible to
  themselves, which supports self-regulated learning.
- **Decide before you see the answer.** Across both modes, the "flag" markers (the
  ⚑ that highlight signals worth noticing) and detail text only appear *after* the
  learner has engaged. You cannot passively read the answer key; the interface
  withholds it until you've formed a view. This is enforced structurally: the
  "Continue" button is disabled until a choice is made.

---

## 5. "I don't know yet" as a first-class, non-failure outcome

This deserves its own section because it is the site's most counter-intuitive and
most deliberate pedagogical commitment, and it is implemented in several places at
once:

1. **Every scan step offers an explicit "I need more evidence before deciding"
   option** (`includeUnsure`), and selecting it clears other selections — it is a
   real, mutually-exclusive answer, not a cop-out hidden in the corner.
2. **The reflect step lists "Wait — I'm not decided yet" as a legitimate next
   action**, alongside "do not share" and "verify."
3. **The reward screen explicitly absolves the learner of needing a verdict:** *"You
   didn't have to 'catch a fake' to succeed. Slowing down when content wants speed
   is the whole habit — and 'I don't know yet' is always a complete, honest
   answer."*

Why this matters: if the only "win" is correctly labeling content true or false,
the product would (a) reward overconfidence and (b) teach exactly the behavior that
spreads misinformation — fast, confident judgments. By making suspended judgment a
*success state*, the site aligns the learner's sense of accomplishment with the
real-world protective behavior. The success metric is **the pause and the calibrated
confidence**, not a correct binary label.

---

## 6. Inoculation: teaching the mechanics of manipulation

Each step's "Why it works" panel does more than justify the step — it teaches the
*technique* being used against the learner: broken provenance, emotional
amplification, manufactured social proof, isolated claims, borrowed authority,
fake urgency. This is **psychological inoculation** (a.k.a. prebunking): exposing
people to a weakened, explained form of a manipulation tactic builds resistance to
future, stronger instances of it.

This is why the differentiator on the Project page reads: *"Each step explains the
why — how broken provenance, emotional amplification, and isolated claims work — so
you resist the next iteration, not just today's example."* The learner is meant to
leave with a model of *how the trick works*, which generalizes, rather than a memory
of *this particular scam*, which does not.

---

## 7. Calibration in both directions: doubt *and* trust

A media-literacy tool that only teaches doubt produces cynics, not discerning
people — and reflexive disbelief is itself a harm (e.g. dismissing real footage of
real events). The case-file schema and the case library are built to train
**calibration in both directions:**

- The data model supports three case kinds: `scam`, `authentic`, and
  `decontextualized`. The schema can represent content that is *real* and should be
  *trusted*, not only content that should be rejected.
- The case library already includes this range:
  - **The Celebrity Investment Video** (`scam`, intro) — the canonical fabricated
    crypto/AI scam; the learner practices appropriate rejection.
  - **The Deepfake Money Expert Ad** (`scam`, core) — a real-world-patterned ad that
    borrows a trusted public figure's face and escalates to a private phone call;
    teaches separating "a trusted face" from "an accountable offer."
  - **The AI Fact-Check That Was Wrong** (`authentic`, advanced) — a case where a
    *confident AI debunk* is itself the misinformation, and independent geolocation,
    satellite imagery, and reporting confirm the original image is **real**. The
    recommended outcome is *not* to share the AI verdict; the reward message is
    "You did not outsource judgment to a confident machine."
- The Practice page states the intent directly: more authentic-content and
  decontextualized-footage cases are coming "so you practice trusting real content
  too, not just doubting."

The advanced case is pedagogically pointed: it inoculates against a *newer* failure
mode — over-trusting a fluent, confident AI assistant as if its certainty were
evidence. The `Now Reflect` rationale ("feeling sure when the evidence doesn't
support it") applies symmetrically to false *acceptance* and false *dismissal*.

---

## 8. The case-file as a realistic, structured artifact

Each case is authored JSON conforming to the `CaseFile` type, and the structure
itself is pedagogically loaded. A case reconstructs a believable social-media
environment, not a sterile quiz:

- A **post card** that mimics a real social UI: avatar, (un)verified badge,
  timestamp, body text, video thumbnail, an outbound link to a suspicious domain,
  and inflated engagement stats. Verisimilitude matters — the skill has to transfer
  to the real feed, so the practice environment must resemble one.
- **Comments** that model **manufactured social proof** — near-identical "I made
  $4,800!" testimonials — with one genuine skeptic ("Is this actually legit?"). The
  realistic skeptic models the desired behavior in-scene.
- **Highlighted phrases** in the post body (e.g. "limited-time," "guaranteed
  returns," "everyone is joining") that get visually marked *only during the Content
  step* once the learner engages — turning manipulative language into a teachable
  object.
- **Source findings** with concrete, plausible details (account age, brand-mimicking
  name, mismatched domain, bot-like comments).
- **Search results** carrying typed signals — `warning`, `absent` (no record),
  `unrelated` (circular, links back to the same signup page), and `confirm` — which
  render with distinct colors and icons. The `absent` and `unrelated` signals are
  the pedagogically interesting ones: they teach that "nobody independent is
  reporting this" and "the only corroboration loops back to the source" are
  *informative*, not neutral.

Because the engine renders any conforming case, the curriculum is **extensible by
content authors without touching code** — new scenarios are added as JSON and
registered in an index. This keeps the framework fixed while the examples can grow
and stay current.

---

## 9. The Reflection Journal: metacognition made tangible

Every run is saved (locally, via `localStorage` — no backend, no account, no
tracking) as a `ReflectionEntry`. The journal is not an afterthought; it is the
mechanism by which the abstract goal — *watch your own judgment change* — becomes
concrete and reviewable.

The saved artifact is deliberately organized as a **before/after narrative**:

- **"What I felt first"** — the pre-commitment reaction, feeling, and free-text note.
- **"What I noticed"** — the source, pressure, and outside-evidence signals selected.
- **"What changed my mind"** — the final thought and the *specific* evidence that
  shifted it.
- **"What I'll do next"** — the chosen actions.

The journal entry closes with the same refrain ("You slowed down when the post
wanted speed. That is the habit."), reinforcing that the *process*, not the verdict,
is the win. Entries can be **exported to Markdown or printed/saved as PDF**, which
turns a private exercise into something a learner can submit, share with an
educator, or keep as a record. Capturing the gut reaction *before* and the
considered judgment *after* — and letting the learner literally re-read the gap —
is the metacognitive heart of the design.

A subtle honesty feature: entries are upserted on *every* step advance with
`completed: false`, and only marked `completed: true` when the learner reaches the
end. The journal distinguishes "in progress" from "complete," so partial runs are
preserved rather than lost.

---

## 10. Amito and the multi-sensory mnemonic system

Amito is a deliberate affective-design choice. Synthetic media and misinformation
are intimidating subjects; an approachable guide *"makes the process approachable —
guiding you through each step without ever making you feel foolish for trusting what
looked real."* Reducing shame is functional, not decorative: learners who feel
judged disengage, and the people most in need of this skill are precisely those who
have already been fooled.

The character is also a **mnemonic device built across multiple senses**:

- Each step has a **dedicated color** (STOP pink-red, Source cyan, Content green,
  Alignment lilac, Now Reflect orange). These colors are used consistently across
  the step badges, the progress tracker, the resource cards, the journal section
  tabs, and Amito's own "cues."
- Each step maps to a **distinct Amito pose and a body cue** (e.g. "Pink-red torso
  glow," "Cyan right cuff," "Lilac head logo"), documented on the Meet Amito page.
  *"Each STOP&SCAN step has a matching Amito cue, so the framework becomes something
  you can see and feel."*
- A persistent **step-progress tracker** shows the `STOP · S · C · A · N` path,
  coloring completed and active steps, so the learner always knows where they are
  in the sequence and the sequence is rehearsed every run.

Pairing a verbal mnemonic (`STOP&SCAN`) with consistent color and character cues
gives multiple, reinforcing retrieval routes to the same five-move procedure —
which is exactly what you want for a skill meant to be recalled *away* from the
website, in the moment a real post demands a decision.

A clean conceptual boundary is maintained throughout: *"Amito carries the
experience — but STOP&SCAN is the habit."* The character is the scaffold; the
framework is the thing that must remain after the scaffold is gone.

---

## 11. Supplementary comic strips

The site hosts a **comics** section — visual, panel-by-panel stories that
complement the framework — developed with cartoonist and educator Julian Lawrence
and his students at Teesside University. These are an additional, lower-friction
on-ramp to the same ideas (narrative and visual literacy rather than interactive
drill), reflecting an awareness that different learners engage through different
media. Comics are added as PDFs registered in a catalog and rendered in-browser.

---

## 12. Audience, framing, and the "no-backend" stance

**Primary audience:** young adults and adolescents (16–25) in educational contexts —
the group forming epistemic habits right now, in the most challenging information
environment in history. **Secondary audience:** general adults making high-stakes
decisions from social media in financial, health, electoral, and legal domains.

The project explicitly frames itself against **UN SDG 4 (Quality Education)** and
**UN SDG 16 (Peace, Justice & Strong Institutions)**, positioning media literacy as
both an educational and a civic-resilience goal.

The **no-backend architecture** (React + Vite + TypeScript, React Router, Tailwind,
`localStorage` for the journal, static JSON for content, deployed as a Cloudflare
static-assets Worker) is itself aligned with the values of the project: nothing the
learner does is sent to a server, there are no accounts, and there is no tracking.
For a tool about trust and discernment, *being trustworthy and private by
construction* is consistent with the message.

---

## 13. Summary of the pedagogical commitments

| Commitment | How it shows up in the product |
|---|---|
| Fix the reasoner, not the artifact | No "spot the AI glitch" tasks; every question targets source, emotion, or independent corroboration |
| Pre-commitment before investigation | STOP step records gut reaction + feeling before any evidence is shown |
| Scaffolding then fading | Learn mode shows signals + immediate feedback; Practice mode hides them and delays feedback |
| Uncertainty is a valid outcome | Explicit "I need more evidence" option and "not decided yet" action; reward affirms suspended judgment |
| Inoculation / prebunking | "Why it works" panels teach the *mechanism* of each manipulation tactic |
| Calibration in both directions | Case schema and library include authentic content, not only scams |
| Metacognition made tangible | Before/after journal entries, exportable, distinguishing in-progress from complete |
| Multi-sensory, shame-free mnemonic | Amito's poses, per-step colors/cues, persistent progress tracker, approachable guide |
| Trustworthy by construction | No backend, no accounts, no tracking; local-only journal |

The throughline: **STOP&SCAN trains a durable, transferable habit of calibrated
trust.** Every interaction is engineered so that success means *slowing down and
matching your confidence to your evidence* — a behavior that stays correct no matter
how good the fakes get.
