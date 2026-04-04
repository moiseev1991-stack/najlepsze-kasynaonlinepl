export function segmentsToUrl(segments: string[]): string {
  if (segments.length === 0) return "/";
  return `/${segments.join("/")}/`;
}
