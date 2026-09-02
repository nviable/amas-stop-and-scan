import { useState } from "react";
import AppLink from "../AppLink";
import Icon from "../ui/Icon";
import LessonEngine from "../lesson/LessonEngine";
import { PostCard } from "../case/CaseMedia";
import CaseStartOverlay from "../case/CaseStartOverlay";
import { getCaseBySlug } from "../../data/cases";
import { AMITO_IMAGES } from "../../lib/assets";
import { SpeechBubble } from "../ui/PageSections";

const DIFFICULTY_STYLE: Record<string, string> = {
  intro: "border-content-green/20 bg-content-green/10 text-content-green",
  core: "border-welcome-blue/20 bg-welcome-blue/10 text-welcome-blue",
  advanced: "border-reflect-orange/20 bg-reflect-orange/10 text-reflect-orange",
};

// The framework is reasoning-based, not artifact-spotting: these mirror the
// transferable STOP&SCAN habits the case exercises, so they apply equally to
// scams, authentic content, and decontextualized footage.
const PREVIEW_SKILLS = [
  {
    icon: "hand",
    iconClass: "bg-stop-red/15 text-stop-red",
    title: "Pause before reacting",
    body: "Catch your gut reaction and name the emotion a post is trying to trigger before you act.",
  },
  {
    icon: "travel_explore",
    iconClass: "bg-source-cyan/15 text-source-cyan",
    title: "Trace the real source",
    body: "Look past whoever shared it to who actually created it — and whether that origin is accountable.",
  },
  {
    icon: "grid-2x2-check",
    iconClass: "bg-alignment/20 text-alignment",
    title: "Cross-check the story",
    body: "Decide what independent sources actually confirm before you trust, share, or dismiss.",
  },
];

export default function CaseFile({ slug }: { slug: string }) {
  const data = getCaseBySlug(slug);
  const [started, setStarted] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);

  if (!data) {
    return (
      <div className="container-page py-20 text-center">
        <img alt="Amito" className="mx-auto h-48 w-48 object-contain" src={AMITO_IMAGES.reflect} />
        <h1 className="mt-4 font-display text-display-lg">Case file not found</h1>
        <p className="mt-2 text-on-surface-variant">This case isn&apos;t available yet.</p>
        <AppLink to="/practice" className="btn-primary mt-6">
          Back to Practice
        </AppLink>
      </div>
    );
  }

  if (started) return <LessonEngine data={data} mode="practice" />;

  return (
    <div className="px-margin-mobile pb-xxl pt-8 md:px-margin-desktop">
      <CaseStartOverlay
        mode="practice"
        open={!acknowledged}
        onStart={() => setAcknowledged(true)}
      />
      <div className="mx-auto max-w-container-max">
        <div className="grid grid-cols-1 items-center gap-xxl lg:grid-cols-12">
          <div className="flex flex-col items-start lg:col-span-6">
            <div className="mb-lg flex flex-wrap gap-sm">
              <span
                className={`flex items-center gap-xs rounded-full border px-md py-xs font-label-md uppercase ${
                  DIFFICULTY_STYLE[data.difficulty] ?? DIFFICULTY_STYLE.intro
                }`}
              >
                <Icon name="school" className="text-[14px]" />
                {data.difficulty}
              </span>
              <span className="flex items-center gap-xs rounded-full border border-secondary-container/20 bg-secondary-container/10 px-md py-xs font-label-md text-on-secondary-container">
                <Icon name="schedule" className="text-[14px]" />
                {data.estMinutes} min
              </span>
            </div>

            <h1 className="mb-md font-display text-display-xl text-on-background">
              {data.title}
            </h1>
            <p className="mb-xl text-body-lg text-on-surface-variant">{data.summary}</p>

            <div className="mb-xl w-full">
              <PostCard post={data.post} />
            </div>

            <div className="flex flex-col items-center gap-md sm:flex-row">
              <button type="button" onClick={() => setStarted(true)} className="btn-inverse shadow-lg">
                Begin this case
                <Icon name="arrow_forward" />
              </button>
              <AppLink to="/practice" className="btn-ghost">
                Back to library
              </AppLink>
            </div>
          </div>

          <div className="flex flex-col items-center lg:col-span-6">
            <div className="relative mb-lg w-full max-w-md">
              <div className="absolute inset-0 animate-pulse rounded-full bg-stop-red/15 blur-2xl" />
              <img
                alt="Amito stop pose"
                className="relative mx-auto h-64 w-64 object-contain drop-shadow-xl md:h-80 md:w-80"
                src={AMITO_IMAGES.stop}
              />
              <SpeechBubble
                tail="left"
                className="absolute -top-4 right-0 max-w-[240px] -rotate-2 p-md md:right-10"
              >
                &ldquo;Wait! Let&apos;s scan this together before we trust.&rdquo;
              </SpeechBubble>
            </div>
            <div className="max-w-md rounded-xl border border-on-surface/5 bg-surface-cream/50 p-lg">
              <p className="text-body-sm italic text-on-surface-variant">
                Practice mode gives you fewer cues while you scan. If you get stuck, use
                Show hint and Amito will add extra feedback at the end.
              </p>
            </div>
          </div>
        </div>

        <section className="mt-xxl">
          <h2 className="mb-lg font-display text-headline-md text-on-surface">
            The habits you&apos;ll practice
          </h2>
          <div className="grid grid-cols-1 gap-lg md:grid-cols-3">
          {PREVIEW_SKILLS.map((skill) => (
            <div
              key={skill.title}
              className="flex flex-col gap-sm rounded-xxl border border-on-surface/10 bg-white p-lg shadow-sm"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${skill.iconClass}`}>
                <Icon name={skill.icon} />
              </div>
              <h3 className="font-display text-headline-md">{skill.title}</h3>
              <p className="text-body-md text-on-surface-variant">{skill.body}</p>
            </div>
          ))}
          </div>
        </section>
      </div>
    </div>
  );
}
