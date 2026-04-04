"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Casino } from "@/lib/types";

function baselineVotes(casino: Casino) {
  const total = Math.max(casino.votesCount, 24);
  const upRatio = Math.min(0.92, Math.max(0.52, 0.45 + casino.ratingOverall * 0.11));
  const baseUp = Math.round(total * upRatio);
  const baseDown = Math.max(12, total - baseUp);
  return { baseUp, baseDown };
}

type Props = {
  casino: Casino;
  variant?: "compact" | "comfortable";
};

export function CasinoOpinionRow({ casino, variant = "comfortable" }: Props) {
  const { baseUp, baseDown } = useMemo(() => baselineVotes(casino), [casino]);
  const storageKey = `casino-vote:${casino.id}`;

  const [vote, setVote] = useState<"up" | "down" | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw === "up" || raw === "down") setVote(raw);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, [storageKey]);

  const upDisplay = baseUp + (vote === "up" ? 1 : 0);
  const downDisplay = baseDown + (vote === "down" ? 1 : 0);

  const setChoice = useCallback(
    (next: "up" | "down") => {
      setVote((prev) => {
        const resolved = prev === next ? null : next;
        try {
          if (resolved) localStorage.setItem(storageKey, resolved);
          else localStorage.removeItem(storageKey);
        } catch {
          /* ignore */
        }
        return resolved;
      });
    },
    [storageKey],
  );

  const compact = variant === "compact";

  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200/90 bg-gradient-to-r from-slate-50 to-white ${compact ? "px-3 py-2" : "px-4 py-3"}`}
    >
      <p className={`font-medium text-slate-700 ${compact ? "text-xs" : "text-sm"}`}>
        Czy polecasz to kasyno?
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setChoice("up")}
          aria-pressed={vote === "up"}
          className={`inline-flex items-center gap-1.5 rounded-lg border font-semibold transition ${
            vote === "up"
              ? "border-emerald-400 bg-emerald-50 text-emerald-900"
              : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/50"
          } ${compact ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm"}`}
        >
          <span aria-hidden>👍</span>
          <span>{hydrated ? upDisplay : baseUp}</span>
        </button>
        <button
          type="button"
          onClick={() => setChoice("down")}
          aria-pressed={vote === "down"}
          className={`inline-flex items-center gap-1.5 rounded-lg border font-semibold transition ${
            vote === "down"
              ? "border-rose-400 bg-rose-50 text-rose-900"
              : "border-slate-200 bg-white text-slate-700 hover:border-rose-300 hover:bg-rose-50/50"
          } ${compact ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm"}`}
        >
          <span aria-hidden>👎</span>
          <span>{hydrated ? downDisplay : baseDown}</span>
        </button>
      </div>
    </div>
  );
}
