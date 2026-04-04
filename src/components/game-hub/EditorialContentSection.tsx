type Section = { heading: string; body: string };

type Props = { sections: Section[] };

export function EditorialContentSection({ sections }: Props) {
  return (
    <section
      aria-labelledby="editorial-heading"
      className="rounded-4xl border border-nk-border/80 bg-nk-surface/95 p-6 shadow-card md:p-8 lg:p-10"
    >
      <h2 id="editorial-heading" className="text-xl font-bold text-nk-text">
        Przewodnik
      </h2>
      <div className="mt-6 space-y-8">
        {sections.map((s) => (
          <div key={s.heading}>
            <h3 className="text-lg font-semibold text-nk-text">{s.heading}</h3>
            <p className="mt-3 text-base leading-relaxed text-nk-muted">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
