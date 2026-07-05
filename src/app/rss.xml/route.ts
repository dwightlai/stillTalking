import { getAllArticles } from "@/lib/articles";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://still-talking.vercel.app";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const items = getAllArticles()
    .slice(0, 50)
    .map(
      (article) => `
        <item>
          <title>${escapeXml(article.title)}</title>
          <link>${siteUrl}/articles/${article.slug}</link>
          <guid>${siteUrl}/articles/${article.slug}</guid>
          <description>${escapeXml(article.description)}</description>
          <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
        </item>`,
    )
    .join("");

  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>Still Talking</title>
        <link>${siteUrl}</link>
        <description>Practical guidance for parents of adult children.</description>
        ${items}
      </channel>
    </rss>`;

  return new Response(feed, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
