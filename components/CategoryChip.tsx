import Link from 'next/link'
import type { Category } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import { safeColor } from '@/lib/utils'

export default function CategoryChip({ category }: { category: Category }) {
  const name = getMetafieldValue(category.metadata?.name) || category.title
  const icon = getMetafieldValue(category.metadata?.icon)
  const color = safeColor(getMetafieldValue(category.metadata?.color))

  return (
    <Link
      href={`/kategori/${category.slug}`}
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition hover:opacity-80"
      style={{ backgroundColor: `${color}22`, color }}
    >
      {icon && <span>{icon}</span>}
      {name}
    </Link>
  )
}