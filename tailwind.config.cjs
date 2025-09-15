// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#6d28d9", // violet premium (purple-700)
          light: "#8b5cf6",   // variante claire
          dark: "#4c1d95",    // variante foncée
        },
        fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      }
      }
    },
  },
  plugins: [],
}
