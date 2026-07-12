import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { DetailsTable } from "@/components/casino/DetailsTable";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { CasinoCard } from "@/components/casino/CasinoCard";
import { ProsCons } from "@/components/ui/ProsCons";
import { RatingBreakdown } from "@/components/ui/RatingBreakdown";
import { ReviewHero } from "@/components/review/ReviewHero";
import { AuthorCard } from "@/components/ui/AuthorCard";
import type { Article, Author, Casino } from "@/lib/types";
import type { ReviewExtras } from "@/lib/data";
import type { ReviewEditorialEntry } from "@/lib/review-editorial-data";
import { stripLeadingMarkdownH1 } from "@/lib/review-editorial-data";
import { ReviewEditorialBody } from "@/components/review/ReviewEditorialBody";
import { getTextBlock, stripLeadingH1 } from "@/lib/text-blocks-data";
import { getCasinoScreenshot } from "@/lib/data";

type Props = {
  casino: Casino;
  extras?: ReviewExtras;
  editorial?: ReviewEditorialEntry;
  author?: Author;
  breadcrumbs: Crumb[];
  related: Casino[];
  relatedArticles?: Article[];
};

export function CasinoReviewTemplate({
  casino,
  extras,
  editorial,
  author,
  breadcrumbs,
  related,
  relatedArticles,
}: Props) {
  const screenshot = getCasinoScreenshot(casino.slug);
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10">
      <Breadcrumbs items={breadcrumbs} />

      <ReviewHero casino={casino} author={author} />

      {author ? (
        <section aria-label="Autor recenzji">
          <AuthorCard author={author} />
        </section>
      ) : null}

      {screenshot ? (
        <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="relative aspect-[16/9] w-full bg-slate-100">
            <Image
              src={screenshot}
              alt={`Podgląd serwisu ${casino.name}`}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 100vw, 100vw"
              unoptimized
            />
          </div>
          <figcaption className="border-t border-slate-100 bg-slate-50/60 px-5 py-3 text-xs text-slate-500">
            Podgląd oficjalnej strony {casino.name} — źródło: og:image operatora
          </figcaption>
        </figure>
      ) : null}

      <div className="space-y-10">
        <section>
          <h2 className="text-xl font-bold text-slate-900">Szczegóły operatora</h2>
          <div className="mt-4">
            <DetailsTable casino={casino} />
          </div>
        </section>

        <ProsCons pros={casino.pros} cons={casino.cons} />

        {extras?.ratingCriteria?.length ? (
          <RatingBreakdown criteria={extras.ratingCriteria} />
        ) : null}

        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-bold text-slate-900">Ocena szczegółowa — obszary</h2>
          <div className="mt-4 space-y-4 text-sm text-slate-700">
            <p>
              <strong className="text-slate-900">Płatności:</strong>{" "}
              {extras?.paymentsText ??
                `Metody: ${casino.paymentMethods.join(", ")}. Czasy wypłat deklarowane: ${casino.withdrawalTime}.`}
            </p>
            <p>
              <strong className="text-slate-900">Gry:</strong>{" "}
              {extras?.gamesText ?? `Szacowana biblioteka: ok. ${casino.gameCount} tytułów (zależnie od rynku).`}
            </p>
            <p>
              <strong className="text-slate-900">Bonusy:</strong>{" "}
              {extras?.bonusesText ??
                "Regulamin promocji określa obrót, limity stawek i wykluczone gry — czytaj go przed aktywacją."}
            </p>
            <p>
              <strong className="text-slate-900">Mobilność:</strong>{" "}
              {extras?.mobileText ??
                "Sprawdź responsywność lobby i dostępność płatności na swoim telefonie przed większą wpłatą."}
            </p>
          </div>
        </section>
      </div>

      {editorial?.body ? (
        <section
          className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8"
          aria-label="Rozbudowana treść recenzji"
        >
          <ReviewEditorialBody markdown={stripLeadingMarkdownH1(editorial.body)} />
        </section>
      ) : null}

      {extras?.safetyBlock?.length ? (
        <section
          className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8"
          aria-label="Bezpieczeństwo i opinie graczy"
        >
          <h2 className="text-xl font-bold text-slate-900">
            {casino.name} — bezpieczeństwo i opinie graczy
          </h2>
          <div className="mt-4 space-y-6">
            {extras.safetyBlock.map((s) => (
              <div key={s.heading}>
                <h3 className="text-base font-semibold text-slate-900">{s.heading}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{s.body}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {(() => {
        const tb = getTextBlock(casino.slug);
        // pokazujemy text-block tylko, gdy nie ma review-editorial (żeby uniknąć duplikacji)
        return tb?.body && !editorial?.body ? (
          <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
            <ReviewEditorialBody markdown={stripLeadingH1(tb.body)} />
          </section>
        ) : null;
      })()}

      <section className="rounded-2xl border border-amber-200/80 bg-amber-50/50 p-5 text-sm leading-relaxed text-slate-800 md:p-6">
        <h2 className="text-base font-bold text-slate-900">Ujawnienie i zaufanie</h2>
        <p className="mt-2">
          {extras?.trustNote ??
            "Materiał ma charakter opinii redakcyjnej. Linki mogą być afiliacyjne. Numer licencji i zasady KYC zawsze weryfikuj u operatora i u właściwego regulatora — nasza recenzja nie zastępuje dokumentów prawnych kasyna."}
        </p>
      </section>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-brand-50/80 to-white p-6 md:p-8">
        <h2 className="text-lg font-bold text-brand-950">Promocja — bonus powitalny</h2>
        <p className="mt-2 text-xl font-semibold text-slate-900">{casino.welcomeBonus}</p>
        <dl className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
          <div>
            <dt className="font-medium text-slate-500">Warunek obrotu</dt>
            <dd className="font-semibold text-slate-900">{casino.wager}</dd>
          </div>
          <div>
            <dt className="font-medium text-slate-500">Limit czasu / warunki</dt>
            <dd className="font-semibold text-slate-900">{casino.timeLimit ?? "Sprawdź regulamin kampanii u operatora"}</dd>
          </div>
        </dl>
        {casino.promoCode ? (
          <p className="mt-3 text-sm">
            Kod promocyjny (jeśli dotyczy):{" "}
            <span className="rounded-md bg-white px-2 py-0.5 font-mono font-bold text-slate-900 ring-1 ring-slate-200">
              {casino.promoCode}
            </span>
          </p>
        ) : null}
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={casino.affiliateUrl}
            className="inline-flex rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
            rel="nofollow sponsored noopener noreferrer"
            target="_blank"
          >
            Zarejestruj się u operatora
          </a>
          <Link
            href="/"
            className="inline-flex rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 hover:border-brand-300"
          >
            Porównaj z rankingiem
          </Link>
        </div>
      </section>

      <FAQAccordion
        title="Najczęstsze pytania"
        items={[
          {
            question: "Czy ta recenzja jest aktualna?",
            answer:
              "Aktualizujemy treści przy istotnych zmianach. Data przy hero ma charakter orientacyjny — szczegóły zawsze u operatora.",
          },
          {
            question: "Czy mogę zaufać ocenie?",
            answer: "Ocena jest subiektywna i oparta na kryteriach redakcji — użyj jej jako punktu wyjścia, nie jedynej prawdy.",
          },
        ]}
      />

      {relatedArticles?.length ? (
        <section aria-label="Powiązane treści redakcyjne">
          <h2 className="text-xl font-bold text-slate-900">
            Więcej o {casino.name} — powiązane analizy
          </h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {relatedArticles.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/${a.slug}/`}
                  className="block rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-brand-300 hover:shadow-sm"
                >
                  <span className="block text-sm font-semibold text-slate-900">
                    {a.h1 || a.title}
                  </span>
                  {a.metaDescription ? (
                    <span className="mt-1 block text-sm text-slate-600">
                      {a.metaDescription.slice(0, 140)}
                    </span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section>
        <h2 className="text-xl font-bold text-slate-900">Podobne kasyna</h2>
        <div className="mt-4 grid gap-6 md:grid-cols-3">
          {related.map((c) => (
            <CasinoCard key={c.id} casino={c} />
          ))}
        </div>
      </section>

      {author ? (
        <section>
          <h2 className="text-xl font-bold text-slate-900">Autor recenzji</h2>
          <div className="mt-4">
            <AuthorCard author={author} />
          </div>
        </section>
      ) : null}
    </div>
  );
}
