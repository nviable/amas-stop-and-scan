import { Link, NavLink } from "react-router-dom";
import Icon from "./Icon";
import { LOGO_URL } from "../../lib/assets";

export const NAV_LINKS = [
  { to: "/learn", label: "Learn" },
  { to: "/practice", label: "Practice" },
  { to: "/resources", label: "Resources" },
  { to: "/comics", label: "Comics" },
  { to: "/project", label: "Project" },
  { to: "/amito", label: "Meet Amito" },
] as const;

export default function SiteHeader() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-on-surface/10 bg-background-paper/90 backdrop-blur-md no-print">
      <div className="mx-auto flex h-20 max-w-container-max items-center justify-between px-margin-mobile md:px-margin-desktop">
        <Link to="/" className="flex shrink-0 items-center">
          <img alt="STOP&SCAN" className="h-12 w-12 object-contain" src={LOGO_URL} />
        </Link>

        <nav className="hidden items-center gap-xl md:flex">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive ? "nav-link nav-link-active" : "nav-link"
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-md">
          <Link
            to="/journal"
            className="hidden rounded-full bg-primary px-lg py-sm font-label-md uppercase tracking-wide text-on-primary transition-all hover:opacity-90 active:scale-95 sm:inline-flex"
          >
            My Journal
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

function MobileMenu() {
  return (
    <details className="relative md:hidden">
      <summary className="cursor-pointer list-none rounded-lg border border-on-surface/15 p-2">
        <Icon name="menu" className="text-xl" />
      </summary>
      <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-2xl border border-on-surface/10 bg-white p-3 shadow-card">
        {NAV_LINKS.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className="block rounded-xl px-4 py-2.5 font-label-md uppercase tracking-wide text-on-surface-variant hover:bg-surface-container-low"
          >
            {label}
          </Link>
        ))}
        <Link
          to="/journal"
          className="mt-1 block rounded-xl bg-primary px-4 py-2.5 text-center font-label-md uppercase tracking-wide text-on-primary"
        >
          My Journal
        </Link>
      </div>
    </details>
  );
}
