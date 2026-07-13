import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const read = (file) => fs.readFileSync(file, "utf8");

test("defines the six canonical SEO topics", () => {
  const source = read("src/lib/articles.ts");
  for (const slug of [
    "communication",
    "boundaries",
    "money-and-support",
    "independence",
    "family-relationships",
    "conflict-and-repair",
  ]) {
    assert.match(source, new RegExp(`slug: [\"']${slug}[\"']`));
  }
});

test("permanently redirects legacy topic URLs", () => {
  const source = read("next.config.ts");
  for (const route of [
    "/topics/relationships",
    "/topics/money-work",
    "/topics/guides",
  ]) {
    assert.match(source, new RegExp(route.replaceAll("/", "\\/")));
  }
  assert.match(source, /permanent:\s*true/);
});

test("ignores local worktrees", () => {
  assert.match(read(".gitignore"), /^\/\.worktrees\/$/m);
});

test("keeps filtered library pages out of the index", () => {
  const source = read("src/app/library/page.tsx");
  assert.match(source, /generateMetadata/);
  assert.match(source, /index:\s*false,\s*follow:\s*true/);
  assert.match(source, /canonical:\s*["']\/library["']/);
});

test("uses a stable homepage SEO heading and canonical topic links", () => {
  const source = read("src/app/page.tsx");
  assert.equal((source.match(/<h1\b/g) ?? []).length, 1);
  assert.match(source, /Practical Advice for Parents of Adult Children/);
  assert.match(source, /absolute:\s*["']Advice for Parents of Adult Children \| Still Talking["']/);
  assert.doesNotMatch(source, /\/library\?topic=/);
});

test("publishes six indexable pillar pages with visible FAQs", () => {
  const source = read("src/app/topics/[slug]/page.tsx");
  assert.match(source, /generateMetadata/);
  assert.match(source, /FAQPage/);
  assert.match(source, /Frequently asked questions/);
  assert.match(source, /BreadcrumbList/);
});

test("uses SEO titles and topic breadcrumbs on articles", () => {
  const source = read("src/app/articles/[slug]/page.tsx");
  assert.match(source, /title:\s*article\.meta\.seoTitle/);
  assert.match(source, /topics\/\$\{meta\.topic\}/);
  assert.match(source, /Related advice/);
  assert.match(source, /author:\s*\{\s*["']@type["']:\s*["']Organization["']/);
});

test("sitemap contains canonical topics and trust resources only", () => {
  const source = read("src/app/sitemap.ts");
  assert.match(source, /conversation-scripts-for-parents/);
  assert.match(source, /topics\.map/);
  assert.doesNotMatch(source, /["']relationships["'],\s*["']boundaries/);
});

test("publishes transparent editorial policy pages", () => {
  for (const file of [
    "src/app/editorial-policy/page.tsx",
    "src/app/fact-checking-and-corrections/page.tsx",
    "src/app/ai-use-policy/page.tsx",
  ]) assert.equal(fs.existsSync(file), true, `${file} must exist`);
  assert.match(read("src/app/editorial-policy/page.tsx"), /composite/i);
  assert.match(read("src/app/fact-checking-and-corrections/page.tsx"), /correction/i);
  assert.match(read("src/app/ai-use-policy/page.tsx"), /AI-generated illustrations/i);
});

test("publishes an ungated conversation script resource", () => {
  const file = "src/app/resources/conversation-scripts-for-parents/page.tsx";
  assert.equal(fs.existsSync(file), true);
  const source = read(file);
  for (const phrase of ["Asking for more contact", "Offering advice", "Talking about money", "Setting house rules", "Apologizing", "Discussing a partner", "Giving space", "Repairing conflict"])
    assert.match(source, new RegExp(phrase));
  assert.match(read("src/app/resources/page.tsx"), /\/resources\/conversation-scripts-for-parents/);
});
