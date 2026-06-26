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
      className="w-full text-start rounded-2xl overflow-hidden transition-transform duration-150 active:scale-[0.98] tap-highlight-none"
      style={{
        background: 'var(--color-card)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
        opacity: item.is_available ? 1 : 0.6,
      }}
    >
      {/* Image — 60% of card visual weight */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-100" style={{ background: 'var(--color-accent)', opacity: item.image_url ? 1 : undefined }}>
        {item.image_url ? (
          <img src={item.image_url} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl opacity-30">🍽️</div>
        )}

        {/* Bottom gradient for readability */}
        <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.32) 0%, transparent 100%)' }} />

        {/* Badges — top-right of image */}
        {(item.is_popular || item.is_chef_choice) && (
          <div className="absolute top-2.5 end-2.5 flex flex-col gap-1 items-end">
            {item.is_popular && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm"
                style={{ background: '#f59e0b', color: '#fff' }}>
                ⭐ {tr.menu.popular}
              </span>
            )}
            {item.is_chef_choice && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm"
                style={{ background: 'var(--color-primary)', color: '#fff' }}>
                👨‍🍳 {tr.menu.chefChoice}
              </span>
            )}
          </div>
        )}

        {/* Unavailable overlay */}
        {!item.is_available && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.45)' }}>
            <span className="text-white text-xs font-semibold px-3 py-1 rounded-full" style={{ background: 'rgba(0,0,0,0.6)' }}>
              {tr.menu.unavailable}
            </span>
          </div>
        )}

        {/* Floating "+" button overlapping image bottom-right */}
        {item.is_available && (
          <div className="absolute bottom-2.5 end-2.5 w-9 h-9 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: 'var(--color-button)' }}>
            <Plus className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
        )}
      </div>

      {/* Text content */}
      <div className="px-3.5 pt-2.5 pb-3">
        <h3 className="font-semibold text-[15px] leading-snug mb-1 line-clamp-1"
          style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
          {name}
        </h3>
        {desc && (
          <p className="text-xs leading-relaxed line-clamp-2 mb-2" style={{ color: 'var(--color-text)', opacity: 0.55 }}>
            {desc}
          </p>
        )}
        <span className="font-bold text-base" style={{ color: 'var(--color-primary)' }}>
          {parseFloat(item.price).toFixed(2)} {tr.currency}
        </span>
      </div>
    </button>
  )
}
