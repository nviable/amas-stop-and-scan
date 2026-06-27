import { useState } from "react";
import { Link } from "react-router-dom";
import Amito from "../components/Amito";
import AmitoSpotlight from "../components/AmitoSpotlight";
import HeroSection from "../components/ui/HeroSection";
import Icon from "../components/ui/Icon";
import { CtaBanner, HeroBadge } from "../components/ui/PageSections";
import LessonEngine from "../components/lesson/LessonEngine";
import { getCaseBySlug } from "../data/cases";
import { AMITO_IMAGES, FRAMEWORK_STEP_IMAGES } from "../lib/assets";

const LEARN_SECTIONS = [
  {
    key: "stop",
    step: 1,
    title: "STOP",
    body: "When content triggers a strong emotional reaction, the first thing to do is pause. Don't share, don't comment — just stop.",
    cta: "Learn more about Stopping",
    to: "/resources/stop",
    ...FRAMEWORK_STEP_IMAGES.stop,
    textLight: true,
  },
  {
    key: "source",
    step: 2,
    title: "SOURCE",
    body: "Investigate the source. Who created this? Look past the name to find their reputation and track record.",
    cta: "Master Source Checking",
    to: "/resources/source",
    ...FRAMEWORK_STEP_IMAGES.source,
    textLight: false,
  },
  {
    key: "content",
    step: 3,
    title: "CONTENT",
    body: "Look for evidence within the content itself. Does the evidence actually support the claim being made?",
    cta: "Deconstruct Content",
    to: "/resources/content",
    ...FRAMEWORK_STEP_IMAGES.content,
    textLight: false,
  },
  {
    key: "alignment",
    step: 4,
    title: "ALIGNMENT",
    body: "Find independent sources. Does this hold up against what others — who have no shared stake in the story — are reporting?",
    cta: "Practice Alignment",
    to: "/resources/alignment",
    ...FRAMEWORK_STEP_IMAGES.alignment,
    textLight: true,
  },
  {
    key: "reflect",
    step: 5,
    title: "NOW REFLECT",
    body: "Why was this content created? Reflect on your own biases before you decide what to do next.",
    cta: "Take a Reflection Moment",
    to: "/resources/reflect",
    ...FRAMEWORK_STEP_IMAGES.reflect,
    textLight: true,
  },
] as const;

export default function Learn() {
  const [started, setStarted] = useState(false);
  const data = getCaseBySlug("celebrity-investment-scam");

  if (!data) return null;
  if (started) return <LessonEngine data={data} mode="learn" />;

  return (
    <div>
      <HeroSection className="overflow-visible px-margin-mobile pb-xxl pt-xxl md:px-margin-desktop">
        <div className="mx-auto grid max-w-container-max items-center gap-xxl md:grid-cols-2">
          <div className="order-2 space-y-lg md:order-1">
            <HeroBadge icon="school" label="Sensemaking Framework" />
            <h1 className="font-display text-display-xl leading-tight text-on-surface">
              Learn STOP&SCAN
            </h1>
            <p className="max-w-lg text-body-lg text-on-surface-variant">
              Join Amito on a guided journey to master the 5-step framework. We&apos;ll
              walk through a real-world case together so you can practice spotting digital
              manipulation.
            </p>
            <div className="flex flex-wrap gap-md pt-md">
              <button type="button" onClick={() => setStarted(true)} className="btn-primary">
                Start Guided Lesson
              </button>
              <Link to="/resources" className="btn-ghost">
                Explore the Framework
              </Link>
            </div>
          </div>
          <AmitoSpotlight
            className="order-1 md:order-2"
            src={AMITO_IMAGES.learn}
            alt="Amito greeting"
            float
            glow="none"
            speech="Hi! I'm Amito. Let's learn how to spot tricky content together!"
          />
        </div>
      </HeroSection>

      <div className="w-full">
        {LEARN_SECTIONS.map((section, i) => (
          <section
            key={section.key}
            className="w-full py-xl"
            style={{ backgroundColor: section.bg, color: section.textLight ? "#fff" : undefined }}
          >
            <div className="mx-auto grid max-w-container-max items-center gap-xl px-margin-mobile md:grid-cols-2 md:px-margin-desktop">
              {i % 2 === 1 && (
                <div className="flex justify-center md:order-1">
                  <img alt="" className="max-h-64 object-contain" src={section.amito} />
                </div>
              )}
              <div className={`space-y-md ${i % 2 === 1 ? "md:order-2" : ""}`}>
                <div className="flex items-center gap-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white p-2">
                    <img alt="" className="h-8 w-8 object-contain" src={section.icon} />
                  </div>
                  <span
                    className={`rounded-full px-md py-xs font-label-md uppercase tracking-widest ${
                      section.textLight ? "bg-white/20" : "bg-black/5"
                    }`}
                  >
                    Step {section.step}
                  </span>
                </div>
                <h2
                  className={`font-display text-display-xl ${section.textLight ? "text-white" : "text-on-surface"}`}
                >
                  {section.title}
                </h2>
                <p
                  className={`text-body-lg ${section.textLight ? "opacity-90" : "text-on-surface-variant"}`}
                >
                  {section.body}
                </p>
                <Link
                  to={section.to}
                  className={`inline-flex rounded-full px-xl py-md font-label-md transition-all active:scale-95 ${
                    section.textLight
                      ? "bg-white text-[color:var(--section-bg)] hover:bg-opacity-90"
                      : "bg-on-surface text-white hover:opacity-90"
                  }`}
                  style={{ ["--section-bg" as string]: section.bg }}
                >
                  {section.cta}
                </Link>
              </div>
              {i % 2 === 0 && (
                <div className="flex justify-center">
                  <img alt="" className="max-h-64 object-contain" src={section.amito} />
                </div>
              )}
            </div>
          </section>
        ))}
      </div>

      <section className="px-margin-mobile py-xxl md:px-margin-desktop">
        <div className="mx-auto flex max-w-container-max flex-col overflow-hidden rounded-xxl border border-on-surface/10 bg-white shadow-lg md:flex-row">
          <div className="flex-1 space-y-md p-xxl">
            <div className="flex items-center gap-sm text-primary">
              <Icon name="play_circle" />
              <span className="font-label-md uppercase tracking-widest">Active Case Study</span>
            </div>
            <h2 className="font-display text-display-lg text-on-surface">
              Today&apos;s Lesson: {data.title}
            </h2>
            <p className="text-body-lg text-on-surface-variant">
              Estimated time: {data.estMinutes} minutes. No wrong answers — just practice
              for your brain. {data.summary}
            </p>
            <button type="button" onClick={() => setStarted(true)} className="btn-primary mt-lg">
              Launch Case
              <Icon name="arrow_forward" className="text-[18px]" />
            </button>
          </div>
          <div className="relative flex min-h-[280px] w-full items-center justify-center bg-surface-container-high p-xl md:w-1/3">
            <Amito state="source" size="lg" />
          </div>
        </div>
      </section>

      <CtaBanner
        title="Walk through it with Amito"
        description="Ready to practice the framework? Let Amito guide you through real-world examples."
        label="Start the guided lesson"
        onAction={() => setStarted(true)}
      />
    </div>
  );
}
