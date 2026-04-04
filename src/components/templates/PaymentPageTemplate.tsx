import Link from "next/link";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { CasinoRatingCard } from "@/components/casino/CasinoRatingCard";
import { SEOContentSection } from "@/components/ui/SEOContentSection";
import { getCasinoBySlug } from "@/lib/data";
import type { PaymentMethodPage } from "@/lib/types";

type Props = {
  page: PaymentMethodPage;
  breadcrumbs: Crumb[];
};

export function PaymentPageTemplate({ page, breadcrumbs }: Props) {
  const casinos = page.supportedCasinos
    .map((slug) => getCasinoBySlug(slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  const ranked = [...casinos].sort((a, b) => b.ratingOverall - a.ratingOverall);

  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-10">
      <Breadcrumbs items={breadcrumbs} />
      <header className="space-y-4">
        <h1 className="text-balance text-3xl font-bold text-slate-900 md:text-4xl">
          Kasyno online — {page.methodName}
        </h1>
        <p className="max-w-3xl text-lg text-slate-600">{page.intro}</p>
      </header>

      <section aria-labelledby="rank-pay">
        <h2 id="rank-pay" className="text-xl font-bold text-slate-900">
          Kasyna obsługujące {page.methodName}
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Zestawienie z naszej bazy — zawsze potwierdź dostępność metody w kasie wybranego operatora.
        </p>
        <div className="mt-6 flex flex-col gap-6">
          {ranked.map((c, i) => (
            <CasinoRatingCard key={c.id} casino={c} rank={i + 1} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">Zalety</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
            {page.pros.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">Wady i ograniczenia</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
            {page.cons.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
        <h2 className="text-lg font-semibold text-slate-900">Wpłata, wypłata, opłaty</h2>
        <dl className="mt-4 grid gap-4 text-sm md:grid-cols-3">
          <div>
            <dt className="text-slate-500">Jak wpłacić</dt>
            <dd className="mt-1 font-medium text-slate-900">{page.howToDeposit ?? page.depositTime}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Limity wpłat</dt>
            <dd className="mt-1 font-medium text-slate-900">
              {page.limitsText ?? "Zależą od banku, portfela i polityki kasyna — sprawdź w kasie."}
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">Czas wpłaty</dt>
            <dd className="mt-1 font-medium text-slate-900">{page.depositTime}</dd>
          </div>
          <div className="md:col-span-3">
            <dt className="text-slate-500">Wypłaty</dt>
            <dd className="mt-1 font-medium text-slate-900">
              {page.withdrawalExplained ?? page.withdrawalTime}
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">Opłaty</dt>
            <dd className="mt-1 font-medium text-slate-900">{page.fees}</dd>
          </div>
        </dl>
      </section>

      {page.comparisonNote ? (
        <section className="rounded-2xl border border-brand-200 bg-brand-50/40 p-6">
          <h2 className="text-lg font-semibold text-slate-900">Porównanie z alternatywą</h2>
          <p className="mt-3 text-slate-700">{page.comparisonNote}</p>
          {page.alternativeMethod ? (
            <p className="mt-2 text-sm text-slate-600">
              Zobacz też:{" "}
              <Link href="/platnosci/" className="font-semibold text-brand-800 hover:underline">
                {page.alternativeMethod}
              </Link>{" "}
              w indeksie płatności.
            </p>
          ) : null}
        </section>
      ) : null}

      <div className="space-y-10">
        {(page.seoSections ?? []).map((s) => (
          <SEOContentSection key={s.heading} section={s} />
        ))}
      </div>

      <FAQAccordion
        title="FAQ — płatności"
        items={[
          {
            question: "Czy metoda jest dostępna dla wypłat?",
            answer:
              "Zależy od operatora i kraju — część kanałów służy tylko do depozytów. Szczegóły w kasie i regulaminie.",
          },
          { question: "Jakie są typowe opłaty?", answer: page.fees },
        ]}
      />

      <p className="text-sm text-slate-500">
        Więcej metod:{" "}
        <Link href="/platnosci/" className="font-medium text-brand-700 hover:underline">
          Płatności w kasynach online
        </Link>
        .
      </p>
    </div>
  );
}
