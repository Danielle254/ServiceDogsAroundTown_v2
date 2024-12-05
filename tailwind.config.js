/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '500px',
      'md': '800px',
      'lg': '1200px'
    },
    extend: {
      spacing: {
        '500': '32rem'
      },
      colors: {
        darkblue: '#0E1B41',
        lightblue: '#53cbe2',
        lightgreen: '#8bc78d',
        accentblue: '#193076'
      },
      fontFamily: {
        'title': ['"New Amsterdam"', "sans-serif"],
        'body': ["Poppins", "sans-serif"]
      },
      fontSize: {
        'title': '40px'
      }
    },
  },
  plugins: [],
}

