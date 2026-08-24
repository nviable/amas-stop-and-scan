import { useState } from "react";
import AppLink from "../AppLink";
import { LOGO_URL, PARTNER_LOGOS } from "../../lib/assets";

const HABIT_QUOTES = [
  "\"I don't know yet\" is a complete and honest answer. Uncertainty, properly calibrated, is protective.",
  "You slowed down when the post wanted speed. That is the habit.",
  "A strong emotional reaction to content is a signal to slow down, not speed up.",
  "The goal isn't to win a fake-spotting game — it's to slow down when something wants you to rush.",
  "You did not outsource judgment to a confident machine. That is the habit.",
  "You separated a trusted face from an untrusted offer. That is the habit.",
] as const;

function pickHabitQuote() {
  return HABIT_QUOTES[Math.floor(Math.random() * HABIT_QUOTES.length)];
}

export const NAV_LINKS = [
  { to: "/learn", label: "Learn" },
  { to: "/practice", label: "Practice" },
  { to: "/resources", label: "Resources" },
  { to: "/comics", label: "Comics" },
  { to: "/project", label: "Project" },
  { to: "/amito", label: "Meet Amito" },
] as const;

export default function SiteFooter() {
  const [habitQuote] = useState(pickHabitQuote);

  return (
    <footer className="bg-inverse-surface text-inverse-on-surface no-print">
      <div className="mx-auto max-w-container-max px-margin-mobile pb-xl pt-xxl md:px-margin-desktop">
        <div className="mb-xxl grid grid-cols-1 gap-xxl md:grid-cols-4">
          <div>
            <div className="mb-lg flex items-center gap-sm">
              <img
                alt="STOP&SCAN logo"
                className="h-8 w-8 brightness-0 invert"
                src={LOGO_URL}
              />
              <span className="font-display text-display-lg text-white">Stop & Scan</span>
            </div>
            <p className="text-body-md text-outline-variant opacity-80">
              Equipping the next generation with the tools to navigate the digital
              frontier with curiosity and critical thought.
            </p>
          </div>

          <div>
            <h4 className="mb-lg font-label-md uppercase tracking-widest text-white">
              Learn
            </h4>
            <ul className="space-y-sm text-body-md text-outline-variant">
              <li>
                <AppLink className="transition-colors hover:text-white" to="/learn">
                  The Framework
                </AppLink>
              </li>
              <li>
                <AppLink className="transition-colors hover:text-white" to="/practice">
                  Case Studies
                </AppLink>
              </li>
              <li>
                <AppLink className="transition-colors hover:text-white" to="/amito">
                  Amito&apos;s Guide
                </AppLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-lg font-label-md uppercase tracking-widest text-white">
              Explore
            </h4>
            <ul className="space-y-sm text-body-md text-outline-variant">
              <li>
                <AppLink className="transition-colors hover:text-white" to="/resources">
                  Resource hub
                </AppLink>
              </li>
              <li>
                <AppLink className="transition-colors hover:text-white" to="/comics">
                  Comics
                </AppLink>
              </li>
              <li>
                <AppLink className="transition-colors hover:text-white" to="/journal">
                  My Journal
                </AppLink>
              </li>
              <li>
                <AppLink className="transition-colors hover:text-white" to="/styleguide">
                  Style guide
                </AppLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-lg font-label-md uppercase tracking-widest text-white">
              The habit
            </h4>
            <p className="text-body-md italic text-outline-variant opacity-90">{habitQuote}</p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-xl">
          <p className="mb-lg font-label-md uppercase tracking-widest text-white">
            In partnership with
          </p>
          <ul
            className="mb-xl flex flex-wrap items-center justify-center gap-md md:justify-start"
            aria-label="Partner organizations"
          >
            {PARTNER_LOGOS.map((partner) => (
              <li key={partner.name}>
                <a
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-16 items-center rounded-xl bg-background-paper px-md py-sm transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverse-primary"
                >
                  <img
                    alt={partner.name}
                    className="h-10 w-auto max-w-[11rem] object-contain"
                    src={partner.src}
                    width={partner.width}
                    height={partner.height}
                    loading="lazy"
                    decoding="async"
                  />
                </a>
              </li>
            ))}
          </ul>
          <p className="text-center font-label-md text-outline-variant md:text-left">
            © 2026 STOP&SCAN is a project of the <a href="https://aiforgood.itu.int/multimedia-authenticity/amas-young-researcher-associate-programme/" target="_blank" rel="noopener noreferrer">AI for Good AMAS YRAP 2026 Cohort</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
