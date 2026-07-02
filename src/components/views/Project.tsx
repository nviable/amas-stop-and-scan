import HeroSection from "../ui/HeroSection";
import Icon from "../ui/Icon";
import AmitoSpotlight from "../AmitoSpotlight";
import { CtaBanner, HeroBadge } from "../ui/PageSections";
import { PROJECT_MEMBERS } from "../../data/projectMembers";
import { AMITO_IMAGES } from "../../lib/assets";

const DIFFERENTIATORS = [
  {
    icon: "psychology",
    iconClass: "bg-stop-red/10 text-stop-red",
    title: "Reasoning-Based",
    body: "Moves beyond binary 'true/false' to understanding context and intent.",
  },
  {
    icon: "verified_user",
    iconClass: "bg-content-green/10 text-content-green",
    title: "Trust Calibration",
    body: "Helping you decide how much weight to give to a specific piece of media.",
  },
] as const;

const PROJECT_MENTORS = [
  {
    name: "Alessandra Sala",
    detail:
      "Dir of AI and Data Science at Shutterstock, Global President of Women in AI, Co-chair Women4ethical AI",
  },
  { name: "Alexandra Trifan", detail: "Director of Operations, Datambit" },
] as const;

export default function Project() {
  return (
    <div>
      <HeroSection className="overflow-visible px-margin-mobile pb-xl pt-xxl md:px-margin-desktop">
        <div className="relative z-10 mx-auto flex max-w-container-max flex-col items-center gap-xl md:flex-row">
          <div className="flex-1 space-y-lg">
            <HeroBadge icon="auto_awesome" label="The Mission" />
            <h1 className="font-display text-display-xl leading-tight text-on-surface">
              About the Project
            </h1>
            <p className="max-w-2xl text-body-lg text-on-surface-variant">
              Stop & Scan is more than an educational tool; it&apos;s a sensemaking framework
              designed for{" "}
              <span className="font-semibold text-primary">trust calibration</span>. We empower
              users to slow down, engage their reasoning, and navigate the complex landscape of
              digital information with confidence.
            </p>
          </div>
          <AmitoSpotlight
            className="flex-1"
            src={AMITO_IMAGES.project}
            alt="Amito thoughtful pose"
            imageClassName="relative z-10 w-64 drop-shadow-2xl"
            glow="primary"
            glowClassName="bg-primary/15 blur-[80px]"
            speech="Let's look behind the curtain together!"
            speechPlacement="upper-right"
            speechTail="left"
          />
        </div>
      </HeroSection>

      <section className="bg-surface-cream/30 px-margin-mobile py-xxl md:px-margin-desktop">
        <div className="mx-auto max-w-container-max">
          <div className="grid items-center gap-xxl md:grid-cols-2">
            <div className="space-y-md">
              <h2 className="font-display text-display-lg text-on-surface">
                Why a framework, not just a detector?
              </h2>
              <div className="h-1.5 w-20 rounded-full bg-stop-red" />
              <p className="text-body-lg leading-relaxed text-on-surface-variant">
                In an era of rapidly evolving synthetic media, relying on detection tools alone is
                a losing game — but paired with human reasoning, those same tools become far more
                effective. Technologies change, while human psychology and manipulation patterns
                stay consistent.
                <br />
                <br />
                Stop & Scan shifts the focus from{" "}
                <span className="italic">&ldquo;Is this real?&rdquo;</span> to{" "}
                <span className="font-semibold text-primary">
                  &ldquo;How is this trying to influence me?&rdquo;
                </span>
                . By teaching reasoning-based strategies, we provide a durable defense that
                outlasts any single algorithm — and makes the detection tools and provenance
                signals you do use more effective.
              </p>
            </div>
            <div className="grid gap-md">
              {DIFFERENTIATORS.map((d) => (
                <DifferentiatorCard key={d.title} {...d} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-on-background px-margin-mobile py-xxl text-on-primary md:px-margin-desktop">
        <div className="mx-auto max-w-container-max space-y-xxl">
          <div>
            <h2 className="mb-xl text-center font-display text-display-lg">Project Members</h2>
            <div className="grid gap-xl md:grid-cols-3">
              {PROJECT_MEMBERS.map((member) => (
                <div key={member.name} className="group text-center">
                  <div className="mx-auto mb-lg h-32 w-32 overflow-hidden rounded-full ring-4 ring-primary-fixed/20 transition-all group-hover:ring-primary-fixed">
                    <img
                      alt={member.name}
                      className="h-full w-full object-cover"
                      src={member.photo}
                    />
                  </div>
                  <h4 className="font-display text-headline-md">{member.name}</h4>
                  <p className="mt-1 text-body-sm opacity-70">{member.role}</p>
                  <div className="mt-md flex flex-wrap items-center justify-center gap-sm">
                    <a
                      href={member.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-on-primary/70 transition-colors hover:text-on-primary"
                      aria-label={`${member.name} website`}
                    >
                      <Icon name="language" className="text-xl" />
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-on-primary/70 transition-colors hover:text-on-primary"
                      aria-label={`${member.name} on LinkedIn`}
                    >
                      <Icon name="linkedin" className="text-xl" />
                    </a>
                    {"openToWork" in member && member.openToWork && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-full border border-content-green/50 bg-content-green/15 px-sm py-0.5 text-[10px] font-bold uppercase tracking-wide text-content-green transition-colors hover:border-content-green hover:bg-content-green/25"
                        aria-label={`${member.name} is open to work — view LinkedIn`}
                      >
                        Open to work
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px w-full bg-white/10" />

          <div>
            <h3 className="mb-xl text-center font-display text-display-lg">Project Mentors</h3>
            <div className="flex flex-wrap justify-center gap-xl">
              {PROJECT_MENTORS.map((mentor) => (
                <div
                  key={mentor.name}
                  className="rounded-2xl border border-white/10 bg-white/5 px-xl py-lg text-center transition-colors hover:bg-white/10"
                >
                  <p className="font-display text-headline-md">{mentor.name}</p>
                  <p className="mt-1 text-body-sm opacity-60">{mentor.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-cream px-margin-mobile py-xxl text-on-surface md:px-margin-desktop">
        <div className="mx-auto max-w-container-max space-y-lg text-center">
          <h2 className="font-display text-display-lg">Global Alignment</h2>
          <p className="mx-auto max-w-2xl text-body-lg text-on-surface-variant">
            Our project is committed to fostering a more resilient and informed society, aligning
            with the United Nations Sustainable Development Goals.
          </p>
          <div className="mt-xl flex justify-center gap-xl">
            <div className="flex flex-col items-center gap-sm">
              <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-[#c5192d] font-display text-display-lg font-bold text-white shadow-lg">
                4
              </div>
              <span className="font-label-md">Quality Education</span>
            </div>
            <div className="flex flex-col items-center gap-sm">
              <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-[#00689d] font-display text-display-lg font-bold text-white shadow-lg">
                16
              </div>
              <span className="font-label-md">Peace & Justice</span>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Ready to sharpen your scan?"
        description="Start your journey into trust calibration today with our interactive framework."
        to="/learn"
        label="Try the framework"
      />
    </div>
  );
}

function DifferentiatorCard({
  icon,
  iconClass,
  title,
  body,
}: {
  icon: string;
  iconClass: string;
  title: string;
  body: string;
}) {
  return (
    <div className="flex items-start gap-md rounded-xl border border-on-surface/10 bg-white p-lg shadow-soft">
      <div className={`rounded-lg p-sm ${iconClass}`}>
        <Icon name={icon} />
      </div>
      <div>
        <h4 className="font-display text-headline-md text-on-surface">{title}</h4>
        <p className="mt-1 text-body-sm text-on-surface-variant">{body}</p>
      </div>
    </div>
  );
}
