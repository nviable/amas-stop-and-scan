import { useState, type ReactElement } from "react";
import type { CaseFile, SearchResult, SourceFinding } from "../../lib/caseTypes";
import Icon from "../ui/Icon";
import { caseMediaThumbnail } from "../../lib/assets";

export function PostCard({
  post,
  highlight = false,
  comments,
  commentsExpanded = false,
  onCommentsToggle,
  revealCommentSignals = false,
  promptComments = false,
}: {
  post: CaseFile["post"];
  highlight?: boolean;
  comments?: CaseFile["comments"];
  commentsExpanded?: boolean;
  onCommentsToggle?: () => void;
  revealCommentSignals?: boolean;
  /** Draw attention to the comment control until the user opens it (e.g. Source step). */
  promptComments?: boolean;
}) {
  const thumbnail = caseMediaThumbnail(post.thumbnail);
  const isVideo = (post.mediaType ?? "video") === "video";
  const [linkNoteOpen, setLinkNoteOpen] = useState(false);

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
    <div className="mx-auto w-full overflow-hidden rounded-[24px] border border-on-surface/10 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-on-surface/5 p-md">
        <div className="flex items-center gap-sm">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full font-bold text-white"
            style={{ backgroundColor: post.avatarColor }}
          >
            {post.account.charAt(0)}
          </div>
          <div>
            <p className="text-body-md font-bold leading-tight">
              {post.account}{" "}
              {!post.verified && (
                <span className="text-xs font-normal text-outline-variant">(unverified)</span>
              )}
            </p>
            <p className="text-xs text-outline-variant">
              {post.handle} · {post.timeAgo}
            </p>
          </div>
        </div>
        <Icon name="more_horiz" className="text-outline" />
      </div>

      <div className="space-y-md p-md">
        <p className="text-body-md leading-relaxed">{renderBody()}</p>
        <div className="relative aspect-video overflow-hidden rounded-xl bg-on-surface">
          <img
            alt={post.mediaAlt ?? ""}
            className="h-full w-full object-cover"
            src={thumbnail}
            width={1280}
            height={720}
            loading="lazy"
            decoding="async"
          />
          {isVideo && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/15">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-md"
                aria-hidden
              >
                <Icon name="play_arrow" className="text-4xl text-white" filled />
              </div>
            </div>
          )}
          <div className="absolute bottom-0 flex w-full items-center gap-xs bg-black/40 p-sm text-[10px] text-white backdrop-blur-sm">
            <Icon name={isVideo ? "play_circle" : "image"} className="text-sm" />
            {post.mediaCaption}
          </div>
        </div>
        {post.linkLabel && (
          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-xs text-sm text-source-cyan"
              title="Simulated link. Part of the scenario, not a real website."
              aria-expanded={linkNoteOpen}
              onClick={() => setLinkNoteOpen((open) => !open)}
              onMouseEnter={() => setLinkNoteOpen(true)}
              onMouseLeave={() => setLinkNoteOpen(false)}
              onFocus={() => setLinkNoteOpen(true)}
              onBlur={() => setLinkNoteOpen(false)}
            >
              <Icon name="link" className="text-sm" />
              <span className="underline underline-offset-2">{post.linkLabel}</span>
            </button>
            {linkNoteOpen && (
              <div
                role="tooltip"
                className="mt-xs w-fit max-w-full rounded-lg bg-on-surface px-sm py-xs text-xs text-white"
              >
                Simulated link. Part of the scenario, not a real website.
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-between border-t border-on-surface/5 px-md py-sm text-xs text-outline">
        <span className="flex items-center gap-xs">
          <Icon name="favorite" className="text-sm" /> {post.stat.likes}
        </span>
        {comments && onCommentsToggle ? (
          <button
            type="button"
            onClick={onCommentsToggle}
            className={`relative flex items-center gap-xs rounded-full px-2 py-1 transition-colors ${
              commentsExpanded
                ? "bg-source-cyan/10 font-semibold text-source-cyan"
                : promptComments
                  ? "comment-btn-hint font-semibold text-source-cyan"
                  : "hover:bg-on-surface/5 hover:text-on-surface"
            }`}
            aria-expanded={commentsExpanded}
          >
            <Icon name="chat_bubble" className="text-sm" />
            {post.stat.comments}
          </button>
        ) : (
          <span className="flex items-center gap-xs">
            <Icon name="chat_bubble" className="text-sm" /> {post.stat.comments}
          </span>
        )}
        <span className="flex items-center gap-xs">
          <Icon name="share" className="text-sm" /> {post.stat.shares}
        </span>
      </div>

      {comments && commentsExpanded && (
        <div className="border-t border-on-surface/5 bg-surface-container-low/40 p-md">
          <p className="mb-2 font-label-md uppercase tracking-wide text-on-surface-variant">
            Comments on this post
          </p>
          <CommentList comments={comments} revealSignals={revealCommentSignals} compact />
        </div>
      )}
    </div>
  );
}

export function CommentList({
  comments,
  revealSignals = true,
  compact = false,
}: {
  comments: CaseFile["comments"];
  revealSignals?: boolean;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "space-y-1.5" : "space-y-2"}>
      {comments.map((c, i) => (
        <div
          key={i}
          className={`rounded-2xl border text-sm ${
            compact ? "p-2.5" : "p-3"
          } ${
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
  onFindingActivate,
  activeFindingIcon,
}: {
  findings: SourceFinding[];
  showDetails?: boolean;
  onFindingActivate?: (finding: SourceFinding) => void;
  activeFindingIcon?: string | null;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {findings.map((f, i) => {
        const interactive = Boolean(onFindingActivate && f.icon === "chat");
        const active = activeFindingIcon === f.icon;
        const Wrapper = interactive ? "button" : "div";

        return (
          <Wrapper
            key={i}
            type={interactive ? "button" : undefined}
            onClick={interactive ? () => onFindingActivate?.(f) : undefined}
            className={`card p-4 text-left transition-all ${
              interactive ? "cursor-pointer hover:-translate-y-0.5 hover:shadow-md" : ""
            } ${active ? "ring-2 ring-source-cyan/40" : ""}`}
          >
            <div className="flex items-center gap-2 font-display font-bold text-source">
              <span className="text-xl">{FINDING_ICONS[f.icon] ?? "🔍"}</span>
              {f.label}
              {interactive && (
                <span className="ml-auto text-xs font-semibold text-source-cyan">
                  View comments
                </span>
              )}
            </div>
            {showDetails ? (
              <p className="mt-1.5 text-sm text-ink/70">{f.detail}</p>
            ) : (
              <p className="mt-1.5 text-xs font-semibold uppercase tracking-wide text-ink/40">
                Details available with a hint
              </p>
            )}
          </Wrapper>
        );
      })}
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
