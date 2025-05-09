/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4361ee',
          dark: '#3a56d4'
        },
        secondary: {
          DEFAULT: '#3f37c9',
          dark: '#3730a3'
        }
      }
    },
  },
  plugins: [],
}