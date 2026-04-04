import Link from "next/link";

type Props = {
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function CTASection({
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: Props) {
  return (
    <section className="relative overflow-hidden rounded-4xl border border-white/10 bg-nk-cta px-6 py-10 text-center text-white shadow-cardHover md:px-10">
      <div className="pointer-events-none absolute -left-24 top-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 right-0 h-48 w-48 rounded-full bg-nk-red/20 blur-3xl" />
      <div className="relative">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-balance text-sm leading-relaxed text-white/85 md:text-base">
          {description}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={primaryHref}
            className="inline-flex rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-nk-navy shadow-md transition hover:bg-nk-bg-alt hover:shadow-lg"
          >
            {primaryLabel}
          </Link>
          {secondaryHref && secondaryLabel ? (
            <Link
              href={secondaryHref}
              className="inline-flex rounded-2xl border border-white/45 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
            >
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
