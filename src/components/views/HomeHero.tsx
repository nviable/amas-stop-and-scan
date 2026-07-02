import AppLink from "../AppLink";
import AmitoSpotlight from "../AmitoSpotlight";
import HeroSection from "../ui/HeroSection";
import Icon from "../ui/Icon";
import { AMITO_IMAGES, LOGO_URL } from "../../lib/assets";

export default function HomeHero() {
  return (
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
            width={512}
            height={512}
            decoding="async"
            fetchPriority="high"
          />
          <h1 className="font-display text-headline-md text-on-surface md:text-display-lg">
            Empowering Digital Resilience
          </h1>
          <p className="mt-sm max-w-md text-body-md text-on-surface-variant md:text-body-lg">
            <span className="font-semibold text-on-surface">STOP&SCAN</span> is a five-step habit
            for pausing before you trust what you see online. Join Amito to practice pause, verify,
            analyze, align, and reflect.
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
  );
}
