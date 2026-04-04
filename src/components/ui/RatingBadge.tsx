type Props = {
  value: number;
  label?: string;
  size?: "sm" | "md" | "lg";
};

export function RatingBadge({ value, label, size = "md" }: Props) {
  const sizeCls =
    size === "sm" ? "text-xs px-2 py-0.5" : size === "lg" ? "text-base px-3 py-1.5" : "text-sm px-2.5 py-1";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-nk-navy to-brand-600 font-semibold text-white shadow-sm ring-1 ring-white/20 ${sizeCls}`}
    >
      <span aria-hidden>★</span>
      <span>{value.toFixed(1)}</span>
      {label ? <span className="font-normal opacity-90">{label}</span> : null}
    </span>
  );
}
