import { countIdeasBy, getContributors, getIdeas } from '@/lib/cosmic'
import ContributorCard from '@/components/ContributorCard'
import EmptyState from '@/components/EmptyState'

export default async function ContributorsPage() {
  const [contributors, ideas] = await Promise.all([getContributors(), getIdeas()])
  const counts = countIdeasBy(ideas, 'contributor')

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">👤 Kontributor</h1>
      <p className="mt-2 text-slate-600">Kenali orang-orang kreatif di balik setiap ide.</p>

      {contributors.length === 0 ? (
        <div className="mt-8">
          <EmptyState message="Belum ada kontributor." />
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contributors.map((contributor) => (
            <ContributorCard
              key={contributor.id}
              contributor={contributor}
              ideaCount={counts[contributor.id] ?? 0}
            />
          ))}
        </div>
      )}
    </div>
  )
}