export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--color-background)' }}>
      <div className="text-center">
        <p className="text-5xl mb-4">🍽️</p>
        <h1 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>
          Table introuvable
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-secondary)', opacity: 0.7 }}>
          Scannez à nouveau le QR code sur votre table.
        </p>
      </div>
    </div>
  )
}
