import Link from "next/link";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { DetailsTable } from "@/components/casino/DetailsTable";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { CasinoCard } from "@/components/casino/CasinoCard";
import { ProsCons } from "@/components/ui/ProsCons";
import { RatingBreakdown } from "@/components/ui/RatingBreakdown";
import { ReviewHero } from "@/components/review/ReviewHero";
import { AuthorCard } from "@/components/ui/AuthorCard";
import type { Author, Casino } from "@/lib/types";
import type { ReviewExtras } from "@/lib/data";
import type { ReviewEditorialEntry } from "@/lib/review-editorial-data";
import { stripLeadingMarkdownH1 } from "@/lib/review-editorial-data";
import { ReviewEditorialBody } from "@/components/review/ReviewEditorialBody";

type Props = {
  casino: Casino;
  extras?: ReviewExtras;
  editorial?: ReviewEditorialEntry;
  author?: Author;
  breadcrumbs: Crumb[];
  related: Casino[];
};

export function CasinoReviewTemplate({ casino, extras, editorial, author, breadcrumbs, related }: Props) {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10">
      <Breadcrumbs items={breadcrumbs} />

      <ReviewHero casino={casino} author={author} />

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
            href="/najlepsze-kasyna-online/"
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
