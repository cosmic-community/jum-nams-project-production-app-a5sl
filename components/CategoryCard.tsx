import Link from 'next/link'
import type { Category } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import { safeColor } from '@/lib/utils'

interface CategoryCardProps {
  category: Category
  ideaCount?: number
}

export default function CategoryCard({ category, ideaCount = 0 }: CategoryCardProps) {
  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)
  const icon = getMetafieldValue(category.metadata?.icon) || '🏷️'
  const color = safeColor(getMetafieldValue(category.metadata?.color))

  return (
    <Link
      href={`/kategori/${category.slug}`}
      className="group flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <span
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-3xl"
        style={{ backgroundColor: `${color}22`, border: `2px solid ${color}55` }}
      >
        {icon}
      </span>
      <div className="min-w-0">
        <h3 className="font-bold text-slate-900 group-hover:text-orange-600">{name}</h3>
        {description && <p className="mt-1 line-clamp-2 text-sm text-slate-600">{description}</p>}
        <p className="mt-2 text-xs font-semibold" style={{ color }}>
          {ideaCount} ide
        </p>
      </div>
    </Link>
  )
}