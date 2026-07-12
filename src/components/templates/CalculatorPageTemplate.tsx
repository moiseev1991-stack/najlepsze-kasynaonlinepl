import Link from "next/link";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { AuthorBox } from "@/components/ui/AuthorBox";
import { BettingCalculator } from "@/components/tools/BettingCalculator";
import { SystemBetCalculator } from "@/components/tools/SystemBetCalculator";
import { OddsConverter } from "@/components/tools/OddsConverter";
import { MarginCalculator } from "@/components/tools/MarginCalculator";
import { HedgeCalculator } from "@/components/tools/HedgeCalculator";
import { calculators, getAuthorBySlug } from "@/lib/data";
import type { CalculatorPage } from "@/lib/types";

type Props = {
  page: CalculatorPage;
  breadcrumbs: Crumb[];
};

function CalculatorWidget({ kind }: { kind: CalculatorPage["kind"] }) {
  if (kind === "basic") return <BettingCalculator />;
  if (kind === "system") return <SystemBetCalculator />;
  if (kind === "converter") return <OddsConverter />;
  if (kind === "margin") return <MarginCalculator />;
  if (kind === "hedge") return <HedgeCalculator />;
  return null;
}

export function CalculatorPageTemplate({ page, breadcrumbs }: Props) {
  const author = getAuthorBySlug("marta-kowalczyk");
  const others = calculators.filter((c) => c.slug !== page.slug);

  return (
    <article className="mx-auto max-w-5xl space-y-10 px-4 py-10">
      <Breadcrumbs items={breadcrumbs} />

      <header className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">
          Narzędzia bukmacherskie
        </p>
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">{page.h1}</h1>
        <p className="max-w-3xl text-lg leading-relaxed text-slate-600">{page.intro}</p>
      </header>

      {author ? (
        <section aria-label="Autor kalkulatora">
          <AuthorBox author={author} />
        </section>
      ) : null}

      <CalculatorWidget kind={page.kind} />

      <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="text-xl font-bold text-slate-900">Jak działa ten kalkulator</h2>
        <p className="mt-3 leading-relaxed text-slate-700">{page.howItWorks}</p>
        <div className="mt-4 rounded-xl bg-slate-50 p-4 md:p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Wzór</p>
          <pre className="mt-2 overflow-x-auto whitespace-pre-wrap text-sm leading-relaxed text-slate-800">
            {page.formula}
          </pre>
        </div>
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Przykład</p>
          <p className="mt-2 leading-relaxed text-slate-700">{page.example}</p>
        </div>
      </section>

      {page.faq.length ? (
        <section>
          <h2 className="text-xl font-bold text-slate-900">Najczęstsze pytania</h2>
          <div className="mt-4">
            <FAQAccordion items={page.faq} />
          </div>
        </section>
      ) : null}

      {others.length ? (
        <section aria-label="Pozostałe kalkulatory">
          <h2 className="text-xl font-bold text-slate-900">Pozostałe kalkulatory bukmacherskie</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {others.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/${c.slug}/`}
                  className="block rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-brand-300 hover:shadow-sm"
                >
                  <span className="block text-sm font-semibold text-slate-900">{c.title}</span>
                  <span className="mt-1 block text-sm text-slate-600">
                    {c.metaDescription.slice(0, 130)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <p className="text-sm text-slate-500">
        Kalkulacje mają charakter orientacyjny. Odpowiedzialnie graj z limitem czasu i budżetu — hazard niesie ryzyko strat.{" "}
        <Link href="/odpowiedzialna-gra/" className="font-medium text-brand-700 hover:underline">
          Odpowiedzialna gra
        </Link>
        .
      </p>
    </article>
  );
}
