import Image from "next/image";
import Link from "next/link";
import type { Author, Casino } from "@/lib/types";
import { RatingBadge } from "@/components/ui/RatingBadge";
import { paymentHref } from "@/lib/badge-links";

type Props = {
  casino: Casino;
  author?: Author;
  updatedLabel?: string;
};

export function ReviewHero({ casino, author, updatedLabel }: Props) {
  const updated = updatedLabel ?? `Ostatnia aktualizacja: ${casino.addedDate}`;
  const topPayments = casino.paymentMethods.slice(0, 4);

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card">
      <div className="relative bg-gradient-to-br from-nk-navy via-brand-700 to-brand-600 px-6 py-8 text-white md:px-10 md:py-10">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.18), transparent 45%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.12), transparent 50%)",
          }}
          aria-hidden
        />

        <div className="relative grid gap-6 md:grid-cols-[auto_1fr_auto] md:items-center">
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-white/95 p-2 shadow-lg ring-1 ring-white/40 sm:h-32 sm:w-32 md:h-36 md:w-36">
            <Image
              src={casino.logo}
              alt={casino.name}
              width={144}
              height={144}
              className="h-full w-full object-contain"
              unoptimized
            />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                Recenzja redakcyjna
              </p>
              {casino.isTopRated ? (
                <span className="rounded-full bg-amber-400/90 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-amber-950">
                  Top
                </span>
              ) : null}
              {casino.isNew ? (
                <span className="rounded-full bg-emerald-400/90 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-emerald-950">
                  Nowe
                </span>
              ) : null}
              {casino.isPopular ? (
                <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white ring-1 ring-white/30">
                  Popularne
                </span>
              ) : null}
            </div>
            <h1 className="mt-2 text-balance text-3xl font-bold leading-tight md:text-4xl">
              {casino.name}
            </h1>
            <p className="mt-3 text-sm font-medium text-white/85 md:text-base">
              {casino.welcomeBonus}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/70">
              <span>Licencja: {casino.license}</span>
              <span aria-hidden>·</span>
              <span>od {casino.foundedYear} r.</span>
              <span aria-hidden>·</span>
              <span>{updated}</span>
            </div>
          </div>

          <div className="flex w-full flex-col gap-2 md:w-52">
            <a
              href={casino.affiliateUrl}
              className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-bold text-brand-800 shadow-md transition hover:bg-brand-50 hover:shadow-lg"
              rel="nofollow sponsored noopener noreferrer"
              target="_blank"
            >
              Zarejestruj się
            </a>
            {casino.promoCode ? (
              <p className="text-center text-xs text-white/75">
                Kod:{" "}
                <span className="rounded-md bg-white/10 px-2 py-0.5 font-mono font-semibold text-white ring-1 ring-white/30">
                  {casino.promoCode}
                </span>
              </p>
            ) : null}
            {author ? (
              <p className="text-center text-[11px] text-white/65">
                Autor: <span className="font-semibold text-white">{author.name}</span>
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <dl className="grid gap-px bg-slate-100 sm:grid-cols-3">
        <div className="flex flex-col gap-1 bg-white p-5">
          <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Nasza ocena
          </dt>
          <dd>
            <RatingBadge value={casino.ratingOverall} size="lg" />
          </dd>
        </div>
        <div className="flex flex-col gap-1 bg-white p-5">
          <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Indeks bezpieczeństwa
          </dt>
          <dd className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{casino.trustIndex}</span>
            <span className="text-sm text-slate-500">/100</span>
          </dd>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-brand-500 transition-[width] duration-500"
              style={{ width: `${casino.trustIndex}%` }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 bg-white p-5">
          <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Ocena graczy
          </dt>
          <dd className="flex flex-wrap items-center gap-2">
            <RatingBadge value={casino.ratingUsers} label="Średnia" size="sm" />
            <span className="text-sm text-slate-600">{casino.votesCount} ocen</span>
          </dd>
        </div>
      </dl>

      <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 bg-slate-50/60 px-6 py-4 md:px-10">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Szybkie fakty
        </span>
        <span className="inline-flex items-center rounded-lg bg-white px-2.5 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200">
          Od {casino.minDeposit}
        </span>
        <Link
          href="/kasyno-szybkie-wyplaty/"
          className="inline-flex items-center rounded-lg bg-white px-2.5 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200 transition hover:bg-brand-50 hover:text-brand-800 hover:ring-brand-300"
        >
          Wypłata ~{casino.withdrawalTime}
        </Link>
        <Link
          href="/automaty-online/"
          className="inline-flex items-center rounded-lg bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-900 ring-1 ring-violet-200/80 transition hover:bg-violet-100"
        >
          {casino.gameCount.toLocaleString("pl-PL")}+ gier
        </Link>
        {topPayments.map((m) => {
          const href = paymentHref(m);
          const cls =
            "inline-flex items-center rounded-lg bg-white px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200";
          return href ? (
            <Link
              key={m}
              href={href}
              className={`${cls} transition hover:bg-brand-50 hover:text-brand-800 hover:ring-brand-300`}
            >
              {m}
            </Link>
          ) : (
            <span key={m} className={cls}>
              {m}
            </span>
          );
        })}
      </div>
    </section>
  );
}
