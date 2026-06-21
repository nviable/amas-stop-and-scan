import { Link } from "react-router-dom";
import Amito from "../components/Amito";
import { STEPS } from "../lib/framework";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container-page grid items-center gap-10 py-14 md:grid-cols-2 md:py-20">
          <div>
            <span className="chip border-alignment/30 bg-alignment/10 text-alignment">
              Guided by Amito
            </span>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
              The internet moves fast.
              <br />
              Your judgment doesn't have to.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-ink/70">
              STOP&SCAN is a simple way to pause, check where information came
              from, understand what it's trying to make you feel, compare it with
              outside evidence, and decide what to do next.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/learn" className="btn-primary">
                Learn STOP&SCAN
              </Link>
              <Link to="/practice/celebrity-investment-scam" className="btn-accent">
                Try a Case File
              </Link>
            </div>
            <p className="mt-4 text-sm text-ink/50">
              Pause before you trust · Scan before you share · Reflect before you act
            </p>
          </div>

          <div className="relative flex justify-center">
            <div className="absolute -z-0 h-72 w-72 rounded-full bg-alignment/20 blur-3xl" />
            <Amito state="greeting" size="xl" float />
            <span className="absolute bottom-6 right-2 animate-float rounded-2xl border border-ink/10 bg-white px-4 py-2 font-display font-bold shadow-soft">
              I'll guide you. 👋
            </span>
          </div>
        </div>
      </section>

      {/* Two paths */}
      <section className="container-page grid gap-5 pb-4 md:grid-cols-2">
        <Link
          to="/learn"
          className="card group transition-transform hover:-translate-y-1"
        >
          <div className="text-sm font-bold uppercase tracking-wide text-ink/40">
            For first-time users
          </div>
          <h2 className="mt-1 font-display text-2xl font-extrabold">
            Learn STOP&SCAN
          </h2>
          <p className="mt-2 text-ink/70">
            Walk through the framework step by step with Amito and a real-world
            example. Build the habit before you need it.
          </p>
          <span className="mt-4 inline-block font-bold text-alignment group-hover:underline">
            Start the lesson →
          </span>
        </Link>

        <Link
          to="/practice"
          className="card group transition-transform hover:-translate-y-1"
        >
          <div className="text-sm font-bold uppercase tracking-wide text-ink/40">
            Already know it?
          </div>
          <h2 className="mt-1 font-display text-2xl font-extrabold">
            Practice with Case Files
          </h2>
          <p className="mt-2 text-ink/70">
            Apply STOP&SCAN to example scenarios and reflect on how your judgment
            changes. Save each run to your journal.
          </p>
          <span className="mt-4 inline-block font-bold text-alignment group-hover:underline">
            Browse case files →
          </span>
        </Link>
      </section>

      {/* The five steps */}
      <section className="container-page py-14">
        <div className="text-center">
          <h2 className="font-display text-3xl font-extrabold">
            One pause. Five moves.
          </h2>
          <p className="mt-2 text-ink/60">
            STOP is your pre-commitment. SCAN is how you check.
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s) => (
            <Link
              to={`/resources/${s.key}`}
              key={s.key}
              className="card transition-transform hover:-translate-y-1"
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl font-display text-sm font-extrabold text-white"
                style={{ backgroundColor: s.hex }}
              >
                {s.letter}
              </div>
              <h3 className="mt-3 font-display text-lg font-extrabold">
                {s.title}
              </h3>
              <p className="mt-1 text-sm text-ink/65">{s.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Comics */}
      <section className="container-page py-14">
        <div className="card overflow-hidden p-0 md:grid md:grid-cols-2">
          <div className="relative min-h-[220px] overflow-hidden bg-ink md:min-h-[320px]">
            <img
              src="/comics/stop-and-scan-cover.png"
              alt="STOP & SCAN! Real or AI? — comic cover art showing a person overwhelmed by sensational headlines on their phone"
              className="absolute inset-0 h-full w-[145%] max-w-none object-cover object-[18%_top] sm:w-[130%] md:w-[155%] md:object-[12%_top]"
            />
          </div>
          <div className="flex flex-col justify-center p-8">
            <span className="chip w-fit border-ink/15 bg-cream text-ink/70">
              Supplementary literacy
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold">
              Read it as a comic strip
            </h2>
            <p className="mt-3 text-ink/70">
              Visual stories that complement the framework — panel by panel
              explorations of real-or-AI judgment, developed with cartoonist and
              educator Julian Lawrence and his students at Teesside University.
            </p>
            <Link to="/comics" className="btn-primary mt-6 w-fit">
              Browse comics →
            </Link>
          </div>
        </div>
      </section>

      {/* Thesis band */}
      <section className="container-page pb-6">
        <div className="card bg-ink text-white">
          <p className="mx-auto max-w-3xl text-center font-display text-xl font-bold leading-relaxed sm:text-2xl">
            STOP&SCAN helps you pause before you trust, scan before you share,
            and reflect before you act.{" "}
            <span className="text-alignment">Amito is your friendly guide.</span>
          </p>
        </div>
      </section>
    </div>
  );
}
