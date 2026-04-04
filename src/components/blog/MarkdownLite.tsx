type Props = { content: string };

export function MarkdownLite({ content }: Props) {
  const blocks = content.split(/\n\n+/).map((b) => b.trim()).filter(Boolean);

  return (
    <div className="max-w-none">
      {blocks.map((block, i) => {
        if (block.startsWith("## ")) {
          return (
            <h2 key={i} className="mt-8 text-xl font-bold text-slate-900 first:mt-0">
              {block.slice(3).trim()}
            </h2>
          );
        }

        if (block.includes("\n- ")) {
          const lines = block.split("\n");
          const head = lines[0].startsWith("- ") ? null : lines[0];
          const items = lines.filter((l) => l.startsWith("- "));
          return (
            <div key={i} className="mt-4">
              {head ? <p className="text-slate-700">{head}</p> : null}
              <ul className="mt-2 list-disc space-y-2 pl-5 text-slate-700">
                {items.map((line) => (
                  <li key={line}>{line.replace(/^-\s+/, "")}</li>
                ))}
              </ul>
            </div>
          );
        }

        return (
          <p key={i} className="mt-4 leading-relaxed text-slate-700 first:mt-0">
            {block}
          </p>
        );
      })}
    </div>
  );
}
