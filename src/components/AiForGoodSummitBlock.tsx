import Icon from "./ui/Icon";
import { SUMMIT_BANNER } from "../lib/assets";

const SUMMIT_LINKS = [
  {
    title: "Read the ITU feature",
    description:
      "From deepfakes to digital trust — how AI natives are tackling misinformation at AI for Good.",
    href: "https://www.itu.int/hub/2026/07/from-deepfakes-to-digital-trust-ai-natives-tackle-misinformation-at-ai-for-good/",
    icon: "menu_book",
  },
  {
    title: "Join our session",
    description:
      "AI and multimedia authenticity standards — Stop & Scan presented on 9 July, 13:00–16:15 CEST, Geneva.",
    href: "https://aiforgood.itu.int/event/ai-and-multimedia-authenticity-standards-2/",
    icon: "schedule",
  },
] as const;

type AiForGoodSummitBlockProps = {
  className?: string;
};

export default function AiForGoodSummitBlock({ className = "" }: AiForGoodSummitBlockProps) {
  return (
    <section
      className={`bg-on-surface px-margin-mobile py-xl md:px-margin-desktop ${className}`.trim()}
      aria-labelledby="summit-block-heading"
    >
      <div className="mx-auto max-w-container-max">
        <div className="overflow-hidden rounded-xxl border border-white/10 bg-black shadow-card">
          <div className="relative">
            <img
              src={SUMMIT_BANNER}
              alt="AI for Good Global Summit 2026 — AI and multimedia authenticity standards featuring STOP&SCAN"
              className="aspect-[16/9] w-full object-cover object-center"
              loading="eager"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-md md:p-lg">
              <span className="inline-flex items-center gap-xs rounded-full bg-white/15 px-md py-xs font-label-md uppercase tracking-widest text-white backdrop-blur-sm">
                <Icon name="explore" className="text-sm" />
                This week · Geneva
              </span>
              <h2
                id="summit-block-heading"
                className="mt-sm font-display text-headline-md text-white md:text-display-lg"
              >
                AI for Good Global Summit 2026
              </h2>
              <p className="mt-xs max-w-2xl text-body-sm text-white/80 md:text-body-md">
                7–10 July 2026 · Our Stop & Scan project is featured at the summit — catch the
                session on multimedia authenticity standards.
              </p>
            </div>
          </div>

          <div className="grid gap-sm p-md md:grid-cols-2 md:gap-md md:p-lg">
            {SUMMIT_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-md rounded-xl border border-white/10 bg-white/5 p-md transition-colors hover:border-white/25 hover:bg-white/10"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary-fixed">
                  <Icon name={link.icon} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-headline-sm text-white group-hover:text-primary-fixed">
                    {link.title}
                    <Icon
                      name="open_in_new"
                      className="ml-xs inline text-sm opacity-70 transition-opacity group-hover:opacity-100"
                    />
                  </p>
                  <p className="mt-xs text-body-sm leading-relaxed text-white/70">{link.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
