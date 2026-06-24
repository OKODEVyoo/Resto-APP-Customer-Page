'use client'
import { useLang } from '@/context/LangContext'
import type { Lang } from '@/lib/types'

const LANGS: { code: Lang; label: string }[] = [
  { code: 'fr', label: 'FR' },
  { code: 'ar', label: 'ع' },
  { code: 'en', label: 'EN' },
]

export function LanguageSwitcher() {
  const { lang, setLang } = useLang()
  return (
    <div className="flex gap-1 rounded-full p-1" style={{ background: 'rgba(255,255,255,0.15)' }}>
      {LANGS.map(l => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          className="w-8 h-8 rounded-full text-xs font-semibold transition-all tap-highlight-none"
          style={{
            background: lang === l.code ? 'rgba(255,255,255,0.9)' : 'transparent',
            color: lang === l.code ? 'var(--color-primary)' : 'rgba(255,255,255,0.85)',
          }}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}
