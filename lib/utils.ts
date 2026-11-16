import type { CosmicFile, IdeaStatus } from '@/types'

export const STATUS_OPTIONS: IdeaStatus[] = [
  'Baru',
  'Sedang Dikembangkan',
  'Divalidasi',
  'Diarsipkan',
]

export function safeColor(color: string | undefined): string {
  return color && /^#[0-9a-fA-F]{6}$/.test(color) ? color : '#f97316'
}

export function toNumber(value: unknown): number {
  const n = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(n)) return 0
  return Math.min(10, Math.max(0, n))
}

export function imageUrl(file: CosmicFile | undefined, w: number, h: number): string | null {
  if (!file || !file.imgix_url) return null
  return `${file.imgix_url}?w=${w}&h=${h}&fit=crop&auto=format,compress`
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  const first = parts[0]?.charAt(0) ?? '?'
  const second = parts[1]?.charAt(0) ?? ''
  return (first + second).toUpperCase()
}