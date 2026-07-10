import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Still Talking exists, the perspective behind its family guidance, and how its editorial team handles evidence and composite examples.",
};

export default function AboutPage() {
  return (
    <section className="about-page">
      <div className="container">
        <div className="about-hero">
          <div>
            <div className="eyebrow">About Still Talking</div>
            <h1 className="serif">
              Understand their world. Stay part of their life.
            </h1>
            <p className="about-intro">
              Still Talking is an independent editorial project for parents
              who want a close relationship with their adult children without
              confusing closeness with authority.
            </p>
          </div>
          <div className="about-image">
            <Image
              src="/images/about-editorial-desk.webp"
              alt="An editorial desk with research pages, a notebook, and two empty chairs representing both generations in the conversation"
              fill
              sizes="(max-width: 800px) 100vw, 45vw"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </div>

        <div className="about-sections">
          <section>
            <div className="eyebrow">Why this exists</div>
            <h2 className="serif">Family advice often asks someone to disappear.</h2>
            <p>
              Some advice asks adult children to accept control in the name of
              gratitude. Other advice treats distance as the only proof of a
              healthy boundary. We started Still Talking to make room for a
              harder possibility: two adults can disagree, change the family
              pattern, and keep the door open.
            </p>
          </section>
          <section>
            <div className="eyebrow">Our point of view</div>
            <h2 className="serif">Impact matters. So does the relationship.</h2>
            <p>
              We write from the perspective of young adults, in language
              designed to keep parents in the conversation. We take parental
              worry seriously without giving it the final vote over another
              adult&apos;s life. We criticize patterns, not people.
            </p>
          </section>
          <section>
            <div className="eyebrow">How we work</div>
            <h2 className="serif">No invented experts. No disguised fiction.</h2>
            <p>
              Articles are published under the collective byline Still Talking
              Editors. We do not claim clinical credentials, invent reader
              letters, or present composite examples as interviews. Research
              claims link to their sources, and composite scenarios are labeled.
              AI-generated editorial illustrations are disclosed on every
              article that uses one.
            </p>
          </section>
          <section>
            <div className="eyebrow">What this is not</div>
            <h2 className="serif">A starting point, not professional care.</h2>
            <p>
              Still Talking offers education and conversation tools. It is not
              therapy, diagnosis, legal advice, medical care, or individualized
              financial advice. When safety, abuse, addiction, or serious
              mental health concerns are involved, a qualified local
              professional is the appropriate next step.
            </p>
          </section>
        </div>
      </div>
      <style>{`
        .about-page { padding:64px 0 76px; }
        .about-hero { display:grid; grid-template-columns:1.05fr .95fr; gap:54px; align-items:center; }
        .about-hero h1 { font-size:clamp(3rem,6vw,5.2rem); line-height:1; margin:10px 0 24px; }
        .about-intro { color:var(--muted); font-size:20px; line-height:1.65; max-width:650px; }
        .about-image { position:relative; aspect-ratio:4/3; background:#e7e9e5; }
        .about-sections { display:grid; grid-template-columns:1fr 1fr; gap:0 54px; margin-top:68px; border-top:1px solid var(--line); }
        .about-sections section { padding:34px 0; border-bottom:1px solid var(--line); }
        .about-sections h2 { font-size:30px; line-height:1.15; margin:9px 0 14px; }
        .about-sections p { color:var(--muted); line-height:1.72; margin:0; }
        @media(max-width:800px) {
          .about-hero { grid-template-columns:1fr; gap:30px; }
          .about-sections { grid-template-columns:1fr; margin-top:48px; }
        }
      `}</style>
    </section>
  );
}
