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
  pillar?: string;
  intent?: string;
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

export const topicDescriptions: Record<string, string> = {
  relationships:
    "Understand the pressures shaping adult children, partners, and extended family relationships.",
  boundaries:
    "Stay connected without turning care into surveillance, pressure, or control.",
  "money-work":
    "Navigate financial support, career choices, housing, and independence with clarity.",
  guides:
    "Practical scripts and frameworks for the conversations families tend to avoid.",
};

export const pillarDescriptions: Record<string, string> = {
  Boundaries: "Privacy, access, advice, and the difference between closeness and control.",
  "Money and Support": "Financial help with clear terms and dignity on both sides.",
  "Career and Education": "Work and education choices in a labor market parents did not enter.",
  "Love and Partnership": "Marriage, partners, children, and changing definitions of family.",
  Communication: "Scripts for listening, apologizing, and disagreeing without escalation.",
  "Independent Living": "Housing, routines, distance, pets, and adult life on different terms.",
  "Family Repair": "Rebuilding trust after criticism, conflict, silence, or estrangement.",
  "Parent Transitions": "A meaningful parent identity that does not require managing adult children.",
  "Digital Life": "Privacy and connection across phones, group chats, and social media.",
  "Family Expectations": "Tradition, siblings, extended family, and the weight of inherited roles.",
};
