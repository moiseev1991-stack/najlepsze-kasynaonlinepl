import {
  blogPosts,
  bonuses,
  casinos,
  categories,
  games,
  getAllBlogCategories,
  minDeposits,
  payments,
  trustPages,
} from "@/lib/data";
import type { PageKind } from "@/lib/types";

const categorySlugSet = new Set(categories.map((c) => c.slug));
const bonusSlugSet = new Set(bonuses.map((b) => b.slug));
const gameSlugSet = new Set(games.map((g) => g.slug));
const trustSlugSet = new Set(trustPages.map((t) => t.slug));
const paymentSlugSet = new Set(payments.map((p) => p.slug));
const minDepSlugSet = new Set(minDeposits.map((m) => m.slug));
const blogSlugSet = new Set(blogPosts.map((p) => p.slug));
const casinoSlugSet = new Set(casinos.map((c) => c.slug));

function slugifyCategory(name: string): string {
  return name
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export function categorySlugFromName(name: string): string {
  return slugifyCategory(name);
}

export function blogCategoryNameFromSlug(slug: string): string | undefined {
  return getAllBlogCategories().find((c) => categorySlugFromName(c) === slug);
}

export function resolvePage(segments: string[]): PageKind | null {
  const [a, b, c] = segments;

  if (segments.length === 1 && a) {
    if (a === "platnosci") return { type: "payment-index" };
    if (a === "kasyna-z-minimalnym-depozytem") return { type: "min-deposit-parent" };
    if (a === "blog") return { type: "blog-list" };
    if (categorySlugSet.has(a)) return { type: "category", slug: a };
    if (bonusSlugSet.has(a)) return { type: "bonus", slug: a };
    if (gameSlugSet.has(a)) return { type: "game", slug: a };
    if (trustSlugSet.has(a)) return { type: "trust", slug: a };
    if (casinoSlugSet.has(a)) return { type: "review", slug: a };
    return null;
  }

  if (segments.length === 2 && a && b) {
    if (a === "platnosci" && paymentSlugSet.has(b)) return { type: "payment", slug: b };
    if (a === "kasyna-z-minimalnym-depozytem" && minDepSlugSet.has(b))
      return { type: "min-deposit", slug: b };
    if (a === "blog" && blogSlugSet.has(b)) return { type: "blog-post", slug: b };
  }

  if (segments.length === 3 && a === "blog" && b === "kategoria" && c) {
    const valid = getAllBlogCategories().map(categorySlugFromName);
    if (valid.includes(c)) return { type: "blog-category", categorySlug: c };
  }

  return null;
}

export function getAllSegmentPaths(): string[][] {
  const out: string[][] = [];

  categories.forEach((cat) => out.push([cat.slug]));
  bonuses.forEach((b) => out.push([b.slug]));
  games.forEach((g) => out.push([g.slug]));
  trustPages.forEach((t) => out.push([t.slug]));

  casinos.forEach((c) => out.push([c.slug]));

  out.push(["platnosci"]);
  payments.forEach((p) => out.push(["platnosci", p.slug]));

  out.push(["kasyna-z-minimalnym-depozytem"]);
  minDeposits.forEach((m) => out.push(["kasyna-z-minimalnym-depozytem", m.slug]));

  out.push(["blog"]);
  blogPosts.forEach((p) => out.push(["blog", p.slug]));
  getAllBlogCategories().forEach((cat) =>
    out.push(["blog", "kategoria", categorySlugFromName(cat)]),
  );

  const seen = new Set<string>();
  return out.filter((segments) => {
    const key = segments.join("/");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
