# RLSlibrary seed books

Two ChatGPT-created books supplied by the owner are included in the first catalogue:

| Book | Category | Deployed PDF |
|---|---|---|
| Foundations of Aotearoa New Zealand Law 2026 | Law / Legal Studies | `/library/Foundations_of_Aotearoa_New_Zealand_Law_2026.pdf` |
| Become a Pro Trader in USDJPY | Finance / Economics | `/library/Become_a_Pro_Trader_in_USDJPY.pdf` |

## File preparation

The original PDFs were extracted as text, compressed into source assets in `seed-assets/`, and converted into lightweight PDFs during `predev` and `prebuild` using `scripts/materialize-seed-books.mjs`.

This approach preserves the extracted wording but **does not preserve the original page layout, images, charts, diagrams, or complex tables perfectly**. The generated PDF's first page explains this. The original files remain available in the owner's ChatGPT Library; use exact original binary files instead if visual fidelity is required for a later release.

The resulting deployed files are public catalogue assets because the owner explicitly intends these two works to be freely readable. Do not use this mechanism for unpublished or private books.
