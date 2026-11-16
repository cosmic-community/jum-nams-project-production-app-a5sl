import Link from 'next/link'
import type { Contributor } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import { imageUrl, initials } from '@/lib/utils'

interface ContributorCardProps {
  contributor: Contributor
  ideaCount?: number
}

export default function ContributorCard({ contributor, ideaCount }: ContributorCardProps) {
  const name = getMetafieldValue(contributor.metadata?.name) || contributor.title
  const role = getMetafieldValue(contributor.metadata?.role)
  const photo = imageUrl(contributor.metadata?.photo, 160, 160)

  return (
    <Link
      href={`/kontributor/${contributor.slug}`}
      className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      {photo ? (
        <img
          src={photo}
          alt={name}
          width={80}
          height={80}
          className="h-16 w-16 shrink-0 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xl font-bold text-orange-600">
          {initials(name)}
        </div>
      )}
      <div className="min-w-0">
        <h3 className="truncate font-bold text-slate-900 group-hover:text-orange-600">{name}</h3>
        {role && <p className="truncate text-sm text-slate-500">{role}</p>}
        {ideaCount !== undefined && (
          <p className="mt-1 text-xs font-semibold text-orange-600">{ideaCount} ide</p>
        )}
      </div>
    </Link>
  )
}