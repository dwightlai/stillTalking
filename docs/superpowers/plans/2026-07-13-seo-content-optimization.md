# Still Talking SEO and Content Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the repository-local technical SEO, information architecture, article optimization, editorial trust, and linkable-resource work defined in the approved design.

**Architecture:** Centralize the six-topic taxonomy and article relationships in `src/lib/articles.ts`, then let homepage, topic, Library, article, sitemap, and navigation surfaces consume that shared model. Use Node's built-in test runner plus the existing content checker to test metadata and content invariants before changing production files.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, MDX/gray-matter, Node.js test runner, ESLint.

---

## File Map

- `src/lib/articles.ts`: canonical topic definitions, expanded article metadata, related-article selection.
- `scripts/check-content.mjs`: publishing gate for taxonomy, SEO metadata, and internal MDX links.
- `tests/seo-structure.test.mjs`: repository-level regression tests for SEO structure and routing configuration.
- `package.json`: test and type-check commands.
- `src/app/page.tsx`: stable homepage H1, metadata, canonical topic links, featured article hierarchy.
- `src/app/library/page.tsx`: conditional robots/canonical metadata for parameter variants.
- `src/app/topics/[slug]/page.tsx`: six substantive pillar pages and structured data.
- `src/app/articles/[slug]/page.tsx`: SEO-title/H1 split, topic breadcrumbs, Article schema, related links.
- `src/components/site-header.tsx`, `src/components/site-footer.tsx`: canonical navigation and policy links.
- `src/app/sitemap.ts`, `next.config.ts`: sitemap rules and legacy redirects.
- `src/app/editorial-policy/page.tsx`, `src/app/fact-checking-and-corrections/page.tsx`, `src/app/ai-use-policy/page.tsx`: editorial trust pages.
- `src/app/resources/page.tsx`, `src/app/resources/conversation-scripts-for-parents/page.tsx`: real, ungated linkable resource.
- `content/articles/*.mdx`: article-level SEO fields and contextual internal links.
- `docs/seo-operations-checklist.md`: Search Console and outreach follow-up.
- `.gitignore`: exclude `.superpowers/` visual-brainstorm artifacts.

### Task 1: Establish the SEO Regression Harness

**Files:**
- Create: `tests/seo-structure.test.mjs`
- Modify: `package.json`
- Modify: `.gitignore`

- [ ] **Step 1: Write failing structure tests**

Create tests using `node:test`, `node:assert/strict`, and file reads. The first tests assert that `src/lib/articles.ts` exports exactly these slugs in source: `communication`, `boundaries`, `money-and-support`, `independence`, `family-relationships`, `conflict-and-repair`; that `next.config.ts` contains permanent redirects for the three legacy topic URLs; and that `.gitignore` contains `/.superpowers/`.

```js
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const read = (file) => fs.readFileSync(file, "utf8");

test("defines the six canonical SEO topics", () => {
  const source = read("src/lib/articles.ts");
  for (const slug of [
    "communication", "boundaries", "money-and-support",
    "independence", "family-relationships", "conflict-and-repair",
  ]) assert.match(source, new RegExp(`slug: [\"']${slug}[\"']`));
});

test("permanently redirects legacy topic URLs", () => {
  const source = read("next.config.ts");
  for (const path of ["/topics/relationships", "/topics/money-work", "/topics/guides"])
    assert.match(source, new RegExp(path.replaceAll("/", "\\/")));
  assert.match(source, /permanent:\s*true/);
});
```

- [ ] **Step 2: Add the test command and verify RED**

Add `"test": "node --test tests/*.test.mjs"` and `"typecheck": "tsc --noEmit"` to `package.json`. Run `npm test`. Expected: failures for missing canonical topic definitions, redirects, and ignore rule.

- [ ] **Step 3: Add only the ignore rule needed for the first passing assertion**

Append `/.superpowers/` to `.gitignore`. Do not modify taxonomy or redirects yet.

- [ ] **Step 4: Re-run and preserve the intended RED state**

Run `npm test`. Expected: the ignore assertion passes; taxonomy and redirect assertions still fail for the expected missing behavior.

- [ ] **Step 5: Commit the harness**

```powershell
git add tests/seo-structure.test.mjs package.json .gitignore
git commit -m "test: add SEO structure regression harness"
```

### Task 2: Centralize the Canonical Taxonomy and Article Model

**Files:**
- Modify: `src/lib/articles.ts`
- Modify: `scripts/check-content.mjs`
- Modify: `tests/seo-structure.test.mjs`

- [ ] **Step 1: Extend failing tests for the article contract**

Add assertions that `ArticleMeta` contains `seoTitle`, `primaryKeyword`, `searchIntent`, and `topic`; that the old `pillar?:` field and ten-pillar export are absent; and that the content checker requires the four new fields and validates the six topic slugs.

- [ ] **Step 2: Run tests to verify RED**

Run `npm test`. Expected: failures naming the missing article fields and the old pillar model.

- [ ] **Step 3: Implement the shared taxonomy**

Replace `topicDescriptions`/`pillarDescriptions` with a typed `topics` array. Each object contains `slug`, `name`, `shortDescription`, `title`, `description`, `quickAnswer`, content sections, and FAQs. Add `TopicSlug`, `getTopic`, and `getArticlesByTopic`. Add the four required metadata fields to `ArticleMeta` and remove `pillar`.

- [ ] **Step 4: Upgrade the content checker**

Require the four fields, validate topic membership, enforce unique `seoTitle`, enforce a 35–65 character range with clear error output, reject `pillar`, and validate every Markdown link beginning `/articles/` against the set of known slugs.

- [ ] **Step 5: Verify GREEN for code structure while content check remains intentionally RED**

Run `npm test`. Expected: PASS. Run `npm run content:check`. Expected: FAIL because existing articles do not yet contain the new fields; record the first representative error.

- [ ] **Step 6: Commit the model and checker**

```powershell
git add src/lib/articles.ts scripts/check-content.mjs tests/seo-structure.test.mjs
git commit -m "refactor: define canonical SEO topic model"
```

### Task 3: Migrate All Article Frontmatter

**Files:**
- Modify: every `content/articles/*.mdx` file

- [ ] **Step 1: Capture the failing publishing-gate output**

Run `npm run content:check`. Expected: every article reports missing SEO fields and/or obsolete `pillar`.

- [ ] **Step 2: Assign each article one canonical topic**

Use this mapping:

- Communication: `how-often-should-adult-children-call`, `let-the-good-news-land`, `repeated-reminders`, `summer-heat-and-your-aging-parent`, `when-you-disagree-about-politics`.
- Boundaries: `concern-becomes-control`, `holiday-homecoming-without-the-interrogation`, `privacy-is-not-distance`.
- Money and Support: `career-advice-adult-child-can-use`, `financial-help-control`.
- Independence: `when-adult-child-moves-out`.
- Family Relationships: `couple-first-rule-for-in-laws`, `talk-about-marriage-without-pressure`, `when-you-want-grandchildren-and-your-child-does-not`, `when-your-adult-child-becomes-a-parent`.
- Conflict and Repair: `apology-that-does-not-demand-forgiveness`, `do-not-pull-your-child-into-your-fight`, `when-you-lose-your-temper-with-your-adult-child`.

For every file, replace `pillar` with `topic`, add a unique query-oriented `seoTitle`, add one `primaryKeyword`, and describe the matching reader need in `searchIntent`. Preserve the visible `title` unless a grammatical correction is required.

- [ ] **Step 3: Run the publishing gate and fix only metadata failures**

Run `npm run content:check`. Expected: PASS with `Content check passed: 18 published articles.` If an SEO title exceeds the allowed range, shorten it without changing the article's search intent.

- [ ] **Step 4: Commit the metadata migration precisely**

Stage only the 18 MDX files. Review `git diff --cached --stat` and `git diff --cached`. Commit:

```powershell
git commit -m "content: assign canonical topics and SEO intent"
```

### Task 4: Fix Technical Indexing, Redirects, and Sitemap Behavior

**Files:**
- Modify: `next.config.ts`
- Modify: `src/app/library/page.tsx`
- Modify: `src/app/sitemap.ts`
- Modify: `tests/seo-structure.test.mjs`

- [ ] **Step 1: Add failing tests for Library metadata and sitemap rules**

Assert that Library exports `generateMetadata`, uses `robots: { index: false, follow: true }` when any search parameter exists, and canonicalizes to `/library`. Assert sitemap derives topics from the shared taxonomy, contains the conversation-scripts path, and contains none of the legacy topic slugs.

- [ ] **Step 2: Run `npm test` and verify RED**

Expected: failures for missing Library conditional metadata, shared sitemap topics, resource path, and redirects.

- [ ] **Step 3: Implement permanent redirects**

Add an async `redirects()` function returning the three approved mappings with `permanent: true`.

- [ ] **Step 4: Implement Library metadata**

Export `generateMetadata({ searchParams })`. Resolve the params, detect `Object.keys(params).length > 0`, and return base title/description plus `alternates: { canonical: "/library" }`; add `robots: { index: false, follow: true }` only for parameter variants.

- [ ] **Step 5: Rebuild the sitemap from canonical sources**

Import `topics`, add the three policy pages and conversation scripts to static pages, and map topic slugs from `topics`. Continue using each article's actual `updatedAt`.

- [ ] **Step 6: Verify GREEN and commit**

Run `npm test`, `npm run typecheck`, and `npm run content:check`. Expected: all pass. Commit the four files with `fix: control SEO indexing and legacy routes`.

### Task 5: Rebuild Homepage and Navigation Around Canonical Topics

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/components/site-header.tsx`
- Modify: `src/components/site-footer.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `tests/seo-structure.test.mjs`

- [ ] **Step 1: Add failing homepage and navigation tests**

Assert homepage exports metadata with `Advice for Parents of Adult Children`, contains exactly one literal `<h1`, contains the fixed H1 text, renders the featured article title in an H2, and contains no `/library?topic=` links. Assert header/footer use canonical topic routes and footer links the three policy pages.

- [ ] **Step 2: Run `npm test` and verify RED**

Expected: failure because the current H1 is the featured article and topic cards use Library parameters.

- [ ] **Step 3: Implement the stable homepage hierarchy**

Add page metadata, replace the dynamic lead H1 with the approved fixed H1 and introduction, add Browse Advice and Explore Common Challenges actions, and move the featured article into an H2 section. Render six topic cards from `topics` and retain the current visual language and responsive behavior.

- [ ] **Step 4: Update global metadata and navigation**

Change layout defaults to search-oriented brand metadata. Replace legacy navigation links with canonical Advice and Resource links. Add policy links to the footer.

- [ ] **Step 5: Verify and commit**

Run `npm test`, `npm run lint`, and `npm run typecheck`. Expected: PASS without warnings. Commit with `feat: establish canonical homepage SEO hierarchy`.

### Task 6: Build Six Substantive Topic Pillar Pages

**Files:**
- Modify: `src/app/topics/[slug]/page.tsx`
- Modify: `src/lib/articles.ts`
- Modify: `tests/seo-structure.test.mjs`

- [ ] **Step 1: Add failing pillar-page tests**

Assert `generateStaticParams` derives six slugs, `generateMetadata` exists and self-canonicalizes, and rendered source code includes Breadcrumb and FAQ JSON-LD builders plus visible FAQ markup.

- [ ] **Step 2: Run `npm test` and verify RED**

Expected: current four-category list page fails all new pillar requirements.

- [ ] **Step 3: Add complete topic copy to the shared taxonomy**

For each topic, write a unique quick answer, three to five explanatory sections, and three FAQs. Cover the actual search intents represented by assigned articles; do not duplicate paragraph templates between topics.

- [ ] **Step 4: Implement pillar rendering and metadata**

Use `getTopic` and `getArticlesByTopic`, return 404 for unknown slugs, emit self-canonical metadata, BreadcrumbList and FAQPage JSON-LD, visible navigation and FAQs, and group articles by the problem each solves.

- [ ] **Step 5: Verify and commit**

Run `npm test`, `npm run lint`, `npm run typecheck`, and `npm run content:check`. Commit with `feat: publish canonical topic pillar pages`.

### Task 7: Upgrade Article Breadcrumbs, Metadata, Schema, and Recommendations

**Files:**
- Modify: `src/app/articles/[slug]/page.tsx`
- Modify: `src/lib/articles.ts`
- Modify: `tests/seo-structure.test.mjs`

- [ ] **Step 1: Add failing article-page tests**

Assert metadata uses `article.meta.seoTitle`, visible H1 still uses `meta.title`, breadcrumb links use `/topics/${meta.topic}`, Article author remains an Organization, and a related-advice section renders real article links.

- [ ] **Step 2: Run `npm test` and verify RED**

Expected: metadata still uses `meta.title`, breadcrumb uses Library, and no related-advice section exists.

- [ ] **Step 3: Implement related-article selection**

Add a deterministic helper that returns up to two same-topic articles and one cross-topic article, excludes the current slug, and never returns missing records.

- [ ] **Step 4: Implement article SEO surfaces**

Use `seoTitle` for metadata/Open Graph/Twitter, use the topic name and URL in HTML and JSON-LD breadcrumbs, retain the editorial H1, keep organization author/schema, and render the related-advice block.

- [ ] **Step 5: Verify and commit**

Run `npm test`, `npm run lint`, and `npm run typecheck`. Commit with `feat: connect articles to canonical topic graph`.

### Task 8: Add Contextual Internal Links to All Articles

**Files:**
- Modify: `content/articles/*.mdx`
- Modify: `scripts/check-content.mjs`

- [ ] **Step 1: Extend the content checker and observe RED**

Require at least one `/topics/<article-topic>` link and at least two valid `/articles/<slug>` links in each MDX body. Reject self-links and missing slugs. Run `npm run content:check`; expected: failures listing articles without the required link graph.

- [ ] **Step 2: Edit links in editorial context**

For each article, add a natural topic-pillar sentence and at least two relevant article links inside existing paragraphs or a concise further-reading transition. Do not use `click here`, `read more`, or identical anchor text across the corpus. Add cross-topic links when they serve the argument.

- [ ] **Step 3: Run checks and inspect prose diffs**

Run `npm run content:check`. Expected: PASS. Review each diff to ensure no link sentence interrupts the argument or makes unsupported claims.

- [ ] **Step 4: Commit**

Stage only MDX files and `scripts/check-content.mjs`; review the staged diff and commit with `content: build contextual internal link graph`.

### Task 9: Publish Editorial Trust Pages

**Files:**
- Create: `src/app/editorial-policy/page.tsx`
- Create: `src/app/fact-checking-and-corrections/page.tsx`
- Create: `src/app/ai-use-policy/page.tsx`
- Modify: `src/components/site-footer.tsx`
- Modify: `tests/seo-structure.test.mjs`

- [ ] **Step 1: Add failing public-policy tests**

Assert all three page files exist, export metadata, and include required concepts: source selection and composite examples; corrections contact/process; AI illustration disclosure and human editorial responsibility.

- [ ] **Step 2: Run `npm test` and verify RED**

Expected: missing-page failures.

- [ ] **Step 3: Implement policy pages with verifiable claims only**

Adapt the repository's existing `EDITORIAL_STANDARDS.md` into reader-facing prose. Do not claim named reviewers, credentials, review turnaround guarantees, or processes not represented by the project. Provide a corrections contact path using the site's documented editorial contact mechanism.

- [ ] **Step 4: Verify and commit**

Run `npm test`, `npm run lint`, and `npm run typecheck`. Commit with `feat: publish editorial transparency policies`.

### Task 10: Publish the Conversation-Script Linkable Asset

**Files:**
- Create: `src/app/resources/conversation-scripts-for-parents/page.tsx`
- Modify: `src/app/resources/page.tsx`
- Modify: `tests/seo-structure.test.mjs`

- [ ] **Step 1: Add failing resource tests**

Assert the page exports search metadata and contains eight visible scenario sections: contact, advice, money, house rules, apology, partner, space, and repair. Assert Resources links directly to the page rather than presenting it as unavailable early access.

- [ ] **Step 2: Run `npm test` and verify RED**

Expected: missing resource page and missing direct link failures.

- [ ] **Step 3: Write the complete ungated resource**

Create an HTML page with a clear introduction and at least three scripts per scenario. Each item uses `Instead of` and `Try saying` labels plus a brief explanation, avoids diagnosis or guaranteed outcomes, and links to the most relevant topic or article.

- [ ] **Step 4: Replace misleading resource placeholders**

Make the conversation-script asset the primary available resource. Clearly label genuinely future workbooks as in development and keep newsletter signup optional.

- [ ] **Step 5: Verify and commit**

Run `npm test`, `npm run lint`, and `npm run typecheck`. Commit with `feat: publish parent conversation script resource`.

### Task 11: Add the External SEO Operations Checklist

**Files:**
- Create: `docs/seo-operations-checklist.md`

- [ ] **Step 1: Write the operational checklist**

Document weekly index/404/sitemap checks; monthly impressions, clicks, CTR, top queries/pages, parameter exclusions, and cannibalization review; quarterly cluster and backlink review; sitemap submission; URL inspection; and the rule to observe title changes for three to four weeks before changing again.

- [ ] **Step 2: Verify scope and commit**

Confirm the checklist describes actions without claiming they were performed. Run `rg -n "completed|submitted|verified in Search Console" docs/seo-operations-checklist.md`; expected: no false completion claims. Commit with `docs: add ongoing SEO operations checklist`.

### Task 12: Full Verification and Visual QA

**Files:**
- Modify only files needed to correct failures found by verification.

- [ ] **Step 1: Run the complete automated suite**

```powershell
npm test
npm run content:check
npm run lint
npm run typecheck
npm run build
```

Expected: every command exits 0; content check reports 18 published articles; Next.js build completes all static pages.

- [ ] **Step 2: Inspect generated HTML behavior**

Start the production server and inspect `/`, `/library`, `/library?topic=Boundaries`, all six `/topics/...` pages, one representative article, all three policy pages, `/resources`, and the conversation-script page. Confirm the homepage fixed H1, parameter-page robots/canonical tags, topic/article JSON-LD, redirects, and no broken internal links.

- [ ] **Step 3: Inspect desktop and mobile layouts**

At approximately 1440×900 and 390×844, verify navigation, H1 wrapping, topic-section readability, FAQ layout, article breadcrumbs, related advice, and resource scripts. Fix only regressions introduced by this work and rerun the relevant checks.

- [ ] **Step 4: Review repository state**

Run `git status --short`, `git diff --check`, and `git log --oneline -12`. Confirm unrelated `.workbuddy`, downloads, generated images, and pre-existing user changes were neither discarded nor accidentally included in commits.

- [ ] **Step 5: Commit verification-only corrections if necessary**

If verification required changes, stage only those files and commit with `fix: resolve SEO verification findings`. If no changes were needed, do not create an empty commit.
