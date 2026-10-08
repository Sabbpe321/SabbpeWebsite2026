import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sabbpe: {
          navy: { DEFAULT: '#0E1A2B', light: '#14233C', dark: '#050A10' },
          blue: { DEFAULT: '#2563EB', light: '#60A5FA' },
          cyan: '#2EE6D6',
          teal: '#14B8A6',
          green: '#22C55E',
          yellow: '#EAB308',
          pastel: '#7C83FF',
          border: 'rgba(255, 255, 255, 0.06)',
          text: { secondary: 'rgba(255, 255, 255, 0.72)', tertiary: 'rgba(255, 255, 255, 0.45)' },
        },
      },
      fontFamily: {
        display: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
