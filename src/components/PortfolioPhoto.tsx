import { useEffect, useState } from 'react'
import type { PortfolioPhotoFilename } from '../lib/portfolioPhotos'

type Props = { filename: PortfolioPhotoFilename; alt: string; presentation?: 'portrait' | 'personal' }

function PortfolioPhoto({ filename, alt, presentation = 'portrait' }: Props) {
  const [photo, setPhoto] = useState<{ filename: string; src: string } | null>(null)
  const [loaded, setLoaded] = useState<string | null>(null)
  const [failed, setFailed] = useState<string | null>(null)
  useEffect(() => {
    let active = true
    void import('../lib/portfolioPhotos').then(({ getPortfolioPhotoUrl }) => {
      if (active) setPhoto({ filename, src: getPortfolioPhotoUrl(filename) })
    }).catch(() => { if (active) setFailed(filename) })
    return () => { active = false }
  }, [filename])
  const src = photo?.filename === filename ? photo.src : null
  const ready = loaded === filename
  const unavailable = failed === filename
  const frame = presentation === 'personal' ? 'personal-photos__viewport' : 'about-page__portrait'
  const placeholder = presentation === 'personal' ? 'personal-photos__placeholder' : 'about-page__portrait-placeholder'
  return <div className={frame} aria-busy={!ready && !unavailable}>
    {src && !unavailable && <img key={src} src={src} alt={alt} loading="lazy" decoding="async" style={{ visibility: ready ? 'visible' : 'hidden' }} onLoad={() => setLoaded(filename)} onError={() => setFailed(filename)} />}
    {!ready && <div className={placeholder}><p>{unavailable ? 'Photo unavailable.' : 'Loading photo?'}</p></div>}
  </div>
}

export default PortfolioPhoto
