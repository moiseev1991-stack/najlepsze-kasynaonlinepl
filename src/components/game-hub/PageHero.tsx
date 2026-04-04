import { ThematicIconBadge } from "./ThematicIconBadge";

type Props = {
  eyebrow?: string;
  h1: string;
  intro: string;
  heroIcon: string;
  heroAccent?: { label: string; value: string };
};

export function PageHero({ eyebrow, h1, intro, heroIcon, heroAccent }: Props) {
  return (
    <section className="relative overflow-hidden rounded-4xl border border-nk-border/70 bg-nk-hero bg-cover shadow-glass">
      <div className="pointer-events-none absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-brand-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-12 -top-16 h-72 w-72 rounded-full bg-nk-red/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.32] [background-image:linear-gradient(rgba(23,50,77,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(23,50,77,0.04)_1px,transparent_1px)] [background-size:40px_40px]" />

      <div className="relative grid gap-8 p-6 md:grid-cols-[1fr,min(280px,32%)] md:items-center md:gap-10 md:p-10 lg:p-12">
        <div className="min-w-0">
          {eyebrow ? (
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-700">{eyebrow}</p>
          ) : null}
          <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight text-nk-text md:text-4xl lg:text-[2.35rem] lg:leading-tight">
            {h1}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-nk-muted">{intro}</p>
        </div>
        <div className="flex justify-center md:justify-end">
          <div className="w-full max-w-[280px]">
            <ThematicIconBadge iconName={heroIcon} accent={heroAccent} />
          </div>
        </div>
      </div>
    </section>
  );
}
