import { Link } from "react-router-dom";
import { AMITO_IMAGES } from "../lib/assets";

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <img alt="Amito" className="mx-auto h-48 w-48 animate-float object-contain" src={AMITO_IMAGES.alignment} />
      <h1 className="mt-md font-display text-display-xl">Hmm — nothing here yet</h1>
      <p className="mt-2 text-on-surface-variant">
        That page doesn&apos;t exist. Let&apos;s get you back on track.
      </p>
      <Link to="/" className="btn-primary mt-lg">
        Back home
      </Link>
    </div>
  );
}
