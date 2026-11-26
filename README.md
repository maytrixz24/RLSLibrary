# RLSlibrary

**Read. Learn. Smart.**

A reader-first digital library with a warm dark-academia visual identity. The project starts as a small, owner-managed collection and is structured to support a public catalogue later.

## Product direction

- **Public reading catalogue:** books intentionally published by the owner can be read freely.
- **Private owner workspace:** upload and metadata-management tools are restricted to the owner.
- **Private reader data:** personal notes, highlights, bookmarks, and reading progress are private to the authenticated user.
- **Bilingual UI:** English and Indonesian.
- **Flexible organization:** categories, collections, and tags.

## Initial collection

1. *Foundations of Aotearoa New Zealand Law 2026* — Law / Legal Studies
2. *Become a Pro Trader in USDJPY* — Finance / Economics

The seed PDFs are currently included in the prototype archive. They are not yet committed to this repository; they will be added to the book catalogue/storage after the initial application code is established.

## Technology baseline

- Next.js App Router + TypeScript
- Tailwind CSS
- Supabase PostgreSQL, Auth, and Storage (planned)
- Vercel deployment (planned)
- PDF.js / EPUB.js reader integrations (planned)

## Current status

This repository is the **starting prototype**, not a production-ready library. The current UI uses local static metadata and browser navigation to PDF assets. Authentication, database persistence, secure owner tools, EPUB rendering, annotations, and synchronized progress are not implemented yet.

## Local development

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Available scripts:

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run start` — run the production build
- `npm run lint` — run ESLint

## Security and publication model

The GitHub repository is public by choice. That makes the **source code** publicly viewable.

Books in a public catalogue are intentionally readable without an account. A public PDF URL is also directly accessible to anyone who has it; it must never be used for material the owner expects to keep private.

The planned application separates:
- public book metadata and published reading files;
- owner-only upload, edit, publish, and delete operations;
- per-user private notes, highlights, bookmarks, and progress.

Before implementing authentication and persistence, storage access rules and database row-level security policies must be designed and tested. Never place Supabase service-role keys or other secrets in client-side code or commit them to Git.

## Development roadmap

1. Establish the application shell, design system, and maintainable project structure.
2. Add Supabase schema, migrations, authentication, and access policies.
3. Implement owner-only book management and public/private publication states.
4. Implement the PDF and EPUB reader, navigation, settings, and annotations.
5. Add search, collections, tags, bilingual copy, and reading-progress sync.
6. Add automated tests, security checks, accessibility and performance audits.
7. Connect Vercel preview/production environments and document maintenance.

See `docs/PRODUCT_SPEC.md` and `docs/SECURITY_MODEL.md` for the initial product and security decisions.
