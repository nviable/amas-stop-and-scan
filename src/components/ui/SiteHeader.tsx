import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
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
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 z-[70] w-full border-b border-on-surface/10 bg-background-paper/90 backdrop-blur-md no-print">
        <div className="mx-auto flex h-20 max-w-container-max items-center justify-between px-margin-mobile md:px-margin-desktop">
          <Link to="/" className="flex shrink-0 items-center" onClick={() => setMenuOpen(false)}>
            <img
              alt="STOP&SCAN logo"
              className="h-12 w-12 object-contain"
              src={LOGO_URL}
            />
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
            <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} />
          </div>
        </div>
      </header>

      <MobileMenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

function MenuToggle({ open }: { open: boolean }) {
  const bar =
    "absolute left-0 block h-0.5 w-6 origin-center rounded-full bg-on-surface transition-all duration-300 ease-in-out";

  return (
    <span className="relative block h-[18px] w-6" aria-hidden>
      <span className={`${bar} ${open ? "top-2 rotate-45" : "top-0"}`} />
      <span
        className={`${bar} top-2 ${open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"}`}
      />
      <span className={`${bar} ${open ? "top-2 -rotate-45" : "top-4"}`} />
    </span>
  );
}

function MobileMenu({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <button
      type="button"
      className="relative z-[80] rounded-lg border border-on-surface/15 p-2.5 md:hidden"
      aria-expanded={open}
      aria-controls="mobile-nav"
      aria-label={open ? "Close menu" : "Open menu"}
      onClick={() => onOpenChange(!open)}
    >
      <MenuToggle open={open} />
    </button>
  );
}

function MobileMenuOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const location = useLocation();
  const pathnameRef = useRef(location.pathname);

  useEffect(() => {
    if (pathnameRef.current !== location.pathname) {
      onClose();
      pathnameRef.current = location.pathname;
    }
  }, [location.pathname, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <div
      id="mobile-nav"
      className={`fixed inset-0 z-[60] flex flex-col bg-background-paper transition-opacity duration-300 ease-in-out md:hidden ${
        open ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      <div className="h-20 shrink-0 border-b border-on-surface/10" aria-hidden />

      <nav className="flex flex-1 flex-col justify-center gap-sm px-margin-mobile py-xl">
        {NAV_LINKS.map(({ to, label }, index) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            style={{ transitionDelay: open ? `${index * 40}ms` : "0ms" }}
            className={({ isActive }) =>
              `block rounded-2xl px-lg py-md font-display text-headline-md transition-all duration-300 ease-out ${
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              } ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-on-surface hover:bg-surface-container-low"
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <div
        className={`border-t border-on-surface/10 px-margin-mobile py-xl transition-all duration-300 ease-out ${
          open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
        style={{ transitionDelay: open ? "240ms" : "0ms" }}
      >
        <Link
          to="/journal"
          onClick={onClose}
          className="btn-primary flex w-full justify-center py-md text-center"
        >
          My Journal
        </Link>
      </div>
    </div>
  );
}
