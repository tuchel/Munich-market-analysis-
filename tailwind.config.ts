import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: {
          50: "#f7f5f0",
          100: "#ece8dd",
          200: "#d9d2bf",
          300: "#b9ae92",
          400: "#8e8264",
          500: "#6a5f45",
          600: "#4d4432",
          700: "#332d22",
          800: "#1f1b14",
          900: "#12100b",
        },
        paper: "#faf8f3",
        parchment: "#f2ede0",
        rule: "#cdc5b0",
        lake: {
          50: "#eef4f6",
          100: "#d6e4ea",
          200: "#a7c5d2",
          300: "#6fa0b4",
          400: "#3f7d96",
          500: "#225d76",
          600: "#18475c",
          700: "#123848",
          800: "#0e2a36",
          900: "#081a22",
        },
        gold: {
          400: "#c2a057",
          500: "#a27f3b",
          600: "#7e6028",
        },
        bull: "#2f6a3f",
        bear: "#9e3838",
        neutral_: "#8a7b5c",
      },
      fontSize: {
        "display-xl": ["4rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["3rem", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "display":    ["2.25rem", { lineHeight: "1.12", letterSpacing: "-0.015em" }],
        "kicker":     ["0.75rem", { lineHeight: "1.2", letterSpacing: "0.12em" }],
      },
      maxWidth: {
        prose: "68ch",
        canvas: "84rem",
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(26,22,13,0.06), 0 1px 2px 0 rgba(26,22,13,0.04)",
      },
    },
  },
  plugins: [],
};
export default config;
