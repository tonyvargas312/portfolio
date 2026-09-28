import ProjectPreview from '../components/ProjectPreview'
import { featuredProjects } from '../data/projects'
import './FeaturedProjects.css'

function FeaturedProjects() {
  const [activeIndex, setActiveIndex] = useState(0)
  const count = featuredProjects.length

  function moveProject(direction: number) {
    setActiveIndex((current) => (current + direction + count) % count)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault()
      moveProject(event.key === 'ArrowLeft' ? -1 : 1)
    }
  }

  return (
    <section className="featured-projects" aria-labelledby="featured-projects-title">
      <h2 id="featured-projects-title">What I'm building</h2>
      <div
        className="featured-projects__carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured projects"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div className="featured-projects__viewport" id="featured-projects-viewport">
          {featuredProjects.map((project, index) => (
            <div
              className="featured-projects__slide"
              key={project.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}: ${project.title}`}
              aria-hidden={index !== activeIndex}
              inert={index !== activeIndex}
            >
              <ProjectPreview project={project} />
            </div>
          ))}
        </div>
        <div className="featured-projects__controls">
          <div className="featured-projects__navigation">
            <button type="button" onClick={() => moveProject(-1)} aria-label="Previous project" aria-controls="featured-projects-viewport">
              Previous
            </button>
            <span className="featured-projects__position" role="status" aria-atomic="true" aria-label={`Project ${activeIndex + 1} of ${count}: ${featuredProjects[activeIndex].title}`}>
              {String(activeIndex + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </span>
            <button type="button" onClick={() => moveProject(1)} aria-label="Next project" aria-controls="featured-projects-viewport">
              Next
            </button>
          </div>
          <div className="featured-projects__dots" role="group" aria-label="Choose a project">
            {featuredProjects.map((project, index) => (
              <button
                key={project.id}
                type="button"
                className="featured-projects__dot"
                aria-label={`Show ${project.title}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                aria-controls="featured-projects-viewport"
                onClick={() => setActiveIndex(index)}
              >
                <span aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProjects
import { useState } from 'react'
import type { KeyboardEvent } from 'react'
