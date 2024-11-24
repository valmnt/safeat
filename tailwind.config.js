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
                    100: '#E1E6E2',
                    200: '#B1C1C1',
                    300: '#555555',
                },
                blue: {
                    100: '#F3F6FC',
                },
                green: {
                    100: '#66DB8A',
                    200: '#BEE4DF',
                    300: '#0A9985',
                },
                beige: {
                    100: '#F7E9D7',
                },
                pink: {
                    100: '#FFDAD3',
                },
                yellow: {
                    100: '#FFCC00',
                },
                red: {
                    100: '#DE4523',
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
