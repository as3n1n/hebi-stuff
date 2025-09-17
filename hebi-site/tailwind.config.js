/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        hebi: {
          red: '#e11d48',
          dark: '#0b0b0b'
        }
      },
      boxShadow: {
        'hebi': '0 0 30px rgba(225,29,72,0.35)'
      }
    }
  },
  plugins: []
};
