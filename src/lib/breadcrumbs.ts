import { toAbsoluteSiteUrl } from "@/lib/site-origin";

export function toAbsoluteUrl(path: string): string {
  return toAbsoluteSiteUrl(path);
}

/** Równolegle: segments oraz etykiety dla każdego segmentu (łącznie z ostatnim) */
export function buildBreadcrumbSchema(
  segments: string[],
  labels: string[],
): { name: string; url: string }[] {
  const items: { name: string; url: string }[] = [
    { name: "Strona główna", url: toAbsoluteUrl("/") },
  ];
  let acc = "";
  segments.forEach((seg, i) => {
    acc += `/${seg}`;
    items.push({
      name: labels[i] ?? seg,
      url: toAbsoluteUrl(`${acc}/`),
    });
  });
  return items;
}
