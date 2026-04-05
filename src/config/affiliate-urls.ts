/**
 * Wszystkie linki partnerskie na zewnątrz są tymczasowo wyłączone (#).
 * Przywróć logikę env (NEXT_PUBLIC_AFFILIATE_GO_BASE itd.), gdy będą docelowe URL.
 */
export function affiliateGoUrl(_casinoSlug: string, _fallbackUrl: string): string {
  return "#";
}

export function pageOfferRegisterUrl(_fallbackHref: string): string {
  return "#";
}

export function resolveAffiliateLikeHref(_casinoSlug: string, href: string): string {
  if (/^https?:\/\//i.test(href)) return "#";
  return href;
}
