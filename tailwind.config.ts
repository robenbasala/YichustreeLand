import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#f0f9f4",
          100: "#dcf2e4",
          200: "#bce5cc",
          300: "#8dd1a8",
          400: "#57b47c",
          500: "#35965c",
          600: "#267848",
          700: "#1f603b",
          800: "#1b4d31",
          900: "#173f29",
          950: "#0b2315",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(53, 150, 92, 0.25)",
        "glow-lg": "0 0 80px rgba(53, 150, 92, 0.35)",
        card: "0 4px 24px rgba(15, 60, 35, 0.08)",
        "card-hover": "0 12px 40px rgba(15, 60, 35, 0.14)",
      },
      backgroundImage: {
        "radial-green":
          "radial-gradient(ellipse at center, rgba(53, 150, 92, 0.12) 0%, transparent 70%)",
        "hero-gradient":
          "linear-gradient(135deg, rgba(240, 249, 244, 0.9) 0%, rgba(255, 255, 255, 1) 50%, rgba(220, 242, 228, 0.4) 100%)",
        "cta-gradient":
          "linear-gradient(135deg, #1f603b 0%, #35965c 50%, #57b47c 100%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(3deg)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
