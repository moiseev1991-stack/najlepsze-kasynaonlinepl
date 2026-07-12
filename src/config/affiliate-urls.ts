/**
 * Wszystkie kliknięcia w affiliate CTA („Zarejestruj się") kierujemy przez
 * lokalny redirector /go/<slug>/, na którym loader trackera partnera
 * (registration-acc.site) dociąga klienta JS i przekierowuje do finalnego
 * URL. Dzięki temu:
 *  - żadne strony treści nie ładują trackera w tle,
 *  - kliknięcia są zliczane po landing_url = /go/<slug>,
 *  - można łatwo zmienić / wyłączyć partnera bez ruszania wszystkich CTA.
 */

const GO_PREFIX = "/go";

function isExternalUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

export function affiliateGoUrl(casinoSlug: string, _fallbackUrl: string): string {
  if (!casinoSlug) return "#";
  return `${GO_PREFIX}/${casinoSlug}/`;
}

export function pageOfferRegisterUrl(fallbackHref: string): string {
  // Fallback dla globalnego CTA (PageOfferBar) — jeżeli podano zewnętrzny link, kieruj przez ogólny /go/,
  // jeżeli wewnętrzny (#, /path) — zostaw bez zmian.
  if (!fallbackHref || isExternalUrl(fallbackHref)) return "#";
  return fallbackHref;
}

export function resolveAffiliateLikeHref(casinoSlug: string, href: string): string {
  // Linki „affiliate-like" z problemsReportOptions casino (najczęściej zewnętrzne formularze
  // zgłoszeń) — zewnętrzne kierujemy przez /go/<slug>/, wewnętrzne zostawiamy.
  if (isExternalUrl(href)) return `${GO_PREFIX}/${casinoSlug}/`;
  return href;
}
