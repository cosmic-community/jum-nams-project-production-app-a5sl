// app/contributors/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getContributorBySlug, getIdeasByContributor, getMetafieldValue } from '@/lib/cosmic'
import { imageUrl, initials } from '@/lib/utils'
import IdeaCard from '@/components/IdeaCard'
import EmptyState from '@/components/EmptyState'

export default async function ContributorDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const contributor = await getContributorBySlug(slug)

  if (!contributor) {
    notFound()
  }

  const ideas = await getIdeasByContributor(contributor.id)
  const name = getMetafieldValue(contributor.metadata?.name) || contributor.title
  const role = getMetafieldValue(contributor.metadata?.role)
  const bio = getMetafieldValue(contributor.metadata?.bio)
  const photo = imageUrl(contributor.metadata?.photo, 400, 400)

  return (
    <div>
      <meta
        name="cosmic-context"
        content={JSON.stringify({ object_id: contributor.id, object_type: contributor.type })}
      />
      <section className="bg-gradient-to-br from-amber-100 via-orange-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <Link href="/kontributor" className="text-sm font-medium text-orange-600 hover:underline">
            ← Semua kontributor
          </Link>
          <div className="mt-6 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            {photo ? (
              <img
                src={photo}
                alt={name}
                width={200}
                height={200}
                className="h-28 w-28 rounded-full object-cover shadow-md ring-4 ring-white sm:h-36 sm:w-36"
              />
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-orange-200 text-4xl font-bold text-orange-700 ring-4 ring-white sm:h-36 sm:w-36">
                {initials(name)}
              </div>
            )}
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">{name}</h1>
              {role && <p className="mt-1 font-medium text-orange-600">{role}</p>}
              {bio && <p className="mt-3 max-w-2xl text-slate-600">{bio}</p>}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">💡 Ide dari {name}</h2>
        {ideas.length === 0 ? (
          <EmptyState message="Kontributor ini belum membagikan ide." />
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