/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-copulsory": "#717171",
        "blue-light": "#dfebf5",
        "blue-hover-ring": "#079aff",
        "main-blue": "#079aff",
        "blue-button-bg": "#8cd7ff4e",
      },
      fontFamily: {
        inter: ['"inter"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
