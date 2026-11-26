# RLSlibrary — Product Specification (v0.2)

## 1. Product purpose

RLSlibrary is a reader-first digital library built around collecting, organizing, and reading educational, professional, and creative books. The initial operating model is one owner who curates the catalogue. The source repository is public, and the owner is comfortable making selected books freely readable.

## 2. Product principles

1. Reading should feel calm, focused, and comfortable.
2. The interface should be beautiful without sacrificing search and organization.
3. Published books may be read freely without requiring an account.
4. Administrative actions must be authenticated and restricted to the owner.
5. Notes, highlights, bookmarks, and reading progress belong to the reader and are private by default.
6. Metadata should support future growth without overengineering the first release.

## 3. Information architecture

### Primary areas
- Discover / Library home
- All books
- Categories
- Collections
- Book detail and reading view
- Reading history (requires reader identity in the persisted version)

### Owner workspace (future)
- Add or upload a book
- Edit metadata
- Manage categories, collections, and tags
- Set publication state
- Replace or remove a book file

## 4. Categories

1. Education / Academic
2. Finance / Economics
3. Law & Legal Studies
4. Fiction / Novels
5. Science / Technology
6. Religion

Books may belong to one primary category and multiple collections/tags.

## 5. Book metadata

Required: title, author/creator, category, language, file format, publication state.

Recommended: subtitle, description, year, cover, ISBN, publisher, tags, collections, file size, page count, created/updated dates.

## 6. Reader requirements

- PDF and EPUB
- Light, dark, and sepia themes
- Adjustable font size, font family, and line spacing for reflowable text
- Table of contents and chapter navigation for EPUB
- Search within book
- Bookmarks
- Text highlights and private notes
- Automatic reading-progress synchronization when signed in
- Fullscreen / distraction-free mode
- Keyboard shortcuts
- Responsive desktop and mobile layout

PDF typography controls are more limited than EPUB because page layout is fixed; the UI must not imply EPUB-style reflow for PDF pages.

## 7. Language

English and Indonesian. The first interface pass includes a manual language toggle; all user-facing strings should eventually move to a typed translation dictionary rather than scattered conditional expressions.

## 8. Visual direction

Dark academia with a warm literary atmosphere:
- forest green and charcoal foundations;
- warm cream reading surfaces;
- restrained antique-gold accents;
- editorial serif headings and readable sans-serif interface text;
- generous spacing and clear reading hierarchy.

## 9. Access and publication model

- Public visitors can browse and read books marked as published.
- Owner-only tools control uploads and catalogue metadata.
- Private books are available only to authorized readers.
- Personal annotations and reading progress are scoped to their owner.
- Public visibility is explicit and separate from GitHub repository visibility.

## 10. Initial acceptance criteria

- Search matches title, author, subtitle, description, and category.
- Category filtering works with empty-state feedback.
- Language toggle changes all currently visible interface copy.
- Published book cards open a valid reader or file destination.
- Unpublished/unavailable book files are not presented as working links.
- Layout remains usable at mobile, tablet, and desktop widths.
- No secrets or private file URLs are embedded in client components.
