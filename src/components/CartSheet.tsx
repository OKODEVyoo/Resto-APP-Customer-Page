'use client'
import { useState } from 'react'
import { X, Minus, Plus, Trash2, CheckCircle } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useLang } from '@/context/LangContext'
import { getTranslations } from '@/lib/i18n'
import { api } from '@/lib/api'
import type { Restaurant, TableInfo, Order } from '@/lib/types'
import toast from 'react-hot-toast'

interface Props {
  restaurant: Restaurant
  table: TableInfo
  onClose: () => void
  onOrderPlaced: (order: Order) => void
}

export function CartSheet({ restaurant, table, onClose, onOrderPlaced }: Props) {
  const { items, updateQty, remove, clear, total } = useCart()
  const { lang } = useLang()
  const tr = getTranslations(lang)
  const [placing, setPlacing] = useState(false)
  const [success, setSuccess] = useState(false)

  async function placeOrder() {
    if (items.length === 0) return
    setPlacing(true)
    try {
      const order = await api.placeOrder({
        restaurant_id: restaurant.id,
        table_id: table.id,
        items: items.map(i => ({
          menu_item_id: i.menuItem.id,
          quantity: i.qty,
          special_notes: i.notes || undefined,
        })),
      })
      const storageKey = `orders-${restaurant.slug}-${table.table_number}`
      const existing: string[] = JSON.parse(localStorage.getItem(storageKey) ?? '[]')
      localStorage.setItem(storageKey, JSON.stringify([order.id, ...existing]))
      setSuccess(true)
      clear()
      setTimeout(() => {
        onOrderPlaced(order)
        onClose()
      }, 2000)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error placing order')
    } finally {
      setPlacing(false)
    }
  }

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />
      <div className="fixed bottom-0 inset-x-0 z-50 rounded-t-3xl shadow-float sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-[480px]"
        style={{ background: 'var(--color-background)', maxHeight: '85vh' }}>
        <div className="flex flex-col" style={{ maxHeight: '85vh' }}>
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'var(--color-accent)' }}>
            <h2 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>
              {tr.cart.title}
            </h2>
            <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'var(--color-card)' }}>
              <X className="w-4 h-4" style={{ color: 'var(--color-text)' }} />
            </button>
          </div>

          {success ? (
            <div className="flex-1 flex flex-col items-center justify-center py-12 px-6">
              <CheckCircle className="w-16 h-16 mb-4" style={{ color: 'var(--color-primary)' }} />
              <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>
                {tr.order.success}
              </h3>
              <p className="text-sm text-center" style={{ color: 'var(--color-secondary)', opacity: 0.75 }}>
                {tr.order.successBody}
              </p>
            </div>
          ) : (
            <>
              {/* Items */}
              <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3">
                {items.length === 0 ? (
                  <p className="text-center py-8 text-sm" style={{ color: 'var(--color-secondary)', opacity: 0.6 }}>{tr.cart.empty}</p>
                ) : items.map(item => {
                  const name = item.menuItem[`name_${lang}` as 'name_fr' | 'name_ar' | 'name_en'] || item.menuItem.name_fr
                  return (
                    <div key={item.menuItem.id} className="rounded-2xl p-4 shadow-card" style={{ background: 'var(--color-card)' }}>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="font-medium text-sm leading-snug" style={{ color: 'var(--color-text)' }}>{name}</p>
                        <button onClick={() => remove(item.menuItem.id)}>
                          <Trash2 className="w-4 h-4" style={{ color: 'var(--color-secondary)', opacity: 0.5 }} />
                        </button>
                      </div>
                      {item.notes && (
                        <p className="text-xs italic mb-2" style={{ color: 'var(--color-secondary)', opacity: 0.65 }}>{item.notes}</p>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQty(item.menuItem.id, item.qty - 1)}
                            className="w-6 h-6 rounded-full flex items-center justify-center"
                            style={{ background: 'var(--color-accent)' }}>
                            <Minus className="w-3 h-3" style={{ color: 'var(--color-secondary)' }} />
                          </button>
                          <span className="w-5 text-center text-sm font-bold" style={{ color: 'var(--color-text)' }}>{item.qty}</span>
                          <button onClick={() => updateQty(item.menuItem.id, item.qty + 1)}
                            className="w-6 h-6 rounded-full flex items-center justify-center"
                            style={{ background: 'var(--color-primary)' }}>
                            <Plus className="w-3 h-3 text-white" />
                          </button>
                        </div>
                        <span className="font-bold text-sm" style={{ color: 'var(--color-primary)' }}>
                          {(parseFloat(item.menuItem.price) * item.qty).toFixed(2)} {tr.currency}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="px-5 pt-3 pb-8 border-t" style={{ borderColor: 'var(--color-accent)' }}>
                  <div className="flex justify-between mb-4">
                    <span className="font-medium text-sm" style={{ color: 'var(--color-text)' }}>{tr.cart.subtotal}</span>
                    <span className="font-bold" style={{ color: 'var(--color-primary)' }}>{total.toFixed(2)} {tr.currency}</span>
                  </div>
                  <button
                    onClick={placeOrder}
                    disabled={placing}
                    className="w-full py-4 rounded-2xl font-bold text-white disabled:opacity-50 transition-opacity active:opacity-80"
                    style={{ background: 'var(--color-button)' }}
                  >
                    {placing ? '…' : `${tr.order.place} · ${total.toFixed(2)} ${tr.currency}`}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}
