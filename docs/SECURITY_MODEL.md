# RLSlibrary — Security and Access Model

## 1. Distinguish four kinds of visibility

- **Public GitHub source:** the code in this repository can be viewed and copied by anyone.
- **Public website:** a deployed domain may be reachable by anyone.
- **Published book files:** selected books may intentionally be readable without a login.
- **Private reader/owner data:** credentials, unpublished books, notes, highlights, bookmarks, and personal progress must not be public by default.

One setting does not imply the others.

## 2. Roles

### Anonymous visitor
- Read public book metadata.
- Download/read only files that are explicitly published.
- Cannot upload, edit, publish, delete, or view private reader data.

### Authenticated reader (future public phase)
- All anonymous permissions.
- Create and manage only their own notes, highlights, bookmarks, and reading progress.
- Cannot change catalogue metadata or other users' records.

### Owner / administrator
- Create, update, publish, unpublish, and delete catalogue records.
- Upload, replace, and delete book files.
- Manage categories, collections, and tags.
- Cannot read another reader's private annotations unless a separately justified moderation/support process is introduced.

The initial release may remain owner-managed; public registration is not required to launch the first reading catalogue.

## 3. Storage buckets

Recommended separation:
- `published-books`: public read access only for intentionally published books; write access owner-only.
- `private-books`: private bucket; read/write access only by owner or explicitly authorized account.
- Never mix these access models in one bucket without path and row-level policy tests.

For the simple open library, public reading of published books is an intentional product feature. That does not justify exposing unpublished books, private uploads, or user annotations.

## 4. Database Row Level Security

Enable RLS on every user-facing table before connecting the frontend.

Expected policy principles:
- Public SELECT only for books where `status = 'published'`.
- Owner-only INSERT/UPDATE/DELETE for catalogue and taxonomy tables.
- Reader SELECT/INSERT/UPDATE/DELETE only where `auth.uid() = user_id` for annotations, bookmarks, and progress.
- Do not rely on client-side visibility checks as authorization.
- Test both allowed and denied operations using anonymous and authenticated sessions.

Exact policies must be implemented against the final schema, not copied blindly from this planning document.

## 5. Secrets and credentials

- Use only the Supabase publishable/anon key in browser code, with RLS enforcing access.
- Supabase service-role/secret keys are server-only and must never use a `NEXT_PUBLIC_` prefix.
- Keep local secrets in `.env.local`; never commit it.
- Use different Supabase projects or isolated environments for development and production.
- Rotate credentials if accidentally committed.

## 6. Public files and copyright

A file stored under Next.js `public/` is directly accessible at a predictable URL. This is suitable only for files intended to be public. Before publishing any book, confirm that the owner has the right to distribute it. For later public contributions, add file validation, size limits, malware scanning, and a takedown process.

## 7. Release gate

Do not call the application production-ready until:
- storage policies are reviewed and tested;
- database RLS is enabled and tested;
- owner access is verified server-side;
- no secret values appear in the repository, client bundle, or build logs;
- public and private files have been tested with unauthenticated requests;
- annotations are verified invisible to other accounts.
