# Adult Child Living at Home Article Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a sourced, original article and illustration about fair rules when an adult child lives at home.

**Architecture:** Add one MDX article using the existing frontmatter schema, one unique WebP illustration, one reciprocal internal link, and one structural regression test. Existing article rendering, sitemap generation, topic filtering, and metadata generation require no component changes.

**Tech Stack:** Next.js 16, MDX, Node test runner, existing content gate, AI-generated raster illustration

---

### Task 1: Lock the publication contract

**Files:**
- Modify: `tests/seo-structure.test.mjs`

- [ ] Add a test that reads `content/articles/adult-child-living-at-home.mdx` and asserts the canonical title, `topic: "independence"`, primary keyword, published status, Census and Pew sources, the four required internal links, and reciprocal link from `when-adult-child-moves-out.mdx`.
- [ ] Run `npm test` and confirm failure because the new article does not exist.

### Task 2: Create the original illustration

**Files:**
- Create: `public/images/article-adult-child-living-at-home.webp`

- [ ] Use the imagegen skill to generate a horizontal editorial illustration of a parent and adult child calmly reviewing a household agreement at a kitchen table. Include shared-home details, warm natural light, no text, no logos, no watermark, and no imitation of a living artist.
- [ ] Convert the generated image to a 1600×900 WebP and verify its dimensions and file size.

### Task 3: Write the article and reciprocal link

**Files:**
- Create: `content/articles/adult-child-living-at-home.mdx`
- Modify: `content/articles/when-adult-child-moves-out.mdx`

- [ ] Add complete frontmatter with slug-derived filename, publication date `2026-07-14`, `contentType: "guide"`, `exampleType: "composite"`, the new image, descriptive alt text, unique card quote, Census and Pew sources, and a 7–8 minute reading time.
- [ ] Write 1,100–1,400 words following the approved nine-part structure. Clearly label the opening as a composite situation, distinguish sourced facts from interpretation, include a practical household-agreement checklist and natural conversation script, and avoid legal or clinical claims.
- [ ] Add natural links to `/topics/independence`, `/articles/when-adult-child-moves-out`, `/articles/financial-help-control`, and `/topics/boundaries`.
- [ ] Add a contextual reciprocal link in `when-adult-child-moves-out.mdx`.
- [ ] Run `npm test` and `npm run content:check`; confirm both pass.

### Task 4: Verify and publish

**Files:**
- Verify: `content/articles/adult-child-living-at-home.mdx`
- Verify: `public/images/article-adult-child-living-at-home.webp`

- [ ] Run `npm run lint`, `npm run typecheck`, `npm run build`, and `git diff --check`.
- [ ] Launch the production build locally and review the article at desktop and mobile widths.
- [ ] Commit the article, image, test, reciprocal link, and plan.
- [ ] Fast-forward `main`, rerun tests, push `main`, and deploy to Vercel production.
