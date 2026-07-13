import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";

export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  readingTime: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
  cardQuote: string;
  seoTitle: string;
  primaryKeyword: string;
  searchIntent: string;
  topic: TopicSlug;
  updatedAt: string;
  contentType: "guide" | "q-and-a" | "narrative" | "research";
  exampleType: "composite" | "reported" | "none";
  evidenceNote: string;
  sources: Array<{
    title: string;
    publisher: string;
    url: string;
  }>;
  status: "published";
};

const contentDirectory = path.join(process.cwd(), "content", "articles");

export const getAllArticles = cache((): ArticleMeta[] => {
  return fs
    .readdirSync(contentDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const source = fs.readFileSync(path.join(contentDirectory, file), "utf8");
      const { data } = matter(source);
      return { slug, ...data } as ArticleMeta;
    })
    .filter((article) => article.status === "published")
    .sort(
      (a, b) =>
        b.publishedAt.localeCompare(a.publishedAt) ||
        a.title.localeCompare(b.title, "en"),
    );
});

export function getArticle(slug: string) {
  const filePath = path.join(contentDirectory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);
  if (data.status !== "published") return null;
  return { meta: { slug, ...data } as ArticleMeta, content };
}

export const topics = [
  {
    slug: "communication",
    name: "Communication",
    title: "Better Communication With Adult Children",
    shortDescription: "Listen, ask, disagree, and stay in contact without turning every conversation into a test.",
  },
  {
    slug: "boundaries",
    name: "Boundaries",
    title: "Healthy Boundaries With Adult Children",
    shortDescription: "Keep care and closeness while respecting privacy, choices, time, and limits.",
  },
  {
    slug: "money-and-support",
    name: "Money and Support",
    title: "Financial Support for Adult Children",
    shortDescription: "Offer help with clear terms, realistic limits, and dignity on both sides.",
  },
  {
    slug: "independence",
    name: "Independence",
    title: "Supporting an Adult Child's Independence",
    shortDescription: "Navigate moving, work, housing, and practical help without taking over.",
  },
  {
    slug: "family-relationships",
    name: "Family Relationships",
    title: "Family Relationships as Children Become Adults",
    shortDescription: "Adjust to partners, grandchildren, holidays, and changing family roles.",
  },
  {
    slug: "conflict-and-repair",
    name: "Conflict and Repair",
    title: "Repairing Conflict With an Adult Child",
    shortDescription: "Own harm, lower pressure, and create conditions in which trust can regrow.",
  },
] as const;

export type TopicSlug = (typeof topics)[number]["slug"];

export function getTopic(slug: string) {
  return topics.find((topic) => topic.slug === slug);
}

export function getArticlesByTopic(topic: TopicSlug) {
  return getAllArticles().filter((article) => article.topic === topic);
}

export function getRelatedArticles(article: ArticleMeta) {
  const others = getAllArticles().filter((candidate) => candidate.slug !== article.slug);
  const sameTopic = others.filter((candidate) => candidate.topic === article.topic).slice(0, 2);
  const crossTopic = others.find((candidate) => candidate.topic !== article.topic);
  return crossTopic ? [...sameTopic, crossTopic] : sameTopic;
}
