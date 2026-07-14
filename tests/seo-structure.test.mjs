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
  assert.match(source, /className="[^"]*\bhome-hero\b[^"]*"/);
  assert.match(source, /className="featured-story"/);
  assert.match(source, /grid-template-columns:minmax\(0,1\.05fr\) minmax\(0,\.95fr\)/);
  assert.match(source, /\.pillar-grid \{[^}]*grid-template-columns:repeat\(3,1fr\)/s);
  assert.match(source, /className="home-primary-action"/);
  assert.match(source, /className="home-secondary-action"/);
  assert.match(source, /padding:clamp\(40px,5vw,68px\) 0 clamp\(44px,5\.5vw,72px\)/);
  assert.match(source, /font-size:clamp\(3\.4rem,5\.15vw,5\.25rem\)/);
  assert.match(source, /margin:-34px 0 0 20px; padding:25px 0 24px 20px/);
});

test("publishes six indexable pillar pages with visible FAQs", () => {
  const source = read("src/app/topics/[slug]/page.tsx");
  assert.match(source, /generateMetadata/);
  assert.match(source, /FAQPage/);
  assert.match(source, /Frequently asked questions/);
  assert.match(source, /Quick answer/);
  assert.match(source, /articleGroups/);
  assert.match(source, /className="topic-layout"/);
  assert.match(source, /position:sticky/);
  assert.match(source, /\.topic-articles\{[^}]*grid-template-columns:repeat\(2,1fr\)/s);
  assert.match(source, /BreadcrumbList/);
});

test("gives every topic a unique visual and quick-answer treatment", () => {
  const source = read("src/lib/articles.ts");
  assert.equal((source.match(/quickAnswer:/g) ?? []).length, 6);
  assert.equal((source.match(/accent:/g) ?? []).length, 6);
});

test("marks the active primary navigation destination", () => {
  const source = read("src/components/site-header.tsx");
  assert.match(source, /usePathname/);
  assert.match(source, /aria-current/);
  assert.match(source, /nav-active/);
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
  assert.doesNotMatch(source, /lastModified:\s*new Date\(\)/);
});

test("content gate validates real ISO calendar dates", () => {
  const source = read("scripts/check-content.mjs");
  assert.match(source, /isValidIsoDate/);
  assert.match(source, /invalid publishedAt date/);
  assert.match(source, /invalid updatedAt date/);
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

test("publishes the adult child living at home guide with evidence and reciprocal links", () => {
  const articlePath = "content/articles/adult-child-living-at-home.mdx";
  assert.equal(fs.existsSync(articlePath), true, "new guide should exist");
  const source = fs.readFileSync(articlePath, "utf8");
  const movingOut = read("content/articles/when-adult-child-moves-out.mdx");

  assert.match(source, /title: "When Your Adult Child Lives at Home: Make It a Household, Not a Holding Pattern"/);
  assert.match(source, /topic: "independence"/);
  assert.match(source, /primaryKeyword: "adult child living at home"/);
  assert.match(source, /status: "published"/);
  assert.match(source, /publisher: "U\.S\. Census Bureau"/);
  assert.match(source, /publisher: "Pew Research Center"/);
  for (const href of [
    "/topics/independence",
    "/articles/when-adult-child-moves-out",
    "/articles/financial-help-control",
    "/topics/boundaries",
  ]) {
    assert.match(source, new RegExp(href.replaceAll("/", "\\/")));
  }
  assert.match(movingOut, /\/articles\/adult-child-living-at-home/);
});
