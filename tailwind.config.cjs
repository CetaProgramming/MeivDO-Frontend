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
    //colors of the company made to be used easily with tailwindcss
    screens:{
      'desktop' : '801px',
      //media query for minimal desktop screen (min-width:801px), easy to use grid with tailwindcss
    },
    extend: {},
  },
  plugins: [],
}
