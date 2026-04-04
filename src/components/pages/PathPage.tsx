import { notFound } from "next/navigation";
import {
  blogCategoryNameFromSlug,
  resolvePage,
} from "@/lib/routes";
import { buildBreadcrumbSchema, toAbsoluteUrl } from "@/lib/breadcrumbs";
import {
  getAuthorBySlug,
  getBlogBySlug,
  getBonusBySlug,
  getCasinoBySlug,
  getCategoryBySlug,
  getCasinosForCategory,
  getCasinosForGamePage,
  getGameBySlug,
  getMinDepositBySlug,
  getPaymentBySlug,
  getRelatedCasinos,
  getReviewExtras,
  getTrustBySlug,
} from "@/lib/data";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbListSchema, faqPageSchema, reviewSchema } from "@/lib/seo";
import { CategoryPageTemplate } from "@/components/templates/CategoryPageTemplate";
import { CasinoReviewTemplate } from "@/components/templates/CasinoReviewTemplate";
import { GamePageTemplate } from "@/components/templates/GamePageTemplate";
import { BonusPageTemplate } from "@/components/templates/BonusPageTemplate";
import { PaymentPageTemplate } from "@/components/templates/PaymentPageTemplate";
import { PaymentIndexTemplate } from "@/components/templates/PaymentIndexTemplate";
import {
  MinDepositChildTemplate,
  MinDepositParentTemplate,
} from "@/components/templates/MinDepositTemplates";
import { TrustPageTemplate } from "@/components/templates/TrustPageTemplate";
import { AboutPageTemplate } from "@/components/templates/AboutPageTemplate";
import { ContactPageTemplate } from "@/components/templates/ContactPageTemplate";
import {
  BlogCategoryTemplate,
  BlogListTemplate,
  BlogPostTemplate,
} from "@/components/templates/BlogTemplates";
import type { Crumb } from "@/components/ui/Breadcrumbs";
import { paymentIndexContent } from "@/lib/payment-index-content";
import { getReviewEditorial } from "@/lib/review-editorial-data";

type Props = { segments: string[] };

function crumbsLocal(items: { label: string; href?: string }[]): Crumb[] {
  return items.map((x) => ({ label: x.label, href: x.href }));
}

export function PathPage({ segments }: Props) {
  const page = resolvePage(segments);
  if (!page) notFound();

  switch (page.type) {
    case "category": {
      const content = getCategoryBySlug(page.slug);
      if (!content) notFound();
      const casinos =
        content.layoutMode === "hub" ? [] : getCasinosForCategory(page.slug);
      const bc = buildBreadcrumbSchema(segments, [content.title]);
      const defaultRankingFaq =
        page.slug === "najlepsze-kasyna-online"
          ? [
              {
                question: "Jak często aktualizujecie ranking?",
                answer: "Gdy pojawiają się istotne zmiany w ofercie lub regulaminie operatorów z naszej listy.",
              },
              {
                question: "Czy ranking jest obiektywny?",
                answer:
                  "Stosujemy jednolite kryteria, ale ocena pozostaje subiektywna — zawsze czytaj też regulamin kasyna.",
              },
            ]
          : undefined;
      const faq = content.categoryFaq?.length ? content.categoryFaq : defaultRankingFaq;

      return (
        <>
          <JsonLd data={breadcrumbListSchema(bc)} />
          {faq?.length ? <JsonLd data={faqPageSchema(faq)} /> : null}
          <CategoryPageTemplate
            content={content}
            casinos={casinos}
            breadcrumbs={crumbsLocal([
              { label: "Strona główna", href: "/" },
              { label: content.title },
            ])}
            faq={faq}
          />
        </>
      );
    }
    case "payment-index": {
      const bc = buildBreadcrumbSchema(segments, ["Płatności"]);
      return (
        <>
          <JsonLd data={breadcrumbListSchema(bc)} />
          <JsonLd data={faqPageSchema(paymentIndexContent.faq)} />
          <PaymentIndexTemplate />
        </>
      );
    }
    case "payment": {
      const p = getPaymentBySlug(page.slug);
      if (!p) notFound();
      const bc = buildBreadcrumbSchema(segments, ["Płatności", p.methodName]);
      const faqPayment = [
        {
          question: "Czy metoda jest dostępna dla wypłat?",
          answer:
            "Zależy od operatora i rynku — szczegóły znajdziesz w kasie kasyna i regulaminie płatności.",
        },
        { question: "Jakie są typowe opłaty?", answer: p.fees },
      ];
      return (
        <>
          <JsonLd data={breadcrumbListSchema(bc)} />
          <JsonLd data={faqPageSchema(faqPayment)} />
          <PaymentPageTemplate
            page={p}
            breadcrumbs={crumbsLocal([
              { label: "Strona główna", href: "/" },
              { label: "Płatności", href: "/platnosci/" },
              { label: p.methodName },
            ])}
          />
        </>
      );
    }
    case "bonus": {
      const b = getBonusBySlug(page.slug);
      if (!b) notFound();
      const bc = buildBreadcrumbSchema(segments, [b.title]);
      return (
        <>
          <JsonLd data={breadcrumbListSchema(bc)} />
          {b.faq.length ? <JsonLd data={faqPageSchema(b.faq)} /> : null}
          <BonusPageTemplate
            page={b}
            breadcrumbs={crumbsLocal([
              { label: "Strona główna", href: "/" },
              { label: b.title },
            ])}
          />
        </>
      );
    }
    case "game": {
      const g = getGameBySlug(page.slug);
      if (!g) notFound();
      const gameCasinos = getCasinosForGamePage(g.slug, g.recommendedCasinoSlugs);
      const bc = buildBreadcrumbSchema(segments, [g.title]);
      return (
        <>
          <JsonLd data={breadcrumbListSchema(bc)} />
          {g.faq.length ? <JsonLd data={faqPageSchema(g.faq)} /> : null}
          <GamePageTemplate
            content={g}
            casinos={gameCasinos}
            breadcrumbs={crumbsLocal([
              { label: "Strona główna", href: "/" },
              { label: "Gry hazardowe online" },
              { label: g.title },
            ])}
          />
        </>
      );
    }
    case "min-deposit-parent": {
      const bc = buildBreadcrumbSchema(segments, ["Kasyna z minimalnym depozytem"]);
      return (
        <>
          <JsonLd data={breadcrumbListSchema(bc)} />
          <MinDepositParentTemplate />
        </>
      );
    }
    case "min-deposit": {
      const m = getMinDepositBySlug(page.slug);
      if (!m) notFound();
      const bc = buildBreadcrumbSchema(segments, ["Kasyna z minimalnym depozytem", m.title]);
      return (
        <>
          <JsonLd data={breadcrumbListSchema(bc)} />
          {m.faq.length ? <JsonLd data={faqPageSchema(m.faq)} /> : null}
          <MinDepositChildTemplate
            page={m}
            breadcrumbs={crumbsLocal([
              { label: "Strona główna", href: "/" },
              { label: "Minimalny depozyt", href: "/kasyna-z-minimalnym-depozytem/" },
              { label: m.amountLabel },
            ])}
          />
        </>
      );
    }
    case "review": {
      const casino = getCasinoBySlug(page.slug);
      if (!casino) notFound();
      const extras = getReviewExtras(casino.slug);
      const editorial = getReviewEditorial(casino.slug);
      const author = getAuthorBySlug("marta-kowalczyk");
      const related = getRelatedCasinos(casino.slug);
      const bc = [
        { name: "Strona główna", url: toAbsoluteUrl("/") },
        { name: casino.name, url: toAbsoluteUrl(`/${casino.slug}/`) },
      ];
      const reviewLd = reviewSchema({
        name: casino.name,
        url: toAbsoluteUrl(`/${casino.slug}/`),
        ratingValue: casino.ratingOverall,
        bestRating: 5,
        worstRating: 1,
      });
      return (
        <>
          <JsonLd data={breadcrumbListSchema(bc)} />
          <JsonLd data={reviewLd} />
          <CasinoReviewTemplate
            casino={casino}
            extras={extras}
            editorial={editorial}
            author={author}
            related={related}
            breadcrumbs={crumbsLocal([
              { label: "Strona główna", href: "/" },
              { label: casino.name },
            ])}
          />
        </>
      );
    }
    case "blog-list": {
      const bc = buildBreadcrumbSchema(segments, ["Blog"]);
      return (
        <>
          <JsonLd data={breadcrumbListSchema(bc)} />
          <BlogListTemplate />
        </>
      );
    }
    case "blog-post": {
      const post = getBlogBySlug(page.slug);
      if (!post) notFound();
      const bc = buildBreadcrumbSchema(segments, ["Blog", post.title]);
      return (
        <>
          <JsonLd data={breadcrumbListSchema(bc)} />
          <BlogPostTemplate
            post={post}
            breadcrumbs={crumbsLocal([
              { label: "Strona główna", href: "/" },
              { label: "Blog", href: "/blog/" },
              { label: post.title },
            ])}
          />
        </>
      );
    }
    case "blog-category": {
      const name = blogCategoryNameFromSlug(page.categorySlug);
      const bc = buildBreadcrumbSchema(segments, ["Blog", "Kategoria", name ?? page.categorySlug]);
      return (
        <>
          <JsonLd data={breadcrumbListSchema(bc)} />
          <BlogCategoryTemplate
            categorySlug={page.categorySlug}
            breadcrumbs={crumbsLocal([
              { label: "Strona główna", href: "/" },
              { label: "Blog", href: "/blog/" },
              { label: name ?? page.categorySlug },
            ])}
          />
        </>
      );
    }
    case "trust": {
      const t = getTrustBySlug(page.slug);
      if (!t) notFound();
      const bc = buildBreadcrumbSchema(segments, [t.title]);
      const crumbs = crumbsLocal([{ label: "Strona główna", href: "/" }, { label: t.title }]);
      if (page.slug === "o-nas") {
        return (
          <>
            <JsonLd data={breadcrumbListSchema(bc)} />
            <AboutPageTemplate page={t} breadcrumbs={crumbs} />
          </>
        );
      }
      if (page.slug === "kontakt") {
        return (
          <>
            <JsonLd data={breadcrumbListSchema(bc)} />
            <ContactPageTemplate page={t} breadcrumbs={crumbs} />
          </>
        );
      }
      return (
        <>
          <JsonLd data={breadcrumbListSchema(bc)} />
          <TrustPageTemplate page={t} breadcrumbs={crumbs} />
        </>
      );
    }
    default:
      notFound();
  }
}
