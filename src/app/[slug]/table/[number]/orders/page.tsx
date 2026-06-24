import { notFound } from 'next/navigation'
import { api } from '@/lib/api'
import { OrdersPageClient } from './OrdersPageClient'

interface Props { params: Promise<{ slug: string; number: string }> }

export default async function Page({ params }: Props) {
  const { slug, number } = await params
  let restaurant, table
  try {
    ;[restaurant, table] = await Promise.all([api.getRestaurant(slug), api.getTable(slug, number)])
  } catch { notFound() }
  return <OrdersPageClient restaurant={restaurant!} table={table!} />
}
