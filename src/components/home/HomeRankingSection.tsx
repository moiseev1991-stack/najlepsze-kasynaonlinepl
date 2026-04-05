"use client";

import { useMemo, useState } from "react";
import { CasinoRatingCard } from "@/components/casino/CasinoRatingCard";
import { FiltersBar } from "@/components/ui/FiltersBar";
import type { Casino } from "@/lib/types";

const VULKANSPIELE_SLUG = "vulkanspiele-casino";

/** Editorial: keep Vulkanspiele visible in the top 3 on rating-sorted views. */
function pinVulkanspieleThird(list: Casino[]): Casino[] {
  const vi = list.findIndex((c) => c.slug === VULKANSPIELE_SLUG);
  if (vi < 0) return list;
  const v = list[vi]!;
  const rest = list.filter((c) => c.slug !== VULKANSPIELE_SLUG);
  if (rest.length < 2) return list;
  return [...rest.slice(0, 2), v, ...rest.slice(2)];
}

type Props = {
  casinos: Casino[];
  filterTags: string[];
};

export function HomeRankingSection({ casinos, filterTags }: Props) {
  const [active, setActive] = useState(filterTags[0] ?? "Wszystkie kasyna");

  const filtered = useMemo(() => {
    const byRating = () => [...casinos].sort((a, b) => b.ratingOverall - a.ratingOverall);
    const skipVulkanPin =
      active === "Nowe kasyna" ||
      active === "Nowe" ||
      active === "Popularny" ||
      active === "Popularne" ||
      active === "Szybkie wypłaty";

    let list: Casino[];
    if (active === "Nowe kasyna" || active === "Nowe") list = casinos.filter((c) => c.isNew);
    else if (active === "Popularny" || active === "Popularne") {
      const p = casinos.filter((c) => c.isPopular);
      list = p.length ? p : casinos;
    } else if (active === "Najwyższa ocena" || active === "Wysokie oceny") list = byRating();
    else if (active === "Szybkie wypłaty") list = casinos.filter((c) => c.withdrawalTime.includes("24"));
    else if (active === "Wszystkie kasyna" || active === "Wszystkie") list = byRating();
    else list = byRating();

    if (skipVulkanPin) return list;
    return pinVulkanspieleThird(list);
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
