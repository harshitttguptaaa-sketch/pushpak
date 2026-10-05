# Pushpak

Landing page and "What are my points worth?" tool for Pushpak.

- `index.html`: the page. It calls `/api/value` and `/api/stats`.
- `api/value.js`: Vercel function. Values the balance from `api/_cards.js`, asks Gemini to explain it, logs the exchange to Supabase.
- `api/stats.js`: Vercel function. Returns balances valued and rupee value identified from Supabase.
- `api/_cards.js`: card rules table with sources and the date last verified.
- `supabase.sql`: table and stats function used in Supabase.

Environment variables (set in Vercel, never in this repo):
`GEMINI_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, optional `GEMINI_MODEL` (default `gemini-2.5-flash-lite`).

Information, not financial advice.
