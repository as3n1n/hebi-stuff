/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#D32F2F", // rouge vif
        dark: "#0D0D0D",
        mid: "#1A1A1A",
        lightGray: "#E0E0E0"
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        display: ["League Spartan", "sans-serif"]
      }
    }
  },
  plugins: []
};
