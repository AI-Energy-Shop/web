// tailwind.config.js
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      flex: {
        '2': '2 2 0%',
        '3': '3 3 0%',
      },
      gridTemplateRows: {
        'auto-100': 'repeat(auto-fit, minmax(min-content, 1fr))',
        'auto-5': 'repeat(auto-fit, minmax(min-content, 1fr))',
        'auto-2': 'repeat(auto-fit, minmax(min-content, 1fr))',
        'auto-4': 'repeat(4, minmax(max-content, 1fr))',
        'manual-6': 'repeat(6, minmax(max-content, 2rem))',
      },
      gridTemplateColumns: {
        'auto-100': 'repeat(auto-fit, minmax(min-content, 1fr))',
        'auto-2': 'repeat(2, minmax(min-content, 1fr))',
        'auto-8': 'repeat(8, minmax(min-content, 1fr))',
        'manual-2': 'repeat(2, minmax(min-content, 1fr))',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      clipPath: {
        'left-10': 'polygon(0 0, 100% 0, 100% 100%, 10% 100%);',
        'left-20': 'polygon(0 0, 100% 0, 100% 100%, 20% 100%);',
        'left-30': 'polygon(0 0, 100% 0, 100% 100%, 30% 100%);',
        'left-40': 'polygon(0 0, 100% 0, 100% 100%, 40% 100%);',
        'left-50': 'polygon(0 0, 100% 0, 100% 100%, 50% 100%);',
        'left-60': 'polygon(0 0, 100% 0, 100% 100%, 60% 100%);',
        'left-70': 'polygon(0 0, 100% 0, 100% 100%, 70% 100%);',
        'left-80': 'polygon(0 0, 100% 0, 100% 100%, 80% 100%);',
        'left-90': 'polygon(0 0, 100% 0, 100% 100%, 90% 100%);',
        'right-30': 'polygon(0 0, 100% 0, 30% 100%, 0% 100%)',
        'right-40': 'polygon(0 0, 100% 0, 40% 100%, 0% 100%)',
        'right-50': 'polygon(0 0, 100% 0, 50% 100%, 0% 100%)',
        'right-60': 'polygon(0 0, 100% 0, 60% 100%, 0% 100%)',
        'right-70': 'polygon(0 0, 100% 0, 70% 100%, 0% 100%)',
        'right-80': 'polygon(0 0, 100% 0, 80% 100%, 0% 100%)',
        'right-90': 'polygon(0 0, 100% 0, 90% 100%, 0% 100%)',
      },
      fontFamily: {
        firaSans: ['firaSans'],
        muktaVaani: ['mukta-Vaani'],
        daysone: ['font-daysone'],
      },
      colors: {
        yellow: {
          'light-yellow-50': 'rgba(247, 236, 218, 0.66)',
          'light-yellow': '#f7ecda',
          'aes-yellow': '#f9ac0a',
        },
        blue: {
          'dark-blue': '#0d0d19',
          'navy-blue': '#29294c',
        },
        purple: {
          'purp-aes': '#58194f',
        },
        pink: {
          'lighter-pink': '#e71467',
          'darker-pink': '#a20054',
        },
        orange: {
          orange: '#f06039',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    function ({ addUtilities }: any) {
      addUtilities({
        '.clip-path-left-10': {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 10% 100%)',
        },
        '.clip-path-left-20': {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 20% 100%)',
        },
        '.clip-path-left-30': {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 30% 100%)',
        },
        '.clip-path-left-40': {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 40% 100%)',
        },
        '.clip-path-left-50': {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 100%)',
        },
        '.clip-path-left-60': {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 60% 100%)',
        },
        '.clip-path-left-70': {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 70% 100%)',
        },
        '.clip-path-left-80': {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 80% 100%)',
        },
        '.clip-path-left-90': {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 90% 100%)',
        },

        '.clip-path-right-30': {
          clipPath: 'polygon(0 0, 100% 0, 30% 100%, 0% 100%)',
        },
        '.clip-path-right-40': {
          clipPath: 'polygon(0 0, 100% 0, 40% 100%, 0% 100%)',
        },
        '.clip-path-right-50': {
          clipPath: 'polygon(0 0, 100% 0, 50% 100%, 0% 100%)',
        },
        '.clip-path-right-60': {
          clipPath: 'polygon(0 0, 100% 0, 60% 100%, 0% 100%)',
        },
        '.clip-path-right-70': {
          clipPath: 'polygon(0 0, 100% 0, 70% 100%, 0% 100%)',
        },
        '.clip-path-right-75': {
          clipPath: 'polygon(0 0, 100% 0, 75% 100%, 0% 100%)',
        },
        '.clip-path-right-80': {
          clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0% 100%)',
        },
        '.clip-path-right-85': {
          clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)',
        },
        '.clip-path-right-90': {
          clipPath: 'polygon(0 0, 100% 0, 90% 100%, 0% 100%)',
        },
      });
    },
    require('tailwindcss-animate'),
  ],
};

export default config;
