'use client'
import { useLang } from '@/context/LangContext'
import { LanguageSwitcher } from './LanguageSwitcher'
import { getTranslations } from '@/lib/i18n'
import type { Restaurant } from '@/lib/types'

interface Props { restaurant: Restaurant; tableNumber: string | number }

export function HeroHeader({ restaurant, tableNumber }: Props) {
  const { lang } = useLang()
  const tr = getTranslations(lang)

  return (
    <header className="relative overflow-hidden" style={{
      background: 'linear-gradient(155deg, var(--color-secondary) 0%, var(--color-primary) 55%, color-mix(in srgb, var(--color-accent) 70%, var(--color-primary)) 100%)',
    }}>
      {/* Decorative orbs */}
      <div className="pointer-events-none absolute inset-0 opacity-25"
        style={{ backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(255,255,255,0.4) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(255,255,255,0.2) 0%, transparent 45%)' }} />
      <div className="pointer-events-none absolute -bottom-16 -end-16 h-56 w-56 rounded-full blur-3xl opacity-25"
        style={{ background: 'var(--color-accent)' }} />

      <div className="relative px-5 pt-6 pb-5">
        <div className="flex items-start justify-between gap-3 mb-5">
          {/* Logo + name */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {restaurant.logo_url ? (
              <img
                src={restaurant.logo_url}
                alt={restaurant.name}
                className="w-14 h-14 rounded-full object-cover shadow-lg border-2 shrink-0"
                style={{ borderColor: 'rgba(255,255,255,0.35)' }}
              />
            ) : (
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold shrink-0 shadow-lg"
                style={{ background: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.9)' }}>
                {restaurant.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <h1
                className="text-2xl font-semibold leading-tight text-white"
                style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
              >
                {restaurant.name}
              </h1>
              {restaurant.description && (
                <p className="text-sm mt-0.5 line-clamp-1" style={{ color: 'rgba(255,255,255,0.72)' }}>
                  {restaurant.description}
                </p>
              )}
            </div>
          </div>

          <LanguageSwitcher />
        </div>

        {/* Table badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold"
          style={{ background: 'rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)' }}>
          <span aria-hidden>🍽️</span>
          {tr.table} {tableNumber}
        </div>
      </div>
    </header>
  )
}
