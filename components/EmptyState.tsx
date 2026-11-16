export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
      <div className="text-4xl">🌱</div>
      <p className="mt-2 text-slate-600">{message}</p>
    </div>
  )
}