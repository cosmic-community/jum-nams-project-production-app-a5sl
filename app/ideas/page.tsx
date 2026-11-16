import { getCategories, getIdeas, getMetafieldValue } from '@/lib/cosmic'
import IdeaCard from '@/components/IdeaCard'
import FilterBar from '@/components/FilterBar'
import EmptyState from '@/components/EmptyState'

interface IdeasPageProps {
  searchParams: Promise<{ kategori?: string; status?: string }>
}

export default async function IdeasPage({ searchParams }: IdeasPageProps) {
  const { kategori, status } = await searchParams
  const [ideas, categories] = await Promise.all([getIdeas(), getCategories()])

  const filtered = ideas.filter((idea) => {
    const matchesCategory = !kategori || idea.metadata?.category?.slug === kategori
    const matchesStatus = !status || getMetafieldValue(idea.metadata?.status) === status
    return matchesCategory && matchesStatus
  })

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">💡 Semua Ide</h1>
      <p className="mt-2 text-slate-600">Jelajahi dan saring ide berdasarkan kategori dan status.</p>

      <div className="mt-8">
        <FilterBar categories={categories} activeCategory={kategori} activeStatus={status} />
      </div>

      <p className="mt-6 text-sm text-slate-500">{filtered.length} ide ditemukan</p>

      {filtered.length === 0 ? (
        <div className="mt-4">
          <EmptyState message="Tidak ada ide yang cocok dengan filter ini." />
        </div>
      ) : (
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      )}
    </div>
  )
}