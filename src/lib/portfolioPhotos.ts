import { supabase } from './supabase'

export type PortfolioPhotoFilename = 'profile.jpeg' | 'childhood.jpeg' | 'hummingbird.jpeg' | 'motocross.jpeg' | 'cone.jpeg'

export function getPortfolioPhotoUrl(filename: PortfolioPhotoFilename, refreshToken?: string) {
  const publicUrl = supabase.storage.from('portfolio-photos').getPublicUrl(`about/${filename}`).data.publicUrl
  if (!refreshToken) return publicUrl
  const refreshedUrl = new URL(publicUrl)
  refreshedUrl.searchParams.set('v', refreshToken)
  return refreshedUrl.toString()
}
