type Row = { name: string; score: number; comment: string };

type Props = {
  criteria: Row[];
  title?: string;
};

export function RatingBreakdown({ criteria, title = "Ocena według kryteriów" }: Props) {
  if (!criteria.length) return null;

  return (
    <section>
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <div className="mt-4 space-y-3">
        {criteria.map((row) => (
          <div key={row.name} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-medium text-slate-900">{row.name}</p>
              <div className="flex min-w-[120px] items-center gap-2">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-brand-500"
                    style={{ width: `${Math.min(100, (row.score / 10) * 100)}%` }}
                  />
                </div>
                <span className="text-sm font-semibold tabular-nums text-brand-800">
                  {row.score.toFixed(1)}/10
                </span>
              </div>
            </div>
            <p className="mt-2 text-sm text-slate-600">{row.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
