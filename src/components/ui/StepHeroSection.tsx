import { useEffect, useRef, type ComponentProps, type ReactNode } from "react";
import { initHeroGrid } from "../../lib/heroGrid";
import { stepByKey, type StepKey } from "../../lib/framework";

const TEXT_LIGHT: Record<StepKey, boolean> = {
  stop: true,
  source: false,
  content: false,
  alignment: true,
  reflect: true,
};

type StepHeroSectionProps = ComponentProps<"section"> & {
  stepKey: StepKey;
  backgroundColor: string;
  children: ReactNode;
  enableGrid?: boolean;
};

export default function StepHeroSection({
  stepKey,
  backgroundColor,
  children,
  className = "",
  enableGrid = true,
  ...props
}: StepHeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const meta = stepByKey(stepKey);

  useEffect(() => {
    if (!enableGrid) return;
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    try {
      return initHeroGrid(canvas, section, {
        accentHex: meta.hex,
        lightBackground: TEXT_LIGHT[stepKey],
        variant: stepKey,
      });
    } catch {
      return undefined;
    }
  }, [enableGrid, meta.hex, stepKey]);

  return (
    <section
      ref={sectionRef}
      className={`step-hero-section relative overflow-hidden ${className}`.trim()}
      style={{ backgroundColor }}
      {...props}
    >
      {enableGrid && (
        <canvas
          ref={canvasRef}
          aria-hidden
          className="step-hero-grid-canvas pointer-events-none absolute inset-0 z-0 h-full w-full"
        />
      )}
      {children}
    </section>
  );
}

export { TEXT_LIGHT };
