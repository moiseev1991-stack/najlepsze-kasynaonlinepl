import Link from "next/link";
import { ChevronRight } from "./icon-map";

type Card = { href: string; title: string; description: string };

type Props = {
  title?: string;
  cards: Card[];
};

export function RelatedPagesCards({
  title = "Powiązane strony — idź dalej",
  cards,
}: Props) {
  return (
    <section aria-labelledby="related-pages-heading" className="space-y-4">
      <h2 id="related-pages-heading" className="text-xl font-bold text-nk-text">
        {title}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-nk-border/90 bg-gradient-to-br from-nk-surface via-nk-bg-alt/30 to-nk-blue-soft/25 p-5 shadow-card transition duration-300 hover:-translate-y-0.5 hover:border-brand-300/80 hover:shadow-cardHover md:p-6"
          >
            <span className="pr-8 text-base font-semibold text-nk-text group-hover:text-brand-800">{c.title}</span>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-nk-muted">{c.description}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
              Przejdź
              <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
