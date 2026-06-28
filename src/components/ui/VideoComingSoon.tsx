import Icon from "./Icon";

type VideoComingSoonProps = {
  label?: string;
  accentColor?: string;
};

export default function VideoComingSoon({
  label = "Step video",
  accentColor = "#004cd7",
}: VideoComingSoonProps) {
  return (
    <div
      className="relative aspect-video overflow-hidden rounded-3xl border-4 border-white/50 bg-surface-container shadow-2xl"
      aria-label={`${label} — coming soon`}
    >
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(${accentColor} 1px, transparent 1px), linear-gradient(90deg, ${accentColor} 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="absolute inset-3 rounded-2xl border-2 border-dashed border-on-surface/15" />

      <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-on-surface/10 bg-white/60 px-md py-sm backdrop-blur-sm">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full border border-on-surface/20 bg-white" />
          <span className="h-2.5 w-2.5 rounded-full border border-on-surface/20 bg-white" />
          <span className="h-2.5 w-2.5 rounded-full border border-on-surface/20 bg-white" />
        </div>
        <span className="font-label-md uppercase tracking-widest text-on-surface-variant">
          Coming soon
        </span>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-md px-lg text-center">
        <div
          className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed bg-white/80 shadow-soft"
          style={{ borderColor: `${accentColor}66`, color: accentColor }}
        >
          <Icon name="play_arrow" className="text-4xl opacity-50" />
        </div>
        <div>
          <p className="font-display text-headline-md text-on-surface">Video coming soon</p>
          <p className="mt-1 text-body-sm text-on-surface-variant">{label}</p>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 border-t border-on-surface/10 bg-white/60 px-md py-sm backdrop-blur-sm">
        <div className="flex items-center gap-md">
          <div className="h-1.5 flex-1 rounded-full border border-on-surface/15 bg-white" />
          <div className="h-6 w-6 rounded-full border border-on-surface/15 bg-white" />
          <div className="h-6 w-6 rounded-full border border-on-surface/15 bg-white" />
        </div>
      </div>
    </div>
  );
}
