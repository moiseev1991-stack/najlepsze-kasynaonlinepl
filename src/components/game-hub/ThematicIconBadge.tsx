import { gameHubIcon } from "./icon-map";

type Props = {
  iconName: string;
  accent?: { label: string; value: string };
};

export function ThematicIconBadge({ iconName, accent }: Props) {
  const Icon = gameHubIcon(iconName);
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-brand-200/50 via-nk-rose/40 to-nk-blue-soft/50 blur-xl" />
      <div className="relative flex flex-col items-center gap-4 rounded-3xl border border-white/80 bg-white/70 p-8 shadow-glass backdrop-blur-md md:items-stretch">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-nk-border/60 bg-gradient-to-br from-nk-surface to-nk-bg-alt shadow-card">
          <Icon className="h-10 w-10 text-brand-700" strokeWidth={1.5} aria-hidden />
        </div>
        {accent ? (
          <div className="rounded-2xl border border-nk-border/70 bg-nk-bg-alt/90 px-4 py-3 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-nk-muted">{accent.label}</p>
            <p className="mt-1 text-lg font-bold text-nk-text">{accent.value}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
