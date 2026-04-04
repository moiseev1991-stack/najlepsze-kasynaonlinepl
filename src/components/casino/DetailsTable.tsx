import type { Casino } from "@/lib/types";

type Props = { casino: Casino };

export function DetailsTable({ casino }: Props) {
  const rows = [
    { label: "Licencja", value: casino.license },
    { label: "Rok założenia", value: String(casino.foundedYear) },
    { label: "Liczba gier (szac.)", value: String(casino.gameCount) },
    { label: "Minimalny depozyt", value: casino.minDeposit },
    { label: "Czas wypłaty", value: casino.withdrawalTime },
    { label: "Obrót bonusu", value: casino.wager },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      <table className="w-full text-left text-sm">
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-slate-100 last:border-0">
              <th className="bg-slate-50 px-4 py-3 font-medium text-slate-600">{row.label}</th>
              <td className="px-4 py-3 text-slate-900">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
