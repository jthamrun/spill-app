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
                "nav-gray": "#D9D9D9",
            },
            fontFamily: {
                quicksand: ["quicksand", "sans-serif"],
            },
        },
    },
    plugins: [],
};
