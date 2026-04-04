import Link from "next/link";
import {
  Banknote,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Gamepad2,
  Lightbulb,
  ListChecks,
  Mail,
  ShieldCheck,
  Star,
  Tag,
  UserPlus,
} from "lucide-react";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { CTASection } from "@/components/sections/CTASection";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { QuickNavigation } from "@/components/ui/QuickNavigation";
import { SpinsSectionOverview, SPINS_SECTION_BONUS_SLUGS } from "@/components/ui/SpinsSectionOverview";
import type { BonusPage } from "@/lib/types";

type Props = {
  page: BonusPage;
  breadcrumbs: Crumb[];
};

const STEP_ICONS = [UserPlus, Mail, Tag, Gamepad2];

/** Extract the amount label from the page title for the hero badge */
function extractAmountLabel(title: string): string | null {
  const match = title.match(/(\d+[\s\u00a0]?(?:zł|€|euro|eur)[\s\S]*?(?:bez depozytu|za rejestrację)?)/i);
  if (match) return match[0].trim();
  const simpleMatch = title.match(/(\d+\s*(?:zł|€))/i);
  return simpleMatch ? simpleMatch[0].trim() : null;
}

export function BonusPageTemplate({ page, breadcrumbs }: Props) {
  const nav = page.quickNav ?? [];
  const amountLabel = extractAmountLabel(page.title);
  const isCashBonus =
    page.slug.includes("zl-bez-depozytu") ||
    page.slug.includes("zl-za-rejestracje") ||
    page.slug.includes("euro-bez-depozytu");
  const isSpinSectionPage = SPINS_SECTION_BONUS_SLUGS.has(page.slug);

  const main = (
    <>
      {/* Hero header with optional amount badge */}
      <header className="space-y-6">
        {isCashBonus && amountLabel && (
          <div className="flex items-center gap-4 rounded-2xl border border-brand-200 bg-gradient-to-r from-brand-50 to-slate-50 p-5 md:p-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white shadow-md">
              <Banknote className="h-7 w-7" />
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-brand-700">
                Bonus bez depozytu
              </p>
              <p className="text-2xl font-extrabold text-slate-900 md:text-3xl">
                {amountLabel}
              </p>
            </div>
          </div>
        )}
        <div className="space-y-3">
          <h1 className="text-balance text-3xl font-bold text-slate-900 md:text-4xl">
            {page.title}
          </h1>
          <p className="max-w-3xl text-lg text-slate-600">{page.intro}</p>
        </div>
      </header>

      {page.relatedLinks?.length ? <RelatedLinks links={page.relatedLinks} /> : null}

      {nav.length ? <QuickNavigation items={nav} /> : null}

      {/* What is it */}
      {page.whatIsIt ? (
        <section id={nav.find((x) => x.id === "co-to")?.id ?? "co-to"} className="scroll-mt-28">
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <BookOpen className="h-5 w-5 shrink-0 text-brand-600" />
            Czym jest ta oferta
          </h2>
          <p className="mt-3 leading-relaxed text-slate-600">{page.whatIsIt}</p>
        </section>
      ) : null}

      {/* Steps as numbered cards */}
      {page.steps?.length ? (
        <section id="kroki" className="scroll-mt-28">
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <ChevronRight className="h-5 w-5 shrink-0 text-brand-600" />
            Jak odebrać bonus — kroki
          </h2>
          <ol className="mt-5 grid gap-4 sm:grid-cols-2">
            {page.steps.map((s, i) => {
              const Icon = STEP_ICONS[i % STEP_ICONS.length];
              return (
                <li
                  key={s.title}
                  className="relative flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white shadow">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-900">{s.title}</span>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{s.body}</p>
                  </div>
                  <span className="absolute right-4 top-4 text-xs font-bold text-slate-300">
                    0{i + 1}
                  </span>
                </li>
              );
            })}
          </ol>
        </section>
      ) : null}

      {/* Conditions box */}
      <section id="warunki" className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
          <ShieldCheck className="h-5 w-5 shrink-0 text-brand-600" />
          Warunki i zastrzeżenia
        </h2>
        <p className="mt-3 text-slate-600">{page.conditions}</p>
        {page.maxCashoutNote ? (
          <p className="mt-4 rounded-lg bg-amber-50 p-4 text-sm text-amber-950 ring-1 ring-amber-200/80">
            <strong>Maksymalna wypłata:</strong> {page.maxCashoutNote}
          </p>
        ) : null}
        {page.examples.length ? (
          <ul className="mt-5 space-y-2">
            {page.examples.map((ex) => (
              <li key={ex} className="flex items-start gap-2 text-slate-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                <span className="text-sm">{ex}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      {page.recommendedIntro ? (
        <section>
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <Star className="h-5 w-5 shrink-0 text-brand-600" />
            Przykładowe strony / oferty
          </h2>
          <p className="mt-3 text-slate-600">{page.recommendedIntro}</p>
          <p className="mt-2 text-sm text-slate-500">
            Pełne zestawienie znajdziesz w{" "}
            <Link href="/najlepsze-kasyna-online/" className="font-medium text-brand-700 hover:underline">
              rankingu kasyn
            </Link>{" "}
            oraz w recenzjach poszczególnych marek.
          </p>
        </section>
      ) : null}

      {/* Pros with check icons */}
      {page.pros?.length ? (
        <section>
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <Star className="h-5 w-5 shrink-0 text-brand-600" />
            Zalety z perspektywy gracza
          </h2>
          <ul className="mt-4 space-y-3">
            {page.pros.map((p) => (
              <li key={p} className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                <span className="text-slate-700">{p}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {page.summary ? (
        <section>
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <ListChecks className="h-5 w-5 shrink-0 text-brand-600" />
            Podsumowanie
          </h2>
          <p className="mt-3 text-slate-600">{page.summary}</p>
        </section>
      ) : null}

      {/* Expert tip */}
      {page.expertTip ? (
        <aside className="flex gap-4 rounded-2xl border border-brand-200 bg-brand-50/60 p-5 text-sm text-slate-800">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
            <Lightbulb className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-bold text-brand-950">Wskazówka redakcji</h2>
            <p className="mt-1 leading-relaxed">{page.expertTip}</p>
          </div>
        </aside>
      ) : null}

      {page.faq.length ? (
        <section id="faq" className="scroll-mt-28">
          <FAQAccordion items={page.faq} />
        </section>
      ) : null}

      <CTASection
        title="Zobacz aktualny ranking kasyn"
        description="Porównaj oferty i przejdź do recenzji operatorów, zanim aktywujesz promocję."
        primaryHref="/najlepsze-kasyna-online/"
        primaryLabel="Ranking kasyn"
        secondaryHref="/kryteria-oceny/"
        secondaryLabel="Jak oceniamy"
      />
    </>
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumbs items={breadcrumbs} />

      {isSpinSectionPage ? (
        <div className="mt-6 lg:grid lg:grid-cols-[1fr_minmax(260px,280px)] lg:items-start lg:gap-10">
          <aside className="order-first mb-8 lg:order-2 lg:mb-0 lg:sticky lg:top-28 lg:self-start">
            <SpinsSectionOverview currentPath={`/${page.slug}/`} />
          </aside>
          <div className="min-w-0 space-y-12 lg:order-1">{main}</div>
        </div>
      ) : (
        <div className="mt-6 space-y-12">{main}</div>
      )}
    </div>
  );
}
