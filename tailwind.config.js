/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'accent': {
          400: '#FF7B3E',
          500: '#FF6B28',
          600: '#FF5A12',
          700: '#FF4800',
        },
        'dark': {
          100: '#121212',
          200: '#1e1e1e',
          300: '#2a2a2a',
        },
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'pulse-slow': 'pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'pulse-slow': {
          '0%, 100%': {
            opacity: 0.5,
          },
          '50%': {
            opacity: 0.8,
          },
        },
      },
    },
  },
  plugins: [],
}