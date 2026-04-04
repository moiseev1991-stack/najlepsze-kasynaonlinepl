"use client";

import { useMemo, useState } from "react";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { CasinoRatingCard } from "@/components/casino/CasinoRatingCard";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { FiltersBar } from "@/components/ui/FiltersBar";
import { BonusCard } from "@/components/ui/BonusCard";
import { IntroTextBlock } from "@/components/ui/IntroTextBlock";
import { SEOContentSection } from "@/components/ui/SEOContentSection";
import { CategoryAffiliateListing } from "@/components/templates/CategoryAffiliateListing";
import { SpinsSectionOverview } from "@/components/ui/SpinsSectionOverview";
import type { Casino, CategoryPageContent, FAQItem } from "@/lib/types";

type Props = {
  content: CategoryPageContent;
  casinos: Casino[];
  breadcrumbs: Crumb[];
  faq?: FAQItem[];
};

const listingModes = new Set(["bonusList", "spinsList", "cashList"]);

export function CategoryPageTemplate({ content, casinos, breadcrumbs, faq }: Props) {
  const mode = content.layoutMode ?? "ranking";
  const isHub = mode === "hub";
  const isListing = listingModes.has(mode);
  const tags = content.filterTags ?? ["Wszystkie", "Nowe", "Top"];
  const [active, setActive] = useState(tags[0] ?? "Wszystkie");

  const filtered = useMemo(() => {
    if (active === "Nowe") return casinos.filter((c) => c.isNew);
    if (active === "Top" || active === "Wysokie oceny" || active === "Najwyższa ocena")
      return [...casinos].sort((a, b) => b.ratingOverall - a.ratingOverall);
    if (active === "Popularny" || active === "Popularne") {
      const p = casinos.filter((c) => c.isPopular);
      return p.length ? p : casinos;
    }
    if (active === "Szybkie wypłaty") return casinos.filter((c) => c.withdrawalTime.includes("24"));
    if (active === "Wszystkie kasyna") return [...casinos].sort((a, b) => b.ratingOverall - a.ratingOverall);
    return casinos;
  }, [active, casinos]);

  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-10">
      <Breadcrumbs items={breadcrumbs} />

      <header className="space-y-4">
        <h1 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          {content.h1}
        </h1>
        <IntroTextBlock>{content.intro}</IntroTextBlock>
        {content.introSecondary ? <IntroTextBlock>{content.introSecondary}</IntroTextBlock> : null}
      </header>

      {isListing ? (
        content.slug === "darmowe-spiny" ? (
          <div className="lg:grid lg:grid-cols-[1fr_minmax(260px,280px)] lg:items-start lg:gap-10">
            <div className="order-2 min-w-0 space-y-12 lg:order-1">
              <CategoryAffiliateListing content={content} casinos={casinos} />
            </div>
            <aside className="order-1 mb-8 lg:order-2 lg:mb-0 lg:sticky lg:top-28 lg:self-start">
              <SpinsSectionOverview currentPath="/darmowe-spiny/" />
            </aside>
          </div>
        ) : (
          <CategoryAffiliateListing content={content} casinos={casinos} />
        )
      ) : isHub && content.hubLinks?.length ? (
        <section aria-labelledby="hub-heading" className="space-y-4">
          <h2 id="hub-heading" className="text-xl font-semibold text-slate-900">
            Wybierz temat
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.hubLinks.map((l) => (
              <BonusCard key={l.href} href={l.href} title={l.label} teaser={l.teaser} />
            ))}
          </div>
        </section>
      ) : (
        <section aria-labelledby="ranking-heading" className="space-y-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <h2 id="ranking-heading" className="text-xl font-semibold text-slate-900">
              Ranking kasyn
            </h2>
            <FiltersBar tags={tags} active={active} onChange={setActive} />
          </div>
          <div className="flex flex-col gap-6">
            {filtered.map((c, i) => (
              <CasinoRatingCard key={c.id} casino={c} rank={i + 1} />
            ))}
          </div>
        </section>
      )}

      {content.comparisonIntro && !isListing ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
          <h2 className="text-xl font-bold text-slate-900">Porównanie</h2>
          <p className="mt-3 text-slate-600">{content.comparisonIntro}</p>
        </section>
      ) : null}

      <div className="space-y-10">
        {content.seoSections.map((s) => (
          <SEOContentSection key={s.heading} section={s} />
        ))}
      </div>

      <RelatedLinks links={content.relatedLinks} />

      {faq?.length ? <FAQAccordion items={faq} /> : null}
    </div>
  );
}
