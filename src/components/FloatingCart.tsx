'use client'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useLang } from '@/context/LangContext'
import { getTranslations } from '@/lib/i18n'

interface Props { onOpen: () => void }

export function FloatingCart({ onOpen }: Props) {
  const { count, total } = useCart()
  const { lang } = useLang()
  const tr = getTranslations(lang)

  if (count === 0) return null

  return (
    <div className="fixed bottom-6 inset-x-0 z-30 px-4 sm:flex sm:justify-center">
      <button
        onClick={onOpen}
        className="w-full sm:max-w-[448px] flex items-center justify-between px-5 py-4 rounded-2xl shadow-float font-semibold text-white tap-highlight-none transition-transform active:scale-[0.98]"
        style={{ background: 'var(--color-button)' }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
            style={{ background: 'rgba(255,255,255,0.2)' }}>
            {count}
          </div>
          <span>{tr.viewCart}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold">{total.toFixed(2)} {tr.currency}</span>
          <ShoppingBag className="w-4 h-4" />
        </div>
      </button>
    </div>
  )
}
