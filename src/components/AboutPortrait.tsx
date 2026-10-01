import { useEffect, useState } from 'react'

type PhotoRecord = { storage_path: string | null; alt_text: string | null }
type Portrait = { src: string; alt: string }

function AboutPortrait() {
  const [photo, setPhoto] = useState<Portrait | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const request = new AbortController()
    let active = true

    async function loadPhoto() {
      try {
        // Keep configuration failures within the portrait's fallback boundary.
        const { supabase } = await import('../lib/supabase')
        if (!active) return
        const { data, error } = await supabase
          .schema('public')
          .from('portfolio_photos')
          .select('storage_path, alt_text')
          .eq('section', 'about')
          .eq('is_published', true)
          .order('sort_order', { ascending: true })
          .limit(1)
          .abortSignal(request.signal)
          .maybeSingle<PhotoRecord>()

        if (!active) return
        if (error || !data?.storage_path?.trim()) {
          setLoading(false)
          return
        }

        const { data: storage } = supabase.storage
          .from('portfolio-photos')
          .getPublicUrl(data.storage_path)
        setPhoto({ src: storage.publicUrl, alt: data.alt_text?.trim() || 'Anthony Vargas' })
      } catch {
        if (active) setLoading(false)
      }
    }

    void loadPhoto()
    return () => {
      active = false
      request.abort()
    }
  }, [])

  return (
    <div className="about-page__portrait" aria-busy={loading}>
      {photo && (
        <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async"
          style={{ visibility: loading ? 'hidden' : 'visible' }}
          onLoad={() => setLoading(false)}
          onError={() => { setPhoto(null); setLoading(false) }} />
      )}
      {(loading || !photo) && (
        <div className="about-page__portrait-placeholder">
          <p>{loading ? 'Loading personal photo…' : 'Personal photo coming soon.'}</p>
        </div>
      )}
    </div>
  )
}

export default AboutPortrait
