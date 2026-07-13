# Homepage and Topic Layout Redesign

## Goal

Improve wide-screen balance, hierarchy, readability, and topic identity across the homepage and all six topic pages without changing URLs, SEO headings, metadata, structured data, or editorial content ownership.

## Homepage

- Replace the stacked site-introduction hero plus featured-story block with one integrated two-column hero.
- Keep exactly one server-rendered H1: `Practical Advice for Parents of Adult Children`.
- Left column contains eyebrow, H1, introduction, and primary/secondary actions.
- Right column presents the featured article as an image-led editorial feature with its topic, H2, summary, and link.
- Reduce H1 scale and constrain its measure so it balances into two lines on common desktop widths.
- Keep the Start Here row below the hero as the transition into practical navigation.
- Render six topic entries as a balanced 3×2 grid on desktop, 2×3 on tablet, and one column on mobile.

## Topic Pages

- Keep the existing H1, canonical, BreadcrumbList, FAQPage, visible FAQ, and problem-based article groups.
- Replace the tall single-column opening with a 60/40 editorial hero: title and introduction on the left, a more prominent topic-specific quick answer on the right.
- Give each topic an understated accent color and number marker while preserving the shared brand palette.
- Reduce the maximum H1 size so titles remain one or two deliberate lines.
- Replace the crowded horizontal jump-link strip with a sticky left-hand contents rail on desktop and a compact wrapping contents block on mobile.
- Render explanatory sections as a readable single-column narrative in the main column, not three narrow equal columns.
- Make every Quick Answer unique; remove the repeated template sentence.
- Display article groups as two-column cards on wide screens and one column on small screens, avoiding empty three-column rows.
- Highlight the active topic in primary navigation.

## Responsive and Accessibility Requirements

- Desktop target: 1440–1920px wide; laptop target: 1280×800; mobile target: 390×844.
- No horizontal overflow, clipped headings, or orphaned single-word headline lines.
- Maintain visible focus rings, semantic landmarks, skip navigation, descriptive image alternatives, and readable contrast.
- Browser-extension overlays shown in supplied screenshots are outside site scope.

## Verification

- Source tests assert one homepage H1, integrated featured hero, six-topic 3-column grid, topic hero, sticky contents rail, unique quick answers, two-column article groups, and active navigation behavior.
- Run tests, content check, ESLint, TypeScript, and production build.
- Inspect representative homepage, Boundaries, Money and Support, and Conflict and Repair pages at desktop and mobile sizes.
