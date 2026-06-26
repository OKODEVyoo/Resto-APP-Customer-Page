'use client'
import { Droplets, Utensils, Layers2, Receipt, Baby, Flame } from 'lucide-react'
import { useLang } from '@/context/LangContext'
import { getTranslations } from '@/lib/i18n'
import { api } from '@/lib/api'
import type { Restaurant, TableInfo, RequestType } from '@/lib/types'
import toast from 'react-hot-toast'

const REQUESTS: Array<{ type: RequestType; Icon: React.ElementType }> = [
  { type: 'water',      Icon: Droplets  },
  { type: 'bread',      Icon: Utensils  },
  { type: 'napkins',    Icon: Layers2   },
  { type: 'bill',       Icon: Receipt   },
  { type: 'kids_chair', Icon: Baby      },
  { type: 'condiments', Icon: Flame     },
]

interface Props { restaurant: Restaurant; table: TableInfo }

export function QuickRequests({ restaurant, table }: Props) {
  const { lang } = useLang()
  const tr = getTranslations(lang)

  async function send(type: RequestType) {
    try {
      await api.sendRequest({ restaurant_id: restaurant.id, table_id: table.id, type })
      toast.success(tr.requests.sent, {
        style: { background: 'var(--color-card)', color: 'var(--color-text)' },
      })
    } catch {
      toast.error('Error sending request')
    }
  }

  return (
    <section className="px-4 py-4">
      <h2 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--color-text)', opacity: 0.45 }}>
        {tr.requests.title}
      </h2>
      <div className="grid grid-cols-3 gap-2">
        {REQUESTS.map(({ type, Icon }) => (
          <button
            key={type}
            onClick={() => send(type)}
            className="rounded-2xl py-3.5 flex flex-col items-center gap-1.5 transition-transform active:scale-95 tap-highlight-none"
            style={{
              background: 'var(--color-card)',
              border: '1px solid var(--color-accent)',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            }}
          >
            <Icon className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
            <span className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>
              {tr.requests[type]}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
