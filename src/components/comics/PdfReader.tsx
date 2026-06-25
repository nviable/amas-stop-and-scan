import { useCallback, useEffect, useRef, useState } from "react";
import { Document, Page } from "react-pdf";
import Icon from "../ui/Icon";
import "../../lib/pdfWorker";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

type FitMode = "width" | "page";

type PdfReaderProps = {
  url: string;
  title: string;
  author?: string;
};

const SWIPE_THRESHOLD = 48;

export default function PdfReader({ url, title, author }: PdfReaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const touchRef = useRef<{ x: number; y: number } | null>(null);

  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(1);
  const [scale, setScale] = useState(1);
  const [fitMode, setFitMode] = useState<FitMode>("width");
  const [spread, setSpread] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [containerWidth, setContainerWidth] = useState(800);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const spreadActive = spread && containerWidth >= 640;
  const rightPage = spreadActive && page < numPages ? page + 1 : null;
  const pageStep = spreadActive ? 2 : 1;

  const pageLabel =
    numPages === 0
      ? "…"
      : rightPage
        ? `${page}–${rightPage} of ${numPages}`
        : `${page} of ${numPages}`;

  const goPrev = useCallback(() => {
    setPage((p) => Math.max(1, p - pageStep));
  }, [pageStep]);

  const goNext = useCallback(() => {
    setPage((p) => {
      if (spreadActive) {
        return Math.min(numPages, p + 2);
      }
      return Math.min(numPages, p + 1);
    });
  }, [numPages, spreadActive]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      if (width) setContainerWidth(width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        goNext();
      } else if (e.key === "Home") {
        e.preventDefault();
        setPage(1);
      } else if (e.key === "End") {
        e.preventDefault();
        setPage(numPages);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev, numPages]);

  useEffect(() => {
    const onFullscreen = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFullscreen);
    return () => document.removeEventListener("fullscreenchange", onFullscreen);
  }, []);

  const pageWidth = spreadActive
    ? Math.max(220, (containerWidth - 24) / 2)
    : Math.max(280, containerWidth - 8);

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchRef.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchRef.current;
    touchRef.current = null;
    if (!start) return;

    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;

    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) goNext();
    else goPrev();
  };

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await containerRef.current.requestFullscreen();
    }
  };

  const zoomIn = () => {
    setFitMode("page");
    setScale((s) => Math.min(2.5, +(s + 0.15).toFixed(2)));
  };

  const zoomOut = () => {
    setFitMode("page");
    setScale((s) => Math.max(0.5, +(s - 0.15).toFixed(2)));
  };

  const fitWidth = () => {
    setFitMode("width");
    setScale(1);
  };

  const canGoPrev = page > 1;
  const canGoNext = numPages > 0 && page < numPages;

  return (
    <div
      ref={containerRef}
      className={`flex flex-col overflow-hidden rounded-xxl border border-on-surface/10 bg-inverse-surface shadow-card ${
        fullscreen ? "h-screen rounded-none border-0" : "min-h-[70vh]"
      }`}
    >
      {/* Toolbar */}
      <div className="no-print border-b border-white/10 bg-on-background/95 backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-md px-md py-md sm:px-lg">
          <div className="min-w-0">
            <p className="truncate font-display text-headline-md text-white">{title}</p>
            {author && (
              <p className="truncate text-body-sm text-white/60">By {author}</p>
            )}
          </div>
          <p className="rounded-full bg-white/10 px-md py-xs font-label-md text-white/80">
            Page {pageLabel}
          </p>
        </div>

        <div className="flex flex-col gap-sm border-t border-white/5 px-md py-sm sm:flex-row sm:items-center sm:justify-between sm:px-lg">
          {/* Primary: page navigation */}
          <div className="flex items-center justify-center gap-sm sm:justify-start">
            <ReaderButton
              onClick={goPrev}
              disabled={!canGoPrev}
              label="Previous"
              icon="chevron_left"
              variant="primary"
            />
            <ReaderButton
              onClick={goNext}
              disabled={!canGoNext}
              label="Next"
              icon="chevron_right"
              iconAfter
              variant="primary"
            />
          </div>

          {/* Secondary: zoom */}
          <div className="flex items-center justify-center gap-xs">
            <span className="mr-xs hidden font-label-md uppercase tracking-wide text-white/40 sm:inline">
              Zoom
            </span>
            <ReaderIconButton onClick={zoomOut} label="Zoom out" icon="zoom_out" />
            <ReaderButton onClick={fitWidth} label="Fit width" icon="fit_width" compact />
            <ReaderIconButton onClick={zoomIn} label="Zoom in" icon="zoom_in" />
          </div>

          {/* Tertiary: view options */}
          <div className="flex items-center justify-center gap-xs sm:justify-end">
            <ReaderButton
              onClick={() => setSpread((s) => !s)}
              label="Spread"
              icon="spread"
              compact
              active={spread}
              className="hidden sm:inline-flex"
            />
            <ReaderIconButton
              onClick={toggleFullscreen}
              label={fullscreen ? "Exit full screen" : "Full screen"}
              icon={fullscreen ? "fullscreen_exit" : "fullscreen"}
            />
            <a href={url} download className="inline-flex">
              <ReaderIconButton as="span" label="Download PDF" icon="download" />
            </a>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div
        className="relative flex flex-1 items-start justify-center overflow-auto bg-[#1a1428] p-sm sm:p-lg"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {loading && (
          <p className="absolute inset-0 flex items-center justify-center gap-sm text-body-sm text-white/60">
            <Icon name="hourglass_top" className="text-lg" />
            Loading comic…
          </p>
        )}
        {error && (
          <p className="absolute inset-0 flex items-center justify-center px-lg text-center text-body-sm text-stop-red">
            {error}
          </p>
        )}

        <Document
          file={url}
          loading={null}
          onLoadSuccess={({ numPages: total }) => {
            setNumPages(total);
            setLoading(false);
            setError(null);
          }}
          onLoadError={() => {
            setLoading(false);
            setError("Could not load this comic. Try downloading the PDF instead.");
          }}
          className={`flex items-start justify-center gap-md transition-opacity ${
            loading ? "opacity-0" : "opacity-100"
          } ${spreadActive ? "flex-row" : "flex-col"}`}
        >
          <Page
            key={`${page}-${fitMode}-${scale}-${pageWidth}`}
            pageNumber={page}
            width={fitMode === "width" ? pageWidth : undefined}
            scale={fitMode === "page" ? scale : undefined}
            renderTextLayer
            renderAnnotationLayer
            className="overflow-hidden rounded-lg shadow-2xl"
          />
          {rightPage && (
            <Page
              key={`${rightPage}-${fitMode}-${scale}-${pageWidth}`}
              pageNumber={rightPage}
              width={fitMode === "width" ? pageWidth : undefined}
              scale={fitMode === "page" ? scale : undefined}
              renderTextLayer
              renderAnnotationLayer
              className="overflow-hidden rounded-lg shadow-2xl"
            />
          )}
        </Document>
      </div>

      {/* Mobile page bar + swipe hint */}
      <div className="no-print border-t border-white/10 bg-on-background/95 px-md py-sm sm:hidden">
        <div className="flex items-center justify-between gap-sm">
          <ReaderButton
            onClick={goPrev}
            disabled={!canGoPrev}
            label="Prev"
            icon="chevron_left"
            variant="primary"
            compact
          />
          <span className="font-label-md text-white/70">Swipe to turn pages</span>
          <ReaderButton
            onClick={goNext}
            disabled={!canGoNext}
            label="Next"
            icon="chevron_right"
            iconAfter
            variant="primary"
            compact
          />
        </div>
      </div>
    </div>
  );
}

function ReaderButton({
  onClick,
  disabled,
  label,
  icon,
  iconAfter,
  variant = "default",
  compact,
  active,
  className = "",
}: {
  onClick?: () => void;
  disabled?: boolean;
  label: string;
  icon: string;
  iconAfter?: boolean;
  variant?: "default" | "primary";
  compact?: boolean;
  active?: boolean;
  className?: string;
}) {
  const base =
    variant === "primary"
      ? "bg-primary text-on-primary hover:brightness-110"
      : active
        ? "bg-white/20 text-white"
        : "border border-white/15 bg-white/5 text-white hover:bg-white/15";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-xs rounded-full font-label-md transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 ${compact ? "px-md py-sm" : "px-lg py-sm"} ${base} ${className}`}
    >
      {!iconAfter && <Icon name={icon} className="text-base" />}
      <span>{label}</span>
      {iconAfter && <Icon name={icon} className="text-base" />}
    </button>
  );
}

function ReaderIconButton({
  onClick,
  label,
  icon,
  as,
}: {
  onClick?: () => void;
  label: string;
  icon: string;
  as?: "span";
}) {
  const className =
    "inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/15 active:scale-95";

  if (as === "span") {
    return (
      <span className={className} aria-label={label} title={label}>
        <Icon name={icon} className="text-base" />
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
      aria-label={label}
      title={label}
    >
      <Icon name={icon} className="text-base" />
    </button>
  );
}
