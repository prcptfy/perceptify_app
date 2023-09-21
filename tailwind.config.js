const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        purple: {
          450: "#8915E4"
        }
      }
    },
  },
  content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  plugins: [
    nextui({
      addCommonColors: true
    })
  ],
};
