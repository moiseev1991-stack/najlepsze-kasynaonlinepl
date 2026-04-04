"use client";

import { useState } from "react";
import Link from "next/link";
import type { Casino } from "@/lib/types";

export function CasinoCardExpandSection({ casino }: { casino: Casino }) {
  const [open, setOpen] = useState(false);
  const reports = casino.problemsReportOptions ?? [];
  const hasExpand = Boolean(casino.detailsMoreInfo || reports.length);

  if (!hasExpand) return null;

  return (
    <div className="mt-4 border-t border-slate-100 pt-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="text-sm font-semibold text-brand-800 hover:underline"
        aria-expanded={open}
      >
        {open ? "Zwiń szczegóły" : "Rozwiń więcej informacji"}
      </button>
      {open ? (
        <div className="mt-3 space-y-3 text-sm text-slate-600">
          {casino.detailsMoreInfo ? <p>{casino.detailsMoreInfo}</p> : null}
          {reports.length ? (
            <div className="flex flex-wrap gap-2">
              {reports.map((r) => (
                <Link
                  key={r.href + r.label}
                  href={r.href}
                  className="text-xs font-medium text-slate-500 underline-offset-2 hover:text-brand-800 hover:underline"
                  {...(r.href.startsWith("http") ? { target: "_blank", rel: "nofollow noopener noreferrer" } : {})}
                >
                  {r.label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
