type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Krótka nota redakcyjna / zaufanie pod leadem */
  trustLine?: string;
  children?: React.ReactNode;
};

export function HeroSection({ eyebrow, title, subtitle, trustLine, children }: Props) {
  return (
    <section className="relative overflow-hidden rounded-4xl border border-nk-border/70 bg-nk-hero bg-cover shadow-glass">
      <div className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-brand-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 -top-24 h-80 w-80 rounded-full bg-nk-red/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(23,50,77,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(23,50,77,0.04)_1px,transparent_1px)] [background-size:40px_40px]" />

      <div className="relative grid gap-10 p-6 md:grid-cols-[1fr,min(300px,34%)] md:items-center md:gap-12 md:p-10 lg:p-12">
        <div className="min-w-0">
          {eyebrow ? (
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-700">{eyebrow}</p>
          ) : null}
          <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight text-nk-text md:text-4xl lg:text-[2.35rem] lg:leading-tight">
            {title}
          </h1>
          {subtitle ? <p className="mt-4 max-w-2xl text-lg leading-relaxed text-nk-muted">{subtitle}</p> : null}
          {trustLine ? (
            <p className="mt-4 max-w-2xl border-l-2 border-nk-red/35 pl-4 text-sm leading-relaxed text-nk-muted">
              {trustLine}
            </p>
          ) : null}
          {children ? <div className="mt-6">{children}</div> : null}
        </div>

        <div className="relative hidden md:block">
          <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/55 p-6 shadow-glass backdrop-blur-md">
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-nk-rose/50 blur-2xl" />
            <div className="absolute -bottom-8 left-4 h-28 w-28 rounded-full bg-brand-200/40 blur-2xl" />
            <div className="relative space-y-4">
              <p className="text-xs font-bold uppercase tracking-wider text-nk-muted">Redakcyjnie</p>
              <p className="text-sm font-semibold text-nk-text">Porównania bez „gwarantowanych wygranych”</p>
              <p className="text-sm leading-relaxed text-nk-muted">
                Sprawdzamy licencje, bonusy i płatności w logicznych tabelach — tak, żebyś mógł podejmować świadome decyzje.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="rounded-full bg-nk-success/15 px-3 py-1 text-xs font-semibold text-nk-success">
                  18+ odpowiedzialna gra
                </span>
                <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-800">
                  Aktualne recenzje
                </span>
              </div>
            </div>
          </div>
          <div
            className="pointer-events-none absolute -bottom-3 -right-3 flex h-[4.5rem] w-[4.5rem] items-center justify-center overflow-hidden rounded-2xl border border-nk-red/30 bg-gradient-to-br from-white via-white to-nk-rose/35 shadow-lg ring-1 ring-white/90"
            aria-hidden
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- mała grafika dekoracyjna, jak w PageOfferBar */}
            <img
              src="/icon.svg"
              alt=""
              width={52}
              height={52}
              className="h-[3.15rem] w-[3.15rem] object-contain drop-shadow-sm"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
