# Homepage featured article swap design

## Goal

Replace the homepage featured story with the newly published `adult-child-living-at-home` article and its existing original illustration.

## Implementation

- Remove `featured: true` from `do-not-pull-your-child-into-your-fight.mdx`.
- Add `featured: true` to `adult-child-living-at-home.mdx`.
- Keep the homepage component unchanged because it already selects the single featured article and renders its title, description, category, image, alt text, and link.

## Acceptance criteria

- Exactly one published article has `featured: true`.
- That article is `adult-child-living-at-home.mdx`.
- The homepage links the featured card to `/articles/adult-child-living-at-home` and displays `/images/article-adult-child-living-at-home.webp` through existing data flow.
- Tests, content check, typecheck, lint, and production build pass.
- Desktop and mobile homepage screenshots show the new feature before production deployment.
