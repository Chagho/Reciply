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
      },
      colors: {
        mainblue: '#C0EFFF',
        itembg: '#F5F2F2'
      },
    },
  },
  plugins: [],
}

