/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0F2D5C",
          dark: "#0A1F42",
          50: "#EBF1F4",
        },
        school: {
          black: "#040f2b",
          "off-white": "#dab68e1f",
          warm: "#c0d8f7",
        },
        accent: "#f57542",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
