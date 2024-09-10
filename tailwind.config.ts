// tailwind.config.js
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      // Simple minmax grid for rows

      gridTemplateRows: {
        "auto-100": "repeat(auto-fit, minmax(min-content, 1fr))",
        "auto-5": "repeat(auto-fit, minmax(min-content, 1fr))",
        "auto-2": "repeat(auto-fit, minmax(min-content, 1fr))",
        "auto-4": "repeat(4, minmax(max-content, 1fr))",
        "manual-6": "repeat(6, minmax(max-content, 2rem))",
      },
      gridTemplateColumns: {
        // Add a new grid template
        "auto-100": "repeat(auto-fit, minmax(min-content, 1fr))",
        "auto-2": "repeat(2, minmax(min-content, 1fr))",
        "auto-8": "repeat(8, minmax(min-content, 1fr))",
        "manual-2": "repeat(2, minmax(min-content, 1fr))",
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        homeArealShot: "url('/images/background/Solar-Home-Aerial-Shot.jpg')",
        customerChatSolPlanet:
          "url('/images/background/AES-Customer-Chat-w-Solplanet.jpg')",
      },
      clipPath: {
        "left-10": "polygon(0 0, 100% 0, 100% 100%, 10% 100%);",
        "left-25": "polygon(0 0, 100% 0, 100% 100%, 24% 100%);",

        "right-30": "polygon(0 0, 100% 0, 30% 100%, 0% 100%)",
        "right-40": "polygon(0 0, 100% 0, 40% 100%, 0% 100%)",
        "right-50": "polygon(0 0, 100% 0, 50% 100%, 0% 100%)",
        "right-60": "polygon(0 0, 100% 0, 60% 100%, 0% 100%)",
        "right-70": "polygon(0 0, 100% 0, 70% 100%, 0% 100%)",
        "right-80": "polygon(0 0, 100% 0, 80% 100%, 0% 100%)",
        "right-90": "polygon(0 0, 100% 0, 90% 100%, 0% 100%)",
      },
      fontFamily: {
        firaSans: ["firaSans"],
        muktaVaani: ["mukta-Vaani"],
        daysone: ["font-daysone"],
      },
      colors: {
        yellow: {
          "light-yellow-50": "rgba(247, 236, 218, 0.5)",
          "light-yellow": "#f7ecda",
          "aes-yellow": "#f9ac0a",
        },
        blue: {
          "dark-blue": "#0d0d19",
          "navy-blue": "#29294c",
        },
        purple: {
          "purp-aes": "#58194f",
        },
        pink: {
          "lighter-pink": "#e71467",
          "darker-pink": "#a20054",
        },
        orange: {
          orange: "#f06039",
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }: any) {
      addUtilities({
        ".clip-path-left-10": {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 10% 100%)",
        },
        ".clip-path-left-25": {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 24% 100%)",
        },
        ".clip-path-right-30": {
          clipPath: "polygon(0 0, 100% 0, 30% 100%, 0% 100%)",
        },
        ".clip-path-right-40": {
          clipPath: "polygon(0 0, 100% 0, 40% 100%, 0% 100%)",
        },
        ".clip-path-right-50": {
          clipPath: "polygon(0 0, 100% 0, 50% 100%, 0% 100%)",
        },
        ".clip-path-right-60": {
          clipPath: "polygon(0 0, 100% 0, 60% 100%, 0% 100%)",
        },
        ".clip-path-right-70": {
          clipPath: "polygon(0 0, 100% 0, 70% 100%, 0% 100%)",
        },
        ".clip-path-right-80": {
          clipPath: "polygon(0 0, 100% 0, 80% 100%, 0% 100%)",
        },
        ".clip-path-right-90": {
          clipPath: "polygon(0 0, 100% 0, 90% 100%, 0% 100%)",
        },
      });
    },
  ],
};

export default config;
