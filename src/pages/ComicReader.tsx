import { Link, Navigate, useParams } from "react-router-dom";
import PdfReader from "../components/comics/PdfReader";
import { getComicBySlug } from "../data/comics";

export default function ComicReader() {
  const { slug } = useParams<{ slug: string }>();
  const comic = slug ? getComicBySlug(slug) : undefined;

  if (!comic) {
    return <Navigate to="/comics" replace />;
  }

  return (
    <div className="container-page py-8 sm:py-12">
      <Link
        to="/comics"
        className="no-print mb-4 inline-flex items-center gap-1 text-sm font-bold text-ink/60 hover:text-ink"
      >
        ← Back to comics
      </Link>

      <div className="max-w-3xl">
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">{comic.title}</h1>
        <p className="mt-2 text-ink/70">{comic.summary}</p>
      </div>

      <div className="mt-6">
        <PdfReader url={comic.pdfPath} title={comic.title} />
      </div>
    </div>
  );
}
