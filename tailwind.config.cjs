/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /*===== LOGO =====*/ 
        'yellow-logo': '#f9f03b',
        'green-logo' : '#00feb2',
        'blue-logo': '#1982ff',

        /*===== FONT, BUTTON & BORDER =====*/
        'gray-font': '#292929',
        'light-gray-font': '#7A7A7A',
        'gray-submenu-font': '#555555',
        'gray-border': '#757575',
        'gray-bg-btn': '#F2F3F5',
        'green-bg-btn': '#12D8B2',
        'orange-bg-btn':'#e27602',
        'light-blue-bg': '#E8F0FE',

        /*===== HEADER =====*/
        'header-primary': '#292929',
        'gray-bg': '#F2F3F5',
        'dark-gray-bg': '#BFBFBF',
      },
    },
  },
  plugins: [],
}