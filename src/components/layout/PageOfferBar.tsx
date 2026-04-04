import Link from "next/link";
import { pageOfferConfig } from "@/config/page-offer";

export function PageOfferBar() {
  if (!pageOfferConfig.enabled) return null;

  const showDownload = Boolean(pageOfferConfig.download.href?.trim());

  return (
    <div className="relative border-b border-nk-border/80 bg-gradient-to-r from-nk-rose/30 via-nk-surface/95 to-nk-blue-soft/40">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-nk-red/40 to-brand-500/30"
        aria-hidden
      />
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:pl-5">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <div className="relative h-14 w-[7.5rem] shrink-0 overflow-hidden rounded-2xl border border-nk-border/80 bg-nk-surface shadow-card sm:h-[3.75rem] sm:w-[8.5rem]">
            {/* eslint-disable-next-line @next/next/no-img-element -- unikamy next/image w layout (stabilność dev na Windows). */}
            <img
              src={pageOfferConfig.logoSrc}
              alt={pageOfferConfig.brandName}
              width={136}
              height={60}
              className="h-full w-full object-contain p-1.5"
              loading="eager"
              decoding="async"
            />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-nk-muted">Oferta partnerska</p>
            <p className="truncate text-base font-bold text-nk-text">{pageOfferConfig.brandName}</p>
            <p className="mt-0.5 line-clamp-2 text-sm text-nk-muted">{pageOfferConfig.tagline}</p>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2 sm:justify-end">
          <a
            href={pageOfferConfig.register.href}
            className="inline-flex min-h-[44px] min-w-[10rem] items-center justify-center rounded-2xl bg-brand-600 px-5 py-2.5 text-center text-sm font-bold text-white shadow-md transition hover:bg-brand-700 hover:shadow-cardHover"
            rel="nofollow sponsored noopener noreferrer"
            target="_blank"
          >
            {pageOfferConfig.register.label}
          </a>
          {showDownload ? (
            <a
              href={pageOfferConfig.download.href}
              className="inline-flex min-h-[44px] min-w-[10rem] items-center justify-center rounded-2xl border-2 border-nk-navy/80 bg-nk-surface px-5 py-2.5 text-center text-sm font-bold text-nk-text transition hover:border-nk-navy hover:bg-nk-bg-alt"
              rel="nofollow sponsored noopener noreferrer"
              target="_blank"
            >
              {pageOfferConfig.download.label}
            </a>
          ) : null}
          <Link
            href="/#przewodnik-recenzji"
            className="inline-flex min-h-[44px] items-center justify-center self-center rounded-xl px-3 text-sm font-semibold text-nk-muted underline-offset-4 transition hover:text-brand-700 hover:underline"
          >
            Więcej recenzji
          </Link>
        </div>
      </div>
    </div>
  );
}
