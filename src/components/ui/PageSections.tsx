import { Link } from "react-router-dom";
import Icon from "./Icon";

type SpeechBubbleProps = {
  children: React.ReactNode;
  className?: string;
  tail?: "left" | "bottom";
};

export function SpeechBubble({
  children,
  className = "",
  tail = "left",
}: SpeechBubbleProps) {
  return (
    <div
      className={`speech-bubble rounded-2xl border border-on-surface/10 bg-white p-lg shadow-soft ${
        tail === "left" ? "speech-bubble-tr" : "speech-bubble-br"
      } ${className}`}
    >
      <p className="font-hand text-handwritten-lg text-on-surface">{children}</p>
    </div>
  );
}

export function HeroBadge({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="inline-flex items-center gap-sm rounded-full bg-surface-container-high px-md py-xs">
      <Icon name={icon} className="text-primary text-body-sm" />
      <span className="font-label-md uppercase tracking-widest text-primary">{label}</span>
    </div>
  );
}

export function PageHero({
  badge,
  title,
  description,
  children,
  className = "",
}: {
  badge?: React.ReactNode;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`py-xxl ${className}`}>
      <div className="container-page">
        {badge}
        <h1 className="font-display text-display-xl text-on-background">{title}</h1>
        {description && (
          <p className="mt-md max-w-2xl text-body-lg text-on-surface-variant">{description}</p>
        )}
        {children}
      </div>
    </section>
  );
}

export function CtaBanner({
  title,
  description,
  to,
  label,
  onAction,
}: {
  title: string;
  description: string;
  to?: string;
  label: string;
  onAction?: () => void;
}) {
  const actionClass =
    "relative z-10 mt-xl inline-flex items-center gap-sm rounded-full bg-white px-xxl py-lg font-display text-headline-md text-primary shadow-xl transition-transform hover:scale-105 active:scale-95";

  return (
    <section className="container-page py-xxl">
      <div className="relative overflow-hidden rounded-xxl bg-primary p-xxl text-center text-on-primary">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(177,151,252,0.4),_transparent_40%)]" />
        <h2 className="relative z-10 font-display text-display-xl">{title}</h2>
        <p className="relative z-10 mx-auto mt-md max-w-xl text-body-lg opacity-90">
          {description}
        </p>
        {onAction ? (
          <button type="button" onClick={onAction} className={actionClass}>
            {label}
            <Icon name="arrow_forward" />
          </button>
        ) : (
          <Link to={to ?? "/"} className={actionClass}>
            {label}
            <Icon name="arrow_forward" />
          </Link>
        )}
      </div>
    </section>
  );
}
