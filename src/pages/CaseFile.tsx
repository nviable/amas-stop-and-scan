import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Amito from "../components/Amito";
import LessonEngine from "../components/lesson/LessonEngine";
import { getCaseBySlug } from "../data/cases";

const KIND_LABEL: Record<string, string> = {
  scam: "Financial scam",
  authentic: "Authentic content",
  decontextualized: "Decontextualized footage",
};

export default function CaseFile() {
  const { slug } = useParams();
  const data = slug ? getCaseBySlug(slug) : undefined;
  const [started, setStarted] = useState(false);

  if (!data) {
    return (
      <div className="container-page py-20 text-center">
        <Amito state="reflect" size="lg" className="mx-auto" />
        <h1 className="mt-4 font-display text-3xl font-extrabold">
          Case file not found
        </h1>
        <p className="mt-2 text-ink/60">
          This case isn't available yet. Try the library.
        </p>
        <Link to="/practice" className="btn-primary mt-6">
          Back to Practice
        </Link>
      </div>
    );
  }

  if (started) return <LessonEngine data={data} />;

  return (
    <div className="container-page py-12">
      <div className="mx-auto max-w-2xl text-center">
        <div className="flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wide text-ink/40">
          <span>{KIND_LABEL[data.kind] ?? data.kind}</span>·
          <span>{data.difficulty}</span>·<span>{data.estMinutes} min</span>
        </div>
        <h1 className="mt-2 font-display text-4xl font-extrabold">
          {data.title}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-lg text-ink/70">
          {data.summary}
        </p>
        <Amito state="stop" size="lg" float className="mx-auto mt-6" />
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button onClick={() => setStarted(true)} className="btn-primary">
            Begin this case →
          </button>
          <Link to="/practice" className="btn-ghost">
            Back to library
          </Link>
        </div>
      </div>
    </div>
  );
}
