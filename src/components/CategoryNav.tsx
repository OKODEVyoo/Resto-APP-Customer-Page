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
    <div className="sticky top-0 z-20 border-b" style={{
      borderColor: 'var(--color-accent)',
      background: 'color-mix(in srgb, var(--color-background) 85%, transparent)',
      backdropFilter: 'blur(16px) saturate(160%)',
      WebkitBackdropFilter: 'blur(16px) saturate(160%)',
    }}>
      <div ref={scrollRef} className="flex gap-0 px-3 overflow-x-auto no-scrollbar">
        {categories.map(cat => {
          const name = cat[`name_${lang}` as 'name_fr' | 'name_ar' | 'name_en'] || cat.name_fr
          const isActive = cat.id === activeId
          return (
            <button
              key={cat.id}
              ref={isActive ? activeRef : undefined}
              onClick={() => onSelect(cat.id)}
              className="relative flex-shrink-0 px-4 py-3 text-sm font-medium transition-colors duration-150 tap-highlight-none whitespace-nowrap"
              style={{ color: isActive ? 'var(--color-primary)' : 'var(--color-text)', fontWeight: isActive ? 600 : 400 }}
            >
              {name}
              {/* Animated bottom indicator line */}
              <span
                className="absolute bottom-0 left-2 right-2 h-[2.5px] rounded-full transition-all duration-200"
                style={{
                  background: 'var(--color-primary)',
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'scaleX(1)' : 'scaleX(0.4)',
                }}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}
