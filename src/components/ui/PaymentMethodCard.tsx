import Link from "next/link";
import type { PaymentMethodPage } from "@/lib/types";

type Props = { payment: PaymentMethodPage };

export function PaymentMethodCard({ payment }: Props) {
  return (
    <Link
      href={`/platnosci/${payment.slug}/`}
      className="group flex flex-col rounded-3xl border border-nk-border/90 bg-nk-surface/95 p-6 shadow-card transition duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-cardHover"
    >
      <h2 className="text-lg font-bold text-nk-text group-hover:text-brand-800">{payment.methodName}</h2>
      <p className="mt-2 line-clamp-3 text-sm text-nk-muted">{payment.intro}</p>
      <span className="mt-4 text-sm font-semibold text-brand-700">Szczegóły metody →</span>
    </Link>
  );
}
