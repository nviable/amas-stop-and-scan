import { Link } from "react-router-dom";
import AmitoSpotlight from "../components/AmitoSpotlight";
import HeroSection from "../components/ui/HeroSection";
import Icon from "../components/ui/Icon";
import { CtaBanner, HeroBadge } from "../components/ui/PageSections";
import { RESOURCES } from "../data/resources";
import { AMITO_IMAGES, FRAMEWORK_STEP_IMAGES } from "../lib/assets";
import { STEPS, stepDisplayTitle } from "../lib/framework";

const RESOURCE_STEPS = [
  {
    key: "stop",
    step: 1,
    headline: "Pause before you react",
    textClass: "text-white",
    ...FRAMEWORK_STEP_IMAGES.stop,
  },
  {
    key: "source",
    step: 2,
    headline: "Trace who is behind it",
    textClass: "text-on-surface",
    ...FRAMEWORK_STEP_IMAGES.source,
  },
  {
    key: "content",
    step: 3,
    headline: "Interrogate what you see",
    textClass: "text-on-surface",
    ...FRAMEWORK_STEP_IMAGES.content,
  },
  {
    key: "alignment",
    step: 4,
    headline: "Cross-check the story",
    textClass: "text-white",
    ...FRAMEWORK_STEP_IMAGES.alignment,
  },
  {
    key: "reflect",
    step: 5,
    headline: "Decide with honest uncertainty",
    textClass: "text-white",
    ...FRAMEWORK_STEP_IMAGES.reflect,
  },
] as const;

export default function Resources() {
  return (
    <div>
      <HeroSection className="overflow-visible px-margin-mobile pb-xl pt-xxl md:px-margin-desktop">
        <div className="mx-auto grid max-w-container-max items-center gap-xl md:grid-cols-2">
          <div className="z-10 space-y-lg">
            <HeroBadge icon="menu_book" label="Resource Hub" />
            <h1 className="font-display text-display-xl text-on-background">
              The reasoning behind each step
            </h1>
            <p className="max-w-xl text-body-lg text-on-surface-variant">
              STOP&SCAN teaches you to interrogate context, provenance, and alignment — not
              to memorize visual artifacts that change as technology evolves.
            </p>
          </div>
          <AmitoSpotlight
            src={AMITO_IMAGES.project}
            alt="Amito ready to explain"
            imageClassName="relative z-10 max-w-sm object-contain drop-shadow-xl md:translate-x-8"
            glow="primary"
            speech="Each step has a guide — read the why before you practice!"
          />
        </div>
      </HeroSection>

      <section className="bg-background-paper px-margin-mobile py-xxl md:px-margin-desktop">
        <div className="mx-auto max-w-container-max">
          <div className="mb-xl text-center">
            <h2 className="font-display text-display-lg text-on-surface">Five guides, one habit</h2>
            <p className="mt-sm mx-auto max-w-2xl text-body-lg text-on-surface-variant">
              Explore the questions, rationale, and takeaways for every stage of the
              framework. Start anywhere — or follow them in order.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-lg lg:grid-cols-2">
            {RESOURCE_STEPS.map((section) => {
              const meta = STEPS.find((s) => s.key === section.key)!;
              const resource = RESOURCES[section.key];

              return (
                <Link
                  key={section.key}
                  to={`/resources/${section.key}`}
                  className="group overflow-hidden rounded-xxl border border-on-surface/5 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-card"
                >
                  <div
                    className="flex items-center justify-between gap-md px-lg py-md"
                    style={{ backgroundColor: section.bg }}
                  >
                    <div className="flex items-center gap-md">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                        <img alt="" className="h-7 w-7 object-contain" src={section.icon} />
                      </div>
                      <div>
                        <span
                          className={`font-label-md uppercase tracking-widest ${section.textClass} opacity-80`}
                        >
                          Step {section.step}
                        </span>
                        <h3 className={`font-display text-headline-md ${section.textClass}`}>
                          {stepDisplayTitle(meta)}
                        </h3>
                      </div>
                    </div>
                    <img
                      alt=""
                      className="h-20 w-20 object-contain drop-shadow-md transition-transform group-hover:scale-105"
                      src={section.amito}
                    />
                  </div>

                  <div className="space-y-md p-lg">
                    <p className="font-display text-headline-md text-on-surface">
                      {section.headline}
                    </p>
                    <p className="text-body-sm font-semibold text-primary">{resource.question}</p>
                    <p className="line-clamp-3 text-body-sm text-on-surface-variant">
                      {resource.intro}
                    </p>
                    <blockquote className="rounded-xl border-l-4 border-alignment/40 bg-surface-container-low px-md py-sm">
                      <p className="text-body-sm italic text-on-surface-variant">
                        &ldquo;{resource.takeaway}&rdquo;
                      </p>
                    </blockquote>
                    <span className="inline-flex items-center gap-xs font-label-md font-bold text-primary group-hover:underline">
                      Read the full guide
                      <Icon name="arrow_forward" className="text-sm" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-margin-mobile py-xxl md:px-margin-desktop">
        <div className="mx-auto max-w-container-max">
          <div className="rounded-xxl border border-on-surface/10 bg-surface-container-low p-xxl md:flex md:items-center md:justify-between md:gap-xxl">
            <div className="max-w-xl space-y-md">
              <span className="inline-block rounded-full bg-primary-fixed px-md py-xs font-label-md text-on-primary-fixed-variant">
                Quick reference
              </span>
              <h2 className="font-display text-display-lg text-on-surface">
                Scan the framework at a glance
              </h2>
              <p className="text-body-md text-on-surface-variant">
                STOP is the pre-commitment gut check. S, C, A, and N spell SCAN — source,
                content, alignment, and now reflect. Uncertainty is a valid outcome.
              </p>
            </div>
            <div className="mt-lg flex flex-wrap justify-center gap-sm md:mt-0">
              {STEPS.map((s) => {
                const stepImages = FRAMEWORK_STEP_IMAGES[s.key];
                return (
                  <Link
                    key={s.key}
                    to={`/resources/${s.key}`}
                    className="flex flex-col items-center rounded-2xl border border-on-surface/5 bg-white px-md py-sm shadow-soft transition-transform hover:scale-105"
                    title={s.tagline}
                  >
                    <div className="mb-xs flex h-10 w-10 items-center justify-center rounded-full border border-on-surface/5 bg-white shadow-sm">
                      <img alt="" className="h-6 w-6 object-contain" src={stepImages.icon} />
                    </div>
                    <span className="font-label-md text-on-surface-variant">
                      {stepDisplayTitle(s)}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Put the guides into practice"
        description="You've read the reasoning — now walk through a real case with Amito step by step."
        to="/learn"
        label="Start the guided lesson"
      />
    </div>
  );
}
