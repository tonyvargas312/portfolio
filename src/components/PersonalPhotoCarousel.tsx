import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent, TouchEvent } from 'react'
import './PersonalPhotoCarousel.css'
import { photoCardState } from '../lib/photoCardState'

export type PersonalPhoto = { src: string; alt: string }

function PersonalPhotoCarousel({ initialPhotos }: { initialPhotos?: readonly PersonalPhoto[] }) {
  const [photos, setPhotos] = useState<readonly PersonalPhoto[]>(initialPhotos ?? [])
  const [loading, setLoading] = useState(!initialPhotos)
  const [active, setActive] = useState(0)
  const [loaded, setLoaded] = useState<string[]>([])
  const [failed, setFailed] = useState<string[]>([])
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const suppressClickUntil = useRef(0)
  useEffect(() => {
    if (initialPhotos) return
    let mounted = true
    async function loadPhotos() {
      try {
        const { getPortfolioPhotoUrl } = await import('../lib/portfolioPhotos')
        if (!mounted) return
        const refreshToken = Date.now().toString()
        setPhotos([
          { src: getPortfolioPhotoUrl('hummingbird.jpeg', refreshToken), alt: 'Hummingbird photographed in nature' },
          { src: getPortfolioPhotoUrl('motocross.jpeg', refreshToken), alt: 'Anthony riding motocross' },
          { src: getPortfolioPhotoUrl('cone.jpeg', refreshToken), alt: 'A personal-interest photo featuring a cone' },
        ])
      } catch { /* Preserve a clean fallback without exposing configuration errors. */ }
      finally { if (mounted) setLoading(false) }
    }
    void loadPhotos()
    return () => { mounted = false }
  }, [initialPhotos])
  const count = photos.length
  const current = count ? active % count : 0
  function move(direction: number) {
    if (count > 1) setActive((index) => (index + direction + count) % count)
  }
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || count < 2) return
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault()
      move(event.key === 'ArrowUp' ? -1 : 1)
    }
  }
  function endTouch(event: TouchEvent<HTMLDivElement>) {
    const start = touchStart.current
    touchStart.current = null
    const end = event.changedTouches[0]
    if (!start || !end || count < 2) return
    const deltaY = end.clientY - start.y
    if (Math.abs(deltaY) > 45 && Math.abs(deltaY) > Math.abs(end.clientX - start.x)) {
      suppressClickUntil.current = Date.now() + 400
      move(deltaY < 0 ? 1 : -1)
    }
  }
  // Clone only the presentation, never the unique media list.
  const cards = photos.flatMap((photo, index) => {
    const state = photoCardState(index, current, count)
    const primary = { photo, index, state, key: `photo-${index}` }
    return count === 2 ? [primary, { photo, index, state: state === 'center' ? 'hidden' as const : 'up-1' as const, key: `clone-${index}` }] : [primary]
  })
  return <div className="personal-photos" role="region" aria-roledescription="carousel" aria-label="Interests outside software photos" tabIndex={0} onKeyDown={handleKeyDown}
    onTouchStart={(event) => { const touch = event.touches[0]; if (touch) touchStart.current = { x: touch.clientX, y: touch.clientY } }} onTouchEnd={endTouch} onTouchCancel={() => { touchStart.current = null }}>
    <div className="personal-photos__track" aria-busy={loading}>
      {!count && <div className="personal-photos__fallback"><p>{loading ? 'Loading personal photos?' : 'Personal photos unavailable.'}</p></div>}
      {cards.map(({ photo, index, state, key }) => {
        const hidden = state === 'hidden'
        const center = state === 'center'
        const ready = loaded.includes(photo.src)
        const unavailable = failed.includes(photo.src)
        return <button key={key} type="button" className={`personal-photos__card ${state}`} aria-label={center ? photo.alt : state.startsWith('up') ? `Previous photo: ${photo.alt}` : `Next photo: ${photo.alt}`}
          aria-disabled={center} aria-hidden={hidden} tabIndex={hidden || center ? -1 : 0} onClick={() => { if (!center && Date.now() >= suppressClickUntil.current) setActive(index) }}>
          {!unavailable && <img src={photo.src} alt={photo.alt} decoding="async" style={{ visibility: ready ? 'visible' : 'hidden' }} onLoad={() => setLoaded((previous) => previous.includes(photo.src) ? previous : [...previous, photo.src])} onError={() => setFailed((previous) => previous.includes(photo.src) ? previous : [...previous, photo.src])} />}
          {(!ready || unavailable) && <span className="personal-photos__placeholder">{unavailable ? 'Photo unavailable.' : 'Loading photo?'}</span>}
        </button>
      })}
    </div>
    {count > 1 && <p className="personal-photos__status" role="status" aria-live="polite">Photo {current + 1} of {count}</p>}
  </div>
}
export default PersonalPhotoCarousel
