"use client";

import { useMemo, useState } from "react";
import {
  CalculatorShell,
  Field,
  ResultRow,
  formatPln,
  inputCls,
} from "@/components/tools/CalculatorShell";

const TAX_RATE = 0.12;
const TAX_FREE_THRESHOLD = 2280;

function combinations(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  let c = 1;
  for (let i = 0; i < k; i++) c = (c * (n - i)) / (i + 1);
  return Math.round(c);
}

function pickCombinations<T>(arr: T[], k: number): T[][] {
  const out: T[][] = [];
  const rec = (start: number, buf: T[]) => {
    if (buf.length === k) {
      out.push([...buf]);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      buf.push(arr[i]);
      rec(i + 1, buf);
      buf.pop();
    }
  };
  rec(0, []);
  return out;
}

export function SystemBetCalculator() {
  const [n, setN] = useState(3);
  const [k, setK] = useState(2);
  const [oddsInput, setOddsInput] = useState("1.80, 2.10, 2.50");
  const [perComboStake, setPerComboStake] = useState("10");
  const [hitCount, setHitCount] = useState("all");

  const parsed = useMemo(() => {
    const kursy = oddsInput
      .split(/[,;\s]+/)
      .map((x) => parseFloat(x.replace(",", ".")))
      .filter((x) => Number.isFinite(x) && x > 0);
    const stakeCombo = parseFloat(perComboStake.replace(",", "."));
    if (kursy.length !== n || !Number.isFinite(stakeCombo) || stakeCombo <= 0) {
      return null;
    }
    if (k < 1 || k > n) return null;
    const combos = pickCombinations(kursy, k);
    const cCount = combos.length;
    const totalStake = stakeCombo * cCount;
    const productPerCombo = combos.map((c) => c.reduce((a, b) => a * b, 1));
    // scenariusz: wszystkie N trafiają
    const maxZwrot = productPerCombo.reduce((a, b) => a + b, 0) * stakeCombo;
    // scenariusz: dokładnie `hit` trafień (bierzemy pierwsze `hit` kursów — czysto ilustracyjnie
    // jeśli user wybrał liczbę hitów, liczymy oczekiwany zwrot z K kombinacji, które da się złożyć z tych `hit` udanych)
    let hitZwrot = maxZwrot;
    let hitScenario = "wszystkie N zdarzeń trafionych";
    if (hitCount !== "all") {
      const h = parseInt(hitCount, 10);
      if (Number.isFinite(h) && h >= 0 && h <= n) {
        // liczba wygrywających kombinacji: C(h,k) (kombinacji K spośród `h` udanych)
        const winComboCount = combinations(h, k);
        // średni iloczyn kursów po `k` z wybranego zestawu (aproksymacja): weź `h` pierwszych kursów
        const chosen = kursy.slice(0, h);
        const winCombos = pickCombinations(chosen, k);
        hitZwrot = winCombos.reduce((sum, c) => sum + c.reduce((a, b) => a * b, 1), 0) * stakeCombo;
        hitScenario = `${h} z ${n} zdarzeń trafionych (${winComboCount} wygrywających kombinacji)`;
      }
    }
    const zysk = hitZwrot - totalStake;
    const podatek = hitZwrot > TAX_FREE_THRESHOLD ? Math.max(0, zysk) * TAX_RATE : 0;
    const zyskNetto = zysk - podatek;
    return {
      cCount,
      totalStake,
      maxZwrot,
      hitZwrot,
      hitScenario,
      zysk,
      podatek,
      zyskNetto,
    };
  }, [n, k, oddsInput, perComboStake, hitCount]);

  return (
    <CalculatorShell title="Kalkulator zakładów systemowych — K z N">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Liczba zdarzeń N">
          <select className={inputCls} value={n} onChange={(e) => setN(parseInt(e.target.value, 10))}>
            {[2, 3, 4, 5, 6, 7, 8].map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Liczba trafień K (rozmiar kombinacji)">
          <select className={inputCls} value={k} onChange={(e) => setK(parseInt(e.target.value, 10))}>
            {Array.from({ length: n - 1 }, (_, i) => i + 2).map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label={`Kursy (${n} liczb oddzielonych przecinkiem)`}>
          <input
            className={inputCls}
            inputMode="decimal"
            value={oddsInput}
            onChange={(e) => setOddsInput(e.target.value)}
            placeholder="np. 1.80, 2.10, 2.50"
          />
        </Field>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <Field label="Stawka za jedną kombinację (zł)">
          <input
            className={inputCls}
            inputMode="decimal"
            value={perComboStake}
            onChange={(e) => setPerComboStake(e.target.value)}
            placeholder="np. 10"
          />
        </Field>
        <Field label="Ile zdarzeń trafionych (scenariusz)">
          <select className={inputCls} value={hitCount} onChange={(e) => setHitCount(e.target.value)}>
            <option value="all">wszystkie N ({n})</option>
            {Array.from({ length: n }, (_, i) => n - i - 1)
              .filter((v) => v >= k)
              .map((v) => (
                <option key={v} value={v}>
                  {v} z {n} trafionych
                </option>
              ))}
          </select>
        </Field>
      </div>

      {parsed ? (
        <div className="mt-6 rounded-2xl bg-slate-50 p-4 md:p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            System {k} z {n} — {parsed.cCount} kombinacji
          </p>
          <ResultRow label="Stawka łączna" value={formatPln(parsed.totalStake)} />
          <ResultRow
            label={`Zwrot w scenariuszu: ${parsed.hitScenario}`}
            value={formatPln(parsed.hitZwrot)}
          />
          <ResultRow label="Podatek 12%" value={formatPln(parsed.podatek)} tone="negative" />
          <ResultRow
            label="Zysk netto w tym scenariuszu"
            value={formatPln(parsed.zyskNetto)}
            tone={parsed.zyskNetto >= 0 ? "positive" : "negative"}
            emphasis
          />
          <ResultRow
            label="Maksymalny zwrot (wszystkie N trafione)"
            value={formatPln(parsed.maxZwrot)}
            tone="muted"
          />
        </div>
      ) : (
        <p className="mt-6 text-sm text-slate-500">
          Wprowadź {n} kursów (oddzielonych przecinkiem) i poprawną stawkę za kombinację.
        </p>
      )}
    </CalculatorShell>
  );
}
