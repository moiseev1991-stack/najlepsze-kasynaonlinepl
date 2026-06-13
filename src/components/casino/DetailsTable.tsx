import Link from "next/link";
import type { Casino } from "@/lib/types";

type Props = { casino: Casino };

type Row = {
  label: string;
  value: string;
  href?: string;
  icon: JSX.Element;
  tone: "indigo" | "emerald" | "violet" | "amber" | "sky" | "rose";
};

const tones: Record<Row["tone"], { bg: string; ring: string; text: string; iconBg: string }> = {
  indigo: { bg: "bg-indigo-50/70", ring: "ring-indigo-200/70", text: "text-indigo-950", iconBg: "bg-indigo-100 text-indigo-700" },
  emerald: { bg: "bg-emerald-50/70", ring: "ring-emerald-200/70", text: "text-emerald-950", iconBg: "bg-emerald-100 text-emerald-700" },
  violet: { bg: "bg-violet-50/70", ring: "ring-violet-200/70", text: "text-violet-950", iconBg: "bg-violet-100 text-violet-700" },
  amber: { bg: "bg-amber-50/70", ring: "ring-amber-200/80", text: "text-amber-950", iconBg: "bg-amber-100 text-amber-700" },
  sky: { bg: "bg-sky-50/70", ring: "ring-sky-200/70", text: "text-sky-950", iconBg: "bg-sky-100 text-sky-700" },
  rose: { bg: "bg-rose-50/70", ring: "ring-rose-200/70", text: "text-rose-950", iconBg: "bg-rose-100 text-rose-700" },
};

const Icon = {
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path strokeLinecap="round" d="M16 3v4M8 3v4M3 11h18" />
    </svg>
  ),
  joystick: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <rect x="3" y="9" width="18" height="10" rx="3" />
      <path strokeLinecap="round" d="M8 14h2m-1-1v2M16 14h.01M14 13h.01" />
    </svg>
  ),
  coin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M12 6v2m0 8v2M9 10.5c0-1 1.3-1.5 3-1.5s3 .5 3 1.5-1.3 1.5-3 1.5-3 .5-3 1.5 1.3 1.5 3 1.5 3-.5 3-1.5" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M12 7v5l3 2" />
    </svg>
  ),
  gift: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <rect x="3" y="9" width="18" height="12" rx="2" />
      <path strokeLinecap="round" d="M3 13h18M12 9v12M9 9c-1.5 0-3-1-3-3s2-3 3-2c1 1 3 5 3 5s-2.5 0-3 0zM15 9c1.5 0 3-1 3-3s-2-3-3-2c-1 1-3 5-3 5s2.5 0 3 0z" />
    </svg>
  ),
};

export function DetailsTable({ casino }: Props) {
  const rows: Row[] = [
    { label: "Licencja", value: casino.license, icon: Icon.shield, tone: "indigo" },
    { label: "Rok założenia", value: String(casino.foundedYear), icon: Icon.calendar, tone: "sky" },
    {
      label: "Liczba gier (szac.)",
      value: casino.gameCount.toLocaleString("pl-PL"),
      href: "/automaty-online/",
      icon: Icon.joystick,
      tone: "violet",
    },
    { label: "Minimalny depozyt", value: casino.minDeposit, icon: Icon.coin, tone: "emerald" },
    {
      label: "Czas wypłaty",
      value: casino.withdrawalTime,
      href: "/kasyno-szybkie-wyplaty/",
      icon: Icon.clock,
      tone: "amber",
    },
    { label: "Obrót bonusu", value: casino.wager, icon: Icon.gift, tone: "rose" },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {rows.map((row) => {
        const t = tones[row.tone];
        const inner = (
          <div className={`flex items-start gap-3 rounded-2xl ${t.bg} p-4 ring-1 ${t.ring}`}>
            <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${t.iconBg}`}>
              {row.icon}
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{row.label}</p>
              <p className={`mt-1 truncate text-base font-bold ${t.text}`}>{row.value}</p>
            </div>
          </div>
        );
        return row.href ? (
          <Link
            key={row.label}
            href={row.href}
            className="block transition hover:-translate-y-0.5 hover:shadow-sm"
          >
            {inner}
          </Link>
        ) : (
          <div key={row.label}>{inner}</div>
        );
      })}
    </div>
  );
}
