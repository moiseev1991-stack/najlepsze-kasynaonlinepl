import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Strona nie znaleziona",
  description: "Nie znaleziono podanej strony. Wróć na stronę główną lub wybierz popularną sekcję.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg space-y-6 px-4 py-16 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">404</p>
      <h1 className="text-2xl font-bold text-slate-900">Strona nie znaleziona</h1>
      <p className="text-slate-600">
        Nie mamy treści pod tym adresem. Adres mógł się zmienić albo strona została usunięta.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Strona główna
        </Link>
        <Link
          href="/blog/"
          className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
        >
          Blog
        </Link>
        <Link
          href="/legalne-kasyna/"
          className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
        >
          Legalne kasyna
        </Link>
      </div>
    </div>
  );
}
