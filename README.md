# SlotWatch (szkielet)
Darmowa aplikacja Next.js + Supabase pod Vercel. Brak terminów egzaminów, brak płatności.
## Start
1. `npm install && npm run dev`
2. Bez Supabase działa tryb demo (localStorage).
## Supabase
Uruchom `supabase/migrations/001_init.sql` w SQL Editorze, skopiuj `.env.example` do `.env.local` i uzupełnij.
## Vercel
Wypchnij repo na GitHub, zaimportuj w Vercel, dodaj zmienne z `.env.example`. Cron: `vercel.json` (autoryzacja `CRON_SECRET`).
## Status
Gotowe: wszystkie widoki (tryb demo, localStorage), PWA, import/eksport z walidacją. Brak: integracji Supabase w kodzie (jest tylko migracja).
