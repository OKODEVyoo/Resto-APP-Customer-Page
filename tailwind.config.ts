import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        background: 'var(--color-background)',
        foreground: 'var(--color-text)',
        accent: 'var(--color-accent)',
        card: 'var(--color-card)',
        btn: 'var(--color-button)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-arabic)', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgb(0 0 0 / 0.04), 0 8px 24px -8px rgb(0 0 0 / 0.12)',
        float: '0 10px 40px -12px rgb(0 0 0 / 0.35)',
        soft: '0 2px 12px -4px rgb(0 0 0 / 0.15)',
      },
    },
  },
  plugins: [],
}

export default config
