import type { MetadataRoute } from "next";
import { getAllArticles, topics } from "@/lib/articles";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://stilltalkingfamily.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/about", "/library", "/resources", "/resources/conversation-scripts-for-parents", "/editorial-policy", "/fact-checking-and-corrections", "/ai-use-policy", "/disclosure", "/privacy"];

  return [
    ...staticPages.map((path) => ({
      url: `${siteUrl}${path}`,
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : 0.7,
    })),
    ...topics.map((topic) => ({
      url: `${siteUrl}/topics/${topic.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...getAllArticles().map((article) => ({
      url: `${siteUrl}/articles/${article.slug}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
