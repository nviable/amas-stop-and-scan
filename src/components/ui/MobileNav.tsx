import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import AppLink from "../AppLink";
import AppNavLink from "../AppNavLink";
import { LOGO_URL } from "../../lib/assets";
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
  const [mounted, setMounted] = useState(false);
  const pathnameRef = useRef(currentPath);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const closeMenu = () => setMenuOpen(false);

  const overlay =
    mounted &&
    createPortal(
      <div
        id="mobile-nav"
        className={`paper-texture fixed inset-0 z-[75] flex flex-col bg-background-paper transition-[visibility,opacity] duration-300 ease-in-out md:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-on-surface/10 px-margin-mobile">
          <AppLink
            to="/"
            onClick={closeMenu}
            className="flex shrink-0 items-center"
            aria-label="STOP&SCAN home"
          >
            <img
              alt="STOP&SCAN logo"
              className="h-12 w-12 object-contain"
              src={LOGO_URL}
              width={512}
              height={512}
              decoding="async"
            />
          </AppLink>
          <button
            type="button"
            className="rounded-lg border border-on-surface/15 p-2.5"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label="Close menu"
            onClick={closeMenu}
          >
            <MenuToggle open />
          </button>
        </div>

        <nav className="flex flex-1 flex-col justify-center gap-sm px-margin-mobile py-xl">
          {NAV_LINKS.map(({ to, label }, index) => (
            <AppNavLink
              key={to}
              to={to}
              currentPath={currentPath}
              onClick={closeMenu}
              style={{ transitionDelay: menuOpen ? `${80 + index * 50}ms` : "0ms" }}
              activeClassName="block rounded-2xl px-lg py-md font-display text-headline-md transition-all duration-300 ease-out bg-primary/10 text-primary"
              inactiveClassName="block rounded-2xl px-lg py-md font-display text-headline-md transition-all duration-300 ease-out text-on-surface hover:bg-surface-container-low"
              className={`transform transition-all duration-300 ease-out ${
                menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              {label}
            </AppNavLink>
          ))}
        </nav>

        <div
          className={`border-t border-on-surface/10 px-margin-mobile py-xl transition-all duration-300 ease-out ${
            menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: menuOpen ? "380ms" : "0ms" }}
        >
          <AppLink
            to="/journal"
            onClick={closeMenu}
            className="btn-primary flex w-full justify-center py-md text-center"
          >
            My Journal
          </AppLink>
        </div>
      </div>,
      document.body,
    );

  return (
    <>
      <button
        type="button"
        className="relative z-[80] rounded-lg border border-on-surface/15 p-2.5 md:hidden"
        aria-expanded={menuOpen}
        aria-controls="mobile-nav"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <MenuToggle open={menuOpen} />
      </button>
      {overlay}
    </>
  );
}
