# Najlepsze Kasyna Online

Next.js 15 (App Router) + Tailwind — strona porównawcza kasyn online (PL).

## Lokalnie

```bash
npm install
npm run dev:fast
```

Otwórz [http://localhost:3055](http://localhost:3055).

## Build produkcyjny

```bash
npm run build
npm start
```

## Wdrożenie z GitHub

Repozytorium zawiera **kod źródłowy** — hosting sam uruchamia build (nie commitujemy `.next/` ani `node_modules/`).

**Vercel (zalecane dla Next.js):** Import repozytorium → framework Next.js wykrywany automatycznie. Build: `npm run build`, start: `next start` (lub domyślne ustawienia).

**Inny hosting (Node):** Node 20+, `npm ci`, `npm run build`, `npm start` (zmienna `PORT` opcjonalna).

Pliki `.env*.local` nie są w repozytorium — ustaw zmienne w panelu hostingu, jeśli potrzebne.
