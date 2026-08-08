/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        noir: {
          black: '#0A0A0A',
          dark: '#111111',
          card: '#181818',
          border: '#242424',
          muted: '#2a2a2a',
          text: '#E8E4DC',
          secondary: '#8A8680',
          accent: '#C9A96E',
          'accent-dim': '#9A7A4E',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
        widest3: '0.35em',
      },
    },
  },
  plugins: [],
}
