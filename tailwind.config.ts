import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/styles/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        background: "#080808",
        surface: {
          primary: "#11111A",
          secondary: "#0B0B0F",
        },
        accent: {
          blue: "#3D7CFF",
          purple: "#8A3DFF",
          pink: "#FF3D9A",
        },
        text: {
          primary: "#FFFFFF",
          muted: "#B3B3C3",
        },
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        glow: "0 0 30px rgba(61, 124, 255, 0.5)",
      },
    },
  },
  plugins: [],
};

export default config;

