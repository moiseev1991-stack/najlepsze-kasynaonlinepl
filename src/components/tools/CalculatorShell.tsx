import type { ReactNode } from "react";

type Props = {
  title?: string;
  children: ReactNode;
};

export function CalculatorShell({ title, children }: Props) {
  return (
    <section className="overflow-hidden rounded-3xl border border-brand-200 bg-white shadow-card">
      {title ? (
        <header className="border-b border-brand-100 bg-gradient-to-r from-brand-50 to-white px-5 py-4 md:px-6">
          <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        </header>
      ) : null}
      <div className="p-5 md:p-6">{children}</div>
    </section>
  );
}

type FieldProps = {
  label: string;
  hint?: string;
  children: ReactNode;
};

export function Field({ label, hint, children }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-slate-800">{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-xs text-slate-500">{hint}</span> : null}
    </label>
  );
}

export const inputCls =
  "w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-base font-medium text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/25";

type ResultRowProps = {
  label: string;
  value: string;
  tone?: "default" | "positive" | "negative" | "muted";
  emphasis?: boolean;
};

export function ResultRow({ label, value, tone = "default", emphasis }: ResultRowProps) {
  const toneCls =
    tone === "positive"
      ? "text-emerald-700"
      : tone === "negative"
        ? "text-rose-700"
        : tone === "muted"
          ? "text-slate-500"
          : "text-slate-900";
  return (
    <div
      className={`flex items-baseline justify-between gap-3 border-b border-slate-100 py-2.5 last:border-b-0 ${
        emphasis ? "border-b-2 border-slate-200 pt-3 font-bold" : ""
      }`}
    >
      <span className="text-sm text-slate-600">{label}</span>
      <span className={`text-right font-semibold tabular-nums ${toneCls} ${emphasis ? "text-lg" : ""}`}>
        {value}
      </span>
    </div>
  );
}

export function formatPln(v: number): string {
  if (!Number.isFinite(v)) return "—";
  return v.toLocaleString("pl-PL", { style: "currency", currency: "PLN", maximumFractionDigits: 2 });
}

export function formatNumber(v: number, digits = 2): string {
  if (!Number.isFinite(v)) return "—";
  return v.toLocaleString("pl-PL", { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

export function formatPercent(v: number, digits = 2): string {
  if (!Number.isFinite(v)) return "—";
  return `${v.toLocaleString("pl-PL", { minimumFractionDigits: digits, maximumFractionDigits: digits })}%`;
}
