import { countIdeasBy, getCategories, getIdeas } from '@/lib/cosmic'
import CategoryCard from '@/components/CategoryCard'
import EmptyState from '@/components/EmptyState'

export default async function CategoriesPage() {
  const [categories, ideas] = await Promise.all([getCategories(), getIdeas()])
  const counts = countIdeasBy(ideas, 'category')

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">🏷️ Kategori</h1>
      <p className="mt-2 text-slate-600">Pilih topik untuk melihat ide-ide di dalamnya.</p>

      {categories.length === 0 ? (
        <div className="mt-8">
          <EmptyState message="Belum ada kategori." />
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} ideaCount={counts[category.id] ?? 0} />
          ))}
        </div>
      )}
    </div>
  )
}