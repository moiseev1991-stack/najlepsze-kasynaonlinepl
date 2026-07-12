"use client";

import { useMemo, useState } from "react";
import {
  CalculatorShell,
  Field,
  ResultRow,
  formatPercent,
  formatPln,
  inputCls,
} from "@/components/tools/CalculatorShell";

export function HedgeCalculator() {
  const [stakeOrg, setStakeOrg] = useState("100");
  const [oddsOrg, setOddsOrg] = useState("2.50");
  const [oddsHedge, setOddsHedge] = useState("1.80");

  const result = useMemo(() => {
    const s1 = parseFloat(stakeOrg.replace(",", "."));
    const k1 = parseFloat(oddsOrg.replace(",", "."));
    const k2 = parseFloat(oddsHedge.replace(",", "."));
    if ([s1, k1, k2].some((v) => !Number.isFinite(v) || v <= 0) || k1 <= 1 || k2 <= 1) return null;
    const s2 = (s1 * k1) / k2;
    const totalStake = s1 + s2;
    const guaranteedReturn = s1 * k1;
    const guaranteedProfit = guaranteedReturn - totalStake;
    const roi = (guaranteedProfit / totalStake) * 100;
    const surebetIndex = 1 / k1 + 1 / k2;
    const isSurebet = surebetIndex < 1;
    return {
      s2,
      totalStake,
      guaranteedReturn,
      guaranteedProfit,
      roi,
      surebetIndex,
      isSurebet,
    };
  }, [stakeOrg, oddsOrg, oddsHedge]);

  return (
    <CalculatorShell title="Kalkulator kontrowania (hedge betting)">
      <div className="grid gap-5 md:grid-cols-3">
        <Field label="Stawka pierwotna (zł)">
          <input
            className={inputCls}
            inputMode="decimal"
            value={stakeOrg}
            onChange={(e) => setStakeOrg(e.target.value)}
            placeholder="100"
          />
        </Field>
        <Field label="Kurs pierwotnego zakładu">
          <input
            className={inputCls}
            inputMode="decimal"
            value={oddsOrg}
            onChange={(e) => setOddsOrg(e.target.value)}
            placeholder="2.50"
          />
        </Field>
        <Field label="Kurs na przeciwny wynik">
          <input
            className={inputCls}
            inputMode="decimal"
            value={oddsHedge}
            onChange={(e) => setOddsHedge(e.target.value)}
            placeholder="1.80"
          />
        </Field>
      </div>

      {result ? (
        <div className="mt-6 rounded-2xl bg-slate-50 p-4 md:p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Kalkulacja kontry
          </p>
          <ResultRow label="Stawka na kontrę" value={formatPln(result.s2)} emphasis />
          <ResultRow label="Łączna inwestycja (obie stawki)" value={formatPln(result.totalStake)} />
          <ResultRow label="Gwarantowany zwrot (niezależnie od wyniku)" value={formatPln(result.guaranteedReturn)} />
          <ResultRow
            label={result.isSurebet ? "Gwarantowany zysk (surebet)" : "Wynik netto (strata przy braku edge)"}
            value={formatPln(result.guaranteedProfit)}
            tone={result.guaranteedProfit >= 0 ? "positive" : "negative"}
            emphasis
          />
          <ResultRow label="ROI kontry" value={formatPercent(result.roi)} tone="muted" />
          <ResultRow
            label="Indeks surebet (1/k₁ + 1/k₂)"
            value={result.surebetIndex.toFixed(4)}
            tone={result.isSurebet ? "positive" : "muted"}
          />
          {!result.isSurebet ? (
            <p className="mt-3 text-xs text-slate-500">
              Wskaźnik &gt; 1 oznacza, że kontrowanie tylko zmniejsza stratę, ale nie daje pewnego zysku. Klasyczny surebet wymaga wskaźnika &lt; 1.
            </p>
          ) : (
            <p className="mt-3 text-xs text-emerald-700">
              Wskaźnik &lt; 1 — to sytuacja typu surebet: gwarantowany zysk niezależnie od wyniku meczu.
            </p>
          )}
        </div>
      ) : (
        <p className="mt-6 text-sm text-slate-500">
          Wprowadź stawkę pierwotną oraz oba kursy (większe od 1.00).
        </p>
      )}
    </CalculatorShell>
  );
}
