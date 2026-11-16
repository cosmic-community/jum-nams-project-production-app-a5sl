// app/categories/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCategoryBySlug, getIdeasByCategory, getMetafieldValue } from '@/lib/cosmic'
import { safeColor } from '@/lib/utils'
import IdeaCard from '@/components/IdeaCard'
import EmptyState from '@/components/EmptyState'

export default async function CategoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const ideas = await getIdeasByCategory(category.id)
  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)
  const icon = getMetafieldValue(category.metadata?.icon) || '🏷️'
  const color = safeColor(getMetafieldValue(category.metadata?.color))

  return (
    <div>
      <meta
        name="cosmic-context"
        content={JSON.stringify({ object_id: category.id, object_type: category.type })}
      />
      <section style={{ backgroundColor: `${color}1a` }}>
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <Link href="/kategori" className="text-sm font-medium hover:underline" style={{ color }}>
            ← Semua kategori
          </Link>
          <div className="mt-4 flex items-center gap-4">
            <span
              className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-4xl shadow-sm"
              style={{ border: `2px solid ${color}` }}
            >
              {icon}
            </span>
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">{name}</h1>
              {description && <p className="mt-1 max-w-2xl text-slate-600">{description}</p>}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <p className="mb-6 text-sm text-slate-500">{ideas.length} ide dalam kategori ini</p>
        {ideas.length === 0 ? (
          <EmptyState message="Belum ada ide di kategori ini." />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ideas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}