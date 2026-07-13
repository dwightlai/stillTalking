# Homepage Hero Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tighten the homepage hero proportions and clarify CTA hierarchy without changing content or SEO structure.

**Architecture:** Keep the current homepage JSX and inline scoped CSS. Add semantic CTA classes, then change only the hero-related rules and their mobile overrides.

**Tech Stack:** Next.js 16, React 19, scoped JSX CSS, Node test runner

---

### Task 1: Lock the refined hero contract

**Files:**
- Modify: `tests/seo-structure.test.mjs`

- [ ] Add assertions for `home-primary-action`, `home-secondary-action`, the reduced `clamp(40px,5vw,68px)` hero padding, the `5.25rem` H1 cap, and the reduced featured-copy offset.
- [ ] Run `npm test` and confirm the homepage test fails because the new classes and CSS values are absent.

### Task 2: Apply the visual polish

**Files:**
- Modify: `src/app/page.tsx`

- [ ] Add `home-primary-action` and `home-secondary-action` to the existing links.
- [ ] Change desktop hero padding to `clamp(40px,5vw,68px) 0 clamp(44px,5.5vw,72px)`.
- [ ] Change the H1 size to `clamp(3.4rem,5.15vw,5.25rem)` and its bottom margin to `22px`.
- [ ] Change featured copy positioning to `width:calc(100% - 20px); margin:-34px 0 0 20px; padding:25px 0 24px 20px`.
- [ ] Style the primary action with a two-pixel accent underline and hover translation; render the secondary action with muted color and a subtle color transition.
- [ ] Preserve the current stacked mobile actions and reset the primary underline width to its content.
- [ ] Run `npm test` and confirm all tests pass.

### Task 3: Verify and integrate

**Files:**
- Verify: `src/app/page.tsx`
- Verify: `tests/seo-structure.test.mjs`

- [ ] Run `npm run content:check`, `npm run lint`, `npm run typecheck`, and `npm run build`.
- [ ] Capture and review desktop and mobile homepage screenshots.
- [ ] Commit the implementation, fast-forward `main`, push, and deploy to production.
