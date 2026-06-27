import { useEffect, useRef, useState, type ComponentProps, type ReactNode } from "react";
import { initHeroFluid } from "../../lib/heroFluid";

type HeroSectionProps = ComponentProps<"section"> & {
  children: ReactNode;
  background?: "gradient" | "home";
  enableSmoke?: boolean;
};

export default function HeroSection({
  children,
  className = "",
  background = "gradient",
  enableSmoke = true,
  ...props
}: HeroSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [motionOk, setMotionOk] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMotionOk(!media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enableSmoke || !motionOk) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      return initHeroFluid(canvas);
    } catch {
      return undefined;
    }
  }, [enableSmoke, motionOk]);

  const backgroundClass =
    background === "home"
      ? "bg-gradient-to-br from-primary/5 via-welcome-blue/10 to-white"
      : "hero-gradient";

  return (
    <section
      className={`hero-section relative overflow-hidden ${backgroundClass} ${className}`.trim()}
      {...props}
    >
      {enableSmoke && motionOk && (
        <canvas
          ref={canvasRef}
          aria-hidden
          className="hero-smoke-canvas pointer-events-none absolute inset-0 z-0 h-full w-full opacity-75"
        />
      )}
      {children}
    </section>
  );
}
