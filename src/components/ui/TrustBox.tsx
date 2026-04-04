type Props = {
  trustIndex: number;
};

export function TrustBox({ trustIndex }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Indeks zaufania</p>
      <p className="mt-1 text-2xl font-bold text-slate-900">{trustIndex}/100</p>
      <p className="mt-1 text-xs text-slate-600">
        Szacunek redakcji na podstawie transparentności regulaminu i dostępnych informacji o licencji.
      </p>
    </div>
  );
}
