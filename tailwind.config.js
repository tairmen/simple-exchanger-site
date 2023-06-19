/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#47B05E',
        secondary: '#FF842B',
        black: '#000',
        white: '#fff',
        gray: '#dedede'
      }
    },
  },
  plugins: [],
}

