import Link from "next/link";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { SEOContentSection } from "@/components/ui/SEOContentSection";
import { CTASection } from "@/components/sections/CTASection";
import type { TrustPageContent } from "@/lib/types";

type Props = { page: TrustPageContent; breadcrumbs: Crumb[] };

export function AboutPageTemplate({ page, breadcrumbs }: Props) {
  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-10">
      <Breadcrumbs items={breadcrumbs} />
      <header className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">{page.h1}</h1>
        <p className="max-w-3xl text-lg text-slate-600">{page.intro}</p>
      </header>

      <div className="space-y-10">
        {page.sections.map((s) => (
          <SEOContentSection key={s.heading} section={s} />
        ))}
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="text-xl font-bold text-slate-900">Zespół</h2>
        <p className="mt-3 text-slate-600">
          Redakcję tworzą analitycy i edytorzy z doświadczeniem w branży iGaming oraz compliance. Nie świadczymy usług
          hazardowych — publikujemy treści porównawcze i edukacyjne.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
          <li>Redaktorzy merytoryczni — testy produktowe i aktualizacja artykułów</li>
          <li>Analitycy — tabele, kryteria oceny i spójność danych</li>
          <li>Kontakt z czytelnikami — zgłoszenia błędów i współpraca informacyjna</li>
        </ul>
      </section>

      <CTASection
        title="Masz pytanie do redakcji?"
        description="Napisz na adres kontaktowy — odpowiadamy w miarę możliwości w dni robocze."
        primaryHref="/kontakt/"
        primaryLabel="Przejdź do kontaktu"
        secondaryHref="/kryteria-oceny/"
        secondaryLabel="Kryteria oceny"
      />

      <p className="text-sm text-slate-500">
        Zobacz też:{" "}
        <Link href="/polityka-redakcyjna/" className="font-medium text-brand-700 hover:underline">
          Polityka redakcyjna
        </Link>
        .
      </p>
    </div>
  );
}
