import { Link } from "react-router-dom";
import AmitoSpotlight from "../components/AmitoSpotlight";
import { HeroBadge, SpeechBubble } from "../components/ui/PageSections";
import HeroSection from "../components/ui/HeroSection";
import Icon from "../components/ui/Icon";
import { AMITO_IMAGES } from "../lib/assets";
import { CASES } from "../data/cases";

const DIFFICULTY_STYLE: Record<string, string> = {
  intro: "bg-content-green/15 text-content-green border-content-green/20",
  core: "bg-primary/15 text-primary border-primary/20",
  advanced: "bg-reflect-orange/15 text-reflect-orange border-reflect-orange/20",
};

export default function Practice() {
  return (
    <div>
      <HeroSection className="overflow-visible px-margin-mobile pb-xl pt-xxl md:px-margin-desktop">
        <div className="mx-auto flex max-w-container-max flex-col items-center gap-xl md:flex-row">
          <div className="z-10 flex-1 space-y-lg text-center md:text-left">
            <HeroBadge icon="lightbulb" label="Practice Lab" />
            <h1 className="font-display text-display-xl text-on-background">Case Files</h1>
            <p className="max-w-xl text-body-lg text-on-surface-variant">
              Practice spotting manipulation with real-world examples. Fewer cues, no
              hand-holding — just your skills and the framework.
            </p>
          </div>
          <AmitoSpotlight
            className="flex-1"
            src={AMITO_IMAGES.source}
            alt="Amito analytical pose"
            imageClassName="relative z-10 max-w-sm scale-110 object-contain drop-shadow-xl md:translate-x-12"
            glow="lilac"
          />
        </div>
      </HeroSection>

      <section className="px-margin-desktop py-xxl">
        <div className="mx-auto max-w-container-max">
          <div className="mb-xl flex items-end justify-between">
            <h2 className="font-display text-headline-md text-on-background">
              Available Simulations
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-lg md:grid-cols-2 lg:grid-cols-4">
            {CASES.map((c) => (
              <div
                key={c.id}
                className="group flex h-full flex-col rounded-xxl card-hairline bg-surface-container-lowest p-lg transition-all duration-300 hover:shadow-xl"
              >
                <div className="mb-md flex items-start justify-between">
                  <span
                    className={`rounded-full border px-md py-xs font-label-md uppercase ${DIFFICULTY_STYLE[c.difficulty] ?? DIFFICULTY_STYLE.intro}`}
                  >
                    {c.difficulty}
                  </span>
                  <div className="flex items-center gap-xs text-on-surface-variant">
                    <Icon name="schedule" className="text-[18px]" />
                    <span className="font-label-md">{c.estMinutes} min</span>
                  </div>
                </div>
                <h3 className="mb-sm font-display text-headline-md transition-colors group-hover:text-primary">
                  {c.title}
                </h3>
                <p className="mb-xl flex-grow text-body-sm text-on-surface-variant">
                  {c.summary}
                </p>
                <Link
                  to={`/practice/${c.slug}`}
                  className="btn-primary w-full justify-center py-md text-label-md shadow-md"
                >
                  Begin Case
                  <Icon name="arrow_forward" className="text-[18px]" />
                </Link>
              </div>
            ))}

            <div className="flex h-full flex-col items-center justify-center rounded-xxl border-2 border-dashed border-outline-variant bg-surface-cream/50 p-lg text-center">
              <div className="mb-md rounded-full bg-white p-xl shadow-soft">
                <Icon name="robot_2" className="text-xxl text-outline" />
              </div>
              <h3 className="mb-sm font-display text-headline-md text-outline">More coming soon</h3>
              <p className="px-md text-body-sm text-outline">
                More case files are on the way — including examples where careful scanning
                means trusting content, not only spotting problems.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-margin-desktop py-xxl">
        <div className="relative mx-auto flex max-w-container-max flex-col items-center gap-xl overflow-hidden rounded-[32px] bg-surface-cream p-xl md:flex-row md:p-xxl">
          <div className="z-10 flex-1 space-y-md">
            <h2 className="font-display text-display-lg text-on-background">
              Mastered the basics?
            </h2>
            <p className="text-body-lg text-on-surface-variant">
              Keep practicing with fewer cues. Each case ends with a reflection you can
              save to your journal.
            </p>
            <Link to="/journal" className="btn-inverse inline-flex">
              Open My Journal
            </Link>
          </div>
          <SpeechBubble tail="left" className="z-10 max-w-xs p-xl shadow-lg">
            &ldquo;Every expert was once a beginner who didn&apos;t quit scanning!&rdquo;
          </SpeechBubble>
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-lilac-accent/20 blur-[80px]" />
        </div>
      </section>
    </div>
  );
}
