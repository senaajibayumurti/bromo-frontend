/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.css",

  ],
  theme: {
    extend: {
      colors: {
        'bromo-gray-500': '#6C87AE'
      }
    },
  },
  plugins: [],
}