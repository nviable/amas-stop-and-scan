import { Link } from "react-router-dom";
import Amito from "../components/Amito";
import { STEPS, type AmitoState } from "../lib/framework";

const poses: { state: AmitoState; label: string }[] = [
  { state: "greeting", label: "Greeting" },
  { state: "stop", label: "Stop" },
  { state: "source", label: "Source" },
  { state: "content", label: "Content" },
  { state: "alignment", label: "Alignment" },
  { state: "reflect", label: "Reflect" },
  { state: "reward", label: "Reward" },
];

export default function MeetAmito() {
  return (
    <div className="container-page py-12">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <h1 className="font-display text-4xl font-extrabold">Meet Amito</h1>
          <p className="mt-3 text-lg text-ink/75">
            Amito is the friendly messenger for STOP&SCAN: part assistant, part
            toolkit, part reminder to slow down before trusting what you see
            online.
          </p>
          <p className="mt-3 text-ink/70">
            Synthetic media and misinformation can feel intimidating. Amito makes
            the process approachable — guiding you through each step without ever
            making you feel foolish for trusting what looked real.
          </p>
        </div>
        <div className="flex justify-center">
          <Amito state="greeting" size="xl" float />
        </div>
      </div>

      <h2 className="mt-14 font-display text-2xl font-extrabold">
        Amito's colors
      </h2>
      <p className="mt-2 text-ink/65">
        Each STOP&SCAN step has a matching Amito cue, so the framework becomes
        something you can see and feel.
      </p>
      <div className="mt-5 overflow-hidden rounded-3xl border border-ink/10">
        <table className="w-full text-left">
          <thead className="bg-ink text-white">
            <tr>
              <th className="px-5 py-3 font-display">Framework step</th>
              <th className="px-5 py-3 font-display">Amito cue</th>
            </tr>
          </thead>
          <tbody>
            {STEPS.map((s, i) => (
              <tr key={s.key} className={i % 2 ? "bg-white" : "bg-cream/40"}>
                <td className="px-5 py-3 font-bold">
                  <span
                    className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded text-xs font-extrabold text-white"
                    style={{ backgroundColor: s.hex }}
                  >
                    {s.letter}
                  </span>
                  {s.title}
                </td>
                <td className="px-5 py-3 text-ink/75">{s.cue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-14 font-display text-2xl font-extrabold">
        Amito's poses
      </h2>
      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {poses.map((p) => (
          <div key={p.state} className="card flex flex-col items-center gap-2">
            <Amito state={p.state} size="md" />
            <span className="font-display font-bold">{p.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-3xl bg-alignment/10 p-8 text-center">
        <p className="font-display text-xl font-bold">
          Amito carries the experience — but STOP&SCAN is the habit.
        </p>
        <Link to="/learn" className="btn-primary mt-5">
          Walk through it with Amito →
        </Link>
      </div>
    </div>
  );
}
