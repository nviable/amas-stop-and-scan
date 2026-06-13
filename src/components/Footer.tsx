import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-ink/10 bg-white no-print">
      <div className="container-page grid gap-8 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <div className="font-display text-lg font-extrabold">
            STOP<span className="text-alignment">&</span>SCAN
          </div>
          <p className="mt-2 max-w-xs text-sm text-ink/60">
            Pause before you trust, scan before you share, and reflect before you
            act. Amito is your friendly guide.
          </p>
        </div>
        <div>
          <h4 className="font-display font-bold">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm text-ink/70">
            <li><Link className="hover:text-ink" to="/learn">Learn STOP&SCAN</Link></li>
            <li><Link className="hover:text-ink" to="/practice">Practice with Case Files</Link></li>
            <li><Link className="hover:text-ink" to="/resources">Resource hub</Link></li>
            <li><Link className="hover:text-ink" to="/journal">My Journal</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-bold">About</h4>
          <ul className="mt-3 space-y-2 text-sm text-ink/70">
            <li><Link className="hover:text-ink" to="/project">The project</Link></li>
            <li><Link className="hover:text-ink" to="/amito">Meet Amito</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-bold">The habit</h4>
          <p className="mt-3 text-sm text-ink/70">
            "I don't know yet" is a complete and honest answer. Uncertainty,
            properly calibrated, is protective.
          </p>
        </div>
      </div>
      <div className="border-t border-ink/10 py-5 text-center text-xs text-ink/50">
        A scaffolded sensemaking framework for trust calibration. Educational use.
      </div>
    </footer>
  );
}
