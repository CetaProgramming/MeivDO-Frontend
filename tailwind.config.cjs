/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    //colors of the company made to be used easily with tailwindcss
    extend: {
      fontFamily: {
        'meivdo': 'Audiowide',
        'openSans': 'Open Sans'
      },
      colors: {
        'MeivRed' : '#CE0E2D',
        'MeivGreen':'#006857',
        'MeivDarkGray' : '#1D1D1E',
        'MeivYellow' : '#FBB03B',
        'MeivGray' : '#808080',
        'MeivLightGray' : '#838383',
        'MeivAsh' : '#E6E6E6',
        'MeivRedDark' : '#510000',
        'MeivMatteBlack' : '#0b0b0b'
      },
      gridTemplateRows: {
        // Simple 8 row grid
        '1fr-auto': '1fr auto',
        'auto-1fr': 'auto 1fr',
      },
      gridTemplateColumns: {
        '1fr-auto' : '1fr auto'
      },
      maxWidth: {
        '4/5': '80%',
      },
      borderWidth: {
        '12': '12px'
      },
    },
  },
  plugins: [],
}
