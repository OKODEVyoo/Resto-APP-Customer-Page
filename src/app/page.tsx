export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-background)' }}>
      <p className="text-center" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)', fontSize: '1.25rem' }}>
        Scan the QR code on your table to order.
      </p>
    </main>
  )
}
