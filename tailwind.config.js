/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Brand — taken from the sunrise logo
        brand: {
          DEFAULT: '#f38b1b', // bright logo orange: gradients, lines, dots, icons on dark
          deep: '#b8500a', // buttons and small orange text (AA on white & cream)
          deeper: '#9a4208', // hover / pressed
        },
        sun: '#c8320f', // logo red: eyebrows, numbers, highlights (AA on cream)
        gold: '#fcd756', // logo gold: accents on dark imagery only
        // Neutrals
        ink: '#2f2a26', // headings & primary text
        body: '#5a544e', // paragraphs & secondary text
        line: '#e8e6e3', // subtle clean borders & dividers
        cream: '#ffffff', // white theme background
        sand: '#ffffff', // white theme surface
        night: '#3a2412', // warm dark: photo overlays & placeholders
        ember: '#7a2e0e', // warm mid-tone for overlay gradients
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
