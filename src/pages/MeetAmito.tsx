import AmitoSpotlight from "../components/AmitoSpotlight";
import HeroSection from "../components/ui/HeroSection";
import { CtaBanner, HeroBadge } from "../components/ui/PageSections";
import { AMITO_IMAGES } from "../lib/assets";
import { STEPS } from "../lib/framework";

const MEET_POSES = [
  { state: "greeting", label: "Greeting", img: AMITO_IMAGES.greeting, badge: "text-primary bg-primary/10" },
  { state: "stop", label: "Stop & Assess", img: AMITO_IMAGES.stop, badge: "text-stop-red bg-stop-red/10" },
  { state: "source", label: "Source Check", img: AMITO_IMAGES.source, badge: "text-source-cyan bg-source-cyan/10" },
  { state: "content", label: "Content Analysis", img: AMITO_IMAGES.content, badge: "text-content-green bg-content-green/10" },
  { state: "alignment", label: "Alignment Check", img: AMITO_IMAGES.alignment, badge: "text-lilac-accent bg-lilac-accent/10" },
  { state: "reflect", label: "Reflection", img: AMITO_IMAGES.reflect, badge: "text-reflect-orange bg-reflect-orange/10" },
] as const;

const FRAMEWORK_CARDS = [
  { key: "stop", title: "STOP", cue: STEPS[0].cue, img: AMITO_IMAGES.stop, border: "hover:border-stop-red/30", bg: "bg-stop-red/10", text: "text-stop-red" },
  { key: "source", title: "SOURCE", cue: STEPS[1].cue, img: AMITO_IMAGES.source, border: "hover:border-source-cyan/30", bg: "bg-source-cyan/10", text: "text-source-cyan" },
  { key: "content", title: "CONTENT", cue: STEPS[2].cue, img: AMITO_IMAGES.content, border: "hover:border-content-green/30", bg: "bg-content-green/10", text: "text-content-green" },
  { key: "alignment", title: "ALIGN", cue: STEPS[3].cue, img: AMITO_IMAGES.alignment, border: "hover:border-lilac-accent/30", bg: "bg-lilac-accent/10", text: "text-lilac-accent" },
  { key: "reflect", title: "REFLECT", cue: STEPS[4].cue, img: AMITO_IMAGES.reflect, border: "hover:border-reflect-orange/30", bg: "bg-reflect-orange/10", text: "text-reflect-orange" },
] as const;

export default function MeetAmito() {
  return (
    <div>
      <HeroSection className="flex min-h-[500px] flex-col items-center justify-center overflow-visible px-margin-mobile py-xxl md:px-margin-desktop">
        <div className="mx-auto grid w-full max-w-container-max items-center gap-xl md:grid-cols-2">
          <div className="space-y-lg text-left">
            <HeroBadge icon="robot_2" label="Your Guide" />
            <h1 className="font-display text-display-xl text-on-surface">Meet Amito</h1>
            <p className="max-w-sm text-body-md text-on-surface-variant">
              As the messenger of trust, Amito evolves with you through each step of the
              STOP&SCAN framework, signaling important cues to keep your journey safe.
            </p>
          </div>
          <AmitoSpotlight
            src={AMITO_IMAGES.greeting}
            alt="Amito waving"
            imageClassName="relative z-10 max-w-md object-contain transition-transform duration-500 hover:rotate-2"
            glow="primary"
            speech={
              <>
                &ldquo;Hello! I&apos;m Amito, your friendly guide through the world of digital
                sensemaking. I&apos;m here to help you navigate information with trust and
                clarity.&rdquo;
              </>
            }
          />
        </div>
      </HeroSection>

      <section className="bg-background-paper px-margin-mobile py-xxl md:px-margin-desktop">
        <div className="mx-auto max-w-container-max">
          <div className="mb-xxl text-center">
            <h2 className="font-display text-display-lg text-on-surface">
              Visual Language of Trust
            </h2>
            <p className="mt-sm text-body-md text-on-surface-variant">
              Amito&apos;s colors change to help you identify where you are in the framework.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-md md:grid-cols-5">
            {FRAMEWORK_CARDS.map((s) => (
              <div
                key={s.key}
                className={`group flex flex-col items-center rounded-lg border border-on-surface/5 bg-surface-container-lowest p-lg transition-all ${s.border}`}
              >
                <div
                  className={`mb-md flex h-24 w-24 items-center justify-center rounded-full ${s.bg} transition-transform group-hover:scale-110`}
                >
                  <img alt="" className="h-16 w-16 object-contain" src={s.img} />
                </div>
                <h3 className={`mb-xs font-display text-headline-md ${s.text}`}>{s.title}</h3>
                <p className="text-center text-body-sm text-on-surface-variant">{s.cue}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low px-margin-mobile py-xxl md:px-margin-desktop">
        <div className="mx-auto max-w-container-max">
          <h2 className="mb-xl text-center font-display text-display-lg text-on-surface">
            The Many Poses of Amito
          </h2>
          <div className="grid grid-cols-2 gap-lg lg:grid-cols-3">
            {MEET_POSES.map((p) => (
              <div
                key={p.state}
                className="group flex flex-col items-center overflow-hidden rounded-xl bg-white p-xl aura-glow"
              >
                <img
                  alt={p.label}
                  className="h-64 object-contain transition-transform duration-300 group-hover:scale-105"
                  src={p.img}
                />
                <span className={`mt-md rounded-full px-md py-xs font-label-md ${p.badge}`}>
                  {p.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Walk through it with Amito"
        description="Ready to practice the framework? Let Amito guide you through real-world examples and interactive modules."
        to="/learn"
        label="Start Learning"
      />
    </div>
  );
}
