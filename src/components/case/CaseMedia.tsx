import type { ReactElement } from "react";
import type { CaseFile, SearchResult, SourceFinding } from "../../lib/caseTypes";

export function PostCard({
  post,
  highlight = false,
}: {
  post: CaseFile["post"];
  highlight?: boolean;
}) {
  const renderBody = () => {
    if (!highlight) return post.body;
    let parts: Array<string | ReactElement> = [post.body];
    post.highlights.forEach((phrase, i) => {
      const next: Array<string | ReactElement> = [];
      parts.forEach((part) => {
        if (typeof part !== "string") {
          next.push(part);
          return;
        }
        const idx = part.toLowerCase().indexOf(phrase.toLowerCase());
        if (idx === -1) {
          next.push(part);
          return;
        }
        next.push(part.slice(0, idx));
        next.push(
          <mark
            key={`${phrase}-${i}`}
            className="rounded bg-content/25 px-1 font-bold text-content"
          >
            {part.slice(idx, idx + phrase.length)}
          </mark>
        );
        next.push(part.slice(idx + phrase.length));
      });
      parts = next;
    });
    return parts;
  };

  return (
    <div className="mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-soft">
      <div className="flex items-center gap-3 p-4">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-full font-display font-extrabold text-white"
          style={{ backgroundColor: post.avatarColor }}
        >
          {post.account.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1 font-bold">
            <span className="truncate">{post.account}</span>
            {post.verified ? (
              <span className="text-source">✔</span>
            ) : (
              <span className="text-xs text-ink/40">(unverified)</span>
            )}
          </div>
          <div className="truncate text-sm text-ink/50">
            {post.handle} · {post.timeAgo}
          </div>
        </div>
        <span className="text-ink/30">•••</span>
      </div>

      <p className="px-4 pb-3 leading-relaxed">{renderBody()}</p>

      <div className="relative aspect-video bg-gradient-to-br from-ink to-[#3b2f63]">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-2xl text-ink shadow-lg">
            ▶
          </span>
        </div>
        <span className="absolute bottom-2 left-2 right-2 truncate rounded bg-black/40 px-2 py-1 text-xs text-white">
          {post.mediaCaption}
        </span>
      </div>

      <a
        href={post.linkUrl}
        onClick={(e) => e.preventDefault()}
        className="block border-y border-ink/10 bg-ink/5 px-4 py-2.5 text-sm font-semibold text-source"
      >
        🔗 {post.linkLabel}
      </a>

      <div className="flex items-center justify-between px-4 py-3 text-sm text-ink/60">
        <span>♥ {post.stat.likes}</span>
        <span>💬 {post.stat.comments}</span>
        <span>↗ {post.stat.shares}</span>
      </div>
    </div>
  );
}

export function CommentList({
  comments,
  revealSignals = true,
}: {
  comments: CaseFile["comments"];
  revealSignals?: boolean;
}) {
  return (
    <div className="space-y-2">
      {comments.map((c, i) => (
        <div
          key={i}
          className={`rounded-2xl border p-3 text-sm ${
            revealSignals && c.suspicious
              ? "border-stop/30 bg-stop/5"
              : "border-ink/10 bg-white"
          }`}
        >
          <span className="font-bold">{c.name}</span>{" "}
          <span className="text-ink/70">{c.text}</span>
          {revealSignals && c.suspicious && (
            <span className="ml-1 text-xs font-bold text-stop">⚑ signal</span>
          )}
        </div>
      ))}
    </div>
  );
}

const FINDING_ICONS: Record<string, string> = {
  calendar: "📅",
  badge: "🪪",
  link: "🔗",
  chat: "💬",
};

export function SourceFindings({
  findings,
  showDetails = true,
}: {
  findings: SourceFinding[];
  showDetails?: boolean;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {findings.map((f, i) => (
        <div key={i} className="card p-4">
          <div className="flex items-center gap-2 font-display font-bold text-source">
            <span className="text-xl">{FINDING_ICONS[f.icon] ?? "🔍"}</span>
            {f.label}
          </div>
          {showDetails ? (
            <p className="mt-1.5 text-sm text-ink/70">{f.detail}</p>
          ) : (
            <p className="mt-1.5 text-xs font-semibold uppercase tracking-wide text-ink/40">
              Details available with a hint
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

const SIGNAL_STYLE: Record<SearchResult["signal"], { ring: string; tag: string; label: string }> = {
  warning: { ring: "border-stop/40 bg-stop/5", tag: "text-stop", label: "⚠ Warning" },
  absent: { ring: "border-alignment/40 bg-alignment/5", tag: "text-alignment", label: "∅ No record" },
  unrelated: { ring: "border-ink/15 bg-white", tag: "text-ink/50", label: "↩ Circular" },
  confirm: { ring: "border-content/40 bg-content/5", tag: "text-content", label: "✔ Confirmed" },
};

export function SearchResults({
  results,
  showSignals = true,
}: {
  results: SearchResult[];
  showSignals?: boolean;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {results.map((r, i) => {
        const s = SIGNAL_STYLE[r.signal];
        return (
          <div
            key={i}
            className={`rounded-2xl border p-4 shadow-soft ${s.ring}`}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wide text-ink/50">
                {r.source}
              </span>
              {showSignals && (
                <span className={`text-xs font-bold ${s.tag}`}>{s.label}</span>
              )}
            </div>
            <div className="mt-1 font-bold text-source">{r.headline}</div>
            <p className="mt-1 text-sm text-ink/70">{r.snippet}</p>
          </div>
        );
      })}
    </div>
  );
}
