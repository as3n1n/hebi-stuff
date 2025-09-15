import { defineConfig } from "vite";

export default defineConfig({
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["MuseoSansCyrl", "sans-serif"]
      },
      colors: {
        dark: "#0F0E13",
        surface: "#1A1823",
        primary: "#D72638",
        accent: "#FF4C4C",
        text: "#E0E0E0",
        "text-secondary": "#A3A3A3"
      },
      boxShadow: {
        glow: "0 0 15px rgba(215, 38, 56, 0.7)"
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" }
        }
      },
      animation: {
        fadeInUp: "fadeInUp 0.6s ease-out"
      }
    }
  },
  plugins: []
});
