import { Link } from "react-router-dom";
import Amito from "../components/Amito";

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <Amito state="alignment" size="lg" float className="mx-auto" />
      <h1 className="mt-4 font-display text-4xl font-extrabold">
        Hmm — nothing here yet
      </h1>
      <p className="mt-2 text-ink/60">
        That page doesn't exist. Let's get you back on track.
      </p>
      <Link to="/" className="btn-primary mt-6">
        Back home
      </Link>
    </div>
  );
}
