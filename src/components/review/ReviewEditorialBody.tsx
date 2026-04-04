import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const markdownClass =
  "review-md max-w-none text-slate-700 [&_h1]:mb-4 [&_h1]:mt-8 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-slate-900 [&_h1]:first:mt-0 [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:border-b [&_h2]:border-slate-200 [&_h2]:pb-2 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-slate-900 [&_p]:mt-4 [&_p]:leading-relaxed [&_p]:first:mt-0 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:leading-relaxed [&_a]:text-brand-600 [&_a]:underline [&_strong]:font-semibold [&_table]:mt-6 [&_table]:w-full [&_table]:min-w-[min(100%,48rem)] [&_table]:border-collapse [&_table]:text-sm [&_th]:border [&_th]:border-slate-300 [&_th]:bg-slate-50 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_td]:border [&_td]:border-slate-300 [&_td]:px-3 [&_td]:py-2 [&_tr:nth-child(even)]:bg-slate-50/50";

type Props = { markdown: string };

export function ReviewEditorialBody({ markdown }: Props) {
  if (!markdown.trim()) return null;
  return (
    <div className="overflow-x-auto">
      <div className={markdownClass}>
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
}
