# Homepage Featured Article Swap Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the new adult-child-living-at-home article and illustration the single homepage featured story.

**Architecture:** Preserve the existing homepage data flow. Move the unique `featured: true` frontmatter field from the old article to the new article and protect the selection with a content regression test.

**Tech Stack:** Next.js, MDX frontmatter, Node test runner

---

### Task 1: Lock the featured-story contract

**Files:**
- Modify: `tests/seo-structure.test.mjs`

- [ ] Add a test that scans all article MDX files, asserts exactly one `featured: true`, and asserts that its filename is `adult-child-living-at-home.mdx`.
- [ ] Run `npm test` and confirm failure because the old article is still featured.

### Task 2: Move the featured marker

**Files:**
- Modify: `content/articles/adult-child-living-at-home.mdx`
- Modify: `content/articles/do-not-pull-your-child-into-your-fight.mdx`

- [ ] Add `featured: true` to the new article frontmatter.
- [ ] Remove `featured: true` from the old article frontmatter.
- [ ] Run `npm test` and `npm run content:check`; confirm both pass.

### Task 3: Verify and publish

**Files:**
- Verify: `src/app/page.tsx`
- Verify: both modified MDX files

- [ ] Run lint, typecheck, production build, and `git diff --check`.
- [ ] Review desktop and mobile homepage screenshots for the new title, description, image, category, and link.
- [ ] Commit, fast-forward `main`, push, and deploy to Vercel production.
