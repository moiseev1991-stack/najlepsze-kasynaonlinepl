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

const TAX_RATE = 0.12;
const TAX_FREE_THRESHOLD = 2280;

export function BettingCalculator() {
  const [stake, setStake] = useState("100");
  const [oddsCsv, setOddsCsv] = useState("3.50");

  const result = useMemo(() => {
    const s = parseFloat(stake.replace(",", "."));
    const kursy = oddsCsv
      .split(/[,;\s]+/)
      .map((x) => parseFloat(x.replace(",", ".")))
      .filter((x) => Number.isFinite(x) && x > 0);
    if (!Number.isFinite(s) || s <= 0 || kursy.length === 0) {
      return null;
    }
    const totalOdds = kursy.reduce((a, b) => a * b, 1);
    const zwrot = s * totalOdds;
    const wygranaBrutto = zwrot - s;
    const podatek = zwrot > TAX_FREE_THRESHOLD ? TAX_RATE * wygranaBrutto : 0;
    const zyskNetto = wygranaBrutto - podatek;
    const roi = (zyskNetto / s) * 100;
    return { totalOdds, zwrot, wygranaBrutto, podatek, zyskNetto, roi, count: kursy.length };
  }, [stake, oddsCsv]);

  return (
    <CalculatorShell title="Kalkulator wygranej — pojedynczy zakład i AKO">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Stawka (zł)" hint="Kwota, którą stawiasz na kupon">
          <input
            className={inputCls}
            inputMode="decimal"
            value={stake}
            onChange={(e) => setStake(e.target.value)}
            placeholder="np. 100"
          />
        </Field>
        <Field
          label="Kurs lub kursy AKO"
          hint="Jeden kurs = zakład pojedynczy. Wiele kursów oddzielonych przecinkiem = AKO"
        >
          <input
            className={inputCls}
            inputMode="decimal"
            value={oddsCsv}
            onChange={(e) => setOddsCsv(e.target.value)}
            placeholder="np. 3.50 lub 1.80, 2.10, 2.40"
          />
        </Field>
      </div>

      {result ? (
        <div className="mt-6 rounded-2xl bg-slate-50 p-4 md:p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Wynik obliczeń {result.count > 1 ? `(AKO ${result.count} zdarzeń)` : "(zakład pojedynczy)"}
          </p>
          {result.count > 1 ? (
            <ResultRow label="Łączny kurs AKO" value={result.totalOdds.toFixed(3)} />
          ) : null}
          <ResultRow label="Zwrot brutto" value={formatPln(result.zwrot)} />
          <ResultRow label="Wygrana brutto (zwrot − stawka)" value={formatPln(result.wygranaBrutto)} />
          <ResultRow
            label={`Podatek 12% ${result.zwrot > TAX_FREE_THRESHOLD ? "" : "(brak — poniżej progu 2280 zł)"}`}
            value={formatPln(result.podatek)}
            tone="negative"
          />
          <ResultRow
            label="Zysk netto"
            value={formatPln(result.zyskNetto)}
            tone={result.zyskNetto >= 0 ? "positive" : "negative"}
            emphasis
          />
          <ResultRow label="ROI" value={formatPercent(result.roi)} tone="muted" />
        </div>
      ) : (
        <p className="mt-6 text-sm text-slate-500">Wprowadź poprawną stawkę i przynajmniej jeden kurs, żeby zobaczyć wynik.</p>
      )}
    </CalculatorShell>
  );
}
