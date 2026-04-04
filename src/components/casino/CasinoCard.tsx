import Image from "next/image";
import Link from "next/link";
import type { Casino } from "@/lib/types";
import { BonusTags } from "@/components/ui/BonusTags";
import { RatingBadge } from "@/components/ui/RatingBadge";
import { CasinoQuickFacts } from "@/components/casino/CasinoQuickFacts";
import { CasinoOpinionRow } from "@/components/casino/CasinoOpinionRow";

type Props = {
  casino: Casino;
  rank?: number;
};

export function CasinoCard({ casino, rank }: Props) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-nk-border/90 bg-nk-surface/95 shadow-card transition duration-300 hover:-translate-y-0.5 hover:shadow-cardHover">
      <div className="flex items-start gap-4 p-5 md:p-6">
        {rank ? (
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-100 to-nk-blue-soft text-lg font-bold text-brand-800 shadow-sm ring-1 ring-brand-200/60">
            {rank}
          </span>
        ) : null}
        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-nk-border/60 bg-gradient-to-br from-nk-bg-alt to-nk-surface shadow-inner sm:h-32 sm:w-32">
          <Image
            src={casino.logo}
            alt={casino.name}
            width={128}
            height={128}
            className="h-full w-full object-contain p-1.5"
            unoptimized
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-lg font-semibold text-nk-text">{casino.name}</h3>
            {casino.isNew ? (
              <span className="rounded-full bg-nk-success/15 px-2 py-0.5 text-xs font-semibold text-nk-success">
                Nowe
              </span>
            ) : null}
            {casino.isTopRated ? (
              <span className="rounded-full bg-nk-warning/20 px-2 py-0.5 text-xs font-semibold text-amber-950">
                Top
              </span>
            ) : null}
            {casino.isPopular ? (
              <span className="rounded-full bg-brand-100 px-2 py-0.5 text-xs font-semibold text-brand-900">
                Popularne
              </span>
            ) : null}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <RatingBadge value={casino.ratingOverall} />
            <span className="text-xs text-nk-muted">{casino.votesCount} opinii</span>
          </div>
        </div>
      </div>

      <div className="border-t border-nk-border/70 bg-gradient-to-b from-nk-bg-alt/50 to-nk-surface/80 px-5 py-4 md:px-6">
        <p className="text-sm font-medium text-nk-text">Bonus powitalny</p>
        <p className="mt-1 text-sm text-nk-muted">{casino.welcomeBonus}</p>
        <div className="mt-3">
          <BonusTags types={casino.bonusTypes} />
        </div>
        <div className="mt-3">
          <CasinoQuickFacts casino={casino} dense />
        </div>
        <div className="mt-3">
          <CasinoOpinionRow casino={casino} variant="compact" />
        </div>
      </div>

      <div className="mt-auto flex flex-wrap gap-2 border-t border-nk-border/70 bg-nk-surface/90 p-5 md:p-6">
        <Link
          href={casino.reviewUrl}
          className="inline-flex flex-1 items-center justify-center rounded-2xl border border-nk-border bg-nk-surface px-4 py-2.5 text-sm font-semibold text-nk-text transition hover:border-brand-300 hover:text-brand-800"
        >
          Recenzja
        </Link>
        <a
          href={casino.affiliateUrl}
          className="inline-flex flex-1 items-center justify-center rounded-2xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-brand-700 hover:shadow-cardHover"
          rel="nofollow sponsored noopener noreferrer"
          target="_blank"
        >
          Zarejestruj się
        </a>
      </div>
    </article>
  );
}
