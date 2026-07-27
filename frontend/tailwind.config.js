/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
        DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.42), 0 1px 2px -1px rgb(0 0 0 / 0.42)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.42), 0 2px 4px -2px rgb(0 0 0 / 0.42)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.48), 0 4px 6px -4px rgb(0 0 0 / 0.48)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.52), 0 8px 10px -6px rgb(0 0 0 / 0.52)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.65)',
        inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.25)',
      },
    },
    screens: {
      'xl': {'max': '1200px'},
      'lg': {'max': '1080px'},
      'md-lg': {'max': '991px'},
      'md': {'max': '768px'},
      'sm': {'max': '576px'},
      'xs': {'max': '480px'},
      '2xs': {'max': '340px'},
    }
  },
  plugins: [],
}