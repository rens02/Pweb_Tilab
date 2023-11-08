/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "royal-blue": {
          50: "#f0f4fe",
          100: "#dde5fc",
          200: "#c3d3fa",
          300: "#9bb8f5",
          400: "#6b92ef",
          500: "#5376ea",
          600: "#334fdd",
          700: "#2a3ccb",
          800: "#2833a5",
          900: "#263082",
          950: "#1b1f50",
        },
      },
    },
  },
  plugins: [],
};
