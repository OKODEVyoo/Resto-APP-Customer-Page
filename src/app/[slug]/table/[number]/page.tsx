import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { api } from '@/lib/api'
import { OrderingPageClient } from './OrderingPageClient'

interface Props { params: Promise<{ slug: string; number: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, number } = await params
  try {
    const restaurant = await api.getRestaurant(slug)
    return { title: `${restaurant.name} — Table ${number}` }
  } catch {
    return { title: 'RestoApp' }
  }
}

export default async function Page({ params }: Props) {
  const { slug, number } = await params

  let restaurant, table
  try {
    ;[restaurant, table] = await Promise.all([api.getRestaurant(slug), api.getTable(slug, number)])
  } catch (err) {
    const msg = err instanceof Error ? err.message : ''
    if (msg.includes('not found') || msg.includes('inactive') || msg.includes('not active')) notFound()
    notFound()
  }

  return <OrderingPageClient restaurant={restaurant} table={table} />
}
