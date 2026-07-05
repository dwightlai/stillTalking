import type { Metadata } from "next";
import { LibraryExplorer } from "@/components/library-explorer";
import { getAllArticles, pillarDescriptions } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Article Library",
  description:
    "Browse more than 500 practical guides for parents of adult children.",
};

export default async function LibraryPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string; focus?: string }>;
}) {
  const articles = getAllArticles();
  const pillars = Object.keys(pillarDescriptions);
  const { topic, focus } = await searchParams;

  return (
    <section style={{ padding: "56px 0 72px" }}>
      <div className="container">
        <div style={{ maxWidth: 820 }}>
          <div className="eyebrow">The Still Talking Library</div>
          <h1
            className="serif"
            style={{
              fontSize: "clamp(3.2rem, 8vw, 6.2rem)",
              lineHeight: 0.93,
              margin: "12px 0 22px",
            }}
          >
            One family question at a time.
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 19, lineHeight: 1.65 }}>
            Search {articles.length} articles about boundaries, money, work,
            relationships, digital life, and rebuilding trust with an adult child.
          </p>
        </div>
        <LibraryExplorer
          articles={articles}
          pillars={pillars}
          initialPillar={topic}
          focusSearch={focus === "search"}
        />
      </div>
    </section>
  );
}
