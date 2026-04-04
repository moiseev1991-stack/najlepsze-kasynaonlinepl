import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { HomeRankingSection } from "@/components/home/HomeRankingSection";
import { AttentionPointsBlock } from "@/components/game-hub/AttentionPointsBlock";
import { EditorialContentSection } from "@/components/game-hub/EditorialContentSection";
import { FeatureCardsGrid } from "@/components/game-hub/FeatureCardsGrid";
import { LegalNoticeCard } from "@/components/game-hub/LegalNoticeCard";
import { PageHero } from "@/components/game-hub/PageHero";
import { QuickFactsChips } from "@/components/game-hub/QuickFactsChips";
import { RelatedPagesCards } from "@/components/game-hub/RelatedPagesCards";
import type { Casino, GamePageContent } from "@/lib/types";

const defaultRankingFilterTags = ["Wszystkie kasyna", "Nowe kasyna", "Popularny", "Najwyższa ocena"];

type Props = {
  content: GamePageContent;
  casinos: Casino[];
  breadcrumbs: Crumb[];
};

export function GamePageTemplate({ content, casinos, breadcrumbs }: Props) {
  const rankingHeading = content.rankingHeading ?? "Ranking kasyn";
  const rankingIntro =
    content.rankingIntro ??
    "Zestawienie operatorów z oceną redakcyjną — szczegóły bonusów i warunków znajdziesz w recenzjach.";
  const filterTags =
    content.rankingFilterTags?.length ? content.rankingFilterTags : defaultRankingFilterTags;

  return (
    <div className="w-full space-y-10 md:space-y-12">
      <Breadcrumbs items={breadcrumbs} />

      <PageHero
        eyebrow={content.heroEyebrow}
        h1={content.h1}
        intro={content.intro}
        heroIcon={content.heroIcon}
        heroAccent={content.heroAccent}
      />

      <section className="rounded-3xl border border-nk-border/60 bg-nk-bg-alt/50 px-4 py-5 md:px-6 md:py-6">
        <h2 className="sr-only">Szybkie fakty</h2>
        <QuickFactsChips items={content.quickFacts} />
      </section>

      <FeatureCardsGrid cards={content.featureCards} />

      <SectionBackground variant="tinted" aria-labelledby="ranking-gry" className="space-y-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <h2 id="ranking-gry" className="text-xl font-semibold text-nk-text">
            {rankingHeading}
          </h2>
          <p className="text-sm text-nk-muted">{rankingIntro}</p>
        </div>
        <HomeRankingSection casinos={casinos} filterTags={filterTags} />
      </SectionBackground>

      <EditorialContentSection sections={content.seoSections} />

      <RelatedPagesCards cards={content.relatedPageCards} />

      <AttentionPointsBlock points={content.attentionPoints} />

      {content.faq.length ? <FAQAccordion items={content.faq} title="Najczęściej zadawane pytania" /> : null}

      <LegalNoticeCard text={content.legalNotice} />
    </div>
  );
}
