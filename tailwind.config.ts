import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        rangers: {
          red: "#E11D2E",
          redDark: "#B4111F",
          redSoft: "#FF4757",
          black: "#08090B",
          surface: "#111318",
          surface2: "#191C22",
          border: "#24272F",
          gold: "#C9A227",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.22em",
      },
      boxShadow: {
        card: "0 18px 40px -24px rgba(0,0,0,0.9)",
        glow: "0 0 0 1px rgba(225,29,46,0.35), 0 18px 50px -20px rgba(225,29,46,0.45)",
      },
      keyframes: {
        flarePulse: {
          "0%, 100%": { opacity: "0.35", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.15)" },
        },
        smokeDrift: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(-30px,20px,0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        flarePulse: "flarePulse 7s ease-in-out infinite",
        smokeDrift: "smokeDrift 14s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
