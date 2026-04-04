import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { SEOContentSection } from "@/components/ui/SEOContentSection";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { ReviewEditorialBody } from "@/components/review/ReviewEditorialBody";
import { getReviewEditorial, stripLeadingMarkdownH1 } from "@/lib/review-editorial-data";
import { reviewListContent } from "@/lib/review-list-content";

/** Treści z byłej strony /online-kasyna/ — na stronie głównej pod rankingiem. */
export function HomeReviewsGuideSection() {
  const listEditorial = getReviewEditorial("online-kasyna");
  const heading = listEditorial?.metaTitle?.trim()
    ? listEditorial.metaTitle
    : "Recenzje kasyn online — przewodnik";

  return (
    <SectionBackground
      id="przewodnik-recenzji"
      variant="surface"
      aria-labelledby="home-reviews-guide-heading"
      className="scroll-mt-24 space-y-10"
    >
      <header className="space-y-4">
        <h2 id="home-reviews-guide-heading" className="text-2xl font-bold text-nk-text md:text-3xl">
          {heading}
        </h2>
        {listEditorial?.metaDescription ? (
          <p className="max-w-3xl text-lg text-nk-muted">{listEditorial.metaDescription}</p>
        ) : (
          <p className="max-w-3xl text-lg text-nk-muted">
            Redakcyjne opracowania marek: bonusy, płatności, gry i testy UX. Treści mają charakter opinii —
            zawsze zweryfikuj szczegóły u operatora.
          </p>
        )}
        <p className="max-w-3xl text-lg text-nk-muted">{reviewListContent.introSecondary}</p>
      </header>

      {listEditorial?.body ? (
        <div
          className="rounded-2xl border border-nk-border/90 bg-nk-surface p-6 md:p-8"
          aria-label="Przewodnik po recenzjach kasyn"
        >
          <ReviewEditorialBody markdown={stripLeadingMarkdownH1(listEditorial.body)} />
        </div>
      ) : null}

      <div className="space-y-10">
        {reviewListContent.seoSections.map((s) => (
          <SEOContentSection key={s.heading} section={s} />
        ))}
      </div>

      <RelatedLinks links={reviewListContent.relatedLinks} />

      <FAQAccordion title="Recenzje — najczęstsze pytania" items={reviewListContent.faq} />
    </SectionBackground>
  );
}
