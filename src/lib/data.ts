import type {
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
import casinosData from "@/content/casinos.json";
import authorsData from "@/content/authors.json";
import blogData from "@/content/blog.json";
import paymentsData from "@/content/payments.json";
import bonusesData from "@/content/bonuses.json";
import gamesData from "@/content/games.json";
import minDepositData from "@/content/min-deposit.json";
import categoriesData from "@/content/categories.json";
import trustData from "@/content/trust.json";
import reviewExtras from "@/content/review-extras.json";

export const casinos = casinosData as Casino[];
export const authors = authorsData as Author[];
export const blogPosts = blogData as BlogPost[];
export const payments = paymentsData as PaymentMethodPage[];
export const bonuses = bonusesData as BonusPage[];
export const games = gamesData as GamePageContent[];
export const minDeposits = minDepositData as MinDepositPage[];
export const categories = categoriesData as CategoryPageContent[];
export const trustPages = trustData as TrustPageContent[];

export type ReviewExtras = {
  ratingCriteria: { name: string; score: number; comment: string }[];
  mobileText: string;
  gamesText: string;
  bonusesText: string;
  paymentsText: string;
  trustNote: string;
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
    case "najlepsze-kasyna-online":
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
