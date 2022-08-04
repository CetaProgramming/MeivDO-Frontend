/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'MeivRed' : '#CE0E2D',
      'MeivGreen':'#006857',
      'MeivDarkGray' : '#1D1D1E',
      'MeivYellow' : '#FBB03B',
      'MeivGray' : '#808080',
      'MeivLightGray' : '#838383',
    },
    extend: {},
  },
  plugins: [],
}
