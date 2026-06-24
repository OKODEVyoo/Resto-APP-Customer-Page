'use client'
import { useRef, useEffect } from 'react'
import { useLang } from '@/context/LangContext'
import type { Category } from '@/lib/types'

interface Props {
  categories: Category[]
  activeId: string
  onSelect: (id: string) => void
}

export function CategoryNav({ categories, activeId, onSelect }: Props) {
  const { lang } = useLang()
  const scrollRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [activeId])

  return (
    <div className="sticky top-0 z-20 glass border-b" style={{ borderColor: 'var(--color-accent)', borderBottomWidth: '1px' }}>
      <div ref={scrollRef} className="flex gap-1 px-4 py-2.5 overflow-x-auto no-scrollbar">
        {categories.map(cat => {
          const name = cat[`name_${lang}` as 'name_fr' | 'name_ar' | 'name_en'] || cat.name_fr
          const isActive = cat.id === activeId
          return (
            <button
              key={cat.id}
              ref={isActive ? activeRef : undefined}
              onClick={() => onSelect(cat.id)}
              className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all tap-highlight-none whitespace-nowrap"
              style={{
                background: isActive ? 'var(--color-primary)' : 'var(--color-card)',
                color: isActive ? '#fff' : 'var(--color-text)',
                boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.15)' : 'none',
                border: isActive ? 'none' : '1px solid var(--color-accent)',
              }}
            >
              {name}
            </button>
          )
        })}
      </div>
    </div>
  )
}
