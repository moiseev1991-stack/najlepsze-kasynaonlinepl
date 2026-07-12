import textBlocksJson from "@/content/text-blocks.json";

export type TextBlock = {
  metaTitle: string;
  metaDescription: string;
  body: string;
  /** YYYY-MM-DD — data wygenerowana z timestampu w nazwie pliku text2/ */
  sourceDate?: string | null;
};

const map = textBlocksJson as Record<string, TextBlock>;

export function getTextBlock(slug: string): TextBlock | undefined {
  const e = map[slug];
  if (!e) return undefined;
  if (!e.metaTitle && !e.metaDescription && !e.body) return undefined;
  return e;
}

export function listTextBlockSlugs(): string[] {
  return Object.keys(map);
}

/** Usuwa pierwszy nagłówek H1 z treści — na stronach szablonów H1 jest zwykle już w hero. */
export function stripLeadingH1(markdown: string): string {
  return markdown.replace(/^#\s[^\n]+\n+/, "").trim();
}
