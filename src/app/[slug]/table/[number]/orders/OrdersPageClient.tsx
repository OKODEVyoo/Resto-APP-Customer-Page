'use client'
import { useState, useEffect } from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import { ArrowLeft, RefreshCw } from 'lucide-react'
import { LangProvider, useLang } from '@/context/LangContext'
import { api } from '@/lib/api'
import { applyPalette } from '@/lib/palette'
import { OrderStatusBadge } from '@/components/OrderStatusBadge'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { getTranslations } from '@/lib/i18n'
import type { Restaurant, TableInfo, Order } from '@/lib/types'

interface Props { restaurant: Restaurant; table: TableInfo }

export function OrdersPageClient(props: Props) {
  return <LangProvider><Inner {...props} /></LangProvider>
}

function Inner({ restaurant, table }: Props) {
  const { lang } = useLang()
  const tr = getTranslations(lang)

  useEffect(() => { applyPalette(restaurant.settings?.palette ?? null) }, [restaurant.settings])

  // We store order IDs in localStorage per table
  const storageKey = `orders-${restaurant.slug}-${table.table_number}`
  const [orderIds, setOrderIds] = useState<string[]>([])

  useEffect(() => {
    try { setOrderIds(JSON.parse(localStorage.getItem(storageKey) ?? '[]')) } catch { setOrderIds([]) }
  }, [storageKey])

  return (
    <div className="min-h-screen pb-12" style={{ background: 'var(--color-background)' }}>
      <header className="px-5 pt-5 pb-4 flex items-center justify-between" style={{ background: 'linear-gradient(155deg, var(--color-secondary) 0%, var(--color-primary) 60%, var(--color-accent) 100%)' }}>
        <Link href={`/${restaurant.slug}/table/${table.table_number}`} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)' }}>
          <ArrowLeft className="w-4 h-4 text-white" />
        </Link>
        <h1 className="text-lg font-semibold text-white" style={{ fontFamily: 'var(--font-display)' }}>{tr.order.myOrders}</h1>
        <LanguageSwitcher />
      </header>

      <div className="px-4 pt-5 space-y-3">
        {orderIds.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🍽️</p>
            <p className="text-sm" style={{ color: 'var(--color-secondary)', opacity: 0.7 }}>{tr.order.noOrders}</p>
            <Link href={`/${restaurant.slug}/table/${table.table_number}`} className="mt-4 inline-block text-sm font-semibold px-5 py-2.5 rounded-xl" style={{ background: 'var(--color-primary)', color: '#fff' }}>
              {tr.order.back}
            </Link>
          </div>
        ) : (
          orderIds.map(id => <OrderCard key={id} orderId={id} />)
        )}
      </div>
    </div>
  )
}

function OrderCard({ orderId }: { orderId: string }) {
  const { lang } = useLang()
  const tr = getTranslations(lang)
  const { data: order } = useSWR<Order>(`order-${orderId}`, () => api.getOrder(orderId), { refreshInterval: 10000 })

  if (!order) return (
    <div className="rounded-2xl p-4 shadow-card animate-pulse" style={{ background: 'var(--color-card)', height: 96 }} />
  )

  const total = parseFloat(order.total_amount).toFixed(2)

  return (
    <div className="rounded-2xl p-4 shadow-card" style={{ background: 'var(--color-card)' }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono" style={{ color: 'var(--color-secondary)', opacity: 0.6 }}>#{orderId.slice(-6).toUpperCase()}</span>
        <OrderStatusBadge status={order.status} />
      </div>
      {order.order_items?.map(item => {
        const name = item.menu_item?.[`name_${lang}` as 'name_fr' | 'name_ar' | 'name_en'] ?? ''
        return (
          <div key={item.id} className="flex justify-between text-sm mb-1">
            <span style={{ color: 'var(--color-text)' }}>{item.quantity}× {name}</span>
            <span style={{ color: 'var(--color-primary)' }}>{parseFloat(item.subtotal).toFixed(2)}</span>
          </div>
        )
      })}
      <div className="flex justify-between mt-3 pt-3 border-t" style={{ borderColor: 'var(--color-accent)' }}>
        <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{tr.cart.subtotal}</span>
        <span className="font-bold" style={{ color: 'var(--color-primary)' }}>{total} {tr.currency}</span>
      </div>
    </div>
  )
}
