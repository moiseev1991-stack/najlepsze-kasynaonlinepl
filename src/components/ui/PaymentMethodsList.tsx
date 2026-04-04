import Link from "next/link";

type Item = { name: string; href: string };

type Props = {
  items: Item[];
  title?: string;
};

export function PaymentMethodsList({ items, title = "Popularne metody" }: Props) {
  return (
    <div>
      <p className="text-sm font-semibold text-nk-text">{title}</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="inline-flex rounded-full border border-nk-border/80 bg-nk-surface/90 px-3 py-1.5 text-sm font-medium text-nk-muted shadow-sm transition hover:border-brand-300 hover:text-brand-800 hover:shadow-card"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
