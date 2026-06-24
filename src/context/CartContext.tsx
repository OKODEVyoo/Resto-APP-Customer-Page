'use client'
import { createContext, useContext, useState, type ReactNode } from 'react'
import type { CartItem, MenuItem } from '@/lib/types'

interface CartCtx {
  items: CartItem[]
  add: (item: MenuItem, qty?: number, notes?: string) => void
  remove: (itemId: string) => void
  updateQty: (itemId: string, qty: number) => void
  updateNotes: (itemId: string, notes: string) => void
  clear: () => void
  total: number
  count: number
}

const Ctx = createContext<CartCtx>({
  items: [], add: () => {}, remove: () => {}, updateQty: () => {}, updateNotes: () => {}, clear: () => {}, total: 0, count: 0,
})

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  function add(item: MenuItem, qty = 1, notes = '') {
    setItems(prev => {
      const existing = prev.find(i => i.menuItem.id === item.id)
      if (existing) return prev.map(i => i.menuItem.id === item.id ? { ...i, qty: i.qty + qty } : i)
      return [...prev, { menuItem: item, qty, notes }]
    })
  }

  function remove(itemId: string) {
    setItems(prev => prev.filter(i => i.menuItem.id !== itemId))
  }

  function updateQty(itemId: string, qty: number) {
    if (qty <= 0) { remove(itemId); return }
    setItems(prev => prev.map(i => i.menuItem.id === itemId ? { ...i, qty } : i))
  }

  function updateNotes(itemId: string, notes: string) {
    setItems(prev => prev.map(i => i.menuItem.id === itemId ? { ...i, notes } : i))
  }

  const total = items.reduce((s, i) => s + parseFloat(i.menuItem.price) * i.qty, 0)
  const count = items.reduce((s, i) => s + i.qty, 0)

  return (
    <Ctx.Provider value={{ items, add, remove, updateQty, updateNotes, clear: () => setItems([]), total, count }}>
      {children}
    </Ctx.Provider>
  )
}

export const useCart = () => useContext(Ctx)
