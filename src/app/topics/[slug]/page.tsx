import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { getAllArticles, topicDescriptions } from "@/lib/articles";

const categoryNames: Record<string, string> = {
  relationships: "Relationships",
  boundaries: "Boundaries",
  "money-work": "Money & Work",
  guides: "Guides",
};

export function generateStaticParams() {
  return Object.keys(categoryNames).map((slug) => ({ slug }));
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = categoryNames[slug];
  if (!title) notFound();
  const articles = getAllArticles().filter(
    (article) =>
      article.category.toLowerCase().replaceAll(" & ", "-").replaceAll(" ", "-") === slug ||
      (slug === "relationships" && article.category === "Relationships"),
  );

  return (
    <section style={{ padding: "58px 0" }}>
      <div className="container">
        <div style={{ maxWidth: 760, marginBottom: 50 }}>
          <div className="eyebrow">Topic</div>
          <h1 className="serif" style={{ fontSize: "clamp(3rem, 7vw, 5.4rem)", margin: "8px 0 16px", lineHeight: 1 }}>
            {title}
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.6, color: "var(--muted)" }}>
            {topicDescriptions[slug]}
          </p>
        </div>
        <div style={{ display: "grid", gap: 28, maxWidth: 900 }}>
          {articles.length ? (
            articles.map((article) => <ArticleCard key={article.slug} article={article} horizontal />)
          ) : (
            <p style={{ color: "var(--muted)" }}>New guides are in editorial review.</p>
          )}
        </div>
      </div>
    </section>
  );
}
