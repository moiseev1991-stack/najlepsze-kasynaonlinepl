import { siteConfig } from "@/lib/site-config";
import { FooterLinkColumns } from "@/components/layout/FooterLinkColumns";
import { BrandLogo } from "@/components/brand/BrandLogo";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-nk-footer text-slate-200">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
        aria-hidden
      />
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <BrandLogo tone="dark" />
            <p className="mt-5 text-sm leading-relaxed text-slate-300">
              Porównania kasyn online, bonusy i płatności — treści informacyjne. Hazard może uzależniać.{" "}
              <strong className="text-white">18+</strong>
            </p>
            <p className="mt-4">
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-sm font-semibold text-brand-300 transition hover:text-white"
              >
                {siteConfig.contactEmail}
              </a>
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {siteConfig.socialLinks.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-brand-400/50 hover:bg-white/10 hover:text-white"
                    rel={s.rel}
                    target="_blank"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-slate-500">Polska · PLN · język polski</p>
          </div>
          <FooterLinkColumns variant="dark" />
        </div>
      </div>
      <div className="border-t border-white/10 bg-black/20">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Wszelkie prawa zastrzeżone.
          </p>
          <p>Materiały partnerskie — linki afiliacyjne. Graj odpowiedzialnie. 18+</p>
        </div>
      </div>
    </footer>
  );
}
