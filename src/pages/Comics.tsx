import { Link } from "react-router-dom";
import { COMICS, comicThumbnail } from "../data/comics";

const JULIAN_LAWRENCE_URL = "https://www.julianlawrence.net/";

export default function Comics() {
  return (
    <div className="container-page py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl font-extrabold">Comics</h1>
        <p className="mt-3 text-lg text-ink/75">
          Comic strips are a supplementary literacy tool for STOP&SCAN — a way to
          slow down, read panels in sequence, and notice how images, captions, and
          layout shape what feels believable online.
        </p>
        <p className="mt-3 text-ink/70">
          This series explores AI-generated and synthetic media through visual
          storytelling. The approach draws on comics-based education research:
          sequential art makes abstract ideas tangible and gives readers space to
          question what they see before they share it. We are collaborating with{" "}
          <a
            href={JULIAN_LAWRENCE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-alignment underline-offset-2 hover:underline"
          >
            Julian Lawrence
          </a>
          , cartoonist and Senior Lecturer in Comics and Graphic Novels at
          Teesside University, and his students on developing these strips.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {COMICS.map((comic) => (
          <Link
            key={comic.id}
            to={`/comics/${comic.slug}`}
            className="card group flex flex-col overflow-hidden p-0 transition-transform hover:-translate-y-1"
          >
            <div className="aspect-[3/4] overflow-hidden bg-ink">
              <img
                src={comicThumbnail(comic)}
                alt=""
                className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h2 className="font-display text-xl font-extrabold">{comic.title}</h2>
              <p className="mt-2 flex-1 text-sm text-ink/65">{comic.summary}</p>
              <span className="mt-4 font-bold text-alignment group-hover:underline">
                Read the strip →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {COMICS.length === 0 && (
        <div className="card mt-10 border-dashed text-center text-ink/50">
          <p className="font-display text-lg font-bold">Strips coming soon</p>
          <p className="mt-1 text-sm">New comics will appear here as they are published.</p>
        </div>
      )}
    </div>
  );
}
