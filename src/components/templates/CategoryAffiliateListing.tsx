"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FiltersBar } from "@/components/ui/FiltersBar";
import { CasinoRatingCard } from "@/components/casino/CasinoRatingCard";
import { BonusCard } from "@/components/ui/BonusCard";
import type { Casino, CategoryPageContent } from "@/lib/types";

type Props = {
  content: CategoryPageContent;
  casinos: Casino[];
};

function parseDate(s: string) {
  const t = Date.parse(s);
  return Number.isNaN(t) ? 0 : t;
}

export function CategoryAffiliateListing({ content, casinos }: Props) {
  const tags = content.filterTags ?? ["Wszystkie", "Popularne"];
  const [active, setActive] = useState(tags[0] ?? "Wszystkie");
  const kind = content.listingKind ?? "bonus";

  const filtered = useMemo(() => {
    let list = [...casinos];
    if (kind === "bonus") {
      if (active === "Niski warunek obrotu") {
        list = list.filter((c) => /x3[0-5]|x25|x20/i.test(c.wager));
      } else if (active === "Najnowsze bonusy") {
        list.sort((a, b) => parseDate(b.addedDate) - parseDate(a.addedDate));
      } else if (active === "Popularne") {
        list = list.filter((c) => c.isPopular);
        if (!list.length) list = [...casinos];
      }
    } else if (kind === "spins") {
      if (active === "Bez depozytu") {
        list = list.filter((c) => c.isNew || /bez depozytu|darmowe spiny/i.test(c.welcomeBonus));
      } else if (active === "Za rejestrację") {
        list = list.filter((c) => c.isNew);
        if (!list.length) list = [...casinos].slice(0, 12);
      } else if (active === "Popularne") {
        list = list.filter((c) => c.isPopular);
        if (!list.length) list = [...casinos];
      }
    } else if (kind === "cash") {
      if (active === "Najnowsze oferty") {
        list.sort((a, b) => parseDate(b.addedDate) - parseDate(a.addedDate));
      } else if (active === "Wysokie oceny") {
        list.sort((a, b) => b.ratingOverall - a.ratingOverall);
      } else if (active === "Popularne") {
        list = list.filter((c) => c.isPopular);
        if (!list.length) list = [...casinos];
      }
    } else if (active === "Popularne") {
      list = list.filter((c) => c.isPopular);
      if (!list.length) list = [...casinos];
    }
    if (active === "Wszystkie" || !active) {
      list.sort((a, b) => b.ratingOverall - a.ratingOverall);
    }
    return list;
  }, [active, casinos, kind]);

  const topFive = useMemo(
    () => [...casinos].sort((a, b) => b.ratingOverall - a.ratingOverall).slice(0, 5),
    [casinos],
  );

  return (
    <>
      {content.comparisonIntro ? (
        <p className="max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 text-slate-700 shadow-sm">
          {content.comparisonIntro}
        </p>
      ) : null}
      {content.subpageLinks?.length ? (
        <section aria-labelledby="subpages-heading" className="space-y-4">
          <h2 id="subpages-heading" className="text-xl font-semibold text-slate-900">
            Powiązane podstrony
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.subpageLinks.map((l) => (
              <BonusCard key={l.href} href={l.href} title={l.label} teaser={l.teaser} />
            ))}
          </div>
        </section>
      ) : null}

      <section aria-labelledby="rank-aff-heading" className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <h2 id="rank-aff-heading" className="text-xl font-semibold text-slate-900">
            Ranking operatorów
          </h2>
          <FiltersBar tags={tags} active={active} onChange={setActive} />
        </div>
        <div className="flex flex-col gap-6">
          {filtered.map((c, i) => (
            <CasinoRatingCard key={c.id} casino={c} rank={i + 1} />
          ))}
        </div>
      </section>

      <section className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <h2 className="border-b border-slate-100 px-5 py-4 text-lg font-bold text-slate-900">
          Skrót TOP 5 — szybkie porównanie
        </h2>
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-600">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Kasyno</th>
              <th className="px-4 py-3">Ocena</th>
              <th className="px-4 py-3">Bonus (skrót)</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {topFive.map((c, idx) => (
              <tr key={c.id} className="text-slate-700">
                <td className="px-4 py-3 font-semibold text-slate-900">{idx + 1}</td>
                <td className="px-4 py-3 font-medium text-slate-900">{c.name}</td>
                <td className="px-4 py-3">{c.ratingOverall.toFixed(1)}</td>
                <td className="max-w-xs truncate px-4 py-3">{c.welcomeBonus}</td>
                <td className="px-4 py-3">
                  <Link href={c.reviewUrl} className="font-semibold text-brand-700 hover:underline">
                    Recenzja
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
