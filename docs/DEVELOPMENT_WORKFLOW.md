# Development Workflow

## Branches

- `main`: stable integration branch.
- `feature/<short-name>`: focused feature work.
- `fix/<short-name>`: focused bug fixes.
- `research/<topic>`: experiments that may be discarded.

Work in feature branches for substantial changes. Merge into `main` only after local verification.

## Local setup

1. Install Node.js 22 LTS.
2. Clone the repository.
3. Copy `.env.example` to `.env.local` when a Supabase project is configured.
4. Run `npm install`.
5. Run `npm run dev`.

## Quality checks

Before merging:
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- manual check on a narrow mobile viewport and a desktop viewport;
- verify every new link, form, and state transition.

## Environments

- **Local:** developer experimentation.
- **Preview:** branch/PR validation; use non-production backend data.
- **Production:** public reading experience with production storage and database.

Never use production secrets in Preview or commit them to source control.

## Research and decisions

Record major architecture decisions in `docs/decisions/` using short Architecture Decision Records (ADRs). Experiments belong in isolated branches or a research folder, not in the production path by default.

## Current implementation status

The repository currently contains the visual bookshelf prototype and product/security documentation. Supabase integration, authentication, database persistence, file upload, real PDF/EPUB reader, annotation sync, test automation, and deployment are subsequent development milestones.
