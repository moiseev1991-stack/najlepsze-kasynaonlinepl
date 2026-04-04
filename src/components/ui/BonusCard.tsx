import Link from "next/link";

type Props = {
  href: string;
  title: string;
  teaser?: string;
};

export function BonusCard({ href, title, teaser }: Props) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-3xl border border-nk-border/90 bg-nk-surface/95 p-5 shadow-card transition duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-cardHover md:p-6"
    >
      <h3 className="text-base font-semibold text-nk-text group-hover:text-brand-800">{title}</h3>
      {teaser ? <p className="mt-2 line-clamp-2 text-sm text-nk-muted">{teaser}</p> : null}
      <span className="mt-3 text-sm font-semibold text-brand-600">Czytaj więcej →</span>
    </Link>
  );
}
