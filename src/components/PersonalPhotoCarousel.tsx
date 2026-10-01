import { useEffect, useId, useState } from 'react'
import type { KeyboardEvent } from 'react'
import ArrowIcon from './ArrowIcon'
import './ProjectGallery.css'
import './PersonalPhotoCarousel.css'

type Photo = { src: string; alt: string }

function PersonalPhotoCarousel() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState(0)
  const [loaded, setLoaded] = useState<string[]>([])
  const [failed, setFailed] = useState<string[]>([])
  const viewportId = useId()

  useEffect(() => {
    let mounted = true
    async function loadPhotos() {
      try {
        const { getPortfolioPhotoUrl } = await import('../lib/portfolioPhotos')
        if (!mounted) return
        // Objects were replaced in place: refresh once per page load, not per slide.
        const refreshToken = Date.now().toString()
        setPhotos([
          { src: getPortfolioPhotoUrl('hummingbird.jpeg', refreshToken), alt: 'Hummingbird photographed in nature' },
          { src: getPortfolioPhotoUrl('motocross.jpeg', refreshToken), alt: 'Anthony riding motocross' },
        ])
      } catch { /* Keep the existing fallback without exposing configuration errors. */ }
      finally { if (mounted) setLoading(false) }
    }
    void loadPhotos()
    return () => { mounted = false }
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
