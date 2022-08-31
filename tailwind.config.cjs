/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                /*===== LOGO =====*/
                'yellow-logo': '#f9f03b',
                'green-logo': '#00feb2',
                'blue-logo': '#1982ff',

                /*===== FONT, BUTTON & BORDER =====*/
                'gray-font': '#292929',
                'light-gray-font': '#7A7A7A',
                'gray-submenu-font': '#555555',
                'green-font': '#428F5E',
                'gray-border': '#757575',
                'gray-bg-btn': '#F2F3F5',
                'green-bg-btn': '#12D8B2',
                'orange-bg-btn': '#e27602',
                'light-blue-bg': '#E8F0FE',

                /*===== HEADER =====*/
                'primary-bg': '#292929',
                'gray-bg': '#F2F3F5',
                'dark-gray-bg': '#BFBFBF',

                /*===== ERROR =====*/
                'error-font' : '#B72727',
                'error-bg': '#FFF8F8',
            },
            animation: {
              fade: 'fadeOut 5s ease-in-out',
            },
            keyframes: theme => ({
              fadeOut: {
                '0%': { backgroundColor: theme('colors.red.300') },
                '100%': { backgroundColor: theme('colors.transparent') },
              },
            }),
        },
    },
    plugins: [],
};
