import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

const baseUrl = siteConfig.url.replace(/\/$/, "");

/** Explicit AI/search crawlers — Cloudflare „AI scrapers” block is separate; disable it in the dashboard if needed. */
const aiTrainingBots = [
  "GPTBot",
  "ChatGPT-User",
  "Google-Extended",
  "CCBot",
  "anthropic-ai",
  "ClaudeBot",
  "PerplexityBot",
  "Amazonbot",
] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...aiTrainingBots.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
