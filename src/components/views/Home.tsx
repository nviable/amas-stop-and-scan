import AiForGoodSummitBlock from "../AiForGoodSummitBlock";
import AppLink from "../AppLink";
import AmitoSpotlight from "../AmitoSpotlight";
import HeroSection from "../ui/HeroSection";
import Icon from "../ui/Icon";
import VideoTeaser from "../ui/VideoTeaser";
import { AMITO_IMAGES, AMITO_VIDEOS, FRAMEWORK_STEP_IMAGES, LOGO_URL } from "../../lib/assets";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <HeroSection
        background="home"
        className="px-margin-mobile py-xl md:px-margin-desktop md:py-xxl"
      >
        <div className="mx-auto grid max-w-container-max items-center gap-lg md:grid-cols-2 md:gap-xl">
          <div className="z-10">
            <img
              alt="STOP&SCAN"
              className="mb-sm h-auto w-full max-w-[240px] object-contain sm:max-w-[280px] md:max-w-[320px]"
              src={LOGO_URL}
            />
            <h1 className="font-display text-headline-md text-on-surface md:text-display-lg">
              Empowering Digital Resilience
            </h1>
            <p className="mt-sm max-w-md text-body-md text-on-surface-variant md:text-body-lg">
              <span className="font-semibold text-on-surface">STOP&SCAN</span> is a
              five-step habit for pausing before you trust what you see online. Join Amito
              to practice pause, verify, analyze, align, and reflect.
            </p>
            <div className="mt-lg flex flex-wrap gap-md md:mt-xl">
              <AppLink to="/learn" className="btn-primary shadow-xl shadow-primary/20">
                Start Learning
              </AppLink>
              <AppLink to="/practice" className="btn-accent">
                <Icon name="explore" />
                Practice
              </AppLink>
            </div>
          </div>

          <AmitoSpotlight
            className="mx-auto max-w-[280px] md:max-w-xs md:justify-self-end lg:max-w-sm"
            src={AMITO_IMAGES.greeting}
            alt="Amito waving"
            imageClassName="relative z-10 w-full object-contain"
            float
            glow="primary"
            glowClassName="scale-110 bg-gradient-to-tr from-primary/20 via-welcome-blue/10 to-transparent blur-3xl"
            speech="Hi! I'm Amito. Let's learn how to spot tricky content together!"
            speechTail="bottom"
            speechClassName="absolute top-[-20%] -right-4 z-20 max-w-[200px] md:-right-4 md:max-w-[220px]"
          />
        </div>
      </HeroSection>

      <AiForGoodSummitBlock />

      {/* Video teaser */}
      <section className="bg-surface-container-low px-margin-mobile py-xl md:px-margin-desktop">
        <div className="mx-auto max-w-4xl">
          <VideoTeaser
            src={AMITO_VIDEOS.meetAmitoTeaser}
            poster={AMITO_IMAGES.videoTeaser}
            label="Teaser Video: Meet Amito"
            posterAlt="Meet Amito teaser"
          />
        </div>
      </section>

      {/* Framework grid */}
      <section className="px-margin-mobile py-xxl md:px-margin-desktop">
        <div className="mx-auto max-w-container-max">
          <div className="mb-xl text-center">
            <h2 className="font-display text-display-xl text-on-surface">The Framework</h2>
            <p className="mt-sm text-body-lg text-on-surface-variant">
              Simple steps to master digital resilience.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-lg md:grid-cols-2 lg:grid-cols-3">
            {(
              [
                ["stop", "STOP", "Reclaim Your Attention", FRAMEWORK_STEP_IMAGES.stop],
                ["source", "SOURCE", "Verify the Origin", FRAMEWORK_STEP_IMAGES.source],
                ["content", "CONTENT", "Analyze the Message", FRAMEWORK_STEP_IMAGES.content],
                ["alignment", "ALIGN", "Check Your Values", FRAMEWORK_STEP_IMAGES.alignment],
                ["reflect", "REFLECT", "Act with Purpose", FRAMEWORK_STEP_IMAGES.reflect],
              ] as const
            ).map(([key, title, subtitle, step]) => (
              <AppLink
                key={key}
                to={`/resources/${key === "reflect" ? "reflect" : key}`}
                className="group flex flex-col items-center rounded-3xl p-xl text-center shadow-xl transition-transform hover:scale-[1.02]"
                style={{ backgroundColor: step.bg }}
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white">
                  <img alt="" aria-hidden className="h-10 w-10 object-contain" src={step.icon} />
                </div>
                <h3 className="font-display text-display-lg font-bold text-on-surface">{title}</h3>
                <p className="mb-lg font-body-md text-on-surface opacity-90">{subtitle}</p>
                <img
                  alt=""
                  aria-hidden
                  className="mt-auto w-48 drop-shadow-lg"
                  src={step.amito}
                  loading="lazy"
                  decoding="async"
                />
              </AppLink>
            ))}

            <div className="flex flex-col items-center justify-center rounded-3xl bg-primary-container p-xl text-center text-white shadow-xl">
              <h3 className="mb-md font-display text-display-lg font-bold">Ready to start?</h3>
              <p className="mb-xl font-body-md opacity-90">
                Dive into the full experience and build your digital resilience habit.
              </p>
              <AppLink
                to="/learn"
                className="rounded-full bg-white px-xl py-md font-bold text-primary shadow-xl transition-transform hover:scale-105 active:scale-95"
              >
                Start Learning
              </AppLink>
              <AppLink
                to="/resources"
                className="mt-md flex items-center gap-xs font-label-md uppercase tracking-widest text-white/90 hover:text-white"
              >
                View Detailed Guide
                <Icon name="arrow_forward" className="text-sm" />
              </AppLink>
            </div>
          </div>
        </div>
      </section>

      {/* Comics band */}
      <section className="relative flex min-h-[500px] items-center overflow-hidden px-margin-mobile py-32 md:px-margin-desktop">
        <div className="absolute inset-0 z-0">
          <img
            alt=""
            className="h-full w-full object-cover blur-[2px]"
            src={AMITO_IMAGES.videoTeaser}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-on-surface/90 via-on-surface/70 to-on-surface/40" />
        </div>
        <div className="relative z-10 mx-auto grid max-w-container-max items-center gap-xxl lg:grid-cols-2">
          <div className="rounded-2xl border border-white bg-white/95 p-xl shadow-2xl backdrop-blur-md">
            <h2 className="mb-md font-display text-display-xl text-on-surface">
              Learn through Comics
            </h2>
            <p className="mb-xl text-body-lg text-on-surface-variant">
              Explore real-world digital dilemmas with Amito through engaging visual
              stories. See how Stop & Scan works in action amidst the noise of the
              internet.
            </p>
            <AppLink to="/comics" className="btn-primary inline-flex shadow-xl shadow-primary/20">
              <Icon name="menu_book" />
              Browse Comics
            </AppLink>
          </div>
          <div className="hidden justify-center lg:flex">
            <img
              alt="Amito reading comics"
              className="max-w-md drop-shadow-2xl"
              src={AMITO_IMAGES.comics}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
