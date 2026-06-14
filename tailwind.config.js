/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#081B34',
        surface: '#081B34',
        'surface-container-lowest': '#040d1a',
        'surface-container-low': '#09162a',
        'surface-container': '#0d1f3b',
        'surface-container-high': '#122950',
        'surface-container-highest': '#173562',
        primary: '#ffffff',
        'on-primary': '#081B34',
        'primary-container': '#1E5AA8',
        'on-primary-container': '#ffffff',
        secondary: '#A7B0BA',
        'secondary-container': '#10284d',
        'on-secondary-container': '#ffffff',
        outline: '#A7B0BA',
        'outline-variant': '#42556e',
        'on-surface': '#ffffff',
        'on-surface-variant': '#A7B0BA',
        error: '#ff6b6b',
      },
      fontFamily: {
        headline: ['Montserrat', 'Inter', 'Manrope', 'sans-serif'],
        body: ['Montserrat', 'Inter', 'Manrope', 'sans-serif'],
        label: ['Montserrat', 'Inter', 'Manrope', 'sans-serif'],
      },
      boxShadow: {
        panel: '0 24px 90px rgba(0, 0, 0, 0.28)',
      },
      borderRadius: {
        fullxl: '2rem',
      },
    },
  },
  plugins: [],
};

