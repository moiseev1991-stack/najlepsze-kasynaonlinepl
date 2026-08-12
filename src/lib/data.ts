import type {
  Article,
  Author,
  BlogPost,
  BonusPage,
  Casino,
  CategoryPageContent,
  GamePageContent,
  MinDepositPage,
  PaymentMethodPage,
  TrustPageContent,
} from "@/lib/types";
import { affiliateGoUrl, resolveAffiliateLikeHref } from "@/config/affiliate-urls";
import casinosData from "@/content/casinos.json";
import authorsData from "@/content/authors.json";
import blogData from "@/content/blog.json";
import paymentsData from "@/content/payments.json";
import bonusesData from "@/content/bonuses.json";
import gamesData from "@/content/games.json";
import minDepositData from "@/content/min-deposit.json";
import categoriesData from "@/content/categories.json";
import trustData from "@/content/trust.json";
import articlesData from "@/content/articles.json";
import reviewExtras from "@/content/review-extras.json";
import textBlocksData from "@/content/text-blocks.json";
import casinoScreenshotsData from "@/content/casino-screenshots.json";
import casinoGalleriesData from "@/content/casino-galleries.json";
import calculatorsData from "@/content/calculators.json";
import type { CalculatorPage } from "@/lib/types";

function withResolvedAffiliateUrls(c: Casino): Casino {
  const affiliateUrl = affiliateGoUrl(c.slug, c.affiliateUrl);
  const problemsReportOptions = c.problemsReportOptions?.map((o) => ({
    ...o,
    href: resolveAffiliateLikeHref(c.slug, o.href),
  }));
  return { ...c, affiliateUrl, problemsReportOptions };
}

export const casinos = (casinosData as Casino[]).map(withResolvedAffiliateUrls);
export const authors = authorsData as Author[];
export const blogPosts = blogData as BlogPost[];
export const payments = paymentsData as PaymentMethodPage[];
export const bonuses = bonusesData as BonusPage[];
export const games = gamesData as GamePageContent[];
export const minDeposits = minDepositData as MinDepositPage[];
export const categories = categoriesData as CategoryPageContent[];
export const trustPages = trustData as TrustPageContent[];

const textBlocks = textBlocksData as Record<
  string,
  { metaTitle: string; metaDescription: string; body: string; sourceDate?: string | null }
>;

/** Slugi zajęte przez inne kolekcje — text-block nie generuje wtedy osobnej strony-artykułu. */
function occupiedSlugsForArticles(): Set<string> {
  const occupied = new Set<string>();
  categories.forEach((c) => occupied.add(c.slug));
  bonuses.forEach((b) => occupied.add(b.slug));
  games.forEach((g) => occupied.add(g.slug));
  trustPages.forEach((t) => occupied.add(t.slug));
  casinos.forEach((c) => occupied.add(c.slug));
  blogPosts.forEach((p) => occupied.add(p.slug));
  // payments/minDeposits też blokują utworzenie /<slug>/ jako pseudo-artykułu —
  // treść text-block renderuje się bezpośrednio pod /platnosci/<slug>/ lub /minimalny-depozyt/<slug>/,
  // dzięki czemu unikamy duplikatu URL o tym samym contentcie
  payments.forEach((p) => occupied.add(p.slug));
  minDeposits.forEach((m) => occupied.add(m.slug));
  return occupied;
}

function firstMarkdownH1(md: string): string | null {
  const m = md.match(/^#\s+([^\n]+)/);
  return m ? m[1].trim() : null;
}

function stripLeadingH1(md: string): string {
  return md.replace(/^#\s[^\n]+\n+/, "").trim();
}

/** Pseudo-artykuły zbudowane z text-blocks dla slugów, które nie mają jeszcze własnej strony. */
const pseudoArticles: Article[] = (() => {
  const occupied = occupiedSlugsForArticles();
  const explicitSlugs = new Set((articlesData as Article[]).map((a) => a.slug));
  const today = new Date().toISOString().slice(0, 10);
  const out: Article[] = [];
  for (const [slug, block] of Object.entries(textBlocks)) {
    if (occupied.has(slug) || explicitSlugs.has(slug)) continue;
    if (!block.body) continue;
    const h1 = firstMarkdownH1(block.body) ?? block.metaTitle ?? slug;
    out.push({
      slug,
      title: h1,
      h1,
      metaTitle: block.metaTitle || undefined,
      metaDescription: block.metaDescription || h1,
      body: stripLeadingH1(block.body),
      publishedAt: block.sourceDate || today,
      updatedAt: today,
    });
  }
  return out;
})();

export const articles: Article[] = [...(articlesData as Article[]), ...pseudoArticles];

export const calculators = calculatorsData as CalculatorPage[];

export function getCalculatorBySlug(slug: string): CalculatorPage | undefined {
  return calculators.find((c) => c.slug === slug);
}

export type ReviewExtras = {
  ratingCriteria: { name: string; score: number; comment: string }[];
  mobileText: string;
  gamesText: string;
  bonusesText: string;
  paymentsText: string;
  trustNote: string;
  /** Rozbudowany blok „Czy X jest bezpieczne / legit — opinie graczy” pod kątem intentu recenzji brandowej */
  safetyBlock?: { heading: string; body: string }[];
};

export function getCasinoBySlug(slug: string): Casino | undefined {
  return casinos.find((c) => c.slug === slug);
}

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug);
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getPaymentBySlug(slug: string): PaymentMethodPage | undefined {
  return payments.find((p) => p.slug === slug);
}

export function getBonusBySlug(slug: string): BonusPage | undefined {
  return bonuses.find((b) => b.slug === slug);
}

export function getGameBySlug(slug: string): GamePageContent | undefined {
  return games.find((g) => g.slug === slug);
}

export function getMinDepositBySlug(slug: string): MinDepositPage | undefined {
  return minDeposits.find((m) => m.slug === slug);
}

export function getCategoryBySlug(slug: string): CategoryPageContent | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getTrustBySlug(slug: string): TrustPageContent | undefined {
  return trustPages.find((t) => t.slug === slug);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getReviewExtras(slug: string): ReviewExtras | undefined {
  const map = reviewExtras as Record<string, ReviewExtras>;
  return map[slug];
}

export function getCasinosForGamePage(slug: string, recommendedSlugs?: string[]): Casino[] {
  const byRating = () => [...casinos].sort((a, b) => b.ratingOverall - a.ratingOverall);
  if (recommendedSlugs?.length) {
    const map = new Map(casinos.map((c) => [c.slug, c]));
    const ordered = recommendedSlugs.map((s) => map.get(s)).filter((c): c is Casino => Boolean(c));
    return ordered.length ? ordered : byRating();
  }
  if (slug === "gry-na-prawdziwe-pieniadze") {
    return [...casinos].sort(
      (a, b) => b.trustIndex - a.trustIndex || b.ratingOverall - a.ratingOverall,
    );
  }
  return [...casinos].sort(
    (a, b) => b.gameCount - a.gameCount || b.ratingOverall - a.ratingOverall,
  );
}

export function getCasinosForCategory(slug: string): Casino[] {
  const byRating = () => [...casinos].sort((a, b) => b.ratingOverall - a.ratingOverall);
  switch (slug) {
    case "nowe-kasyna-online":
      return [...casinos].sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
    case "wyplacalne-kasyna-online":
    case "wyplacalne-kasyna-internetowe":
      return [...casinos].sort((a, b) => a.ratingOverall - b.ratingOverall).reverse();
    case "bonus-bez-depozytu":
    case "bonusy-powitalne":
    case "darmowe-spiny":
    case "darmowa-kasa-bez-depozytu":
      return byRating();
    case "minimalny-depozyt":
    default:
      return byRating();
  }
}

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((p) => p.category === category);
}

export function getAllBlogCategories(): string[] {
  return [...new Set(blogPosts.map((p) => p.category))];
}

export function getRelatedCasinos(excludeSlug: string, limit = 3): Casino[] {
  return casinos.filter((c) => c.slug !== excludeSlug).slice(0, limit);
}

/**
 * Zwraca artykuły powiązane z brandem po prefixie slug — np. dla „bruce-bet”
 * matchuje „bruce-bet-czy-jest-bezpieczny”, „bruce-bet-bonus”. Wyklucza sam slug bramdu.
 */
export function getArticlesForCasino(casinoSlug: string): Article[] {
  const prefix = `${casinoSlug}-`;
  return articles.filter((a) => a.slug !== casinoSlug && a.slug.startsWith(prefix));
}

/**
 * Odwrotny lookup: dla slug artykułu znajduje kasyno, którego slug jest prefiksem
 * (np. „nv-casino-czy-jest-bezpieczne" → casino „nv-casino"). Przydatne do
 * dobrania logo brandu jako hero-visual na stronie artykułu.
 */
export function findCasinoForArticleSlug(articleSlug: string): Casino | undefined {
  // sortujemy po długości slug'u malejąco, żeby „nv-casino" wygrał nad „nv"
  const sorted = [...casinos].sort((a, b) => b.slug.length - a.slug.length);
  return sorted.find(
    (c) => articleSlug === c.slug || articleSlug.startsWith(`${c.slug}-`),
  );
}

/**
 * Zwraca ścieżkę do screenshotu og:image operatora (jeśli został ściągnięty przez
 * scripts/fetch-casino-screenshots.mjs). Manifest generowany jest ręcznie i
 * commitowany razem z obrazkami.
 */
const casinoScreenshots = casinoScreenshotsData as Record<string, string>;
export function getCasinoScreenshot(slug: string): string | undefined {
  return casinoScreenshots[slug];
}

export type CasinoGalleryShot = { src: string; label: string };
const casinoGalleries = casinoGalleriesData as Record<string, CasinoGalleryShot[]>;
export function getCasinoGallery(slug: string): CasinoGalleryShot[] {
  return casinoGalleries[slug] ?? [];
}
