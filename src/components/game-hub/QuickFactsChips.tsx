type Props = { items: string[] };

export function QuickFactsChips({ items }: Props) {
  if (items.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t) => (
        <span
          key={t}
          className="inline-flex items-center rounded-full border border-nk-border/80 bg-nk-surface/95 px-3.5 py-1.5 text-xs font-semibold text-nk-text shadow-sm"
        >
          {t}
        </span>
      ))}
    </div>
  );
}
