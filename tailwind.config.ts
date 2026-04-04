import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /** UI accent — niebieski (spec) */
        brand: {
          50: "#e8f3ff",
          100: "#d4e9ff",
          200: "#a8d0ff",
          300: "#7ab8ff",
          400: "#4a9eff",
          500: "#1677ff",
          600: "#1677ff",
          700: "#125fcc",
          800: "#0e4a99",
          900: "#0c3d7a",
        },
        nk: {
          bg: "#f7f8fc",
          "bg-alt": "#f2f5fb",
          surface: "#ffffff",
          border: "#e4eaf3",
          text: "#122033",
          muted: "#516075",
          red: "#dc143c",
          "red-deep": "#b31234",
          rose: "#fce7ec",
          blue: "#1677ff",
          "blue-soft": "#e8f3ff",
          navy: "#17324d",
          "navy-deep": "#0f1f33",
          success: "#18b57b",
          warning: "#f3b63f",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 24px -8px rgba(23, 50, 77, 0.12), 0 1px 2px rgba(18, 32, 51, 0.06)",
        cardHover:
          "0 20px 48px -12px rgba(22, 119, 255, 0.16), 0 8px 20px -10px rgba(23, 50, 77, 0.12)",
        glass: "0 8px 32px -8px rgba(23, 50, 77, 0.15), inset 0 1px 0 rgba(255,255,255,0.65)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      backgroundImage: {
        "nk-hero":
          "linear-gradient(135deg, #ffffff 0%, #f4f7fb 45%, #eef4ff 100%), radial-gradient(ellipse 120% 80% at 100% 0%, rgba(220, 20, 60, 0.07), transparent 55%), radial-gradient(ellipse 100% 70% at 0% 100%, rgba(22, 119, 255, 0.08), transparent 50%)",
        "nk-section-soft":
          "linear-gradient(180deg, rgba(252, 231, 236, 0.35) 0%, rgba(247, 248, 252, 0.9) 100%)",
        "nk-cta": "linear-gradient(135deg, #17324d 0%, #125fcc 48%, #1677ff 100%)",
        "nk-footer": "linear-gradient(180deg, #1a3a56 0%, #0f1f33 55%, #0c1928 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
