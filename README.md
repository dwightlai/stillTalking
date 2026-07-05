# Still Talking

Still Talking is an English editorial site for parents who want to understand
their adult children and stay close without overstepping.

## Stack

- Next.js 16 App Router
- React 19 and TypeScript
- MDX article content
- AI-generated original editorial illustrations

## Local development

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:3000`.

## Quality checks

```bash
npm run content:check
npm run lint
npm run build
```

Public articles must pass the rules in `EDITORIAL_STANDARDS.md`. Template
articles and reused illustrations are rejected.

## Environment

Copy `.env.example` into the environment configuration used by the deployment.
Set `NEXT_PUBLIC_SITE_URL` to the production URL. Newsletter signup uses Kit
API v4 and requires the server-only `KIT_API_KEY` and `KIT_FORM_ID` variables.
