import type { PaletteSettings } from './types'

export const DEFAULT_PALETTE: PaletteSettings = {
  primary: '#f59e0b',
  secondary: '#92400e',
  background: '#fff7ed',
  text: '#78350f',
  accent: '#fbbf24',
  card: '#fffbeb',
  button: '#d97706',
}

export function applyPalette(palette: PaletteSettings | null | undefined): void {
  const p = palette ?? DEFAULT_PALETTE
  const root = document.documentElement
  root.style.setProperty('--color-primary', p.primary)
  root.style.setProperty('--color-secondary', p.secondary)
  root.style.setProperty('--color-background', p.background)
  root.style.setProperty('--color-text', p.text)
  root.style.setProperty('--color-accent', p.accent)
  root.style.setProperty('--color-card', p.card)
  root.style.setProperty('--color-button', p.button)
  // Also update body background immediately
  root.style.setProperty('background-color', p.background)
}
