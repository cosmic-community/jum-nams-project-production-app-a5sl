export interface CosmicFile {
  url: string
  imgix_url: string
}

export interface CosmicObject {
  id: string
  slug: string
  title: string
  type: string
  content?: string
  created_at: string
  modified_at: string
}

// Values must match the content model exactly (case-sensitive)
export type IdeaStatus = 'Baru' | 'Sedang Dikembangkan' | 'Divalidasi' | 'Diarsipkan'

export interface Category extends CosmicObject {
  type: 'categories'
  metadata: {
    name?: string
    description?: string
    icon?: string
    color?: string
  }
}

export interface Contributor extends CosmicObject {
  type: 'contributors'
  metadata: {
    name?: string
    role?: string
    photo?: CosmicFile
    bio?: string
  }
}

export interface Idea extends CosmicObject {
  type: 'ideas'
  metadata: {
    summary?: string
    details?: string
    status?: string | { key: string; value: string }
    impact_score?: number | string
    cover_image?: CosmicFile
    category?: Category
    contributor?: Contributor
  }
}