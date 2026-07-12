/**
 * Wszystkie kliknięcia w affiliate CTA („Zarejestruj się") kierujemy do
 * WSPÓLNEGO endpointa /go/ (jeden URL dla wszystkich kasyn). Tracker
 * partnera na tej stronie decyduje o finalnym redirekcie po własnych
 * parametrach (landing_url, referrer, title).
 */

const GO_URL = "/go/";

function isExternalUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

export function affiliateGoUrl(_casinoSlug: string, _fallbackUrl: string): string {
  return GO_URL;
}

export function pageOfferRegisterUrl(fallbackHref: string): string {
  if (!fallbackHref || isExternalUrl(fallbackHref)) return GO_URL;
  return fallbackHref;
}

export function resolveAffiliateLikeHref(_casinoSlug: string, href: string): string {
  if (isExternalUrl(href)) return GO_URL;
  return href;
}
