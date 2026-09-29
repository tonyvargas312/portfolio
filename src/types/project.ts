export type ProjectImage = {
  url: string
  alt: string
  caption?: string
  tags?: readonly string[]
}

export type ProjectVideo = {
  url: string
  title: string
  posterUrl?: string
  captionsUrl?: string
  caption?: string
  tags?: readonly string[]
}

export type ProjectUpdate = {
  id: string
  title: string
  date: string | null
  body: string
  screenshots: readonly ProjectImage[]
  videos: readonly ProjectVideo[]
  tags: readonly string[]
}

// Serializable records: dates are ISO strings; null means not yet confirmed.
// Local public assets can use /images/... paths; hosted media uses full URLs.
export type ProjectResource = {
  id: string
  title: string
  kind: 'PDF' | 'Design document' | 'Requirements document' | 'GitHub' | 'External link' | 'Download'
  url: string | null
  download?: boolean
}

export type ProjectDetails = {
  description: string
  keyFeatures: readonly string[]
  developmentStatus: string
  resources: readonly ProjectResource[]
}

export type Project = {
  id: string
  slug: string
  title: string
  shortDescription: string
  category: string
  status: string
  technologies: readonly string[]
  previewImage: ProjectImage | null
  lastUpdated: string | null
  featured: boolean
  projectUrl: string | null
  updates: readonly ProjectUpdate[]
  screenshots: readonly ProjectImage[]
  videos: readonly ProjectVideo[]
  tags: readonly string[]
  details?: ProjectDetails
}
