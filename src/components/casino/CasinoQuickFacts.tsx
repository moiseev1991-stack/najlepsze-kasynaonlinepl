import Link from "next/link";
import type { Casino } from "@/lib/types";
import { paymentHref } from "@/lib/badge-links";

type Props = {
  casino: Casino;
  dense?: boolean;
};

export function CasinoQuickFacts({ casino, dense }: Props) {
  const methods = casino.paymentMethods.slice(0, 4);
  const pad = dense ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs";

  return (
    <div className={`flex flex-wrap gap-2 ${dense ? "" : "gap-2.5"}`}>
      <span
        className={`inline-flex items-center rounded-lg bg-slate-100 font-medium text-slate-700 ring-1 ring-slate-200/80 ${pad}`}
        title="Minimalna wpłata"
      >
        Od {casino.minDeposit}
      </span>
      <Link
        href="/kasyno-szybkie-wyplaty/"
        className={`inline-flex items-center rounded-lg bg-slate-100 font-medium text-slate-700 ring-1 ring-slate-200/80 transition hover:bg-brand-50 hover:text-brand-800 hover:ring-brand-300 ${pad}`}
        title="Orientacyjny czas wypłaty"
      >
        Wypłata ~{casino.withdrawalTime}
      </Link>
      <Link
        href="/automaty-online/"
        className={`inline-flex items-center rounded-lg bg-violet-50 font-medium text-violet-900 ring-1 ring-violet-200/80 transition hover:bg-violet-100 hover:ring-violet-300 ${pad}`}
      >
        {casino.gameCount.toLocaleString("pl-PL")}+ gier
      </Link>
      {methods.map((m) => {
        const href = paymentHref(m);
        return href ? (
          <Link
            key={m}
            href={href}
            className={`inline-flex items-center rounded-lg bg-white font-medium text-slate-600 ring-1 ring-slate-200 transition hover:bg-brand-50 hover:text-brand-800 hover:ring-brand-300 ${pad}`}
          >
            {m}
          </Link>
        ) : (
          <span
            key={m}
            className={`inline-flex items-center rounded-lg bg-white font-medium text-slate-600 ring-1 ring-slate-200 ${pad}`}
          >
            {m}
          </span>
        );
      })}
    </div>
  );
}
