"use client";

type Props = {
  tags: string[];
  active?: string;
  onChange?: (tag: string) => void;
};

export function FiltersBar({ tags, active = tags[0] ?? "", onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtry">
      {tags.map((tag) => {
        const isActive = tag === active;
        return (
          <button
            key={tag}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange?.(tag)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-brand-600 text-white shadow-md ring-1 ring-brand-500/30"
                : "border border-nk-border/90 bg-nk-surface/90 text-nk-muted shadow-sm hover:border-brand-200 hover:bg-nk-bg-alt hover:text-nk-text"
            }`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
