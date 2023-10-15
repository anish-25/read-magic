/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {

      },
      keyframes: {
        open: {
          '0%': {
            opacity: 1,
            transform: 'translateX(100%)',
          },
        },
        close: {
          to: {
            opacity: 0,
            transform: 'translateX(100%)',
          },
        },
        waving: {
          '0%': { transform: 'rotate(0.0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10.0deg)' },
          '60%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(0.0deg)' },
        },
      },
      animation: {
        'drawer-open': 'open 0.3s ease-in-out',
        'drawer-close': 'close 0.3s ease-in-out',
        'waving-hand': 'waving 2s linear 3',
      },
    },
  },
  plugins: [],
};
