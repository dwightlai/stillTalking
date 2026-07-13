# Homepage and Topic Layout Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebalance the homepage and six shared topic pages while preserving SEO and editorial behavior.

**Architecture:** Keep the existing Next.js page/data architecture and replace only page composition and scoped CSS. Add a small pathname-aware navigation component for active states, and extend shared topic data with presentation accents and unique quick answers.

**Tech Stack:** Next.js 16, React 19, TypeScript, scoped JSX CSS, Node test runner.

---

### Task 1: Lock the desired layout structure

**Files:** Modify `tests/seo-structure.test.mjs`.

- [ ] Add failing assertions for an integrated `home-hero`, exactly one H1, `repeat(3,1fr)` topic grid, topic `quickAnswer` data, `topic-layout`, `position:sticky`, two-column article groups, and active navigation styling.
- [ ] Run `npm test` and confirm failures identify the old layout.

### Task 2: Recompose the homepage

**Files:** Modify `src/app/page.tsx`.

- [ ] Integrate the fixed SEO introduction and featured article into one two-column hero.
- [ ] Reduce and rebalance H1 typography, align featured media and copy, and preserve one H1.
- [ ] Change six-topic layout to 3×2 desktop, 2×3 tablet, one-column mobile.
- [ ] Run tests, TypeScript, and Lint.

### Task 3: Recompose the shared topic template

**Files:** Modify `src/lib/articles.ts`, `src/app/topics/[slug]/page.tsx`.

- [ ] Add a unique quick answer and restrained accent to each canonical topic.
- [ ] Build a 60/40 topic hero with prominent quick-answer panel.
- [ ] Replace the horizontal contents strip and three-column copy with a sticky contents rail plus single-column narrative.
- [ ] Render problem-based article groups in two columns and preserve structured data.
- [ ] Run tests, content checks, TypeScript, and Lint.

### Task 4: Add active navigation state

**Files:** Modify `src/components/site-header.tsx`.

- [ ] Use the current pathname to set `aria-current="page"` and an understated active underline/background.
- [ ] Confirm desktop and mobile navigation retain keyboard focus and close behavior.

### Task 5: Verify and release

**Files:** Only corrections discovered by verification.

- [ ] Run `npm test`, `npm run content:check`, `npm run lint`, `npm run typecheck`, and `npm run build`.
- [ ] Inspect representative desktop and mobile pages.
- [ ] Merge to main, push GitHub, and deploy the verified commit to Vercel production.
