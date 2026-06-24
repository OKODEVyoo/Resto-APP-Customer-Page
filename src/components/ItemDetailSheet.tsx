'use client'
import { useState } from 'react'
import { X, Minus, Plus } from 'lucide-react'
import { useLang } from '@/context/LangContext'
import { useCart } from '@/context/CartContext'
import { getTranslations } from '@/lib/i18n'
import type { MenuItem } from '@/lib/types'
import toast from 'react-hot-toast'

interface Props { item: MenuItem | null; onClose: () => void }

export function ItemDetailSheet({ item, onClose }: Props) {
  const { lang } = useLang()
  const tr = getTranslations(lang)
  const cart = useCart()
  const [qty, setQty] = useState(1)
  const [notes, setNotes] = useState('')

  if (!item) return null

  const name = item[`name_${lang}` as 'name_fr' | 'name_ar' | 'name_en'] || item.name_fr
  const desc = item[`description_${lang}` as 'description_fr' | 'description_ar' | 'description_en']

  function handleAdd() {
    cart.add(item!, qty, notes)
    toast.success(tr.cart.itemAdded, { icon: '🛒', style: { background: 'var(--color-card)', color: 'var(--color-text)' } })
    onClose()
    setQty(1)
    setNotes('')
  }

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />
      <div className="fixed bottom-0 inset-x-0 z-50 rounded-t-3xl shadow-float overflow-hidden sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-[480px]"
        style={{ background: 'var(--color-background)', maxHeight: '90vh' }}>
        <div className="overflow-y-auto max-h-[90vh]">
          {item.image_url && (
            <div className="relative h-56 w-full">
              <img src={item.image_url} alt={name} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 60%, var(--color-background))' }} />
            </div>
          )}

          <div className="px-5 pt-4 pb-8">
            <div className="flex items-start justify-between gap-3 mb-1">
              <h2 className="text-xl font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>{name}</h2>
              <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'var(--color-card)' }}>
                <X className="w-4 h-4" style={{ color: 'var(--color-text)' }} />
              </button>
            </div>

            <p className="text-lg font-bold mb-3" style={{ color: 'var(--color-primary)' }}>
              {parseFloat(item.price).toFixed(2)} {tr.currency}
            </p>

            {desc && <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-secondary)', opacity: 0.8 }}>{desc}</p>}

            {/* Notes */}
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder={tr.notes}
              rows={2}
              className="w-full rounded-xl px-4 py-3 text-sm resize-none outline-none focus:ring-2 mb-5"
              style={{ background: 'var(--color-card)', color: 'var(--color-text)', border: '1.5px solid var(--color-accent)', '--tw-ring-color': 'var(--color-primary)' } as React.CSSProperties}
            />

            {/* Qty + Add */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3 rounded-2xl px-4 py-2" style={{ background: 'var(--color-card)', border: '1.5px solid var(--color-accent)' }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: qty === 1 ? 'var(--color-accent)' : 'var(--color-primary)' }}>
                  <Minus className="w-3.5 h-3.5 text-white" />
                </button>
                <span className="w-6 text-center font-bold text-base" style={{ color: 'var(--color-text)' }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'var(--color-primary)' }}>
                  <Plus className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
              <button onClick={handleAdd} className="flex-1 py-3 rounded-2xl font-semibold text-sm text-white transition-opacity active:opacity-80"
                style={{ background: 'var(--color-button)' }}>
                {tr.add} · {(parseFloat(item.price) * qty).toFixed(2)} {tr.currency}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
