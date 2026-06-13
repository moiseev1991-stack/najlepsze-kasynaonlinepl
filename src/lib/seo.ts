import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { getAppMetadataBase, getPublicSiteOrigin } from "@/lib/site-origin";

type BuildMetaInput = {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path = "",
  ogImage = "/og-default.png",
  noIndex = false,
}: BuildMetaInput): Metadata {
  const origin = getPublicSiteOrigin();
  const pathNorm = path.startsWith("/") ? path : `/${path}`;
  const url = `${origin}${pathNorm}`;
  const fullTitle = `${title} | ${siteConfig.name}`;

  return {
    metadataBase: getAppMetadataBase(),
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
      ...(siteConfig.twitterHandle ? { creator: siteConfig.twitterHandle } : {}),
    },
  };
}

export function breadcrumbListSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.organization.name,
    url: getPublicSiteOrigin(),
    logo: siteConfig.organization.logo,
  };
}

export function reviewSchema(input: {
  name: string;
  url: string;
  ratingValue: number;
  bestRating?: number;
  worstRating?: number;
  /** Number of opinions visible on the page (must match UI to avoid „misleading SD”) */
  ratingCount?: number;
}) {
  const itemReviewed: Record<string, unknown> = {
    "@type": "Organization",
    name: input.name,
    url: input.url,
  };
  if (typeof input.ratingCount === "number" && input.ratingCount > 0) {
    itemReviewed.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: input.ratingValue,
      bestRating: input.bestRating ?? 5,
      worstRating: input.worstRating ?? 1,
      ratingCount: input.ratingCount,
    };
  }
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed,
    reviewRating: {
      "@type": "Rating",
      ratingValue: input.ratingValue,
      bestRating: input.bestRating ?? 5,
      worstRating: input.worstRating ?? 1,
    },
    author: { "@type": "Organization", name: siteConfig.name },
  };
}

export function websiteSchema() {
  const origin = getPublicSiteOrigin();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: `${origin}/`,
    inLanguage: "pl-PL",
  };
}

export function itemListSchema(
  items: { name: string; url: string }[],
  listName?: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    ...(listName ? { name: listName } : {}),
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: it.url,
    })),
  };
}
