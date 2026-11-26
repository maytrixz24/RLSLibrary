# Published book files

This folder is reserved for book files that the owner deliberately publishes as freely readable catalogue items.

To add the two seed books to this static prototype, upload these PDFs here:

- `Foundations_of_Aotearoa_New_Zealand_Law_2026.pdf`
- `Become_a_Pro_Trader_in_USDJPY.pdf`

Then update the matching `file` properties in `data/books.json` to:

- `/library/Foundations_of_Aotearoa_New_Zealand_Law_2026.pdf`
- `/library/Become_a_Pro_Trader_in_USDJPY.pdf`

Files in `public/` are publicly downloadable. Do not place private documents here. The later Supabase implementation will give each book an explicit publication state and protect private files separately.
