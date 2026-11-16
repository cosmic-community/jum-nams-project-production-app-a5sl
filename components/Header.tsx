import Link from 'next/link'

const NAV_LINKS: { href: string; label: string }[] = [
  { href: '/', label: 'Beranda' },
  { href: '/ideas', label: 'Ide' },
  { href: '/kategori', label: 'Kategori' },
  { href: '/kontributor', label: 'Kontributor' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-extrabold text-slate-900">
          <span className="text-2xl">💡</span>
          Papan Ide
        </Link>
        <nav className="flex flex-wrap items-center gap-1 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-slate-600 transition hover:bg-orange-50 hover:text-orange-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}