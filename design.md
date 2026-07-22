---
name: STOP&SCAN Brand
theme: light
colors:
  primary: "#004cd7"
  primary-container: "#2665fd"
  on-primary: "#ffffff"
  secondary: "#feae39"
  fuel-yellow: "#f3a530"
  background-paper: "#fbf8f2"
  surface-cream: "#f6f0e4"
  on-surface: "#1f1635"
  on-surface-variant: "#434655"
  inverse-surface: "#342b4b"
  inverse-on-surface: "#f6edff"
  lilac-accent: "#b197fc"
  stop-red: "#ef4a6b"
  source-cyan: "#22b8cf"
  content-green: "#37b24d"
  alignment: "#ea80dc"
  reflect-orange: "#ff922b"
  turquoise: "#6ae4e7"
  pastel-green: "#82e896"
  flamingo: "#f36734"
  welcome-blue: "#4dabf7"
  error: "#ba1a1a"
typography:
  display:
    fontFamily: Outfit
    weights: [600, 700]
  body:
    fontFamily: Nunito Sans
    weights: [400, 600, 700]
  hand:
    fontFamily: Gochi Hand
    weights: [400]
  label:
    fontFamily: Outfit
    fontSize: 12px
    fontWeight: 600
    letterSpacing: 0.05em
    textTransform: uppercase
rounded:
  sm: 4px
  md: 8px
  xl: 12px
  xxl: 24px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
---

# STOP&SCAN Design Guidelines

Reusable brand and visual guidelines for websites, slides, posters, social, and other STOP&SCAN materials. Source of truth: the live site (`tailwind.config.js`, `src/index.css`, `/styleguide`).

## Brand essence

**STOP&SCAN** is the product brand — a five-step habit for digital resilience and trust calibration.  
**Amito** is the friendly guide/mascot who carries the experience. Amito is not the brand name.

**Core promise**

> STOP&SCAN helps you pause before you trust, scan before you share, and reflect before you act. Amito is your friendly guide through scaffolded digital sensemaking.

**Positioning**

- Targets human cognition, not detection tech
- Scaffolded sensemaking for trust calibration
- Uncertainty is valid: “I don’t know yet” is a complete answer
- Friendly, low-judgment, educational — never alarmist or punitive

**Tagline patterns**

| Context | Line |
| --- | --- |
| Default site | Guided by Amito |
| Hero / marketing | Empowering Digital Resilience |
| Habit framing | Pause before you trust. Scan before you share. Reflect before you act. |
| Project framing | Scaffolded sensemaking for trust calibration |

---

## Naming & voice

### Naming

- Prefer **STOP&SCAN** (ampersand, no spaces) in titles, logos, and primary brand mentions
- Acceptable longer form in body copy: **Stop & Scan**
- Framework steps (user-facing): **Stop**, **Source**, **Content**, **Alignment**, **Now Reflect**
- SCAN acronym letters: **S**ource · **C**ontent · **A**lignment · **N**ow Reflect (Stop is the pre-commitment step before SCAN)
- Mascot: **Amito** (never “Stop&Scan bot” as the product name)

### Voice & tone

| Do | Don’t |
| --- | --- |
| Warm, clear, encouraging | Cynical, scolding, “gotcha” |
| Short sentences; concrete actions | Jargon-heavy academic prose |
| Validate uncertainty | Demand binary true/false certainty |
| Speak as a guide beside the learner | Speak as an authority that “detects fakes” |
| Use Amito for coaching moments | Overuse Amito so it outranks STOP&SCAN |

**Sample microcopy**

- “Hi! I’m Amito. Let’s learn how to spot tricky content together!”
- “I don’t know yet is a complete answer!”
- “You slowed down when the post wanted speed. That is the habit.”

---

## Logo & marks

| Asset | Path | Use |
| --- | --- | --- |
| Primary logo (open-hand stop) | `/logo.png` | Headers, heroes, lockups |
| App / framework Stop icon | `/icon-512.png`, `/icon-192.png` | Favicon, PWA, app tiles |
| Favicon | `/favicon.svg` | Browser tab |
| Default social / OG | `/og-default.png` | Link previews |

### Logo rules

1. **Light backgrounds** — full-color logo on paper/cream (`#fbf8f2`, `#f6f0e4`, white).
2. **Dark backgrounds** — invert to white (CSS: `brightness-0 invert`, or a white mono version). Used on inverse surface `#342b4b`.
3. **Clear space** — keep at least ~25% of the logo’s width free around it.
4. **Minimum size** — ~32×32px digital; for print, keep the hand mark readable at arm’s length.
5. **Do not** stretch, rotate, recolor arbitrarily, add drop shadows/strokes, or place on busy photos without a solid/soft panel.
6. **Brand first** — on promotional surfaces, STOP&SCAN (logo or wordmark) should be a hero-level signal; headlines should not overpower the brand.

### Wordmark

- Display font: **Outfit**, semi-bold / bold
- Preferred casing: `STOP&SCAN`
- Footer-style lockup: logo mark + “Stop & Scan” in Outfit

---

## Color system

Use semantic tokens. Prefer names over hard-coded hex in product UI; hex is fine in slides/print when tokens aren’t available.

### Brand core

| Token | Hex | Role |
| --- | --- | --- |
| `primary` | `#004cd7` | Primary CTAs, active nav, key interactive |
| `primary-container` | `#2665fd` | Filled panels, strong brand blocks |
| `on-primary` | `#ffffff` | Text/icons on primary |
| `secondary-container` / fuel yellow | `#feae39` / `#f3a530` | Warm accent, theme color, energy |
| `lilac-accent` | `#b197fc` | Soft highlight, selected options, Amito aura |
| `welcome-blue` | `#4dabf7` | Friendly supporting blue in glows/heroes |

### Surfaces & text (light theme)

| Token | Hex | Role |
| --- | --- | --- |
| `background-paper` | `#fbf8f2` | Default page background |
| `surface-cream` | `#f6f0e4` | Soft section alt, ghost hover |
| `surface` / `background` | `#fef7ff` | Light lilac-tinted surface |
| `surface-container-low` | `#f8f1ff` | Alternating section bands |
| `surface-container` | `#f3eaff` | Contained panels |
| `surface-container-lowest` | `#ffffff` | Cards on tinted grounds |
| `on-surface` | `#1f1635` | Primary text (ink) |
| `on-surface-variant` | `#434655` | Secondary text |
| `outline` | `#737687` | Strong borders / muted footer text |
| `outline-variant` | `#c3c5d8` | Hairline borders, chip borders |
| `inverse-surface` | `#342b4b` | Footer / dark panels |
| `inverse-on-surface` | `#f6edff` | Text on dark panels |

### Framework step colors (always paired with the step)

| Step | Token | Hex | Amito cue |
| --- | --- | --- | --- |
| Stop | `stop-red` | `#ef4a6b` | Pink-red torso glow |
| Source | `source-cyan` | `#22b8cf` | Cyan right cuff |
| Content | `content-green` | `#37b24d` | Green left cuff |
| Alignment | `alignment` | `#ea80dc` | Lilac head logo |
| Now Reflect | `reflect-orange` | `#ff922b` | Orange torso glow |

### Step card backgrounds (icon tiles)

| Step | Background |
| --- | --- |
| Stop | `#f3a530` (fuel yellow) |
| Source | `#6ae4e7` (turquoise) |
| Content | `#82e896` (pastel green) |
| Alignment | `#ea80dc` (lavender) |
| Reflect | `#f3a530` (fuel yellow) |

### Supporting accents

| Name | Hex | Notes |
| --- | --- | --- |
| Turquoise | `#6ae4e7` | Source tiles, playful UI |
| Pastel green | `#82e896` | Content tiles, success-adjacent |
| Flamingo | `#f36734` | Occasional warm accent |
| Error | `#ba1a1a` | Validation / destructive only |

### Color usage rules

- **Primary sparingly** — one clear primary action per view.
- **Framework colors are semantic** — do not reassign Stop red to “error” or Content green to generic success outside the framework story.
- **Default theme is light** — paper/cream + soft lilac surfaces. Dark inverse is for footers/panels, not the default site chrome.
- **Contrast** — body text on paper/cream should stay ink `#1f1635` or variant `#434655`. Aim for accessible contrast (≈4.5:1 for body).
- **Hero wash** — `linear-gradient(180deg, #dce1ff 0%, #fbf8f2 100%)`.

---

## Typography

| Role | Family | Weight | Size / line | Notes |
| --- | --- | --- | --- | --- |
| Display XL | Outfit | 700 | 48 / 56, -0.02em | Page heroes, framework title |
| Display LG | Outfit | 600 | 32 / 40, -0.01em | Section titles |
| Headline MD | Outfit | 600 | 24 / 32 | Cards, subheads |
| Body LG | Nunito Sans | 400 | 18 / 28 | Lead paragraphs |
| Body MD | Nunito Sans | 400 | 16 / 24 | Default body |
| Body SM | Nunito Sans | 400 | 14 / 20 | Captions, meta |
| Label MD | Outfit | 600 | 12 / 16, +0.05em | Uppercase section/nav labels |
| Handwritten | Gochi Hand | 400 | 24 / 32 | Amito speech only |

### Type rules

- Headlines → **Outfit**; body → **Nunito Sans**; Amito dialogue → **Gochi Hand**.
- Labels and nav: uppercase Outfit with wide tracking.
- Avoid default stacks (Inter, Roboto, Arial, system-only) when brand fonts are available.
- Fallback stack: `Outfit/Nunito Sans/Gochi Hand, system-ui, sans-serif`.
- Keep line lengths comfortable (~45–75 characters for body on web).

---

## Layout, spacing & shape

### Spacing scale

`4 · 8 · 16 · 24 · 32 · 48` px (`xs` → `xxl`)

- Mobile page margin: **20px**
- Desktop page margin: **40px**
- Content max width: **1152px**
- Gutter: **16px**

### Shape

| Token | Value | Use |
| --- | --- | --- |
| `rounded-xxl` | 24px | Cards, panels, speech-adjacent surfaces |
| Pill / `rounded-full` | fully round | Buttons, chips, nav CTAs |
| Soft radius | 8–12px | Smaller controls, option rows |

### Elevation

| Token | Value | Use |
| --- | --- | --- |
| `shadow-soft` | `0 4px 20px -2px rgba(36, 27, 58, 0.08)` | Cards, bubbles |
| `shadow-card` | `0 10px 30px -12px rgba(36, 27, 58, 0.15)` | Elevated panels |
| Hairline | `1px solid rgba(31, 22, 53, 0.1)` | Quiet borders |

### Atmosphere (web)

- **Paper texture** — subtle 24px dot grid (`radial-gradient` ink at ~2% opacity) on page chrome
- **Aura glow** — soft lilac bloom `0 0 40px rgba(177, 151, 252, 0.15)` behind Amito spotlight cards
- Prefer soft fills + hairlines over heavy chrome; roomy, low visual noise

---

## Components (product UI patterns)

### Buttons (pill-shaped)

| Variant | Look | Interaction |
| --- | --- | --- |
| Primary | Filled `#004cd7`, white text | Hover brighten; press `scale(0.95)` |
| Accent | 2px primary outline | Hover fills primary |
| Ghost | White + soft border | Hover cream `#f6f0e4` |
| Inverse | `#342b4b` fill, lilac-tint text | Hover opacity 90% |
| Disabled | 50% opacity + not-allowed cursor | — |

Padding rhythm: roughly `48×16` (primary) or `32×16` (accent/ghost). Font: Outfit semibold.

### Cards & chips

- Cards: white/`surface-container-lowest`, 24px radius, soft shadow, light border
- Chips: pill, white fill, outline-variant border, optional leading icon
- Lesson options: white tiles; hover lilac border; selected = lilac border + 5% lilac fill

### Navigation

- Fixed header on paper/90% blur
- Nav labels: Outfit label MD, uppercase
- Active: primary text + 2px primary underline
- Accent header CTA (“My Journal”): primary pill

### Speech bubbles

- White bubble + soft shadow
- Copy in Gochi Hand or short Nunito; keep short coaching lines
- Tail variants: left or bottom toward Amito

---

## Framework & Amito

### Five steps (order is fixed)

1. **STOP** — Pause and register your gut reaction.
2. **Source** — Who is really behind this?
3. **Content** — Does what you see actually hold up?
4. **Alignment** — Does everything fit together?
5. **Now Reflect** — Has your judgment changed — and why?

Each step has: letter/title, tagline, accent hex, step icon (`/amito/icons/{step}.png`), and a matching Amito pose.

### Amito poses (asset library)

| Pose | Asset (prefer `.webp` when available) | When to use |
| --- | --- | --- |
| Greeting | `/amito/home-waving.png` | Welcome, Meet Amito, Learn entry |
| Stop | `/amito/pose-stop.png` | Stop step |
| Source | `/amito/pose-source.png` | Source step |
| Content | `/amito/pose-content.png` | Content step |
| Alignment | `/amito/pose-analyze.png` | Alignment step |
| Reflect | `/amito/pose-reflect.png` | Reflect / journal |
| Reward | `/amito/pose-heart.png` | Completion, encouragement |
| Comics / Project | `/amito/pose-comics.png`, `/amito/pose-project.png` | Section-specific |

### Amito rules

- Amito **guides**; STOP&SCAN **is the habit** (“Amito carries the experience — but STOP&SCAN is the habit.”)
- Match pose + glow color to the active framework step
- Optional gentle float animation for spotlight moments; respect `prefers-reduced-motion`
- Don’t place competing badges/stickers on top of Amito art
- Don’t recolor Amito’s step cues inconsistently with the framework table

---

## Motion

Intentional, calm presence — not noise.

| Motion | Spec | Use |
| --- | --- | --- |
| Float | 4s ease-in-out, ±12px Y | Amito spotlight |
| Glow pulse | 2.4s ease-in-out | Soft attention on glows |
| Press | `scale(0.95)` ~150ms | Buttons / options |
| Hover lift | slight scale (~1.02–1.05) | Framework tiles |

Always provide a reduced-motion fallback (static pose, solid focus ring instead of pulsing).

---

## Applying the system outside the website

### Websites / product UI

- Start from tokens in this file / `tailwind.config.js`
- Light paper base, primary for one main CTA, framework colors only in step contexts
- Live reference: `/styleguide`

### Slides (Keynote, Google Slides, PowerPoint)

- Master background: `#fbf8f2` or white; optional soft blue→cream hero on title slide
- Title: Outfit Bold 32–48pt; body: Nunito Sans 16–20pt
- Title slide: logo (hero-level) + one headline + one short line + optional Amito greeting
- One idea per slide; use step accent color only when discussing that step
- Dark closing slide optional: `#342b4b` with inverted logo + lilac-tint text
- Avoid dense dashboards, pill clusters, and multi-stat hero slides

### Social / posters / one-pagers

- Lead with STOP&SCAN mark + short habit line
- Full-bleed soft gradient or paper field; Amito as the character anchor (not a tiny corner sticker)
- Keep first viewport/frame sparse: brand, one message, one CTA or QR if needed
- Theme / browser color reference: `#f3a530`

### Print

- Convert brand blues/pinks in CMYK proofs; keep ink `#1f1635` for body
- Prefer solid fills over heavy gradients at small sizes
- Maintain logo clear space; don’t place the mark over photography without a panel

---

## Do’s and don’ts

**Do**

- Lead with STOP&SCAN; let Amito support
- Use Outfit / Nunito Sans / Gochi Hand as specified
- Keep layouts roomy, friendly, and low-noise
- Treat “I don’t know yet” as a valid outcome in copy and UX
- Pair each framework step with its color, icon, and Amito cue
- Use primary blue for the single most important action

**Don’t**

- Present STOP&SCAN as an automated fake-news detector
- Default to dark mode, purple-glow tech tropes, or generic Inter/Roboto UI
- Mix sharp and pill radii arbitrarily in one composition
- Recolor framework step hues for unrelated UI states
- Overcrowd the first screen/slide with stats, schedules, or promo chips
- Let headlines or decorative UI overpower the brand mark

---

## Quick reference CSS variables

```css
:root {
  --ss-primary: #004cd7;
  --ss-primary-container: #2665fd;
  --ss-on-primary: #ffffff;
  --ss-paper: #fbf8f2;
  --ss-cream: #f6f0e4;
  --ss-ink: #1f1635;
  --ss-ink-muted: #434655;
  --ss-inverse: #342b4b;
  --ss-lilac: #b197fc;
  --ss-fuel: #f3a530;
  --ss-stop: #ef4a6b;
  --ss-source: #22b8cf;
  --ss-content: #37b24d;
  --ss-alignment: #ea80dc;
  --ss-reflect: #ff922b;
  --ss-radius-card: 24px;
  --ss-font-display: "Outfit", system-ui, sans-serif;
  --ss-font-body: "Nunito Sans", "Nunito", system-ui, sans-serif;
  --ss-font-hand: "Gochi Hand", cursive;
}
```

---

## Related files in this repo

| File | What it defines |
| --- | --- |
| `tailwind.config.js` | Color, type, spacing, shadow tokens |
| `src/index.css` | Component classes, hero gradient, paper texture |
| `src/components/views/Styleguide.tsx` | Interactive visual reference (`/styleguide`) |
| `src/lib/framework.ts` | Step metadata, cues, hex accents |
| `src/lib/assets.ts` | Logo, Amito poses, step icons |
| `src/lib/seo.ts` | Brand name, tagline, default description |
