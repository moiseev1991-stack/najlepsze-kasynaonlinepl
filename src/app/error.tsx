"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-lg space-y-6 px-4 py-16 text-center">
      <h1 className="text-2xl font-bold text-slate-900">Coś poszło nie tak</h1>
      <p className="text-slate-600">
        Wystąpił błąd podczas ładowania strony. Sprawdź terminal z uruchomionym{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">npm run dev</code> — tam jest pełny
        komunikat błędu.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Spróbuj ponownie
        </button>
        <Link href="/" className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50">
          Strona główna
        </Link>
      </div>
    </div>
  );
}
