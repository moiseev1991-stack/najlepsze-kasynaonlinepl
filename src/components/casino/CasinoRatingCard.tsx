import Image from "next/image";
import Link from "next/link";
import type { Casino } from "@/lib/types";
import { BonusTags } from "@/components/ui/BonusTags";
import { RatingBadge } from "@/components/ui/RatingBadge";
import { CasinoQuickFacts } from "@/components/casino/CasinoQuickFacts";
import { CasinoOpinionRow } from "@/components/casino/CasinoOpinionRow";
import { CasinoCardExpandSection } from "@/components/casino/CasinoCardExpandSection";

type Props = {
  casino: Casino;
  rank?: number;
};

/** Większa karta porównawcza pod ranking / stronę główną */
export function CasinoRatingCard({ casino, rank }: Props) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-nk-border/90 bg-nk-surface/95 shadow-card transition duration-300 hover:-translate-y-0.5 hover:shadow-cardHover md:flex-row">
      <div className="flex flex-1 flex-col p-6 md:flex-row md:gap-6 md:p-7">
        {rank ? (
          <span className="mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-nk-navy to-brand-600 text-xl font-bold text-white shadow-md ring-1 ring-white/20 md:mb-0">
            {rank}
          </span>
        ) : null}
        <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl border border-nk-border/70 bg-gradient-to-br from-nk-bg-alt to-white shadow-inner ring-1 ring-white/80 sm:h-36 sm:w-36">
          <Image
            src={casino.logo}
            alt={casino.name}
            width={144}
            height={144}
            className="h-full w-full object-contain p-2"
            unoptimized
          />
        </div>
        <div className="mt-4 min-w-0 flex-1 md:mt-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-bold text-nk-text">{casino.name}</h3>
            {casino.isTopRated ? (
              <span className="rounded-full bg-nk-warning/20 px-2.5 py-0.5 text-xs font-semibold text-amber-950">
                Top
              </span>
            ) : null}
            {casino.isNew ? (
              <span className="rounded-full bg-nk-success/15 px-2.5 py-0.5 text-xs font-semibold text-nk-success">
                Nowe
              </span>
            ) : null}
            {casino.isPopular ? (
              <span className="rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-semibold text-brand-900">
                Popularne
              </span>
            ) : null}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <RatingBadge value={casino.ratingOverall} size="lg" />
            <span className="text-sm text-nk-muted">Zaufanie: {casino.trustIndex}/100</span>
            <span className="text-sm text-nk-muted">{casino.votesCount} opinii</span>
          </div>
          <p className="mt-4 text-sm font-medium text-nk-text">{casino.welcomeBonus}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-nk-muted">
            {casino.promoCode ? (
              <span className="rounded-xl border border-nk-border bg-nk-bg-alt px-2 py-1 font-mono font-semibold text-nk-text">
                Kod: {casino.promoCode}
              </span>
            ) : null}
            <span>
              Licencja: {casino.license} · od {casino.foundedYear} r.
            </span>
            {casino.timeLimit ? <span className="text-nk-muted">· {casino.timeLimit}</span> : null}
          </div>
          <div className="mt-2">
            <BonusTags types={casino.bonusTypes} />
          </div>
          <div className="mt-4">
            <CasinoQuickFacts casino={casino} />
          </div>
          {casino.features.length ? (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {casino.features.map((f) => (
                <span
                  key={f}
                  className="rounded-lg border border-nk-warning/25 bg-nk-warning/10 px-2 py-0.5 text-xs font-medium text-amber-950"
                >
                  {f}
                </span>
              ))}
            </div>
          ) : null}
          <div className="mt-3 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-medium text-nk-muted">
              <span>Wskaźnik zaufania</span>
              <span className="text-nk-text">{casino.trustIndex}/100</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-nk-border/80">
              <div
                className="h-full rounded-full bg-gradient-to-r from-nk-success to-brand-500 transition-[width] duration-500"
                style={{ width: `${casino.trustIndex}%` }}
              />
            </div>
          </div>
          <div className="mt-4">
            <CasinoOpinionRow casino={casino} variant="comfortable" />
          </div>
          <CasinoCardExpandSection casino={casino} />
        </div>
      </div>
      <div className="flex flex-col justify-center gap-2 border-t border-nk-border/80 bg-gradient-to-b from-nk-bg-alt/60 to-nk-surface p-6 md:w-56 md:border-l md:border-t-0 md:bg-nk-surface/95 md:shadow-[-8px_0_24px_-12px_rgba(23,50,77,0.12)]">
        <Link
          href={casino.reviewUrl}
          className="inline-flex items-center justify-center rounded-2xl border border-nk-border bg-nk-surface px-4 py-3 text-center text-sm font-semibold text-nk-text transition hover:border-brand-400 hover:text-brand-800"
        >
          Recenzja
        </Link>
        <a
          href={casino.affiliateUrl}
          className="inline-flex items-center justify-center rounded-2xl bg-brand-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-md transition hover:bg-brand-700 hover:shadow-cardHover"
          rel="nofollow sponsored noopener noreferrer"
          target="_blank"
        >
          Zarejestruj się
        </a>
      </div>
    </article>
  );
}
