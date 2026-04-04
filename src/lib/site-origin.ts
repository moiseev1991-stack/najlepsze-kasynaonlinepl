import { siteConfig } from "@/lib/site-config";

function stripTrailingSlash(s: string): string {
  return s.replace(/\/+$/, "");
}

/**
 * Kanoniczny origin strony: produkcja = siteConfig.url; w dev — localhost (port z PORT lub 3055).
 * Gdy otwierasz projekt pod 127.0.0.1, ustaw w `.env.local`: NEXT_PUBLIC_DEV_ORIGIN=http://127.0.0.1:3055
 * (inaczej część metadanych wskazuje inny host niż dokument — problemy w podglądzie IDE / niektórych przeglądarkach).
 */
export function getPublicSiteOrigin(): string {
  if (process.env.NODE_ENV !== "development") {
    return stripTrailingSlash(siteConfig.url);
  }
  const fromEnv = process.env.NEXT_PUBLIC_DEV_ORIGIN?.trim();
  if (fromEnv) {
    try {
      return stripTrailingSlash(new URL(fromEnv).origin);
    } catch {
      /* ignore */
    }
  }
  const port = process.env.PORT ?? "3055";
  return `http://localhost:${port}`;
}

export function getAppMetadataBase(): URL {
  return new URL(`${getPublicSiteOrigin()}/`);
}

export function toAbsoluteSiteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${getPublicSiteOrigin()}${p}`;
}
