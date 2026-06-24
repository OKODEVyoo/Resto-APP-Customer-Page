'use client'
import { useState } from 'react'
import { MapPin, Lock, AlertCircle } from 'lucide-react'
import { useLang } from '@/context/LangContext'
import { getTranslations } from '@/lib/i18n'
import { api } from '@/lib/api'
import type { GeoStatus } from '@/lib/types'

interface Props {
  slug: string
  status: GeoStatus
  onRetry: () => void
  onBypass: () => void
}

export function GeoGate({ slug, status, onRetry, onBypass }: Props) {
  const { lang } = useLang()
  const tr = getTranslations(lang)
  const [showPin, setShowPin] = useState(false)
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState('')
  const [verifying, setVerifying] = useState(false)

  async function handlePinSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (pin.length < 4) return
    setVerifying(true)
    setPinError('')
    try {
      await api.verifyPin(slug, pin)
      onBypass()
    } catch {
      setPinError(tr.geo.pinError)
    } finally {
      setVerifying(false)
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

        {/* PIN fallback */}
        {!showPin ? (
          <button
            onClick={() => setShowPin(true)}
            className="w-full py-3 rounded-2xl text-sm font-medium transition-opacity active:opacity-70"
            style={{ background: 'var(--color-card)', color: 'var(--color-primary)', border: '1.5px solid var(--color-accent)' }}
          >
            <Lock className="inline w-4 h-4 mr-1.5 mb-0.5" />
            {tr.geo.pinHint}
          </button>
        ) : (
          <div className="rounded-2xl p-5" style={{ background: 'var(--color-card)', border: '1.5px solid var(--color-accent)' }}>
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>{tr.geo.pinLabel}</p>
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
                className="flex-1 rounded-xl px-4 py-3 text-lg font-mono text-center border-2 outline-none focus:border-[var(--color-primary)] transition-colors"
                style={{ background: 'white', borderColor: pinError ? '#dc2626' : 'var(--color-accent)', color: 'var(--color-text)' }}
                autoFocus
              />
              <button
                type="submit"
                disabled={pin.length < 4 || verifying}
                className="px-5 rounded-xl font-semibold text-sm disabled:opacity-40 transition-opacity"
                style={{ background: 'var(--color-button)', color: '#fff' }}
              >
                {verifying ? '…' : tr.geo.pinSubmit}
              </button>
            </form>
            {pinError && <p className="text-xs mt-2" style={{ color: '#dc2626' }}>{pinError}</p>}
          </div>
        )}
      </div>
    </div>
  )
}
