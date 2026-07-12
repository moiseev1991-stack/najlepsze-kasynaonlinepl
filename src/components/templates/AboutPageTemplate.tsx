import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { SEOContentSection } from "@/components/ui/SEOContentSection";
import { CTASection } from "@/components/sections/CTASection";
import { authors } from "@/lib/data";
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
        <h2 className="text-xl font-bold text-slate-900">Zespół redakcyjny</h2>
        <p className="mt-3 text-slate-600">
          Redakcję tworzą analitycy i edytorzy z doświadczeniem w branży iGaming oraz compliance. Nie świadczymy usług
          hazardowych — publikujemy treści porównawcze i edukacyjne.
        </p>
        <div className="mt-6 space-y-6">
          {authors.map((a) => (
            <article
              key={a.slug}
              id={a.slug}
              className="scroll-mt-28 rounded-2xl border border-slate-200 bg-slate-50/50 p-4 md:p-5"
            >
              <div className="flex gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-slate-100">
                  <Image src={a.avatar} alt={a.name} width={64} height={64} className="object-cover" unoptimized />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-900">{a.name}</h3>
                  <p className="text-xs text-brand-700">{a.role}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{a.bio}</p>
                  <div className="mt-2 flex flex-wrap gap-3 text-xs">
                    {a.linkedin ? (
                      <a
                        href={a.linkedin}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="font-medium text-brand-700 hover:underline"
                      >
                        LinkedIn ↗
                      </a>
                    ) : null}
                    {a.email ? (
                      <a href={`mailto:${a.email}`} className="font-medium text-brand-700 hover:underline">
                        {a.email}
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
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
