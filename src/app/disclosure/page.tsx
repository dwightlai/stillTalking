import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclosure",
  description: "How Still Talking handles recommendations, partnerships, and editorial independence.",
};

export default function DisclosurePage() {
  return (
    <div className="container narrow-page">
      <div className="eyebrow">Transparency</div>
      <h1 className="serif">Disclosure</h1>
      <p className="intro">
        Trust matters more than a commission. Still Talking identifies paid
        relationships clearly and keeps commercial decisions separate from
        editorial conclusions.
      </p>
      <section>
        <h2 className="serif">Recommendations</h2>
        <p>
          Some future links may be affiliate links. If a purchase earns us a
          commission, the price you pay will not change and the relationship
          will be disclosed near the link.
        </p>
      </section>
      <section>
        <h2 className="serif">Editorial independence</h2>
        <p>
          Partners cannot purchase favorable coverage. We do not recommend a
          product simply because it pays a higher commission.
        </p>
      </section>
      <section>
        <h2 className="serif">Scope</h2>
        <p>
          Our articles are educational and are not a substitute for therapy,
          legal advice, medical care, or financial advice.
        </p>
      </section>
      <style>{`
        .narrow-page { max-width: 760px; padding-top: 70px; padding-bottom: 40px; }
        h1 { font-size: clamp(44px, 7vw, 76px); margin: 12px 0 20px; }
        .intro { font-size: 20px; line-height: 1.65; color: var(--muted); }
        section { border-top: 1px solid var(--line); padding-top: 28px; margin-top: 34px; }
        section h2 { font-size: 28px; margin: 0 0 12px; }
        section p { color: var(--muted); line-height: 1.75; }
      `}</style>
    </div>
  );
}
