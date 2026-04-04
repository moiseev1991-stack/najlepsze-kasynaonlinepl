type Props = {
  pros: string[];
  cons: string[];
};

export function ProsCons({ pros, cons }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-2xl border border-nk-success/25 bg-nk-success/10 p-6">
        <h3 className="font-semibold text-nk-success">Plusy</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-nk-text">
          {pros.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-nk-red/20 bg-nk-rose/40 p-6">
        <h3 className="font-semibold text-nk-red-deep">Minusy</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-nk-text">
          {cons.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export { ProsCons as ProsConsBlock };
