import { Link, Navigate, useParams } from "react-router-dom";
import PdfReader from "../components/comics/PdfReader";
import Icon from "../components/ui/Icon";
import { HeroBadge } from "../components/ui/PageSections";
import { comicThumbnail, getComicBySlug } from "../data/comics";

export default function ComicReader() {
  const { slug } = useParams<{ slug: string }>();
  const comic = slug ? getComicBySlug(slug) : undefined;

  if (!comic) {
    return <Navigate to="/comics" replace />;
  }

  return (
    <div className="pb-xxl">
      <section className="hero-gradient overflow-visible border-b border-on-surface/10 px-margin-mobile py-lg md:px-margin-desktop">
        <div className="mx-auto max-w-container-max">
          <Link
            to="/comics"
            className="no-print mb-lg inline-flex items-center gap-xs font-label-md text-on-surface-variant transition-colors hover:text-on-surface"
          >
            <Icon name="arrow_back" className="text-sm" />
            Back to comics
          </Link>

          <div className="flex flex-col gap-lg sm:flex-row sm:items-start">
            <div className="shrink-0 overflow-hidden rounded-2xl border border-on-surface/10 bg-white shadow-soft sm:w-28">
              <img
                alt={`${comic.title} cover`}
                className="aspect-[3/4] w-full object-cover sm:w-28"
                src={comicThumbnail(comic)}
              />
            </div>
            <div className="min-w-0 flex-1">
              <HeroBadge icon="menu_book" label="Comic Reader" />
              <h1 className="mt-sm font-display text-display-lg text-on-surface">{comic.title}</h1>
              <p className="mt-xs text-body-sm font-semibold text-primary">By {comic.author}</p>
              <p className="mt-md max-w-2xl text-body-md text-on-surface-variant">{comic.summary}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-margin-mobile pt-lg md:px-margin-desktop">
        <div className="mx-auto max-w-container-max">
          <PdfReader url={comic.pdfPath} title={comic.title} author={comic.author} />
        </div>
      </section>
    </div>
  );
}
