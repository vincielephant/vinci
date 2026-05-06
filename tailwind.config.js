/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: '#f2778a',
          pinkSoft: '#fde6ea',
          pinkDeep: '#e25b71',
          bg: '#f8f8f8',
          ink: '#1b1b1b',
          inkSoft: '#4a4a4a',
          slate: '#7a8a92',
        },
      },
      fontFamily: {
        display: ['Afarsek', 'Fredoka', 'Heebo', 'system-ui', 'sans-serif'],
        sans: ['Fredoka', 'Heebo', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 30px 60px -30px rgba(242,119,138,0.45)',
        card: '0 10px 40px -10px rgba(27,27,27,0.10)',
        glow: '0 0 0 8px rgba(242,119,138,0.15)',
        button: '0 14px 30px -10px rgba(242,119,138,0.55)',
      },
      borderRadius: {
        blob: '40% 60% 55% 45% / 50% 45% 55% 50%',
        blob2: '55% 45% 35% 65% / 45% 55% 50% 50%',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(2deg)' },
        },
        morph: {
          '0%, 100%': { borderRadius: '40% 60% 55% 45% / 50% 45% 55% 50%' },
          '33%': { borderRadius: '55% 45% 35% 65% / 45% 55% 50% 50%' },
          '66%': { borderRadius: '45% 55% 60% 40% / 55% 50% 45% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.3333%)' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        floatSlow: 'floatSlow 6s ease-in-out infinite',
        morph: 'morph 12s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        marquee: 'marquee 30s linear infinite',
      },
      backgroundImage: {
        'shimmer-gradient':
          'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({ strategy: 'class' }),
    require('tailwindcss-rtl'),
  ],
}
