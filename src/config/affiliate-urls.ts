/**
 * Wszystkie kliknięcia w affiliate CTA („Zarejestruj się") kierujemy do
 * WSPÓLNEGO endpointa /go/ (jeden URL dla wszystkich kasyn). Tracker
 * partnera na tej stronie decyduje o finalnym redirekcie po własnych
 * parametrach (landing_url, referrer, title).
 */

const GO_URL = "/go/";

export function affiliateGoUrl(_casinoSlug: string, _fallbackUrl: string): string {
  return GO_URL;
}

export function pageOfferRegisterUrl(_fallbackHref: string): string {
  return GO_URL;
}

export function resolveAffiliateLikeHref(_casinoSlug: string, _href: string): string {
  return GO_URL;
}
