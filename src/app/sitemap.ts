import fs from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";
import { segmentsToUrl } from "@/lib/paths";
import { siteConfig } from "@/lib/site-config";
import { getAllSegmentPaths, resolvePage } from "@/lib/routes";

export const dynamic = "force-static";

const baseUrl = siteConfig.url.replace(/\/$/, "");

const REPO_ROOT = path.resolve(process.cwd());
const CONTENT_DIR = path.join(REPO_ROOT, "src", "content");

function safeMtime(p: string): Date | null {
  try {
    const stat = fs.statSync(p);
    return stat.mtime;
  } catch {
    return null;
  }
}

const CONTENT_FILES = {
  casinos: path.join(CONTENT_DIR, "casinos.json"),
  categories: path.join(CONTENT_DIR, "categories.json"),
  games: path.join(CONTENT_DIR, "games.json"),
  bonuses: path.join(CONTENT_DIR, "bonuses.json"),
  payments: path.join(CONTENT_DIR, "payments.json"),
  minDeposits: path.join(CONTENT_DIR, "min-deposit.json"),
  blog: path.join(CONTENT_DIR, "blog.json"),
  trust: path.join(CONTENT_DIR, "trust.json"),
  reviewEditorial: path.join(CONTENT_DIR, "review-editorial.json"),
  reviewExtras: path.join(CONTENT_DIR, "review-extras.json"),
  articles: path.join(CONTENT_DIR, "articles.json"),
} as const;

const fileMtimeCache: Partial<Record<keyof typeof CONTENT_FILES, Date | null>> = {};

function mtimeOf(key: keyof typeof CONTENT_FILES): Date | null {
  if (key in fileMtimeCache) return fileMtimeCache[key] ?? null;
  const m = safeMtime(CONTENT_FILES[key]);
  fileMtimeCache[key] = m;
  return m;
}

const FALLBACK_LASTMOD =
  mtimeOf("casinos") ?? mtimeOf("categories") ?? new Date();

function lastmodForSegments(segments: string[]): Date {
  if (segments.length === 0) {
    return (
      mtimeOf("categories") ??
      mtimeOf("casinos") ??
      FALLBACK_LASTMOD
    );
  }
  const page = resolvePage(segments);
  if (!page) return FALLBACK_LASTMOD;
  switch (page.type) {
    case "category":
      return mtimeOf("categories") ?? FALLBACK_LASTMOD;
    case "review":
      return (
        mtimeOf("reviewEditorial") ??
        mtimeOf("reviewExtras") ??
        mtimeOf("casinos") ??
        FALLBACK_LASTMOD
      );
    case "bonus":
      return mtimeOf("bonuses") ?? FALLBACK_LASTMOD;
    case "game":
      return mtimeOf("games") ?? FALLBACK_LASTMOD;
    case "payment":
    case "payment-index":
      return mtimeOf("payments") ?? FALLBACK_LASTMOD;
    case "min-deposit":
    case "min-deposit-parent":
      return mtimeOf("minDeposits") ?? FALLBACK_LASTMOD;
    case "blog-post":
    case "blog-list":
    case "blog-category":
      return mtimeOf("blog") ?? FALLBACK_LASTMOD;
    case "trust":
      return mtimeOf("trust") ?? FALLBACK_LASTMOD;
    case "article":
      return mtimeOf("articles") ?? FALLBACK_LASTMOD;
    default:
      return FALLBACK_LASTMOD;
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = getAllSegmentPaths();

  return [
    {
      url: `${baseUrl}/`,
      lastModified: lastmodForSegments([]),
    },
    ...paths.map((segments) => ({
      url: `${baseUrl}${segmentsToUrl(segments)}`,
      lastModified: lastmodForSegments(segments),
    })),
  ];
}
