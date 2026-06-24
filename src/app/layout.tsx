import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RestoApp — Order at your table',
  description: 'Scan, order, enjoy.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
