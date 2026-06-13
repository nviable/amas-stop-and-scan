import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const links = [
  { to: "/learn", label: "Learn" },
  { to: "/practice", label: "Practice" },
  { to: "/resources", label: "Resources" },
  { to: "/project", label: "Project" },
  { to: "/amito", label: "Meet Amito" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-[#fbf8f2]/85 backdrop-blur no-print">
      <nav className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink text-sm font-extrabold text-white">
            A
          </span>
          <span className="text-lg font-extrabold tracking-tight">
            STOP<span className="text-alignment">&</span>SCAN
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                  isActive
                    ? "bg-ink text-white"
                    : "text-ink/70 hover:bg-ink/5 hover:text-ink"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/journal" className="btn-accent ml-2 px-4 py-2 text-sm">
            My Journal
          </Link>
        </div>

        <button
          className="md:hidden rounded-lg border border-ink/15 p-2"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className="block h-0.5 w-6 bg-ink" />
            <span className="block h-0.5 w-6 bg-ink" />
            <span className="block h-0.5 w-6 bg-ink" />
          </div>
        </button>
      </nav>

      {open && (
        <div className="border-t border-ink/10 bg-[#fbf8f2] md:hidden">
          <div className="container-page flex flex-col gap-1 py-3">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-2.5 font-bold ${
                    isActive ? "bg-ink text-white" : "text-ink/80"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/journal"
              onClick={() => setOpen(false)}
              className="btn-accent mt-1"
            >
              My Journal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
