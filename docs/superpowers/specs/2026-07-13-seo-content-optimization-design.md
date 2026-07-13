# Still Talking SEO and Content Optimization Design

## Objective

Implement every recommendation from `still-talking-seo-optimization-detailed.md` that can be completed inside the repository. This includes technical SEO, information architecture, topic pages, article metadata and internal links, editorial transparency, and one linkable resource. Search Console operations, outreach, and unverifiable real-person credentials remain documented operational work outside the repository.

## Constraints

- Preserve all existing article URLs.
- Preserve unrelated and uncommitted user changes.
- Do not invent authors, reviewers, credentials, research, interviews, or publication history.
- Do not create keyword-swapped articles merely to fill a content cluster.
- Keep the existing warm editorial design and accessible Next.js server-rendered output.
- Treat the current 18 published articles as the content corpus for this iteration.

## Information Architecture

### Primary topics

The site will use six indexable, problem-oriented topics:

1. Communication — `/topics/communication`
2. Boundaries — `/topics/boundaries`
3. Money and Support — `/topics/money-and-support`
4. Independence — `/topics/independence`
5. Family Relationships — `/topics/family-relationships`
6. Conflict and Repair — `/topics/conflict-and-repair`

Each article has exactly one primary `topic`. `contentType` remains a separate dimension with the existing values `guide`, `q-and-a`, `narrative`, and `research`. An optional `lifeStage` list may support future filtering but does not create indexable pages.

### URL migration

- `/topics/relationships` permanently redirects to `/topics/family-relationships`.
- `/topics/money-work` permanently redirects to `/topics/money-and-support`.
- `/topics/guides` permanently redirects to `/resources`.
- Existing `/articles/<slug>` URLs do not change.
- `/library` remains indexable and self-canonical.
- Any `/library?...` parameter variant emits `noindex,follow` and canonicalizes to `/library`.
- Parameter URLs never appear in the sitemap.

The primary navigation exposes the six topics under Advice. Resources exposes conversation scripts, the complete library, and editorial standards. Homepage topic links point to static topic pages, not filtered Library URLs.

## Content Model

Article frontmatter gains the following required fields:

- `seoTitle`: search-oriented title used in metadata; it does not automatically replace the editorial H1.
- `primaryKeyword`: the single query family assigned to the page.
- `searchIntent`: a concise statement of the reader question the page answers.
- `topic`: one of the six canonical topic slugs.

The existing `title` remains the article H1. Existing `pillar` data is migrated into `topic` and then removed to avoid parallel taxonomies. The content checker validates allowed topics, unique SEO titles, sensible SEO-title lengths, and required metadata.

Each of the 18 articles will be reviewed individually. Its SEO title must accurately match the existing article rather than broaden it into a pillar query. Its description must make the relationship between the search title and editorial H1 clear. Content edits preserve the article's voice and argument while adding natural internal links.

## Page Designs

### Homepage

The homepage has one server-rendered H1: `Practical Advice for Parents of Adult Children`. Its introductory copy naturally covers communication, boundaries, money, independence, family conflict, and repair. Primary actions lead to the Library and the core topics.

The featured article moves below the stable site introduction and uses an H2. Topic exploration links to the six canonical topic pages. Homepage metadata is:

- Title: `Advice for Parents of Adult Children | Still Talking`
- Description: `Practical, research-informed advice for parents of adult children. Learn how to handle communication, boundaries, money, independence, family conflict and relationship repair.`

### Topic pillar pages

Every canonical topic page has its own metadata, self-canonical URL, H1, substantial original introduction, quick answer, section navigation, problem-based explanatory sections, grouped article links, and FAQ. Content length follows search-intent completeness rather than a mechanical word target, while remaining materially more useful than an article index.

Topic pages output `BreadcrumbList` and `FAQPage` structured data using only visible page content. Articles are grouped by reader problem, not publication date. A topic page cannot exist without at least one assigned article.

### Library

The base Library remains a searchable article index. `generateMetadata` inspects `searchParams`: the base page is indexable and self-canonical; any filter or focus parameter is `noindex,follow` and canonicalizes to the base Library. Invalid filters fall back to the full Library without becoming indexable.

### Article pages

Metadata uses `seoTitle`, while the visible H1 uses `title`. Breadcrumbs become `Home → <Canonical Topic> → <Article Title>` in both HTML and JSON-LD. The canonical topic crumb links to the relevant pillar page.

Every article provides:

- one contextual link to its topic pillar;
- two contextual links to related articles in the same topic where the corpus permits;
- one contextual link to a relevant article in a different topic where appropriate;
- a related-advice block generated from explicit or deterministic topic relationships;
- organization author, publication date, update date, evidence note, and sources.

Article structured data continues to identify `Still Talking Editors` as an Organization. It does not emit a `Person` author or `reviewedBy` until verifiable profiles exist.

## Editorial Trust

The site adds public pages for:

- Editorial Policy;
- Fact Checking and Corrections;
- AI Use Policy.

These pages explain topic selection, sourcing, composite examples, sensitive-topic handling, human review expectations, correction contact paths, and the disclosed use of AI-generated illustrations. Footer links make the policies discoverable. Existing disclosure and privacy pages remain separate.

No author profile is created in this iteration because the repository does not contain verifiable person-level biographical data. This explicit omission is preferable to fabricated E-E-A-T signals.

## Linkable Resource

The Resources area gains an indexable HTML page for conversation scripts for parents of adult children. It contains useful scripts that can be read without submitting an email address, organized around asking for contact, offering advice, money, house rules, apologizing, partners, giving space, and repairing conflict. Each script contrasts a pressure-producing phrase with a clearer alternative and links to relevant articles or topics.

Email signup may offer future downloadable resources, but it does not gate the page's main content. Existing placeholder cards are revised so they do not imply that unavailable downloads already exist.

## Sitemap, Robots, and Redirects

The sitemap includes the homepage, key static pages, the six canonical topics, the conversation-script resource, and published articles. It excludes parameter variants, redirects, unsubscribe routes, and API routes. Dates use meaningful content update dates where available instead of generating a new timestamp on every request.

`robots.ts` continues to allow crawling so search engines can observe page-level `noindex`. Redirects are configured as permanent Next.js redirects.

## Error Handling and Compatibility

- Unknown topic slugs return 404.
- Legacy topic slugs redirect permanently.
- Invalid Library filters show the unfiltered Library while remaining `noindex` because a parameter is present.
- Structured data omits unavailable fields rather than emitting placeholders.
- Related links never point to missing articles.
- The content build fails when an article has an invalid topic, duplicate SEO title, missing source, invalid date, missing image, or malformed internal article link.

## Verification

Implementation follows test-first cycles for behavior changes. Automated checks cover:

- homepage metadata and exactly one expected H1 in rendered output;
- base Library indexability and parameter-page `noindex,follow` plus canonical;
- canonical topic list and legacy redirects;
- article SEO-title/H1 separation;
- article and breadcrumb structured data;
- sitemap inclusion and exclusion rules;
- required article fields, allowed topic values, title uniqueness, valid internal links, sources, dates, and images.

Final verification runs the focused tests, content check, ESLint, TypeScript checking, and production build. Rendered pages are then inspected at desktop and mobile widths for hierarchy, wrapping, navigation, and metadata output.

## Out-of-Repository Operations

The repository will include a concise SEO operations checklist for the site owner covering Search Console baseline capture, sitemap submission, index coverage, parameter-page exclusions, query and page monitoring, CTR review, keyword cannibalization review, and outreach prerequisites. The implementation does not claim completion of these external actions.

## Completion Criteria

- The homepage has the stable H1 and search-oriented metadata.
- Six canonical topic pages provide substantive pillar content and link to every published article.
- All 18 published articles have one canonical topic and distinct SEO metadata.
- Article breadcrumbs and contextual links form a topic-centered internal-link graph.
- Parameter Library pages are crawlable but `noindex,follow` and canonicalized.
- Legacy topic URLs redirect permanently and do not appear in the sitemap.
- Editorial, fact-checking/corrections, and AI-use policies are public and linked.
- At least one complete, ungated conversation-script resource is public.
- Automated checks, lint, type checking, and production build pass.
- Search Console and outreach work is clearly documented as external follow-up.
