import type { Metadata } from "next";

export const metadata: Metadata = { title: "Editorial Policy", description: "How Still Talking selects, reports, reviews, and updates guidance for parents of adult children.", alternates: { canonical: "/editorial-policy" } };

export default function EditorialPolicyPage() {
  return <article className="policy"><div className="container"><div className="eyebrow">Our standards</div><h1 className="serif">Editorial Policy</h1><p className="lede">Still Talking publishes practical guidance for parents who want a respectful relationship with their adult children. We favor fewer, better articles over publishing for volume.</p>
    <h2>How we choose and shape articles</h2><p>Each article begins with a specific reader question and must make a distinct argument. We look for situations readers can picture, language a family could actually use, and a next step that does not promise a guaranteed outcome.</p>
    <h2>Evidence and examples</h2><p>Non-obvious factual claims should link to primary research, government data, or an authoritative organization. When dialogue or a family scene is a composite example, the article labels it clearly. We do not present invented scenes as interviews, reader submissions, or personal memories.</p>
    <h2>Fairness and safety</h2><p>Our advice takes parents’ concerns seriously while preserving an adult child’s autonomy. We avoid diagnosis and individualized medical, legal, therapeutic, or financial advice. Sensitive topics should explain when qualified professional help may be appropriate.</p>
    <h2>Review and independence</h2><p>Published work is reviewed for reasoning, tone, sourcing, originality, and cultural context. Commercial links do not determine editorial conclusions, and an article must remain useful if a reader never opens an external resource.</p>
  </div><style>{`.policy{padding:58px 0 76px}.policy .container{max-width:820px}.policy h1{font-size:clamp(3.2rem,7vw,5.5rem);margin:10px 0 22px}.policy .lede{font-size:20px;line-height:1.7}.policy h2{font-family:var(--font-serif,Georgia,serif);font-size:30px;margin:38px 0 10px}.policy p{color:var(--muted);line-height:1.75}`}</style></article>;
}
