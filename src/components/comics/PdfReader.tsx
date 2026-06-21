import { useCallback, useEffect, useRef, useState } from "react";
import { Document, Page } from "react-pdf";
import "../../lib/pdfWorker";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

type FitMode = "width" | "page";

type PdfReaderProps = {
  url: string;
  title: string;
};

const SWIPE_THRESHOLD = 48;

export default function PdfReader({ url, title }: PdfReaderProps) {
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

  return (
    <div
      ref={containerRef}
      className={`flex flex-col overflow-hidden rounded-3xl border border-ink/10 bg-ink/95 ${
        fullscreen ? "h-screen rounded-none border-0" : "min-h-[70vh]"
      }`}
    >
      <div className="no-print flex flex-wrap items-center gap-2 border-b border-white/10 px-3 py-2.5 text-white sm:px-4">
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-sm font-bold sm:text-base">{title}</p>
          <p className="text-xs text-white/55">
            Page {page}
            {rightPage ? `–${rightPage}` : ""} of {numPages || "…"}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button type="button" onClick={goPrev} disabled={page <= 1} className="reader-btn">
            ← Prev
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={numPages === 0 || page >= numPages}
            className="reader-btn"
          >
            Next →
          </button>
          <span className="mx-1 hidden h-5 w-px bg-white/15 sm:inline" />
          <button type="button" onClick={zoomOut} className="reader-btn" aria-label="Zoom out">
            −
          </button>
          <button type="button" onClick={fitWidth} className="reader-btn">
            Fit width
          </button>
          <button type="button" onClick={zoomIn} className="reader-btn" aria-label="Zoom in">
            +
          </button>
          <button
            type="button"
            onClick={() => setSpread((s) => !s)}
            className={`reader-btn hidden sm:inline-flex ${spread ? "bg-white/20" : ""}`}
            aria-pressed={spread}
          >
            Spread
          </button>
          <button type="button" onClick={toggleFullscreen} className="reader-btn">
            {fullscreen ? "Exit" : "Full screen"}
          </button>
          <a href={url} download className="reader-btn">
            Download
          </a>
        </div>
      </div>

      <div
        className="relative flex flex-1 items-start justify-center overflow-auto p-2 sm:p-4"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {loading && (
          <p className="absolute inset-0 flex items-center justify-center text-sm text-white/60">
            Loading comic…
          </p>
        )}
        {error && (
          <p className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-stop">
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
          className={`flex items-start justify-center gap-3 transition-opacity ${
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
            className="overflow-hidden rounded-lg shadow-lg"
          />
          {rightPage && (
            <Page
              key={`${rightPage}-${fitMode}-${scale}-${pageWidth}`}
              pageNumber={rightPage}
              width={fitMode === "width" ? pageWidth : undefined}
              scale={fitMode === "page" ? scale : undefined}
              renderTextLayer
              renderAnnotationLayer
              className="overflow-hidden rounded-lg shadow-lg"
            />
          )}
        </Document>
      </div>

      <p className="no-print border-t border-white/10 px-4 py-2 text-center text-xs text-white/45 sm:hidden">
        Swipe left or right to turn pages
      </p>
    </div>
  );
}
