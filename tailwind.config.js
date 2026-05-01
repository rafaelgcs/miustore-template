import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                brand: {
                    50: '#fdf7ef',
                    100: '#f9e5cd',
                    200: '#f4cfa1',
                    300: '#e7b475',
                    400: '#d99a48',
                    500: '#c17a22',
                    600: '#a35f17',
                    700: '#7e4811',
                    800: '#5f380f',
                    900: '#43290b',
                },
                accent: {
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    500: '#334155',
                    600: '#1e293b',
                },
                gold: {
                    50: '#fff7e5',
                    100: '#fee8b8',
                    200: '#fcd98b',
                    300: '#f9c65b',
                    400: '#f6b02a',
                    500: '#d99712',
                    600: '#b77a0f',
                    700: '#8f5d0d',
                    800: '#6c470b',
                    900: '#4c3209',
                },
            },
        },
    },

    plugins: [forms],
};
