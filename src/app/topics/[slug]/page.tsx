import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { getArticlesByTopic, getTopic, topics, type TopicSlug } from "@/lib/articles";

const content: Record<TopicSlug, { intro: string; sections: Array<{ title: string; body: string }>; faqs: Array<{ question: string; answer: string }> }> = {
  communication: {
    intro: "Good communication with an adult child is less about finding a perfect phrase than changing what the conversation asks of them. Contact works best when it is reliable but voluntary, advice begins with permission, and disagreement does not become a test of loyalty.",
    sections: [
      { title: "Make room for a real answer", body: "Questions can invite connection or demand reassurance. Ask one clear question, listen past the first answer, and resist turning a short reply into evidence that the relationship is failing." },
      { title: "Offer advice by consent", body: "Experience is useful when it responds to the decision your adult child is actually making. Ask whether they want ideas, help, or simply a listener before explaining what you would do." },
      { title: "Build a sustainable contact rhythm", body: "There is no universal calling schedule. A healthy rhythm is one both people can rely on without using response time, frequency, or enthusiasm as a measure of love." },
    ],
    faqs: [
      { question: "How often should adult children call their parents?", answer: "There is no single healthy schedule. Agree on a rhythm that respects both people's lives and does not turn contact into an obligation test." },
      { question: "Why does my adult child share less with me?", answer: "They may be busy, protecting privacy, or avoiding a familiar response such as advice or criticism. Curiosity without pressure makes future sharing safer." },
      { question: "Should I keep giving advice if I know it would help?", answer: "Ask permission first. Advice has a better chance of helping when the adult child wants it and still owns the final decision." },
    ],
  },
  boundaries: {
    intro: "Healthy boundaries do not end closeness. They clarify which choices, spaces, information, and consequences belong to each adult. Parents can care deeply while allowing an adult child to decide what to share and how to live.",
    sections: [
      { title: "Separate care from access", body: "Love does not create an automatic right to passwords, keys, medical details, location data, or immediate replies. Closeness remains stronger when access is offered rather than extracted." },
      { title: "Notice when concern becomes control", body: "Concern describes your feeling. Control begins when support, persistence, or consequences are used to force the decision you prefer. The practical test is whether the other adult can still say no." },
      { title: "State your own limits clearly", body: "A boundary names what you will do, fund, host, or participate in. It is not a disguised instruction about another adult's choices. Clear limits reduce resentment on both sides." },
    ],
    faqs: [
      { question: "What are healthy boundaries with adult children?", answer: "They respect privacy and decision-making while making each person's limits around time, money, housing, and communication clear." },
      { question: "Is privacy a sign of distance?", answer: "Not necessarily. Adult privacy can make closeness feel voluntary and safe rather than monitored." },
      { question: "How can I tell if I am being controlling?", answer: "Look at whether your adult child can decline advice or help without repeated pressure, punishment, withdrawal, or financial leverage." },
    ],
  },
  "money-and-support": {
    intro: "Financial help can create breathing room, but unclear help easily becomes an unspoken contract. Healthy support names the amount, duration, purpose, and limits while keeping unrelated adult choices outside the agreement.",
    sections: [
      { title: "Make the terms visible", body: "Decide whether money is a gift, loan, or recurring contribution before it changes hands. Put repayment and review dates in writing when needed so neither person has to guess." },
      { title: "Keep help separate from authority", body: "Funding one expense does not automatically create a vote on relationships, careers, purchases, or parenting. If a condition truly matters, state it before the help is accepted." },
      { title: "Protect the parent's stability", body: "Support should not compromise retirement, emergency savings, or essential care. A respectful no can preserve the relationship better than help given with fear and resentment." },
    ],
    faqs: [
      { question: "How much financial help should parents give adult children?", answer: "Only what fits the parent's finances and a clearly defined purpose. The right amount is sustainable and does not require hidden control." },
      { question: "Should family loans be written down?", answer: "Writing down the amount, repayment plan, and what happens if circumstances change prevents different memories from becoming conflict." },
      { question: "When does help become enabling?", answer: "A warning sign is support that repeatedly removes consequences without a shared plan, while harming the parent's stability or prolonging a pattern neither person wants." },
    ],
  },
  independence: {
    intro: "An adult child's independence develops through real responsibility, not the absence of family support. Parents can help with a move, career change, or housing transition while leaving decisions and workable consequences with the adult child.",
    sections: [
      { title: "Let ownership match responsibility", body: "The person responsible for rent, applications, schedules, or household tasks needs meaningful authority over those decisions. Help works best when it strengthens that ownership." },
      { title: "Agree on help before acting", body: "Ask what would be useful rather than taking over logistics. A defined task—reviewing a lease, lending a vehicle, or packing one room—often helps more than managing the whole transition." },
      { title: "Expect learning, not perfect execution", body: "Adult competence grows through choices, mistakes, and repair. Avoid treating a different method or a manageable setback as proof that independence was premature." },
    ],
    faqs: [
      { question: "How can I help my adult child move out?", answer: "Agree on specific practical help while leaving the timeline, tradeoffs, and final decisions with the person moving." },
      { question: "Should parents solve problems an adult child could solve?", answer: "Usually, start with questions and limited support. Taking over can remove the practice and confidence that independence requires." },
      { question: "What if my adult child makes a mistake?", answer: "Distinguish manageable consequences from genuine danger. Many ordinary mistakes are part of learning and do not require parental rescue." },
    ],
  },
  "family-relationships": {
    intro: "When children become adults, family love remains while roles change. Partners, grandchildren, holidays, and new traditions require parents to move from central decision-maker to respected family member.",
    sections: [
      { title: "Respect the new primary household", body: "An adult child and their partner make decisions about their home, time, celebrations, and children. Parents stay closer when they do not recruit the adult child against a partner." },
      { title: "Hold hopes without assigning them", body: "Marriage and grandchildren may matter deeply to a parent, but those hopes cannot become another adult's deadline. Honest longing is different from repeated persuasion." },
      { title: "Create traditions that can change", body: "A changed holiday or shorter visit is not necessarily rejection. Flexible traditions make room for work, travel, partners, children, and multiple families without demanding a loyalty contest." },
    ],
    faqs: [
      { question: "How should parents adjust when an adult child marries?", answer: "Treat the couple as the primary decision-making unit for their household and speak directly without asking the adult child to take sides." },
      { question: "Is it wrong to want grandchildren?", answer: "No. The longing can be real, but the decision belongs to the adult child. Share feelings sparingly and do not turn them into pressure." },
      { question: "How do families handle changing holiday plans?", answer: "Discuss plans early, separate time from loyalty, and build traditions flexible enough to include more than one household." },
    ],
  },
  "conflict-and-repair": {
    intro: "Repair begins when the goal shifts from winning agreement to making the relationship safer. A useful apology names the harm, accepts the other person's timeline, and is followed by a visible change in behavior.",
    sections: [
      { title: "Own the specific harm", body: "Avoid apologies that explain away the impact or require reassurance. Name what you did, recognize how it may have landed, and do not make forgiveness the next obligation." },
      { title: "Keep adult children out of couple conflict", body: "Asking an adult child to judge, carry messages, or choose a side places the relationship under strain. Address conflict with the person involved or seek appropriate outside support." },
      { title: "Let changed behavior carry the apology", body: "One conversation cannot restore trust by itself. Follow through on boundaries, reduce repeated pressure, and allow the other person to decide how quickly contact becomes comfortable." },
    ],
    faqs: [
      { question: "How do I apologize to my adult child?", answer: "Name the action and impact, take responsibility without a defense, say what will change, and leave the timing of forgiveness to them." },
      { question: "Should I keep contacting an adult child who wants space?", answer: "Honor the stated boundary. If contact is permitted, keep it low-pressure and do not use repeated messages to force a response." },
      { question: "Can trust be rebuilt after family conflict?", answer: "Sometimes, but no one can guarantee the outcome. Consistent respect and changed behavior create better conditions for repair than persuasion does." },
    ],
  },
};

export function generateStaticParams() {
  return topics.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) return {};
  return { title: topic.title, description: topic.shortDescription, alternates: { canonical: `/topics/${topic.slug}` } };
}

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();
  const topicContent = content[topic.slug];
  const articles = getArticlesByTopic(topic.slug);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://stilltalkingfamily.com";
  const breadcrumbLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: topic.name, item: `${siteUrl}/topics/${topic.slug}` },
  ] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: topicContent.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) };

  return <section className="topic-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd).replaceAll("<", "\\u003c") }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd).replaceAll("<", "\\u003c") }} />
    <div className="container topic-shell">
      <nav aria-label="Breadcrumb" className="topic-breadcrumb"><Link href="/">Home</Link><span>/</span><span aria-current="page">{topic.name}</span></nav>
      <header><div className="eyebrow">Advice topic</div><h1 className="serif">{topic.title}</h1><p>{topicContent.intro}</p></header>
      <nav aria-label="On this page" className="topic-jumps"><strong>On this page</strong>{topicContent.sections.map((section, index) => <a key={section.title} href={`#section-${index + 1}`}>{section.title}</a>)}<a href="#frequently-asked-questions">Frequently asked questions</a></nav>
      <div className="topic-copy">{topicContent.sections.map((section, index) => <section id={`section-${index + 1}`} key={section.title}><h2 className="serif">{section.title}</h2><p>{section.body}</p></section>)}</div>
      <section aria-labelledby="topic-articles"><div className="eyebrow">Related advice</div><h2 id="topic-articles" className="serif">Questions within {topic.name.toLowerCase()}</h2><div className="topic-articles">{articles.map((article) => <ArticleCard key={article.slug} article={article} />)}</div></section>
      <section id="frequently-asked-questions" className="topic-faq"><div className="eyebrow">FAQ</div><h2 className="serif">Frequently asked questions</h2>{topicContent.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</section>
    </div>
    <style>{`.topic-page{padding:48px 0 72px}.topic-shell{max-width:1080px}.topic-breadcrumb{display:flex;gap:8px;color:var(--muted);font-size:13px;margin-bottom:34px}.topic-breadcrumb a{text-decoration:underline}.topic-page header{max-width:900px}.topic-page h1{font-size:clamp(3rem,7vw,5.5rem);line-height:.98;margin:10px 0 20px;text-wrap:balance}.topic-page header>p{font-size:20px;line-height:1.7;color:var(--muted);max-width:800px}.topic-jumps{display:flex;flex-wrap:wrap;gap:12px 22px;border-block:1px solid var(--line);padding:20px 0;margin:38px 0}.topic-jumps a{color:var(--teal-dark);font-weight:700}.topic-copy{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;margin-bottom:64px}.topic-copy section{scroll-margin-top:100px}.topic-copy h2{font-size:28px;margin:0 0 12px}.topic-copy p,.topic-faq p{color:var(--muted);line-height:1.7}.topic-articles{display:grid;grid-template-columns:repeat(3,1fr);gap:26px;margin-top:24px}.topic-faq{max-width:800px;margin-top:70px;scroll-margin-top:100px}.topic-faq h2,#topic-articles{font-size:38px;margin:8px 0 22px}.topic-faq details{border-top:1px solid var(--line);padding:18px 0}.topic-faq summary{font-weight:800;cursor:pointer}.topic-faq p{margin:12px 0 0}@media(max-width:800px){.topic-copy,.topic-articles{grid-template-columns:1fr}.topic-copy{gap:8px}.topic-copy section{border-bottom:1px solid var(--line);padding:20px 0}}`}</style>
  </section>;
}
