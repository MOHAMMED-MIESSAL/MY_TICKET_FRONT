/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        open: ["Open Sans", "sans-serif"],
        sixtyfour: ["Sixtyfour Convergence", "sans-serif"],
        monoton: ["Monoton" , "sans-serif"],
      },
    },
  },
  plugins: [],
}
