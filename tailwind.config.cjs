/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'yellow-logo': '#f9f03b',
        'green-logo' : '#00feb2',
        'blue-logo': '#1982ff',
        'gray-font': '#292929',
        'light-gray-font': '#7A7A7A',
        'gray-border': '#757575',
        'gray-bg-btn': '#F2F3F5',
        
      },
    },
  },
  plugins: [],
}