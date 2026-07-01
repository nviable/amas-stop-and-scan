import { useEffect, useRef, useState } from "react";
import AppLink from "../AppLink";
import AppNavLink from "../AppNavLink";
import { NAV_LINKS } from "../../lib/nav";

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

export default function MobileNav({ currentPath }: { currentPath: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathnameRef = useRef(currentPath);

  useEffect(() => {
    if (pathnameRef.current !== currentPath) {
      setMenuOpen(false);
      pathnameRef.current = currentPath;
    }
  }, [currentPath]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <>
      <button
        type="button"
        className="relative z-[80] rounded-lg border border-on-surface/15 p-2.5 md:hidden"
        aria-expanded={menuOpen}
        aria-controls="mobile-nav"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <MenuToggle open={menuOpen} />
      </button>

      <div
        id="mobile-nav"
        className={`fixed inset-0 z-[60] flex flex-col bg-background-paper transition-opacity duration-300 ease-in-out md:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="h-20 shrink-0 border-b border-on-surface/10" aria-hidden />

        <nav className="flex flex-1 flex-col justify-center gap-sm px-margin-mobile py-xl">
          {NAV_LINKS.map(({ to, label }, index) => (
            <AppNavLink
              key={to}
              to={to}
              currentPath={currentPath}
              onClick={() => setMenuOpen(false)}
              style={{ transitionDelay: menuOpen ? `${index * 40}ms` : "0ms" }}
              activeClassName="block rounded-2xl px-lg py-md font-display text-headline-md transition-all duration-300 ease-out bg-primary/10 text-primary"
              inactiveClassName="block rounded-2xl px-lg py-md font-display text-headline-md transition-all duration-300 ease-out text-on-surface hover:bg-surface-container-low"
              className={`${menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
            >
              {label}
            </AppNavLink>
          ))}
        </nav>

        <div
          className={`border-t border-on-surface/10 px-margin-mobile py-xl transition-all duration-300 ease-out ${
            menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
          style={{ transitionDelay: menuOpen ? "240ms" : "0ms" }}
        >
          <AppLink
            to="/journal"
            onClick={() => setMenuOpen(false)}
            className="btn-primary flex w-full justify-center py-md text-center"
          >
            My Journal
          </AppLink>
        </div>
      </div>
    </>
  );
}
