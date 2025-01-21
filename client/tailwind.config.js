/** @type {import('tailwindcss').Config} */
console.log("Tailwind config loaded");
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      },
      colors: {
        primary: "#FAF7F5",
        blacktext: "#323232",
        bluebox: "#8E9EB5",
        greenbox: "#92C094",
        redbox: "#CE8282",
        yellowbox: "#FFEBDE"
      }
    },
  },
  plugins: [],
};
