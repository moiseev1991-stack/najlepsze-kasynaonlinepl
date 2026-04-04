type Block = { heading: string; body: string };

export function SEOContentSection({ section }: { section: Block }) {
  return (
    <section className="prose prose-slate max-w-none">
      <h2 className="text-xl font-bold text-nk-text">{section.heading}</h2>
      <p className="mt-3 leading-relaxed text-nk-muted">{section.body}</p>
    </section>
  );
}
