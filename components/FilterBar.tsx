import Link from 'next/link'
import type { Category } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import { STATUS_OPTIONS } from '@/lib/utils'

interface FilterBarProps {
  categories: Category[]
  activeCategory?: string
  activeStatus?: string
}

function buildHref(kategori?: string, status?: string): string {
  const params = new URLSearchParams()
  if (kategori) params.set('kategori', kategori)
  if (status) params.set('status', status)
  const query = params.toString()
  return query ? `/ideas?${query}` : '/ideas'
}

function pillClass(active: boolean): string {
  return `rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
    active
      ? 'bg-orange-500 text-white shadow-sm'
      : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-orange-50 hover:text-orange-600'
  }`
}

export default function FilterBar({ categories, activeCategory, activeStatus }: FilterBarProps) {
  return (
    <div className="space-y-4 rounded-2xl bg-slate-50 p-4">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Kategori</p>
        <div className="flex flex-wrap gap-2">
          <Link href={buildHref(undefined, activeStatus)} className={pillClass(!activeCategory)}>
            Semua
          </Link>
          {categories.map((category) => {
            const name = getMetafieldValue(category.metadata?.name) || category.title
            const icon = getMetafieldValue(category.metadata?.icon)
            return (
              <Link
                key={category.id}
                href={buildHref(category.slug, activeStatus)}
                className={pillClass(activeCategory === category.slug)}
              >
                {icon} {name}
              </Link>
            )
          })}
        </div>
      </div>
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Status</p>
        <div className="flex flex-wrap gap-2">
          <Link href={buildHref(activeCategory, undefined)} className={pillClass(!activeStatus)}>
            Semua
          </Link>
          {STATUS_OPTIONS.map((status) => (
            <Link
              key={status}
              href={buildHref(activeCategory, status)}
              className={pillClass(activeStatus === status)}
            >
              {status}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}