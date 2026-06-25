import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import SiteFooter from "./ui/SiteFooter";
import SiteHeader from "./ui/SiteHeader";

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  const isLesson =
    pathname.includes("/practice/") &&
    !pathname.endsWith("/practice") &&
    pathname.split("/").length > 2;

  return (
    <div className="paper-texture flex min-h-screen flex-col">
      <SiteHeader />
      <main className={`flex-1 ${isLesson ? "pt-24" : "pt-20"}`}>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
