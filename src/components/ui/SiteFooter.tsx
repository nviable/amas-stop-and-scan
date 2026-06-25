import { Link } from "react-router-dom";
import Icon from "./Icon";
import { PROJECT_MEMBERS } from "../../data/projectMembers";
import { LOGO_URL } from "../../lib/assets";

export const NAV_LINKS = [
  { to: "/learn", label: "Learn" },
  { to: "/practice", label: "Practice" },
  { to: "/resources", label: "Resources" },
  { to: "/comics", label: "Comics" },
  { to: "/project", label: "Project" },
  { to: "/amito", label: "Meet Amito" },
] as const;

export default function SiteFooter() {
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
                <Link className="transition-colors hover:text-white" to="/learn">
                  The Framework
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-white" to="/practice">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-white" to="/amito">
                  Amito&apos;s Guide
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-lg font-label-md uppercase tracking-widest text-white">
              Explore
            </h4>
            <ul className="space-y-sm text-body-md text-outline-variant">
              <li>
                <Link className="transition-colors hover:text-white" to="/resources">
                  Resource hub
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-white" to="/comics">
                  Comics
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-white" to="/journal">
                  My Journal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-lg font-label-md uppercase tracking-widest text-white">
              The habit
            </h4>
            <p className="text-body-md italic text-outline-variant opacity-90">
              &ldquo;I don&apos;t know yet&rdquo; is a complete and honest answer.
              Uncertainty, properly calibrated, is protective.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-lg border-t border-white/10 pt-xl md:flex-row">
          <p className="text-center font-label-md text-outline-variant md:text-left">
            © 2026 STOP&SCAN AI for Good AMAS YRAP 2026 Cohort
          </p>
          <div className="flex flex-wrap items-center justify-center gap-lg">
            {PROJECT_MEMBERS.map((member) => (
              <div key={member.key} className="flex items-center gap-sm">
                <span className="font-label-md text-outline-variant">{member.name.split(" ")[0]}</span>
                <a
                  href={member.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-outline-variant transition-colors hover:text-white"
                  aria-label={`${member.name} website`}
                >
                  <Icon name="language" className="text-lg" />
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-outline-variant transition-colors hover:text-white"
                  aria-label={`${member.name} on LinkedIn`}
                >
                  <Icon name="linkedin" className="text-lg" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
