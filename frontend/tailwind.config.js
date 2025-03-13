/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4a6bff',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        blue: {
          600: '#4a6bff',
          700: '#3b5bfe',
          500: '#5d7bff',
        }
      },
    },
  },
  plugins: [],
} 