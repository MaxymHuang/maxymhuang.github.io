import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
    './public/projects/**/*.md',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0b0c0f',
        foreground: '#e6e7eb',
        muted: '#9aa1ac',
        accent: '#9b87f5',
        subtle: '#16181d',
        card: '#0f1115',
        border: '#1e222b',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'soft': '0 8px 24px rgba(0,0,0,0.35)',
        'ring': '0 0 0 1px rgba(255,255,255,0.06) inset',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.25rem',
          lg: '2rem',
          xl: '2.5rem',
        },
      },
      animation: {
        'shimmer': 'shimmer 2s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [typography],
} satisfies Config


