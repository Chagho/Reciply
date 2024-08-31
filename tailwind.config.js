/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  theme: {
    extend: {
      fontFamily: {
        pixelify: 'Pixelify sans'
      },
      backgroundImage: {
        foodbg: "url('/images/food-bg.png')"
      }
    },
  },
  plugins: [],
}

