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

function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 0l1.6 8.4L22 10l-8.4 1.6L12 20l-1.6-8.4L2 10l8.4-1.6L12 0z" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <circle cx="9" cy="8" r="3.5" />
      <path strokeLinecap="round" d="M2.5 20c.5-3.5 3.3-5.5 6.5-5.5s6 2 6.5 5.5" />
      <circle cx="17" cy="9" r="2.5" />
      <path strokeLinecap="round" d="M15.5 14.2c2.5.2 5 1.7 6 4.3" />
    </svg>
  );
}

export function ReviewHero({ casino, author, updatedLabel }: Props) {
  const updated = updatedLabel ?? `Ostatnia aktualizacja: ${casino.addedDate}`;
  const topPayments = casino.paymentMethods.slice(0, 4);

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card">
      <div className="relative overflow-hidden bg-gradient-to-br from-nk-navy via-brand-700 to-brand-600 px-6 py-8 text-white md:px-10 md:py-10">
        {/* Decorative background SVGs */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 18% 20%, rgba(255,255,255,0.18), transparent 45%), radial-gradient(circle at 82% 0%, rgba(255,255,255,0.12), transparent 50%)",
            }}
          />
          {/* dot grid pattern */}
          <svg className="absolute inset-0 h-full w-full opacity-[0.08]" aria-hidden>
            <defs>
              <pattern id="hero-dots" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-dots)" />
          </svg>
          {/* floating sparkles (decorative) */}
          <Sparkle className="absolute right-[18%] top-6 h-3 w-3 text-amber-200/80" />
          <Sparkle className="absolute right-[28%] top-16 h-5 w-5 text-white/40" />
          <Sparkle className="absolute right-[8%] bottom-10 h-4 w-4 text-amber-200/70" />
          <Sparkle className="absolute left-[35%] top-3 h-2.5 w-2.5 text-white/50" />
        </div>

        <div className="relative grid gap-6 md:grid-cols-[auto_1fr_minmax(0,18rem)] md:items-stretch">
          {/* Logo */}
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-white p-2 shadow-lg ring-1 ring-white/40 sm:h-32 sm:w-32 md:h-40 md:w-40">
            <Image
              src={casino.logo}
              alt={casino.name}
              width={160}
              height={160}
              className="h-full w-full object-contain"
              unoptimized
            />
          </div>

          {/* Title + meta */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                Recenzja redakcyjna
              </p>
              {casino.isTopRated ? (
                <span className="rounded-full bg-amber-400/95 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-amber-950">
                  Top
                </span>
              ) : null}
              {casino.isNew ? (
                <span className="rounded-full bg-emerald-400/95 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-emerald-950">
                  Nowe
                </span>
              ) : null}
              {casino.isPopular ? (
                <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white ring-1 ring-white/30">
                  Popularne
                </span>
              ) : null}
            </div>
            <h1 className="mt-2 text-balance text-3xl font-bold leading-tight md:text-[2.6rem] md:leading-[1.1]">
              {casino.name}
            </h1>
            <p className="mt-3 text-sm font-medium text-white/90 md:text-base">
              {casino.welcomeBonus}
            </p>
            <ul className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-white/75">
              <li className="inline-flex items-center gap-1.5">
                <ShieldIcon className="h-3.5 w-3.5 text-emerald-300" />
                {casino.license}
              </li>
              <li aria-hidden className="opacity-40">·</li>
              <li>od {casino.foundedYear} r.</li>
              <li aria-hidden className="opacity-40">·</li>
              <li>{updated}</li>
            </ul>
            {author ? (
              <p className="mt-2 text-xs text-white/65">
                Autor: <span className="font-semibold text-white">{author.name}</span>
              </p>
            ) : null}
          </div>

          {/* CTA panel */}
          <aside className="flex flex-col gap-3 rounded-2xl bg-white/10 p-4 ring-1 ring-white/20 backdrop-blur-sm md:p-5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-white/70">
                Oferta partnerska
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/95 px-2 py-0.5 text-[11px] font-bold text-amber-950">
                <StarIcon className="h-3 w-3" />
                {casino.ratingOverall.toFixed(1)}/5
              </span>
            </div>
            <div className="text-2xl font-bold leading-tight text-white">
              {casino.name}
            </div>
            <p className="text-xs text-white/80">
              Bonus powitalny dla czytelników — szczegóły u operatora
            </p>
            <a
              href={casino.affiliateUrl}
              className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-bold text-brand-800 shadow-md transition hover:bg-brand-50 hover:shadow-lg"
              rel="nofollow sponsored noopener noreferrer"
              target="_blank"
            >
              Zarejestruj się
            </a>
            {casino.promoCode ? (
              <p className="text-center text-xs text-white/85">
                Kod:{" "}
                <span className="rounded-md bg-white/15 px-2 py-0.5 font-mono font-semibold text-white ring-1 ring-white/30">
                  {casino.promoCode}
                </span>
              </p>
            ) : null}
            <Link
              href="/"
              className="text-center text-[11px] font-semibold uppercase tracking-wider text-white/70 underline-offset-4 hover:text-white hover:underline"
            >
              Więcej recenzji
            </Link>
          </aside>
        </div>
      </div>

      {/* Stat strip */}
      <dl className="grid gap-px bg-slate-100 sm:grid-cols-3">
        <div className="flex items-center gap-4 bg-white p-5">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
            <StarIcon className="h-5 w-5" />
          </span>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Nasza ocena
            </dt>
            <dd className="mt-1">
              <RatingBadge value={casino.ratingOverall} size="lg" />
            </dd>
          </div>
        </div>
        <div className="flex flex-col gap-2 bg-white p-5">
          <div className="flex items-center gap-4">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <ShieldIcon className="h-5 w-5" />
            </span>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Indeks bezpieczeństwa
              </dt>
              <dd className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-900">{casino.trustIndex}</span>
                <span className="text-sm text-slate-500">/100</span>
              </dd>
            </div>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-brand-500 transition-[width] duration-500"
              style={{ width: `${casino.trustIndex}%` }}
            />
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white p-5">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
            <UsersIcon className="h-5 w-5" />
          </span>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Ocena graczy
            </dt>
            <dd className="flex flex-wrap items-center gap-2">
              <RatingBadge value={casino.ratingUsers} label="Średnia" size="sm" />
              <span className="text-sm text-slate-600">{casino.votesCount} ocen</span>
            </dd>
          </div>
        </div>
      </dl>

      {/* Quick facts strip */}
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
