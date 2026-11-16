import Link from 'next/link'
import type { Idea } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import { imageUrl, toNumber } from '@/lib/utils'
import StatusBadge from '@/components/StatusBadge'
import ImpactMeter from '@/components/ImpactMeter'
import CategoryChip from '@/components/CategoryChip'

export default function IdeaCard({ idea }: { idea: Idea }) {
  const cover = imageUrl(idea.metadata?.cover_image, 800, 500)
  const status = getMetafieldValue(idea.metadata?.status)
  const score = toNumber(idea.metadata?.impact_score)
  const summary = getMetafieldValue(idea.metadata?.summary)
  const category = idea.metadata?.category
  const contributor = idea.metadata?.contributor
  const contributorName = contributor
    ? getMetafieldValue(contributor.metadata?.name) || contributor.title
    : ''

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/ideas/${idea.slug}`} className="block">
        {cover ? (
          <img
            src={cover}
            alt={idea.title}
            width={400}
            height={250}
            className="h-48 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-48 w-full items-center justify-center bg-gradient-to-br from-amber-100 to-orange-200 text-5xl">
            💡
          </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          {status && <StatusBadge status={status} />}
          {category && <CategoryChip category={category} />}
        </div>
        <h3 className="text-lg font-bold leading-snug text-slate-900">
          <Link href={`/ideas/${idea.slug}`} className="hover:text-orange-600">
            {idea.title}
          </Link>
        </h3>
        {summary && <p className="line-clamp-3 text-sm text-slate-600">{summary}</p>}
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <ImpactMeter score={score} />
          {contributor && (
            <Link
              href={`/kontributor/${contributor.slug}`}
              className="truncate text-xs font-medium text-slate-500 hover:text-orange-600"
            >
              oleh {contributorName}
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}