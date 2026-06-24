'use client'
import { useState, useEffect } from 'react'
import { MapPin, Lock, AlertCircle } from 'lucide-react'
import { useLang } from '@/context/LangContext'
import { getTranslations } from '@/lib/i18n'
import type { GeoStatus } from '@/lib/types'

// Hardcoded bypass PIN — replace with per-restaurant config later
const BYPASS_PIN = '0000'

interface Props {
  status: GeoStatus
  onRetry: () => void
  onBypass: () => void
}

export function GeoGate({ status, onRetry, onBypass }: Props) {
  const { lang } = useLang()
  const tr = getTranslations(lang)
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState('')
  const [isDev, setIsDev] = useState(false)

  useEffect(() => {
    setIsDev(new URLSearchParams(window.location.search).get('dev') === 'true')
  }, [])

  function handlePinSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (pin.length < 4) return
    if (pin === BYPASS_PIN) {
      onBypass()
    } else {
      setPinError(tr.geo.pinError)
    }
  }

  const isOutside = status === 'outside'

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12" style={{ background: 'var(--color-background)' }}>
      <div className="w-full max-w-sm">
        {/* Icon */}
        <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: isOutside ? '#fee2e2' : 'var(--color-accent)', opacity: 0.9 }}>
          {isOutside
            ? <AlertCircle className="w-9 h-9" style={{ color: '#dc2626' }} />
            : <MapPin className="w-9 h-9" style={{ color: 'var(--color-primary)' }} />
          }
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-center mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>
          {isOutside ? tr.geo.outside : tr.geo.title}
        </h1>
        <p className="text-center text-sm leading-relaxed mb-8" style={{ color: 'var(--color-secondary)', opacity: 0.8 }}>
          {isOutside ? tr.geo.outsideBody : tr.geo.body}
        </p>

        {/* Retry button */}
        <button
          onClick={onRetry}
          className="w-full py-3.5 rounded-2xl font-semibold text-sm mb-4 transition-opacity active:opacity-80"
          style={{ background: 'var(--color-button)', color: '#fff' }}
        >
          {isOutside ? tr.geo.retry : tr.geo.enable}
        </button>

        {/* PIN input — always visible */}
        <div className="rounded-2xl p-5 mb-3" style={{ background: 'var(--color-card)', border: '1.5px solid var(--color-accent)' }}>
          <p className="text-sm font-semibold mb-1 flex items-center gap-1.5" style={{ color: 'var(--color-text)' }}>
            <Lock className="w-3.5 h-3.5" />
            {tr.geo.pinLabel}
          </p>
          <p className="text-xs mb-4" style={{ color: 'var(--color-secondary)', opacity: 0.75 }}>{tr.geo.pinBody}</p>
          <form onSubmit={handlePinSubmit} className="flex gap-2">
            <input
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={4}
              value={pin}
              onChange={e => { setPin(e.target.value.slice(0, 4)); setPinError('') }}
              placeholder={tr.geo.pinPlaceholder}
              className="flex-1 rounded-xl px-4 py-3 text-lg font-mono text-center border-2 outline-none transition-colors"
              style={{ background: 'white', borderColor: pinError ? '#dc2626' : 'var(--color-accent)', color: 'var(--color-text)' }}
            />
            <button
              type="submit"
              disabled={pin.length < 4}
              className="px-5 rounded-xl font-semibold text-sm disabled:opacity-40 transition-opacity"
              style={{ background: 'var(--color-button)', color: '#fff' }}
            >
              {tr.geo.pinSubmit}
            </button>
          </form>
          {pinError && <p className="text-xs mt-2" style={{ color: '#dc2626' }}>{pinError}</p>}
        </div>

        {/* Dev skip button — only with ?dev=true */}
        {isDev && (
          <button
            onClick={onBypass}
            className="w-full py-2.5 rounded-2xl text-xs font-medium opacity-60 hover:opacity-100 transition-opacity"
            style={{ background: '#f3f4f6', color: '#374151', border: '1px dashed #9ca3af' }}
          >
            [DEV] Skip geo check
          </button>
        )}
      </div>
    </div>
  )
}
