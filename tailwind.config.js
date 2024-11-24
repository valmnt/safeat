/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ['./app/**/*.{js,jsx,ts,tsx}'],
    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            colors: {
                white: {
                    100: '#FFFFFF',
                },
                black: {
                    100: '#333333',
                },
                gray: {
                    200: '#555555',
                },
                blue: {
                    100: '#F3F6FC',
                },
            },
        },
        screens: {
            sm: '320px', // Very small phones (iPhone SE, Galaxy A01)
            md: '390px', // Medium phones (iPhone 15, iPhone 15 Pro, similar phones)
            lg: '510px', // Small tablets and larger phones (e.g., Galaxy S21 Ultra, iPhone 15 Pro Max)
            xl: '720px', // Phablets and medium-sized tablets
            xxl: '1024px', // Standard tablets (iPad, Galaxy Tab A8)
        },
    },
    plugins: [],
};
