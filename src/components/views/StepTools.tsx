import { useState } from "react";
import AppLink from "../AppLink";
import Icon from "../ui/Icon";
import StepHeroSection, { TEXT_LIGHT } from "../ui/StepHeroSection";
import { HeroBadge } from "../ui/PageSections";
import { RESOURCES } from "../../data/resources";
import { getStepTools, type StepTool } from "../../data/stepTools";
import { faviconFor, FRAMEWORK_STEP_IMAGES } from "../../lib/assets";
import { STEPS, stepByKey, stepDisplayTitle, type StepKey } from "../../lib/framework";

const VALID: StepKey[] = ["stop", "source", "content", "alignment", "reflect"];

function ToolThumb({ tool }: { tool: StepTool }) {
  const [failed, setFailed] = useState(false);
  const letter = tool.name.charAt(0).toUpperCase();

  if (failed) {
    return (
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface-container-low font-display text-headline-md text-on-surface-variant">
        {letter}
      </span>
    );
  }

  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-on-surface/10 bg-white shadow-sm">
      <img
        alt=""
        loading="lazy"
        className="h-6 w-6 object-contain"
        src={faviconFor(tool.url)}
        onError={() => setFailed(true)}
      />
    </span>
  );
}

function ToolCard({ tool }: { tool: StepTool }) {
  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col gap-md rounded-xxl border border-on-surface/10 bg-white p-lg shadow-soft transition-all hover:-translate-y-1 hover:shadow-card"
    >
      <div className="flex items-start gap-md">
        <ToolThumb tool={tool} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-sm">
            <h4 className="font-display text-headline-md text-on-surface group-hover:text-primary">
              {tool.name}
            </h4>
            <Icon
              name="open_in_new"
              className="mt-1 shrink-0 text-sm text-on-surface-variant transition-colors group-hover:text-primary"
            />
          </div>
          {tool.badges && tool.badges.length > 0 && (
            <div className="mt-xs flex flex-wrap gap-xs">
              {tool.badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full bg-surface-container-low px-sm py-[2px] font-label-md text-on-surface-variant"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <p className="text-body-sm leading-relaxed text-on-surface-variant">{tool.description}</p>

      {tool.warning && (
        <div className="mt-auto flex gap-sm rounded-xl bg-amber-50 px-md py-sm">
          <Icon name="warning" className="mt-[2px] shrink-0 text-sm text-amber-600" />
          <p className="text-body-sm leading-snug text-amber-900">{tool.warning}</p>
        </div>
      )}
    </a>
  );
}

export default function StepTools({ step }: { step: string }) {
  const key = step as StepKey;
  const categories = VALID.includes(key) ? getStepTools(key) : undefined;

  if (!step || !VALID.includes(key) || !categories) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="font-display text-display-lg">No tools yet</h1>
        <p className="mt-md text-body-lg text-on-surface-variant">
          This step doesn&apos;t have a tools guide yet. Head back to the resource hub to explore
          the framework.
        </p>
        <AppLink to="/resources" className="btn-primary mt-6">
          Back to resources
        </AppLink>
      </div>
    );
  }

  const meta = stepByKey(key);
  const r = RESOURCES[key];
  const images = FRAMEWORK_STEP_IMAGES[key];
  const idx = VALID.indexOf(key);
  const stepNumber = idx + 1;
  const titleDisplay = stepDisplayTitle(meta);
  const textLight = TEXT_LIGHT[key];
  const textClass = textLight ? "text-white" : "text-on-surface";
  const mutedClass = textLight ? "text-white/80" : "text-on-surface-variant";

  // Next step that also has a tools page.
  const nextWithTools = STEPS.slice(idx + 1).find((s) => getStepTools(s.key));

  return (
    <div>
      {/* Hero */}
      <StepHeroSection
        stepKey={key}
        backgroundColor={images.bg}
        className="px-margin-mobile pb-xl pt-lg md:px-margin-desktop"
      >
        <div className="mx-auto max-w-container-max">
          <AppLink
            to={`/resources/${key}`}
            className={`inline-flex items-center gap-xs font-label-md transition-colors hover:opacity-80 ${mutedClass}`}
          >
            <Icon name="arrow_back" className="text-sm" />
            {titleDisplay} guide
          </AppLink>

          <div className="mt-lg flex flex-wrap items-center gap-md">
            <HeroBadge icon="build" label={`Tools · Step ${stepNumber}`} />
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
              <img alt="" className="h-6 w-6 object-contain" src={images.icon} />
            </div>
          </div>

          <h1 className={`mt-lg font-display text-display-xl leading-tight ${textClass}`}>
            {titleDisplay} tools
          </h1>
          <p className={`mt-md max-w-2xl text-body-lg ${mutedClass}`}>{r.question}</p>
        </div>
      </StepHeroSection>

      {/* Framing note */}
      <section className="bg-surface-container-low px-margin-mobile py-xl md:px-margin-desktop">
        <div className="mx-auto flex max-w-3xl gap-md rounded-xxl border border-on-surface/10 bg-white p-lg shadow-soft">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
            style={{ color: images.bg, backgroundColor: `${images.bg}1a` }}
          >
            <Icon name="lightbulb" className="text-2xl" />
          </div>
          <div>
            <h2 className="font-display text-headline-md text-on-surface">
              Tools are one input, not a verdict
            </h2>
            <p className="mt-xs text-body-md text-on-surface-variant">
              Each tool below sharpens one part of {meta.title.toLowerCase()}. Use them to gather
              evidence, then reason — a single score, label, or marker never settles the question on
              its own.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-margin-mobile py-xxl md:px-margin-desktop">
        <div className="mx-auto max-w-container-max space-y-xxl">
          {categories.map((category) => (
            <div key={category.id}>
              <div className="mb-lg max-w-2xl">
                <h2 className="font-display text-display-lg text-on-surface">{category.title}</h2>
                <p className="mt-sm text-body-md text-on-surface-variant">{category.blurb}</p>
              </div>
              <div className="grid grid-cols-1 gap-lg md:grid-cols-2 lg:grid-cols-3">
                {category.tools.map((tool) => (
                  <ToolCard key={tool.name} tool={tool} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer nav */}
      <section className="border-t border-on-surface/5 px-margin-mobile py-xl md:px-margin-desktop">
        <div className="mx-auto flex max-w-container-max flex-wrap items-center justify-between gap-md">
          <AppLink to={`/resources/${key}`} className="btn-ghost inline-flex items-center gap-xs">
            <Icon name="arrow_back" className="text-sm" />
            Back to the {titleDisplay} guide
          </AppLink>
          {nextWithTools ? (
            <AppLink
              to={`/resources/${nextWithTools.key}/tools`}
              className="btn-primary inline-flex items-center gap-xs"
            >
              {stepDisplayTitle(nextWithTools)} tools
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
    </div>
  );
}
