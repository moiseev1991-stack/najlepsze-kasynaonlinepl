import type { Metadata } from "next";
import { resolvePage, blogCategoryNameFromSlug } from "@/lib/routes";
import { segmentsToUrl } from "@/lib/paths";
import { buildMetadata } from "@/lib/seo";
import {
  getBlogBySlug,
  getBonusBySlug,
  getCasinoBySlug,
  getCategoryBySlug,
  getGameBySlug,
  getMinDepositBySlug,
  getPaymentBySlug,
  getTrustBySlug,
} from "@/lib/data";
import { getReviewEditorial } from "@/lib/review-editorial-data";

export function metadataForSegments(segments: string[]): Metadata | null {
  const page = resolvePage(segments);
  if (!page) return null;
  const path = segmentsToUrl(segments);

  switch (page.type) {
    case "category": {
      const c = getCategoryBySlug(page.slug);
      if (!c) return null;
      return buildMetadata({ title: c.title, description: c.metaDescription, path });
    }
    case "payment-index":
      return buildMetadata({
        title: "Metody płatności w kasynach online",
        description: "BLIK, portfele elektroniczne, karty i przelewy — porównanie kanałów depozytów i wypłat.",
        path,
      });
    case "payment": {
      const p = getPaymentBySlug(page.slug);
      if (!p) return null;
      return buildMetadata({
        title: `${p.methodName} w kasynach online`,
        description: p.intro.slice(0, 155),
        path,
      });
    }
    case "bonus": {
      const b = getBonusBySlug(page.slug);
      if (!b) return null;
      return buildMetadata({ title: b.title, description: b.intro.slice(0, 155), path });
    }
    case "game": {
      const g = getGameBySlug(page.slug);
      if (!g) return null;
      return buildMetadata({ title: g.title, description: g.metaDescription, path });
    }
    case "min-deposit-parent":
      return buildMetadata({
        title: "Kasyna z minimalnym depozytem",
        description: "Niskie progi wpłat — charakterystyka i podstrony dla progów 5, 10 i 20 zł.",
        path,
      });
    case "min-deposit": {
      const m = getMinDepositBySlug(page.slug);
      if (!m) return null;
      return buildMetadata({ title: m.title, description: m.metaDescription, path });
    }
    case "review": {
      const c = getCasinoBySlug(page.slug);
      if (!c) return null;
      const ed = getReviewEditorial(page.slug);
      const desc =
        ed?.metaDescription?.trim() ??
        `Ocena ${c.ratingOverall.toFixed(1)}/5, bonus: ${c.welcomeBonus.slice(0, 80)}…`;
      return buildMetadata({
        title: ed?.metaTitle?.trim() ? ed.metaTitle : `Recenzja: ${c.name}`,
        description: desc.slice(0, 160),
        path,
      });
    }
    case "blog-list":
      return buildMetadata({
        title: "Blog",
        description: "Poradniki o bonusach, płatnościach i odpowiedzialnej grze.",
        path,
      });
    case "blog-post": {
      const p = getBlogBySlug(page.slug);
      if (!p) return null;
      return buildMetadata({ title: p.title, description: p.excerpt, path });
    }
    case "blog-category": {
      const name = blogCategoryNameFromSlug(page.categorySlug);
      return buildMetadata({
        title: name ? `Kategoria: ${name}` : "Kategoria bloga",
        description: `Artykuły w kategorii ${name ?? page.categorySlug}.`,
        path,
      });
    }
    case "trust": {
      const t = getTrustBySlug(page.slug);
      if (!t) return null;
      return buildMetadata({ title: t.title, description: t.metaDescription, path });
    }
    default:
      return null;
  }
}
