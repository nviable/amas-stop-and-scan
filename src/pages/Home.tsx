import { Link } from "react-router-dom";
import AmitoSpotlight from "../components/AmitoSpotlight";
import Icon from "../components/ui/Icon";
import { AMITO_IMAGES, FRAMEWORK_STEP_IMAGES } from "../lib/assets";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-welcome-blue/10 to-white px-margin-mobile py-xxl md:px-margin-desktop md:py-32">
        <div className="mx-auto grid max-w-container-max items-center gap-xl md:grid-cols-2">
          <div className="z-10">
            <div className="mb-md inline-flex items-center gap-sm rounded-full border border-lilac-accent/20 bg-lilac-accent/10 px-md py-xs text-on-surface-variant">
              <Icon name="auto_awesome" className="text-lilac-accent" />
              <span className="font-label-md uppercase tracking-widest">
                Powered by AI for Good
              </span>
            </div>
            <h1 className="font-display text-display-xl leading-tight text-on-surface">
              Empowering Digital Resilience
            </h1>
            <p className="mt-lg max-w-lg text-body-lg text-on-surface-variant">
              Join Amito on a journey to navigate the digital world with confidence.
              Learn to pause, process, and act with clarity in the age of information
              overload.
            </p>
            <div className="mt-xxl flex flex-wrap gap-md">
              <Link to="/learn" className="btn-primary shadow-2xl shadow-primary/30">
                Start Learning
              </Link>
              <Link to="/practice" className="btn-accent">
                <Icon name="explore" />
                Practice
              </Link>
            </div>
          </div>

          <AmitoSpotlight
            src={AMITO_IMAGES.greeting}
            alt="Amito waving"
            float
            glow="primary"
            glowClassName="scale-125 -translate-y-8 bg-gradient-to-tr from-primary/20 via-welcome-blue/10 to-transparent blur-3xl"
            speech="Hi! I'm Amito. Let's learn how to spot tricky content together!"
            speechTail="bottom"
            speechClassName="absolute -right-4 top-0 z-20 max-w-[240px] md:-right-8"
          />
        </div>
      </section>

      {/* Video teaser */}
      <section className="bg-surface-container-low px-margin-mobile py-xl md:px-margin-desktop">
        <div className="mx-auto max-w-4xl">
          <div className="group relative aspect-video cursor-pointer overflow-hidden rounded-3xl border-4 border-white/50 bg-inverse-surface shadow-2xl">
            <img
              alt="Meet Amito teaser"
              className="h-full w-full object-cover"
              src={AMITO_IMAGES.videoTeaser}
            />
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/10">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-on-primary shadow-2xl transition-transform group-hover:scale-110">
                <Icon name="play_arrow" className="text-4xl" filled />
              </div>
            </div>
            <div className="absolute bottom-lg left-lg z-10">
              <span className="rounded-full bg-white/90 px-md py-xs font-label-md uppercase tracking-wider text-primary backdrop-blur-md">
                Teaser Video: Meet Amito
              </span>
            </div>
          </div>
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
                ["stop", "STOP", "Reclaim Your Attention", "text-white", FRAMEWORK_STEP_IMAGES.stop],
                ["source", "SOURCE", "Verify the Origin", "text-on-surface", FRAMEWORK_STEP_IMAGES.source],
                ["content", "CONTENT", "Analyze the Message", "text-on-surface", FRAMEWORK_STEP_IMAGES.content],
                ["alignment", "ALIGN", "Check Your Values", "text-white", FRAMEWORK_STEP_IMAGES.alignment],
                ["reflect", "REFLECT", "Act with Purpose", "text-white", FRAMEWORK_STEP_IMAGES.reflect],
              ] as const
            ).map(([key, title, subtitle, textClass, step]) => (
              <Link
                key={key}
                to={`/resources/${key === "reflect" ? "reflect" : key}`}
                className="group flex flex-col items-center rounded-3xl p-xl text-center shadow-xl transition-transform hover:scale-[1.02]"
                style={{ backgroundColor: step.bg }}
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white">
                  <img alt="" className="h-10 w-10 object-contain" src={step.icon} />
                </div>
                <h3 className={`font-display text-display-lg font-bold ${textClass}`}>{title}</h3>
                <p className={`mb-lg font-body-md opacity-90 ${textClass}`}>{subtitle}</p>
                <img
                  alt=""
                  className="mt-auto w-48 drop-shadow-lg"
                  src={step.amito}
                />
              </Link>
            ))}

            <div className="flex flex-col items-center justify-center rounded-3xl bg-primary-container p-xl text-center text-white shadow-xl">
              <h3 className="mb-md font-display text-display-lg font-bold">Ready to start?</h3>
              <p className="mb-xl font-body-md opacity-90">
                Dive into the full experience and build your digital resilience habit.
              </p>
              <Link
                to="/learn"
                className="rounded-full bg-white px-xl py-md font-bold text-primary shadow-xl transition-transform hover:scale-105 active:scale-95"
              >
                Start Learning
              </Link>
              <Link
                to="/resources"
                className="mt-md flex items-center gap-xs font-label-md uppercase tracking-widest text-white/90 hover:text-white"
              >
                View Detailed Guide
                <Icon name="arrow_forward" className="text-sm" />
              </Link>
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
            <Link to="/comics" className="btn-primary inline-flex shadow-xl shadow-primary/20">
              <Icon name="menu_book" />
              Browse Comics
            </Link>
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
