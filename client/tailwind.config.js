module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'primary-color': '#0463FA',
        'secondary-color': '#C7DCFB',
        'tertiary-color': '#08244f',
        'font-color': '#1B2C51',
        'font-light': '#eee',
        'bg-color': '#fafafa',
        'bg-light': '#fafafa',
        'bg-dark': '#1e1e1e',
        'card-bg': 'rgb(245, 245, 245)',
        'bg-grey': '#bab8b8',
      },
    },
  },
  plugins: [],
};