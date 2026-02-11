/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        paradox: {
          primary: "#8C5A67",
          background: "#DCDEF2",
          surface: "#D9A384",
          text: "#260101",
          border: "#A67C7C"
        }
      }
    }
  },
  plugins: []
};
