/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#2f2a26',
        night: '#3a2c22',
        brass: {
          DEFAULT: '#f38b1b',
          light: '#fcd756',
          dark: '#c9300e',
        },
        sun: '#e23911',
        forest: '#3a2c22',
        terracotta: '#e23911',
        cream: '#fffdf9',
        mist: '#fffbf5',
        peach: '#fff7ec',
        glow: '#fff0d9',
        body: '#5a544e',
        line: '#f0dfc6',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        number: ['Montserrat', 'Manrope', 'sans-serif'],
      },
      maxWidth: {
        site: '1200px',
      },
      keyframes: {
        'hero-in': {
          '0%': { opacity: '0', transform: 'scale(1.04)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        drift: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'slow-zoom': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.06)' },
        },
      },
      animation: {
        'hero-in': 'hero-in 1.2s ease forwards',
        drift: 'drift 8s ease-in-out infinite',
        'slow-zoom': 'slow-zoom 18s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
}
