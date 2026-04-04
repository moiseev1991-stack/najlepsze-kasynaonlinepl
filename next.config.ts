import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Statyczny eksport HTML do hostingu współdzielonego (Plesk / Apache bez Node). */
  output: "export",
  images: { unoptimized: true },
  reactStrictMode: true,
  /**
   * Domyślnie `npm run dev` / `dev:fast` = Webpack (Turbopack na Windows potrafi psuć `.next` / PostCSS).
   * Turbopack: `npm run dev:turbo`. W dev wyłączony persistent cache — mniej „Cannot find module './NNN.js'”.
   */
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
  /**
   * Dev: HMR / _next na 127.0.0.1. Podgląd w IDE (Simple Browser) bywa bez CSS — użyj Chrome:
   * http://localhost:3055 albo `.env.local`: NEXT_PUBLIC_DEV_ORIGIN=http://127.0.0.1:3055
   */
  allowedDevOrigins: ["127.0.0.1", "::1", "localhost"],
  /** Zgodne z linkami w treści (…/) — unika zbędnych przekierowań 308. */
  trailingSlash: true,
  /**
   * Przy `output: "export"` redirectów w next.config nie ma — te same reguły są w `public/.htaccess`
   * (kopiowane do `out/` i do `site/`).
   */
};

export default nextConfig;
