import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { PaymentMethodCard } from "@/components/ui/PaymentMethodCard";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { SEOContentSection } from "@/components/ui/SEOContentSection";
import { payments } from "@/lib/data";
import { paymentIndexContent } from "@/lib/payment-index-content";

const crumbs: Crumb[] = [{ label: "Strona główna", href: "/" }, { label: "Płatności" }];

export function PaymentIndexTemplate() {
  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-10">
      <Breadcrumbs items={crumbs} />
      <header className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Metody płatności w kasynach online</h1>
        <p className="max-w-3xl text-lg text-slate-600">
          Porównaj dostępne kanały depozytów i wypłat. Opisy mają charakter informacyjny — szczegóły zawsze
          potwierdzaj u wybranego operatora.
        </p>
        <p className="max-w-3xl text-lg text-slate-600">{paymentIndexContent.introSecondary}</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {payments.map((p) => (
          <PaymentMethodCard key={p.slug} payment={p} />
        ))}
      </div>

      <div className="space-y-10">
        {paymentIndexContent.seoSections.map((s) => (
          <SEOContentSection key={s.heading} section={s} />
        ))}
      </div>

      <FAQAccordion items={paymentIndexContent.faq} />
    </div>
  );
}
