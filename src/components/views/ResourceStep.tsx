import AppLink from "../AppLink";
import AmitoSpotlight from "../AmitoSpotlight";
import Icon from "../ui/Icon";
import VideoComingSoon from "../ui/VideoComingSoon";
import YouTubeTeaser from "../ui/YouTubeTeaser";
import StepHeroSection from "../ui/StepHeroSection";
import { CtaBanner, HeroBadge } from "../ui/PageSections";
import { RESOURCES } from "../../data/resources";
import { getStepTools } from "../../data/stepTools";
import { AMITO_VIDEOS, faviconFor, FRAMEWORK_STEP_IMAGES, youtubePoster } from "../../lib/assets";
import { STEPS, stepByKey, stepDisplayTitle, type StepKey } from "../../lib/framework";

const VALID: StepKey[] = ["stop", "source", "content", "alignment", "reflect"];

const STEP_CONFIG: Record<
  StepKey,
  {
    step: number;
    headline: string;
    textLight: boolean;
    badgeIcon: string;
    icon: string;
    amito: string;
    bg: string;
  }
> = {
  stop: {
    step: 1,
    headline: "Pause before you react",
    textLight: false,
    badgeIcon: "front_hand",
    ...FRAMEWORK_STEP_IMAGES.stop,
  },
  source: {
    step: 2,
    headline: "Trace who is behind it",
    textLight: false,
    badgeIcon: "account_circle",
    ...FRAMEWORK_STEP_IMAGES.source,
  },
  content: {
    step: 3,
    headline: "Interrogate what you see",
    textLight: false,
    badgeIcon: "visibility",
    ...FRAMEWORK_STEP_IMAGES.content,
  },
  alignment: {
    step: 4,
    headline: "Cross-check the story",
    textLight: false,
    badgeIcon: "hub",
    ...FRAMEWORK_STEP_IMAGES.alignment,
  },
  reflect: {
    step: 5,
    headline: "Decide with honest uncertainty",
    textLight: false,
    badgeIcon: "psychology",
    ...FRAMEWORK_STEP_IMAGES.reflect,
  },
};

export default function ResourceStep({ step }: { step: string }) {
  const key = step as StepKey;

  if (!step || !VALID.includes(key)) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="font-display text-display-lg">Step not found</h1>
        <p className="mt-md text-body-lg text-on-surface-variant">
          That framework step doesn&apos;t exist. Head back to the resource hub to explore all five
          guides.
        </p>
        <AppLink to="/resources" className="btn-primary mt-6">
          Back to resources
        </AppLink>
      </div>
    );
  }

  const meta = stepByKey(key);
  const r = RESOURCES[key];
  const config = STEP_CONFIG[key];
  const idx = VALID.indexOf(key);
  const next = STEPS[idx + 1];
  const prev = STEPS[idx - 1];

  const titleDisplay = stepDisplayTitle(meta);
  const textClass = config.textLight ? "text-white" : "text-on-surface";
  const mutedClass = config.textLight ? "text-white/80" : "text-on-surface-variant";

  const toolCategories = getStepTools(key);
  const toolCount = toolCategories?.reduce((sum, c) => sum + c.tools.length, 0) ?? 0;
  const previewTools = toolCategories?.flatMap((c) => c.tools).slice(0, 5) ?? [];

  return (
    <div>
      {/* Step hero */}
      <StepHeroSection
        stepKey={key}
        backgroundColor={config.bg}
        className="overflow-visible px-margin-mobile pb-xl pt-lg md:px-margin-desktop"
      >
        <div className="mx-auto max-w-container-max">
          <AppLink
            to="/resources"
            className={`inline-flex items-center gap-xs font-label-md transition-colors hover:opacity-80 ${mutedClass}`}
          >
            <Icon name="arrow_back" className="text-sm" />
            All steps
          </AppLink>

          <div className="mt-lg grid items-center gap-xl md:grid-cols-2">
            <div className="z-10 space-y-lg">
              <div className="flex flex-wrap items-center gap-md">
                <HeroBadge icon={config.badgeIcon} label={`Step ${config.step} of 5`} />
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                  <img alt="" className="h-6 w-6 object-contain" src={config.icon} />
                </div>
              </div>
              <h1 className={`font-display text-display-xl leading-tight ${textClass}`}>
                {titleDisplay}
              </h1>
              <p className={`font-display text-headline-md ${textClass}`}>{config.headline}</p>
              <p className={`max-w-lg text-body-lg ${mutedClass}`}>{r.question}</p>
            </div>
            <AmitoSpotlight
              src={config.amito}
              alt={`Amito demonstrating ${meta.title}`}
              imageClassName="relative z-10 max-h-72 w-full object-contain drop-shadow-xl md:max-h-80"
              glow="none"
              speech={r.takeaway}
              speechPlacement="upper-right"
              speechTail="bottom"
              speechClassName="absolute -right-4 top-0 z-20 max-w-[220px] shadow-xl md:-right-8"
            />
          </div>
        </div>
      </StepHeroSection>

      {/* Step video */}
      <section className="bg-surface-container-low px-margin-mobile py-xl md:px-margin-desktop">
        <div className="mx-auto max-w-4xl">
          {key === "stop" ? (
            <YouTubeTeaser
              src={AMITO_VIDEOS.stop}
              poster={youtubePoster(AMITO_VIDEOS.stop)}
              label={`${titleDisplay}: Pause before you react`}
              posterAlt={`${titleDisplay} step video`}
            />
          ) : (
            <VideoComingSoon
              label={`${titleDisplay} — ${config.headline}`}
              accentColor={config.bg}
            />
          )}
        </div>
      </section>

      {/* Intro */}
      <section className="bg-background-paper px-margin-mobile py-xxl md:px-margin-desktop">
        <div className="mx-auto max-w-container-max">
          <div className="mx-auto max-w-3xl">
            <span className="inline-block rounded-full bg-primary-fixed px-md py-xs font-label-md text-on-primary-fixed-variant">
              The reasoning
            </span>
            <p className="mt-md text-body-lg leading-relaxed text-on-surface">{r.intro}</p>
          </div>
        </div>
      </section>

      {/* Ask yourself */}
      <section className="bg-surface-cream/30 px-margin-mobile py-xxl md:px-margin-desktop">
        <div className="mx-auto max-w-container-max">
          <div className="mx-auto max-w-3xl">
            <div className="mb-lg flex items-center gap-md">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-soft"
                style={{ color: config.bg }}
              >
                <Icon name="quiz" className="text-2xl" />
              </div>
              <div>
                <h2 className="font-display text-display-lg text-on-surface">Ask yourself</h2>
                <p className="text-body-sm text-on-surface-variant">
                  Reflection prompts to use in the moment
                </p>
              </div>
            </div>

            <ul className="space-y-md">
              {r.asks.map((ask, i) => (
                <li
                  key={i}
                  className="flex gap-md rounded-xxl border border-on-surface/5 bg-white p-lg shadow-soft"
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold text-white"
                    style={{ backgroundColor: config.bg }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-body-md leading-relaxed text-on-surface">{ask}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Why it works */}
      <section className="px-margin-mobile py-xxl md:px-margin-desktop">
        <div className="mx-auto max-w-container-max">
          <div className="grid items-start gap-xl md:grid-cols-2">
            <div className="order-2 md:order-1">
              <div className="card space-y-md">
                <div className="flex items-center gap-sm text-primary">
                  <Icon name="lightbulb" />
                  <span className="font-label-md uppercase tracking-widest">Why it works</span>
                </div>
                <p className="text-body-lg leading-relaxed text-on-surface-variant">{r.why}</p>
              </div>
            </div>
            <div className="order-1 flex justify-center md:order-2">
              <AmitoSpotlight
                state={meta.amito}
                amitoSize="lg"
                glow="primary"
                className="min-h-[240px]"
              />
            </div>
          </div>

          <blockquote
            className="mx-auto mt-xl max-w-3xl rounded-xxl border-l-4 px-xl py-lg"
            style={{
              borderColor: config.bg,
              backgroundColor: `${config.bg}1a`,
            }}
          >
            <p className="font-display text-headline-md text-on-surface">&ldquo;{r.takeaway}&rdquo;</p>
            <footer className="mt-sm font-label-md text-on-surface-variant">
              Key takeaway — {meta.title}
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Tools teaser */}
      {toolCategories && toolCount > 0 && (
        <section className="px-margin-mobile pb-xxl md:px-margin-desktop">
          <div className="mx-auto max-w-container-max">
            <AppLink
              to={`/resources/${key}/tools`}
              className="group flex flex-col gap-lg rounded-xxl border border-on-surface/10 bg-white p-xl shadow-soft transition-all hover:-translate-y-1 hover:shadow-card md:flex-row md:items-center md:justify-between"
            >
              <div className="space-y-sm">
                <div className="flex items-center gap-sm" style={{ color: config.bg }}>
                  <Icon name="build" />
                  <span className="font-label-md uppercase tracking-widest">
                    Tools for this step
                  </span>
                </div>
                <h2 className="font-display text-display-lg text-on-surface">
                  {toolCount} tools you can leverage
                </h2>
                <p className="max-w-xl text-body-md text-on-surface-variant">
                  Provenance checks, detectors, and cross-checking tools for {meta.title.toLowerCase()} —
                  each one is a single input, never a verdict.
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-md">
                <div className="flex -space-x-2">
                  {previewTools.map((tool) => (
                    <span
                      key={tool.name}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-on-surface/10 bg-white shadow-sm"
                    >
                      <img
                        alt=""
                        loading="lazy"
                        className="h-5 w-5 object-contain"
                        src={faviconFor(tool.url)}
                      />
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-xs font-label-md font-bold text-primary group-hover:underline">
                  Explore
                  <Icon name="arrow_forward" className="text-sm" />
                </span>
              </div>
            </AppLink>
          </div>
        </section>
      )}

      {/* Step progress */}
      <section className="border-y border-on-surface/5 bg-surface-container-low px-margin-mobile py-xl md:px-margin-desktop">
        <div className="mx-auto max-w-container-max">
          <p className="mb-md text-center font-label-md uppercase tracking-widest text-on-surface-variant">
            Framework progress
          </p>
          <div className="flex flex-wrap justify-center gap-sm">
            {STEPS.map((s) => {
              const stepImages = FRAMEWORK_STEP_IMAGES[s.key];
              const isCurrent = s.key === key;
              return (
                <AppLink
                  key={s.key}
                  to={`/resources/${s.key}`}
                  className={`flex flex-col items-center rounded-2xl border px-md py-sm transition-all ${
                    isCurrent
                      ? "scale-105 border-transparent shadow-card"
                      : "border-on-surface/5 bg-white shadow-soft hover:scale-105"
                  }`}
                  style={
                    isCurrent
                      ? {
                          backgroundColor: `${s.hex}22`,
                          borderColor: `${s.hex}55`,
                        }
                      : undefined
                  }
                  title={s.tagline}
                  aria-current={isCurrent ? "page" : undefined}
                >
                  <div
                    className={`mb-xs flex h-10 w-10 items-center justify-center rounded-full border bg-white shadow-sm ${
                      isCurrent ? "" : "border-on-surface/5"
                    }`}
                    style={isCurrent ? { borderColor: s.hex } : undefined}
                  >
                    <img alt="" className="h-6 w-6 object-contain" src={stepImages.icon} />
                  </div>
                  <span
                    className={`font-label-md ${isCurrent ? `font-bold ${s.color}` : "text-on-surface-variant"}`}
                  >
                    {stepDisplayTitle(s)}
                  </span>
                </AppLink>
              );
            })}
          </div>
        </div>
      </section>

      {/* Prev / Next navigation */}
      <section className="px-margin-mobile py-xl md:px-margin-desktop">
        <div className="mx-auto flex max-w-container-max items-center justify-between gap-md">
          {prev ? (
            <AppLink
              to={`/resources/${prev.key}`}
              className="btn-ghost inline-flex items-center gap-xs"
            >
              <Icon name="arrow_back" className="text-sm" />
              <span className="hidden sm:inline">{prev.title}</span>
              <span className="sm:hidden">Previous</span>
            </AppLink>
          ) : (
            <span />
          )}
          {next ? (
            <AppLink
              to={`/resources/${next.key}`}
              className="btn-primary inline-flex items-center gap-xs"
            >
              <span className="hidden sm:inline">{next.title}</span>
              <span className="sm:hidden">Next</span>
              <Icon name="arrow_forward" className="text-sm" />
            </AppLink>
          ) : (
            <AppLink
              to="/practice/celebrity-investment-scam"
              className="btn-accent inline-flex items-center gap-xs"
            >
              Try it on a case
              <Icon name="arrow_forward" className="text-sm" />
            </AppLink>
          )}
        </div>
      </section>

      <CtaBanner
        title={next ? `Continue to ${next.title}` : "Put this step into practice"}
        description={
          next
            ? `You've explored ${meta.title} — read the next guide or jump straight into a guided case.`
            : "You've read all five guides. Walk through a real case with Amito and apply what you've learned."
        }
        to={next ? `/resources/${next.key}` : "/learn"}
        label={next ? `Read ${next.title} guide` : "Start the guided lesson"}
      />
    </div>
  );
}
