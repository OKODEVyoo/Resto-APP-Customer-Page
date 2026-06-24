'use client'
import { useLang } from '@/context/LangContext'
import { getTranslations } from '@/lib/i18n'
import { api } from '@/lib/api'
import type { Restaurant, TableInfo, RequestType } from '@/lib/types'
import toast from 'react-hot-toast'

const REQUESTS: Array<{ type: RequestType; emoji: string }> = [
  { type: 'water', emoji: '💧' },
  { type: 'bread', emoji: '🍞' },
  { type: 'napkins', emoji: '🧻' },
  { type: 'bill', emoji: '💳' },
  { type: 'kids_chair', emoji: '🪑' },
  { type: 'condiments', emoji: '🧂' },
]

interface Props { restaurant: Restaurant; table: TableInfo }

export function QuickRequests({ restaurant, table }: Props) {
  const { lang } = useLang()
  const tr = getTranslations(lang)

  async function send(type: RequestType) {
    try {
      await api.sendRequest({ restaurant_id: restaurant.id, table_id: table.id, type })
      toast.success(tr.requests.sent, { icon: REQUESTS.find(r => r.type === type)?.emoji })
    } catch {
      toast.error('Error sending request')
    }
  }

  return (
    <section className="px-4 py-4">
      <h2 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--color-secondary)', opacity: 0.6 }}>
        {tr.requests.title}
      </h2>
      <div className="grid grid-cols-3 gap-2">
        {REQUESTS.map(({ type, emoji }) => (
          <button
            key={type}
            onClick={() => send(type)}
            className="rounded-2xl py-3 flex flex-col items-center gap-1.5 transition-transform active:scale-95 tap-highlight-none shadow-card"
            style={{ background: 'var(--color-card)' }}
          >
            <span className="text-xl">{emoji}</span>
            <span className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>
              {tr.requests[type]}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
