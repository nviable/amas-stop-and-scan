import { Link } from "react-router-dom";

const differentiators = [
  {
    title: "Pre-commitment gut check",
    body: "You form an explicit judgment before investigating. Borrowed from digital-forensics practice, this prevents anchoring on what you find and enables honest before/after reflection.",
  },
  {
    title: "Reasoning, not artifact detection",
    body: "Detection checklists don't reliably improve accuracy, and AI artifacts are a moving target. STOP&SCAN targets source, context, and verification — processes that stay valid as technology evolves.",
  },
  {
    title: "Uncertainty as a valid outcome",
    body: "\"Not decided yet\" is a complete, responsible answer. This counters the poorly-calibrated overconfidence that drives misinformation acceptance.",
  },
  {
    title: "Teaching manipulation mechanics",
    body: "Each step explains the why — how broken provenance, emotional amplification, and isolated claims work — so you resist the next iteration, not just today's example.",
  },
];

export default function Project() {
  return (
    <div className="container-page py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl font-extrabold">The project</h1>
        <p className="mt-3 text-lg text-ink/75">
          STOP&SCAN is a scaffolded sensemaking framework for trust calibration
          in the age of AI-generated and synthetic media. It targets the human
          cognitive layer — how people interpret signals and how bias shapes
          judgment — rather than any single detection technology.
        </p>

        <h2 className="mt-10 font-display text-2xl font-extrabold">
          Why a framework, not a detector
        </h2>
        <p className="mt-3 text-ink/75">
          On average, people perform no better than chance at spotting deepfakes,
          and are often most confident when they're wrong. Even when detection
          tools exist, users rarely consult them, and labels can backfire by
          making unlabeled content seem more true. A list of visual cues to look
          for has been shown not to improve accuracy. The gap is with the
          reasoner — so that's where STOP&SCAN intervenes.
        </p>

        <h2 className="mt-10 font-display text-2xl font-extrabold">
          What makes it different
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {differentiators.map((d) => (
            <div key={d.title} className="card">
              <h3 className="font-display font-extrabold">{d.title}</h3>
              <p className="mt-1.5 text-sm text-ink/70">{d.body}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-10 font-display text-2xl font-extrabold">
          Who it's for
        </h2>
        <p className="mt-3 text-ink/75">
          The primary audience is young adults and adolescents (16–25) in
          educational contexts — the group forming epistemic habits right now,
          in the most challenging information environment in history. A secondary
          audience is general adults making high-stakes decisions based on social
          media in financial, health, electoral, and legal domains.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="card bg-alignment/5">
            <h3 className="font-display font-extrabold">UN SDG 4</h3>
            <p className="mt-1 text-sm text-ink/70">
              Quality Education — promoting critical thinking and media literacy.
            </p>
          </div>
          <div className="card bg-source/5">
            <h3 className="font-display font-extrabold">UN SDG 16</h3>
            <p className="mt-1 text-sm text-ink/70">
              Peace, Justice & Strong Institutions — informed, discerning publics
              and resilience against information-based manipulation.
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-3xl bg-ink p-8 text-center text-white">
          <p className="font-display text-xl font-bold">
            Grounded in scaffolded learning, psychological inoculation, and
            human-AI trust calibration.
          </p>
          <Link to="/learn" className="btn-accent mt-5">
            Try the framework →
          </Link>
        </div>
      </div>
    </div>
  );
}
