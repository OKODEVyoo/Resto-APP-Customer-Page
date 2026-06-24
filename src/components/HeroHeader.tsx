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
    <header
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(155deg, var(--color-secondary) 0%, var(--color-primary) 60%, var(--color-accent) 100%)' }}
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0 opacity-20"
        style={{ backgroundImage: 'radial-gradient(circle at 15% 25%, rgba(255,255,255,0.35) 0%, transparent 45%), radial-gradient(circle at 85% 75%, rgba(255,255,255,0.2) 0%, transparent 50%)' }} />
      <div className="pointer-events-none absolute -bottom-12 -end-12 h-48 w-48 rounded-full blur-3xl opacity-30"
        style={{ background: 'var(--color-accent)' }} />

      <div className="relative px-5 pt-5 pb-6">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1 min-w-0">
            {restaurant.logo_url && (
              <img src={restaurant.logo_url} alt={restaurant.name}
                className="w-12 h-12 rounded-xl object-cover mb-2 shadow-md" />
            )}
            <h1 className="text-2xl font-semibold leading-tight text-white truncate" style={{ fontFamily: 'var(--font-display)' }}>
              {restaurant.name}
            </h1>
            {restaurant.description && (
              <p className="text-sm mt-0.5 line-clamp-1" style={{ color: 'rgba(255,255,255,0.75)' }}>
                {restaurant.description}
              </p>
            )}
          </div>
          <LanguageSwitcher />
        </div>

        {/* Table badge */}
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold"
          style={{ background: 'rgba(255,255,255,0.18)', color: 'white', backdropFilter: 'blur(8px)' }}>
          <span className="text-base">🍽️</span>
          {tr.table} {tableNumber}
        </div>
      </div>
    </header>
  )
}
