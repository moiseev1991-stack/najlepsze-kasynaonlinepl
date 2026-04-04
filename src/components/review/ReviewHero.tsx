import Image from "next/image";
import type { Author, Casino } from "@/lib/types";
import { RatingBadge } from "@/components/ui/RatingBadge";

type Props = {
  casino: Casino;
  author?: Author;
  updatedLabel?: string;
};

export function ReviewHero({ casino, author, updatedLabel }: Props) {
  const updated = updatedLabel ?? `Ostatnia aktualizacja artykułu: ${casino.addedDate}`;

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card">
      <div className="grid gap-8 p-6 md:grid-cols-[1fr_auto] md:items-start md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <div className="relative h-44 w-44 shrink-0 overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-200 sm:h-48 sm:w-48">
            <Image
              src={casino.logo}
              alt={casino.name}
              width={192}
              height={192}
              className="h-full w-full object-contain p-2.5"
              unoptimized
            />
          </div>
          <div className="min-w-0">
            <h1 className="text-balance text-3xl font-bold text-slate-900 md:text-4xl">{casino.name}</h1>
            <p className="mt-2 text-sm font-medium text-slate-500">Recenzja redakcyjna</p>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
                <dt className="text-xs font-semibold uppercase text-slate-500">Nasza ocena</dt>
                <dd className="mt-2">
                  <RatingBadge value={casino.ratingOverall} size="lg" />
                </dd>
              </div>
              <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
                <dt className="text-xs font-semibold uppercase text-slate-500">Indeks bezpieczeństwa</dt>
                <dd className="mt-2 text-2xl font-bold text-slate-900">{casino.trustIndex}/100</dd>
              </div>
              <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
                <dt className="text-xs font-semibold uppercase text-slate-500">Ocena graczy</dt>
                <dd className="mt-2 flex flex-wrap items-center gap-2">
                  <RatingBadge value={casino.ratingUsers} label="Średnia" size="sm" />
                  <span className="text-sm text-slate-600">{casino.votesCount} ocen</span>
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-sm text-slate-500">{updated}</p>
            {author ? (
              <p className="mt-2 text-sm text-slate-600">
                Autor: <span className="font-semibold text-slate-900">{author.name}</span>
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
