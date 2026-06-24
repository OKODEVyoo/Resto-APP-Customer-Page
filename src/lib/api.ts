const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
  })
  const json = await res.json()
  if (json.error) throw new Error(json.error)
  return json.data as T
}

export const api = {
  getRestaurant: (slug: string) =>
    apiFetch<import('./types').Restaurant>(`/api/restaurants/${slug}`),

  getTable: (slug: string, number: string | number) =>
    apiFetch<import('./types').TableInfo>(`/api/restaurants/${slug}/tables/${number}`),

  getMenu: (slug: string) =>
    apiFetch<{ restaurant: import('./types').Restaurant; categories: import('./types').Category[] }>(
      `/api/restaurants/${slug}/menu`
    ),

  placeOrder: (body: {
    restaurant_id: string
    table_id: string
    customer_name?: string
    items: Array<{ menu_item_id: string; quantity: number; special_notes?: string }>
    notes?: string
  }) => apiFetch<import('./types').Order>('/api/orders', { method: 'POST', body: JSON.stringify(body) }),

  getOrder: (id: string) => apiFetch<import('./types').Order>(`/api/orders/${id}`),

  sendRequest: (body: {
    restaurant_id: string
    table_id: string
    type: import('./types').RequestType
  }) => apiFetch('/api/requests', { method: 'POST', body: JSON.stringify(body) }),

  verifyPin: (slug: string, pin: string) =>
    apiFetch<{ verified: boolean; pinRequired: boolean }>(
      `/api/restaurants/${slug}/verify-pin`,
      { method: 'POST', body: JSON.stringify({ pin }) }
    ),
}
