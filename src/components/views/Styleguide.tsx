import Amito from "../Amito";
import Icon from "../ui/Icon";
import { HeroBadge, PageHero, SpeechBubble } from "../ui/PageSections";
import {
  AMITO_IMAGES,
  FRAMEWORK_STEP_IMAGES,
  ICON_URL,
  LOGO_URL,
} from "../../lib/assets";
import { STEPS } from "../../lib/framework";

type ColorToken = { name: string; token: string; hex: string };

const BRAND_COLORS: ColorToken[] = [
  { name: "Primary", token: "primary", hex: "#004cd7" },
  { name: "Primary Container", token: "primary-container", hex: "#2665fd" },
  { name: "On Primary", token: "on-primary", hex: "#ffffff" },
  { name: "Inverse Surface", token: "inverse-surface", hex: "#342b4b" },
  { name: "Inverse On Surface", token: "inverse-on-surface", hex: "#f6edff" },
  { name: "Background Paper", token: "background-paper", hex: "#fbf8f2" },
  { name: "Surface Cream", token: "surface-cream", hex: "#f6f0e4" },
  { name: "Lilac Accent", token: "lilac-accent", hex: "#b197fc" },
];

const FRAMEWORK_COLORS: ColorToken[] = [
  { name: "Stop", token: "stop-red", hex: "#ef4a6b" },
  { name: "Source", token: "source-cyan", hex: "#22b8cf" },
  { name: "Content", token: "content-green", hex: "#37b24d" },
  { name: "Alignment", token: "alignment", hex: "#ea80dc" },
  { name: "Reflect", token: "reflect-orange", hex: "#ff922b" },
];

const ACCENT_COLORS: ColorToken[] = [
  { name: "Fuel Yellow", token: "fuel-yellow", hex: "#f3a530" },
  { name: "Turquoise", token: "turquoise", hex: "#6ae4e7" },
  { name: "Pastel Green", token: "pastel-green", hex: "#82e896" },
  { name: "Flamingo", token: "flamingo", hex: "#f36734" },
  { name: "Welcome Blue", token: "welcome-blue", hex: "#4dabf7" },
];

const SURFACE_COLORS: ColorToken[] = [
  { name: "On Surface", token: "on-surface", hex: "#1f1635" },
  { name: "On Surface Variant", token: "on-surface-variant", hex: "#434655" },
  { name: "Surface Container Lowest", token: "surface-container-lowest", hex: "#ffffff" },
  { name: "Surface Container Low", token: "surface-container-low", hex: "#f8f1ff" },
  { name: "Surface Container", token: "surface-container", hex: "#f3eaff" },
  { name: "Outline", token: "outline", hex: "#737687" },
  { name: "Outline Variant", token: "outline-variant", hex: "#c3c5d8" },
];

const TYPOGRAPHY_SAMPLES = [
  { label: "Display XL", className: "font-display text-display-xl", sample: "STOP&SCAN" },
  { label: "Display LG", className: "font-display text-display-lg", sample: "Trust calibration" },
  { label: "Headline MD", className: "font-display text-headline-md", sample: "Pause before you trust" },
  { label: "Body LG", className: "font-body text-body-lg", sample: "Scaffolded sensemaking for digital resilience." },
  { label: "Body MD", className: "font-body text-body-md", sample: "The default body text used across the site." },
  { label: "Body SM", className: "font-body text-body-sm", sample: "Supporting captions and metadata." },
  { label: "Label MD", className: "font-label-md text-label-md uppercase", sample: "Framework step" },
  { label: "Handwritten LG", className: "font-hand text-handwritten-lg", sample: "Amito says hello!" },
] as const;

const SPACING_TOKENS = [
  { token: "xs", value: "4px" },
  { token: "sm", value: "8px" },
  { token: "md", value: "16px" },
  { token: "lg", value: "24px" },
  { token: "xl", value: "32px" },
  { token: "xxl", value: "48px" },
  { token: "margin-mobile", value: "20px" },
  { token: "margin-desktop", value: "40px" },
] as const;

const AMITO_POSES = [
  { key: "greeting", label: "Greeting" },
  { key: "stop", label: "Stop" },
  { key: "source", label: "Source" },
  { key: "content", label: "Content" },
  { key: "alignment", label: "Alignment" },
  { key: "reflect", label: "Reflect" },
  { key: "reward", label: "Reward" },
  { key: "learn", label: "Learn" },
  { key: "comics", label: "Comics" },
  { key: "project", label: "Project" },
  { key: "postVideo", label: "Post Video" },
  { key: "comicCover", label: "Comic Cover" },
  { key: "videoTeaser", label: "Video Teaser" },
] as const;

const COMMON_ICONS = [
  "menu_book",
  "arrow_forward",
  "robot_2",
  "auto_awesome",
  "verified_user",
  "psychology",
  "explore",
  "bookmark",
  "share",
  "language",
  "linkedin",
] as const;

function SectionHeading({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description?: string;
}) {
  return (
    <div id={id} className="mb-xl scroll-mt-28">
      <h2 className="font-display text-display-lg text-on-surface">{title}</h2>
      {description && (
        <p className="mt-sm max-w-2xl text-body-md text-on-surface-variant">{description}</p>
      )}
      <div className="mt-md h-1 w-16 rounded-full bg-primary" />
    </div>
  );
}

function ColorSwatch({ color }: { color: ColorToken }) {
  const isLight = ["on-primary", "inverse-on-surface", "background-paper", "surface-cream", "surface-container-lowest", "surface-container-low", "surface-container"].includes(
    color.token,
  );

  return (
    <div className="overflow-hidden rounded-xl border border-on-surface/10 bg-white shadow-soft">
      <div className="h-20" style={{ backgroundColor: color.hex }} />
      <div className="space-y-1 p-md">
        <p className="font-display text-body-sm font-semibold text-on-surface">{color.name}</p>
        <p className="font-label-md text-label-md text-on-surface-variant">{color.hex}</p>
        <p className={`font-label-md text-label-md ${isLight ? "text-on-surface-variant" : "text-primary"}`}>
          bg-{color.token}
        </p>
      </div>
    </div>
  );
}

function ColorGrid({ colors }: { colors: ColorToken[] }) {
  return (
    <div className="grid grid-cols-2 gap-md sm:grid-cols-3 lg:grid-cols-4">
      {colors.map((color) => (
        <ColorSwatch key={`${color.token}-${color.name}`} color={color} />
      ))}
    </div>
  );
}

function StyleguideSection({
  id,
  title,
  description,
  children,
  className = "",
}: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`px-margin-mobile py-xxl md:px-margin-desktop ${className}`}>
      <div className="mx-auto max-w-container-max">
        <SectionHeading id={id} title={title} description={description} />
        {children}
      </div>
    </section>
  );
}

export default function Styleguide() {
  return (
    <div>
      <PageHero
        className="hero-gradient"
        badge={<HeroBadge icon="auto_awesome" label="Design System" />}
        title="Style Guide"
        description="Brand colors, typography, components, and assets for anyone building with or extending the STOP&SCAN visual language."
      >
        <nav className="mt-xl flex flex-wrap gap-sm">
          {[
            ["colors", "Colors"],
            ["typography", "Typography"],
            ["buttons", "Buttons"],
            ["components", "Components"],
            ["logo", "Logo"],
            ["framework-icons", "Step Icons"],
            ["amito", "Amito Poses"],
            ["effects", "Effects"],
          ].map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="chip transition-colors hover:border-primary hover:text-primary"
            >
              {label}
            </a>
          ))}
        </nav>
      </PageHero>

      <StyleguideSection
        id="colors"
        title="Color Palette"
        description="Semantic tokens defined in tailwind.config.js. Use Tailwind classes (e.g. bg-primary, text-stop-red) rather than hard-coded hex values."
        className="bg-background-paper"
      >
        <div className="space-y-xxl">
          <div>
            <h3 className="mb-lg font-display text-headline-md text-on-surface">Brand</h3>
            <ColorGrid colors={BRAND_COLORS} />
          </div>
          <div>
            <h3 className="mb-lg font-display text-headline-md text-on-surface">
              Framework Steps
            </h3>
            <ColorGrid colors={FRAMEWORK_COLORS} />
          </div>
          <div>
            <h3 className="mb-lg font-display text-headline-md text-on-surface">Accents</h3>
            <ColorGrid colors={ACCENT_COLORS} />
          </div>
          <div>
            <h3 className="mb-lg font-display text-headline-md text-on-surface">
              Surfaces & Text
            </h3>
            <ColorGrid colors={SURFACE_COLORS} />
          </div>
        </div>
      </StyleguideSection>

      <StyleguideSection
        id="typography"
        title="Typography"
        description="Outfit for display and labels, Nunito Sans for body copy, Gochi Hand for Amito's speech."
        className="bg-surface-container-low"
      >
        <div className="space-y-lg">
          {TYPOGRAPHY_SAMPLES.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-on-surface/10 bg-white p-lg shadow-soft"
            >
              <p className="mb-sm font-label-md text-label-md uppercase text-on-surface-variant">
                {item.label}
              </p>
              <p className={item.className}>{item.sample}</p>
              <p className="mt-sm font-label-md text-label-md text-primary">{item.className}</p>
            </div>
          ))}
        </div>

        <div className="mt-xxl">
          <h3 className="mb-lg font-display text-headline-md text-on-surface">Font Families</h3>
          <div className="grid gap-md md:grid-cols-3">
            <div className="card">
              <p className="font-label-md text-label-md text-on-surface-variant">font-display</p>
              <p className="mt-sm font-display text-headline-md">Outfit</p>
            </div>
            <div className="card">
              <p className="font-label-md text-label-md text-on-surface-variant">font-body</p>
              <p className="mt-sm font-body text-headline-md">Nunito Sans</p>
            </div>
            <div className="card">
              <p className="font-label-md text-label-md text-on-surface-variant">font-hand</p>
              <p className="mt-sm font-hand text-handwritten-lg">Gochi Hand</p>
            </div>
          </div>
        </div>
      </StyleguideSection>

      <StyleguideSection
        id="buttons"
        title="Buttons"
        description="Pill-shaped CTAs with active:scale-95 press feedback. Hover each button to preview its interaction state."
        className="bg-background-paper"
      >
        <div className="grid gap-xl md:grid-cols-2">
          <div className="card space-y-lg">
            <div>
              <p className="mb-md font-label-md text-label-md uppercase text-on-surface-variant">
                btn-primary
              </p>
              <button type="button" className="btn-primary">
                Primary action
              </button>
              <p className="mt-sm text-body-sm text-on-surface-variant">
                Filled CTA — hover:brightness-105
              </p>
            </div>
            <div>
              <p className="mb-md font-label-md text-label-md uppercase text-on-surface-variant">
                btn-accent
              </p>
              <button type="button" className="btn-accent">
                Secondary action
              </button>
              <p className="mt-sm text-body-sm text-on-surface-variant">
                Outlined — hover fills with primary
              </p>
            </div>
          </div>
          <div className="card space-y-lg">
            <div>
              <p className="mb-md font-label-md text-label-md uppercase text-on-surface-variant">
                btn-ghost
              </p>
              <button type="button" className="btn-ghost">
                Ghost action
              </button>
              <p className="mt-sm text-body-sm text-on-surface-variant">
                White with border — hover:bg-surface-cream
              </p>
            </div>
            <div>
              <p className="mb-md font-label-md text-label-md uppercase text-on-surface-variant">
                btn-inverse
              </p>
              <div className="rounded-xl bg-inverse-surface p-lg">
                <button type="button" className="btn-inverse">
                  Inverse action
                </button>
                <p className="mt-sm text-body-sm text-inverse-on-surface/80">
                  Dark fill — hover:opacity-90
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-xl card">
          <p className="mb-md font-label-md text-label-md uppercase text-on-surface-variant">
            Disabled state (pattern)
          </p>
          <button
            type="button"
            disabled
            className="btn-primary cursor-not-allowed opacity-50"
          >
            Unavailable
          </button>
          <p className="mt-sm text-body-sm text-on-surface-variant">
            Apply opacity-50 and cursor-not-allowed when actions are disabled.
          </p>
        </div>
      </StyleguideSection>

      <StyleguideSection
        id="components"
        title="UI Components"
        description="Reusable patterns from index.css and PageSections."
        className="bg-surface-container-low"
      >
        <div className="grid gap-xl lg:grid-cols-2">
          <div className="card">
            <p className="mb-md font-label-md text-label-md uppercase text-on-surface-variant">
              Cards & Chips
            </p>
            <div className="chip mb-md">
              <Icon name="verified_user" className="text-content-green" />
              Trust calibration
            </div>
            <p className="text-body-md text-on-surface-variant">
              Cards use rounded-xxl, shadow-soft, and a subtle border. Chips are compact
              pill labels for metadata.
            </p>
          </div>

          <div className="card">
            <p className="mb-md font-label-md text-label-md uppercase text-on-surface-variant">
              Lesson Options
            </p>
            <div className="space-y-sm">
              <button type="button" className="option">
                Default option — hover shows lilac border
              </button>
              <button type="button" className="option option-selected">
                Selected option state
              </button>
            </div>
          </div>

          <div className="card">
            <p className="mb-md font-label-md text-label-md uppercase text-on-surface-variant">
              Navigation Links
            </p>
            <div className="flex flex-wrap gap-lg">
              <span className="nav-link">Default link</span>
              <span className="nav-link nav-link-active">Active link</span>
            </div>
            <p className="mt-md text-body-sm text-on-surface-variant">
              nav-link uses hover:opacity-80. Active state adds a primary bottom border.
            </p>
          </div>

          <div className="card">
            <p className="mb-md font-label-md text-label-md uppercase text-on-surface-variant">
              Speech Bubble
            </p>
            <SpeechBubble tail="left">
              I don&apos;t know yet is a complete answer!
            </SpeechBubble>
          </div>
        </div>

        <div className="mt-xl">
          <h3 className="mb-lg font-display text-headline-md text-on-surface">
            Spacing & Layout Tokens
          </h3>
          <div className="grid gap-md sm:grid-cols-2 lg:grid-cols-4">
            {SPACING_TOKENS.map((space) => (
              <div key={space.token} className="card flex items-center gap-md">
                <div
                  className="shrink-0 rounded bg-primary"
                  style={{ width: space.value, height: space.value }}
                />
                <div>
                  <p className="font-display text-body-sm font-semibold">{space.token}</p>
                  <p className="text-body-sm text-on-surface-variant">{space.value}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-md text-body-sm text-on-surface-variant">
            Page content is constrained with container-page (max-w-container-max: 1152px) and
            margin-mobile / margin-desktop horizontal padding.
          </p>
        </div>

        <div className="mt-xl">
          <h3 className="mb-lg font-display text-headline-md text-on-surface">Shadows & Radius</h3>
          <div className="grid gap-md md:grid-cols-3">
            <div className="rounded-xxl bg-white p-lg shadow-soft">
              <p className="font-display text-body-sm font-semibold">shadow-soft</p>
              <p className="text-body-sm text-on-surface-variant">Cards, bubbles</p>
            </div>
            <div className="rounded-xxl bg-white p-lg shadow-card">
              <p className="font-display text-body-sm font-semibold">shadow-card</p>
              <p className="text-body-sm text-on-surface-variant">Elevated panels</p>
            </div>
            <div className="rounded-xxl bg-white p-lg shadow-soft">
              <p className="font-display text-body-sm font-semibold">rounded-xxl</p>
              <p className="text-body-sm text-on-surface-variant">24px corner radius</p>
            </div>
          </div>
        </div>
      </StyleguideSection>

      <StyleguideSection
        id="logo"
        title="STOP&SCAN Logo"
        description="The open-hand stop icon. Use on light backgrounds in full color, or invert on dark surfaces."
        className="bg-background-paper"
      >
        <div className="grid gap-xl md:grid-cols-2">
          <div className="card flex flex-col items-center gap-lg p-xxl">
            <p className="font-label-md text-label-md uppercase text-on-surface-variant">
              Light background
            </p>
            <img alt="STOP&SCAN logo" className="h-24 w-24 object-contain" src={LOGO_URL} />
            <p className="text-center text-body-sm text-on-surface-variant">
              Source: <code className="text-primary">/logo.png</code>
            </p>
          </div>
          <div className="flex flex-col items-center gap-lg rounded-xxl bg-inverse-surface p-xxl">
            <p className="font-label-md text-label-md uppercase text-inverse-on-surface/70">
              Dark background (inverted)
            </p>
            <img
              alt="STOP&SCAN logo inverted"
              className="h-24 w-24 object-contain brightness-0 invert"
              src={LOGO_URL}
            />
            <p className="text-center text-body-sm text-inverse-on-surface/80">
              Apply <code className="text-inverse-on-surface">brightness-0 invert</code> for footer
              and dark panels
            </p>
          </div>
        </div>

        <div className="mt-xl card">
          <p className="mb-md font-label-md text-label-md uppercase text-on-surface-variant">
            App Icon
          </p>
          <div className="flex items-center gap-xl">
            <img alt="STOP&SCAN app icon" className="h-20 w-20 rounded-2xl shadow-card" src={ICON_URL} />
            <div>
              <p className="font-display text-headline-md text-on-surface">icon-512.png</p>
              <p className="text-body-md text-on-surface-variant">
                Used for favicons, web manifest, and the Stop framework step icon.
              </p>
            </div>
          </div>
        </div>
      </StyleguideSection>

      <StyleguideSection
        id="framework-icons"
        title="Framework Step Icons"
        description="Each STOP&SCAN step has a dedicated icon, Amito pose, and background accent color."
        className="bg-surface-container-low"
      >
        <div className="grid grid-cols-1 gap-lg sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step) => {
            const assets = FRAMEWORK_STEP_IMAGES[step.key];
            return (
              <div
                key={step.key}
                className="group overflow-hidden rounded-xl border border-on-surface/10 bg-white shadow-soft transition-all hover:shadow-card"
              >
                <div
                  className="flex items-center justify-center p-xl transition-transform group-hover:scale-105"
                  style={{ backgroundColor: assets.bg }}
                >
                  <img
                    alt={`${step.title} step icon`}
                    className="h-20 w-20 object-contain drop-shadow-md"
                    src={assets.icon}
                  />
                </div>
                <div className="space-y-xs p-lg">
                  <p className={`font-display text-headline-md ${step.color}`}>{step.letter}</p>
                  <p className="text-body-sm text-on-surface-variant">{step.tagline}</p>
                  <p className="font-label-md text-label-md text-on-surface-variant">
                    Amito cue: {step.cue}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </StyleguideSection>

      <StyleguideSection
        id="amito"
        title="Amito Poses"
        description="Amito is the site mascot. Each pose maps to a framework step or page context, with a matching glow color."
        className="bg-background-paper"
      >
        <div className="mb-xxl">
          <h3 className="mb-lg font-display text-headline-md text-on-surface">
            Component States (with glow)
          </h3>
          <div className="grid grid-cols-2 gap-lg md:grid-cols-4 lg:grid-cols-7">
            {(["greeting", "stop", "source", "content", "alignment", "reflect", "reward"] as const).map(
              (state) => (
                <div
                  key={state}
                  className="flex flex-col items-center rounded-xl bg-white p-lg aura-glow"
                >
                  <Amito state={state} size="md" float />
                  <p className="mt-md font-label-md text-label-md capitalize text-on-surface-variant">
                    {state}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>

        <div>
          <h3 className="mb-lg font-display text-headline-md text-on-surface">Full Asset Library</h3>
          <div className="grid grid-cols-2 gap-lg md:grid-cols-3 lg:grid-cols-4">
            {AMITO_POSES.map((pose) => (
              <div
                key={pose.key}
                className="group overflow-hidden rounded-xl border border-on-surface/10 bg-white p-lg shadow-soft"
              >
                <img
                  alt={pose.label}
                  className="mx-auto h-48 object-contain transition-transform duration-300 group-hover:scale-105"
                  src={AMITO_IMAGES[pose.key]}
                />
                <p className="mt-md text-center font-label-md text-label-md text-on-surface-variant">
                  {pose.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </StyleguideSection>

      <StyleguideSection
        id="effects"
        title="Effects & Backgrounds"
        description="Utility classes and motion patterns used across the site."
        className="bg-surface-container-low"
      >
        <div className="grid gap-xl md:grid-cols-2">
          <div className="hero-gradient rounded-xxl p-xxl">
            <p className="font-display text-headline-md text-on-surface">hero-gradient</p>
            <p className="mt-sm text-body-md text-on-surface-variant">
              Blue-to-cream gradient for page heroes
            </p>
          </div>
          <div className="paper-texture rounded-xxl border border-on-surface/10 bg-background-paper p-xxl">
            <p className="font-display text-headline-md text-on-surface">paper-texture</p>
            <p className="mt-sm text-body-md text-on-surface-variant">
              Subtle dot grid applied to the site layout background
            </p>
          </div>
          <div className="rounded-xxl bg-white p-xxl aura-glow">
            <p className="font-display text-headline-md text-on-surface">aura-glow</p>
            <p className="mt-sm text-body-md text-on-surface-variant">
              Lilac soft glow for Amito spotlight cards
            </p>
          </div>
          <div className="rounded-xxl bg-white p-xxl">
            <p className="mb-md font-display text-headline-md text-on-surface">Animations</p>
            <div className="flex items-end gap-xl">
              <div className="text-center">
                <div className="h-12 w-12 animate-float rounded-full bg-primary" />
                <p className="mt-sm text-body-sm text-on-surface-variant">animate-float</p>
              </div>
              <div className="text-center">
                <div className="h-12 w-12 animate-glowpulse rounded-full bg-lilac-accent" />
                <p className="mt-sm text-body-sm text-on-surface-variant">animate-glowpulse</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-xl">
          <h3 className="mb-lg font-display text-headline-md text-on-surface">Common Icons</h3>
          <div className="grid grid-cols-3 gap-md sm:grid-cols-4 md:grid-cols-6">
            {COMMON_ICONS.map((name) => (
              <div
                key={name}
                className="flex flex-col items-center gap-sm rounded-xl border border-on-surface/10 bg-white p-lg"
              >
                <Icon name={name} className="text-2xl text-primary" />
                <p className="text-center font-label-md text-label-md text-on-surface-variant">
                  {name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </StyleguideSection>
    </div>
  );
}
