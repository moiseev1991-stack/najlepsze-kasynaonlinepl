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

type Format = "decimal" | "fractional" | "american";

function gcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : gcd(b, a % b);
}

function decimalToFractional(d: number): string {
  if (d <= 1) return "—";
  const raw = d - 1;
  // Przybliżenie do 4-cyfrowego mianownika
  const denom = 1000;
  const num = Math.round(raw * denom);
  const g = gcd(num, denom);
  return `${num / g}/${denom / g}`;
}

function decimalToAmerican(d: number): string {
  if (d <= 1) return "—";
  if (d >= 2) return `+${Math.round((d - 1) * 100)}`;
  return `${Math.round(-100 / (d - 1))}`;
}

function parseFractional(s: string): number | null {
  const m = s.match(/^\s*(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)\s*$/);
  if (!m) return null;
  const num = parseFloat(m[1]);
  const den = parseFloat(m[2]);
  if (!Number.isFinite(num) || !Number.isFinite(den) || den <= 0) return null;
  return num / den + 1;
}

function parseAmerican(s: string): number | null {
  const v = parseFloat(s.replace(",", "."));
  if (!Number.isFinite(v) || v === 0) return null;
  if (v > 0) return v / 100 + 1;
  return 100 / -v + 1;
}

export function OddsConverter() {
  const [source, setSource] = useState<Format>("decimal");
  const [input, setInput] = useState("2.50");

  const decimal = useMemo(() => {
    const trimmed = input.trim();
    if (!trimmed) return null;
    if (source === "decimal") {
      const v = parseFloat(trimmed.replace(",", "."));
      return Number.isFinite(v) && v > 1 ? v : null;
    }
    if (source === "fractional") return parseFractional(trimmed);
    if (source === "american") return parseAmerican(trimmed);
    return null;
  }, [input, source]);

  const results = useMemo(() => {
    if (!decimal) return null;
    return {
      decimal,
      fractional: decimalToFractional(decimal),
      american: decimalToAmerican(decimal),
      impliedProbability: (1 / decimal) * 100,
      profitOn100: (decimal - 1) * 100,
    };
  }, [decimal]);

  return (
    <CalculatorShell title="Konwerter kursów bukmacherskich">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Format źródłowy">
          <select className={inputCls} value={source} onChange={(e) => setSource(e.target.value as Format)}>
            <option value="decimal">Dziesiętny (np. 2.50)</option>
            <option value="fractional">Ułamkowy (np. 3/2)</option>
            <option value="american">Amerykański (np. +150 lub −200)</option>
          </select>
        </Field>
        <Field
          label="Wartość kursu"
          hint={
            source === "decimal"
              ? "np. 2.50"
              : source === "fractional"
                ? "np. 3/2 lub 7/4"
                : "np. +150 lub -200"
          }
        >
          <input
            className={inputCls}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={source === "decimal" ? "2.50" : source === "fractional" ? "3/2" : "+150"}
          />
        </Field>
      </div>

      {results ? (
        <div className="mt-6 rounded-2xl bg-slate-50 p-4 md:p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Przeliczenia
          </p>
          <ResultRow label="Dziesiętny" value={formatNumber(results.decimal, 3)} />
          <ResultRow label="Ułamkowy (UK)" value={results.fractional} />
          <ResultRow label="Amerykański (moneyline)" value={results.american} />
          <ResultRow
            label="Prawdopodobieństwo implikowane"
            value={formatPercent(results.impliedProbability)}
            tone="muted"
          />
          <ResultRow
            label="Zysk netto z 100 zł stawki"
            value={`${formatNumber(results.profitOn100)} zł`}
            tone="positive"
            emphasis
          />
        </div>
      ) : (
        <p className="mt-6 text-sm text-slate-500">Wprowadź poprawny kurs w wybranym formacie.</p>
      )}
    </CalculatorShell>
  );
}
