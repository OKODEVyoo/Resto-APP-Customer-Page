'use client'
import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import useSWR from 'swr'
import { Toaster } from 'react-hot-toast'
import { LangProvider } from '@/context/LangContext'
import { CartProvider } from '@/context/CartContext'
import { useLang } from '@/context/LangContext'
import { useCart } from '@/context/CartContext'
import { api } from '@/lib/api'
import { applyPalette } from '@/lib/palette'
import { distanceMeters } from '@/lib/geo'
import { HeroHeader } from '@/components/HeroHeader'
import { CategoryNav } from '@/components/CategoryNav'
import { MenuItemCard } from '@/components/MenuItemCard'
import { ItemDetailSheet } from '@/components/ItemDetailSheet'
import { FloatingCart } from '@/components/FloatingCart'
import { CartSheet } from '@/components/CartSheet'
import { QuickRequests } from '@/components/QuickRequests'
import { GeoGate } from '@/components/GeoGate'
import type { Restaurant, TableInfo, MenuItem, Category, GeoStatus, Order } from '@/lib/types'
import { getTranslations } from '@/lib/i18n'

interface Props { restaurant: Restaurant; table: TableInfo }

export function OrderingPageClient({ restaurant, table }: Props) {
  return (
    <LangProvider>
      <CartProvider>
        <Inner restaurant={restaurant} table={table} />
      </CartProvider>
    </LangProvider>
  )
}

function Inner({ restaurant, table }: Props) {
  const { lang } = useLang()
  const tr = getTranslations(lang)
  const [geoStatus, setGeoStatus] = useState<GeoStatus>('checking')
  const [activeCategory, setActiveCategory] = useState('')
  const [openItem, setOpenItem] = useState<MenuItem | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [placedOrders, setPlacedOrders] = useState<Order[]>([])
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})
  const isProgrammatic = useRef(false)

  // Apply palette from restaurant settings
  useEffect(() => {
    applyPalette(restaurant.settings?.palette ?? null)
  }, [restaurant.settings])

  // Fetch menu
  const { data: menuData, error: menuError } = useSWR(
    `menu-${restaurant.slug}`,
    () => api.getMenu(restaurant.slug),
    { revalidateOnFocus: false }
  )

  const categories: Category[] = menuData?.categories ?? []
  const menuLoaded = menuData !== undefined

  useEffect(() => {
    if (categories.length > 0 && !activeCategory) setActiveCategory(categories[0].id)
  }, [categories, activeCategory])

  // Geolocation check
  const checkGeo = useCallback(() => {
    // geo_radius_meters >= 999999 means geo check is disabled for this restaurant
    if (restaurant.geo_radius_meters >= 999999) { setGeoStatus('ok'); return }
    setGeoStatus('checking')
    if (!navigator.geolocation) { setGeoStatus('denied'); return }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const dist = distanceMeters(pos.coords.latitude, pos.coords.longitude, restaurant.latitude, restaurant.longitude)
        setGeoStatus(dist <= restaurant.geo_radius_meters ? 'ok' : 'outside')
      },
      () => setGeoStatus('denied'),
      { timeout: 10000, maximumAge: 30000 }
    )
  }, [restaurant])

  useEffect(() => { checkGeo() }, [checkGeo])

  // Scroll-based category highlight
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammatic.current) return
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveCategory(visible[0].target.getAttribute('data-cat-id') || activeCategory)
      },
      { rootMargin: '-120px 0px -55% 0px', threshold: [0, 0.25, 0.5] }
    )
    Object.values(sectionRefs.current).forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [categories, activeCategory])

  function handleCategorySelect(id: string) {
    setActiveCategory(id)
    const el = sectionRefs.current[id]
    if (el) {
      isProgrammatic.current = true
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setTimeout(() => { isProgrammatic.current = false }, 700)
    }
  }

  if (geoStatus === 'checking') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-background)' }}>
        <div className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin" style={{ borderColor: 'var(--color-accent)', borderTopColor: 'var(--color-primary)' }} />
      </div>
    )
  }

  if (geoStatus === 'denied' || geoStatus === 'outside') {
    return (
      <LangProvider>
        <GeoGate
          status={geoStatus}
          onRetry={checkGeo}
          onBypass={() => setGeoStatus('bypassed')}
        />
      </LangProvider>
    )
  }

  if (menuError) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--color-background)' }}>
        <div className="text-center">
          <p className="text-4xl mb-4">😕</p>
          <p className="font-semibold mb-2" style={{ color: 'var(--color-text)' }}>{tr.error.notFound}</p>
          <button onClick={() => window.location.reload()} className="text-sm px-4 py-2 rounded-xl" style={{ background: 'var(--color-primary)', color: '#fff' }}>
            {tr.error.retry}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen sm:flex sm:justify-center" style={{ background: 'var(--color-background)' }}>
    <div className="relative min-h-screen pb-32 w-full sm:max-w-[480px]" style={{ background: 'var(--color-background)' }}>
      <Toaster position="top-center" toastOptions={{ style: { fontFamily: 'var(--font-sans)' } }} />

      <HeroHeader restaurant={restaurant} tableNumber={table.table_number} />

      {categories.length > 0 && (
        <CategoryNav categories={categories} activeId={activeCategory} onSelect={handleCategorySelect} />
      )}

      {/* Menu sections */}
      {menuLoaded && categories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
          <p className="text-6xl mb-5">🍽️</p>
          <p className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
            {tr.menu.noItems}
          </p>
          <p className="text-sm leading-relaxed mb-10" style={{ color: 'var(--color-secondary)', opacity: 0.65 }}>
            Le menu de ce restaurant n&apos;est pas encore disponible.
          </p>
          <QuickRequests restaurant={restaurant} table={table} />
        </div>
      ) : (
        <>
          <div className="px-4 pt-4 space-y-8">
            {categories.map(cat => {
              const catName = cat[`name_${lang}` as 'name_fr' | 'name_ar' | 'name_en'] || cat.name_fr
              return (
                <section key={cat.id} ref={el => { sectionRefs.current[cat.id] = el }} data-cat-id={cat.id}>
                  <h2 className="text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>
                    {catName}
                  </h2>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {cat.items.map(item => (
                      <MenuItemCard key={item.id} item={item} onTap={setOpenItem} />
                    ))}
                  </div>
                </section>
              )
            })}
          </div>

          {categories.length > 0 && (
            <div className="mt-6">
              <QuickRequests restaurant={restaurant} table={table} />
            </div>
          )}
        </>
      )}

      {/* Item detail sheet */}
      <ItemDetailSheet item={openItem} onClose={() => setOpenItem(null)} />

      {/* Floating cart */}
      <FloatingCart onOpen={() => setCartOpen(true)} />

      {/* Cart sheet */}
      {cartOpen && (
        <CartSheet
          restaurant={restaurant}
          table={table}
          onClose={() => setCartOpen(false)}
          onOrderPlaced={(order) => setPlacedOrders(prev => [...prev, order])}
        />
      )}
    </div>
    </div>
  )
}
