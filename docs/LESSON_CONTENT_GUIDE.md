# STOP&SCAN Lesson Content Guide

Instructions for contributors creating **Learn** and **Practice** lesson content.

---

## What you're building

Every **Learn** and **Practice** lesson is built from one **case file**: a realistic social post plus evidence the learner walks through using the **STOP&SCAN** framework:

1. **STOP** — gut reaction before checking
2. **SOURCE** — who made this, and can you trace it?
3. **CONTENT** — what is the post trying to make you feel or do?
4. **ALIGNMENT** — what do independent sources say?
5. **NOW REFLECT** — what changed, and what will you do next?

**Learn mode** = guided walkthrough with Amito explaining as you go.  
**Practice mode** = same case, but fewer cues; learners use **Show hint** if stuck.

Both modes use the **same content**. You write one case; the team decides whether it appears in Learn, Practice, or both.

---

## Before you start — decide these things

| Field | Options | Notes |
|-------|---------|-------|
| **Title** | Plain language | e.g. "The Celebrity Investment Video" |
| **Kind** | `scam` · `authentic` · `decontextualized` | What type of content is being evaluated |
| **Difficulty** | `intro` · `core` · `advanced` | Shown on Practice library cards |
| **Estimated time** | Minutes (e.g. 8–10) | How long a careful learner might take |
| **One-sentence summary** | For library cards | Hook, no spoilers |

**Learning goal:** What habit should someone practice? (e.g. "Don't trust a famous face without checking official channels.")

---

## Part 1 — The social post (always required)

This is the fake/real post the learner evaluates. It stays visible on screen through all five steps.

### Post metadata

| What to provide | Example |
|-----------------|---------|
| Account name | `Future Wealth AI` |
| Handle | `@futurewealth.ai_official` |
| Verified? | `yes` / `no` (most scam cases = no) |
| Time posted | `2h`, `Sponsored`, `41m` |
| Avatar color | Hex color for the letter avatar, e.g. `#22b8cf` |

### Post text (`body`)

Write the full post copy as it would appear on social media — emojis, caps, links in text, etc.

**Example:**

> 🚀 BREAKING: Tech billionaire reveals the AI platform banks don't want you to know about…

### Media (image or video post)

Every case currently shows a **media area** under the post text.

**Provide all of the following:**

| Item | Required? | Details |
|------|-----------|---------|
| **Media type** | Yes | `image` · `video` · `audio` (describe if audio-only) |
| **Media file or link** | Yes | **Image:** PNG/JPG, 16:9 (e.g. 1280×720). **Video:** direct MP4 link or YouTube/Vimeo URL. **Audio:** MP3/WAV link + transcript if needed |
| **Media caption** | Yes | Short label under the media, e.g. `▶ Video: "I'm giving back to the people" — AI investment reveal` or `Image: rows of new graves described as being in Minab` |
| **Alt text** (images) | Recommended | One sentence describing what's in the image for accessibility |

> **Note:** The app currently uses a shared placeholder for post media. Contributors should still deliver the real file/URL — the dev team attaches it when building the case.

### Link in post (if any)

| Field | Example |
|-------|---------|
| Link label (display text) | `future-wealth-ai-access.net/join` |
| Actual URL | Real URL if safe to include, or describe the domain |

### Engagement stats (cosmetic but helps realism)

| Likes | Comments | Shares |
|-------|----------|--------|
| `48.2K` | `3,914` | `12.7K` |

### Highlight phrases (for CONTENT step)

List **3–6 exact phrases** from the post body that show manipulation pressure. These get highlighted when learners reach Step 3.

**Examples:** `limited-time`, `guaranteed returns`, `Share this proof`, `AI check says`

Phrases must match the post text **exactly** (case-insensitive).

---

## Part 2 — Comments (recommended, 3–6)

Fake or realistic replies under the post. Used in the **SOURCE** step.

For each comment:

| Field | Example |
|-------|---------|
| **Name** | `Dana R.` |
| **Comment text** | `I made $4,800 in my first day!! Thank you 🙏` |
| **Suspicious?** | `yes` / `no` |

- Mark **suspicious** comments that manufacture credibility (identical success stories, urgency, "case closed").
- Include at least **one skeptical** comment for realism.

In **Learn**, suspicious comments are flagged immediately. In **Practice**, flags appear after **Show hint**.

---

## Part 3 — Step 1: STOP (gut check)

### Amito message (`stop.message`)

2–4 sentences. Explain that STOP is about noticing your **first reaction**, not deciding fake vs real yet.

**Example:**

> STOP is not about deciding if something is fake. It's about noticing what the content is doing to you before you act. You just named your gut reaction — that's your pre-commitment. We'll come back to it at the end.

### Gut-check options (learners pick one of each)

**Reaction options** (provide 4–6):

- This seems real
- This seems suspicious
- I'm not sure
- I want to click
- I want to share it
- I want to check independent reporting

**Feeling options** (provide 5–8 single words):

- excited, anxious, curious, pressured, hopeful, skeptical, confused, angry, uncertain, concerned

Learners also write a short free-text note: *"Before checking, I felt…"* — no content needed from you.

---

## Part 4 — Step 2: SOURCE

### Amito message (`source.message`)

1–2 sentences prompting them to trace **who created** the content.

### Source findings (provide 3–5)

Evidence cards about the **account/source**, not the claim itself.

| Icon keyword | Use for |
|--------------|---------|
| `calendar` | Account age, timing |
| `badge` | Verification, impersonation, brand mimicry |
| `link` | Suspicious domains, redirects |
| `chat` | Comment patterns, bot-like replies |

Each finding needs:

- **Label** — short headline (e.g. `Account created 6 days ago`)
- **Detail** — 1–2 sentences explaining why it matters

### Source question (multiple choice)

| Field | Guidance |
|-------|----------|
| **Prompt** | e.g. `Which source signal concerns you most?` |
| **Single or multi?** | Usually **single** for source |
| **Options** | 4–5 choices; each needs a short **id** (slug) and **label** |
| **Flagged options** | Mark options that are valid concerns with `flag: yes` — used for feedback/hints |
| **Insight** | 1–3 sentences shown after **Check answer** (Learn) or **Show hint** (Practice) |

The app automatically adds: *"I need more evidence before deciding"* — you don't write that.

---

## Part 5 — Step 3: CONTENT

### Amito message (`content.message`)

Prompt learners to inspect **what the post is trying to make them feel or do**. Mention highlights if useful.

### Content question (usually **multi-select**)

| Field | Guidance |
|-------|----------|
| **Prompt** | e.g. `What pressure signals do you see?` |
| **Multi?** | Usually **yes** — several tactics can apply |
| **Options** | Pressure types: urgency, authority mimicry, unrealistic promises, social proof, financial pressure, fear, outrage, etc. |
| **Flagged options** | Mark tactics actually present in **this** post |
| **Insight** | Explain why emotional pressure is a cue to slow down, not speed up |

Ensure options align with your **highlight phrases** from Part 1.

---

## Part 6 — Step 4: ALIGNMENT

### Amito message (`alignment.message`)

Prompt learners to look **beyond this one post** — official channels, fact-checkers, warnings, independent reporting.

### Search / evidence results (provide 3–5)

Simulated "what you'd find if you searched." Each result:

| Field | Example |
|-------|---------|
| **Source name** | `Official company page`, `Consumer protection agency`, `Independent fact-check` |
| **Headline** | `No such investment platform announced` |
| **Snippet** | 1–2 sentence summary |
| **Signal type** | See below |

**Signal types** (pick one per result):

| Signal | Meaning | Example |
|--------|---------|---------|
| `confirm` | Independent support for the claim | Verified announcement exists |
| `warning` | Active scam/misinfo warning | "Celebrity deepfake investment scams" |
| `absent` | Trusted sources say nothing / no record | No official mention |
| `unrelated` | Circular or weak evidence | Blog that links back to the same signup page |

### Alignment question

Usually **single-select**. Options should include:

- Claim is independently confirmed
- Claim is **not** confirmed
- Active scam warnings exist
- More evidence needed before acting

Flag the options that fit **your** case. Write an **insight** about why isolation from trusted sources is a red flag (or why authentic content aligns).

---

## Part 7 — Step 5: NOW REFLECT

### Amito message (`reflect.message`)

Ask learners to compare their **first reaction** to what they found. Reinforce that *"I don't know yet"* is valid.

### Next actions (provide 4–6)

What should a careful person do?

| Field | Example |
|-------|---------|
| **id** | `donotclick` |
| **label** | `Do not click` |
| **Recommended?** | `yes` for actions you want to teach |

**Examples:** Do not click · Do not share · Verify through official channels · Report the post · Wait — I'm not decided yet

### Recommended outcome (one sentence)

Summary of the best path:

> Do not click. Do not share. Verify through official channels.

### Reward message (one sentence)

Positive closing from Amito — focus on the **habit**, not "winning":

> You slowed down when the post wanted speed. That is the habit.

---

## Learn vs Practice — what authors need to know

| | **Learn** | **Practice** |
|---|-----------|--------------|
| **Amito guidance** | Uses your custom messages for each step | Generic prompts on steps 2–4 |
| **Source findings & comments** | Full details shown upfront | Details hidden until hint |
| **Search results** | Signal labels shown upfront | Hidden until hint |
| **Feedback button** | "Check my answer" | "Show hint" |
| **Reflect step** | Shows recommended actions while choosing | Review block compares picks vs flagged options |

**Write messages and insights for Learn-quality guidance** — Practice reuses the same evidence and questions with less hand-holding.

---

## Hints & feedback — author checklist

For **each** question (Source, Content, Alignment):

- [ ] Clear **prompt**
- [ ] 4–6 **options** with short ids
- [ ] Correct/strategic options marked **`flag: yes`**
- [ ] **`insight`** written (this is the hint/feedback text)
- [ ] Insight teaches the **framework habit**, not just "you're wrong"

**Flagging rules:**

- `flag: yes` = "Amito would double-check this / this is a valid signal in this case"
- Unflagged options = plausible but not the main teaching point, or wrong for this case
- "I need more evidence before deciding" is always available — good outcomes can include choosing that

---

## Media delivery checklist

When your case includes image/video/audio, send:

```
Case slug: my-case-name
Media type: video
File or URL: https://… or attach my-case-media.mp4
Caption: ▶ Video: "…"
Alt text: …
Aspect ratio: 16:9 preferred
Rights: [confirm you have permission to use]
```

For **image posts**, send the image file + caption (no video URL needed).  
For **video posts**, send URL or MP4 + caption; optional thumbnail JPG.  
For **text-only posts**, set caption to empty or omit media — the team may hide the media block.

---

## Submission template

Copy and fill in for each new case:

```
CASE OVERVIEW
- Title:
- Slug (lowercase-hyphens):
- Kind: scam / authentic / decontextualized
- Difficulty: intro / core / advanced
- Est. minutes:
- Summary (1 sentence):
- Learning goal:

THE POST
- Account / handle / verified / timeAgo / avatar color:
- Body text:
- Media type + file/URL + caption + alt text:
- Link label + URL:
- Likes / comments / shares:
- Highlight phrases (exact matches):

COMMENTS (name | text | suspicious y/n)
1.
2.
3.

STOP
- Amito message:
- Reaction options:
- Feeling options:

SOURCE
- Amito message:
- Findings (icon | label | detail):
- Question prompt / single or multi:
- Options (id | label | flag y/n):
- Insight:

CONTENT
- Amito message:
- Question prompt / single or multi:
- Options (id | label | flag y/n):
- Insight:

ALIGNMENT
- Amito message:
- Results (source | headline | snippet | signal):
- Question prompt / single or multi:
- Options (id | label | flag y/n):
- Insight:

REFLECT
- Amito message:
- Next actions (id | label | recommended y/n):
- Recommended outcome:
- Reward message:
```

---

## Reference examples in the repo

Completed cases live in `src/data/cases/`:

| Slug | Type | Notes |
|------|------|-------|
| `celebrity-investment-scam` | intro scam | Featured Learn demo case; video-style post |
| `martin-lewis-deepfake-ad` | core scam | Sponsored deepfake ad |
| `minab-ai-fact-check` | advanced authentic | AI overconfidence / authentic content |

---

## What the dev team handles

- Building the JSON case file from your submission
- Uploading media to `public/` and wiring per-case images/videos
- Registering the case in the Practice library
- Assigning a case to the Learn guided lesson

---

## Technical reference (for developers)

Case files conform to the `CaseFile` type in `src/lib/caseTypes.ts` and are registered in `src/data/cases/index.ts`. The lesson UI is rendered by `src/components/lesson/LessonEngine.tsx`.
