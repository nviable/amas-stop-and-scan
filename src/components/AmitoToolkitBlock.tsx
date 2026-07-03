import { useState } from "react";
import {
  AMITO_TOOLKIT_FEATURED,
  AMITO_TOOLKIT_PLATFORMS,
  type AmitoPlatformId,
} from "../data/amitoToolkit";
import Icon from "./ui/Icon";

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
    </svg>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

const PLATFORM_ICONS = {
  telegram: TelegramIcon,
  discord: DiscordIcon,
} as const;

type AmitoToolkitBlockProps = {
  className?: string;
};

export default function AmitoToolkitBlock({ className = "" }: AmitoToolkitBlockProps) {
  const [activeId, setActiveId] = useState<AmitoPlatformId>("telegram");
  const active =
    AMITO_TOOLKIT_PLATFORMS.find((p) => p.id === activeId) ?? AMITO_TOOLKIT_PLATFORMS[0];

  return (
    <section
      className={`px-margin-mobile py-xl md:px-margin-desktop ${className}`.trim()}
      aria-labelledby="amito-toolkit-heading"
    >
      <div className="mx-auto max-w-container-max">
        <div className="overflow-hidden rounded-xxl border border-on-surface/10 bg-gradient-to-br from-primary-fixed/40 via-white to-surface-container-low shadow-card">
          <div className="flex flex-col md:flex-row md:items-stretch">
            {/* Featured image — flush left, edge-to-edge */}
            <div className="relative shrink-0 md:w-[220px] lg:w-[260px]">
              <img
                src={AMITO_TOOLKIT_FEATURED}
                alt="Amito robot mascot holding a magnifying glass"
                className="h-full min-h-[200px] w-full object-cover object-left-bottom md:min-h-[260px]"
                loading="lazy"
              />
            </div>

            <div className="flex flex-1 flex-col gap-md p-md md:flex-row md:items-center md:gap-lg md:p-lg lg:pr-xl lg:pt-lg lg:pb-lg">
              {/* Copy */}
              <div className="min-w-0 flex-1 space-y-sm">
                <span className="inline-flex items-center gap-xs rounded-full bg-primary/10 px-md py-xs font-label-md text-primary">
                  <Icon name="robot_2" className="text-sm" />
                  Tech cohort project
                </span>
                <h2
                  id="amito-toolkit-heading"
                  className="font-display text-display-lg text-on-surface"
                >
                  Meet the Amito toolkit
                </h2>
                <p className="text-body-md leading-relaxed text-on-surface-variant">
                  Most verification tools handle only one part of the STOP&SCAN framework — and many
                  aren&apos;t free to use. Our program&apos;s technical cohort has been building{" "}
                  <strong className="font-semibold text-on-surface">Amito</strong>, the{" "}
                  <strong className="font-semibold text-on-surface">
                    AI for Good Media Integrity Toolkit
                  </strong>
                  : a conversational bot that turns the framework into an evolving, interactive
                  toolkit you can chat with.
                </p>
                <p className="text-body-sm text-on-surface-variant">{active.hint}</p>
                <a
                  href={active.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-xs"
                >
                  {active.cta}
                  <Icon name="open_in_new" className="text-sm" />
                </a>
              </div>

              {/* QR + platform switcher */}
              <div className="relative z-10 flex shrink-0 flex-col items-center gap-sm md:items-end">
                <div className="rounded-2xl border border-on-surface/10 bg-white p-sm shadow-soft">
                  <img
                    src={active.qrImage}
                    alt={`QR code to open Amito on ${active.name}`}
                    className="h-36 w-36 object-contain sm:h-40 sm:w-40"
                    loading="lazy"
                  />
                  <p
                    className={`mt-xs text-center font-display text-body-sm font-bold ${active.accentClass}`}
                  >
                    {active.handle}
                  </p>
                </div>

                <div
                  className="relative z-20 flex items-center gap-sm"
                  role="group"
                  aria-label="Choose platform for QR code and link"
                >
                  {AMITO_TOOLKIT_PLATFORMS.map((platform) => {
                    const PlatformIcon = PLATFORM_ICONS[platform.id];
                    const isActive = platform.id === activeId;
                    return (
                      <button
                        key={platform.id}
                        type="button"
                        aria-pressed={isActive}
                        aria-label={`Show ${platform.name} QR code and link`}
                        title={platform.name}
                        onClick={() => setActiveId(platform.id)}
                        className={`flex h-11 w-11 items-center justify-center rounded-full transition-all ${
                          isActive ? platform.activeClass : platform.inactiveClass
                        }`}
                      >
                        <PlatformIcon className="h-5 w-5" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
