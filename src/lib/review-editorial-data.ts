import fs from "fs";
import path from "path";

export type ReviewEditorialEntry = {
  metaTitle: string;
  metaDescription: string;
  body: string;
};

let cached: Record<string, ReviewEditorialEntry> | null = null;

function loadAll(): Record<string, ReviewEditorialEntry> {
  if (cached !== null) return cached;
  const file = path.join(process.cwd(), "src/content/review-editorial.json");
  try {
    const raw = fs.readFileSync(file, "utf8");
    cached = JSON.parse(raw) as Record<string, ReviewEditorialEntry>;
  } catch {
    cached = {};
  }
  return cached;
}

export function getReviewEditorial(slug: string): ReviewEditorialEntry | undefined {
  const e = loadAll()[slug];
  if (!e) return undefined;
  if (!e.metaTitle && !e.metaDescription && !e.body) return undefined;
  return e;
}

/** Usuwa pierwszy nagłówek H1 z treści — na stronie recenzji H1 jest już w hero. */
export function stripLeadingMarkdownH1(markdown: string): string {
  return markdown.replace(/^#\s[^\n]+\n+/, "").trim();
}
