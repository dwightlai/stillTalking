import type { Metadata } from "next";
import { LibraryExplorer } from "@/components/library-explorer";
import { getAllArticles, pillarDescriptions } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Article Library",
  description:
    "Browse practical guides for parents of adult children, ordered newest first.",
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
        <div className="library-intro">
          <div className="eyebrow">The Still Talking Library</div>
          <h1
            className="serif library-title"
          >
            One family question at a time.
          </h1>
          <p className="library-description">
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
      <style>{`
        .library-intro { max-width:1100px; }
        .library-title {
          max-width:1100px;
          margin:12px 0 22px;
          font-size:70px;
          line-height:1;
          letter-spacing:0;
          text-wrap:balance;
        }
        .library-description {
          max-width:820px;
          margin:0;
          color:var(--muted);
          font-size:19px;
          line-height:1.65;
        }
        @media(max-width:900px) {
          .library-title { font-size:56px; }
        }
        @media(max-width:620px) {
          .library-title { font-size:44px; line-height:1.04; }
          .library-description { font-size:17px; }
        }
      `}</style>
    </section>
  );
}
