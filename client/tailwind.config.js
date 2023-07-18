/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  important:'#root',
  theme: {
    extend: {
      colors: {
        white_primary: "#fffff",
        white_secondary: '#edf8de',
        wine_primary: "#8e1f2a",
        wine_secondary: '#5e2127',
        wine_dark_light: '#361c1e',
        wine_dark_deep: '#181112',
        navy_blue: '#2660A4',
      },
      screens: {
        "1000px": "1050px",
        "1100px": "1110px",
        "800px": "800px",
        "1300px": "1300px",
        "400px":"400px",
        "550px": "550px",
      },
    },
    
  },
  plugins: [],
})