import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ArticleMeta } from "@/lib/articles";

export function ArticleCard({
  article,
  horizontal = false,
}: {
  article: ArticleMeta;
  horizontal?: boolean;
}) {
  return (
    <article
      style={{
        display: horizontal ? "grid" : "block",
        gridTemplateColumns: horizontal ? "180px 1fr" : undefined,
        gap: horizontal ? 22 : undefined,
        borderTop: "1px solid var(--line)",
        paddingTop: 20,
      }}
    >
      <Link href={`/articles/${article.slug}`} className="focus-ring">
        <div
          style={{
            position: "relative",
            aspectRatio: horizontal ? "4 / 3" : "16 / 10",
            overflow: "hidden",
            background: "#e8ecec",
            marginBottom: horizontal ? 0 : 17,
          }}
        >
          <Image src={article.image} alt={article.imageAlt} fill style={{ objectFit: "cover" }} />
        </div>
      </Link>
      <div>
        <div className="eyebrow">{article.category}</div>
        <h3
          className="serif"
          style={{ fontSize: horizontal ? 22 : 25, lineHeight: 1.15, margin: "8px 0 9px" }}
        >
          <Link href={`/articles/${article.slug}`} className="focus-ring">
            {article.title} <ArrowUpRight size={17} style={{ display: "inline" }} />
          </Link>
        </h3>
        <p style={{ color: "var(--muted)", lineHeight: 1.55, margin: 0, fontSize: 14 }}>
          {article.description}
        </p>
      </div>
    </article>
  );
}
