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
      <div className="fixed inset-0 z-40 bg-black/60 animate-slide-up" style={{ animationDuration: '0.15s' }} onClick={onClose} />
      <div
        className="fixed bottom-0 inset-x-0 z-50 rounded-t-3xl overflow-hidden animate-slide-up sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-[480px]"
        style={{ background: 'var(--color-background)', maxHeight: '92vh', boxShadow: '0 -8px 40px rgba(0,0,0,0.18)' }}
      >
        <div className="overflow-y-auto" style={{ maxHeight: '92vh' }}>
          {/* Full-width image */}
          {item.image_url && (
            <div className="relative h-60 w-full flex-shrink-0">
              <img src={item.image_url} alt={name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.12) 0%, transparent 40%, var(--color-background) 100%)' }} />
            </div>
          )}

          {/* Close button — floats top-right */}
          <button
            onClick={onClose}
            className="absolute top-3 end-3 w-9 h-9 rounded-full flex items-center justify-center shadow-md z-10"
            style={{ background: item.image_url ? 'rgba(0,0,0,0.45)' : 'var(--color-card)', backdropFilter: 'blur(8px)' }}
          >
            <X className="w-4 h-4 text-white" />
          </button>

          <div className="px-5 pt-4 pb-8">
            <div className="flex items-start justify-between gap-3 mb-1">
              <h2 className="text-xl font-semibold leading-tight flex-1"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>
                {name}
              </h2>
              <p className="text-xl font-bold shrink-0" style={{ color: 'var(--color-primary)' }}>
                {parseFloat(item.price).toFixed(2)} {tr.currency}
              </p>
            </div>

            {desc && (
              <p className="text-sm leading-relaxed mb-4 mt-2" style={{ color: 'var(--color-text)', opacity: 0.65 }}>
                {desc}
              </p>
            )}

            {/* Special notes */}
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder={tr.notes}
              rows={2}
              className="w-full rounded-xl px-4 py-3 text-sm resize-none outline-none mb-5 transition-shadow"
              style={{
                background: 'var(--color-card)',
                color: 'var(--color-text)',
                border: '1.5px solid var(--color-accent)',
              }}
              onFocus={e => (e.target.style.borderColor = 'var(--color-primary)')}
              onBlur={e => (e.target.style.borderColor = 'var(--color-accent)')}
            />

            {/* Quantity + Add */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-2xl px-3 py-2"
                style={{ background: 'var(--color-card)', border: '1.5px solid var(--color-accent)' }}>
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: qty === 1 ? 'var(--color-accent)' : 'var(--color-primary)' }}
                >
                  <Minus className="w-3.5 h-3.5 text-white" />
                </button>
                <span className="w-7 text-center font-bold text-base" style={{ color: 'var(--color-text)' }}>{qty}</span>
                <button
                  onClick={() => setQty(q => q + 1)}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: 'var(--color-primary)' }}
                >
                  <Plus className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
              <button
                onClick={handleAdd}
                className="flex-1 py-3.5 rounded-2xl font-semibold text-sm text-white transition-opacity active:opacity-80"
                style={{ background: 'var(--color-button)' }}
              >
                {tr.add} · {(parseFloat(item.price) * qty).toFixed(2)} {tr.currency}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
