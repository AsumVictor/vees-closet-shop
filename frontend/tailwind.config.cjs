/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-600": "#F18C8E",
        "primary-400": "#F0B7A4",
        "primary-200": "#F1D1B5",
        "secondary-500": "#305F72",
      },
      screens: {
        "400px": "400px",
        "500px": "500px",
        "600px": "600px",
        "650px": "650px",
        "700px": "700px",
        "750px": "750px",
        "800px": "800px",
        "850px": "850px",
        "900px": "900px",
        "950px": "950px",
        "1000px": "1000px",
        "1100px": "1100px",
        "1200px": "1200px",
        "1300px": "1300px",
      },
    },
  },
  plugins: [],
};
