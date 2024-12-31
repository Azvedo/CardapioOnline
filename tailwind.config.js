/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#C1853B',
    },
    fontFamily: {
      'Poppins': ['Poppins', 'sans-serif'],
    },
  },
  plugins: [],
}
}