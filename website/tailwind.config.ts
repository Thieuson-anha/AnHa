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
        navy: {
          900: "#0f2744",
          800: "#1e3a5f",
          700: "#2d5280",
          600: "#3d6a9e",
          500: "#4d83bd",
        },
        gold: {
          300: "#e0cc8a",
          400: "#d4b86a",
          500: "#c9a84c",
          600: "#b8942e",
        },
      },
      fontFamily: {
        heading: ["Inter", "sans-serif"],
        body: ["Be Vietnam Pro", "sans-serif"],
      },
      backgroundImage: {
        "hero-pattern":
          "radial-gradient(circle at 25% 25%, rgba(61,106,158,0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(201,168,76,0.08) 0%, transparent 50%)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
