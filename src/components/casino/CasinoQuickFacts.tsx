import type { Casino } from "@/lib/types";

type Props = {
  casino: Casino;
  dense?: boolean;
};

export function CasinoQuickFacts({ casino, dense }: Props) {
  const methods = casino.paymentMethods.slice(0, 4);

  return (
    <div className={`flex flex-wrap gap-2 ${dense ? "" : "gap-2.5"}`}>
      <span
        className={`inline-flex items-center rounded-lg bg-slate-100 font-medium text-slate-700 ring-1 ring-slate-200/80 ${dense ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs"}`}
        title="Minimalna wpłata"
      >
        Od {casino.minDeposit}
      </span>
      <span
        className={`inline-flex items-center rounded-lg bg-slate-100 font-medium text-slate-700 ring-1 ring-slate-200/80 ${dense ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs"}`}
        title="Orientacyjny czas wypłaty"
      >
        Wypłata ~{casino.withdrawalTime}
      </span>
      <span
        className={`inline-flex items-center rounded-lg bg-violet-50 font-medium text-violet-900 ring-1 ring-violet-200/80 ${dense ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs"}`}
      >
        {casino.gameCount.toLocaleString("pl-PL")}+ gier
      </span>
      {methods.map((m) => (
        <span
          key={m}
          className={`inline-flex items-center rounded-lg bg-white font-medium text-slate-600 ring-1 ring-slate-200 ${dense ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs"}`}
        >
          {m}
        </span>
      ))}
    </div>
  );
}
