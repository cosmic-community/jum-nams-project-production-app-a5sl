import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-12 border-t border-slate-100 bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:px-6">
        <p>© {year} Papan Ide Inovasi. Bangun ide-ide yang bagus. 🚀</p>
        <nav className="flex gap-4">
          <Link href="/ideas" className="hover:text-orange-600">
            Ide
          </Link>
          <Link href="/kategori" className="hover:text-orange-600">
            Kategori
          </Link>
          <Link href="/kontributor" className="hover:text-orange-600">
            Kontributor
          </Link>
        </nav>
      </div>
    </footer>
  )
}