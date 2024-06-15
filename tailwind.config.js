// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    corePlugins: {
        contain: false
    },
    theme: {
        extend: {
            colors: {
                orange: '#ee4d2d',
                textFooter: 'rgba(0, 0, 0, .65)'
            }
        }
    },
    plugins: [
        plugin(function ({ addComponents }) {
            addComponents({
                '.container': {
                    maxWidth: '80rem',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    paddingLeft: '1rem',
                    paddingRight: '1rem'
                }
            })
        })
    ]
}
