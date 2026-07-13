import type { Metadata } from "next";

export const metadata: Metadata = { title: "AI Use Policy", description: "How Still Talking discloses and governs the use of AI-assisted tools in editorial work.", alternates: { canonical: "/ai-use-policy" } };

export default function AiUsePolicyPage() {
  return <article className="policy"><div className="container"><div className="eyebrow">Transparency</div><h1 className="serif">AI Use Policy</h1><p className="lede">AI-assisted tools may support parts of production, but they do not replace editorial responsibility, source verification, or human judgment.</p>
    <h2>Illustrations</h2><p>Still Talking uses AI-generated illustrations and labels them in article captions. Images must not imitate a living artist, contain generated logos or watermarks, or be reused as generic decoration across unrelated articles.</p>
    <h2>Research and drafting</h2><p>AI tools may help organize notes, explore wording, or identify questions for further research. They are not treated as factual sources. Claims must be checked against traceable primary or authoritative material before publication.</p>
    <h2>Editorial responsibility</h2><p>Editors remain responsible for the argument, tone, sourcing, examples, and final language. We do not use AI to invent credentials, interviews, reader stories, quotations, research, or publication history. AI output is not professional medical, legal, financial, or therapeutic judgment.</p>
  </div><style>{`.policy{padding:58px 0 76px}.policy .container{max-width:820px}.policy h1{font-size:clamp(3.2rem,7vw,5.5rem);margin:10px 0 22px}.policy .lede{font-size:20px;line-height:1.7}.policy h2{font-family:var(--font-serif,Georgia,serif);font-size:30px;margin:38px 0 10px}.policy p{color:var(--muted);line-height:1.75}`}</style></article>;
}
