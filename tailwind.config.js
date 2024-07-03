/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-copulsory": "#717171",
        "blue-hover-ring": "#079aff",
        "main-blue": "#079aff",
      },
      fontFamily: {
        inter: ['"inter"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
