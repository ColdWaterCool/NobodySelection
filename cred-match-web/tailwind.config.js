/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0f1729',
          light: '#1a2540',
        },
        gold: {
          DEFAULT: '#c9a84c',
          light: '#e8d5a0',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Noto Serif SC', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}