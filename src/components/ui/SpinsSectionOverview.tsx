import Link from "next/link";

/** Slugi stron bonusowych w sekcji „Darmowe spiny” (por. nawigacja główna). */
export const SPINS_SECTION_BONUS_SLUGS = new Set([
  "10-darmowych-spinow-bez-depozytu",
  "20-darmowych-spinow-bez-depozytu",
  "25-darmowych-spinow-za-rejestracje",
  "50-darmowych-spinow-bez-depozytu",
  "100-darmowych-spinow-bez-depozytu",
]);

const LINKS = [
  { href: "/darmowe-spiny/", label: "Przegląd darmowych spinów" },
  { href: "/10-darmowych-spinow-bez-depozytu/", label: "10 spinów bez depozytu" },
  { href: "/20-darmowych-spinow-bez-depozytu/", label: "20 spinów bez depozytu" },
  { href: "/25-darmowych-spinow-za-rejestracje/", label: "25 spinów za rejestrację" },
  { href: "/50-darmowych-spinow-bez-depozytu/", label: "50 spinów bez depozytu" },
  { href: "/100-darmowych-spinow-bez-depozytu/", label: "100 spinów bez depozytu" },
] as const;

function normalizePath(p: string): string {
  let t = p.trim();
  if (!t.startsWith("/")) t = `/${t}`;
  if (t.length > 1 && t.endsWith("/")) t = t.slice(0, -1);
  return t;
}

type Props = { currentPath: string };

export function SpinsSectionOverview({ currentPath }: Props) {
  const cur = normalizePath(currentPath);

  return (
    <nav
      aria-label="Przegląd: Darmowe spiny"
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <h2 className="text-base font-bold text-brand-700">Przegląd: Darmowe spiny</h2>
      <div className="mt-3 border-t border-slate-200 pt-3">
        <ul className="space-y-2.5 text-sm">
          {LINKS.map((item) => {
            const hrefNorm = normalizePath(item.href);
            const isActive = hrefNorm === cur;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={
                    isActive
                      ? "font-semibold text-brand-700"
                      : "text-slate-700 transition hover:text-brand-600"
                  }
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
