import Icon from "./ui/Icon";
import { SUMMIT_BANNER } from "../lib/assets";

const ITU_FEATURE_URL =
  "https://www.itu.int/hub/2026/07/from-deepfakes-to-digital-trust-ai-natives-tackle-misinformation-at-ai-for-good/";

type AiForGoodSummitBlockProps = {
  className?: string;
};

export default function AiForGoodSummitBlock({ className = "" }: AiForGoodSummitBlockProps) {
  return (
    <div
      className={`mx-auto max-w-4xl px-margin-mobile md:px-margin-desktop ${className}`.trim()}
      aria-labelledby="summit-block-heading"
    >
      <div className="flex flex-col gap-md overflow-hidden rounded-2xl border border-outline-variant/25 bg-surface-container p-md shadow-sm md:flex-row md:items-center md:gap-lg">
        <img
          src={SUMMIT_BANNER}
          alt=""
          aria-hidden
          className="aspect-[16/9] w-full shrink-0 rounded-xl object-cover object-center md:aspect-auto md:h-24 md:w-36 lg:h-28 lg:w-44"
          loading="lazy"
          width={1376}
          height={768}
        />

        <div className="min-w-0 flex-1">
          <p className="font-label-md uppercase tracking-widest text-on-surface-variant">
            Geneva · AI for Good 2026
          </p>
          <h2 id="summit-block-heading" className="mt-xs font-display text-headline-sm text-on-surface">
            Summit session complete
          </h2>
          <p className="mt-xs text-body-sm leading-relaxed text-on-surface-variant">
            Our presentation in Geneva has wrapped. Summit photos coming soon.
          </p>
          <a
            href={ITU_FEATURE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-sm inline-flex items-center gap-xs font-label-md text-primary transition-colors hover:text-primary/80"
          >
            Read the ITU feature
            <Icon name="open_in_new" className="text-sm" />
          </a>
        </div>
      </div>
    </div>
  );
}
