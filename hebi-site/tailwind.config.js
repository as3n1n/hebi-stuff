// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#B22222",     // Hebi rouge
        background: "#0F0E13",  // toile sombre
        surface: "#1A1823",     // surface card/hero
        accent: "#FF4C4C",      // rouge plus vif pour hover
        text: "#E0E0E0",        // texte léger
        text-secondary: "#A3A3A3", // texte plus discret
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],  // typographie moderne
      },
      borderRadius: {
        lg: "0.75rem",  // arrondi doux
      },
    },
  },
  plugins: [],
};
