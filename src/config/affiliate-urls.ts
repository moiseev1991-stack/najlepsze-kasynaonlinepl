/**
 * Partner links: set NEXT_PUBLIC_AFFILIATE_GO_BASE (no trailing slash) and
 * NEXT_PUBLIC_PAGE_OFFER_REGISTER on the host to override JSON placeholders.
 */
const EXAMPLE_GO_PREFIX = "https://example.com/go/";

export function affiliateGoUrl(casinoSlug: string, fallbackUrl: string): string {
  const base = process.env.NEXT_PUBLIC_AFFILIATE_GO_BASE?.trim();
  if (!base) return fallbackUrl;
  return `${base.replace(/\/$/, "")}/${casinoSlug}`;
}

export function pageOfferRegisterUrl(fallbackHref: string): string {
  const fromEnv = process.env.NEXT_PUBLIC_PAGE_OFFER_REGISTER?.trim();
  return fromEnv || fallbackHref;
}

export function resolveAffiliateLikeHref(casinoSlug: string, href: string): string {
  if (!href.startsWith(EXAMPLE_GO_PREFIX)) return href;
  return affiliateGoUrl(casinoSlug, href);
}
