export interface PaletteSettings {
  primary: string
  secondary: string
  background: string
  text: string
  accent: string
  card: string
  button: string
}

export interface RestaurantSettings {
  palette?: PaletteSettings
  access_pin?: string
}

export interface Restaurant {
  id: string
  name: string
  slug: string
  logo_url: string | null
  description: string | null
  currency: string
  timezone: string
  latitude: number
  longitude: number
  geo_radius_meters: number
  settings: RestaurantSettings | null
  is_active: boolean
}

export interface TableInfo {
  id: string
  table_number: number
  is_active: boolean
}

export interface Category {
  id: string
  name_fr: string
  name_ar: string
  name_en: string
  sort_order: number
  items: MenuItem[]
}

export interface MenuItem {
  id: string
  category_id: string
  name_fr: string
  name_ar: string
  name_en: string
  description_fr: string | null
  description_ar: string | null
  description_en: string | null
  price: string
  image_url: string | null
  is_available: boolean
  is_popular: boolean
  is_chef_choice: boolean
  sort_order: number
}

export interface CartItem {
  menuItem: MenuItem
  qty: number
  notes: string
}

export type Lang = 'fr' | 'ar' | 'en'

export type GeoStatus = 'checking' | 'ok' | 'denied' | 'outside' | 'bypassed'

export interface Order {
  id: string
  status: string
  total_amount: string
  created_at: string
  order_items?: Array<{
    id: string
    quantity: number
    unit_price: string
    subtotal: string
    special_notes: string | null
    menu_item?: { name_fr: string; name_ar: string; name_en: string }
  }>
}

export type RequestType = 'water' | 'bread' | 'napkins' | 'bill' | 'kids_chair' | 'condiments'
