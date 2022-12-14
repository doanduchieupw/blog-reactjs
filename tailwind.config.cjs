/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '576px',
      // => @media (min-width: 576px) { ... }

      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1200px',
      // => @media (min-width: 1200px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    fontFamily: {
      merriweather: ['Merriweather'],
    },
    extend: {
      colors: {
        /*===== LOGO =====*/
        'yellow-logo': '#f9f03b',
        'green-logo': '#00feb2',
        'blue-logo': '#1982ff',

        /*===== FONT, BUTTON & BORDER =====*/
        'gray-font': '#292929',
        'light-gray-font': '#7A7A7A',
        'lighter-gray-font': '#757575',
        'gray-submenu-font': '#555555',
        'green-font': '#428F5E',
        'light-green-font': '#00773e',
        'blue-font': '#0c5dff',
        'gray-border': '#757575',
        'gray-bg-btn': '#F2F3F5',
        'green-bg-btn': '#12D8B2',
        'orange-bg-btn': '#e27602',
        'light-blue-bg': '#E8F0FE',
        'green-border': '#00773e',
        'lightest-gray': '#d9d9d9',

        /*===== HEADER & FOOTER =====*/
        'primary-bg': '#292929',
        'gray-bg': '#F2F3F5',
        'dark-gray-bg': '#BFBFBF',
        'submenu-bg': '#2f3136',
        'footer-bg': '#f6f6f6',

        /*===== ERROR =====*/
        'error-font': '#B72727',
        'error-bg': '#FFF8F8',

        /*===== PLAYER =====*/
        'player-slider': '#ebecee',
        'player-process': '#ddd',
        'player-thumb': '#868686',
      },
      animation: {
        switchLeft: 'rightToLeft 0.3s ease-in-out',
        switchRight: 'leftToRight 0.3s ease-in-out',
        switchDown: 'upToDown 0.2s linear',
        switchUp: 'downToUp 0.1s linear',
        scrollTitle: 'scrollTitle 12s linear infinite',
      },
      keyframes: {
        rightToLeft: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        leftToRight: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        downToUp: {
          '0%': { transform: 'translateY(100%)', opacity: 0 },
          '100%': { transform: 'translateY(0%)', opacity: 1 },
        },
        upToDown: {
          '0%': { transform: 'translateY(-100%)', opacity: 0 },
          '100%': { transform: 'translateY(0%)', opacity: 1 },
        },
        scrollTitle: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
