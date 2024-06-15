/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                orange: '#ee4d2d',
                textFooter: 'rgba(0, 0, 0, .65)'
            }
        }
    },
    plugins: []
}
