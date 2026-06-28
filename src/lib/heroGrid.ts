import type { StepKey } from "./framework";

export type HeroGridConfig = {
  accentHex: string;
  /** Light text on dark step backgrounds */
  lightBackground: boolean;
  variant?: StepKey;
  spacing?: number;
  radius?: number;
};

type RGB = { r: number; g: number; b: number };

type GridPoint = { x: number; y: number; t: number };

function hexToRgb(hex: string): RGB {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function localPointer(container: HTMLElement, clientX: number, clientY: number) {
  const rect = container.getBoundingClientRect();
  return { x: clientX - rect.left, y: clientY - rect.top };
}

export function initHeroGrid(
  canvas: HTMLCanvasElement,
  container: HTMLElement,
  config: HeroGridConfig,
): () => void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  const spacing = config.spacing ?? 36;
  const radius = config.radius ?? 160;
  const accent = hexToRgb(config.accentHex);
  const variant = config.variant ?? "source";
  const light = config.lightBackground;

  let pointer: { x: number; y: number } | null = null;
  let interactive = true;
  let raf = 0;
  let width = 0;
  let height = 0;

  const baseDot = light ? "rgba(255,255,255,0.1)" : "rgba(31,22,53,0.07)";
  const baseLine = light ? "rgba(255,255,255,0.06)" : "rgba(31,22,53,0.04)";

  const gridPoints = (): GridPoint[] => {
    const pts: GridPoint[] = [];
    for (let x = spacing / 2; x < width; x += spacing) {
      for (let y = spacing / 2; y < height; y += spacing) {
        pts.push({ x, y, t: 0 });
      }
    }
    return pts;
  };

  const litPoints = (points: GridPoint[]): GridPoint[] => {
    if (!pointer || !interactive) return [];
    return points
      .map((p) => {
        const dist = Math.hypot(p.x - pointer!.x, p.y - pointer!.y);
        if (dist >= radius) return null;
        return { ...p, t: 1 - dist / radius };
      })
      .filter((p): p is GridPoint => p !== null);
  };

  const drawBaseGrid = (points: GridPoint[]) => {
    ctx.strokeStyle = baseLine;
    ctx.lineWidth = 1;
    for (let x = spacing / 2; x < width; x += spacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = spacing / 2; y < height; y += spacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    ctx.fillStyle = baseDot;
    for (const p of points) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const drawReflectMirror = (points: GridPoint[]) => {
    ctx.fillStyle = light ? "rgba(255,255,255,0.04)" : "rgba(31,22,53,0.035)";
    for (const p of points) {
      ctx.beginPath();
      ctx.arc(p.x + 5, p.y - 4, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const drawStopRings = () => {
    if (!pointer) return;
    for (let r = 24; r <= radius; r += 36) {
      const alpha = 0.18 * (1 - r / radius);
      ctx.strokeStyle = `rgba(${accent.r},${accent.g},${accent.b},${alpha})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(pointer.x, pointer.y, r, 0, Math.PI * 2);
      ctx.stroke();
    }
  };

  const drawSourceTraces = (lit: GridPoint[]) => {
    if (!pointer) return;
    for (const p of lit) {
      ctx.strokeStyle = `rgba(${accent.r},${accent.g},${accent.b},${p.t * 0.22})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(pointer.x, pointer.y);
      ctx.stroke();
    }
  };

  const drawAlignmentLinks = (lit: GridPoint[]) => {
    for (let i = 0; i < lit.length; i++) {
      for (let j = i + 1; j < lit.length; j++) {
        const d = Math.hypot(lit[i].x - lit[j].x, lit[i].y - lit[j].y);
        if (d > spacing * 1.6) continue;
        const t = Math.min(lit[i].t, lit[j].t);
        ctx.strokeStyle = `rgba(${accent.r},${accent.g},${accent.b},${t * 0.35})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(lit[i].x, lit[i].y);
        ctx.lineTo(lit[j].x, lit[j].y);
        ctx.stroke();
      }
    }
  };

  const drawLitDots = (lit: GridPoint[]) => {
    for (const p of lit) {
      const dotR = variant === "content" ? 1.5 + p.t * 3.5 : 1.5 + p.t * 2;
      ctx.fillStyle = `rgba(${accent.r},${accent.g},${accent.b},${0.15 + p.t * 0.55})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, dotR, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    const points = gridPoints();
    drawBaseGrid(points);

    if (variant === "reflect") drawReflectMirror(points);
    if (variant === "stop") drawStopRings();

    const lit = litPoints(points);
    if (lit.length === 0) return;

    if (variant === "source") drawSourceTraces(lit);
    if (variant === "alignment") drawAlignmentLinks(lit);
    drawLitDots(lit);
  };

  const scheduleDraw = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(draw);
  };

  const resize = () => {
    const rect = container.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    if (width <= 0 || height <= 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    scheduleDraw();
  };

  const onMove = (clientX: number, clientY: number) => {
    if (!interactive) return;
    pointer = localPointer(container, clientX, clientY);
    scheduleDraw();
  };

  const onLeave = () => {
    pointer = null;
    scheduleDraw();
  };

  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const syncMotion = () => {
    interactive = !motion.matches;
    if (!interactive) pointer = null;
    scheduleDraw();
  };
  syncMotion();
  motion.addEventListener("change", syncMotion);

  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();

  const handleMouseMove = (e: MouseEvent) => onMove(e.clientX, e.clientY);
  const handleMouseLeave = () => onLeave();
  const handleTouchMove = (e: TouchEvent) => {
    const t = e.touches[0];
    if (t) onMove(t.clientX, t.clientY);
  };
  const handleTouchEnd = () => onLeave();

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);
  container.addEventListener("touchmove", handleTouchMove, { passive: true });
  container.addEventListener("touchend", handleTouchEnd);

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    motion.removeEventListener("change", syncMotion);
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
    container.removeEventListener("touchmove", handleTouchMove);
    container.removeEventListener("touchend", handleTouchEnd);
  };
}
