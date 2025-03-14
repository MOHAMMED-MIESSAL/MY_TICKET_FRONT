/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        open: ["Open Sans", "sans-serif"],
        sixtyfour: ["Sixtyfour Convergence", "sans-serif"],
        monoton: ["Monoton" , "sans-serif"],
        walter : [ "Walter Turncoat", "cursive"],
      },
    },
  },
  plugins: [],
}
