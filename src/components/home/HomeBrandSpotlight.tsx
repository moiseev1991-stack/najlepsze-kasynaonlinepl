import { Fragment } from "react";
import Image from "next/image";
import { homeContent } from "@/lib/home-content";

/** Wyróżnione marki — wstawka między pozycjami rankingu (jaskrawy blok z logo). */
export function HomeBrandSpotlight() {
  const { heading, intro, brands } = homeContent.brandSpotlight;
  if (!brands.length) return null;

  return (
    <section
      aria-labelledby="marki-pod-lupa"
      className="relative overflow-hidden rounded-4xl border-2 border-brand-400/60 bg-gradient-to-br from-brand-50 via-white to-nk-rose/40 p-5 shadow-cardHover md:p-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-300/25 blur-3xl"
      />
      <div className="relative space-y-5">
        <div className="max-w-3xl space-y-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-sm">
            ★ Polecane marki
          </span>
          <h2 id="marki-pod-lupa" className="text-xl font-bold text-nk-text md:text-2xl">
            {heading}
          </h2>
          <p className="text-sm text-nk-muted">{intro}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex flex-col gap-3 rounded-3xl border border-brand-200 bg-white/95 p-4 shadow-card transition hover:-translate-y-0.5 hover:shadow-cardHover md:p-5"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-nk-border/70 bg-gradient-to-br from-nk-bg-alt to-white shadow-inner sm:h-16 sm:w-16">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={64}
                    height={64}
                    className="h-full w-full object-contain p-1.5"
                    unoptimized
                  />
                </span>
                <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-1">
                  <h3 className="text-lg font-bold text-nk-text">{brand.name}</h3>
                  <span className="rounded-full border border-brand-300/70 bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
                    {brand.accent}
                  </span>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-nk-muted">
                {brand.body.map((token, i) =>
                  typeof token === "string" ? (
                    <Fragment key={i}>{token}</Fragment>
                  ) : (
                    <a
                      key={i}
                      href={token.href}
                      target="_blank"
                      rel="noopener"
                      className="font-semibold text-brand-700 underline decoration-brand-400 decoration-2 underline-offset-2 transition hover:text-brand-800 hover:decoration-brand-700"
                    >
                      {token.anchor}
                    </a>
                  ),
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
