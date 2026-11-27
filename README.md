# RLSlibrary

**Read. Learn. Smart.**

A reader-first public digital library with a warm dark-academia visual identity. The first release contains ten freely readable books across six categories.

## Live website

[https://rlslibrary.vercel.app](https://rlslibrary.vercel.app)

## Catalogue

The first ten entries are:

- **Education / Academic:** The Elements of Style; Meditations
- **Finance / Economics:** Become a Pro Trader in USDJPY
- **Law / Legal Studies:** Foundations of Aotearoa New Zealand Law 2026; The Federalist Papers
- **Fiction / Novels:** Pride and Prejudice; Jane Eyre
- **Science / Technology:** On the Origin of Species; Relativity: The Special and General Theory
- **Religion:** The Dhammapada

The two RLSlibrary original books are generated as lighter, reflowed PDFs from the owner-supplied source files. Their wording is extracted from the originals, but page design, diagrams, images and complex layouts may differ. The app displays this limitation in the book's rights/edition note.

Several historical public-domain titles are converted into a reader-friendly PDF on demand from the cited Project Gutenberg text. The Elements of Style links to the openly reusable Geneseo PDF. Source and edition notes are displayed on each book's reader page.

## Product principles

- Published catalogue books can be read without an account.
- The GitHub repository is public by choice; repository visibility is separate from website and storage permissions.
- Owner administration, unpublished uploads and reader notes/highlights/progress must be protected when those features are implemented.
- English and Indonesian interface copy.
- Flexible organization by category, collections and tags.

## Technology

- Next.js App Router + TypeScript
- Tailwind-inspired custom CSS
- PDFKit for generating reader-friendly PDFs from approved public-domain text
- Supabase PostgreSQL, Auth and Storage (planned)
- Vercel hosting and GitHub source control

## Local development

Use Node.js 22 LTS.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Available scripts:

- `npm run dev` — start development server; regenerates the two owner-supplied seed PDFs first
- `npm run lint` — run ESLint
- `npm run typecheck` — run TypeScript checks
- `npm run build` — build for production; regenerates the seed PDFs first
- `npm run start` — run the production build

## Copyright and source policy

The initial selection uses historical public-domain source texts and an openly reusable PDF edition. The rights notes distinguish authorial works, translations and the particular source edition.

Indonesia's Law No. 28 of 2014 is the initial jurisdictional reference. Public-domain status in Indonesia is not an automatic guarantee for every other country. Ratings are user-generated Goodreads community snapshots, not academic endorsements. See [docs/BOOKS_AND_COPYRIGHT.md](docs/BOOKS_AND_COPYRIGHT.md).

## Security model

The initial public catalogue is intended to be open. Owner-only uploads, unpublished/private books and personal notes must not be placed in public static assets. Database row-level security and protected storage are required before public registration or private uploads are enabled. Never commit secrets or a Supabase service-role key.

See:
- `docs/PRODUCT_SPEC.md`
- `docs/SECURITY_MODEL.md`
- `docs/BOOKS_AND_COPYRIGHT.md`
- `docs/DEVELOPMENT_WORKFLOW.md`
