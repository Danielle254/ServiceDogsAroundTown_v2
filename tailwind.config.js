/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '500': '32rem'
      },
      colors: {
        darkblue: '#0E1B41',
        lightblue: '#53cbe2'
      },
      /* fontFamily: {
        sans: ["Open Sans", "sans-serif"]
      },
      fontSize: {
        para: '1.25rem',   // 20px
        button: '1.5rem',  // 24px
        title: '1.625rem', // 26px
        heading: '3rem',   // 48px
        hero: '4rem',      // 64px
      }, */
    },
  },
  plugins: [],
}

