import type { Metadata } from "next";

export const metadata: Metadata = { title: "Fact Checking and Corrections", description: "How Still Talking checks factual claims and handles corrections and meaningful updates.", alternates: { canonical: "/fact-checking-and-corrections" } };

export default function CorrectionsPage() {
  return <article className="policy"><div className="container"><div className="eyebrow">Accuracy</div><h1 className="serif">Fact Checking &amp; Corrections</h1><p className="lede">Trust depends on showing readers what supports a claim and correcting meaningful errors transparently.</p>
    <h2>Source checks</h2><p>Editors check names, dates, statistics, study scope, quotations, and links against the cited source. We prefer original research and official datasets over summaries when they are available, and we avoid extending findings beyond the population studied.</p>
    <h2>Updates</h2><p>Articles display an updated date when a substantive change is made. Routine copy edits that do not alter meaning may not receive a separate note. A correction that changes the reader’s understanding should be explained on the affected page.</p>
    <h2>Requesting a correction</h2><p>Readers can report a possible error through the editorial contact listed on the About page. A useful correction request includes the article URL, the exact passage, and a source supporting the concern. We review the underlying evidence before changing the article.</p>
  </div><style>{`.policy{padding:58px 0 76px}.policy .container{max-width:820px}.policy h1{font-size:clamp(3.2rem,7vw,5.5rem);margin:10px 0 22px}.policy .lede{font-size:20px;line-height:1.7}.policy h2{font-family:var(--font-serif,Georgia,serif);font-size:30px;margin:38px 0 10px}.policy p{color:var(--muted);line-height:1.75}`}</style></article>;
}
