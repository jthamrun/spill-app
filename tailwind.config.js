/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "base-green": "#7FD6AA",
    },
    extend: {
      fontFamily: {
        quicksand: ["quicksand", "sans-serif"],
      },
    },
  },
  plugins: [],
};
