import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, MessageCircle, ShieldCheck, WalletCards } from "lucide-react";
import { ArticleCard } from "@/components/article-card";
import { NewsletterForm } from "@/components/newsletter-form";
import { getAllArticles, topics } from "@/lib/articles";

export const metadata: Metadata = {
  title: { absolute: "Advice for Parents of Adult Children | Still Talking" },
  description: "Practical, research-informed advice for parents of adult children. Learn how to handle communication, boundaries, money, independence, family conflict and relationship repair.",
  alternates: { canonical: "/" },
};

const starters = [
  {
    icon: ShieldCheck,
    title: "Respecting boundaries",
    text: "Care without monitoring, pushing, or taking over.",
    href: "/topics/boundaries",
  },
  {
    icon: WalletCards,
    title: "Money and independence",
    text: "Help that supports growth instead of creating control.",
    href: "/topics/money-and-support",
  },
  {
    icon: MessageCircle,
    title: "Hard conversations",
    text: "Words that keep the door open when you disagree.",
    href: "/topics/conflict-and-repair",
  },
];

export default function Home() {
  const articles = getAllArticles();
  const lead = articles.find((article) => article.featured) ?? articles[0];
  const rest = articles.filter((article) => article.slug !== lead.slug);

  return (
    <>
      <section className="home-hero-section">
        <div className="container home-hero">
          <div className="home-intro">
            <div className="eyebrow">For parents of adult children</div>
            <h1 className="serif">Practical Advice for Parents of Adult Children</h1>
            <p>Research-informed guidance for better communication, healthier boundaries, financial support, independence, family conflict, and relationship repair.</p>
            <div className="home-actions"><Link href="/library" className="home-primary-action">Browse Advice <ArrowRight size={18} /></Link><Link href="#common-challenges" className="home-secondary-action">Explore Common Challenges</Link></div>
          </div>
          <article className="featured-story">
            <div className="featured-image">
              <Image
                src={lead.image}
                alt={lead.imageAlt}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 44vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="featured-copy">
              <div className="eyebrow">{lead.category}</div>
              <h2 className="serif featured-title">
                {lead.title}
              </h2>
              <p>
                {lead.description}
              </p>
              <Link
                href={`/articles/${lead.slug}`}
                className="focus-ring"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  color: "var(--teal-dark)",
                  fontWeight: 800,
                }}
              >
                Read the story <ArrowRight size={18} />
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="rule" style={{ background: "white", padding: "28px 0" }}>
        <div className="container starter-grid">
          <div>
            <div className="eyebrow">Start here</div>
            <h2 className="serif" style={{ fontSize: 28, margin: "7px 0 0" }}>
              Keep the relationship. Change the pattern.
            </h2>
          </div>
          {starters.map(({ icon: Icon, title, text, href }) => (
            <Link key={title} href={href} className="focus-ring starter-item">
              <Icon size={22} color="var(--coral)" />
              <div>
                <strong>{title}</strong>
                <p>{text}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ padding: "64px 0 14px" }}>
        <div className="container">
          <div className="library-callout">
            <div>
              <div className="eyebrow" style={{ color: "#9fdadc" }}>A growing editorial library</div>
              <div className="library-number serif">{articles.length}</div>
              <p>practical articles for parents of adult children</p>
            </div>
            <div>
              <h2 className="serif">Start with the question already on your mind.</h2>
              <p>
                Search by situation, from rent support and career changes to
                marriage pressure, privacy, holidays, and repairing trust.
              </p>
              <Link href="/library">
                Browse the full library <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="common-challenges" style={{ padding: "60px 0 20px", scrollMarginTop: 90 }}>
        <div className="container">
          <div className="eyebrow">Explore by family pattern</div>
          <div className="pillar-heading">
            <h2 className="serif">The issues change. The need for trust does not.</h2>
            <p>
              Six focused topics organize the questions parents most often
              face as children become adults.
            </p>
          </div>
          <div className="pillar-grid">
            {topics.map((topic, index) => (
              <Link
                key={topic.slug}
                href={`/topics/${topic.slug}`}
                className="pillar-item focus-ring"
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong className="serif">{topic.name}</strong>
                <p>{topic.shortDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "66px 0 24px" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 24, marginBottom: 28 }}>
            <div>
              <div className="eyebrow">Latest</div>
              <h2 className="serif" style={{ fontSize: 42, margin: "7px 0 0" }}>
                A better way to stay close
              </h2>
            </div>
            <Link href="/library" style={{ fontWeight: 800, color: "var(--teal-dark)" }}>
              View all stories
            </Link>
          </div>
          <div className="article-grid">
            {rest.slice(0, 3).map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "62px 0" }}>
        <div className="container newsletter">
          <div>
            <div className="eyebrow" style={{ color: "#9fdadc" }}>A weekly note for parents</div>
            <h2 className="serif" style={{ fontSize: 38, margin: "8px 0 12px" }}>
              Fewer lectures. Better conversations.
            </h2>
            <p style={{ color: "#c8d3d9", lineHeight: 1.6, margin: 0 }}>
              One thoughtful idea each week for understanding the adult your child is becoming.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>

      <section style={{ padding: "4px 0 54px" }}>
        <div className="container resource-strip">
          <BookOpen size={28} color="var(--coral)" />
          <div>
            <div className="eyebrow">Practical resources</div>
            <h2 className="serif">Conversation scripts you can use before the next hard talk.</h2>
          </div>
          <Link href="/resources">Explore resources <ArrowRight size={17} /></Link>
        </div>
      </section>

      <style>{`
        .home-hero-section { padding:clamp(40px,5vw,68px) 0 clamp(44px,5.5vw,72px); }
        .home-hero { display:grid; grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr); gap:clamp(40px,6vw,88px); align-items:center; }
        .home-intro { max-width:650px; }
        .home-intro h1 { font-size:clamp(3.4rem,5.15vw,5.25rem); line-height:.94; letter-spacing:-.035em; margin:16px 0 22px; text-wrap:balance; }
        .home-intro > p { color:var(--muted); font-size:18px; line-height:1.62; max-width:590px; }
        .home-actions { display:flex; flex-wrap:wrap; gap:18px; margin-top:24px; }
        .home-actions a { display:inline-flex; align-items:center; gap:8px; font-weight:800; transition:color .18s ease, transform .18s ease, border-color .18s ease; }
        .home-primary-action { color:var(--teal-dark); border-bottom:2px solid var(--teal); padding-bottom:3px; }
        .home-primary-action:hover { transform:translateY(-2px); }
        .home-secondary-action { color:var(--muted); }
        .home-secondary-action:hover { color:var(--teal-dark); }
        .featured-story { min-width:0; border-bottom:1px solid var(--line); }
        .featured-image { position:relative; aspect-ratio:16/10; min-width:0; background:#e5e8e4; overflow:hidden; }
        .featured-copy { position:relative; width:calc(100% - 20px); margin:-34px 0 0 20px; padding:25px 0 24px 20px; background:var(--paper); }
        .featured-title { font-size:clamp(2.15rem,3vw,3.15rem); line-height:1.02; margin:12px 0 14px; max-width:560px; text-wrap:balance; }
        .featured-copy > p { color:var(--muted); font-size:16px; line-height:1.58; max-width:560px; margin:0; }
        .featured-copy > a { margin-top:18px; }
        .starter-grid { display:grid; grid-template-columns:1.15fr repeat(3, 1fr); gap:26px; align-items:center; }
        .starter-item { display:grid; grid-template-columns:auto 1fr; gap:12px; border-left:1px solid var(--line); padding-left:22px; }
        .starter-item p { color:var(--muted); font-size:13px; line-height:1.45; margin:6px 0 0; }
        .article-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:28px; }
        .library-callout { background:var(--ink); color:white; padding:42px; display:grid; grid-template-columns:.7fr 1.3fr; gap:56px; align-items:center; }
        .library-callout > div:first-child { border-right:1px solid #3a4751; }
        .library-number { font-size:82px; line-height:.9; margin-top:12px; }
        .library-callout p { color:#c4cfd5; line-height:1.6; max-width:560px; }
        .library-callout h2 { font-size:38px; line-height:1.1; margin:0 0 12px; }
        .library-callout a { display:inline-flex; gap:9px; align-items:center; color:#9fdadc; font-weight:800; margin-top:8px; }
        .pillar-heading { display:flex; align-items:end; justify-content:space-between; gap:40px; margin:8px 0 28px; }
        .pillar-heading h2 { font-size:40px; line-height:1.08; max-width:650px; margin:0; text-wrap:balance; }
        .pillar-heading > p { color:var(--muted); max-width:360px; line-height:1.55; margin:0; }
        .pillar-grid { display:grid; grid-template-columns:repeat(3,1fr); border-top:1px solid var(--line); border-left:1px solid var(--line); }
        .pillar-item { min-height:210px; padding:22px; border-right:1px solid var(--line); border-bottom:1px solid var(--line); }
        .pillar-item > span { color:var(--coral); font-size:12px; font-weight:800; }
        .pillar-item strong { display:block; font-size:21px; margin:30px 0 9px; }
        .pillar-item p { color:var(--muted); font-size:12px; line-height:1.5; margin:0; }
        .newsletter { background:var(--ink); color:white; padding:38px; display:grid; grid-template-columns:1.25fr .75fr; gap:48px; align-items:center; }
        .resource-strip { border-top:1px solid var(--line); border-bottom:1px solid var(--line); padding:26px 0; display:grid; grid-template-columns:auto 1fr auto; gap:20px; align-items:center; }
        .resource-strip h2 { font-size:26px; margin:5px 0 0; }
        .resource-strip a { display:flex; align-items:center; gap:8px; color:var(--teal-dark); font-weight:800; }
        .sr-only { position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0,0,0,0); }
        @media (max-width: 900px) {
          .home-hero { grid-template-columns:1fr; gap:48px; }
          .home-intro { max-width:760px; }
          .featured-story { max-width:760px; }
          .starter-grid { grid-template-columns:1fr 1fr; }
          .starter-item { border-left:0; padding:18px 0; border-top:1px solid var(--line); }
          .article-grid { grid-template-columns:1fr 1fr; }
          .library-callout { grid-template-columns:1fr; gap:28px; }
          .library-callout > div:first-child { border-right:0; border-bottom:1px solid #3a4751; padding-bottom:24px; }
          .pillar-grid { grid-template-columns:repeat(2,1fr); }
          .newsletter { grid-template-columns:1fr; }
        }
        @media (max-width: 620px) {
          .home-hero-section { padding-top:38px; }
          .home-intro { min-width:0; }
          .home-intro h1 { font-size:clamp(2.85rem,12.5vw,3.25rem); line-height:.96; overflow-wrap:anywhere; }
          .home-actions { flex-direction:column; align-items:flex-start; gap:13px; }
          .featured-image { aspect-ratio:4/3; }
          .featured-copy { width:calc(100% - 18px); margin:-24px 0 0 18px; padding:22px 0 24px 20px; }
          .starter-grid, .article-grid { grid-template-columns:1fr; }
          .library-callout { padding:28px 22px; }
          .library-number { font-size:64px; }
          .pillar-heading { display:block; }
          .pillar-heading > p { margin-top:14px; }
          .pillar-grid { grid-template-columns:1fr; }
          .pillar-item { min-height:0; }
          .pillar-item strong { margin-top:14px; }
          .newsletter { padding:28px 22px; }
          .newsletter form { flex-direction:column; }
          .resource-strip { grid-template-columns:auto 1fr; }
          .resource-strip a { grid-column:2; }
        }
      `}</style>
    </>
  );
}
