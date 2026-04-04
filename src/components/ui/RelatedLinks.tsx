import Link from "next/link";

type LinkItem = { href: string; label: string };

type Props = { title?: string; links: LinkItem[] };

export function RelatedLinks({ title = "Powiązane strony", links }: Props) {
  return (
    <section className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 p-6">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm font-medium text-brand-700 hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
