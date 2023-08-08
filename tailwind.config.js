/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "base-green": "#7FD6AA",
        "light-green": "#73FFB9",
        "light2-green": "#B8E7D1",
        "nav-gray": "#D9D9D9",
        "search-bar-gray": "#7B7B7B",
        "expense-gray": "#484848",
        "error-red": "#FF8E87",
      },
      fontFamily: {
        quicksand: ["quicksand", "sans-serif"],
      },
    },
  },
  plugins: [],
};
