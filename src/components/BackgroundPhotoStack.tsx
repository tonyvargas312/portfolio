import { useState } from 'react'
import type { CSSProperties } from 'react'
import PortfolioPhoto from './PortfolioPhoto'
import { backgroundPhotos, type BackgroundPhoto } from '../data/backgroundPhotos'
import './BackgroundPhotoStack.css'

function BackgroundPhotoStack({ photos = backgroundPhotos }: { photos?: readonly BackgroundPhoto[] }) {
  const [active, setActive] = useState(0)
  const count = photos.length
  const current = count ? active % count : 0
  function move(direction: number) { setActive((index) => (index + direction + count) % count) }
  if (!count) return null
  return <div className="background-photo-stack" role="region" aria-label="Background photos" aria-roledescription={count > 1 ? 'carousel' : undefined} data-single={count === 1}>
    <div className="background-photo-stack__stage">
      {photos.map((photo, index) => {
        let offset = (index - current + count) % count
        if (offset > count / 2) offset -= count
        const visible = Math.abs(offset) <= 2
        const style = { '--slide-offset': offset, '--slide-scale': offset === 0 ? 1 : Math.abs(offset) === 1 ? .88 : .76, '--slide-opacity': offset === 0 ? 1 : Math.abs(offset) === 1 ? .85 : .45, zIndex: 3 - Math.abs(offset) } as CSSProperties
        const content = <PortfolioPhoto filename={photo.filename} alt={photo.alt} />
        return <button key={photo.filename} type="button" className="background-photo-stack__slide" data-active={offset === 0 ? 'true' : undefined} style={style} aria-label={offset === 0 ? photo.alt : offset < 0 ? 'Previous photo' : 'Next photo'} aria-disabled={offset === 0} aria-hidden={!visible} tabIndex={visible && offset !== 0 ? 0 : -1} hidden={!visible} onClick={() => { if (offset !== 0) move(offset < 0 ? -1 : 1) }}>{content}</button>
      })}
    </div>
    {count > 1 && <p className="background-photo-stack__status" role="status" aria-live="polite">Photo {current + 1} of {count}</p>}
  </div>
}

export default BackgroundPhotoStack
