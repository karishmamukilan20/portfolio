/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"]
      },
      colors: {
        void: "#0a0a0a",
        electric: "#8b5cf6",
        cyan: "#22d3ee"
      }
    }
  },
  plugins: []
};
