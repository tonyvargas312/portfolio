import { useId, useState } from 'react'
import type { KeyboardEvent } from 'react'
import type { ProjectImage } from '../types/project'
import ArrowIcon from './ArrowIcon'
import './ProjectGallery.css'

function ProjectGallery({ images, title }: { images: readonly ProjectImage[]; title: string }) {
  const [active, setActive] = useState(0)
  const viewportId = useId()
  const count = images.length || 3
  const index = active % count
  const image = images[index]
  function move(direction: number) {
    setActive((current) => (current + direction + count) % count)
  }
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault()
      move(event.key === 'ArrowLeft' ? -1 : 1)
    }
  }
  return (
    <div className="project-gallery" role="region" aria-roledescription="carousel"
      aria-label={`${title} images`} tabIndex={0} onKeyDown={handleKeyDown}>
      <div className="project-gallery__viewport" id={viewportId}>
        <div className="project-gallery__slide" role="group" aria-roledescription="slide" aria-label={`Image ${index + 1} of ${count}`}>
          {image ? <img src={image.url} alt={image.alt} /> : <span>Project image {index + 1} — placeholder</span>}
        </div>
      </div>
      <p className="project-gallery__caption" role="status" aria-live="polite" aria-atomic="true">
        Image {index + 1} of {count}{image?.caption ? ` — ${image.caption}` : ''}
      </p>
      {count > 1 && <div className="project-gallery__controls">
        <button type="button" aria-label="Previous project image" aria-controls={viewportId} onClick={() => move(-1)}><ArrowIcon direction="left" /></button>
        <div className="project-gallery__dots" role="group" aria-label="Choose a project image">
          {Array.from({ length: count }, (_, dot) => (
            <button key={dot} type="button" aria-label={`Show project image ${dot + 1}`} aria-current={dot === index ? 'true' : undefined}
              aria-controls={viewportId} onClick={() => setActive(dot)}><span aria-hidden="true" /></button>
          ))}
        </div>
        <button type="button" aria-label="Next project image" aria-controls={viewportId} onClick={() => move(1)}><ArrowIcon direction="right" /></button>
      </div>}
    </div>
  )
}

export default ProjectGallery
