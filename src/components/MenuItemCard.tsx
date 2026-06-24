'use client'
import { Plus } from 'lucide-react'
import { useLang } from '@/context/LangContext'
import { getTranslations } from '@/lib/i18n'
import type { MenuItem } from '@/lib/types'

interface Props {
  item: MenuItem
  onTap: (item: MenuItem) => void
}

export function MenuItemCard({ item, onTap }: Props) {
  const { lang } = useLang()
  const tr = getTranslations(lang)

  const name = item[`name_${lang}` as 'name_fr' | 'name_ar' | 'name_en'] || item.name_fr
  const desc = item[`description_${lang}` as 'description_fr' | 'description_ar' | 'description_en']

  return (
    <button
      onClick={() => item.is_available && onTap(item)}
      className="w-full text-start rounded-2xl overflow-hidden shadow-card transition-transform active:scale-[0.98] tap-highlight-none"
      style={{ background: 'var(--color-card)', opacity: item.is_available ? 1 : 0.55 }}
    >
      {/* Image or placeholder */}
      {item.image_url ? (
        <div className="relative h-36 w-full overflow-hidden">
          <img src={item.image_url} alt={name} className="w-full h-full object-cover" />
          {!item.is_available && (
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.45)' }}>
              <span className="text-white text-xs font-semibold px-3 py-1 rounded-full" style={{ background: 'rgba(0,0,0,0.6)' }}>
                {tr.menu.unavailable}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="h-2 w-full" style={{ background: 'linear-gradient(90deg, var(--color-accent) 0%, var(--color-primary) 100%)', opacity: 0.35 }} />
      )}

      <div className="px-4 pt-3 pb-3.5">
        {/* Badges */}
        {(item.is_popular || item.is_chef_choice) && (
          <div className="flex gap-1.5 mb-1.5">
            {item.is_popular && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: 'var(--color-accent)', color: 'var(--color-secondary)' }}>
                ⭐ {tr.menu.popular}
              </span>
            )}
            {item.is_chef_choice && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: 'var(--color-primary)', color: '#fff' }}>
                👨‍🍳 {tr.menu.chefChoice}
              </span>
            )}
          </div>
        )}

        <h3 className="font-semibold text-sm leading-snug mb-1" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
          {name}
        </h3>
        {desc && (
          <p className="text-xs leading-relaxed line-clamp-2 mb-2" style={{ color: 'var(--color-secondary)', opacity: 0.75 }}>
            {desc}
          </p>
        )}

        <div className="flex items-center justify-between mt-1">
          <span className="font-bold text-base" style={{ color: 'var(--color-primary)' }}>
            {parseFloat(item.price).toFixed(2)} {tr.currency}
          </span>
          {item.is_available && (
            <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm"
              style={{ background: 'var(--color-button)' }}>
              <Plus className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
      </div>
    </button>
  )
}
