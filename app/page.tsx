import Link from 'next/link'
import {
  countIdeasBy,
  getCategories,
  getContributors,
  getIdeas,
  getMetafieldValue,
} from '@/lib/cosmic'
import IdeaCard from '@/components/IdeaCard'
import CategoryCard from '@/components/CategoryCard'
import ContributorCard from '@/components/ContributorCard'
import SectionHeading from '@/components/SectionHeading'
import EmptyState from '@/components/EmptyState'

export default async function HomePage() {
  const [ideas, categories, contributors] = await Promise.all([
    getIdeas(),
    getCategories(),
    getContributors(),
  ])

  const featured = ideas
    .filter((idea) => getMetafieldValue(idea.metadata?.status) !== 'Diarsipkan')
    .slice(0, 3)

  const categoryCounts = countIdeasBy(ideas, 'category')
  const contributorCounts = countIdeasBy(ideas, 'contributor')

  const topContributors = [...contributors]
    .sort((a, b) => (contributorCounts[b.id] ?? 0) - (contributorCounts[a.id] ?? 0))
    .slice(0, 4)

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-100 via-orange-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-orange-600 shadow-sm">
            💡 Papan Ide Inovasi
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
            Tempat ide-ide hebat <span className="text-orange-500">tumbuh</span> dan menginspirasi
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-600">
            Jelajahi ide-ide segar dari para kontributor kami, lihat seberapa besar dampaknya, dan temukan
            inspirasi untuk membangun sesuatu yang bagus.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/ideas"
              className="rounded-full bg-orange-500 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-orange-600"
            >
              Jelajahi Ide
            </Link>
            <Link
              href="/kontributor"
              className="rounded-full border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Kenali Kontributor
            </Link>
          </div>
          <dl className="mt-12 grid max-w-xl grid-cols-3 gap-4">
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <dt className="text-sm text-slate-500">Ide</dt>
              <dd className="text-2xl font-bold text-slate-900">{ideas.length}</dd>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <dt className="text-sm text-slate-500">Kategori</dt>
              <dd className="text-2xl font-bold text-slate-900">{categories.length}</dd>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <dt className="text-sm text-slate-500">Kontributor</dt>
              <dd className="text-2xl font-bold text-slate-900">{contributors.length}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Featured ideas */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <SectionHeading
          title="🔥 Ide Berdampak Tinggi"
          subtitle="Ide dengan skor dampak tertinggi saat ini."
          href="/ideas"
          linkLabel="Lihat semua ide"
        />
        {featured.length === 0 ? (
          <EmptyState message="Belum ada ide yang ditampilkan." />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        )}
      </section>

      {/* Categories */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <SectionHeading
            title="🏷️ Sorotan Kategori"
            subtitle="Temukan ide berdasarkan topik yang kamu minati."
            href="/kategori"
            linkLabel="Semua kategori"
          />
          {categories.length === 0 ? (
            <EmptyState message="Belum ada kategori." />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.slice(0, 6).map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  ideaCount={categoryCounts[category.id] ?? 0}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contributors */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <SectionHeading
          title="🌟 Kontributor Teratas"
          subtitle="Orang-orang di balik ide-ide hebat."
          href="/kontributor"
          linkLabel="Semua kontributor"
        />
        {topContributors.length === 0 ? (
          <EmptyState message="Belum ada kontributor." />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {topContributors.map((contributor) => (
              <ContributorCard
                key={contributor.id}
                contributor={contributor}
                ideaCount={contributorCounts[contributor.id] ?? 0}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}