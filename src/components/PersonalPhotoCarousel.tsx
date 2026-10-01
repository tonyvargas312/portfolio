import { useEffect, useId, useState } from 'react'
import type { KeyboardEvent } from 'react'
import ArrowIcon from './ArrowIcon'
import './ProjectGallery.css'
import './PersonalPhotoCarousel.css'

type PhotoRecord = { storage_path: string | null; alt_text: string | null }
type Photo = { src: string; alt: string }

function PersonalPhotoCarousel() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState(0)
  const [loaded, setLoaded] = useState<string[]>([])
  const [failed, setFailed] = useState<string[]>([])
  const viewportId = useId()

  useEffect(() => {
    const request = new AbortController()
    let mounted = true
    async function loadPhotos() {
      try {
        const { supabase } = await import('../lib/supabase')
        if (!mounted) return
        const { data, error } = await supabase.schema('public').from('portfolio_photos')
          .select('storage_path, alt_text').eq('section', 'beyond-software')
          .eq('is_published', true).order('sort_order', { ascending: true })
          .abortSignal(request.signal).returns<PhotoRecord[]>()
        if (!mounted || error) return
        setPhotos((data || []).flatMap((record) => {
          if (!record.storage_path?.trim()) return []
          const { data: storage } = supabase.storage.from('portfolio-photos').getPublicUrl(record.storage_path)
          return [{ src: storage.publicUrl, alt: record.alt_text?.trim() || 'A personal interest outside software' }]
        }))
      } catch { /* Keep the placeholder without exposing configuration or database errors. */ }
      finally { if (mounted) setLoading(false) }
    }
    void loadPhotos()
    return () => { mounted = false; request.abort() }
  }, [])

  const count = photos.length
  const index = count ? active % count : 0
  const photo = photos[index]
  const imageFailed = photo && failed.includes(photo.src)
  const imageLoaded = photo && loaded.includes(photo.src)
  const busy = loading || Boolean(photo && !imageFailed && !imageLoaded)

  function move(direction: number) {
    if (count > 1) setActive((current) => (current + direction + count) % count)
  }
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || count < 2) return
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault()
      move(event.key === 'ArrowLeft' ? -1 : 1)
    }
  }

  return (
    <div className="personal-photos" role="region" aria-roledescription="carousel"
      aria-label="Interests outside software photos" tabIndex={0} onKeyDown={handleKeyDown}>
      <div className="personal-photos__viewport" id={viewportId} aria-busy={busy}
        role="group" aria-roledescription="slide" aria-label={count ? `Photo ${index + 1} of ${count}` : 'Personal photos'}>
        {photo && !imageFailed && (
          <img key={photo.src} src={photo.src} alt={photo.alt} loading="lazy" decoding="async"
            style={{ visibility: imageLoaded ? 'visible' : 'hidden' }}
            onLoad={() => setLoaded((current) => [...current, photo.src])}
            onError={() => setFailed((current) => [...current, photo.src])} />
        )}
        {(!photo || imageFailed || !imageLoaded) && (
          <div className="personal-photos__placeholder">
            <p>{busy ? 'Loading personal photos…' : 'Personal photos coming soon.'}</p>
          </div>
        )}
      </div>
      {count > 1 && (
        <div className="project-gallery__controls personal-photos__controls">
          <button type="button" aria-label="Previous personal photo" aria-controls={viewportId} onClick={() => move(-1)}><ArrowIcon direction="left" /></button>
          <div className="project-gallery__dots" role="group" aria-label="Choose a personal photo">
            {photos.map((item, dot) => (
              <button key={`${item.src}-${dot}`} type="button" aria-label={`Show personal photo ${dot + 1}`}
                aria-current={dot === index ? 'true' : undefined} aria-controls={viewportId} onClick={() => setActive(dot)}>
                <span aria-hidden="true" />
              </button>
            ))}
          </div>
          <button type="button" aria-label="Next personal photo" aria-controls={viewportId} onClick={() => move(1)}><ArrowIcon direction="right" /></button>
        </div>
      )}
    </div>
  )
}

export default PersonalPhotoCarousel
