'use client'
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { Lang } from '@/lib/types'

interface LangCtx { lang: Lang; setLang: (l: Lang) => void; isRTL: boolean }
const Ctx = createContext<LangCtx>({ lang: 'fr', setLang: () => {}, isRTL: false })

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('fr')

  function setLang(l: Lang) {
    setLangState(l)
    if (typeof window !== 'undefined') {
      localStorage.setItem('resto-lang', l)
      document.documentElement.lang = l
      document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr'
    }
  }

  useEffect(() => {
    const saved = localStorage.getItem('resto-lang') as Lang | null
    const browserLang = navigator.language.slice(0, 2) as Lang
    const initial = saved ?? (['fr', 'ar', 'en'].includes(browserLang) ? browserLang : 'fr')
    setLang(initial as Lang)
  }, [])

  return <Ctx.Provider value={{ lang, setLang, isRTL: lang === 'ar' }}>{children}</Ctx.Provider>
}

export const useLang = () => useContext(Ctx)
