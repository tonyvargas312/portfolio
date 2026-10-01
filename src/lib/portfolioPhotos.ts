import { supabase } from './supabase'

export type PortfolioPhotoFilename = 'profile.jpeg' | 'lankaster.jpeg' | 'beach.jpeg' | 'childhood.jpeg' | 'hummingbird.jpeg'

export function getPortfolioPhotoUrl(filename: PortfolioPhotoFilename) {
  return supabase.storage.from('portfolio-photos').getPublicUrl(`about/${filename}`).data.publicUrl
}
