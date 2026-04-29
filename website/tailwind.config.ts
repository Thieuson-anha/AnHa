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
        // Dark backgrounds — deep warm charcoal with red undertones (hero, footer, sidebar)
        navy: {
          50:  "#FDF8F8",
          100: "#F5ECEC",
          500: "#7A3838",
          600: "#5C2A2A",
          700: "#3F1E1E",
          800: "#2B1515",
          900: "#170E0E",
        },
        // Brand red — from the logo "A" (CTA buttons, badges, accents)
        gold: {
          300: "#F4AAAA",
          400: "#E86060",
          500: "#D42B2B",
          600: "#B51E1E",
        },
      },
      fontFamily: {
        heading: ["Inter", "sans-serif"],
        body: ["Be Vietnam Pro", "sans-serif"],
      },
      backgroundImage: {
        "hero-pattern":
          "radial-gradient(circle at 25% 25%, rgba(212,43,43,0.12) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(43,21,21,0.3) 0%, transparent 50%)",
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
