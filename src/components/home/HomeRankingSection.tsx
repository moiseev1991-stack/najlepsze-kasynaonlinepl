"use client";

import { useMemo, useState } from "react";
import { CasinoRatingCard } from "@/components/casino/CasinoRatingCard";
import { FiltersBar } from "@/components/ui/FiltersBar";
import type { Casino } from "@/lib/types";

type Props = {
  casinos: Casino[];
  filterTags: string[];
};

export function HomeRankingSection({ casinos, filterTags }: Props) {
  const [active, setActive] = useState(filterTags[0] ?? "Wszystkie kasyna");

  const filtered = useMemo(() => {
    if (active === "Nowe kasyna" || active === "Nowe") return casinos.filter((c) => c.isNew);
    if (active === "Popularny" || active === "Popularne") {
      const p = casinos.filter((c) => c.isPopular);
      return p.length ? p : casinos;
    }
    if (active === "Najwyższa ocena" || active === "Wysokie oceny")
      return [...casinos].sort((a, b) => b.ratingOverall - a.ratingOverall);
    if (active === "Szybkie wypłaty") return casinos.filter((c) => c.withdrawalTime.includes("24"));
    if (active === "Wszystkie kasyna" || active === "Wszystkie")
      return [...casinos].sort((a, b) => b.ratingOverall - a.ratingOverall);
    return [...casinos].sort((a, b) => b.ratingOverall - a.ratingOverall);
  }, [active, casinos]);

  return (
    <div className="space-y-6">
      <FiltersBar tags={filterTags} active={active} onChange={setActive} />
      <div className="flex flex-col gap-6">
        {filtered.map((c, idx) => (
          <CasinoRatingCard key={c.id} casino={c} rank={idx + 1} />
        ))}
      </div>
    </div>
  );
}
