type Props = { types: string[] };

export function BonusTags({ types }: Props) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {types.map((t) => (
        <span
          key={t}
          className="rounded-md bg-white px-2 py-0.5 text-xs font-medium text-slate-700 ring-1 ring-slate-200"
        >
          {t}
        </span>
      ))}
    </div>
  );
}
