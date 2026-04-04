type Point = { title: string; body: string };

type Props = {
  title?: string;
  points: Point[];
};

export function AttentionPointsBlock({
  title = "Na co zwrócić uwagę",
  points,
}: Props) {
  return (
    <section
      aria-labelledby="attention-heading"
      className="relative overflow-hidden rounded-4xl border border-nk-navy/20 bg-gradient-to-br from-nk-navy via-nk-navy-deep to-[#0c1928] p-6 text-white shadow-card md:p-8"
    >
      <div className="pointer-events-none absolute -right-16 top-0 h-40 w-40 rounded-full bg-brand-500/20 blur-3xl" />
      <h2 id="attention-heading" className="relative text-xl font-bold text-white">
        {title}
      </h2>
      <ul className="relative mt-6 grid gap-4 md:grid-cols-3">
        {points.map((p, i) => (
          <li
            key={p.title}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-sm md:px-5 md:py-5"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-white/60">Punkt {i + 1}</span>
            <h3 className="mt-2 text-base font-semibold text-white">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/80">{p.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
