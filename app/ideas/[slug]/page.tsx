// app/ideas/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getIdeaBySlug, getMetafieldValue } from '@/lib/cosmic'
import { imageUrl, toNumber } from '@/lib/utils'
import StatusBadge from '@/components/StatusBadge'
import ImpactMeter from '@/components/ImpactMeter'
import CategoryChip from '@/components/CategoryChip'
import ContributorCard from '@/components/ContributorCard'

export default async function IdeaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const idea = await getIdeaBySlug(slug)

  if (!idea) {
    notFound()
  }

  const cover = imageUrl(idea.metadata?.cover_image, 1400, 700)
  const status = getMetafieldValue(idea.metadata?.status)
  const score = toNumber(idea.metadata?.impact_score)
  const summary = getMetafieldValue(idea.metadata?.summary)
  const details = getMetafieldValue(idea.metadata?.details)
  const category = idea.metadata?.category
  const contributor = idea.metadata?.contributor

  return (
    <article className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <meta
        name="cosmic-context"
        content={JSON.stringify({ object_id: idea.id, object_type: idea.type })}
      />
      <Link href="/ideas" className="text-sm font-medium text-orange-600 hover:underline">
        ← Kembali ke semua ide
      </Link>

      {cover ? (
        <img
          src={cover}
          alt={idea.title}
          width={1400}
          height={700}
          className="mt-6 h-64 w-full rounded-3xl object-cover shadow-md sm:h-96"
        />
      ) : (
        <div className="mt-6 flex h-64 w-full items-center justify-center rounded-3xl bg-gradient-to-br from-amber-100 to-orange-200 text-7xl sm:h-96">
          💡
        </div>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex flex-wrap items-center gap-3">
            {status && <StatusBadge status={status} />}
            {category && <CategoryChip category={category} />}
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {idea.title}
          </h1>
          {summary && <p className="mt-3 text-lg text-slate-600">{summary}</p>}

          {details && (
            <div
              className="prose prose-slate mt-8 max-w-none"
              dangerouslySetInnerHTML={{ __html: details }}
            />
          )}
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Skor Dampak</h2>
            <div className="mt-3">
              <ImpactMeter score={score} size="lg" />
            </div>
          </div>

          {category && (
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Kategori</h2>
              <div className="mt-3">
                <CategoryChip category={category} />
              </div>
            </div>
          )}

          {contributor && (
            <div>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                Kontributor
              </h2>
              <ContributorCard contributor={contributor} />
            </div>
          )}
        </aside>
      </div>
    </article>
  )
}