type Props = {
  pros: string[];
  cons: string[];
};

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
      aria-hidden
    >
      <path d="M5 12l4 4L19 6" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
      aria-hidden
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function ThumbUpIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M2 21h4V9H2v12zm20-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L13.17 1 6.59 7.59C6.22 7.95 6 8.45 6 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
    </svg>
  );
}

function ThumbDownIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M22 3h-4v12h4V3zM2 14c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L10.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2H7c-.83 0-1.54.5-1.84 1.22l-3.02 7.05C2.05 11.5 2 11.74 2 12v2z" />
    </svg>
  );
}

export function ProsCons({ pros, cons }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* PLUSY — zielona sekcja */}
      <div className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-sm">
        {/* Dekoracja rogu */}
        <div
          className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-100/70 blur-2xl"
          aria-hidden
        />
        <div className="relative flex items-center gap-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200">
            <ThumbUpIcon />
          </span>
          <div>
            <h3 className="text-base font-bold text-emerald-800">Plusy</h3>
            <p className="text-xs text-emerald-700/70">
              {pros.length} {pros.length === 1 ? "zaleta" : pros.length < 5 ? "zalety" : "zalet"}
            </p>
          </div>
        </div>
        <ul className="relative mt-4 space-y-2.5">
          {pros.map((p) => (
            <li key={p} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-800">
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/95 text-white shadow-sm">
                <CheckIcon />
              </span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* MINUSY — czerwona sekcja */}
      <div className="relative overflow-hidden rounded-2xl border border-rose-200 bg-gradient-to-br from-rose-50 to-white p-6 shadow-sm">
        <div
          className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-rose-100/70 blur-2xl"
          aria-hidden
        />
        <div className="relative flex items-center gap-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-700 ring-1 ring-rose-200">
            <ThumbDownIcon />
          </span>
          <div>
            <h3 className="text-base font-bold text-rose-800">Minusy</h3>
            <p className="text-xs text-rose-700/70">
              {cons.length} {cons.length === 1 ? "wada" : cons.length < 5 ? "wady" : "wad"}
            </p>
          </div>
        </div>
        <ul className="relative mt-4 space-y-2.5">
          {cons.map((c) => (
            <li key={c} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-800">
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-500/95 text-white shadow-sm">
                <CrossIcon />
              </span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export { ProsCons as ProsConsBlock };
