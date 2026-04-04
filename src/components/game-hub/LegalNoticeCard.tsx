import { ShieldAlert } from "lucide-react";

const DEFAULT_NOTICE =
  "Hazard może uzależniać. Graj tylko w granicach własnego budżetu, korzystaj z limitów i narzędzi odpowiedzialnej gry. Materiały mają charakter informacyjny — sprawdź aktualne przepisy w swojej jurysdykcji. Tylko dla osób pełnoletnich (18+).";

type Props = { text?: string };

export function LegalNoticeCard({ text = DEFAULT_NOTICE }: Props) {
  return (
    <aside className="flex gap-4 rounded-3xl border border-nk-border/70 bg-gradient-to-r from-nk-rose/25 via-nk-surface/95 to-nk-blue-soft/30 p-5 shadow-sm md:p-6">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-nk-border/60 bg-nk-surface text-brand-700">
        <ShieldAlert className="h-5 w-5" strokeWidth={1.5} aria-hidden />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-bold text-nk-text">Odpowiedzialna gra i informacja prawna</p>
        <p className="mt-2 text-sm leading-relaxed text-nk-muted">{text}</p>
      </div>
    </aside>
  );
}
