import Link from "next/link";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { CasinoCard } from "@/components/casino/CasinoCard";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { minDeposits, casinos, getCasinosForCategory } from "@/lib/data";
import type { MinDepositPage } from "@/lib/types";

export function MinDepositParentTemplate() {
  const crumbs: Crumb[] = [
    { label: "Strona główna", href: "/" },
    { label: "Kasyna z minimalnym depozytem" },
  ];

  const list = getCasinosForCategory("minimalny-depozyt");

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10">
      <Breadcrumbs items={crumbs} />
      <header className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Kasyna z minimalnym depozytem</h1>
        <p className="max-w-3xl text-lg text-slate-600">
          Niski próg wejścia bywa korzystny do testów platformy. Pamiętaj o weryfikacji konta i ewentualnych
          opłatach pośredników przy małych kwotach.
        </p>
      </header>

      <section>
        <h2 className="text-xl font-semibold text-slate-900">Konkretne progi depozytu</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {minDeposits.map((m) => (
            <Link
              key={m.slug}
              href={`/minimalny-depozyt/${m.slug}/`}
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-800 ring-1 ring-slate-200 hover:ring-brand-300"
            >
              {m.amountLabel}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-900">Wybrane kasyna</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {list.map((c, i) => (
            <CasinoCard key={c.id} casino={c} rank={i + 1} />
          ))}
        </div>
      </section>
    </div>
  );
}

type ChildProps = { page: MinDepositPage; breadcrumbs: Crumb[] };

export function MinDepositChildTemplate({ page, breadcrumbs }: ChildProps) {
  const list = casinos;

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10">
      <Breadcrumbs items={breadcrumbs} />
      <header className="space-y-4">
        <h1 className="text-balance text-3xl font-bold text-slate-900 md:text-4xl">{page.h1}</h1>
        <p className="max-w-3xl text-lg text-slate-600">{page.intro}</p>
      </header>

      {page.seoSections.map((s) => (
        <section key={s.heading}>
          <h2 className="text-xl font-bold text-slate-900">{s.heading}</h2>
          <p className="mt-3 text-slate-600">{s.body}</p>
        </section>
      ))}

      <section>
        <h2 className="text-xl font-semibold text-slate-900">Kasyna z naszej bazy</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {list.map((c, i) => (
            <CasinoCard key={c.id} casino={c} rank={i + 1} />
          ))}
        </div>
      </section>

      {page.faq.length ? <FAQAccordion items={page.faq} /> : null}

      <p className="text-sm text-slate-600">
        <Link href="/minimalny-depozyt/" className="font-semibold text-brand-700 hover:underline">
          Wróć do przeglądu progów depozytu
        </Link>
      </p>
    </div>
  );
}
