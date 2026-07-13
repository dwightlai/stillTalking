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
