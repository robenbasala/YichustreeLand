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
        brand: {
          DEFAULT: "#2eb8b8",
          50: "#ecfcfc",
          100: "#cff5f5",
          200: "#a5ebeb",
          300: "#6dd9d9",
          400: "#2eb8b8",
          500: "#1f9e9e",
          600: "#1a7f7f",
          700: "#196666",
          800: "#195252",
          900: "#194545",
          950: "#082929",
        },
        forest: {
          50: "#ecfcfc",
          100: "#cff5f5",
          200: "#a5ebeb",
          300: "#6dd9d9",
          400: "#2eb8b8",
          500: "#1f9e9e",
          600: "#1a7f7f",
          700: "#196666",
          800: "#195252",
          900: "#194545",
          950: "#082929",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(46, 184, 184, 0.3)",
        "glow-lg": "0 0 80px rgba(46, 184, 184, 0.4)",
        card: "0 4px 24px rgba(8, 41, 41, 0.08)",
        "card-hover": "0 12px 40px rgba(8, 41, 41, 0.12)",
      },
      backgroundImage: {
        "radial-green":
          "radial-gradient(ellipse at center, rgba(46, 184, 184, 0.14) 0%, transparent 70%)",
        "hero-gradient":
          "linear-gradient(135deg, rgba(236, 252, 252, 0.95) 0%, rgba(255, 255, 255, 1) 50%, rgba(207, 245, 245, 0.5) 100%)",
        "cta-gradient":
          "linear-gradient(135deg, #196666 0%, #2eb8b8 50%, #6dd9d9 100%)",
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
