import { gameHubIcon } from "./icon-map";

type Card = { icon: string; title: string; description: string };

type Props = {
  title?: string;
  cards: Card[];
};

export function FeatureCardsGrid({
  title = "Co znajdziesz na tej stronie",
  cards,
}: Props) {
  return (
    <section aria-labelledby="feature-cards-heading" className="space-y-4">
      <h2 id="feature-cards-heading" className="text-xl font-bold text-nk-text">
        {title}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => {
          const Icon = gameHubIcon(c.icon);
          return (
            <div
              key={c.title}
              className="group flex flex-col rounded-3xl border border-nk-border/90 bg-nk-surface/95 p-5 shadow-card transition duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-cardHover md:p-6"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-nk-border/70 bg-nk-bg-alt/80 text-brand-700">
                <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
              </div>
              <h3 className="text-base font-semibold text-nk-text group-hover:text-brand-800">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-nk-muted">{c.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
