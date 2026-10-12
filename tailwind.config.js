// Colours come from CSS variables defined in src/index.css.
const v = (name) => `rgb(var(--c-${name}) / <alpha-value>)`

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Brand — taken from the sunrise logo
        brand: {
          DEFAULT: v('brand'), // bright accent: gradients, lines, dots, icons on dark
          deep: v('brand-deep'), // buttons and small accent text (AA on light backgrounds)
          deeper: v('brand-deeper'), // hover / pressed
        },
        sun: v('sun'), // secondary accent: eyebrows, numbers, highlights
        gold: v('gold'), // accents on dark imagery only
        // Neutrals
        ink: v('ink'), // headings & primary text
        body: v('body'), // paragraphs & secondary text
        line: v('line'), // borders & dividers
        cream: v('cream'), // page background
        sand: v('sand'), // tinted section background
        night: v('night'), // dark: photo overlays & placeholders
        ember: v('ember'), // mid-tone for overlay gradients
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        number: ['Montserrat', 'Manrope', 'sans-serif'],
      },
      maxWidth: {
        site: '1200px',
      },
      boxShadow: {
        none: 'none',
        sm: 'none',
        DEFAULT: 'none',
        md: 'none',
        lg: 'none',
        xl: 'none',
        '2xl': 'none',
        inner: 'none',
      },
      dropShadow: {
        none: 'none',
        sm: 'none',
        DEFAULT: 'none',
        md: 'none',
        lg: 'none',
        xl: 'none',
        '2xl': 'none',
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
