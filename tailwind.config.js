/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5f27cd",
        "primary-dark": "#341f97",
      },
    },
  },
  plugins: [],
};
