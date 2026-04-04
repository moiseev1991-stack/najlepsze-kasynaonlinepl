type Item = { id: string; label: string };

export function QuickNavigation({ items }: { items: Item[] }) {
  if (!items.length) return null;
  return (
    <nav
      aria-label="Szybka nawigacja"
      className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 md:p-5"
    >
      <p className="text-sm font-semibold text-slate-900">Na tej stronie</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              className="inline-flex rounded-full bg-white px-3 py-1.5 text-sm font-medium text-brand-800 ring-1 ring-slate-200 hover:ring-brand-300"
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
