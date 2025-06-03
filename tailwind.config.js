/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A84FF',
          50: '#E6F2FF',
          100: '#CCE5FF',
          200: '#99CBFF',
          300: '#66B2FF',
          400: '#3398FF',
          500: '#0A84FF',
          600: '#0066CC',
          700: '#004C99',
          800: '#003366',
          900: '#001933',
        },
        success: {
          DEFAULT: '#34C759',
          50: '#E8F7ED',
          100: '#D1F0DC',
          200: '#A3E1B9',
          300: '#75D295',
          400: '#47C372',
          500: '#34C759',
          600: '#299F47',
          700: '#1F7735',
          800: '#145024',
          900: '#0A2812',
        },
        warning: {
          DEFAULT: '#FFD700',
          50: '#FFF9E6',
          100: '#FFF4CC',
          200: '#FFE999',
          300: '#FFDD66',
          400: '#FFD233',
          500: '#FFD700',
          600: '#CCAC00',
          700: '#998100',
          800: '#665600',
          900: '#332B00',
        },
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
    },
  },
  plugins: [],
};