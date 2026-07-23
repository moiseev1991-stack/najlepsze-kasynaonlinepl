import { Fragment } from "react";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { homeContent } from "@/lib/home-content";

/** Wyróżnione marki — noty redakcyjne z linkami do oficjalnych stron marek. */
export function HomeBrandSpotlight() {
  const { heading, intro, brands } = homeContent.brandSpotlight;
  if (!brands.length) return null;

  return (
    <SectionBackground
      variant="tinted"
      aria-labelledby="marki-pod-lupa"
      className="space-y-6"
    >
      <div className="max-w-3xl space-y-2">
        <h2 id="marki-pod-lupa" className="text-xl font-semibold text-nk-text">
          {heading}
        </h2>
        <p className="text-sm text-nk-muted">{intro}</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {brands.map((brand) => (
          <SurfaceCard key={brand.name} className="flex flex-col gap-3 px-5 py-6 md:px-6">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-nk-text">{brand.name}</h3>
              <span className="rounded-full border border-brand-300/70 bg-brand-50/70 px-3 py-1 text-xs font-medium text-brand-700">
                {brand.accent}
              </span>
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
                    className="font-medium text-brand-700 underline decoration-brand-300 underline-offset-2 transition hover:decoration-brand-700"
                  >
                    {token.anchor}
                  </a>
                ),
              )}
            </p>
          </SurfaceCard>
        ))}
      </div>
    </SectionBackground>
  );
}
