import Link from "next/link";
import { footerInfoLinks, footerPopularLinks } from "@/config/navigation";

type Props = { variant?: "light" | "dark" };

export function FooterLinkColumns({ variant = "light" }: Props) {
  const heading =
    variant === "dark"
      ? "text-xs font-bold uppercase tracking-wide text-slate-400"
      : "text-xs font-bold uppercase tracking-wide text-nk-muted";
  const link =
    variant === "dark"
      ? "text-sm text-slate-300 transition hover:text-white"
      : "text-sm text-nk-muted transition hover:text-brand-700";

  return (
    <div className="grid flex-1 gap-10 sm:grid-cols-2 lg:max-w-2xl">
      <div>
        <p className={heading}>Informacja</p>
        <ul className="mt-4 space-y-2.5">
          {footerInfoLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={link}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className={heading}>Popularne strony</p>
        <ul className="mt-4 space-y-2.5">
          {footerPopularLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={link}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
