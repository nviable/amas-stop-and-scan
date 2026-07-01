import AppLink from "../AppLink";
import PdfReader from "../comics/PdfReader";
import HeroSection from "../ui/HeroSection";
import Icon from "../ui/Icon";
import { HeroBadge } from "../ui/PageSections";
import { comicThumbnail, formatComicAuthors, getComicBySlug } from "../../data/comics";

export default function ComicReader({ slug }: { slug: string }) {
  const comic = getComicBySlug(slug);

  if (!comic) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="font-display text-display-lg">Comic not found</h1>
        <p className="mt-2 text-on-surface-variant">This comic isn&apos;t available yet.</p>
        <AppLink to="/comics" className="btn-primary mt-6">
          Back to comics
        </AppLink>
      </div>
    );
  }

  return (
    <div className="pb-xxl">
      <HeroSection className="overflow-visible border-b border-on-surface/10 px-margin-mobile py-lg md:px-margin-desktop">
        <div className="mx-auto max-w-container-max">
          <AppLink
            to="/comics"
            className="no-print mb-lg inline-flex items-center gap-xs font-label-md text-on-surface-variant transition-colors hover:text-on-surface"
          >
            <Icon name="arrow_back" className="text-sm" />
            Back to comics
          </AppLink>

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
              <p className="mt-xs text-body-sm font-semibold text-primary">
                By {formatComicAuthors(comic.authors)}
              </p>
              <p className="mt-md max-w-2xl text-body-md text-on-surface-variant">{comic.summary}</p>
            </div>
          </div>
        </div>
      </HeroSection>

      <section className="px-margin-mobile pt-lg md:px-margin-desktop">
        <div className="mx-auto max-w-container-max">
          <PdfReader
            url={comic.pdfPath}
            title={comic.title}
            author={formatComicAuthors(comic.authors)}
          />
        </div>
      </section>
    </div>
  );
}
