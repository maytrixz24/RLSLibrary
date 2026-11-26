# Seed Books

The following ChatGPT-created PDF books are part of the initial collection and intended for free reading in the public catalogue:

| Book | File name | Category |
|---|---|---|
| Foundations of Aotearoa New Zealand Law 2026 | `Foundations_of_Aotearoa_New_Zealand_Law_2026.pdf` | Law & Legal Studies |
| Become a Pro Trader in USDJPY | `Become_a_Pro_Trader_in_USDJPY.pdf` | Finance / Economics |

The original PDF files were preserved outside the GitHub repository during initial source setup. Add them to `public/library/` only because these particular copies are intended to be public. Then set their paths in `data/books.json`.

For the Supabase implementation, migrate published books to the `published-books` bucket and store their storage keys in the database instead of hard-coded local paths.
