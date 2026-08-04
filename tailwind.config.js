/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        grey: {
          500: '#808080',
        },
      },
    },
  },
  plugins: [],
};
