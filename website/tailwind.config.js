/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 20px rgba(56, 255, 255, 0.25), 0 0 35px rgba(153, 102, 255, 0.25)',
      },
      colors: {
        midnight: '#050816',
        navy: '#0b1125',
        cyan: '#01f5f5',
        'electric-purple': '#bf00ff',
        lime: '#8fff3b',
      },
    },
  },
  plugins: [],
};
