interface ImpactMeterProps {
  score: number
  size?: 'sm' | 'lg'
}

function colorFor(score: number): string {
  if (score >= 8) return 'bg-emerald-500'
  if (score >= 5) return 'bg-amber-500'
  return 'bg-orange-400'
}

export default function ImpactMeter({ score, size = 'sm' }: ImpactMeterProps) {
  const filled = Math.round(score)
  const color = colorFor(score)
  const barHeight = size === 'lg' ? 'h-3' : 'h-2'
  const barWidth = size === 'lg' ? 'w-full' : 'w-3'

  return (
    <div className={size === 'lg' ? 'w-full' : 'flex items-center gap-2'}>
      <div
        className={size === 'lg' ? 'flex w-full gap-1' : 'flex gap-0.5'}
        role="img"
        aria-label={`Skor dampak ${score} dari 10`}
      >
        {Array.from({ length: 10 }, (_, index) => (
          <span
            key={index}
            className={`${barHeight} ${barWidth} ${size === 'lg' ? 'flex-1' : ''} rounded-full ${
              index < filled ? color : 'bg-slate-200'
            }`}
          />
        ))}
      </div>
      <p
        className={
          size === 'lg'
            ? 'mt-2 text-2xl font-extrabold text-slate-900'
            : 'text-xs font-bold text-slate-700'
        }
      >
        {score}
        <span className={size === 'lg' ? 'text-base font-medium text-slate-400' : 'text-slate-400'}>/10</span>
      </p>
    </div>
  )
}