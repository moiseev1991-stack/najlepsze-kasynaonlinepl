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

Repozytorium zawiera **`.htaccess` w katalogu głównym** — po deployu ląduje jako `httpdocs/.htaccess` i **wewnętrznie** kieruje ruch do `site/` (bez `/site/` w adresie). Document root może zostać **`/httpdocs`**.

**Ważne po pierwszym deployu (i po starej instalacji Pleska):**

1. W **Menadżerze plików** otwórz `httpdocs` i **usuń** domyślny plik **`index.html`** (~1–2 KB) z Pleska, jeśli nadal tam jest — inaczej Apache może serwować go zamiast reguł z `.htaccess`.
2. Upewnij się, że w `httpdocs` jest folder **`site/`** (statyczny build) i plik **`.htaccess`** z repozytorium.
3. Po zmianach treści: `npm run build:static` → commit → push → w Plesku **Pull** / **Deploy**.

Opcjonalnie możesz zamiast tego ustawić document root na **`httpdocs/site`** — wtedy katalog główny `.htaccess` nie jest potrzebny.

Reguły przekierowań SEO są w `public/.htaccess` (kopiowane do `site/.htaccess` przy buildzie).

## Vercel / Node (opcjonalnie)

Przy `output: "export"` nie używasz `next start` — serwujesz wyłącznie pliki z `out/` lub `site/`.  
Hosting z natywnym Node i `next start` wymagałby usunięcia `output: "export"` z `next.config.ts` i przywrócenia `redirects` w configu.

## Zmienne środowiskowe

Pliki `.env*.local` nie są w repozytorium. W dev możesz ustawić `NEXT_PUBLIC_DEV_ORIGIN` (patrz `src/lib/site-origin.ts`).
