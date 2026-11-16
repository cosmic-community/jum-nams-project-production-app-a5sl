import Link from 'next/link'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  href?: string
  linkLabel?: string
}

export default function SectionHeading({ title, subtitle, href, linkLabel }: SectionHeadingProps) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-1 text-slate-600">{subtitle}</p>}
      </div>
      {href && linkLabel && (
        <Link href={href} className="text-sm font-semibold text-orange-600 hover:underline">
          {linkLabel} →
        </Link>
      )}
    </div>
  )
}