/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'backg': '#F3F4ED',
        "primary" : "#536162",
        "secondary":"#424642",
        "ternary":"#C06014",

      },
    },
  },
  plugins: [],
}
