# Najlepsze Kasyna Online

Next.js 15 (App Router) + Tailwind — strona porównawcza kasyn online (PL).

Projekt buduje się jako **statyczny eksport** (`output: "export"`) — gotowe pod hosting współdzielony (Apache / Plesk **bez Node.js**).

## Lokalnie

```bash
npm install
npm run dev:fast
```

Otwórz [http://localhost:3055](http://localhost:3055).

## Build statyczny (produkcja + folder `site/`)

```bash
npm run build:static
```

Powstaje `out/` (tymczasowo) oraz **`site/`** — **to** katalog należy serwować jako document root.

## Plesk / Apache (`httpdocs`)

1. Git w Plesku nadal może ściągać całe repozytorium do `httpdocs/`.
2. W **Ustawieniach hostingu** ustaw **Document root** na podkatalog ze statyczną stroną, np.  
   **`/httpdocs/site`**  
   (pełna ścieżka zależy od panelu — chodzi o folder `site` z repozytorium).
3. Po każdej zmianie treści: lokalnie `npm run build:static`, commit + push, w Plesku **Pull** / **Deploy**.

Reguły przekierowań SEO są w `public/.htaccess` (trafiają do `site/` przy buildzie).

## Vercel / Node (opcjonalnie)

Przy `output: "export"` nie używasz `next start` — serwujesz wyłącznie pliki z `out/` lub `site/`.  
Hosting z natywnym Node i `next start` wymagałby usunięcia `output: "export"` z `next.config.ts` i przywrócenia `redirects` w configu.

## Zmienne środowiskowe

Pliki `.env*.local` nie są w repozytorium. W dev możesz ustawić `NEXT_PUBLIC_DEV_ORIGIN` (patrz `src/lib/site-origin.ts`).
