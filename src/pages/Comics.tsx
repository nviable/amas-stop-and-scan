import { Link } from "react-router-dom";
import AmitoSpotlight from "../components/AmitoSpotlight";
import Icon from "../components/ui/Icon";
import { HeroBadge } from "../components/ui/PageSections";
import { COMICS, comicThumbnail } from "../data/comics";
import { AMITO_IMAGES, PROJECT_TEAM } from "../lib/assets";

const JULIAN_LAWRENCE_URL = "https://www.julianlawrence.net/";

export default function Comics() {
  return (
    <div>
      <section className="hero-gradient overflow-visible px-margin-mobile pb-xl pt-xxl md:px-margin-desktop">
        <div className="mx-auto grid max-w-container-max grid-cols-1 items-center gap-xl md:grid-cols-2">
          <div className="z-10 space-y-lg">
            <HeroBadge icon="menu_book" label="Visual Sensemaking" />
            <h1 className="font-display text-display-xl text-on-background">Comics</h1>
            <p className="max-w-lg text-body-lg text-on-surface-variant">
              Visual stories to help you slow down and see the signals. Explore how Charleen and
              others navigate the messy digital landscape.
            </p>
            <div className="flex items-center gap-md">
              <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-primary/20">
                <img
                  alt="Julian Lawrence"
                  className="h-full w-full object-cover"
                  src={PROJECT_TEAM.julianLawrence}
                />
              </div>
              <div>
                <p className="text-body-sm text-on-surface-variant">In collaboration with</p>
                <a
                  href={JULIAN_LAWRENCE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body-md font-bold text-primary hover:underline"
                >
                  Julian Lawrence
                </a>
              </div>
            </div>
          </div>
          <AmitoSpotlight
            src={AMITO_IMAGES.comics}
            alt="Amito reading a comic"
            imageClassName="relative z-10 max-w-sm -rotate-3 object-contain transition-transform duration-500 hover:rotate-2"
            glow="primary"
            glowClassName="bg-primary/5 blur-3xl aura-glow"
          />
        </div>
      </section>

      <section className="py-xl">
        <div className="mx-auto max-w-3xl px-margin-mobile text-center md:px-margin-desktop">
          <div className="mb-md inline-flex items-center gap-sm text-stop-red">
            <Icon name="menu_book" />
            <span className="font-label-md uppercase tracking-wider">Literacy Tool</span>
          </div>
          <h2 className="mb-md font-display text-headline-md">Why Comics?</h2>
          <p className="text-body-md leading-relaxed text-on-surface-variant">
            Visual narratives let us observe digital behaviors from a distance. By watching
            characters react to sensationalist media, we can recognize our own impulses to click
            and react — translating complex sensemaking into everyday scrolling habits.
          </p>
        </div>
      </section>

      <section className="bg-surface-cream/30 py-xxl">
        <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 gap-lg md:grid-cols-2">
            {COMICS.map((comic) => (
              <Link
                key={comic.id}
                to={`/comics/${comic.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-on-surface/10 bg-white shadow-sm transition-transform hover:-translate-y-1"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-on-background">
                  <img
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={comicThumbnail(comic)}
                    loading="lazy"
                  />
                  <div className="absolute right-md top-md">
                    <span className="rounded-full bg-stop-red px-md py-xs font-label-md text-white shadow-lg">
                      New Release
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-lg">
                  <h3 className="mb-xs font-display text-headline-md transition-colors group-hover:text-primary">
                    {comic.title}
                  </h3>
                  <p className="mb-sm text-body-sm font-semibold text-primary">
                    By {comic.author}
                  </p>
                  <p className="mb-xl flex-grow text-body-sm text-on-surface-variant">
                    {comic.summary}
                  </p>
                  <span className="flex w-full items-center justify-center gap-sm rounded-full bg-primary-container py-md font-label-md text-white">
                    Read Comic <Icon name="arrow_forward" className="text-[18px]" />
                  </span>
                </div>
              </Link>
            ))}

            <div className="flex min-h-[500px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-outline-variant bg-white/50 p-xl text-center">
              <div className="mb-lg flex h-20 w-20 items-center justify-center rounded-full bg-surface-variant">
                <Icon name="hourglass_top" className="text-display-lg text-primary/40" />
              </div>
              <h3 className="mb-sm font-display text-headline-md text-on-surface-variant">
                More coming soon
              </h3>
              <p className="max-w-[200px] text-body-sm text-on-surface-variant">
                Amito is busy sketching more stories to help you navigate the web.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-margin-mobile py-xl md:px-margin-desktop">
        <div className="relative mx-auto flex max-w-container-max flex-col items-center justify-between gap-lg overflow-hidden rounded-3xl bg-primary p-xl text-white md:flex-row">
          <div className="z-10 text-center md:text-left">
            <h3 className="mb-xs font-display text-headline-md">Explore the framework too</h3>
            <p className="text-body-md opacity-90">
              Comics complement the guided lesson and case files — start with STOP&SCAN when
              you&apos;re ready.
            </p>
          </div>
          <Link to="/learn" className="z-10 rounded-full bg-white px-xl py-md font-label-md text-primary shadow-lg transition-transform hover:scale-95 active:scale-95">
            Start Learning
          </Link>
        </div>
      </section>
    </div>
  );
}
