interface StatusStyle {
  badge: string
  dot: string
}

const STATUS_STYLES: Record<string, StatusStyle> = {
  Baru: { badge: 'bg-sky-50 text-sky-700', dot: 'bg-sky-500' },
  'Sedang Dikembangkan': { badge: 'bg-amber-50 text-amber-700', dot: 'bg-amber-500' },
  Divalidasi: { badge: 'bg-emerald-50 text-emerald-700', dot: 'bg-emerald-500' },
  Diarsipkan: { badge: 'bg-slate-100 text-slate-600', dot: 'bg-slate-400' },
}

const DEFAULT_STYLE: StatusStyle = { badge: 'bg-slate-100 text-slate-600', dot: 'bg-slate-400' }

export default function StatusBadge({ status }: { status: string }) {
  const style = STATUS_STYLES[status] ?? DEFAULT_STYLE

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${style.badge}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {status}
    </span>
  )
}