import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const directory = path.join(process.cwd(), "content", "articles");
const files = fs.readdirSync(directory).filter((file) => file.endsWith(".mdx"));
const records = files.map((file) => {
  const source = fs.readFileSync(path.join(directory, file), "utf8");
  const { data, content } = matter(source);
  return {
    file,
    data,
    content,
    words: content.trim().split(/\s+/).filter(Boolean).length,
  };
});

const errors = [];
const today = new Intl.DateTimeFormat("sv-SE", {
  timeZone: "Asia/Shanghai",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(new Date());
const required = [
  "title",
  "seoTitle",
  "description",
  "category",
  "topic",
  "primaryKeyword",
  "searchIntent",
  "status",
  "publishedAt",
  "updatedAt",
  "contentType",
  "exampleType",
  "evidenceNote",
  "sources",
  "readingTime",
  "image",
  "imageAlt",
  "cardQuote",
];
const topics = new Set([
  "communication",
  "boundaries",
  "money-and-support",
  "independence",
  "family-relationships",
  "conflict-and-repair",
]);

for (const record of records) {
  for (const field of required) {
    if (!record.data[field]) errors.push(`${record.file}: missing ${field}`);
  }
  if (record.data.status !== "published") {
    errors.push(`${record.file}: public content must have status "published"`);
  }
  if (record.data.generated || record.data.reviewStatus) {
    errors.push(`${record.file}: generated/editorial-draft metadata is not allowed`);
  }
  if (record.data.pillar) {
    errors.push(`${record.file}: obsolete pillar field is not allowed`);
  }
  if (!topics.has(record.data.topic)) {
    errors.push(`${record.file}: invalid topic`);
  }
  if (
    typeof record.data.seoTitle === "string" &&
    (record.data.seoTitle.length < 35 || record.data.seoTitle.length > 65)
  ) {
    errors.push(`${record.file}: seoTitle must be 35-65 characters`);
  }
  if (record.words < 600) {
    errors.push(`${record.file}: ${record.words} words; minimum is 600`);
  }
  if (record.data.publishedAt > today) {
    errors.push(`${record.file}: publishedAt cannot be in the future`);
  }
  if (
    record.data.updatedAt < record.data.publishedAt ||
    record.data.updatedAt > today
  ) {
    errors.push(`${record.file}: updatedAt must be between publishedAt and today`);
  }
  if (!["guide", "q-and-a", "narrative", "research"].includes(record.data.contentType)) {
    errors.push(`${record.file}: invalid contentType`);
  }
  if (!["composite", "reported", "none"].includes(record.data.exampleType)) {
    errors.push(`${record.file}: invalid exampleType`);
  }
  if (
    !Array.isArray(record.data.sources) ||
    record.data.sources.length === 0 ||
    record.data.sources.some(
      (source) =>
        !source?.title ||
        !source?.publisher ||
        typeof source?.url !== "string" ||
        !source.url.startsWith("https://"),
    )
  ) {
    errors.push(`${record.file}: at least one complete HTTPS source is required`);
  }
  const imagePath = path.join(process.cwd(), "public", record.data.image ?? "");
  if (!record.data.image?.startsWith("/images/") || !fs.existsSync(imagePath)) {
    errors.push(`${record.file}: referenced illustration does not exist in public/images`);
  }
  const topicLink = `/topics/${record.data.topic}`;
  if (!record.content.includes(`](${topicLink})`)) {
    errors.push(`${record.file}: missing contextual link to ${topicLink}`);
  }
  const articleLinks = [...record.content.matchAll(/\]\(\/articles\/([a-z0-9-]+)\)/g)].map((match) => match[1]);
  const knownSlugs = new Set(records.map(({ file }) => file.replace(/\.mdx$/, "")));
  if (articleLinks.filter((slug) => slug !== record.file.replace(/\.mdx$/, "")).length < 2) {
    errors.push(`${record.file}: requires at least two contextual article links`);
  }
  for (const slug of articleLinks) {
    if (!knownSlugs.has(slug)) errors.push(`${record.file}: broken internal article link ${slug}`);
    if (slug === record.file.replace(/\.mdx$/, "")) errors.push(`${record.file}: self-link is not allowed`);
  }
}

for (const field of ["title", "seoTitle", "description", "cardQuote", "image", "imageAlt"]) {
  const seen = new Map();
  for (const record of records) {
    const value = record.data[field];
    if (seen.has(value)) {
      errors.push(`${record.file}: duplicate ${field} also used by ${seen.get(value)}`);
    }
    seen.set(value, record.file);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Content check passed: ${records.length} published articles.`);
console.log(
  `Word range: ${Math.min(...records.map(({ words }) => words))}-${Math.max(
    ...records.map(({ words }) => words),
  )}.`,
);
