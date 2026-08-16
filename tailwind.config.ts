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
        ron: {
          bg: "#050507",
          surface: "#090A0E",
          elevated: "#0D1016",
          hover: "#121620",
          border: "#1E2430",
          "border-subtle": "rgba(255, 255, 255, 0.07)",
          text: "#F5F7FA",
          muted: "#8A909C",
          dim: "#555C68",
          violet: "#755CFF",
          cyan: "#00DFF7",
          green: "#9DFF57",
          amber: "#FFB84D",
          red: "#FF4D67",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "Geist", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["var(--font-mono)", "Geist Mono", "IBM Plex Mono", "SF Mono", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 20s linear infinite",
        "spin-reverse": "spin 25s linear infinite reverse",
        float: "float 6s ease-in-out infinite",
        scan: "scan 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
