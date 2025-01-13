/** @type {import('tailwindcss').Config} */

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
        "red-deletion": "#ffe0de",
        "green-completed": "#52c419",
      },
      fontFamily: {
        inter: ['"inter"'],
      },
    },
  },
  plugins: [],
};
