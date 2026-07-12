"use client";

import { useMemo, useState } from "react";
import {
  CalculatorShell,
  Field,
  ResultRow,
  formatNumber,
  formatPercent,
  inputCls,
} from "@/components/tools/CalculatorShell";

export function MarginCalculator() {
  const [mode, setMode] = useState<"2" | "3">("3");
  const [k1, setK1] = useState("2.10");
  const [k2, setK2] = useState("3.40");
  const [k3, setK3] = useState("3.60");

  const result = useMemo(() => {
    const inputs = mode === "2" ? [k1, k2] : [k1, k2, k3];
    const kursy = inputs
      .map((v) => parseFloat(v.replace(",", ".")))
      .filter((v) => Number.isFinite(v) && v > 1);
    if (kursy.length !== inputs.length) return null;
    const probs = kursy.map((k) => 1 / k);
    const sum = probs.reduce((a, b) => a + b, 0);
    const overround = sum * 100 - 100;
    const fairOdds = probs.map((p) => 1 / (p / sum));
    return { sum, overround, kursy, probs, fairOdds };
  }, [mode, k1, k2, k3]);

  const labels = mode === "2" ? ["Wynik 1", "Wynik 2"] : ["1 (gospodarz)", "X (remis)", "2 (gość)"];

  return (
    <CalculatorShell title="Kalkulator marży bukmachera (overround)">
      <div className="mb-5">
        <Field label="Typ zdarzenia">
          <select className={inputCls} value={mode} onChange={(e) => setMode(e.target.value as "2" | "3")}>
            <option value="2">2 wyniki (tenis, siatkówka bez remisu)</option>
            <option value="3">3 wyniki (piłka nożna 1/X/2)</option>
          </select>
        </Field>
      </div>

      <div className={`grid gap-5 ${mode === "3" ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
        <Field label={`Kurs — ${labels[0]}`}>
          <input
            className={inputCls}
            inputMode="decimal"
            value={k1}
            onChange={(e) => setK1(e.target.value)}
          />
        </Field>
        <Field label={`Kurs — ${labels[1]}`}>
          <input
            className={inputCls}
            inputMode="decimal"
            value={k2}
            onChange={(e) => setK2(e.target.value)}
          />
        </Field>
        {mode === "3" ? (
          <Field label={`Kurs — ${labels[2]}`}>
            <input
              className={inputCls}
              inputMode="decimal"
              value={k3}
              onChange={(e) => setK3(e.target.value)}
            />
          </Field>
        ) : null}
      </div>

      {result ? (
        <div className="mt-6 rounded-2xl bg-slate-50 p-4 md:p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Wynik analizy
          </p>
          <ResultRow
            label="Suma prawdopodobieństw implikowanych"
            value={formatPercent(result.sum * 100)}
          />
          <ResultRow
            label="Marża bukmachera (overround)"
            value={formatPercent(result.overround)}
            tone={result.overround < 5 ? "positive" : result.overround > 10 ? "negative" : "default"}
            emphasis
          />
          <div className="mt-4 border-t border-slate-200 pt-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Kursy fair (bez marży)
            </p>
            {result.fairOdds.map((f, i) => (
              <ResultRow
                key={labels[i]}
                label={`Fair ${labels[i]} (org. ${result.kursy[i].toFixed(2)})`}
                value={formatNumber(f, 3)}
                tone="muted"
              />
            ))}
          </div>
        </div>
      ) : (
        <p className="mt-6 text-sm text-slate-500">Wprowadź wszystkie kursy (większe od 1.00).</p>
      )}
    </CalculatorShell>
  );
}
