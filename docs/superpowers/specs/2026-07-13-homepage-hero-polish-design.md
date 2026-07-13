# Homepage hero polish design

## Goal

Refine the existing homepage hero without changing its content, SEO structure, image, or two-column editorial direction.

## Approved adjustments

- Reduce desktop hero top and bottom padding so the next section begins to enter the initial viewport.
- Reduce the desktop H1 scale by roughly eight percent while preserving its serif treatment and balanced wrapping.
- Keep the existing column ratio; avoid a structural redesign.
- Reduce the featured story copy offset and inset so its text aligns more clearly with the image.
- Give “Browse Advice” a clear primary text-link treatment and keep “Explore Common Challenges” visually secondary.
- Preserve the current stacked mobile actions and mobile title sizing.

## Constraints

- Keep exactly one H1 and all existing metadata and links.
- Do not modify the featured article selection or image crop.
- Do not add dependencies or animation libraries.
- Preserve keyboard focus styles and responsive breakpoints.

## Verification

- Add a source-structure regression test for the new hero spacing, title scale, featured-copy inset, and CTA classes.
- Run tests, content checks, lint, typecheck, and production build.
- Review desktop and mobile screenshots before deployment.
