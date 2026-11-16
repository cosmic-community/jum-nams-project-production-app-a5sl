import { createBucketClient } from '@cosmicjs/sdk'
import { getCosmic } from '@/lib/cosmic-preview'
import type { Category, Contributor, Idea } from '@/types'

// Write client (server-side only). Page reads go through getCosmic().
export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

const PROPS = ['id', 'title', 'slug', 'type', 'metadata', 'created_at', 'modified_at']

async function findObjects<T>(query: Record<string, unknown>, depth: number): Promise<T[]> {
  try {
    const { cosmic: client, previewToken } = await getCosmic()
    const q = client.objects.find(query).props(PROPS).depth(depth)
    const res = previewToken ? await q.status('any') : await q
    return (res.objects ?? []) as T[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Gagal mengambil data dari Cosmic')
  }
}

async function findOneObject<T>(type: string, slug: string, depth: number): Promise<T | null> {
  try {
    const { cosmic: client, previewToken } = await getCosmic()
    const q = client.objects.findOne({ type, slug }).props(PROPS).depth(depth)
    const res = previewToken ? await q.status('any') : await q
    return (res.object ?? null) as T | null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Gagal mengambil data dari Cosmic')
  }
}

function impactOf(idea: Idea): number {
  const n = Number(getMetafieldValue(idea.metadata?.impact_score))
  return Number.isFinite(n) ? n : 0
}

export function sortByImpact(ideas: Idea[]): Idea[] {
  return [...ideas].sort((a, b) => impactOf(b) - impactOf(a))
}

export async function getIdeas(): Promise<Idea[]> {
  const ideas = await findObjects<Idea>({ type: 'ideas' }, 1)
  return sortByImpact(ideas)
}

export async function getIdeaBySlug(slug: string): Promise<Idea | null> {
  return findOneObject<Idea>('ideas', slug, 1)
}

export async function getIdeasByCategory(categoryId: string): Promise<Idea[]> {
  const ideas = await findObjects<Idea>({ type: 'ideas', 'metadata.category': categoryId }, 1)
  return sortByImpact(ideas)
}

export async function getIdeasByContributor(contributorId: string): Promise<Idea[]> {
  const ideas = await findObjects<Idea>({ type: 'ideas', 'metadata.contributor': contributorId }, 1)
  return sortByImpact(ideas)
}

export async function getCategories(): Promise<Category[]> {
  return findObjects<Category>({ type: 'categories' }, 1)
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return findOneObject<Category>('categories', slug, 1)
}

export async function getContributors(): Promise<Contributor[]> {
  return findObjects<Contributor>({ type: 'contributors' }, 1)
}

export async function getContributorBySlug(slug: string): Promise<Contributor | null> {
  return findOneObject<Contributor>('contributors', slug, 1)
}

export function countIdeasBy(ideas: Idea[], field: 'category' | 'contributor'): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const idea of ideas) {
    const related = idea.metadata?.[field]
    if (related && related.id) {
      counts[related.id] = (counts[related.id] ?? 0) + 1
    }
  }
  return counts
}