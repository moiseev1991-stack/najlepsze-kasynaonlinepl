import type { MetadataRoute } from "next";
import { segmentsToUrl } from "@/lib/paths";
import { siteConfig } from "@/lib/site-config";
import { getAllSegmentPaths, resolvePage } from "@/lib/routes";

const baseUrl = siteConfig.url.replace(/\/$/, "");

function priorityForSegments(segments: string[]): number {
  if (segments.length === 0) return 1;
  const page = resolvePage(segments);
  if (!page) return 0.5;
  switch (page.type) {
    case "category":
      return 0.9;
    case "review":
      return 0.85;
    case "bonus":
    case "game":
      return 0.8;
    case "blog-post":
      return 0.65;
    case "blog-list":
      return 0.75;
    case "blog-category":
      return 0.6;
    case "payment":
    case "payment-index":
      return 0.75;
    case "min-deposit":
    case "min-deposit-parent":
      return 0.78;
    case "trust":
      return 0.55;
    default:
      return 0.7;
  }
}

function changeFrequencyForSegments(
  segments: string[],
): NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]> {
  const page = resolvePage(segments);
  if (page?.type === "blog-post" || page?.type === "blog-category") return "monthly";
  if (page?.type === "trust") return "yearly";
  return "weekly";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = getAllSegmentPaths();
  const lastModified = new Date();

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...paths.map((segments) => ({
      url: `${baseUrl}${segmentsToUrl(segments)}`,
      lastModified,
      changeFrequency: changeFrequencyForSegments(segments),
      priority: priorityForSegments(segments),
    })),
  ];
}
