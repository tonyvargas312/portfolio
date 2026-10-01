import type { PortfolioPhotoFilename } from '../lib/portfolioPhotos'

export type BackgroundPhoto = { filename: PortfolioPhotoFilename; alt: string }
// Add only photos connected to Anthony's background; no unrelated filler slides.
export const backgroundPhotos: readonly BackgroundPhoto[] = [
  { filename: 'childhood.jpeg', alt: 'Anthony as a child' },
]
