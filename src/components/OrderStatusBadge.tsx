'use client'
import { useLang } from '@/context/LangContext'
import { getTranslations } from '@/lib/i18n'

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  pending:    { bg: '#fef9c3', color: '#854d0e' },
  confirmed:  { bg: '#dbeafe', color: '#1e40af' },
  preparing:  { bg: '#fed7aa', color: '#9a3412' },
  ready:      { bg: '#dcfce7', color: '#166534' },
  served:     { bg: '#f0fdf4', color: '#166534' },
  paid:       { bg: '#f1f5f9', color: '#475569' },
  cancelled:  { bg: '#fee2e2', color: '#991b1b' },
}

export function OrderStatusBadge({ status }: { status: string }) {
  const { lang } = useLang()
  const tr = getTranslations(lang)
  const label = tr.status[status as keyof typeof tr.status] ?? status
  const colors = STATUS_COLORS[status] ?? { bg: '#f1f5f9', color: '#475569' }

  return (
    <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: colors.bg, color: colors.color }}>
      {label}
    </span>
  )
}
