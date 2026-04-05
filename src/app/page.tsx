import Link from "next/link";
import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { HomeRankingSection } from "@/components/home/HomeRankingSection";
import { HomeReviewsGuideSection } from "@/components/home/HomeReviewsGuideSection";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { CTASection } from "@/components/sections/CTASection";
import { PaymentMethodsList } from "@/components/ui/PaymentMethodsList";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, faqPageSchema } from "@/lib/seo";
import { homeContent } from "@/lib/home-content";
import { casinos } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "Ranking kasyn online 2026",
  description: homeContent.hero.subtitle,
  path: "/",
});

const paymentLinks = [
  { name: "BLIK", href: "/platnosci/kasyno-online-blik/" },
  { name: "PayPal", href: "/platnosci/paypal/" },
  { name: "Skrill", href: "/platnosci/kasyno-online-skrill/" },
  { name: "Przelewy24", href: "/platnosci/kasyno-przelewy24/" },
  { name: "Paysafecard", href: "/platnosci/paysafecard/" },
];

const bonusLinks = [
  { name: "Bonusy powitalne", href: "/bonusy-powitalne/" },
  { name: "Bonus bez depozytu", href: "/bonus-bez-depozytu/" },
  { name: "Darmowe spiny", href: "/darmowe-spiny/" },
  { name: "Darmowe kody", href: "/darmowe-kody-do-polskich-kasyn/" },
];

const categoryLinks = [
  { name: "Najlepsze kasyna", href: "/najlepsze-kasyna-online/" },
  { name: "Legalne kasyna", href: "/legalne-kasyna/" },
  { name: "Kasyna na żywo", href: "/kasyna-na-zywo/" },
  { name: "Niski depozyt", href: "/minimalny-depozyt/" },
  { name: "Wypłacalne kasyna", href: "/wyplacalne-kasyna-internetowe/" },
];

export default function HomePage() {
  const filterTags = ["Wszystkie kasyna", "Nowe kasyna", "Popularny", "Najwyższa ocena"];

  return (
    <div className="space-y-16 md:space-y-20">
      <JsonLd data={faqPageSchema(homeContent.faq)} />

      <HeroSection
        eyebrow={homeContent.hero.eyebrow}
        title={homeContent.hero.title}
        subtitle={homeContent.hero.subtitle}
        trustLine={homeContent.hero.trustLine}
      />

      <SectionBackground variant="tinted" aria-labelledby="filtry" className="space-y-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <h2 id="filtry" className="text-xl font-semibold text-nk-text">
            Filtry rankingu
          </h2>
          <p className="text-sm text-nk-muted">Dopasuj widok do priorytetów — szybkość, nowość lub ocena.</p>
        </div>
        <HomeRankingSection casinos={casinos} filterTags={filterTags} />
      </SectionBackground>

      <SurfaceCard className="max-w-3xl space-y-4 px-5 py-6 text-nk-text md:px-8 md:py-7">
        <p className="leading-relaxed">{homeContent.intro}</p>
        <p className="leading-relaxed text-nk-muted">{homeContent.introSecondary}</p>
      </SurfaceCard>

      <HomeReviewsGuideSection />

      <SectionBackground variant="mesh" className="grid gap-8 md:grid-cols-3">
        {homeContent.trust.items.map((item) => (
          <div key={item.title}>
            <h3 className="font-semibold text-nk-text">{item.title}</h3>
            <p className="mt-2 text-sm text-nk-muted">{item.body}</p>
          </div>
        ))}
      </SectionBackground>

      <SectionBackground variant="gradient" className="space-y-4">
        <h2 className="text-xl font-semibold text-nk-text">{homeContent.howWeRate.title}</h2>
        <ol className="list-decimal space-y-3 pl-5 text-nk-text">
          {homeContent.howWeRate.steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
        <Link href="/kryteria-oceny/" className="inline-flex text-sm font-semibold text-brand-700 hover:underline">
          Pełne kryteria oceny
        </Link>
      </SectionBackground>

      <SectionBackground variant="surface" className="grid gap-8 md:grid-cols-2">
        <PaymentMethodsList items={paymentLinks} title="Popularne metody płatności" />
        <div>
          <p className="text-sm font-semibold text-nk-text">Kategorie bonusów</p>
          <ul className="mt-3 space-y-2">
            {bonusLinks.map((b) => (
              <li key={b.href}>
                <Link href={b.href} className="text-sm font-medium text-brand-700 hover:underline">
                  {b.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </SectionBackground>

      <SectionBackground variant="rose" className="space-y-4">
        <h2 className="text-xl font-semibold text-nk-text">Popularne kategorie kasyn</h2>
        <div className="flex flex-wrap gap-2">
          {categoryLinks.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="rounded-full border border-nk-border/80 bg-nk-surface/90 px-4 py-2 text-sm font-medium text-nk-text shadow-sm transition hover:border-brand-300 hover:shadow-card"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </SectionBackground>

      {homeContent.seoBlocks.map((block, i) => (
        <SectionBackground
          key={block.heading}
          variant={i % 2 === 0 ? "tinted" : "surface"}
          className="prose prose-slate max-w-none prose-headings:text-nk-text prose-p:text-nk-muted"
        >
          <h2 className="text-xl font-bold text-nk-text">{block.heading}</h2>
          <p>{block.body}</p>
        </SectionBackground>
      ))}

      <FAQAccordion items={homeContent.faq} />

      <CTASection
        title={homeContent.cta.title}
        description={homeContent.cta.description}
        primaryHref={homeContent.cta.primaryHref}
        primaryLabel={homeContent.cta.primaryLabel}
        secondaryHref={homeContent.cta.secondaryHref}
        secondaryLabel={homeContent.cta.secondaryLabel}
      />
    </div>
  );
}
