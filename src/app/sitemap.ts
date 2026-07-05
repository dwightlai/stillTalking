import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://still-talking.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/about", "/library", "/resources", "/disclosure", "/privacy"];
  const topics = ["relationships", "boundaries", "money-work", "guides"];

  return [
    ...staticPages.map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : 0.7,
    })),
    ...topics.map((topic) => ({
      url: `${siteUrl}/topics/${topic}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...getAllArticles().map((article) => ({
      url: `${siteUrl}/articles/${article.slug}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
